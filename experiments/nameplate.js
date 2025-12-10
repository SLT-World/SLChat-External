const nameplateData = [
    "nameplates/10_days_of_discord/arctic_winter_frost/",
    "nameplates/10_days_of_discord/aurora_winter_fox/",
    "nameplates/peanut/light_wall_red/",
    "nameplates/peanut/encom_grid/",
    "nameplates/peanut/light_wall_red/",
    "nameplates/peanut/light_wall_blue/",
    "nameplates/peanut/the_grid_fireworks/",
    "nameplates/peanut/encom_grid/",
    "nameplates/straw/2035/",
    "nameplates/straw/fluttering_static/",
    "nameplates/straw/camo_master/",
    "nameplates/straw/squad_wipe/",
    "nameplates/straw/bye_bye/",
    "nameplates/straw/2035/",
    "nameplates/straw/fluttering_static/",
    "nameplates/woodland_friends/hoppy_bois_perch/",
    "nameplates/woodland_friends/petal_bloom/",
    "nameplates/woodland_friends/autumn_breeze/",
    "nameplates/woodland_friends/autumn_breeze/",
    "nameplates/woodland_friends/petal_bloom/",
    "nameplates/woodland_friends/hoppy_bois_perch/",
    "nameplates/its_showtime/encore_orange/",
    "nameplates/its_showtime/encore_teal/",
    "nameplates/its_showtime/encore_orange/",
    "nameplates/its_showtime/encore_teal/",
    "nameplates/nameplate_bonanza/berry_bunny/",
    "nameplates/nameplate_bonanza/the_same_duck/",
    "nameplates/nameplate_bonanza/starfall_tides_nightshade/",
    "nameplates/nameplate_bonanza/starfall_tides_rose/",
    "nameplates/nameplate_bonanza/starfall_tides_void/",
    "nameplates/nameplate_bonanza/starlight_whales/",
    "nameplates/nameplate_bonanza/bloomling/",
    "nameplates/nameplate_bonanza/sproutling/",
    "nameplates/nameplate_bonanza/twilight_fuchsia/",
    "nameplates/nameplate_bonanza/twilight_dusk/",
    "nameplates/nameplate_bonanza/cosmic_storm/",
    "nameplates/nameplate_bonanza/planet_rings/",
    "nameplates/nameplate_bonanza/fairies/",
    "nameplates/nameplate_bonanza/firefly_meadow/",
    "nameplates/nameplate_bonanza/magic_hearts_orange/",
    "nameplates/nameplate_bonanza/magic_hearts_blue/",
    "nameplates/box/claptrap/",
    "nameplates/box/ripper_awakens/",
    "nameplates/box/shattered_veil/",
    "nameplates/box/vault/",
    "nameplates/lunar_eclipse/moonlit_charm/",
    "nameplates/lunar_eclipse/luna_moth/",
    "nameplates/lunar_eclipse/moon_essence/",
    "nameplates/rock/gomah/",
    "nameplates/rock/mini_vegeta/",
    "nameplates/rock/mini_goku/",
    "nameplates/rock/dragon_ball/",
    "nameplates/orb/infinite_swirl/",
    "nameplates/orb/infinite_swirl/",
    "nameplates/orb/magical_mist/",
    "nameplates/petal/spirit_blossom_petals/",
    "nameplates/petal/yunaras_aion_erna/",
    "nameplates/petal/spirit_blossom_springs/",
    "nameplates/paper/skibidi_toilet/",
    "nameplates/paper/tv_woman/",
    "nameplates/paper/secret_agent/",
    "nameplates/chance/red_dragon/",
    "nameplates/chance/d20_roll/",
    "nameplates/chance/owlbear_cub/",
    "nameplates/nameplates_v3/aurora/",
    "nameplates/nameplates_v3/bonsai/",
    "nameplates/nameplates_v3/under_the_sea/",
    "nameplates/nameplates_v3/sun_and_moon/",
    "nameplates/nameplates_v3/oasis/",
    "nameplates/nameplates_v3/touch_grass/",
    "nameplates/spell/white_mana/",
    "nameplates/spell/blue_mana/",
    "nameplates/spell/black_mana/",
    "nameplates/spell/red_mana/",
    "nameplates/spell/green_mana/",
    "nameplates/nameplates_v2/spirit_moon/",
    "nameplates/nameplates_v2/pixie_dust/",
    "nameplates/nameplates_v2/glitch/",
    "nameplates/nameplates_v2/starfall_tides/",
    "nameplates/nameplates_v2/cozy_cat/",
    "nameplates/nameplates_v2/sword_of_legend/",
    "nameplates/nameplates/cherry_blossoms/",
    "nameplates/nameplates/cat_beans/",
    "nameplates/nameplates/spirit_of_spring/",
    "nameplates/nameplates/twilight/",
    "nameplates/nameplates/koi_pond/",
    "nameplates/nameplates/vengeance/",
    "nameplates/nameplates/cityscape/",
    "nameplates/nameplates/angels/"
];

/*rawData = {};
#INFO: Extracted on 8/12/2025 from https://discord.com/api/v9/collectibles-categories/v2?include_bundles=true&variants_return_style=2&skip_num_categories=0
function extractNameplateAssets(data) {
    const results = [];
    function walk(value) {
        if (Array.isArray(value)) {
            for (const item of value) walk(item);
        } else if (value !== null && typeof value === "object") {
            for (const [key, val] of Object.entries(value)) {
                if (key === "asset" && typeof val === "string" && val.startsWith("nameplates/")) { results.push(val); }
                walk(val);
            }
        }
    }
    walk(data);
    return results;
}
const nameplateData = extractNameplateAssets(rawData);*/

style = document.createElement('style');
document.head.appendChild(style);
style.type = 'text/css';
style.appendChild(document.createTextNode(`.nameplate-video { height: 100%;width: 100%;position: absolute;top: 0;bottom: 0;left: 0;right: 0;border-radius: 6px;display: block;z-index: -1;mask-image: linear-gradient(to right, rgba(0, 0, 0, 0.3) 80%, rgb(0, 0, 0));background: color-mix(in srgb, var(--secondary-color) 75%, transparent);pointer-events: none; }`));

const nameplateObserver = new MutationObserver(mutations => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node.nodeType === 1 && node.tagName === "LI") injectNameplate(node);
        }
    }
});
nameplateObserver.observe(document.querySelector(".memberlist ul"), { childList: true });

function injectNameplate(li) {
    if (li.querySelector(".nameplate-video")) return;
    const nameplate = nameplateData[Math.floor(Math.random() * nameplateData.length)];
    li.appendChild(htmlToElement(`<video class="nameplate-video" src="https://cdn.discordapp.com/assets/collectibles/${nameplate}asset.webm" autoplay muted loop playsinline tabindex="-1" poster="https://cdn.discordapp.com/assets/collectibles/${nameplate}static.png"></video>`));
}

document.querySelectorAll(".memberlist ul li").forEach(li => injectNameplate(li));