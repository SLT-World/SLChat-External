export default {
    async fetch(request, env, ctx) {
        function extractMeta(buffer, name) {
            const re = new RegExp(`<meta[^>]+(?:property|name)="${name}"[^>]+content="([^"]+)"[^>]*>|<meta[^>]+content="([^"]+)"[^>]+(?:property|name)="${name}"[^>]*>i`);

            const match = buffer.match(re);
            if (!match) return null;
            return match[1] || match[2];
        }
        const parameters = new URL(request.url).searchParams;
        const url = parameters.get("url");
        const raw = parameters.get("raw") === "true";

        if (!url) return new Response(JSON.stringify({ error: "Missing URL" }), { status: 400, headers: { "Content-Type": "application/json" } });

        if (!/^https?:\/\//i.test(url)) return new Response(JSON.stringify({ error: "Invalid URL" }), { status: 400, headers: { "Content-Type": "application/json" } });

        let target;
        try { target = new URL(url); }
        catch { return new Response(JSON.stringify({ error: "Invalid URL" }), { status: 400, headers: { "Content-Type": "application/json" } }); }

        const controller = new AbortController();
        const signal = controller.signal;

        const upstream = await fetch(target.toString(), {
            method: "GET",
            redirect: "follow",
            signal,
            cf: { scrapeShield: false },
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Accept-Encoding": "identity",
                "Connection": "keep-alive",
                "Upgrade-Insecure-Requests": "1"
            }
        });

        const reader = upstream.body.pipeThrough(new TextDecoderStream()).getReader();

        let buffer = "";
        let headContent = "";
        let capturingHead = false;

        let site = null;
        let title = null;
        let description = null;
        let image = null;
        let theme = null;

        const isFinished = () => site && title && description && image && theme;

        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                buffer += value;

                //if (raw) {
                if (!capturingHead) {
                    const start = buffer.match(/<head[^>]*>/i);
                    if (start) {
                        capturingHead = true;
                        headContent = buffer.slice(start.index);
                    }
                }
                else headContent += value;
                if (capturingHead && /<\/head>/i.test(headContent)) {
                    controller.abort();
                    break;
                }
                //}
                if (!raw)  {
                    if (!site) site = extractMeta(buffer, "og:site_name");
                    if (!title) {
                        const meta = buffer.match(/<title[^>]*>(.*?)<\/title>/i);
                        if (meta) title = meta[1].trim();
                    }
                    if (!description) description = extractMeta(buffer, "og:description");
                    if (!description) description = extractMeta(buffer, "description");
                    if (!image) image = extractMeta(buffer, "og:image");
                    if (!theme) theme = extractMeta(buffer, "theme-color");

                    if (buffer.includes("</head>") || isFinished()) {
                        controller.abort();
                        break;
                    }
                }

                if (buffer.length > 200_000) {
                    controller.abort();
                    break;
                }
            }
        } catch { }

        if (raw) return new Response(headContent, { headers: { "Content-Type": "text/plain; charset=UTF-8", "Access-Control-Allow-Origin": "https://slchat.alwaysdata.net" } });
        return new Response(JSON.stringify({ site, title, description, image, theme, headContent }), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "https://slchat.alwaysdata.net" } });
    }
};