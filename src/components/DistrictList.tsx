import React, { useState, useMemo } from "react";
import { District, TrendMetric } from "../types";
import { DISTRICTS } from "../bangladeshData";
import { Search, TrendingUp, TrendingDown, ArrowUpDown } from "lucide-react";

interface DistrictListProps {
  districtTrends: Record<string, TrendMetric>;
  selectedDistrict: District | null;
  onSelectDistrict: (district: District | null) => void;
  selectedDivision: string;
}

export default function DistrictList({
  districtTrends,
  selectedDistrict,
  onSelectDistrict,
  selectedDivision
}: DistrictListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"demand" | "growth" | "name">("demand");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Get filtered and sorted districts
  const processedDistricts = useMemo(() => {
    // 1. Filter by division and search query
    let filtered = DISTRICTS.filter(d => {
      const matchesDivision = selectedDivision === "All" || d.division === selectedDivision;
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.banglaName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.division.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDivision && matchesSearch;
    });

    // 2. Sort
    filtered.sort((a, b) => {
      const trendA = districtTrends[a.id] || { demandIndex: 0, growthRate: 0 };
      const trendB = districtTrends[b.id] || { demandIndex: 0, growthRate: 0 };

      let comparison = 0;
      if (sortBy === "demand") {
        comparison = trendA.demandIndex - trendB.demandIndex;
      } else if (sortBy === "growth") {
        comparison = trendA.growthRate - trendB.growthRate;
      } else {
        comparison = a.name.localeCompare(b.name);
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [searchQuery, selectedDivision, districtTrends, sortBy, sortOrder]);

  const toggleSort = (type: "demand" | "growth" | "name") => {
    if (sortBy === type) {
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(type);
      setSortOrder("desc");
    }
  };

  const getDemandPillClass = (score: number) => {
    if (score >= 80) return "bg-pink-500/10 text-pink-400 border-pink-500/20";
    if (score >= 65) return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    if (score >= 50) return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    if (score >= 35) return "bg-neutral-800 text-neutral-300 border-neutral-700";
    return "bg-neutral-950 text-neutral-500 border-neutral-850";
  };

  return (
    <div id="district-breakdown-card" className="bg-neutral-900/50 rounded-2xl border border-neutral-800 shadow-[0_4px_15px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col h-[500px] text-white">
      {/* Header Search Controls */}
      <div className="p-5 border-b border-neutral-850 flex flex-col md:flex-row gap-4 items-center justify-between bg-neutral-900/40">
        <div>
          <h3 className="font-display font-semibold text-white text-base uppercase tracking-tight">District Breakdown</h3>
          <p className="text-xs text-neutral-400 font-sans mt-0.5">
            Comparative performance matrix of {processedDistricts.length} active sectors
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            id="search-districts-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search district or division..."
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-neutral-950 border border-neutral-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all font-sans placeholder-neutral-500"
          />
        </div>
      </div>

      {/* Sorting Header Columns */}
      <div className="grid grid-cols-12 gap-2 px-6 py-2.5 bg-neutral-950/80 border-b border-neutral-850 text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono select-none">
        <div className="col-span-4 md:col-span-3 flex items-center gap-1 cursor-pointer hover:text-cyan-400 transition-colors" onClick={() => toggleSort("name")}>
          <span>District Name</span>
          <ArrowUpDown className="w-3 h-3" />
        </div>
        <div className="col-span-2 hidden md:block">Division</div>
        <div className="col-span-4 md:col-span-3 flex items-center gap-1 cursor-pointer hover:text-cyan-400 transition-colors" onClick={() => toggleSort("demand")}>
          <span>Demand Index</span>
          <ArrowUpDown className="w-3 h-3" />
        </div>
        <div className="col-span-2 flex items-center gap-1 cursor-pointer hover:text-cyan-400 transition-colors" onClick={() => toggleSort("growth")}>
          <span>Growth (MoM)</span>
          <ArrowUpDown className="w-3 h-3" />
        </div>
        <div className="col-span-2 md:col-span-2 hidden sm:block">Top Demand Item</div>
      </div>

      {/* Scrollable List Body */}
      <div className="flex-1 overflow-y-auto divide-y divide-neutral-850 bg-neutral-900/10">
        {processedDistricts.length > 0 ? (
          processedDistricts.map(dist => {
            const trend = districtTrends[dist.id] || {
              demandIndex: 0,
              growthRate: 0,
              topECommerceProduct: "None"
            };
            const isSelected = selectedDistrict?.id === dist.id;

            return (
              <div
                key={dist.id}
                id={`dist-row-${dist.id}`}
                onClick={() => onSelectDistrict(dist)}
                className={`grid grid-cols-12 gap-2 px-6 py-3 items-center text-xs cursor-pointer transition-all hover:bg-neutral-800/35 ${
                  isSelected ? "bg-cyan-500/10 border-l-2 border-cyan-500 hover:bg-cyan-500/15" : "border-l-2 border-transparent"
                }`}
              >
                {/* District Name with Dot */}
                <div className="col-span-4 md:col-span-3 flex items-center gap-2.5">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    trend.demandIndex >= 80 ? "bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.6)]" :
                    trend.demandIndex >= 65 ? "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" :
                    trend.demandIndex >= 50 ? "bg-amber-400" : "bg-neutral-600"
                  }`} />
                  <div>
                    <span className="font-semibold text-neutral-100 font-sans block">{dist.name}</span>
                    <span className="text-[10px] text-neutral-500 font-sans block sm:hidden">{dist.division}</span>
                    <span className="text-[10px] text-neutral-400 font-sans">{dist.banglaName}</span>
                  </div>
                </div>

                {/* Division Column */}
                <div className="col-span-2 hidden md:block text-neutral-400 font-medium font-sans">
                  {dist.division}
                </div>

                {/* Demand progress and score */}
                <div className="col-span-4 md:col-span-3 pr-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold ${getDemandPillClass(trend.demandIndex)}`}>
                      {trend.demandIndex}
                    </span>
                    <div className="flex-1 bg-neutral-950 h-1 rounded-full overflow-hidden hidden sm:block">
                      <div
                        className={`h-full rounded-full ${
                          trend.demandIndex >= 80 ? "bg-pink-500" :
                          trend.demandIndex >= 65 ? "bg-cyan-500" :
                          trend.demandIndex >= 50 ? "bg-amber-400" : "bg-neutral-600"
                        }`}
                        style={{ width: `${trend.demandIndex}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Growth indicator */}
                <div className="col-span-2 font-mono font-bold">
                  {trend.growthRate >= 0 ? (
                    <span className="text-emerald-400 flex items-center gap-0.5">
                      <TrendingUp className="w-3.5 h-3.5 inline" />
                      +{trend.growthRate}%
                    </span>
                  ) : (
                    <span className="text-pink-400 flex items-center gap-0.5">
                      <TrendingDown className="w-3.5 h-3.5 inline" />
                      {trend.growthRate}%
                    </span>
                  )}
                </div>

                {/* Top Local Product */}
                <div className="col-span-2 md:col-span-2 hidden sm:block text-neutral-300 truncate font-sans max-w-[140px]" title={trend.topECommerceProduct}>
                  {trend.topECommerceProduct}
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-neutral-400 font-medium text-sm">No districts matched your filter criteria</span>
            <button
              onClick={() => { setSearchQuery(""); }}
              className="mt-2 text-xs text-cyan-400 font-semibold hover:text-cyan-300 underline cursor-pointer"
            >
              Reset Search Filter
            </button>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      <div className="bg-neutral-950 px-6 py-3 border-t border-neutral-850 text-[10px] text-neutral-500 flex items-center justify-between select-none">
        <span>Displaying {processedDistricts.length} / 64 regional divisions</span>
        <span className="font-bold text-cyan-400/80 font-mono uppercase tracking-wider">
          SECTOR SELECTION: {selectedDivision}
        </span>
      </div>
    </div>
  );
}
