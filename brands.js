const brandsContainer = document.getElementById("brandsContainer");
const searchBrand = document.getElementById("searchBrand");
const sortBrands = document.getElementById("sortBrands");
const loading = document.getElementById("loading");

let brands = [];
let filteredBrands = [];

async function fetchBrands() {

    loading.style.display = "block";

    try {

        const response = await fetch("https://dummyjson.com/products");

        const data = await response.json();

        const uniqueBrands = [];

        data.products.forEach(product => {

            if (!uniqueBrands.includes(product.brand)) {

                uniqueBrands.push(product.brand);

            }

        });

        brands = uniqueBrands.map(name => ({
            name: name
        }));

        filteredBrands = [...brands];

        displayBrands(filteredBrands);

    } catch (error) {

        brandsContainer.innerHTML = "<h2>Unable to load brands.</h2>";

    }

    loading.style.display = "none";

}

function displayBrands(data) {

    brandsContainer.innerHTML = "";

    if (data.length === 0) {

        brandsContainer.innerHTML = "<h2>No Brands Found</h2>";

        return;

    }

    data.forEach(brand => {

        brandsContainer.innerHTML += `

        <div class="card">

            <img src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
                 alt="${brand.name}">

            <h2>${brand.name}</h2>

            <p>Explore products from ${brand.name}.</p>

            <button onclick="viewBrand('${brand.name}')">

                View Products

            </button>

        </div>

        `;

    });

}

searchBrand.addEventListener("keyup", () => {

    const value = searchBrand.value.toLowerCase();

    filteredBrands = brands.filter(brand =>
        brand.name.toLowerCase().includes(value)
    );

    displayBrands(filteredBrands);

});

sortBrands.addEventListener("change", () => {

    if (sortBrands.value === "az") {

        filteredBrands.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    }

    if (sortBrands.value === "za") {

        filteredBrands.sort((a, b) =>
            b.name.localeCompare(a.name)
        );

    }

    displayBrands(filteredBrands);

});

function viewBrand(brand) {

    window.location.href =
        `products.html?brand=${encodeURIComponent(brand)}`;

}

fetchBrands();