"use client";

import { useState } from "react";
import { groups } from "@/lib/data";
import GroupSection from "@/components/GroupSection";
import WishSection from "@/components/WishSection";

type Code = "green" | "yellow" | "red" | "star";

export default function Home() {
  const [participantId, setParticipantId] = useState("");
  const [annotations, setAnnotations] = useState<Record<string, Code[]>>({});
  const [wishes, setWishes] = useState([
    { data: "", decision: "" },
    { data: "", decision: "" },
    { data: "", decision: "" },
  ]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleToggle(indicator: string, code: Code) {
    setAnnotations((prev) => {
      const current = prev[indicator] || [];
      const next = current.includes(code)
        ? current.filter((c) => c !== code)
        : [...current, code];
      return { ...prev, [indicator]: next };
    });
  }

  function handleWishChange(index: number, field: "data" | "decision", value: string) {
    setWishes((prev) => prev.map((w, i) => (i === index ? { ...w, [field]: value } : w)));
  }

  async function handleSubmit() {
    setStatus("loading");
    setErrorMsg("");

    const payload = {
      participantId,
      annotations,
      wishes,
      submittedAt: new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const totalIndicators = groups.reduce((sum, g) => sum + g.indicators.length, 0);
  const answeredCount = Object.values(annotations).filter((v) => v.length > 0).length;
  const progress = Math.round((answeredCount / totalIndicators) * 100);

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md animate-slide-up">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Thank you!</h2>
          <p className="text-slate-500 text-sm">Your annotation has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="bg-[#1B3A6B] rounded-xl shadow-lg p-6 sm:p-8 mb-6 animate-slide-up">
        <h1 className="text-white text-lg sm:text-xl font-bold">
          Learning Analytics — Dashboard Annotation Sheet
        </h1>
        <p className="text-blue-200 text-xs sm:text-sm mt-1">
          For each indicator, mark your response using the four codes below. You may mark more than one code per indicator.
        </p>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
        {[
          { label: "GREEN — I use this", color: "bg-green-700", bg: "bg-green-50 border-green-200" },
          { label: "YELLOW — Seen but unsure", color: "bg-amber-500", bg: "bg-amber-50 border-amber-200" },
          { label: "RED — I ignore / don't understand", color: "bg-red-700", bg: "bg-red-50 border-red-200" },
          { label: "STAR — I wish I had this", color: "bg-orange-700", bg: "bg-orange-50 border-orange-200", icon: "\u2605" },
        ].map((item) => (
          <div key={item.label} className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-semibold ${item.bg}`}>
            <div className={`w-5 h-5 rounded-full ${item.color} flex items-center justify-center text-white text-[10px] shrink-0`}>
              {item.icon || ""}
            </div>
            <span className="text-slate-700 leading-tight">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6 animate-slide-up" style={{ animationDelay: "150ms" }}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-slate-500">Progress</span>
          <span className="text-xs font-bold text-[#2E5FA3]">{answeredCount} / {totalIndicators} indicators</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#2E5FA3] to-[#1B3A6B] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Instruction */}
      <div className="bg-blue-50 border-l-4 border-[#2E5FA3] p-3 rounded-r-lg mb-6 text-xs text-[#2E5FA3] italic animate-fade-in">
        Click each colored box to mark your response. You can select multiple codes per indicator.
      </div>

      {/* Groups */}
      <div className="space-y-6">
        {groups.map((group) => (
          <GroupSection
            key={group.id}
            group={group}
            annotations={annotations}
            onToggle={handleToggle}
          />
        ))}

        <WishSection wishes={wishes} onChange={handleWishChange} />
      </div>

      {/* Footer / Submit */}
      <div className="mt-8 bg-white rounded-xl shadow-lg border border-slate-200 p-6 animate-slide-up">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <label htmlFor="pid" className="font-semibold whitespace-nowrap">Participant ID:</label>
            <input
              id="pid"
              type="text"
              value={participantId}
              onChange={(e) => setParticipantId(e.target.value)}
              placeholder="e.g. P-01"
              className="border-b-2 border-slate-300 bg-transparent text-sm py-1 px-1 outline-none focus:border-[#2E5FA3] transition-colors w-28"
            />
          </div>
          <div className="flex-1" />
          <button
            onClick={handleSubmit}
            disabled={status === "loading"}
            className="bg-[#1B3A6B] hover:bg-[#2E5FA3] disabled:bg-slate-400 text-white font-semibold text-sm px-8 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95 cursor-pointer disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Annotation"
            )}
          </button>
        </div>
        {status === "error" && (
          <p className="text-red-600 text-xs mt-3 font-medium">{errorMsg}</p>
        )}
        <p className="text-center text-[11px] text-slate-400 mt-4">
          LA Interview Study — Annotation Stimulus Sheet
        </p>
      </div>
    </div>
  );
}
