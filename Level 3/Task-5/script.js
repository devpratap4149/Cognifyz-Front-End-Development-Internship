const loadUsersButton =
    document.getElementById("loadUsersButton");

const clearUsersButton =
    document.getElementById("clearUsersButton");

const userContainer =
    document.getElementById("userContainer");

const statusMessage =
    document.getElementById("statusMessage");

const API_URL =
    "https://jsonplaceholder.typicode.com/users";

loadUsersButton.addEventListener("click", loadUsers);

clearUsersButton.addEventListener("click", clearUsers);

async function loadUsers() {
    loadUsersButton.disabled = true;

    statusMessage.textContent = "Loading users...";
    statusMessage.className = "status-message";

    userContainer.innerHTML = "";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(
                `Request failed with status ${response.status}`
            );
        }

        const users = await response.json();

        displayUsers(users);

        statusMessage.textContent =
            `${users.length} users loaded successfully.`;

        statusMessage.className =
            "status-message success-message";
    } catch (error) {
        statusMessage.textContent =
            "Unable to load users. Check your internet connection.";

        statusMessage.className =
            "status-message error-message";

        console.error("API error:", error);
    } finally {
        loadUsersButton.disabled = false;
    }
}

function displayUsers(users) {
    users.forEach(function (user) {
        const userCard = document.createElement("article");

        userCard.classList.add("user-card");

        userCard.innerHTML = `
            <h2>${escapeHTML(user.name)}</h2>

            <p>
                <strong>Username:</strong>
                ${escapeHTML(user.username)}
            </p>

            <p>
                <strong>Email:</strong>
                <a href="mailto:${escapeHTML(user.email)}">
                    ${escapeHTML(user.email)}
                </a>
            </p>

            <p>
                <strong>City:</strong>
                ${escapeHTML(user.address.city)}
            </p>

            <p>
                <strong>Company:</strong>
                ${escapeHTML(user.company.name)}
            </p>

            <p>
                <strong>Website:</strong>
                ${escapeHTML(user.website)}
            </p>
        `;

        userContainer.appendChild(userCard);
    });
}

function clearUsers() {
    userContainer.innerHTML = "";

    statusMessage.textContent =
        "User data cleared. Click “Load Users” to fetch again.";

    statusMessage.className = "status-message";
}

function escapeHTML(value) {
    const element = document.createElement("div");

    element.textContent = String(value);

    return element.innerHTML;
}