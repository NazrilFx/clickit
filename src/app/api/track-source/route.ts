import maxmind, { CityResponse } from 'maxmind';
import path from 'path'; // <-- Tambahkan ini di atas
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const ip = "114.10.157.226"
    const dbPath = path.join(process.cwd(), 'public', 'GeoLite2-City.mmdb');
    const lookup = await maxmind.open<CityResponse>(dbPath);
    const result = lookup.get(ip) // inferred type maxmind.CityResponse

    const ua = req.headers.get("user-agent")?.toLowerCase() || "";

  let deviceType = "Unknown";

  if (ua.includes("android")) {
    deviceType = "Android";
  } else if (ua.includes("iphone")) {
    deviceType = "iPhone";
  } else if (ua.includes("ipad")) {
    deviceType = "iPad";
  } else if (ua.includes("windows")) {
    deviceType = "Windows";
  } else if (ua.includes("macintosh")) {
    deviceType = "Mac";
  } else if (ua.includes("linux")) {
    deviceType = "Linux";
  }


    const prefixLength = lookup.getWithPrefixLength(ip);
    return NextResponse.json({
      result,
      prefixLength,
      ua,
      deviceType
    })
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
