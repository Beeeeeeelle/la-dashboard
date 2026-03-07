"use client";

interface Wish {
  data: string;
  decision: string;
}

interface Props {
  wishes: Wish[];
  onChange: (index: number, field: "data" | "decision", value: string) => void;
}

export default function WishSection({ wishes, onChange }: Props) {
  return (
    <div className="animate-slide-up">
      <div className="bg-[#1B3A6B] text-white px-5 py-3 rounded-t-lg">
        <h2 className="text-sm font-bold">
          &#9733; Your Own — Data You Wish You Had
        </h2>
        <p className="text-xs text-blue-200 mt-0.5 italic">
          If you could see any data not listed above, what would it be?
        </p>
      </div>
      <div className="bg-white border border-slate-200 border-t-0 rounded-b-lg p-4 space-y-3">
        {wishes.map((wish, i) => (
          <div key={i} className="flex items-center gap-3 text-sm">
            <span className="text-orange-600 font-bold text-lg shrink-0">&#9733;</span>
            <input
              type="text"
              value={wish.data}
              onChange={(e) => onChange(i, "data", e.target.value)}
              placeholder="Describe the data you wish you had..."
              className="flex-1 border-b-2 border-dashed border-orange-300 bg-transparent text-orange-900 placeholder:text-orange-300 text-sm py-1 px-1 outline-none focus:border-orange-500 transition-colors"
            />
            <span className="text-xs text-slate-400 shrink-0 hidden sm:inline">
              What decision would it inform?
            </span>
            <input
              type="text"
              value={wish.decision}
              onChange={(e) => onChange(i, "decision", e.target.value)}
              placeholder="Write here..."
              className="flex-1 border-b-2 border-dashed border-orange-300 bg-transparent text-orange-900 placeholder:text-orange-300 text-sm py-1 px-1 outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
