import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const referer = req.headers.get('referer') || 'Tidak diketahui';
  const searchParams = req.nextUrl.searchParams;

  const utmSource = searchParams.get('utm_source') || 'unknown';
  const utmCampaign = searchParams.get('utm_campaign') || 'unknown';

  console.log("📥 Tracking dari GET:");
  console.log("Referrer:", referer);
  console.log("UTM Source:", utmSource);
  console.log("UTM Campaign:", utmCampaign);

  return NextResponse.json({
    referrer: referer,
    utmSource,
    utmCampaign,
    status: "ok"
  });
}