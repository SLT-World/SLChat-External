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

    const upstream = await fetch(target.toString(), { signal });
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
        buffer += value.toLowerCase();
        if (!site) {
          const meta = buffer.match(/<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']+)["']/i);
          if (meta) site = meta[1].trim();
        }

        if (!title) {
          const meta = buffer.match(/<title[^>]*>(.*?)<\/title>/i);
          if (meta) title = meta[1].trim();
        }

        if (!description) {
          const meta = buffer.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i);
          if (meta) description = meta[1].trim();
        }

        if (!description) {
          const meta = buffer.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
          if (meta) description = meta[1].trim();
        }

        if (!image) {
          const meta = buffer.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
          if (meta) image = meta[1].trim();
        }

        if (!themeColor) {
          const meta = buffer.match(/<meta[^>]+name=["']theme-color["'][^>]+content=["']([^"']+)["']/i);
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