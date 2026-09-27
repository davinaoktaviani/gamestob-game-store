/* =========================================================
   PLACEHOLDER IMAGE GENERATOR
   Generates an attractive gradient cover image on the fly
   whenever a real game image (assets/games/...) is missing.
   Once real image files are added to the assets folder,
   they will be used automatically instead.
========================================================= */

const GENRE_COLORS = {
    Action: ["#F45B69", "#7A1230"],
    Adventure: ["#4FA5A0", "#155E56"],
    RPG: ["#8E6BC4", "#3E2170"],
    Simulation: ["#F2B29C", "#C1673F"],
    Horror: ["#3A3A3A", "#0D0D0D"],
    Sports: ["#4C8BF5", "#1642A6"],
    Racing: ["#FFB703", "#D9480F"],
    Default: ["#EE9789", "#C1573F"]
};

function escapeForSvg(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function wrapTitle(title, maxCharsPerLine) {
    const words = title.split(" ");
    const lines = [];
    let current = "";

    words.forEach(word => {
        const test = current ? current + " " + word : word;

        if (test.length > maxCharsPerLine && current) {
            lines.push(current);
            current = word;
        } else {
            current = test;
        }
    });

    if (current) lines.push(current);

    return lines.slice(0, 3);
}

function makePlaceholder(title, genre) {
    const colors = GENRE_COLORS[genre] || GENRE_COLORS.Default;
    const safeTitle = escapeForSvg(title || "GAME");
    const safeGenre = escapeForSvg((genre || "GAME").toUpperCase());

    const lines = wrapTitle(safeTitle, 16);
    const fontSize = lines.length > 2 ? 26 : safeTitle.length > 14 ? 30 : 36;
    const lineHeight = fontSize * 1.25;
    const startY = 195 - ((lines.length - 1) * lineHeight) / 2;

    const tspans = lines
        .map((line, i) => `<tspan x="300" y="${startY + i * lineHeight}">${line}</tspan>`)
        .join("");

    const genreY = startY + (lines.length - 1) * lineHeight + lineHeight * 0.95;

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${colors[0]}"/>
            <stop offset="100%" stop-color="${colors[1]}"/>
        </linearGradient>
    </defs>
    <rect width="600" height="400" fill="url(#g)"/>
    <circle cx="520" cy="60" r="110" fill="rgba(255,255,255,0.08)"/>
    <circle cx="40" cy="360" r="140" fill="rgba(255,255,255,0.06)"/>
    <path d="M 250 130 h 100 a 25 25 0 0 1 25 25 v 0 a 25 25 0 0 1 -25 25 h -20 l -15 20 h -50 l -15 -20 h -20 a 25 25 0 0 1 -25 -25 v 0 a 25 25 0 0 1 25 -25 z"
        fill="rgba(255,255,255,0.16)"/>
    <circle cx="365" cy="155" r="6" fill="rgba(255,255,255,0.35)"/>
    <circle cx="385" cy="170" r="6" fill="rgba(255,255,255,0.35)"/>
    <text font-family="Poppins, Arial, sans-serif" font-size="${fontSize}" font-weight="700" fill="#ffffff" text-anchor="middle">${tspans}</text>
    <text x="300" y="${genreY}" font-family="Poppins, Arial, sans-serif" font-size="14" letter-spacing="3" fill="rgba(255,255,255,0.85)" text-anchor="middle">${safeGenre}</text>
</svg>`.trim();

    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

/* Generic photo-style placeholder for non-game images
   (store photos, about/mission illustrations) */
function makePhotoPlaceholder(label, seed) {
    const palettes = [
        ["#F2B29C", "#EE9789"],
        ["#F4E8BE", "#E8B98B"],
        ["#C9A6E0", "#8E6BC4"],
        ["#9FD8D3", "#4FA5A0"]
    ];

    const idx = Math.abs(
        String(seed || label)
            .split("")
            .reduce((acc, c) => acc + c.charCodeAt(0), 0)
    ) % palettes.length;

    const colors = palettes[idx];
    const safeLabel = escapeForSvg(label || "GameStoB");

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="700" height="450" viewBox="0 0 700 450">
    <defs>
        <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${colors[0]}"/>
            <stop offset="100%" stop-color="${colors[1]}"/>
        </linearGradient>
    </defs>
    <rect width="700" height="450" fill="url(#pg)"/>
    <circle cx="600" cy="80" r="130" fill="rgba(255,255,255,0.10)"/>
    <circle cx="70" cy="400" r="160" fill="rgba(255,255,255,0.08)"/>
    <g transform="translate(300,155)">
        <rect x="0" y="0" width="100" height="70" rx="10" fill="rgba(255,255,255,0.22)"/>
        <circle cx="20" cy="20" r="9" fill="rgba(255,255,255,0.4)"/>
        <path d="M0 60 L30 25 L55 48 L75 20 L100 60 Z" fill="rgba(255,255,255,0.3)"/>
    </g>
    <text x="350" y="290" font-family="Poppins, Arial, sans-serif" font-size="26" font-weight="700" fill="#ffffff" text-anchor="middle">${safeLabel}</text>
</svg>`.trim();

    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function attachImageFallback(img, title, genre) {
    img.addEventListener(
        "error",
        function handler() {
            img.removeEventListener("error", handler);
            img.src = makePlaceholder(title, genre);
        },
        { once: true }
    );
}

function attachPhotoFallback(img, label, seed) {
    img.addEventListener(
        "error",
        function handler() {
            img.removeEventListener("error", handler);
            img.src = makePhotoPlaceholder(label, seed);
        },
        { once: true }
    );
}
