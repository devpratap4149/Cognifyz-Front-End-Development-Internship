const contactForm =
    document.getElementById("contactForm");

const fullName =
    document.getElementById("fullName");

const email =
    document.getElementById("email");

const subject =
    document.getElementById("subject");

const message =
    document.getElementById("message");

const characterCount =
    document.getElementById("characterCount");

const successMessage =
    document.getElementById("successMessage");

message.addEventListener("input", function () {
    characterCount.textContent =
        `${message.value.length}/300`;
});

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    successMessage.classList.add("d-none");

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    if (
        isNameValid &&
        isEmailValid &&
        isSubjectValid &&
        isMessageValid
    ) {
        successMessage.textContent =
            "Your message has been submitted successfully.";

        successMessage.classList.remove("d-none");

        contactForm.reset();

        characterCount.textContent = "0/300";

        clearValidationStyles();
    }
});

function validateName() {
    const value = fullName.value.trim();

    if (value.length < 3) {
        showInvalid(
            fullName,
            "fullNameError",
            "Enter a name with at least 3 characters."
        );

        return false;
    }

    if (!/^[A-Za-z\s]+$/.test(value)) {
        showInvalid(
            fullName,
            "fullNameError",
            "Name can contain letters and spaces only."
        );

        return false;
    }

    showValid(fullName);
    return true;
}

function validateEmail() {
    const value = email.value.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value)) {
        showInvalid(
            email,
            "emailError",
            "Enter a valid email address."
        );

        return false;
    }

    showValid(email);
    return true;
}

function validateSubject() {
    const value = subject.value.trim();

    if (value.length < 5) {
        showInvalid(
            subject,
            "subjectError",
            "Subject must contain at least 5 characters."
        );

        return false;
    }

    showValid(subject);
    return true;
}

function validateMessage() {
    const value = message.value.trim();

    if (value.length < 20) {
        showInvalid(
            message,
            "messageError",
            "Message must contain at least 20 characters."
        );

        return false;
    }

    showValid(message);
    return true;
}

function showInvalid(input, errorId, errorText) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");

    document.getElementById(errorId).textContent =
        errorText;
}

function showValid(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
}

function clearValidationStyles() {
    const formFields = [
        fullName,
        email,
        subject,
        message
    ];

    formFields.forEach(function (field) {
        field.classList.remove(
            "is-valid",
            "is-invalid"
        );
    });
}