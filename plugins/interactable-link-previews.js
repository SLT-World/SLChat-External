style = document.createElement('style');
document.head.appendChild(style);
style.type = 'text/css';
style.appendChild(document.createTextNode(`iframe { margin: 0 !important; max-width: 100% !important; }
.bluesky-embed { margin: 0 !important; }
.instagram-media { max-width: 400px !important; width: 100% !important; min-width: unset !important; }
.gist-embed { background: var(--primary-color); border-radius: 5px; border: 1px solid var(--light-gray-color); max-width: 800px; }
`));

function spotifyEmbedHeight(type) {
    switch (type) {
        case "track": return 80;
        case "episode": return 152;
        case "show": return 152;
        default: return 352;
    }
}

function soundCloudEmbedHeight(type) {
    switch (type) {
        case "users": return 350;
        default: return 150;
    }
}

function spotifyToEmbedUrl(url) {
    const clean = url.split("?")[0];
    const match = clean.match(/open\.spotify\.com\/(track|album|playlist|episode|show|artist)\/([A-Za-z0-9]+)/);
    if (!match) return null;
    const type = match[1];
    const id = match[2];
    return { url: `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`, type };
}

const soundcloudCache = new Map();

function soundCloudToEmbedUrl(url) {
    if (soundcloudCache.has(url)) return soundcloudCache.get(url);
    try {
        const request = new XMLHttpRequest();
        request.open("GET", `https://soundcloud.com/oembed?format=json&iframe=true&url=${encodeURIComponent(url)}`, false);
        request.send(null);
        if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            const sourceMatch = data.html.match(/src="([^"]+)"/);
            const embedUrl = sourceMatch ? sourceMatch[1] : null;

            const type = new URL(decodeURIComponent(new URL(embedUrl).searchParams.get("url"))).pathname.split("/").filter(Boolean)[0];
            const embedData = { url: embedUrl, type };
            soundcloudCache.set(url, embedData);
            return embedData;
        }
        return null;
    }
    catch { soundcloudCache.set(url, null); return null; }
}

function blueskyToEmbedUrl(url) {
    try {
        const parts = new URL(url).pathname.split("/").filter(Boolean);
        if (parts[0] === "profile" && parts[2] === "post") {
            const handle = parts[1];
            let did = handle;
            if (!handle.startsWith("did:")) {
                const request = new XMLHttpRequest();
                request.open("GET", `https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${handle}`, false);
                request.send(null);
                if (request.status === 200) did = JSON.parse(request.responseText).did;
            }
            return `at://${did}/app.bsky.feed.post/${parts[3]}`;
        }
    }
    catch { return null; }
}

const originalRenderEmbed = renderEmbed;
renderEmbed = function(embed) {
    let spotifyUrl = null;
    let soundCloudUrl = null;
    let redditUrl = null;
    let blueskyUrl = null;
    let instagramUrl = null;
    let gistUrl = null;
    for (const field of embed.fields || []) {
        const spotifyMatch = field.name.match(/\((https:\/\/open\.spotify\.com\/[^\)]+)\)/);
        const soundCloudMatch = field.name.match(/\((https:\/\/soundcloud\.com\/[^\)]+)\)/);
        const redditMatch = field.name.match(/\((https?:\/\/(?:www\.)?reddit\.com\/r\/[^\)]+)\)/);
        const blueskyMatch = field.name.match(/\((https?:\/\/(?:www\.)?bsky\.app\/[^\)]+)\)/);
        const instagramMatch = field.name.match(/\((https?:\/\/(?:www\.)?instagram\.com\/(?:[^\/]+\/)?(?:p|reel)\/[^\)\/]+\/?)\)/);
        const gistMatch = field.name.match(/\((https?:\/\/gist\.github\.com\/[^\)\/]+\/[^\)\/]+)\)/);
        if (spotifyMatch) {
            spotifyUrl = spotifyMatch[1];
            break;
        }
        else if (soundCloudMatch) {
            soundCloudUrl = soundCloudMatch[1];
            break;
        }
        else if (redditMatch) {
            redditUrl = redditMatch[1];
            break;
        }
        else if (blueskyMatch) {
            blueskyUrl = blueskyMatch[1];
            break;
        }
        else if (instagramMatch) {
            const parts = new URL(instagramMatch[1]).pathname.split("/").filter(Boolean);
            if (parts.length >= 2 && (parts[parts.length - 2] === "p" || parts[parts.length - 2] === "reel")) instagramUrl =`https://www.instagram.com/${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
            break;
        }
        else if (gistMatch) {
            gistUrl = gistMatch[1];
            break;
        }
    }

    if (spotifyUrl) {
        const info = spotifyToEmbedUrl(spotifyUrl);
        if (info) return `<div class="spotify-embed"><iframe src="${info.url}" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" frameborder="0" height="${spotifyEmbedHeight(info.type)}"></iframe></div>`;
    }
    if (soundCloudUrl) {
        const info = soundCloudToEmbedUrl(soundCloudUrl);
        if (info) return `<div class="soundcloud-embed"><iframe src="${info.url}" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" frameborder="0" height="${soundCloudEmbedHeight(info.type)}"></iframe></div>`;
    }
    if (redditUrl) {
        runRedditWidget();
        return `<blockquote class="reddit-embed-bq"><a href="${redditUrl}"></a></blockquote>`;
    }
    if (blueskyUrl) {
        runBlueskyWidget();
        return `<blockquote class="bluesky-embed" data-bluesky-uri="${blueskyToEmbedUrl(blueskyUrl)}" data-bluesky-embed-color-mode="system"></blockquote>`;
    }
    if (instagramUrl) {
        const html = `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${instagramUrl}"><div><a href="${instagramUrl}"></a></div></blockquote>`;
        setTimeout(runInstagramWidget, 0);
        return html;
    }
    if (gistUrl) {
        const placeholder = "gist-" + Math.random().toString(36).substring(2);
        const html = `<div id="${placeholder}" class="gist-embed"></div>`;
        setTimeout(() => {
            const parts = new URL(gistUrl).pathname.split("/").filter(Boolean);

            const iframe = document.createElement('iframe');
            iframe.style.width = "100%";
            iframe.style.border = "0";
            iframe.style.minHeight = "250px";
            document.getElementById(placeholder).appendChild(iframe);

            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            iframeDocument.open();
            iframeDocument.write(`<script src="https://gist.github.com/${parts[0]}/${parts[1]}.js"></script>`);
            iframeDocument.close();
        }, 0);
        return html;
    }
    return originalRenderEmbed(embed);
};

function runRedditWidget() {
    const redditScript = document.querySelector('script[src="https://embed.reddit.com/widgets.js"]');
    if (redditScript) redditScript.remove();
    const script = document.createElement("script");
    script.src = "https://embed.reddit.com/widgets.js";
    script.async = true;
    script.charset = "UTF-8";
    document.head.appendChild(script);
}

function runBlueskyWidget() {
    const blueskyScript = document.querySelector('script[src="https://embed.bsky.app/static/embed.js"]');
    if (blueskyScript) blueskyScript.remove();
    const script = document.createElement("script");
    script.src = "https://embed.bsky.app/static/embed.js";
    script.async = true;
    script.charset = "UTF-8";
    document.head.appendChild(script);
}

function runInstagramWidget() {
    if (!document.querySelector('script[src="https://www.instagram.com/embed.js"]')) {
        const script = document.createElement("script");
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        script.charset = "UTF-8";
        document.head.appendChild(script);
        return;
    }
    if (window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === "function") {
        window.instgrm.Embeds.process();
    }
}