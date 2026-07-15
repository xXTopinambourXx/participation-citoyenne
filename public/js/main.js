/* ----------------- Modal Part ------------------ */
const modal = document.getElementById("auth-modal");

/* Buttons to open the modal */
const loginBtn = document.getElementsByClassName("open-login-modal");
const registerBtn = document.getElementsByClassName("open-register-modal");

/* Elements of the modal */
const modalTitle = document.getElementById("modal-title");
const modalForm = document.getElementById("modal-form");

/* Button to close the modal */
const closeBtn = document.getElementById("close-modal");

for(const btn of loginBtn) {
    btn.addEventListener("click", () => {
        console.log("Login button clicked");
        modal.classList.remove("hidden");
        modalTitle.textContent = "Se connecter";
    });
}

for(const btn of registerBtn) {
    btn.addEventListener("click", () => {
        console.log("Register button clicked");
        modal.classList.remove("hidden");
        modalTitle.textContent = "Inscription";
    });
}

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

/* ------------------ End of Menu déroulant ------------------ */

/* ------------------ Tri consultations ------------------ */
const sortSelect = document.getElementById('sort-select');

sortSelect.addEventListener("click", function() {
    const container = document.getElementById('consultations-container');
    const cards = Array.from(container.getElementsByClassName('consultation-card'));
    const sortBy = this.value;

    cards.sort((a, b) => {
        const dateA = Number(a.dataset.date);
        const dateB = Number(b.dataset.date);
        const votesA = Number(a.dataset.votes);
        const votesB = Number(b.dataset.votes);

        if (sortBy === 'recentes') {
            return dateB - dateA; // Décroissant
        } else if (sortBy === 'anciennes') {
            return dateA - dateB; // Croissant
        } else if (sortBy === 'populaires') {
            return votesB - votesA; // Décroissant par nbParticipants
        }
        return 0;
    });

    // Ré-injection dans le bon ordre
    cards.forEach(card => container.appendChild(card));
});