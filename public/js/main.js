/* ----------------- Modal Part ------------------ */
const modal = document.getElementById("auth-modal");

/* Buttons to open the modal */
const loginBtn = document.getElementById("open-login-modal");
const registerBtn = document.getElementById("open-register-modal");

/* Elements of the modal */
const modalTitle = document.getElementById("modal-title");
const modalForm = document.getElementById("modal-form");

/* Button to close the modal */
const closeBtn = document.getElementById("close-modal");

loginBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modalTitle.textContent = "Se connecter";
});

registerBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modalTitle.textContent = "Inscription";
});

closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.add("hidden");
    }
});

/* ------------------ End of Modal Part ------------------ */


/* ------------------ Menu déroulant ------------------ */
const dropdown = document.getElementById("dropdown");
const links = document.getElementById("dropdown-links");
const icon = document.getElementById("dropdown-icon");

dropdown.addEventListener("click", () => {
    const opened = links.classList.contains("max-h-96");
    icon.classList.toggle("rotate-90");

    if (opened) {
        links.classList.remove("max-h-96", "opacity-100");
        links.classList.add("max-h-0", "opacity-0");

        icon.textContent = "menu";
    } else {
        links.classList.remove("max-h-0", "opacity-0");
        links.classList.add("max-h-96", "opacity-100");

        icon.textContent = "close";
    }
});

