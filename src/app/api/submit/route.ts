import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SubmissionData {
  participantId: string;
  annotations: Record<string, string[]>;
  wishes: { data: string; decision: string }[];
  submittedAt: string;
}

function buildEmailHtml(data: SubmissionData): string {
  const colorMap: Record<string, string> = {
    green: "#2e7d32",
    yellow: "#f9a825",
    red: "#c62828",
    star: "#e65100",
  };
  const labelMap: Record<string, string> = {
    green: "I use this",
    yellow: "Unsure",
    red: "Ignore",
    star: "Wish I had",
  };

  let rows = "";
  for (const [indicator, codes] of Object.entries(data.annotations)) {
    const badges = codes
      .map(
        (c) =>
          `<span style="display:inline-block;padding:2px 8px;border-radius:4px;background:${colorMap[c]};color:white;font-size:12px;margin-right:4px;">${labelMap[c]}</span>`
      )
      .join("");
    rows += `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:14px;">${indicator}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${badges || '<span style="color:#aaa;font-size:12px;">No response</span>'}</td></tr>`;
  }

  const wishRows = data.wishes
    .filter((w) => w.data || w.decision)
    .map(
      (w) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:14px;">&#9733; ${w.data}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:14px;">${w.decision}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:system-ui,sans-serif;max-width:700px;margin:0 auto;">
      <div style="background:#1B3A6B;padding:20px 24px;border-radius:8px 8px 0 0;">
        <h1 style="color:white;font-size:18px;margin:0;">LA Dashboard — Annotation Submission</h1>
        <p style="color:#a8c4e8;font-size:13px;margin:4px 0 0;">Participant: <strong>${data.participantId || "Not provided"}</strong> | ${data.submittedAt}</p>
      </div>
      <div style="background:white;padding:20px 24px;border:1px solid #e5e7eb;border-top:none;">
        <table style="width:100%;border-collapse:collapse;">
          <tr style="background:#f8fafc;"><th style="text-align:left;padding:8px 12px;font-size:13px;color:#64748b;">Indicator</th><th style="text-align:left;padding:8px 12px;font-size:13px;color:#64748b;">Response</th></tr>
          ${rows}
        </table>
        ${
          wishRows
            ? `<h3 style="margin:20px 0 8px;font-size:15px;color:#e65100;">Wishes</h3>
               <table style="width:100%;border-collapse:collapse;">
                 <tr style="background:#f8fafc;"><th style="text-align:left;padding:8px 12px;font-size:13px;color:#64748b;">Data wished for</th><th style="text-align:left;padding:8px 12px;font-size:13px;color:#64748b;">Decision it informs</th></tr>
                 ${wishRows}
               </table>`
            : ""
        }
      </div>
      <div style="background:#f8fafc;padding:12px 24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;text-align:center;font-size:12px;color:#94a3b8;">
        LA Interview Study — Annotation Stimulus Sheet
      </div>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const data: SubmissionData = await request.json();

    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_TO) {
      return NextResponse.json(
        { error: "Server email configuration missing" },
        { status: 500 }
      );
    }

    const { error } = await resend.emails.send({
      from: "LA Dashboard <onboarding@resend.dev>",
      to: process.env.EMAIL_TO,
      subject: `Annotation Submission — ${data.participantId || "Anonymous"} — ${data.submittedAt}`,
      html: buildEmailHtml(data),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
