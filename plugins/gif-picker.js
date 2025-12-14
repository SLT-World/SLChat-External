async function toggleGifCard() {
  var gif_card = document.getElementById('gif_card');
  if (gif_card) { 
    gif_card.classList.toggle('open');
    if (gif_card.classList.contains('open')) {
      const gif_input = document.getElementById('gif_input')
      if (gif_input) { gif_input.focus(); }
      if (gif_grid.innerHTML.trim() == "") { await load_gifs(`https://g.tenor.com/v1/trending?key=LIVDSRZULELA`); }
    }
  }
}


  
async function load_gifs(url) {
  var gif_grid = document.getElementById('gif_grid');
  gif_grid.innerHTML = `<i class="bx bx-loader-dots bx-spin bx-md" style="height: 18px;font-size: 18px;background: transparent;"></i>`;
  
  try {
    var response = await fetch(url);
    var data = await response.json();
    gif_grid.innerHTML = "";
    for (const result of data.results) {
      const media = result.media[0];
      const url = media?.tinygif?.url || media?.gif?.url;
      if (url) {
        const img = document.createElement('img');
        img.src = url;
        img.style.width = "150px";;
        img.style.cursor = "pointer";
        img.style.height = "auto";
        img.onclick = () => {
          send(convertLinksToHtml(url));
          toggleGifCard();
        };
        gif_grid.appendChild(img);
      }
    }

    if (!gif_grid.hasChildNodes()) {
      gif_grid.innerHTML = "No GIFs found.";
    }

  } catch (error) {
    console.error("GIF fetch error:", error);
    gif_grid.innerHTML = "Failed to load GIFs.";
  }
}

if (controlsSection) {
  var newButton = document.createElement("button");
  newButton.innerHTML = `<i class="bx bx-image-landscape"></i>`;
  newButton.onclick = () => { toggleGifCard(); };
  
  controlsSection.insertBefore(newButton, controlsSection.querySelector('button[onclick="sendMessage()"]'));

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
    if (e.key === 'Enter') {
      var query = this.value.trim();
      if (!query) { await load_gifs(`https://g.tenor.com/v1/trending?key=LIVDSRZULELA`); }
      else { await load_gifs(`https://g.tenor.com/v1/search?q=${encodeURIComponent(query)}&key=LIVDSRZULELA`); }
    }
  });
}
