"use client";

type Code = "green" | "yellow" | "red" | "star";

const config: Record<Code, { label: string; idle: string; active: string }> = {
  green: {
    label: "G",
    idle: "border-green-700 text-green-700 bg-green-50 hover:bg-green-100",
    active: "bg-green-700 text-white border-green-700 shadow-md",
  },
  yellow: {
    label: "Y",
    idle: "border-amber-500 text-amber-700 bg-amber-50 hover:bg-amber-100",
    active: "bg-amber-500 text-white border-amber-500 shadow-md",
  },
  red: {
    label: "R",
    idle: "border-red-700 text-red-700 bg-red-50 hover:bg-red-100",
    active: "bg-red-700 text-white border-red-700 shadow-md",
  },
  star: {
    label: "\u2605",
    idle: "border-orange-700 text-orange-700 bg-orange-50 hover:bg-orange-100",
    active: "bg-orange-700 text-white border-orange-700 shadow-md",
  },
};

interface Props {
  code: Code;
  isActive: boolean;
  onToggle: () => void;
}

export default function AnnotationBox({ code, isActive, onToggle }: Props) {
  const c = config[code];
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`
        h-8 rounded-md border-2 border-dashed flex items-center justify-center
        text-xs font-bold cursor-pointer transition-all duration-150
        hover:scale-105 active:scale-95
        ${isActive ? `${c.active} border-solid` : c.idle}
      `}
    >
      {c.label}
    </button>
  );
}
