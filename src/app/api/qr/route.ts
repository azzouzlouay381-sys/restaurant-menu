import { generateQRBuffer } from "@/services/qrService";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json(
        { error: "URL parameter is required" },
        { status: 400 }
      );
    }

    // 1. Generate the original Node.js Buffer
    const buffer = await generateQRBuffer({ url });

    // 2. Convert it to Uint8Array so Netlify/TypeScript stops complaining
    const body = new Uint8Array(buffer);

    // 3. Return the response with the correct web-compliant body
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'attachment; filename="menu-qr.png"',
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 }
    );
  }
}