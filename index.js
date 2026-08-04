// ===========================
// Electronics Store Dashboard
// index.js
// ===========================

// Welcome Message
console.log("Welcome to Electronics Store Dashboard");

// Dashboard Statistics
const dashboard = [
    {
        title: "Products",
        count: 20
    },
    {
        title: "Categories",
        count: 4
    },
    {
        title: "Brands",
        count: 10
    },
    {
        title: "Users",
        count: 30
    }
];

// Display Statistics (Optional)
function displayStats() {

    const statsContainer = document.getElementById("stats");

    if (!statsContainer) return;

    dashboard.forEach(item => {

        statsContainer.innerHTML += `

            <div class="card">

                <h2>${item.title}</h2>

                <h1>${item.count}+</h1>

            </div>

        `;

    });

}

// Hero Button Animation
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {

    button.addEventListener("mouseover", () => {

        button.style.transform = "scale(1.05)";

    });

    button.addEventListener("mouseout", () => {

        button.style.transform = "scale(1)";

    });

});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
            ?.scrollIntoView({
                behavior: "smooth"
            });

    });

});

// Load Dashboard Stats
displayStats();