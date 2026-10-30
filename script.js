const plants = ["🌿", "🌱", "🌾", "🌻", "🌼", "🌷", "🌹", "🥀", "🍀", "🍁", "🍂", "🍃","🪴", "🎍", "🌴", "🌲", "🌵", "🌳"];

const winButton = document.getElementById("winButton");
const winFormContainer = document.getElementById("winFormContainer");
const winInput = document.getElementById("winInput");
const winForm = document.getElementById("winForm");
const winsContainer = document.getElementById("winsContainer");
const garden = document.getElementById("garden");
const gardenTeaser = document.getElementById("gardenTeaser");

gardenTeaser.addEventListener("click", () => {
    garden.scrollIntoView({
        behavior: "smooth"
    });
});
// Function to create a win card
function createWinCard(winText) {

    const winCard = document.createElement("div");
    winCard.classList.add("win-card");

    const text = document.createElement("p");
    text.textContent = winText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑 Delete" ;

    deleteButton.addEventListener("click", () => {

        winCard.remove();

        let wins = JSON.parse(localStorage.getItem("wins")) || [];

        wins = wins.filter(win => win !== winText);

        localStorage.setItem("wins", JSON.stringify(wins));

    });

    winCard.appendChild(text);
    winCard.appendChild(deleteButton);

    winsContainer.appendChild(winCard);
    const plant=document.createElement("span");
    plant.textContent=plants[Math.floor(Math.random()*plants.length)];
    garden.appendChild(plant);
}

// Load saved wins
let savedWins = JSON.parse(localStorage.getItem("wins")) || [];

savedWins.forEach((win) => {
    createWinCard(win);
});

// Show form
winButton.addEventListener("click", () => {
    winFormContainer.style.display = "block";
});

// Submit form
winForm.addEventListener("submit", (event) => {

    event.preventDefault();
    const winText = winInput.value.trim();
    if (winText === "") return;
    createWinCard(winText);
    let wins = JSON.parse(localStorage.getItem("wins")) || [];
    wins.push(winText);
    localStorage.setItem("wins", JSON.stringify(wins));
    winInput.value = "";
  

});  
deleteButton.addEventListener("click", () => {

    winCard.remove();

    let wins = JSON.parse(localStorage.getItem("wins")) || [];

    wins = wins.filter(win => win !== winText);

    localStorage.setItem("wins", JSON.stringify(wins));

    // Remove garden plants when there are no wins left
    if (wins.length === 0) {
        garden.innerHTML = "";
    }

});