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

/* ------------------ Elements du DOM des consultations ------------------ */
const container = document.getElementById('consultations-container');
const sortSelect = document.getElementById('sort-select');
const filtreContainer = document.getElementById("filtres-consultation");
const filtreButtons = Array.from(filtreContainer.getElementsByClassName("filter-btn"));
const searchInput = document.getElementById('search-consultation');
const noResultMessage = document.getElementById('no-consultations-message');
const activeFilterLabel = document.getElementById('active-filter-label');

/* ------------------ Initialisation des données des cartes ------------------ */
const cardsData = Array.from(container.getElementsByClassName('consultation-card')).map(card => ({
    element: card,
    dateDebut: Number(card.dataset.date) * 1000,
    dateFin: Number(card.dataset.dateFin) * 1000,
    votes: Number(card.dataset.votes),
    statut: card.dataset.statut,
    titre: (card.dataset.titre).toLowerCase()
}));

/* ------------------ État Global ------------------ */
// On stocke l'état actuel du tri, du filtre et de la recherche
const state = {
    sort: sortSelect ? sortSelect.value : 'recentes',
    filter: 'all',
    search: ''
};

/* ------------------ Fonction Principale de Rendu ------------------ */
function renderConsultations() {
    const now = Date.now();
    let visibleCount = 0;

    // 1. Appliquer les Filtres et la Recherche
    cardsData.forEach(card => {
        let isMatch = true;

        // A. Vérification du filtre par statut
        if (state.filter !== 'all') {
            if (card.statut === "1") {
                const timeLeft = card.dateFin - now;
                const isStarted = card.dateDebut <= now;
                
                if (isStarted && timeLeft > 0) {
                    isMatch = state.filter === "en-cours";
                } else if (!isStarted && timeLeft > 0) {
                    isMatch = state.filter === "a-venir";
                } else {
                    isMatch = state.filter === "terminee";
                }
            } else {
                const statusMap = { "2": "suspendue", "3": "annulee", "4": "archivee" };
                isMatch = state.filter === statusMap[card.statut];
            }
        }

        // B. Vérification de la recherche (uniquement si le filtre précédent est passé)
        if (isMatch && state.search) {
            isMatch = card.titre.includes(state.search);
        }

        // C. Affichage / Masquage des cartes selon le résultat des filtres et de la recherche
        if (isMatch) {
            card.element.classList.remove('hidden');
            visibleCount++;
        } else {
            card.element.classList.add('hidden');
        }
    });

    // 2. Appliquer le Tri
    cardsData.sort((a, b) => {
        if (state.sort === 'anciennes') return a.dateDebut - b.dateDebut;
        if (state.sort === 'populaires') return b.votes - a.votes;
        return b.dateDebut - a.dateDebut; // 'recentes' par défaut
    });

    // Ré-injection dans le DOM (appendChild sur un élément existant le déplace)
    cardsData.forEach(card => container.appendChild(card.element));

    // 3. Gestion du Message "Aucun résultat"
    if (visibleCount === 0) {
        if (state.search) {
            activeFilterLabel.textContent = `"${state.search}"`;
        } else if (state.filter === 'all') {
            activeFilterLabel.textContent = "disponible";
        } else {
            const activeBtn = filtreButtons.find(btn => btn.dataset.filter === state.filter);
            const btnText = activeBtn ? activeBtn.textContent.split('(')[0].trim().toLowerCase() : "";
            activeFilterLabel.textContent = `"${btnText}"`;
        }
        noResultMessage.classList.remove('hidden');
    } else {
        noResultMessage.classList.add('hidden');
    }
}

/* ------------------ Écouteurs d'Événements ------------------ */

// Tri
if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
        state.sort = e.target.value;
        renderConsultations();
    });
}

// Filtres
filtreButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        // MAJ de l'UI des boutons
        filtreButtons.forEach(btn => btn.classList.remove("btn-active"));
        const currentBtn = e.currentTarget;
        currentBtn.classList.add("btn-active");

        // MAJ de l'état et rendu
        state.filter = currentBtn.dataset.filter;
        renderConsultations();
    });
});

// Recherche
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        state.search = e.target.value.toLowerCase().trim();
        renderConsultations();
    });
}