export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url).searchParams.get("url");
    if (!url) return new Response("Missing URL", { status: 400 });

    if (!/^https?:\/\//i.test(url)) return new Response("Invalid URL", { status: 400 });

    let target;
    try { target = new URL(url); }
    catch { return new Response("Invalid URL", { status: 400 }); }

    const controller = new AbortController();
    const signal = controller.signal;

    const upstream = await fetch(target.toString(), { signal }, headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0"});
    const reader = upstream.body.pipeThrough(new TextDecoderStream()).getReader();

    let buffer = "";

    let site = null;
    let title = null;
    let description = null;
    let image = null;
    let themeColor = null;

    const isFinished = () => site && title && description && image && themeColor;

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += value;
        if (!site) {
          const meta = buffer.match(/<meta[^>]+(?:property|name)\s*=\s*["']og:site_name["'][^>]*content\s*=\s*["']([^"']+)["']/i);
          if (meta) site = meta[1].trim();
        }

        if (!title) {
          const meta = buffer.match(/<title[^>]*>(.*?)<\/title>/i);
          if (meta) title = meta[1].trim();
        }

        if (!description) {
          const meta = buffer.match(/<meta[^>]+(?:property|name)\s*=\s*["']og:description["'][^>]*content\s*=\s*["']([^"']+)["']/i);
          if (meta) description = meta[1].trim();
        }

        if (!description) {
          const meta = buffer.match(/<meta[^>]+(?:property|name)\s*=\s*["']description["'][^>]*content\s*=\s*["']([^"']+)["']/i);
          if (meta) description = meta[1].trim();
        }

        if (!image) {
          const meta = buffer.match(/<meta[^>]+(?:property|name)\s*=\s*["']og:image["'][^>]*content\s*=\s*["']([^"']+)["']/i);
          if (meta) image = meta[1].trim();
        }

        if (!themeColor) {
          const meta = buffer.match(/<meta[^>]+(?:property|name)\s*=\s*["']theme-color["'][^>]*content\s*=\s*["']([^"']+)["']/i);
          if (meta) themeColor = meta[1].trim();
        }

        if (buffer.includes("</head>") || isFinished()) {
          controller.abort();
          break;
        }

        if (buffer.length > 200_000) {
          controller.abort();
          break;
        }
      }
    } catch { }

    return new Response(
      JSON.stringify({ site, title, description, image, themeColor }, null, 2),
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "https://slchat.alwaysdata.net" } }
    );
  }
};