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

  const { fullName, phone, email, serviceType, date, timeSlot, message } = req.body;
  if (!fullName || !phone || !email || !serviceType || !date || !timeSlot) {
    return res.status(400).json({ error: "Missing required parameters" });
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
    createdAt: new Date().toISOString()
  };

  // Save to Vercel KV / in-memory list
  const { bookings } = await getBookings();
  bookings.unshift(newBooking);
  const dbSaved = await saveBookings(bookings);

  const adminEmail = process.env.ADMIN_EMAIL || "admin@precisionexterior.com";
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);

      // Email to Admin
      await resend.emails.send({
        from: "Precision Bookings <onboarding@resend.dev>",
        to: adminEmail,
        subject: `New Booking Requested: ${referenceId} - ${fullName}`,
        html: `
          <div style="font-family: sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
            <h2 style="font-size: 18px; font-weight: bold; color: #1e6fa8; margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">New Service Booking Logged</h2>
            <p style="font-size: 14px; color: #4b5563;">A customer has requested a specific date and time slot. Approve this booking in the Admin Dashboard.</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 16px;">
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563; width: 140px;">Booking ID:</td>
                <td style="padding: 10px 0; color: #111827; font-family: monospace; font-weight: bold;">${referenceId}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Customer Name:</td>
                <td style="padding: 10px 0; color: #111827;">${fullName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Phone Number:</td>
                <td style="padding: 10px 0; color: #111827;">${phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Email Address:</td>
                <td style="padding: 10px 0; color: #111827;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Service Needed:</td>
                <td style="padding: 10px 0; color: #1b3a2d; font-weight: bold;">${serviceType}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Date Requested:</td>
                <td style="padding: 10px 0; color: #111827;"><strong>${date}</strong></td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Preferred Time:</td>
                <td style="padding: 10px 0; color: #111827;"><strong>${timeSlot}</strong></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563; vertical-align: top;">Notes/Comments:</td>
                <td style="padding: 10px 0; color: #111827; line-height: 1.5; white-space: pre-wrap;">${message || "No notes."}</td>
              </tr>
            </table>
          </div>
        `
      });

      // Email to Customer
      await resend.emails.send({
        from: "Precision Exterior <onboarding@resend.dev>",
        to: email,
        subject: `Your Booking Request: ${referenceId}`,
        html: `
          <div style="font-family: sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
            <h2 style="font-size: 18px; font-weight: bold; color: #1b3a2d; margin-bottom: 12px;">Booking Successfully Requested</h2>
            <p style="font-size: 14px; color: #4b5563; line-height: 1.5; margin-bottom: 16px;">Hello ${fullName},</p>
            <p style="font-size: 14px; color: #4b5563; line-height: 1.5; margin-bottom: 20px;">We have successfully received your booking request. Our crew scheduling coordinator will review the date and time slot and send you a confirmation message shortly.</p>
            <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; font-size: 13px; color: #374151; border: 1px solid #e5e7eb; margin-bottom: 24px;">
              <strong style="color: #1e6fa8;">Booking Details:</strong>
              <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #4b5563; line-height: 1.6;">
                <li>Booking Reference: <strong>${referenceId}</strong></li>
                <li>Requested Date: <strong>${date}</strong></li>
                <li>Preferred Slot: <strong>${timeSlot}</strong></li>
                <li>Service: <strong>${serviceType}</strong></li>
              </ul>
            </div>
            <p style="font-size: 14px; color: #4b5563; line-height: 1.5;">Warm regards,<br/><strong>Precision Gardening & Power Washing Team</strong></p>
          </div>
        `
      });
    } catch (err) {
      console.error("Failed to send booking emails via Resend:", err);
    }
  }

  // Development logs
  console.log(`\n--- [DEV BOOKING EVENT] ---`);
  console.log(`Reference: ${referenceId}`);
  console.log(`Customer: ${fullName} (${email})`);
  console.log(`Schedule: ${date} @ ${timeSlot}`);
  console.log(`Database Saved: ${dbSaved ? "Yes (KV)" : "Yes (In-memory fallback)"}`);
  console.log(`---------------------------\n`);

  return res.status(200).json({
    success: true,
    referenceId,
    dbSaved
  });
}
