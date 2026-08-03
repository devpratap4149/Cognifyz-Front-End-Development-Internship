const changeColorButton =
    document.getElementById("changeColorButton");

const resetButton =
    document.getElementById("resetButton");

const colorText =
    document.getElementById("colorText");

const colors = [
    {
        name: "Light Blue",
        value: "#e0f2fe"
    },
    {
        name: "Light Yellow",
        value: "#fef3c7"
    },
    {
        name: "Light Green",
        value: "#dcfce7"
    },
    {
        name: "Light Purple",
        value: "#f3e8ff"
    },
    {
        name: "Light Pink",
        value: "#fce7f3"
    },
    {
        name: "Light Orange",
        value: "#ffedd5"
    }
];

let currentColorIndex = 0;

changeColorButton.addEventListener("click", function () {
    currentColorIndex++;

    if (currentColorIndex >= colors.length) {
        currentColorIndex = 0;
    }

    const selectedColor = colors[currentColorIndex];

    document.body.style.backgroundColor =
        selectedColor.value;

    colorText.textContent =
        `Current background: ${selectedColor.name}`;
});

resetButton.addEventListener("click", function () {
    currentColorIndex = 0;

    document.body.style.backgroundColor =
        colors[0].value;

    colorText.textContent =
        "Current background: Light Blue";
});