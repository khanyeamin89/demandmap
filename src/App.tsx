import React, { useState, useEffect } from "react";
import { District, SearchResult } from "./types";
import { DISTRICTS, getBaselineDemand } from "./bangladeshData";
import BangladeshMap from "./components/BangladeshMap";
import MetricCards from "./components/MetricCards";
import TrendCharts from "./components/TrendCharts";
import DistrictList from "./components/DistrictList";
import QueryHistory from "./components/QueryHistory";
import ProductRadar from "./components/ProductRadar";
import DemandIntelligence from "./components/DemandIntelligence";
import { Search, RefreshCw, Layers, AlertCircle, ExternalLink, Sparkles, BookOpen } from "lucide-react";

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const [activeQuery, setActiveQuery] = useState("All Product Trends");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<string>("All");
  const [error, setError] = useState<string | null>(null);

  // Initialize SearchResult state with local baseline default data
  const [data, setData] = useState<SearchResult>(() => {
    const base = getBaselineDemand("All Product Trends");
    return {
      query: "All Product Trends",
      category: base.category,
      timestamp: new Date().toISOString(),
      summary: base.summary,
      nationalAverageDemand: base.nationalAverageDemand,
      divisionAverages: base.divisionAverages,
      topDistricts: DISTRICTS.map(dist => ({
        districtId: dist.id,
        name: dist.name,
        demandIndex: base.districtTrends[dist.id].demandIndex,
        socialMentions: base.districtTrends[dist.id].socialMentions,
        growth: base.districtTrends[dist.id].growthRate
      }))
        .sort((a, b) => b.demandIndex - a.demandIndex)
        .slice(0, 5),
      districtTrends: base.districtTrends,
      forecasting: base.forecasting,
      platformBreakdown: base.platformBreakdown,
      sources: [
        { title: "Facebook BD Social Insights", url: "https://facebook.com" },
        { title: "E-Commerce Tracker Bangladesh", url: "https://daraz.com.bd" }
      ]
    };
  });

  // Main fetch analyzer function
  const fetchTrends = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/trends/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) {
        throw new Error("Failed to process social media analysis");
      }
      const resData = (await response.json()) as SearchResult & { isSimulated?: boolean; errorMsg?: string };
      setData(resData);
      setActiveQuery(query);
      
      // If there was a pre-selected district, keep it selected but refresh its state reference
      if (selectedDistrict) {
        const found = DISTRICTS.find(d => d.id === selectedDistrict.id);
        if (found) setSelectedDistrict(found);
      }

      if (resData.errorMsg) {
        console.warn("Server warning:", resData.errorMsg);
      }
    } catch (err: any) {
      console.error(err);
      setError("An error occurred connecting to the intelligence server. Showing simulated baseline context.");
    } finally {
      setIsLoading(false);
    }
  };

  // Run on initial load
  useEffect(() => {
    fetchTrends("All Product Trends");
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchTrends(searchInput.trim());
    }
  };

  const handleSelectPreset = (presetQuery: string) => {
    setSearchInput(presetQuery);
    fetchTrends(presetQuery);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Top Header Banner */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-cyan-500 flex items-center justify-center text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Layers className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-xl text-white tracking-tight uppercase">
                TrendCommand <span className="text-cyan-400 font-normal text-xs underline underline-offset-4 font-mono">BD v2.4</span>
              </h1>
              <p className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase">
                SOCIAL & E-COMMERCE INTELLIGENCE GRID
              </p>
            </div>
          </div>

          {/* Core Search Controller */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full sm:w-auto max-w-md">
            <div className="relative flex-1 sm:w-72">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                id="main-search-input"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Type query e.g. 'Ghee', 'Saree'..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all font-sans placeholder-neutral-500"
              />
            </div>
            <button
              id="main-search-submit-btn"
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all flex items-center gap-2 shadow-[0_0_12px_rgba(6,182,212,0.3)] disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>ANALYZING...</span>
                </>
              ) : (
                <span>ANALYZE</span>
              )}
            </button>
          </form>
        </div>
      </header>

      {/* Main Body Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Environment Alert Notification */}
        {error && (
          <div className="bg-pink-500/10 border border-pink-500/20 p-4 rounded-2xl flex items-start gap-3 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.1)]">
            <AlertCircle className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider font-mono">CONNECTION INTERRUPTED</p>
              <p className="text-xs text-neutral-300 font-sans mt-1 leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {/* Gemini Mode Notification Card */}
        <div className="bg-neutral-900/40 border border-neutral-800 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-inner">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-bold text-white font-mono">
                  CURRENT QUERY CONTEXT: <span className="text-cyan-400">"{activeQuery}"</span>
                </p>
                {data.category && (
                  <span className="text-[9px] bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 font-bold font-mono px-2 py-0.5 rounded uppercase tracking-wider">
                    {data.category}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 font-sans mt-1.5 leading-relaxed max-w-3xl">
                {data.summary}
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <span className="text-[9px] uppercase font-bold text-neutral-500 block tracking-widest font-mono">
              ANALYZED TIMESTAMP
            </span>
            <span className="text-xs font-mono font-medium text-neutral-300 block mt-1">
              {new Date(data.timestamp).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Quick Presets Section */}
        <QueryHistory onSelectPreset={handleSelectPreset} activeQuery={activeQuery} />

        {/* Product Demand History & Seasonal-News Intelligence Log */}
        <DemandIntelligence activeResult={data} onSelectProduct={handleSelectPreset} />

        {/* Dynamic Analytics Stats cards */}
        <MetricCards data={data} />

        {/* Live Scraped Products & Predictive Radar */}
        <ProductRadar />

        {/* Main interactive grid map and list layout */}
        <div className="grid grid-cols-1 gap-6">
          {/* Spatial Heatmap Dashboard Component */}
          <BangladeshMap
            districtTrends={data.districtTrends}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={(dist) => setSelectedDistrict(dist)}
            selectedDivision={selectedDivision}
            onSelectDivision={(div) => setSelectedDivision(div)}
          />
        </div>

        {/* Dynamic forecasting trends charts & social channels contribution breakdown */}
        <TrendCharts
          data={data}
          selectedDistrictId={selectedDistrict ? selectedDistrict.id : null}
          selectedDistrictName={selectedDistrict ? selectedDistrict.name : "Dhaka"}
        />

        {/* Comprehensive districts listing breakdown with sorting capabilities */}
        <DistrictList
          districtTrends={data.districtTrends}
          selectedDistrict={selectedDistrict}
          onSelectDistrict={(dist) => setSelectedDistrict(dist)}
          selectedDivision={selectedDivision}
        />

        {/* Source References & Grounding Citations */}
        {data.sources && data.sources.length > 0 && (
          <div id="sources-card" className="bg-neutral-900/50 p-5 rounded-2xl border border-neutral-800 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <h3 className="font-display font-semibold text-white text-sm uppercase tracking-tight">Grounded Sources & Social Signals</h3>
            </div>
            <p className="text-xs text-neutral-400 mb-4 font-sans leading-relaxed">
              The following live resources, public e-commerce catalogs, and index signals were referenced to extract localized trends:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.sources.map((src, idx) => (
                <a
                  key={idx}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 hover:bg-cyan-500/10 hover:text-cyan-400 border border-neutral-850 transition-all text-xs text-neutral-300 font-mono group"
                >
                  <span className="truncate max-w-[280px]">{src.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 shrink-0 ml-2" />
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Elegant Footer */}
      <footer className="bg-neutral-950 text-neutral-500 py-10 mt-12 border-t border-neutral-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-cyan-500 flex items-center justify-center text-black text-xs font-extrabold shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                BD
              </div>
              <span className="font-display font-bold text-white tracking-wider uppercase text-sm">
                Bangladesh Trend Intelligence Network
              </span>
            </div>
            <p className="text-[10px] text-neutral-600 font-mono uppercase tracking-widest">
              &copy; {new Date().getFullYear()} TrendCommand BD. Powered by Gemini Grounded Spatial Analytics.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
