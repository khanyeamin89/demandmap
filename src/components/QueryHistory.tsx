import React from "react";
import { Compass, ShoppingBag, Sparkles, Flame, Apple, Smartphone } from "lucide-react";

interface QueryHistoryProps {
  onSelectPreset: (preset: string) => void;
  activeQuery: string;
}

const PRESETS = [
  { label: "Handloom Tangail Saree & Jamdani", query: "Tangail cotton saree Jamdani boutique", icon: Flame, color: "text-pink-400 bg-pink-500/10 border-pink-500/20 hover:bg-pink-500/20" },
  { label: "Rajshahi Mangoes & Bogra Doi", query: "Rajshahi mango Bogra mishti doi ghee", icon: Apple, color: "text-amber-400 bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20" },
  { label: "Sundarban Organic Honey", query: "Sundarbans pure organic raw honey", icon: Sparkles, color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20 hover:bg-yellow-500/20" },
  { label: "Smart Watches & Wireless Earbuds", query: "budget smartwatch TWS noise-cancelling earbuds", icon: Smartphone, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20 hover:bg-cyan-500/20" },
  { label: "Sylhet Sreemangal Tea Leaves", query: "Sylhet Sreemangal raw black CTC green tea", icon: Compass, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20" }
];

export default function QueryHistory({ onSelectPreset, activeQuery }: QueryHistoryProps) {
  return (
    <div id="preset-queries-card" className="bg-neutral-900/50 p-5 rounded-2xl border border-neutral-800 shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex flex-col gap-4 text-white">
      <div>
        <h3 className="font-display font-semibold text-white text-sm flex items-center gap-2 uppercase tracking-tight">
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          <span>Hot Trending Categories (Bangladesh)</span>
        </h3>
        <p className="text-xs text-neutral-400 font-sans mt-0.5">
          Select a quick preset search category to fetch real-time grounded e-commerce and social trends
        </p>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {PRESETS.map((preset) => {
          const Icon = preset.icon;
          const isActive = activeQuery.toLowerCase().includes(preset.query.split(" ")[0].toLowerCase());
          
          return (
            <button
              key={preset.label}
              id={`preset-btn-${preset.label.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => onSelectPreset(preset.query)}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${preset.color} ${
                isActive
                  ? "ring-2 ring-cyan-500 ring-offset-2 ring-offset-neutral-950 scale-[1.02]"
                  : "hover:scale-[1.02] opacity-85 hover:opacity-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{preset.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
