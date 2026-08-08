import { NextResponse } from "next/server";

/**
 * Served at /ads.txt. Reads the same NEXT_PUBLIC_ADSENSE_CLIENT_ID env var
 * used by the AdSense script/meta tag, so there's one place to configure
 * the publisher ID instead of a static file to remember to edit.
 */
export function GET() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  const pubId = clientId?.replace(/^ca-pub-/, "pub-");

  const body = pubId
    ? `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`
    : "# Set NEXT_PUBLIC_ADSENSE_CLIENT_ID to publish this file's contents.\n";

  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
