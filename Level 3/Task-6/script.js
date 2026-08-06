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

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    hideSuccessMessage();

    const isNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    const isFormValid =
        isNameValid &&
        isEmailValid &&
        isSubjectValid &&
        isMessageValid;

    if (isFormValid) {
        successMessage.textContent =
            "Your message has been submitted successfully!";

        successMessage.classList.add("show");

        contactForm.reset();
        removeValidationStyles();

        characterCount.textContent = "0/300";
    }
});

fullName.addEventListener("blur", validateFullName);
email.addEventListener("blur", validateEmail);
subject.addEventListener("blur", validateSubject);
message.addEventListener("blur", validateMessage);

message.addEventListener("input", function () {
    const messageLength = message.value.length;

    characterCount.textContent =
        `${messageLength}/300`;

    if (messageLength > 300) {
        characterCount.style.color = "#dc2626";
    } else {
        characterCount.style.color = "#64748b";
    }
});

function validateFullName() {
    const value = fullName.value.trim();

    if (value === "") {
        showError(
            fullName,
            "fullNameError",
            "Full name is required."
        );

        return false;
    }

    if (value.length < 3) {
        showError(
            fullName,
            "fullNameError",
            "Name must contain at least 3 characters."
        );

        return false;
    }

    if (!/^[A-Za-z\s]+$/.test(value)) {
        showError(
            fullName,
            "fullNameError",
            "Name should contain letters and spaces only."
        );

        return false;
    }

    showValid(fullName, "fullNameError");
    return true;
}

function validateEmail() {
    const value = email.value.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
        showError(
            email,
            "emailError",
            "Email address is required."
        );

        return false;
    }

    if (!emailPattern.test(value)) {
        showError(
            email,
            "emailError",
            "Enter a valid email address."
        );

        return false;
    }

    showValid(email, "emailError");
    return true;
}

function validateSubject() {
    const value = subject.value.trim();

    if (value === "") {
        showError(
            subject,
            "subjectError",
            "Subject is required."
        );

        return false;
    }

    if (value.length < 5) {
        showError(
            subject,
            "subjectError",
            "Subject must contain at least 5 characters."
        );

        return false;
    }

    showValid(subject, "subjectError");
    return true;
}

function validateMessage() {
    const value = message.value.trim();

    if (value === "") {
        showError(
            message,
            "messageError",
            "Message is required."
        );

        return false;
    }

    if (value.length < 20) {
        showError(
            message,
            "messageError",
            "Message must contain at least 20 characters."
        );

        return false;
    }

    if (value.length > 300) {
        showError(
            message,
            "messageError",
            "Message cannot exceed 300 characters."
        );

        return false;
    }

    showValid(message, "messageError");
    return true;
}

function showError(input, errorId, messageText) {
    const errorElement =
        document.getElementById(errorId);

    input.classList.add("invalid");
    input.classList.remove("valid");

    errorElement.textContent = messageText;
}

function showValid(input, errorId) {
    const errorElement =
        document.getElementById(errorId);

    input.classList.remove("invalid");
    input.classList.add("valid");

    errorElement.textContent = "";
}

function removeValidationStyles() {
    const fields = [
        fullName,
        email,
        subject,
        message
    ];

    fields.forEach(function (field) {
        field.classList.remove("valid", "invalid");
    });
}

function hideSuccessMessage() {
    successMessage.textContent = "";
    successMessage.classList.remove("show");
}