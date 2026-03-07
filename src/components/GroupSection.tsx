"use client";

import type { IndicatorGroup } from "@/lib/data";
import IndicatorRow from "./IndicatorRow";

type Code = "green" | "yellow" | "red" | "star";

interface Props {
  group: IndicatorGroup;
  annotations: Record<string, Code[]>;
  onToggle: (indicator: string, code: Code) => void;
}

const circledNumbers = ["", "\u2460", "\u2461", "\u2462", "\u2463", "\u2464", "\u2465", "\u2466", "\u2467"];

export default function GroupSection({ group, annotations, onToggle }: Props) {
  return (
    <div className="animate-slide-up">
      <div className="bg-[#1B3A6B] text-white px-5 py-3 rounded-t-lg">
        <h2 className="text-sm font-bold">
          {circledNumbers[parseInt(group.number)] || group.number} {group.title}
        </h2>
        <p className="text-xs text-blue-200 mt-0.5 italic">{group.subtitle}</p>
      </div>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#2E5FA3] text-white text-xs uppercase">
            <th className="text-left py-2 px-4 w-[55%] font-semibold">Indicator</th>
            <th className="py-2 px-4 w-[45%]">
              <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                <span>Use</span>
                <span>Unsure</span>
                <span>Ignore</span>
                <span>Wish</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-100">
          {group.indicators.map((indicator, i) => (
            <IndicatorRow
              key={indicator.name}
              name={indicator.name}
              advanced={indicator.advanced}
              selections={annotations[indicator.name] || []}
              onToggle={(code) => onToggle(indicator.name, code)}
              index={i}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
