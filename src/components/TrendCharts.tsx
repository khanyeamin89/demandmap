import React from "react";
import { SearchResult } from "../types";
import { LineChart, Share2, Compass, AlertCircle } from "lucide-react";

interface TrendChartsProps {
  data: SearchResult;
  selectedDistrictId: string | null;
  selectedDistrictName: string;
}

export default function TrendCharts({ data, selectedDistrictId, selectedDistrictName }: TrendChartsProps) {
  // Use selected district or fallback to the top district for forecasting
  const activeDistrictId = selectedDistrictId || (data.topDistricts && data.topDistricts[0]?.districtId) || "dhaka";
  const activeDistrictName = selectedDistrictId ? selectedDistrictName : ((data.topDistricts && data.topDistricts[0]?.name) || "Dhaka");

  const forecastPoints = data.forecasting[activeDistrictId] || [];
  const platforms = data.platformBreakdown || { facebook: 40, instagram: 20, tiktok: 15, daraz: 15, localEcom: 10 };

  // Coordinates for drawing a custom responsive SVG line chart
  const padding = 40;
  const chartWidth = 500;
  const chartHeight = 220;

  // Map values to coordinates
  const getX = (index: number) => padding + (index * (chartWidth - padding * 2) / 3);
  const getY = (value: number) => chartHeight - padding - (value * (chartHeight - padding * 2) / 100);

  // Generate line path
  let linePath = "";
  let areaPath = "";
  let confidencePath = "";

  if (forecastPoints.length > 0) {
    // Generate primary line
    forecastPoints.forEach((pt, i) => {
      const x = getX(i);
      const y = getY(pt.demandIndex);
      if (i === 0) {
        linePath += `M ${x} ${y}`;
        areaPath += `M ${x} ${chartHeight - padding} L ${x} ${y}`;
      } else {
        linePath += ` L ${x} ${y}`;
        areaPath += ` L ${x} ${y}`;
      }
      if (i === forecastPoints.length - 1) {
        areaPath += ` L ${x} ${chartHeight - padding} Z`;
      }
    });

    // Generate confidence interval shaded region
    let confidenceTop = "";
    let confidenceBottom = "";
    forecastPoints.forEach((pt, i) => {
      const x = getX(i);
      const yTop = getY(pt.confidenceInterval[1]);
      const yBottom = getY(pt.confidenceInterval[0]);
      if (i === 0) {
        confidenceTop += `M ${x} ${yTop}`;
        confidenceBottom = ` L ${x} ${yBottom}`;
      } else {
        confidenceTop += ` L ${x} ${yTop}`;
        confidenceBottom = ` L ${x} ${yBottom}` + confidenceBottom;
      }
    });
    confidencePath = confidenceTop + confidenceBottom + " Z";
  }

  return (
    <div id="analytics-charts" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Forecasting Chart */}
      <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800 shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex flex-col justify-between text-white">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="font-display font-semibold text-base text-white flex items-center gap-2">
                <LineChart className="w-4 h-4 text-cyan-400" />
                <span>Demand Forecasting Indices</span>
              </h3>
              <p className="text-xs text-neutral-400 font-sans mt-0.5">
                4-month predictive index for <strong className="text-cyan-400 font-semibold">{activeDistrictName}</strong>
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block" />
              <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider font-mono">Confidence Band</span>
            </div>
          </div>

          {/* SVG Custom Line Chart */}
          <div className="relative w-full h-[220px] mt-4 flex items-center justify-center">
            {forecastPoints.length > 0 ? (
              <svg className="w-full h-full" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                {/* Horizontal Guide lines */}
                {[0, 25, 50, 75, 100].map((val) => (
                  <g key={val}>
                    <line
                      x1={padding}
                      y1={getY(val)}
                      x2={chartWidth - padding}
                      y2={getY(val)}
                      stroke="#222"
                      strokeWidth="1"
                    />
                    <text
                      x={padding - 10}
                      y={getY(val) + 4}
                      fill="#666"
                      className="text-[9px] font-mono font-medium"
                      textAnchor="end"
                    >
                      {val}
                    </text>
                  </g>
                ))}

                {/* Shaded Confidence Interval Path */}
                {confidencePath && (
                  <path
                    d={confidencePath}
                    fill="rgba(6, 182, 212, 0.06)"
                    stroke="rgba(6, 182, 212, 0.12)"
                    strokeWidth="0.5"
                    strokeDasharray="3,3"
                  />
                )}

                {/* Area under the curve */}
                {areaPath && (
                  <path
                    d={areaPath}
                    fill="rgba(6, 182, 212, 0.03)"
                  />
                )}

                {/* Primary trend line */}
                {linePath && (
                  <path
                    d={linePath}
                    fill="none"
                    stroke="rgb(6, 182, 212)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Data points */}
                {forecastPoints.map((pt, i) => (
                  <g key={pt.month}>
                    <circle
                      cx={getX(i)}
                      cy={getY(pt.demandIndex)}
                      r="4.5"
                      fill="#0a0a0a"
                      stroke="rgb(6, 182, 212)"
                      strokeWidth="2.5"
                      className="transition-all duration-300 cursor-pointer hover:r-6"
                    />
                    {/* Floating score label */}
                    <text
                      x={getX(i)}
                      y={getY(pt.demandIndex) - 10}
                      textAnchor="middle"
                      fill="#ffffff"
                      className="text-[10px] font-mono font-extrabold"
                    >
                      {pt.demandIndex}
                    </text>
                    {/* Month Label */}
                    <text
                      x={getX(i)}
                      y={chartHeight - padding + 18}
                      textAnchor="middle"
                      fill="#888888"
                      className="text-[10px] font-mono uppercase tracking-wider font-semibold"
                    >
                      {pt.month}
                    </text>
                  </g>
                ))}
              </svg>
            ) : (
              <div className="text-center text-neutral-500 text-xs py-8">
                No forecasting points generated.
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center gap-2 text-xs text-neutral-400">
          <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="font-sans leading-tight">Seasonal parameters and log-growth indices have been updated based on real-time geographical clusters.</span>
        </div>
      </div>

      {/* Platform & Social Channels Breakdown */}
      <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800 shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex flex-col justify-between text-white">
        <div>
          <h3 className="font-display font-semibold text-base text-white flex items-center gap-2 mb-1">
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span>Platform Contribution & Mentions</span>
          </h3>
          <p className="text-xs text-neutral-400 font-sans mb-5">
            Share of weekly social media traffic and checkout volumes for <strong className="text-cyan-400 font-semibold">"{data.query}"</strong>
          </p>

          <div className="space-y-4">
            {/* Facebook */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-semibold text-neutral-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Facebook Groups & Marketplace
                </span>
                <span className="font-mono font-bold text-white">{platforms.facebook}%</span>
              </div>
              <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" style={{ width: `${platforms.facebook}%` }} />
              </div>
            </div>

            {/* Instagram */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-semibold text-neutral-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-500" />
                  Instagram Shopfronts & Hubs
                </span>
                <span className="font-mono font-bold text-white">{platforms.instagram}%</span>
              </div>
              <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-pink-500 h-full rounded-full shadow-[0_0_8px_rgba(236,72,153,0.5)]" style={{ width: `${platforms.instagram}%` }} />
              </div>
            </div>

            {/* TikTok */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-semibold text-neutral-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  TikTok BD Shorts Video Traffic
                </span>
                <span className="font-mono font-bold text-white">{platforms.tiktok}%</span>
              </div>
              <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]" style={{ width: `${platforms.tiktok}%` }} />
              </div>
            </div>

            {/* Daraz */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-semibold text-neutral-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  Daraz BD Retail & Fast Logistics
                </span>
                <span className="font-mono font-bold text-white">{platforms.daraz}%</span>
              </div>
              <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full shadow-[0_0_8px_rgba(249,115,22,0.5)]" style={{ width: `${platforms.daraz}%` }} />
              </div>
            </div>

            {/* Local Ecom */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-semibold text-neutral-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  Other Independent Web Stores
                </span>
                <span className="font-mono font-bold text-white">{platforms.localEcom}%</span>
              </div>
              <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]" style={{ width: `${platforms.localEcom}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            Social groups & direct f-commerce dominates Bangladesh
          </span>
          <span className="font-mono text-[9px] text-cyan-400/90 bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded uppercase tracking-wider">
            SYNCHRONIZED
          </span>
        </div>
      </div>
    </div>
  );
}
