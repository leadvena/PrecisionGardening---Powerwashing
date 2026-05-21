import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { getBookings, saveBookings, Booking } from "./db";

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

  // ✅ Fail fast if env vars are missing
  const adminEmail = process.env.ADMIN_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;
  const siteUrl = process.env.SITE_URL;

  if (!adminEmail || !resendApiKey || !siteUrl) {
    console.error("Missing required env vars: ADMIN_EMAIL, RESEND_API_KEY, or SITE_URL");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  const { fullName, phone, email, serviceType, date, timeSlot, message } = req.body;

  if (!fullName || !phone || !email || !serviceType || !date || !timeSlot) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Generate unique booking reference
  const referenceId = "PRC-" + Math.floor(100000 + Math.random() * 900000);

  const newBooking: Booking = {
    id: referenceId,
    name: fullName,
    phone,
    email,
    service: serviceType,
    date,
    timeSlot,
    message: message || "",
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  // Save to Vercel KV / in-memory fallback
  const { bookings } = await getBookings();
  bookings.unshift(newBooking);
  const dbSaved = await saveBookings(bookings);

  try {
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: "Precision Bookings <onboarding@resend.dev>",
      to: adminEmail,
      subject: `📅 New Booking: ${referenceId} — ${fullName}`,
      html: `
        <div style="font-family: sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
          <div style="background-color: #1b3a2d; padding: 16px 24px; border-radius: 8px 8px 0 0; margin: -24px -24px 24px -24px;">
            <h2 style="font-size: 18px; font-weight: bold; color: #ffffff; margin: 0;">📅 New Booking Request</h2>
            <p style="font-size: 13px; color: #86efac; margin: 4px 0 0 0;">A customer has scheduled a slot — review and approve below.</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; font-weight: bold; color: #6b7280; width: 150px;">Booking ID:</td>
              <td style="padding: 10px 0; color: #111827; font-family: monospace; font-weight: bold; font-size: 15px;">${referenceId}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Customer:</td>
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
              <td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Service:</td>
              <td style="padding: 10px 0; color: #1b3a2d; font-weight: bold;">${serviceType}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Date:</td>
              <td style="padding: 10px 0; color: #111827; font-weight: bold;">${date}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Time Slot:</td>
              <td style="padding: 10px 0; color: #111827; font-weight: bold;">${timeSlot}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #6b7280; vertical-align: top;">Notes:</td>
              <td style="padding: 10px 0; color: #374151; line-height: 1.6; white-space: pre-wrap;">${message || "No additional notes."}</td>
            </tr>
          </table>

          <div style="text-align: center; margin-top: 8px;">
            <a href="${siteUrl}/#admin"
              style="display: inline-block; background-color: #1b3a2d; color: #ffffff; font-size: 14px; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 8px; letter-spacing: 0.5px;">
              🔐 Open Admin Dashboard
            </a>
            <p style="font-size: 11px; color: #9ca3af; margin-top: 12px;">
              You can approve, reject or mark this booking as completed in the dashboard.
            </p>
          </div>
        </div>
      `,
    });

    console.log(`\n--- [BOOKING SUBMITTED] ---`);
    console.log(`Reference: ${referenceId}`);
    console.log(`Customer:  ${fullName} (${email})`);
    console.log(`Schedule:  ${date} @ ${timeSlot}`);
    console.log(`DB Saved:  ${dbSaved ? "Yes (KV)" : "Yes (In-memory fallback)"}`);
    console.log(`---------------------------\n`);

    return res.status(200).json({
      success: true,
      referenceId,
      dbSaved,
    });

  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({ error: "Failed to send booking notification. Please try again." });
  }
}