const latestGames = [

    {
        title: "BLACK MYTH: WUKONG",
        genre: "Action",
        platform: "PC",
        price: "Rp 699.000",
        image: "assets/games/wukong.jpg"
    },

    {
        title: "STARFIELD",
        genre: "RPG",
        platform: "PC",
        price: "Rp 589.000",
        image: "assets/games/starfield.jpg"
    },

    {
        title: "PARALIVES",
        genre: "Simulation",
        platform: "PC",
        price: "Rp 270.000",
        image: "assets/games/paralives.jpg"
    },

    {
        title: "SUBNAUTICA 2",
        genre: "Adventure",
        platform: "PC",
        price: "Rp 351.000",
        image: "assets/games/subnautica2.jpg"
    }

];

const bestSellers = [

    {
        title: "ELDEN RING",
        genre: "RPG",
        platform: "PC",
        price: "Rp 599.000",
        image: "assets/games/elden-ring.jpg"
    },

    {
        title: "CYBERPUNK 2077",
        genre: "RPG",
        platform: "PC",
        price: "Rp 489.000",
        image: "assets/games/game6.jpg"
    },

    {
        title: "GTA V",
        genre: "Action",
        platform: "PC",
        price: "Rp 209.000",
        image: "assets/games/game7.jpg"
    },

    {
        title: "RED DEAD REDEMPTION II",
        genre: "Action",
        platform: "PC",
        price: "Rp 389.000",
        image: "assets/games/game8.jpg"
    }

];

const dlcs = [

    {
        title: "SHADOW OF THE ERDTREE",
        genre: "RPG",
        platform: "PC",
        price: "Rp 299.000",
        image: "assets/games/dlc1.jpg"
    },

    {
        title: "PHANTOM LIBERTY",
        genre: "RPG",
        platform: "PC",
        price: "Rp 249.000",
        image: "assets/games/dlc2.jpg"
    },

    {
        title: "BLOOD AND WINE",
        genre: "RPG",
        platform: "PC",
        price: "Rp 199.000",
        image: "assets/games/dlc3.jpg"
    },

    {
        title: "SUNBREAK",
        genre: "Action",
        platform: "PC",
        price: "Rp 229.000",
        image: "assets/games/dlc4.jpg"
    }

];

/* BUILD A SINGLE GAME CARD */

function createHomeCard(game) {

    const card = document.createElement("div");
    card.className = "home-card";

    const img = document.createElement("img");
    img.src = game.image;
    img.alt = game.title;
    img.loading = "lazy";
    attachImageFallback(img, game.title, game.genre);
    card.appendChild(img);

    const content = document.createElement("div");
    content.className = "home-card-content";

    const h3 = document.createElement("h3");
    h3.textContent = game.title;
    content.appendChild(h3);

    const genreP = document.createElement("p");
    genreP.className = "genre";
    genreP.textContent = game.genre;
    content.appendChild(genreP);

    const platformSpan = document.createElement("span");
    platformSpan.className = "platform";
    platformSpan.textContent = game.platform;
    content.appendChild(platformSpan);

    const cardBottom = document.createElement("div");
    cardBottom.className = "card-bottom";

    const priceDiv = document.createElement("div");
    priceDiv.className = "price";
    priceDiv.textContent = game.price;
    cardBottom.appendChild(priceDiv);

    const wishlistBtn = document.createElement("button");
    wishlistBtn.className = "wishlist";
    wishlistBtn.textContent = "♥";
    wishlistBtn.setAttribute("aria-label", "Add to wishlist");
    cardBottom.appendChild(wishlistBtn);

    content.appendChild(cardBottom);

    const buyLink = document.createElement("a");
    buyLink.href = `purchase.html?game=${encodeURIComponent(game.title)}`;
    buyLink.className = "buy-btn";
    buyLink.textContent = "Buy Now";
    content.appendChild(buyLink);

    card.appendChild(content);

    return card;
}

function renderCards(data, containerId) {

    const container = document.getElementById(containerId);
    container.innerHTML = "";

    data.forEach(game => {
        container.appendChild(createHomeCard(game));
    });

}

renderCards(latestGames, "latestContainer");
renderCards(bestSellers, "bestSellerContainer");
renderCards(dlcs, "dlcContainer");

/* HERO SLIDER */

const featuredGames = [

    { title: "ELDEN RING", price: "Rp 599.000" },
    { title: "CYBERPUNK 2077", price: "Rp 489.000" },
    { title: "BLACK MYTH: WUKONG", price: "Rp 699.000" },
    { title: "STARFIELD", price: "Rp 589.000" }

];

let featuredIndex = 0;

function updateFeatured() {

    const titleEl = document.getElementById("featuredTitle");
    const priceEl = document.getElementById("featuredPrice");
    const box = document.getElementById("heroFeatured");

    if (!titleEl || !priceEl || !box) return;

    box.style.opacity = 0;

    setTimeout(() => {

        titleEl.textContent = featuredGames[featuredIndex].title;
        priceEl.textContent = featuredGames[featuredIndex].price;
        box.style.opacity = 1;

    }, 250);

}

setInterval(() => {

    featuredIndex++;

    if (featuredIndex >= featuredGames.length) {
        featuredIndex = 0;
    }

    updateFeatured();

}, 4000);

/* WISHLIST TOGGLE (event delegation) */

document.addEventListener("click", function (e) {

    if (e.target.classList.contains("wishlist")) {
        e.target.classList.toggle("liked");
    }

});
