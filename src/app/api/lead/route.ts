import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { navn, telefon, postnummer, oppdragType, hastegrad, samtykke } = body;
    if (!navn || !telefon || !postnummer || !oppdragType || !samtykke) {
      return NextResponse.json({ error: "Mangler påkrevde felt" }, { status: 400 });
    }
    // TODO: Koble til Resend eller annen e-posttjeneste
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ from: process.env.FROM_EMAIL!, to: process.env.TO_EMAIL!, subject: `Ny lead: ${oppdragType} – ${navn}`, ... });
    console.log("Ny rørlegger-lead:", { navn, telefon, postnummer, oppdragType, hastegrad });
    return NextResponse.json({ success: true, message: "Forespørsel mottatt" }, { status: 200 });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json({ error: "Intern feil" }, { status: 500 });
  }
}
