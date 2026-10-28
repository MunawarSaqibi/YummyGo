const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  Referer: "https://www.swiggy.com/",
};

export async function proxySwiggy(url: string) {
  try {
    const upstream = await fetch(url, { headers: BROWSER_HEADERS });
    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "application/json",
        "Cache-Control": upstream.ok ? "public, max-age=0, must-revalidate" : "no-store",
        "Netlify-CDN-Cache-Control": upstream.ok ? "public, durable, s-maxage=300, stale-while-revalidate=600" : "no-store",
      },
    });
  } catch (error) {
    console.error("Swiggy proxy request failed:", error);
    return Response.json({ error: "Unable to reach restaurant service" }, { status: 502 });
  }
}
