import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, phone, service, message } = await req.json();

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Imię i telefon są wymagane." },
        { status: 400 }
      );
    }

    const serviceLabel = service
      ? `<p><strong>Usługa:</strong> ${service}</p>`
      : "";
    const messageLabel = message
      ? `<p><strong>Wiadomość:</strong> ${message}</p>`
      : "";

    await resend.emails.send({
      from: "Akademia Frycka <onboarding@resend.dev>",
      to: "krabmarcina@gmail.com",
      replyTo: undefined,
      subject: `Nowe zgłoszenie: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #0A0A0A; padding: 24px; text-align: center; margin-bottom: 24px;">
            <p style="color: #C9A84C; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; margin: 0 0 4px;">Salon Fryzjerski</p>
            <h1 style="color: #F5F0E8; font-size: 22px; margin: 0;">Akademia Frycka</h1>
          </div>

          <h2 style="font-size: 16px; color: #333; margin-bottom: 16px;">Nowe zgłoszenie z formularza</h2>

          <p><strong>Imię i nazwisko:</strong> ${name}</p>
          <p><strong>Telefon:</strong> <a href="tel:${phone}">${phone}</a></p>
          ${serviceLabel}
          ${messageLabel}

          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="font-size: 11px; color: #999;">Wierzbięcice 18, Górna Wilda, Poznań · akademia-frycka.vercel.app</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Błąd wysyłania. Spróbuj ponownie." },
      { status: 500 }
    );
  }
}
