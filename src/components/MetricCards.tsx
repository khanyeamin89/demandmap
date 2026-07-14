import React from "react";
import { SearchResult } from "../types";
import { TrendingUp, Users, Activity, ArrowUpRight, ArrowDownRight, Award } from "lucide-react";

interface MetricCardsProps {
  data: SearchResult;
}

export default function MetricCards({ data }: MetricCardsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  // Calculate sum of weekly social mentions across all districts
  const totalSocialBuzz = Object.values(data.districtTrends).reduce(
    (acc, item) => acc + item.socialMentions, 0
  );

  // Calculate average growth rate
  const allGrowthRates = Object.values(data.districtTrends).map(item => item.growthRate);
  const averageGrowth = parseFloat(
    (allGrowthRates.reduce((a, b) => a + b, 0) / allGrowthRates.length).toFixed(2)
  );

  // Calculate average positive sentiment
  const allSentiment = Object.values(data.districtTrends).map(item => item.sentimentPositive);
  const averageSentiment = Math.round(
    allSentiment.reduce((a, b) => a + b, 0) / allSentiment.length
  );

  // Find the highest demand district
  const topDistrict = (data.topDistricts && data.topDistricts[0]) || { name: "Dhaka", demandIndex: 85 };

  return (
    <div id="stats-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: National Average Demand */}
      <div className="bg-neutral-900/50 p-5 rounded-2xl border border-neutral-800 shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex flex-col justify-between text-white transition-all hover:border-neutral-700">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 font-mono">NATIONAL DEMAND</span>
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
            <Activity className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold font-display text-white">{data.nationalAverageDemand}</span>
            <span className="text-xs font-semibold text-neutral-500 font-mono">/100</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2.5 text-xs">
            <span className="text-neutral-500">Category:</span>
            <span className="font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider">
              {data.category}
            </span>
          </div>
        </div>
      </div>

      {/* Card 2: Growth MoM */}
      <div className="bg-neutral-900/50 p-5 rounded-2xl border border-neutral-800 shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex flex-col justify-between text-white transition-all hover:border-neutral-700">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 font-mono">FORECASTED VELOCITY</span>
          <div className={`p-2 rounded-xl border ${
            averageGrowth >= 0 
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.15)]" 
              : "bg-pink-500/10 text-pink-400 border-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.15)]"
          }`}>
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold font-display text-white">
              {averageGrowth >= 0 ? "+" : ""}{averageGrowth}%
            </span>
            <span className="text-xs font-semibold text-neutral-500 font-mono">MoM AVG</span>
          </div>
          <div className="flex items-center gap-1 mt-2.5 text-xs">
            {averageGrowth >= 0 ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-0.5 font-mono">
                <ArrowUpRight className="w-3.5 h-3.5" /> STABLE UPTREND
              </span>
            ) : (
              <span className="text-pink-400 font-semibold flex items-center gap-0.5 font-mono">
                <ArrowDownRight className="w-3.5 h-3.5" /> DOWNTREND RISK
              </span>
            )}
            <span className="text-neutral-500">projection</span>
          </div>
        </div>
      </div>

      {/* Card 3: Total Social Buzz */}
      <div className="bg-neutral-900/50 p-5 rounded-2xl border border-neutral-800 shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex flex-col justify-between text-white transition-all hover:border-neutral-700">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 font-mono">TOTAL SOCIAL BUZZ</span>
          <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.15)]">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold font-display text-white">
              {formatNumber(totalSocialBuzz)}
            </span>
            <span className="text-xs font-semibold text-neutral-500 font-mono">REACTION PTS</span>
          </div>
          <div className="flex items-center gap-2 mt-2.5 text-xs">
            <span className="text-neutral-500">Sentiment index:</span>
            <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[10px]">
              {averageSentiment}% Positive
            </span>
          </div>
        </div>
      </div>

      {/* Card 4: Top Demand Epicenter */}
      <div className="bg-neutral-900/50 p-5 rounded-2xl border border-neutral-800 shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex flex-col justify-between text-white transition-all hover:border-neutral-700">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 font-mono">DEMAND EPICENTER</span>
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.15)]">
            <Award className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold font-display text-white truncate max-w-[170px] uppercase tracking-tight">
              {topDistrict.name}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-3 text-xs">
            <span className="text-neutral-500">Peak Index:</span>
            <span className="font-mono font-extrabold text-pink-400">
              {topDistrict.demandIndex}/100
            </span>
            <span className="text-neutral-700">|</span>
            <span className="text-neutral-400 font-mono text-[10px]">HUB 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
