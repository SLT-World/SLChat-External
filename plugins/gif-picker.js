var pluginControls = document.querySelector('.controls');

async function toggleGifCard() {
    var gif_card = document.getElementById('gif_card');
    if (gif_card) {
        gif_card.classList.toggle('open');
        if (gif_card.classList.contains('open')) {
            document.getElementById('gif_input')?.focus();
            if (gif_grid.innerHTML.trim() == "") await loadGifs();
        }
    }
}

const GIF_SERVICES = {
    tenor: {
        trending: () => `https://g.tenor.com/v1/trending?key=LIVDSRZULELA`,
        search: query => `https://g.tenor.com/v1/search?q=${encodeURIComponent(query)}&key=LIVDSRZULELA`,
        extract: result => {
            const media = result.media?.[0];
            return {
                preview: media?.nanogif?.url || media?.tinygif?.url,
                hd: media?.webp?.url || media?.gif?.url
            };
        },
        list: data => data.results
    },
    giphy: {
        trending: () => `https://api.giphy.com/v1/gifs/trending?api_key=Gc7131jiJuvI7IdN0HZ1D7nh0ow5BU6g&limit=20`,
        search: query => `https://api.giphy.com/v1/gifs/search?api_key=Gc7131jiJuvI7IdN0HZ1D7nh0ow5BU6g&q=${encodeURIComponent(query)}&limit=20`,
        extract: result => {
            const media = result.images;
            return {
                preview: media.preview_webp?.url || media.preview_gif?.url,
                hd: media.fixed_height_downsampled?.webp || media.fixed_height_downsampled?.url || media.original?.webp || media.original?.url
            };
        },
        list: data => data.data
    },
};


let service = "tenor";//tenor, giphy, klipy

async function loadGifs(query = "") {
    const gif_grid = document.getElementById('gif_grid');
    gif_grid.innerHTML = `<i class="bx bx-loader-dots bx-spin bx-md"></i>`;
    const selectedService = GIF_SERVICES[service];
    try {
        const url = query ? selectedService.search(query) : selectedService.trending();
        const res = await fetch(url);
        const data = await res.json();
        gif_grid.innerHTML = "";
        for (const item of selectedService.list(data)) {
            const { preview, hd } = selectedService.extract(item);
            if (!preview || !hd) continue;
            const img = document.createElement('img');
            img.src = preview || hd;
            img.style.width = "150px";
            img.style.height = "auto";
            img.style.cursor = "pointer";
            img.onclick = () => {
                send(hd || preview);
                toggleGifCard();
            };
            gif_grid.appendChild(img);
        }

        if (!gif_grid.hasChildNodes()) gif_grid.textContent = "No GIFs found.";
    } catch (err) {
        console.error("GIF fetch error:", err);
        gif_grid.textContent = "Failed to load GIFs.";
    }
}

if (pluginControls) {
    var newButton = document.createElement("button");
    newButton.innerHTML = `<i class="bx bx-image-landscape"></i>`;
    newButton.onclick = () => { toggleGifCard(); };
    pluginControls.insertBefore(newButton, pluginControls.querySelector('button[onclick="sendMessage()"]'));
    document.body.insertAdjacentHTML('beforeend', `<div id="gif_card" style="box-shadow: 0 5px 10px rgb(0 0 0 / 0.75); border: 1px solid var(--light-gray-color); position: fixed; max-width: 365px; max-height: 400px; background: var(--darker-secondary-color); padding: 10px;bottom: 80px;right: 20px;top: unset;left: unset;transform: unset;" class="card">
<div style="display: flex; align-items: center; justify-content: flex-end; position: relative;">
    <button onclick="toggleGifCard()"><i class="bx bx-x-circle"></i></button>
    <p class="text" style="text-align: center; position: absolute; left: 50%; transform: translateX(-50%);">GIFs</p>
</div>
<input id="gif_input" type="text" style="margin: 10px 0;">
<div id="gif_grid" class="grid" style="background: var(--secondary-color); border-radius: 5px; padding: 10px; overflow: auto; justify-content: center; max-height: 275px;display: flex;flex-wrap: wrap;flex-direction: row;align-items: stretch;">
</div>
</div>`);
    document.getElementById('gif_input').addEventListener('keydown', async function (e) {
        if (e.key === 'Enter') await loadGifs({ query: this.value.trim() });
    });
}