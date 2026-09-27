// URL PARAMETER

const params = new URLSearchParams(window.location.search);
const selectedGame = params.get("game");

// ELEMENTS

const form = document.getElementById("purchaseForm");
const gameInput = document.getElementById("gameName");
const paymentMethod = document.getElementById("paymentMethod");
const paymentLogo = document.getElementById("paymentLogo");
const bankSection = document.getElementById("bankSection");
const cardNumber = document.getElementById("cardNumber");
const summaryGame = document.getElementById("summaryGame");
const summaryPrice = document.getElementById("summaryPrice");
const summaryImage = document.getElementById("summaryImage");

// GAME DATA

const gameData = [

    { title: "ELDEN RING", genre: "RPG", price: 599000, image: "assets/games/elden-ring.jpg" },
    { title: "CYBERPUNK 2077", genre: "RPG", price: 489000, image: "assets/games/cyberpunk2077.jpg" },
    { title: "BLACK MYTH: WUKONG", genre: "Action", price: 699000, image: "assets/games/black-myth-wukong.jpg" },
    { title: "STARFIELD", genre: "RPG", price: 589000, image: "assets/games/starfield.jpg" },
    { title: "ARIZONA SUNSHINE II", genre: "Action", price: 699000, image: "assets/games/arizona-sunshine2.jpg" },
    { title: "FARMING SIMULATOR 25", genre: "Simulation", price: 326000, image: "assets/games/farming-simulator25.jpg" },
    { title: "BEYOND SANDBOX", genre: "Simulation", price: 175000, image: "assets/games/beyond-sandbox.jpg" },
    { title: "PARALIVES", genre: "Simulation", price: 270000, image: "assets/games/paralives.jpg" },
    { title: "GOD OF WAR RAGNAROK", genre: "Action", price: 432180, image: "assets/games/gow-ragnarok.jpg" },
    { title: "SPIDER-MAN 2", genre: "Action", price: 715921, image: "assets/games/spiderman2.jpg" },
    { title: "HOGWARTS LEGACY", genre: "Adventure", price: 784000, image: "assets/games/hogwarts-legacy.jpg" },
    { title: "FORZA HORIZON 5", genre: "Racing", price: 699000, image: "assets/games/forza5.jpg" },
    { title: "SUBNAUTICA 2", genre: "Adventure", price: 351000, image: "assets/games/subnautica2.jpg" },
    { title: "ROMESTEAD", genre: "Simulation", price: 90000, image: "assets/games/romestead.jpg" },
    { title: "TEAMFIGHT MANAGER 2", genre: "Simulation", price: 150000, image: "assets/games/teamfight-manager2.jpg" },
    { title: "STONEMACHIA", genre: "Simulation", price: 150000, image: "assets/games/stonemachia.jpg" },
    { title: "GTA V", genre: "Action", price: 209000, image: "assets/games/gta5.jpg" },
    { title: "RED DEAD REDEMPTION II", genre: "Action", price: 389000, image: "assets/games/rdr2.jpg" },
    { title: "CALL OF DUTY", genre: "Action", price: 689000, image: "assets/games/callofduty.jpg" },
    { title: "THE WITCHER 3", genre: "RPG", price: 599000, image: "assets/games/witcher3.jpg" },
    { title: "RESIDENT EVIL 4", genre: "Horror", price: 350000, image: "assets/games/re4.jpg" },
    { title: "MONSTER HUNTER RISE", genre: "Action", price: 554000, image: "assets/games/mhrise.jpg" },
    { title: "SHADOW OF THE ERDTREE", genre: "RPG", price: 299000, image: "assets/games/shadow-of-the-erdtree.jpg" },
    { title: "PHANTOM LIBERTY", genre: "RPG", price: 249000, image: "assets/games/phantom-liberty.jpg" },
    { title: "SUNBREAK", genre: "Action", price: 229000, image: "assets/games/sunbreak.jpg" },
    { title: "EA SPORTS FC 26", genre: "Sports", price: 799000, image: "assets/games/fc26.jpg" },
    { title: "BLOOD AND WINE", genre: "RPG", price: 199000, image: "assets/games/bloodandwine.jpg" },
    { title: "BURNING SHORES", genre: "Adventure", price: 279000, image: "assets/games/dlc6.jpg" },
    { title: "THE FROZEN WILDS", genre: "Adventure", price: 179000, image: "assets/games/dlc7.jpg" }

];

