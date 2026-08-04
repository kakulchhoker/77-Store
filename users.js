const usersContainer = document.getElementById("usersContainer");
const searchUser = document.getElementById("searchUser");
const loading = document.getElementById("loading");

let users = [];
let filteredUsers = [];

async function fetchUsers() {

    loading.style.display = "block";

    try {

        const response = await fetch("https://dummyjson.com/users");

        const data = await response.json();

        users = data.users;

        filteredUsers = [...users];

        displayUsers(filteredUsers);

    } catch (error) {

        usersContainer.innerHTML = "<h2>Failed to load users.</h2>";

    }

    loading.style.display = "none";

}

function displayUsers(data) {

    usersContainer.innerHTML = "";

    if (data.length === 0) {

        usersContainer.innerHTML = "<h2>No Users Found</h2>";

        return;

    }

    data.forEach(user => {

        usersContainer.innerHTML += `

        <div class="card">

            <img src="${user.image}" alt="${user.firstName}">

            <h2>${user.firstName} ${user.lastName}</h2>

            <p><strong>Email:</strong> ${user.email}</p>

            <p><strong>Phone:</strong> ${user.phone}</p>

            <p><strong>Age:</strong> ${user.age}</p>

            <p><strong>City:</strong> ${user.address.city}</p>

            <p><strong>Company:</strong> ${user.company.name}</p>

        </div>

        `;

    });

}

searchUser.addEventListener("keyup", () => {

    const value = searchUser.value.toLowerCase();

    filteredUsers = users.filter(user =>

        (`${user.firstName} ${user.lastName}`)
        .toLowerCase()
        .includes(value)

    );

    displayUsers(filteredUsers);

});

fetchUsers();
