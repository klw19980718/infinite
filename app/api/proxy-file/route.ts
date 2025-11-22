import { NextRequest, NextResponse } from "next/server"

const ALLOWED_HOSTNAMES = new Set(["cdn.infinitetalkai.org"])

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const target = searchParams.get("url")

  if (!target) {
    return NextResponse.json(
      { ok: false, code: "MISSING_URL", message: "Missing url parameter" },
      { status: 400 },
    )
  }

  let targetUrl: URL
  try {
    targetUrl = new URL(target)
  } catch {
    return NextResponse.json(
      { ok: false, code: "INVALID_URL", message: "Invalid url parameter" },
      { status: 400 },
    )
  }

  if (!["http:", "https:"].includes(targetUrl.protocol)) {
    return NextResponse.json(
      { ok: false, code: "UNSUPPORTED_PROTOCOL", message: "Only http/https protocols are supported" },
      { status: 400 },
    )
  }

  if (!ALLOWED_HOSTNAMES.has(targetUrl.hostname)) {
    return NextResponse.json(
      { ok: false, code: "HOST_NOT_ALLOWED", message: "Host is not allowed for proxy" },
      { status: 400 },
    )
  }

  // Forward the request to the upstream CDN
  const upstreamResponse = await fetch(targetUrl.toString(), {
    method: "GET",
    // Forward range header for audio streaming if present
    headers: {
      ...(request.headers.get("range") ? { range: request.headers.get("range") as string } : {}),
    },
  })

  // Pass through important headers (content type, length, range info, caching)
  const headers = new Headers()
  const passthroughHeaders = [
    "content-type",
    "content-length",
    "accept-ranges",
    "content-range",
    "cache-control",
    "etag",
    "last-modified",
  ]

  for (const [key, value] of upstreamResponse.headers.entries()) {
    if (passthroughHeaders.includes(key.toLowerCase())) {
      headers.set(key, value)
    }
  }

  return new NextResponse(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers,
  })
}


