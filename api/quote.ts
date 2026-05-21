import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fullName, phone, email, serviceType, message } = req.body;
  if (!fullName || !phone || !email || !serviceType) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const adminEmail = process.env.ADMIN_EMAIL || "admin@precisionexterior.com";
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: "Precision Quotes <onboarding@resend.dev>",
        to: adminEmail,
        subject: `💬 New Quote Request: ${serviceType} — ${fullName}`,
        html: `
          <div style="font-family: sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
            <div style="background-color: #1e3a5f; padding: 16px 24px; border-radius: 8px 8px 0 0; margin: -24px -24px 24px -24px;">
              <h2 style="font-size: 18px; font-weight: bold; color: #ffffff; margin: 0;">💬 New Quote / Inquiry</h2>
              <p style="font-size: 13px; color: #93c5fd; margin: 4px 0 0 0;">A potential customer is requesting an estimate — review their details below.</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #6b7280; width: 150px;">Customer:</td>
                <td style="padding: 10px 0; color: #111827;">${fullName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Phone:</td>
                <td style="padding: 10px 0; color: #111827;">${phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Email:</td>
                <td style="padding: 10px 0; color: #111827;"><a href="mailto:${email}" style="color: #1e6fa8;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Service Needed:</td>
                <td style="padding: 10px 0; color: #1b3a2d; font-weight: bold;">${serviceType}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #6b7280; vertical-align: top;">Details / Notes:</td>
                <td style="padding: 10px 0; color: #374151; line-height: 1.6; white-space: pre-wrap;">${message || "No details provided."}</td>
              </tr>
            </table>

            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 14px 18px; font-size: 13px; color: #166534; margin-bottom: 8px;">
              <strong>Next step:</strong> Reply to the customer directly at <a href="mailto:${email}" style="color: #166534;">${email}</a> or call <strong>${phone}</strong> to provide their quote.
            </div>
          </div>
        `
      });
    } catch (err) {
      console.error("Failed to send quote notification via Resend:", err);
    }
  }

  // Always log to terminal console in development
  console.log(`\n--- [DEV QUOTE EVENT] ---`);
  console.log(`Customer: ${fullName} (${email})`);
  console.log(`Service: ${serviceType}`);
  console.log(`Phone: ${phone}`);
  console.log(`Details: ${message}`);
  console.log(`-------------------------\n`);

  return res.status(200).json({
    success: true,
    message: "Quote request successfully submitted"
  });
}
