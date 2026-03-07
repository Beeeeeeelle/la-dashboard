"use client";

import AnnotationBox from "./AnnotationBox";

type Code = "green" | "yellow" | "red" | "star";

interface Props {
  name: string;
  advanced?: boolean;
  selections: Code[];
  onToggle: (code: Code) => void;
  index: number;
}

export default function IndicatorRow({ name, advanced, selections, onToggle, index }: Props) {
  const codes: Code[] = ["green", "yellow", "red", "star"];

  return (
    <tr
      className="group animate-fade-in"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <td className="py-2.5 px-4 text-sm text-slate-700 group-hover:bg-blue-50/50 transition-colors">
        {name}
        {advanced && (
          <span className="ml-2 inline-block text-[10px] bg-amber-50 text-amber-700 border border-amber-300 rounded px-1.5 py-0.5 italic">
            advanced
          </span>
        )}
      </td>
      <td className="py-2.5 px-4 group-hover:bg-blue-50/50 transition-colors">
        <div className="grid grid-cols-4 gap-2">
          {codes.map((code) => (
            <AnnotationBox
              key={code}
              code={code}
              isActive={selections.includes(code)}
              onToggle={() => onToggle(code)}
            />
          ))}
        </div>
      </td>
    </tr>
  );
}
