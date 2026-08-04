const productsContainer = document.getElementById("productsContainer");
const searchProduct = document.getElementById("searchProduct");
const sortProducts = document.getElementById("sortProducts");
const loading = document.getElementById("loading");

let products = [];
let filteredProducts = [];

const params = new URLSearchParams(window.location.search);
const category = params.get("category");

async function fetchProducts() {

    loading.style.display = "block";

    let url = "https://fakestoreapi.com/products";

    if (category) {
        url = `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;
    }

    try {

        const response = await fetch(url);

        products = await response.json();

        filteredProducts = [...products];

        displayProducts(filteredProducts);

    } catch (error) {

        productsContainer.innerHTML = "<h2>Unable to load products.</h2>";

    }

    loading.style.display = "none";
}

function displayProducts(data) {

    productsContainer.innerHTML = "";

    if (data.length === 0) {

        productsContainer.innerHTML = "<h2>No Products Found</h2>";

        return;
    }

    data.forEach(product => {

        productsContainer.innerHTML += `

        <div class="card">

            <img src="${product.image}" alt="${product.title}">

            <h2>${product.title}</h2>

            <p>${product.category}</p>

            <h3>₹ ${Math.round(product.price * 85)}</h3>

            <button onclick="addToCart(${product.id})">

                Add to Cart

            </button>

        </div>

        `;
    });

}

searchProduct.addEventListener("keyup", () => {

    const value = searchProduct.value.toLowerCase();

    filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(value)
    );

    displayProducts(filteredProducts);

});

sortProducts.addEventListener("change", () => {

    switch (sortProducts.value) {

        case "az":

            filteredProducts.sort((a, b) =>
                a.title.localeCompare(b.title)
            );

            break;

        case "za":

            filteredProducts.sort((a, b) =>
                b.title.localeCompare(a.title)
            );

            break;

        case "low":

            filteredProducts.sort((a, b) =>
                a.price - b.price
            );

            break;

        case "high":

            filteredProducts.sort((a, b) =>
                b.price - a.price
            );

            break;

    }

    displayProducts(filteredProducts);

});

function addToCart(id) {

    const product = products.find(item => item.id === id);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(item => item.id === id);

    if (exists) {

        alert("Product already added to cart!");

        return;

    }

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart successfully!");

}

fetchProducts();