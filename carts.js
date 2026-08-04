const cartsContainer = document.getElementById("cartsContainer");
const emptyMessage = document.getElementById("emptyMessage");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {

    cartsContainer.innerHTML = "";

    if (cart.length === 0) {

        emptyMessage.style.display = "block";
        return;

    }

    emptyMessage.style.display = "none";

    let total = 0;

    cart.forEach((product, index) => {

        total += product.price;

        cartsContainer.innerHTML += `

        <div class="card">

            <img src="${product.image}" alt="${product.title}">

            <h2>${product.title}</h2>

            <p>${product.category}</p>

            <h3>₹ ${Math.round(product.price * 85)}</h3>

            <button onclick="removeItem(${index})">

                Remove

            </button>

        </div>

        `;

    });

    cartsContainer.innerHTML += `

    <div class="card">

        <h2>Cart Summary</h2>

        <p><strong>Total Items:</strong> ${cart.length}</p>

        <h3>Total Price</h3>

        <h2>₹ ${Math.round(total * 85)}</h2>

        <button onclick="clearCart()">

            Clear Cart

        </button>

    </div>

    `;

}

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}

function clearCart() {

    if (confirm("Are you sure you want to clear the cart?")) {

        cart = [];

        localStorage.removeItem("cart");

        displayCart();

    }

}

displayCart();