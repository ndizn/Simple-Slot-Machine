// ===============================
// Player's starting money
// ===============================
let money = 1000;

// Prevents spinning multiple times
let spinning = false;

// Images used in the slot machine
const photos = [
    "1.webp",
    "2.jpg",
    "3.jpg"
];

// ===============================
// Returns a random image
// ===============================
function randomPhoto() {
    return photos[Math.floor(Math.random() * photos.length)];
}

// ===============================
// Runs when the SPIN button is clicked
// ===============================
function spin() {

    // Don't allow another spin while spinning
    if (spinning) return;

    // Get the player's bet
    const betInput = document.getElementById("bet");
    const moneyText = document.getElementById("money");

    let bet = parseInt(betInput.value);

    // Check if the bet is valid
    if (isNaN(bet) || bet <= 0) {
        alert("Enter a valid bet!");
        return;
    }

    // Check if the player has enough money
    if (bet > money) {
        alert("Not enough money!");
        return;
    }

    // Deduct the bet
    money -= bet;
    moneyText.textContent = money;

    // If money becomes 0 after betting, we'll still allow this spin.
    spinning = true;

    // Get slot elements
    const s1 = document.getElementById("slot1");
    const s2 = document.getElementById("slot2");
    const s3 = document.getElementById("slot3");

    // Get result text
    const result = document.getElementById("result");
    result.textContent = "";

    // Start spinning animation
    s1.classList.add("spinning");
    s2.classList.add("spinning");
    s3.classList.add("spinning");

    let count = 0;

    // Variables that store the final images
    let img1, img2, img3;

    // Change images every 100ms
    const animation = setInterval(() => {

        img1 = randomPhoto();
        img2 = randomPhoto();
        img3 = randomPhoto();

        s1.innerHTML = `<img src="${img1}" alt="">`;
        s2.innerHTML = `<img src="${img2}" alt="">`;
        s3.innerHTML = `<img src="${img3}" alt="">`;

        count++;

        // Stop after 16 image changes
        if (count >= 16) {

            clearInterval(animation);

            // Stop animation
            s1.classList.remove("spinning");
            s2.classList.remove("spinning");
            s3.classList.remove("spinning");

            spinning = false;

            // Check if all 3 images match
            if (img1 === img2 && img2 === img3) {

                const winnings = bet * 5;

                money += winnings;

                moneyText.textContent = money;

                result.textContent = `🎉 JACKPOT! You won $${winnings}`;
                result.style.color = "green";

            } else {

                result.textContent = "😢 Try Again!";
                result.style.color = "red";

                // Game Over if no money remains after a losing spin
                if (money === 0) {
                    result.textContent += " Game Over!";
                }
            }

        }

    }, 100);

}
// ===============================
// Resets the game
// ===============================
function resetGame() {

    // Reset money
    money = 1000;

    // Update money display
    document.getElementById("money").textContent = money;

    // Reset bet amount
    document.getElementById("bet").value = 10;

    // Clear the result message
    document.getElementById("result").textContent = "";

    // Clear the slot images
    document.getElementById("slot1").innerHTML = "";
    document.getElementById("slot2").innerHTML = "";
    document.getElementById("slot3").innerHTML = "";

    alert("Game has been reset!");
}