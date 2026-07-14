import React, { useState } from "react";
import { District, TrendMetric } from "../types";
import { DISTRICTS, DIVISIONS } from "../bangladeshData";
import { MapPin, Info, TrendingUp, Users, ShoppingBag } from "lucide-react";

interface BangladeshMapProps {
  districtTrends: Record<string, TrendMetric>;
  selectedDistrict: District | null;
  onSelectDistrict: (district: District | null) => void;
  selectedDivision: string;
  onSelectDivision: (division: string) => void;
}

export default function BangladeshMap({
  districtTrends,
  selectedDistrict,
  onSelectDistrict,
  selectedDivision,
  onSelectDivision
}: BangladeshMapProps) {
  const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null);

  // Filter districts by division
  const filteredDistricts = DISTRICTS.filter(d => 
    selectedDivision === "All" || d.division === selectedDivision
  );

  // Get color scale for demand
  const getDemandColor = (score: number) => {
    if (score >= 80) return "bg-pink-500 text-black shadow-[0_0_12px_rgba(236,72,153,0.6)]";
    if (score >= 65) return "bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.6)]";
    if (score >= 50) return "bg-amber-500 text-black shadow-[0_0_8px_rgba(245,158,11,0.4)]";
    if (score >= 35) return "bg-neutral-700 text-neutral-100 shadow-none";
    return "bg-neutral-800 text-neutral-400 shadow-none";
  };

  // Division polygon / center approximations to draw abstract geographical guides
  const divisionCentroids: Record<string, { x: number; y: number; label: string }> = {
    "Rangpur": { x: 33, y: 17, label: "RANGPUR" },
    "Rajshahi": { x: 28, y: 35, label: "RAJSHAHI" },
    "Mymensingh": { x: 51, y: 29, label: "MYMENSINGH" },
    "Sylhet": { x: 73, y: 34, label: "SYLHET" },
    "Dhaka": { x: 49, y: 50, label: "DHAKA" },
    "Khulna": { x: 27, y: 64, label: "KHULNA" },
    "Barisal": { x: 46, y: 72, label: "BARISAL" },
    "Chittagong": { x: 74, y: 62, label: "CHITTAGONG" }
  };

  return (
    <div id="bd-map-container" className="flex flex-col lg:flex-row gap-6 bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)] text-white">
      {/* Map Visualization Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="font-display font-semibold text-lg text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
              Regional Demand Heatmap
            </h3>
            <p className="text-xs text-neutral-400 font-sans mt-0.5">
              Click division tags to filter regions or select colored map coordinates
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 max-w-sm sm:justify-end">
            <button
              id="btn-div-all"
              onClick={() => onSelectDivision("All")}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                selectedDivision === "All"
                  ? "bg-cyan-500 text-black font-semibold shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white"
              }`}
            >
              All Bangladesh
            </button>
            {DIVISIONS.map(div => (
              <button
                key={div}
                id={`btn-div-${div.toLowerCase()}`}
                onClick={() => onSelectDivision(div)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                  selectedDivision === div
                    ? "bg-cyan-500 text-black font-semibold shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                    : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white"
                }`}
              >
                {div}
              </button>
            ))}
          </div>
        </div>

        {/* The Geographical Coordinate Board */}
        <div className="relative w-full aspect-[4/5] bg-neutral-950 rounded-xl border border-neutral-850 overflow-hidden flex items-center justify-center">
          
          {/* Abstract SVG Grid of Bangladesh Division Borders for Context */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Outline grids representing general sectors */}
            <path d="M 10,10 L 90,10 L 90,90 L 10,90 Z" fill="none" stroke="#222" strokeWidth="0.2" strokeDasharray="2,2" />
            
            {/* Division Sector Guideline Lines to give an artistic geographical framework */}
            {/* North Border Rangpur/Rajshahi */}
            <path d="M 15,25 C 25,23 35,27 45,24" stroke="#333" strokeWidth="0.5" fill="none" />
            {/* East Sylhet Border */}
            <path d="M 60,30 C 65,30 75,35 85,32" stroke="#333" strokeWidth="0.5" fill="none" />
            {/* South Delta Coastline */}
            <path d="M 20,75 C 30,73 40,78 50,75 C 60,70 70,75 80,85" stroke="#444" strokeWidth="0.8" fill="none" />
          </svg>

          {/* Division Name Floating Labels */}
          {Object.entries(divisionCentroids).map(([div, center]) => {
            const isTarget = selectedDivision === "All" || selectedDivision === div;
            return (
              <div
                key={div}
                style={{ left: `${center.x}%`, top: `${center.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 ${
                  isTarget ? "opacity-35 scale-100" : "opacity-5 scale-90"
                }`}
              >
                <span className="font-mono font-extrabold text-[10px] tracking-[0.25em] text-cyan-400/85">
                  {center.label}
                </span>
              </div>
            );
          })}

          {/* District Interactive Nodes */}
          {DISTRICTS.map(dist => {
            const isVisible = selectedDivision === "All" || dist.division === selectedDivision;
            const trend = districtTrends[dist.id] || { demandIndex: 30 };
            const isSelected = selectedDistrict?.id === dist.id;
            
            // Scaled node size based on population (1.5x up to 3.5x rem scale)
            const nodeSize = Math.max(1.1, Math.min(2.5, 0.8 + (dist.population * 0.1)));

            return (
              <div
                key={dist.id}
                style={{
                  left: `${dist.x}%`,
                  top: `${dist.y}%`,
                  transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0.4})`
                }}
                className={`absolute transition-all duration-500 ease-out z-10 ${
                  isVisible ? "opacity-100" : "opacity-10 pointer-events-none"
                }`}
              >
                {/* Visual Circle Button */}
                <button
                  id={`map-node-${dist.id}`}
                  onClick={() => onSelectDistrict(dist)}
                  onMouseEnter={() => setHoveredDistrict(dist)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  style={{
                    width: `${nodeSize * 10 + 16}px`,
                    height: `${nodeSize * 10 + 16}px`
                  }}
                  className={`relative flex items-center justify-center rounded-full cursor-pointer transition-all hover:scale-125 ring-2 ring-neutral-950/80 shadow-md ${getDemandColor(trend.demandIndex)} ${
                    isSelected ? "ring-cyan-400 scale-125 ring-offset-2 ring-offset-neutral-950 z-20" : ""
                  }`}
                >
                  {/* Inside: Small label for major hubs */}
                  <span className="font-mono text-[8px] font-semibold tracking-tighter opacity-90 select-none">
                    {dist.name.substring(0, 3).toUpperCase()}
                  </span>

                  {/* Pulsing glow indicator for high alert demand (>= 80) */}
                  {trend.demandIndex >= 80 && (
                    <span className="absolute -inset-1 rounded-full bg-pink-500/20 animate-ping pointer-events-none" />
                  )}
                </button>
              </div>
            );
          })}

          {/* Simple Floating Mini-Tooltip */}
          {hoveredDistrict && (
            <div
              style={{
                left: `${hoveredDistrict.x}%`,
                top: `${hoveredDistrict.y - 7}%`
              }}
              className="absolute -translate-x-1/2 -translate-y-full bg-neutral-900 border border-neutral-700 text-white px-2.5 py-1.5 rounded-lg text-xs shadow-2xl flex flex-col gap-0.5 z-30 pointer-events-none whitespace-nowrap"
            >
              <div className="font-display font-medium flex items-center gap-1">
                <span>{hoveredDistrict.name}</span>
                <span className="text-[10px] text-neutral-400">({hoveredDistrict.division})</span>
              </div>
              <div className="font-mono text-[10px] text-cyan-400 font-bold">
                Demand Index: {districtTrends[hoveredDistrict.id]?.demandIndex || "N/A"}
              </div>
            </div>
          )}

          {/* Bottom Right Heatmap Legend */}
          <div className="absolute bottom-4 left-4 bg-neutral-950/90 backdrop-blur-md p-3 rounded-lg border border-neutral-800 shadow-[0_0_15px_rgba(0,0,0,0.6)] text-[10px] font-medium flex flex-col gap-1.5 select-none max-w-[150px]">
            <span className="text-neutral-400 uppercase tracking-wider font-semibold font-mono text-[8px]">LEGEND: VELOCITY</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-pink-500 block shadow-[0_0_8px_rgba(236,72,153,0.6)]" />
              <span className="text-neutral-300 font-sans">Critical (&ge;80)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-cyan-500 block shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
              <span className="text-neutral-300 font-sans">High Growth (65-79)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-amber-500 block" />
              <span className="text-neutral-300 font-sans">Moderate (50-64)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-neutral-750 block" />
              <span className="text-neutral-400 font-sans">Low-Moderate (35-49)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-neutral-850 block" />
              <span className="text-neutral-500 font-sans">Baseline (&lt;35)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Side Information Detail Card (Updates based on selection) */}
      <div className="w-full lg:w-80 flex flex-col border-t lg:border-t-0 lg:border-l border-neutral-800 pt-6 lg:pt-0 lg:pl-6">
        {selectedDistrict ? (
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-[10px] font-semibold font-mono uppercase mb-1.5">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedDistrict.division} SECTOR</span>
                  </div>
                  <h4 className="font-display font-bold text-xl text-white tracking-tight uppercase">{selectedDistrict.name}</h4>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">{selectedDistrict.banglaName}</p>
                </div>
                <button
                  id="btn-clear-selection"
                  onClick={() => onSelectDistrict(null)}
                  className="text-[10px] font-mono uppercase text-neutral-400 hover:text-white border border-neutral-800 px-2 py-1 rounded hover:bg-neutral-800 transition-all cursor-pointer"
                >
                  Clear
                </button>
              </div>

              {/* District Stats Overview */}
              <div className="space-y-4">
                {/* Demand Big Index Gauge */}
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 shadow-inner">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-neutral-400 font-medium">Local Demand Index</span>
                    <span className="text-[10px] text-cyan-400/80 font-mono tracking-wider uppercase">Live Feed</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-extrabold text-3xl text-white">
                      {districtTrends[selectedDistrict.id]?.demandIndex || 0}
                    </span>
                    <span className="text-xs font-semibold text-neutral-500 font-mono">/100</span>
                    <span className={`ml-auto text-xs font-semibold flex items-center gap-0.5 ${
                      (districtTrends[selectedDistrict.id]?.growthRate || 0) >= 0 ? "text-emerald-400" : "text-pink-400"
                    }`}>
                      <TrendingUp className="w-3.5 h-3.5 inline" />
                      {districtTrends[selectedDistrict.id]?.growthRate || 0}% MoM
                    </span>
                  </div>
                  {/* Progress gauge bar */}
                  <div className="w-full bg-neutral-850 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        (districtTrends[selectedDistrict.id]?.demandIndex || 0) >= 80 ? "bg-pink-500" :
                        (districtTrends[selectedDistrict.id]?.demandIndex || 0) >= 65 ? "bg-cyan-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${districtTrends[selectedDistrict.id]?.demandIndex || 0}%` }}
                    />
                  </div>
                </div>

                {/* Sub-Metrics Section */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-neutral-950/60 p-3 rounded-xl border border-neutral-850">
                    <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-1">
                      <Users className="w-3.5 h-3.5 text-neutral-500" />
                      <span className="font-mono text-[9px] tracking-wider uppercase">Social Buzz</span>
                    </div>
                    <span className="font-mono font-bold text-sm text-white">
                      {(districtTrends[selectedDistrict.id]?.socialMentions || 0).toLocaleString()} <span className="text-[9px] text-neutral-500 font-sans block">posts/wk</span>
                    </span>
                  </div>

                  <div className="bg-neutral-950/60 p-3 rounded-xl border border-neutral-850">
                    <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-1">
                      <ShoppingBag className="w-3.5 h-3.5 text-cyan-500" />
                      <span className="font-mono text-[9px] tracking-wider uppercase">E-com Sales</span>
                    </div>
                    <span className="font-mono font-bold text-sm text-cyan-400">
                      {districtTrends[selectedDistrict.id]?.ecommerceSales || 0}% <span className="text-[9px] text-neutral-500 font-sans block">volume index</span>
                    </span>
                  </div>

                  <div className="bg-neutral-950/60 p-3 rounded-xl border border-neutral-850 col-span-2">
                    <div className="flex items-center justify-between text-neutral-400 text-xs mb-1">
                      <span className="font-mono text-[9px] tracking-wider uppercase">Sentiment (Positive)</span>
                      <span className="font-mono font-bold text-emerald-400">
                        {districtTrends[selectedDistrict.id]?.sentimentPositive || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-neutral-850 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${districtTrends[selectedDistrict.id]?.sentimentPositive || 0}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Top Local Product Accent */}
                <div className="bg-cyan-500/10 p-3.5 rounded-xl border border-cyan-500/25">
                  <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest font-mono block mb-1">
                    TOP REGIONAL DEMAND ITEM
                  </span>
                  <p className="font-display font-semibold text-white text-xs">
                    {districtTrends[selectedDistrict.id]?.topECommerceProduct || "Not Detected"}
                  </p>
                  <p className="text-[10px] text-neutral-500 mt-1.5 leading-relaxed font-sans">
                    Extracted from Facebook marketplace posts & local logistics shipments.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800">
              <div className="flex items-center gap-2 text-xs text-neutral-400 bg-neutral-950 p-2.5 rounded-lg border border-neutral-850/60">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-sans leading-tight">Selected sector represents {selectedDistrict.population}M approximate consumer audience.</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-12 h-full">
            <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-500 mb-3 animate-pulse">
              <MapPin className="w-5 h-5 text-neutral-400" />
            </div>
            <h4 className="font-display font-bold text-neutral-300 text-xs uppercase tracking-wider">No Sector Active</h4>
            <p className="text-xs text-neutral-500 font-sans mt-2 max-w-[210px] leading-relaxed">
              Click any neon signal node on the Bangladesh grid to view localized social and e-commerce indexes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
