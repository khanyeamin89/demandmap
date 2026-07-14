import React, { useEffect, useState } from "react";
import { SearchResult } from "../types";
import { 
  History, 
  CalendarDays, 
  Newspaper, 
  TrendingUp, 
  Flame, 
  Compass, 
  Trash2, 
  CloudRain, 
  Sun, 
  CloudSnow, 
  Wind, 
  Zap, 
  AlertTriangle 
} from "lucide-react";

interface DemandIntelligenceProps {
  activeResult: SearchResult;
  onSelectProduct: (query: string) => void;
}

interface HistoryItem {
  query: string;
  category: string;
  demandIndex: number;
  timestamp: string;
  seasonalAnalysis: string;
  newsAnalysis: string;
}

const DEFAULT_HISTORY: HistoryItem[] = [
  {
    query: "Tangail cotton saree Jamdani boutique",
    category: "Fashion & Apparel",
    demandIndex: 88,
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    seasonalAnalysis: "Peak demand observed during the pre-Eid seasons (Spring/Summer) and late Autumn wedding seasons. Traditional handlooms like Tangail and Jamdani experience up to a 180% surge in online boutiques.",
    newsAnalysis: "Recent local news highlights show a renewed consumer interest in 'Made in Bangladesh' sustainable fabrics. Weaver community incentives in Tangail and Sirajganj have boosted production supply and stabilized retail pricing on major F-commerce pages."
  },
  {
    query: "Rajshahi mango Bogra mishti doi ghee",
    category: "Agro-Food & Organic Items",
    demandIndex: 92,
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
    seasonalAnalysis: "Highly seasonal Summer (Grishma - May to July) Peak. Demand surges exponentially during the harvesting months, dropping to near-zero in winter.",
    newsAnalysis: "Local news reports favorable dry heat in Rajshahi and Chapainawabganj, leading to a high-yield sweet mango harvest, driving down transport prices and boosting bulk Daraz and Chaldaal delivery volumes."
  },
  {
    query: "budget smartwatch TWS noise-cancelling earbuds",
    category: "Consumer Electronics & Gadgets",
    demandIndex: 78,
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    seasonalAnalysis: "Steady demand throughout the year, with notable sales peaks during Year-End campaigns (11.11, 12.12) on Daraz BD and early-year student back-to-school periods.",
    newsAnalysis: "Recent national budget announcements on electronics import duties have increased demand for refurbished workstation laptops and budget TWS devices as cost-saving alternatives for freelancers."
  }
];

