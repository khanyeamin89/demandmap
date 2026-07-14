import React, { useState, useEffect } from "react";
import { HotProduct, PredictedProduct, ProductsAnalyticsResult } from "../types";
import { Flame, Sparkles, TrendingUp, RefreshCw, Calendar, Eye, HelpCircle, ArrowUpRight, BookOpen, ExternalLink, ThumbsUp, Radio } from "lucide-react";

export default function ProductRadar() {
  const [data, setData] = useState<ProductsAnalyticsResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "tiktok" | "facebook_marketplace" | "google_trends" | "local_bd" | "daraz">("all");
  const [sortBy, setSortBy] = useState<"demand" | "tiktok" | "growth">("demand");

  const fetchHotProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/trends/products/hot");
      if (!response.ok) {
        throw new Error("Failed to load live product predictions");
      }
      const res = await response.json();
      setData(res);
    } catch (err: any) {
      console.error(err);
      setError("Unable to scrape live signals. Rendering simulated baseline models.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotProducts();
  }, []);

  if (error && !data) {
    return (
      <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl text-center">
        <p className="text-pink-400 text-sm font-mono uppercase tracking-wider mb-2">INTELLIGENCE OFFLINE</p>
        <p className="text-xs text-neutral-400 mb-4">{error}</p>
        <button
          onClick={fetchHotProducts}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-xl transition-all"
        >
          RETRY SERVICE
        </button>
      </div>
    );
  }

  const products = data?.hotProducts || [];
  const predictions = data?.predictedProducts || [];
  const sources = data?.scrapedSources || [];

  // Filtering products
  const filteredProducts = products.filter((p) => {
    if (activeTab === "all") return true;
    const channelLower = p.primaryChannel.toLowerCase();
    if (activeTab === "tiktok") return channelLower.includes("tiktok");
    if (activeTab === "facebook_marketplace") return channelLower.includes("marketplace");
    if (activeTab === "google_trends") return channelLower.includes("trends");
    if (activeTab === "local_bd") return channelLower.includes("local") || channelLower.includes("chaldaal") || channelLower.includes("rokomari");
    if (activeTab === "daraz") return channelLower.includes("daraz");
    return channelLower === activeTab;
  });

  // Sorting products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "demand") return b.demandScore - a.demandScore;
    if (sortBy === "tiktok") return b.tiktokScore - a.tiktokScore;
    if (sortBy === "growth") return b.growthRate - a.growthRate;
    return 0;
  });

  const getChannelBadge = (channel: string) => {
    const norm = channel.toLowerCase();
    if (norm.includes("tiktok")) {
      return (
        <span className="text-[10px] bg-rose-500/15 text-rose-400 border border-rose-500/20 font-bold font-mono px-2 py-0.5 rounded uppercase tracking-wider">
          TikTok Viral
        </span>
      );
    }
    if (norm.includes("marketplace")) {
      return (
        <span className="text-[10px] bg-blue-500/15 text-blue-400 border border-blue-500/20 font-bold font-mono px-2 py-0.5 rounded uppercase tracking-wider">
          FB Marketplace
        </span>
      );
    }
    if (norm.includes("trends")) {
      return (
        <span className="text-[10px] bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 font-bold font-mono px-2 py-0.5 rounded uppercase tracking-wider">
          Google Trends BD
        </span>
      );
    }
    if (norm.includes("local") || norm.includes("chaldaal") || norm.includes("rokomari")) {
      return (
        <span className="text-[10px] bg-teal-500/15 text-teal-400 border border-teal-500/20 font-bold font-mono px-2 py-0.5 rounded uppercase tracking-wider">
          Local BD E-Comm
        </span>
      );
    }
    if (norm.includes("daraz")) {
      return (
        <span className="text-[10px] bg-amber-500/15 text-amber-400 border border-amber-500/20 font-bold font-mono px-2 py-0.5 rounded uppercase tracking-wider">
          Daraz Hot Sale
        </span>
      );
    }
    if (norm.includes("facebook")) {
      return (
        <span className="text-[10px] bg-sky-500/15 text-sky-400 border border-sky-500/20 font-bold font-mono px-2 py-0.5 rounded uppercase tracking-wider">
          Facebook Boutique
        </span>
      );
    }
    if (norm.includes("instagram")) {
      return (
        <span className="text-[10px] bg-purple-500/15 text-purple-400 border border-purple-500/20 font-bold font-mono px-2 py-0.5 rounded uppercase tracking-wider">
          Instagram Look
        </span>
      );
    }
    return (
      <span className="text-[10px] bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 font-bold font-mono px-2 py-0.5 rounded uppercase tracking-wider">
        {channel}
      </span>
    );
  };

  return (
    <div id="product-radar-container" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* SECTION 1: Top 10 Hot Products */}
      <div className="lg:col-span-7 bg-neutral-900/30 border border-neutral-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                <Flame className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h2 className="font-display font-bold text-base text-white tracking-tight uppercase flex items-center gap-2">
                  Live Product Scraping Radar <span className="text-[10px] text-cyan-400 font-mono lowercase normal-case bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">top 10</span>
                </h2>
                <p className="text-xs text-neutral-400 font-sans">
                  Scraped via Search Grounding for FB Marketplace, Google Trends BD, Chaldaal, Rokomari, Daraz, and TikTok.
                </p>
              </div>
            </div>

            <button
              onClick={fetchHotProducts}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950 hover:bg-cyan-500/10 text-neutral-300 hover:text-cyan-400 border border-neutral-800 hover:border-cyan-500/30 transition-all text-xs font-mono disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-cyan-400" : ""}`} />
              <span>{loading ? "SCRAPING..." : "SCRAPE NOW"}</span>
            </button>
          </div>

          {/* Filter and Sorting Tabs */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-neutral-950/60 p-2 rounded-2xl border border-neutral-850/60 mb-6">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "all" ? "bg-cyan-500 text-black font-bold" : "text-neutral-400 hover:text-white"
                }`}
              >
                All Channels
              </button>
              <button
                onClick={() => setActiveTab("tiktok")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "tiktok" ? "bg-rose-500 text-white font-bold shadow-[0_0_8px_rgba(244,63,94,0.3)]" : "text-neutral-400 hover:text-rose-400"
                }`}
              >
                TikTok
              </button>
              <button
                onClick={() => setActiveTab("facebook_marketplace")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "facebook_marketplace" ? "bg-blue-600 text-white font-bold" : "text-neutral-400 hover:text-blue-400"
                }`}
              >
                FB Marketplace
              </button>
              <button
                onClick={() => setActiveTab("google_trends")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "google_trends" ? "bg-cyan-600 text-white font-bold" : "text-neutral-400 hover:text-cyan-400"
                }`}
              >
                Google Trends
              </button>
              <button
                onClick={() => setActiveTab("local_bd")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "local_bd" ? "bg-teal-600 text-white font-bold" : "text-neutral-400 hover:text-teal-400"
                }`}
              >
                Local E-Comm
              </button>
              <button
                onClick={() => setActiveTab("daraz")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "daraz" ? "bg-amber-500 text-black font-bold" : "text-neutral-400 hover:text-amber-400"
                }`}
              >
                Daraz
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-start">
              <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-neutral-900 border border-neutral-800 rounded-xl px-2.5 py-1 text-xs text-neutral-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value="demand">Demand Score</option>
                <option value="tiktok">TikTok Virality</option>
                <option value="growth">Growth %</option>
              </select>
            </div>
          </div>

          {/* Product Items List */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
            {loading ? (
              <div className="space-y-3 py-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse bg-neutral-900/60 h-20 rounded-2xl border border-neutral-850"></div>
                ))}
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-neutral-800 rounded-2xl">
                <Radio className="w-8 h-8 text-neutral-600 mx-auto mb-2 animate-bounce" />
                <p className="text-xs text-neutral-400 font-mono uppercase">No products active under filtered channel</p>
              </div>
            ) : (
              sortedProducts.map((p, idx) => (
                <div
                  key={p.id || idx}
                  className="bg-neutral-950/60 hover:bg-neutral-950 border border-neutral-850/60 hover:border-neutral-750 p-4 rounded-2xl transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono text-neutral-500">#{idx + 1}</span>
                      <h3 className="font-sans font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                        {p.name}
                      </h3>
                      <span className="text-[10px] bg-neutral-900 text-neutral-400 px-2 py-0.5 rounded border border-neutral-800">
                        {p.category}
                      </span>
                      {getChannelBadge(p.primaryChannel)}
                    </div>
                    <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                      {p.whyTrending}
                    </p>
                  </div>

                  <div className="flex sm:flex-col justify-between items-center sm:items-end w-full sm:w-auto shrink-0 border-t sm:border-t-0 border-neutral-900 pt-2 sm:pt-0 gap-3">
                    <div className="flex gap-4 items-center">
                      {/* Demand score gauge */}
                      <div className="text-right">
                        <span className="text-[9px] uppercase font-bold text-neutral-500 block font-mono">DEMAND SCORE</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                          <span className="text-sm font-bold text-cyan-400 font-mono">{p.demandScore}%</span>
                        </div>
                      </div>

                      {/* TikTok Virality Score */}
                      <div className="text-right">
                        <span className="text-[9px] uppercase font-bold text-rose-400 block font-mono flex items-center gap-0.5">
                          TIKTOK SCORE
                        </span>
                        <span className="text-sm font-bold text-rose-400 font-mono block text-right mt-0.5">
                          {p.tiktokScore}%
                        </span>
                      </div>
                    </div>

                    <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold font-mono px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +{p.growthRate}% MoM
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Warning Indicator */}
        {data?.isSimulated && (
          <div className="mt-4 bg-amber-500/5 border border-amber-500/10 p-3 rounded-xl flex items-center gap-2.5 text-amber-400/90 text-[11px] font-mono">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Simulated Baseline Mode. Key missing or limit exceeded. Refresh to attempt live scraper.</span>
          </div>
        )}
      </div>

      {/* SECTION 2: Predictive E-Commerce Potential Products */}
      <div className="lg:col-span-5 bg-neutral-900/30 border border-neutral-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-white tracking-tight uppercase">
                Predictive E-Commerce Radar
              </h2>
              <p className="text-xs text-neutral-400 font-sans">
                Predicting emerging consumer needs using local BD news & global trends.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="space-y-4 py-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-neutral-900/40 h-28 rounded-2xl border border-neutral-850"></div>
                ))}
              </div>
            ) : predictions.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-neutral-800 rounded-2xl">
                <p className="text-xs text-neutral-500 font-mono uppercase">Predictions offline or loading</p>
              </div>
            ) : (
              predictions.map((pred, idx) => (
                <div
                  key={pred.id || idx}
                  className="bg-neutral-950/40 border border-neutral-850 p-4 rounded-2xl hover:border-cyan-500/30 transition-all space-y-3"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] text-cyan-400 font-mono font-bold tracking-widest uppercase bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
                          PREDICTED #{idx + 1}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {pred.timeframe}
                        </span>
                      </div>
                      <h3 className="font-sans font-bold text-sm text-white pt-1">
                        {pred.name}
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] uppercase font-bold text-neutral-500 block font-mono">CONFIDENCE</span>
                      <span className="text-xs font-bold text-cyan-400 font-mono">{pred.confidenceScore}%</span>
                    </div>
                  </div>

                  {/* Trigger News Section */}
                  <div className="bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-850/60 text-[11px] leading-relaxed text-neutral-300">
                    <div className="font-mono text-[9px] uppercase font-bold text-cyan-400/80 mb-1 flex items-center gap-1">
                      <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                      Bangladesh & Global News Triggers
                    </div>
                    {pred.triggerNews}
                  </div>

                  {/* Why Potential Section */}
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    <strong className="text-neutral-200">Market potential:</strong> {pred.whyPotential}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Scraped Sources Grounding list */}
        {sources.length > 0 && (
          <div className="mt-6 pt-5 border-t border-neutral-850/60 space-y-2">
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              Scraper Reference Grounding Citations
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {sources.map((src, i) => (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] text-neutral-400 hover:text-cyan-400 bg-neutral-950 px-2.5 py-1 rounded-xl border border-neutral-850 transition-colors"
                >
                  <span className="truncate max-w-[120px]">{src.title}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
