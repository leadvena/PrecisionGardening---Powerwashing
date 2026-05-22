import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers on every response
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // CORS Preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fullName, phone, email, serviceType, message } = req.body;

  if (!fullName || !phone || !email || !serviceType) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const adminEmail = process.env.ADMIN_EMAIL || "cesaresmero2@gmail.com";
  const resendApiKey = process.env.RESEND_API_KEY;

  let emailSentSuccessfully = false;

  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);

      // Email to Admin
      await resend.emails.send({
        from: "Precision Quotes <onboarding@resend.dev>",
        to: adminEmail,
        subject: `New Quote Request: ${serviceType} - ${fullName}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
            <h2 style="font-size: 18px; font-weight: bold; color: #1b3a2d; margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">New Lead: Quote Requested</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563; width: 140px;">Customer Name:</td>
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
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563; vertical-align: top;">Details / Notes:</td>
                <td style="padding: 10px 0; color: #111827; line-height: 1.5; white-space: pre-wrap;">${message || "No details provided."}</td>
              </tr>
            </table>
          </div>
        `
      });

      // Confirmation to Customer
      try {
        await resend.emails.send({
          from: "Precision Exterior <onboarding@resend.dev>",
          to: email,
          subject: "We received your quote request!",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
              <h2 style="font-size: 18px; font-weight: bold; color: #1b3a2d; margin-bottom: 12px;">Estimate Request Received</h2>
              <p style="font-size: 14px; color: #4b5563; line-height: 1.5; margin-bottom: 16px;">Hello ${fullName},</p>
              <p style="font-size: 14px; color: #4b5563; line-height: 1.5; margin-bottom: 20px;">We have successfully received your quote request for <strong>${serviceType}</strong>. An outdoor care coordinator will review your property parameters and reach out within 2 hours with an estimate.</p>
              <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; font-size: 13px; color: #374151; border: 1px solid #e5e7eb;">
                <strong style="color: #1b3a2d;">Request Overview:</strong>
                <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #4b5563;">
                  <li>Requested Service: ${serviceType}</li>
                  <li>Contact Phone: ${phone}</li>
                </ul>
              </div>
              <p style="font-size: 14px; color: #4b5563; line-height: 1.5; margin-top: 24px;">Warm regards,<br/><strong>Precision Gardening & Power Washing Team</strong></p>
            </div>
          `
        });
      } catch (custErr) {
        console.warn("Client notification email failed (Resend sandbox limits default sending to verified emails only):", custErr);
      }

      emailSentSuccessfully = true;
    } catch (err) {
      console.error("Failed to send quote emails via Resend:", err);
      // Let execution continue to return 200 since form registration was logged successfully
    }
  } else {
    console.warn("Missing RESEND_API_KEY environment variable. Skipping email triggers.");
  }

  // Always log to terminal console in development
  console.log(`\n--- [DEV QUOTE EVENT] ---`);
  console.log(`Customer: ${fullName} (${email})`);
  console.log(`Service: ${serviceType}`);
  console.log(`Phone: ${phone}`);
  console.log(`Details: ${message}`);
  console.log(`Emails Dispatched: ${emailSentSuccessfully ? "Yes" : "No (Disabled or missing API Key)"}`);
  console.log(`-------------------------\n`);

  return res.status(200).json({
    success: true,
    message: "Quote request successfully submitted",
    emailSent: emailSentSuccessfully
  });
}