export default function DemandIntelligence({ activeResult, onSelectProduct }: DemandIntelligenceProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from localStorage and add active result to history
  useEffect(() => {
    const stored = localStorage.getItem("trendcommand_demand_history");
    let currentHistory: HistoryItem[] = [];
    if (stored) {
      try {
        currentHistory = JSON.parse(stored);
      } catch (e) {
        currentHistory = [...DEFAULT_HISTORY];
      }
    } else {
      currentHistory = [...DEFAULT_HISTORY];
      localStorage.setItem("trendcommand_demand_history", JSON.stringify(currentHistory));
    }
    setHistory(currentHistory);
  }, []);

  // Watch activeResult to save to history when it updates
  useEffect(() => {
    if (!activeResult || !activeResult.query) return;

    // Skip saving default loading states
    if (activeResult.query === "All Product Trends" && activeResult.nationalAverageDemand === 65) return;

    setHistory((prev) => {
      // Avoid duplicate consecutive entries for same query
      const existsIdx = prev.findIndex(
        (item) => item.query.toLowerCase().trim() === activeResult.query.toLowerCase().trim()
      );

      let updated = [...prev];
      const newItem: HistoryItem = {
        query: activeResult.query,
        category: activeResult.category || "General Commerce",
        demandIndex: activeResult.nationalAverageDemand || 50,
        timestamp: new Date().toISOString(),
        seasonalAnalysis: activeResult.seasonalAnalysis || "Stable Year-Round demand with standard surges during the major festival seasons of Bangladesh (Eid-ul-Fitr and Eid-ul-Adha).",
        newsAnalysis: activeResult.newsAnalysis || "Local trade forums and e-commerce reports indicate standard retail movement with steady demand indices in metropolitan hubs."
      };

      if (existsIdx !== -1) {
        // Remove old entry and push to front to represent fresh demand trigger
        updated.splice(existsIdx, 1);
      }
      
      updated = [newItem, ...updated].slice(0, 8); // Keep last 8 items
      localStorage.setItem("trendcommand_demand_history", JSON.stringify(updated));
      return updated;
    });
  }, [activeResult]);

  const clearHistory = () => {
    localStorage.removeItem("trendcommand_demand_history");
    setHistory([]);
  };

  // Helper to determine seasonal icon based on category and description
  const getSeasonalBadge = () => {
    const text = (activeResult.seasonalAnalysis || "").toLowerCase();
    const category = (activeResult.category || "").toLowerCase();

    if (text.includes("summer") || text.includes("grishma") || text.includes("heatwave")) {
      return {
        label: "Summer Peak (Grishma)",
        icon: Sun,
        color: "text-amber-400 bg-amber-500/10 border-amber-500/25",
        desc: "Requires heat-resistant logistics & active cooling storage."
      };
    }
    if (text.includes("monsoon") || text.includes("barsha") || text.includes("rain")) {
      return {
        label: "Monsoon Peak (Barsha)",
        icon: CloudRain,
        color: "text-blue-400 bg-blue-500/10 border-blue-500/25",
        desc: "Prone to transport flood disruptions. Prioritize local hubs."
      };
    }
    if (text.includes("winter") || text.includes("sheet") || text.includes("cool")) {
      return {
        label: "Winter Peak (Sheet)",
        icon: CloudSnow,
        color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",
        desc: "Ideal season for organic raw goods and winter apparel."
      };
    }
    if (text.includes("autumn") || text.includes("sharat") || text.includes("wedding")) {
      return {
        label: "Autumn Peak (Sharat/Hemanta)",
        icon: Wind,
        color: "text-teal-400 bg-teal-500/10 border-teal-500/25",
        desc: "Strong retail uplift from traditional weddings and festivals."
      };
    }
    return {
      label: "Year-Round Utility",
      icon: Compass,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/25",
      desc: "Consistent sales velocity. Peak during major Eid retail weeks."
    };
  };

  const seasonalBadge = getSeasonalBadge();
  const SeasonalIcon = seasonalBadge.icon;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* LEFT PANEL: Demand History Log */}
      <div id="demand-history-panel" className="lg:col-span-5 bg-neutral-900/50 p-5 rounded-2xl border border-neutral-800 shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex flex-col gap-4 text-white">
        <div className="flex items-center justify-between border-b border-neutral-800/60 pb-3">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-display font-semibold text-white text-sm uppercase tracking-tight">
                Product Demand History Log
              </h3>
              <p className="text-[11px] text-neutral-400 font-sans">
                Interactive history of real-time spatial demand requests
              </p>
            </div>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              title="Clear all history"
              className="p-1.5 rounded-lg text-neutral-500 hover:text-pink-400 hover:bg-pink-500/10 transition-all cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="py-8 text-center text-neutral-500 text-xs font-sans">
            No history log recorded. Try searching for products above.
          </div>
        ) : (
          <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-neutral-800">
            {history.map((item, idx) => (
              <div
                key={idx}
                id={`history-item-${idx}`}
                onClick={() => onSelectProduct(item.query)}
                className="group p-3 rounded-xl bg-neutral-950/60 hover:bg-cyan-950/20 border border-neutral-850 hover:border-cyan-500/30 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 text-left"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-white group-hover:text-cyan-400 transition-colors truncate block">
                      {item.query}
                    </span>
                    <span className="text-[9px] bg-neutral-800 text-neutral-400 px-1.5 py-0.2 rounded font-mono shrink-0 uppercase">
                      {item.category.split(" ")[0]}
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-500 block font-mono">
                    Analyzed: {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 justify-end">
                    <TrendingUp className="w-3 h-3 text-cyan-400" />
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/15 px-1.5 py-0.5 rounded">
                      {item.demandIndex} Index
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT PANEL: Seasonal & News Spatial Intelligence */}
      <div id="seasonal-news-panel" className="lg:col-span-7 bg-neutral-900/50 p-5 rounded-2xl border border-neutral-800 shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex flex-col gap-4 text-white">
        <div className="flex items-center gap-2 border-b border-neutral-800/60 pb-3">
          <CalendarDays className="w-5 h-5 text-amber-400 animate-pulse" />
          <div>
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-tight">
              Seasonal & News Spatial Intelligence
            </h3>
            <p className="text-[11px] text-neutral-400 font-sans">
              Dynamic macro factors for current context: <span className="text-amber-400 font-bold">"{activeResult.query}"</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Sub-card: Seasonal Peak & Cycle */}
          <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-850 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className={`p-1.5 rounded-lg border ${seasonalBadge.color}`}>
                <SeasonalIcon className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-500 block tracking-wider font-mono">
                  SEASONAL ALIGNMENT
                </span>
                <span className="text-xs font-semibold text-white">
                  {seasonalBadge.label}
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-300 font-sans leading-relaxed mt-1">
              {activeResult.seasonalAnalysis || "Analyzing seasonal shifts... Stable demand profile detected."}
            </p>

            <div className="mt-auto pt-3 border-t border-neutral-850/60 flex items-start gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span className="text-[10px] text-neutral-400 font-mono leading-tight">
                {seasonalBadge.desc}
              </span>
            </div>
          </div>

          {/* Sub-card: Local News & Market Impact */}
          <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-850 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                <Newspaper className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-500 block tracking-wider font-mono">
                  LOCAL NEWS & LOGISTICS SIGNAL
                </span>
                <span className="text-xs font-semibold text-white">
                  Market Context Alert
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-300 font-sans leading-relaxed mt-1">
              {activeResult.newsAnalysis || "No major logistics or economic alerts currently disrupting this product sector in Bangladesh."}
            </p>

            <div className="mt-auto pt-3 border-t border-neutral-850/60 flex items-start gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span className="text-[10px] text-neutral-400 font-mono leading-tight">
                Refined from public reports, policy directives, and local harvesting indexes.
              </span>
            </div>
          </div>

        </div>

        {/* Localized Seasonal Recommendation Footnote */}
        <div className="bg-cyan-950/10 border border-cyan-500/15 p-3 rounded-xl flex items-start gap-2.5">
          <Flame className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-neutral-300 leading-relaxed font-sans">
            <strong className="text-cyan-400 font-mono uppercase mr-1">Retailer Directive:</strong>
            Use seasonal forecasting cycles to plan f-commerce live campaigns and Daraz stock deposits. Pre-allocate delivery resources to divisions experiencing localized demand breakout alerts.
          </p>
        </div>

      </div>

    </div>
  );
}