// FILL GAME DROPDOWN

gameData.forEach(game => {

    const option = document.createElement("option");
    option.value = game.title;
    option.textContent = game.title;
    gameInput.appendChild(option);

});

// UPDATE SUMMARY

function updateSummary(gameTitle) {

    const game = gameData.find(item => item.title === gameTitle);

    if (game) {

        summaryGame.textContent = game.title;
        summaryPrice.textContent = "Rp " + game.price.toLocaleString("id-ID");

        summaryImage.src = game.image;
        summaryImage.alt = game.title;
        summaryImage.style.display = "block";
        attachImageFallback(summaryImage, game.title, game.genre);

    } else {

        summaryGame.textContent = "No Game Selected";
        summaryPrice.textContent = "Rp 0";
        summaryImage.style.display = "none";

    }

}

// INITIAL LOAD

if (selectedGame) {

    gameInput.value = selectedGame;
    updateSummary(selectedGame);

} else {

    updateSummary("");

}

// GAME DROPDOWN

gameInput.addEventListener("change", function () {
    updateSummary(this.value);
});

// PAYMENT METHOD

paymentMethod.addEventListener("change", function () {

    if (this.value === "Visa") {

        paymentLogo.src = "assets/payment/visa.png";
        paymentLogo.style.display = "block";
        bankSection.style.display = "none";

    } else if (this.value === "MasterCard") {

        paymentLogo.src = "assets/payment/mastercard.png";
        paymentLogo.style.display = "block";
        bankSection.style.display = "none";

    } else if (this.value === "PayPal") {

        paymentLogo.src = "assets/payment/paypal.png";
        paymentLogo.style.display = "block";
        bankSection.style.display = "none";

    } else if (this.value === "Bank Transfer") {

        paymentLogo.src = "assets/payment/bank.png";
        paymentLogo.style.display = "block";
        bankSection.style.display = "block";

    } else {

        paymentLogo.style.display = "none";
        bankSection.style.display = "none";

    }

});

// AUTO FORMAT CARD NUMBER

cardNumber.addEventListener("input", function () {

    let value = this.value.replaceAll(" ", "");
    let formatted = "";

    for (let i = 0; i < value.length; i++) {

        formatted += value[i];

        if ((i + 1) % 4 === 0 && i !== value.length - 1) {
            formatted += " ";
        }

    }

    this.value = formatted;

});

// SUBMIT

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const selectedGame = gameInput.value;
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const payment = paymentMethod.value;
    const expiryDate = document.getElementById("expiryDate").value;
    const cvv = document.getElementById("cvv").value.trim();
    const terms = document.getElementById("terms").checked;
    const cardValue = cardNumber.value.replaceAll(" ", "");

    if (selectedGame === "") {
        alert("Please select a game.");
        return;
    }

    if (fullName.length < 3) {
        alert("Full Name must contain at least 3 characters.");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email address.");
        return;
    }

    if (payment === "") {
        alert("Please select a payment method.");
        return;
    }

    if (cardValue.length !== 16) {
        alert("Card Number must contain exactly 16 digits.");
        return;
    }

    if (isNaN(cardValue)) {
        alert("Card Number must contain numbers only.");
        return;
    }

    if (expiryDate === "") {
        alert("Please select an expiration date.");
        return;
    }

    if (cvv.length !== 3) {
        alert("CVV must contain 3 digits.");
        return;
    }

    if (isNaN(cvv)) {
        alert("CVV must contain numbers only.");
        return;
    }

    if (payment === "Bank Transfer") {

        const bankName = document.getElementById("bankName").value;

        if (bankName === "") {
            alert("Please select a bank.");
            return;
        }

    }

    if (!terms) {
        alert("You must agree to the Terms & Conditions.");
        return;
    }

    alert("Purchase Successful!\n\nThank you for shopping at GameStoB!");

});
