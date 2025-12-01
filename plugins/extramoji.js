const originalToggleEmoji = toggleEmoji;

toggleEmoji = function() {
  originalToggleEmoji();
  if (emojis !== null && emojis.custom === undefined) {
    emojis.custom = [
        {
            "emoji": "🌺‍🔴",
            "description": "red hibiscus",
            "aliases": [ "red_hibiscus" ],
            "tags": []
        },
        {
            "emoji": "🍇‍🟢",
            "description": "green grape",
            "aliases": [ "green_grape" ],
            "tags": []
        },
        {
            "emoji": "🍦‍🌿",
            "description": "mint ice cream",
            "aliases": [ "mint_icecream" ],
            "tags": []
        },
        {
            "emoji": "🍦‍🍓",
            "description": "strawberry ice cream",
            "aliases": [ "strawberry_icecream" ],
            "tags": []
        },
        {
            "emoji": "🍦‍🍫",
            "description": "chocolate ice cream",
            "aliases": [ "chocolate_icecream" ],
            "tags": []
        },
        {
            "emoji": "🎂‍🌿",
            "description": "mint cake",
            "aliases": [ "mint_cake" ],
            "tags": []
        },
        {
            "emoji": "🎂‍🍓",
            "description": "strawberry cake",
            "aliases": [ "strawberry_cake" ],
            "tags": []
        },
        {
            "emoji": "🎂‍🍫",
            "description": "chocolate cake",
            "aliases": [ "chocolate_cake" ],
            "tags": []
        },
        {
            "emoji": "🐄‍🍓",
            "description": "strawberry cow",
            "aliases": [ "strawberry_cow" ],
            "tags": []
        },
        {
            "emoji": "🐱‍🐉",
            "description": "dino cat",
            "aliases": [ "dino_cat" ],
            "tags": []
        },
        {
            "emoji": "🐱‍👤",
            "description": "ninja cat",
            "aliases": [ "ninja_cat" ],
            "tags": []
        },
        {
            "emoji": "🐱‍💻",
            "description": "hacker cat",
            "aliases": [ "hacker_cat" ],
            "tags": []
        },
        {
            "emoji": "🐱‍🚀",
            "description": "astro cat",
            "aliases": [ "astro_cat" ],
            "tags": []
        },
        {
            "emoji": "💊‍♀",
            "description": "estrogen",
            "aliases": [ "estrogen_pill" ],
            "tags": []
        },
        {
            "emoji": "🔥‍🔵",
            "description": "blue fire",
            "aliases": [ "blue_fire" ],
            "tags": []
        },
        {
            "emoji": "🥛‍🍫",
            "description": "chocolate milk",
            "aliases": [ "chocolate_milk" ],
            "tags": []
        },
        {
            "emoji": "🥝‍🟡",
            "description": "gold kiwi",
            "aliases": [ "gold_kiwi" ],
            "tags": []
        },
        {
            "emoji": "🥦‍⚪",
            "description": "cauliflower",
            "aliases": [ "cauliflower" ],
            "tags": []
        },
        {
            "emoji": "🫙‍🍯",
            "description": "honey jar",
            "aliases": [ "honey_jar" ],
            "tags": []
        },

        {
            "emoji": "🌐‍🎯",
            "description": "google chrome",
            "aliases": [ "chrome", "google_chrome" ],
            "tags": []
        },
        {
            "emoji": "🌐‍🅾",
            "description": "opera browser",
            "aliases": [ "opera", "opera_browser" ],
            "tags": []
        },
        {
            "emoji": "🌐‍🕸",
            "description": "internet explorer",
            "aliases": [ "internet_explorer" ],
            "tags": []
        },
        {
            "emoji": "🌐‍🦁",
            "description": "brave browser",
            "aliases": [ "brave", "brave_browser" ],
            "tags": []
        },
        {
            "emoji": "🌐‍🧪",
            "description": "arc browser",
            "aliases": [ "arc", "arc_browser" ],
            "tags": []
        },
        {
            "emoji": "🌐‍🧭",
            "description": "safari browser",
            "aliases": [ "safari", "safari_browser" ],
            "tags": []
        },
        {
            "emoji": "🌐‍🧿",
            "description": "edge browser",
            "aliases": [ "edge", "edge_browser" ],
            "tags": []
        },
        {
            "emoji": "🌐‍📄",
            "description": "html",
            "aliases": [ "html" ],
            "tags": []
        },
        {
            "emoji": "🎨‍📄",
            "description": "css",
            "aliases": [ "css" ],
            "tags": []
        },
        {
            "emoji": "🔵‍🚀",
            "description": "slt world",
            "aliases": [ "slt", "slt_world", "slt_softwares" ],
            "tags": []
        },
        {
            "emoji": "🔫‍💥",
            "description": "gun",
            "aliases": [ "gun" ],
            "tags": []
        },
        {
            "emoji": "🍪‍⚫‍⚪",
            "description": "oreo",
            "aliases": [ "oreo" ],
            "tags": []
        },
        {
            "emoji": "◯‍◯‍◯‍◯‍◯",
            "description": "olympics",
            "aliases": [ "olympics" ],
            "tags": []
        },
        {
            "emoji": "🟦‍☀",
            "description": "kuomintang",
            "aliases": [ "kmt", "kuomintang" ],
            "tags": []
        },
        {
            "emoji": "🟨‍🔴",
            "description": "south vietnam",
            "aliases": [ "south_vietnam" ],
            "tags": []
        },
        {
            "emoji": "🟥‍⚒",
            "description": "soviet union",
            "aliases": [ "soviet_union" ],
            "tags": []
        },
        {
            "emoji": "⚪‍🗺",
            "description": "united korea",
            "aliases": [ "united_korea" ],
            "tags": []
        },
        {
            "emoji": "⚫‍⬜‍🟥",
            "description": "german empire",
            "aliases": [ "german_empire" ],
            "tags": []
        },
        {
            "emoji": "⚪‍🟡‍⚫",
            "description": "russian empire",
            "aliases": [ "russian_empire" ],
            "tags": []
        },
        {
            "emoji": "❄‍🌲",
            "description": "siberia",
            "aliases": [ "siberia" ],
            "tags": []
        },
        {
            "emoji": "🟥‍🌅",
            "description": "imperial japan",
            "aliases": [ "imperial_japan" ],
            "tags": []
        },
        {
            "emoji": "🔴‍🟡‍🔵‍⚪‍⚫",
            "description": "old china",
            "aliases": [ "old_china" ],
            "tags": []
        },
        {
            "emoji": "🏛‍🦅",
            "description": "roman empire",
            "aliases": [ "roman_empire" ],
            "tags": []
        },
        {
            "emoji": "🟥‍🌻",
            "description": "soviet ukraine",
            "aliases": [ "soviet_ukraine" ],
            "tags": []
        },
        {
            "emoji": "🟥‍🪆",
            "description": "soviet russia",
            "aliases": [ "soviet_russia" ],
            "tags": []
        },
        {
            "emoji": "🟥‍🌊",
            "description": "soviet latvia",
            "aliases": [ "soviet_latvia" ],
            "tags": []
        },
        {
            "emoji": "🟥‍🌲",
            "description": "soviet lithuania",
            "aliases": [ "soviet_lithuania" ],
            "tags": []
        },
        {
            "emoji": "🟥‍⚔",
            "description": "confederate",
            "aliases": [ "dixie" ],
            "tags": []
        },
        {
            "emoji": "🟦‍⬜‍🟪",
            "description": "free russia",
            "aliases": [ "free_russia" ],
            "tags": []
        }
    ];
    //emojisData = emojisData.concat(emojis.custom);
  }
};

var newButton = document.createElement("button");
newButton.classList.toggle("tablink");
newButton.innerHTML = `🐱‍👤`;
newButton.onclick = () => { emojiCategory('custom', newButton); };
document.getElementById("emoji_category").append(newButton);
