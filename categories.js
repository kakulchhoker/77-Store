const categoriesContainer = document.getElementById("categoriesContainer");
const loading = document.getElementById("loading");

async function fetchCategories() {

    loading.style.display = "block";

    try {

        const response = await fetch("https://fakestoreapi.com/products/categories");

        const categories = await response.json();

        displayCategories(categories);

    } catch (error) {

        categoriesContainer.innerHTML = "<h2>Failed to load categories.</h2>";

    }

    loading.style.display = "none";

}

function displayCategories(categories) {

    categoriesContainer.innerHTML = "";

    categories.forEach(category => {

        let image = "";

        switch(category){

            case "electronics":
                image = "https://cdn-icons-png.flaticon.com/512/3659/3659898.png";
                break;

            case "jewelery":
                image = "https://cdn-icons-png.flaticon.com/512/3050/3050153.png";
                break;

            case "men's clothing":
                image = "https://cdn-icons-png.flaticon.com/512/892/892458.png";
                break;

            case "women's clothing":
                image = "https://cdn-icons-png.flaticon.com/512/892/892428.png";
                break;

            default:
                image = "https://cdn-icons-png.flaticon.com/512/1041/1041916.png";
        }

        categoriesContainer.innerHTML += `

        <div class="card">

            <img src="${image}" alt="${category}">

            <h2>${category.toUpperCase()}</h2>

            <p>Browse all ${category} products.</p>

            <button onclick="openCategory('${category}')">

                View Products

            </button>

        </div>

        `;

    });

}

function openCategory(category){

    window.location.href =
    `products.html?category=${encodeURIComponent(category)}`;

}

fetchCategories();