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

const container = document.getElementById('consultations-container');

sortSelect.addEventListener("change", function() {
    const sortBy = this.value;

    const cards = Array.from(container.getElementsByClassName('consultation-card'));

    cards.sort((a, b) => {
        const dateA = Number(a.dataset.date)*1000;
        const dateB = Number(b.dataset.date)*1000;
        const votesA = Number(a.dataset.votes);
        const votesB = Number(b.dataset.votes);

        if (sortBy === 'recentes') {
            return dateB - dateA; // Décroissant
        } else if (sortBy === 'anciennes') {
            return dateA - dateB; // Croissant
        } else if (sortBy === 'populaires') {
            return votesB - votesA; // Décroissant par nbParticipants
        }
        return dateB - dateA; // Par défaut, récentes
    });

    // Ré-injection dans le bon ordre
    cards.forEach(card => container.appendChild(card));
});

/* ------------------ Fin du tri consultations ------------------ */

/* ------------------ Filtres consultations ------------------ */
const filtreContainer = document.getElementById("filtres-consultation");

const filtreButtons = filtreContainer.getElementsByClassName("filter-btn");

/* Gestion du message d'alerte lorsqu'aucune consultation ne correspond au filtre */
const noResultMessage = document.getElementById('no-consultations-message');
const activeFilterLabel = document.getElementById('active-filter-label');

for (const button of filtreButtons) {
    button.addEventListener("click", () => {
        const cards = Array.from(container.getElementsByClassName('consultation-card'));

        // Retirer la classe active de tous les boutons
        for (const btn of filtreButtons) {
            btn.classList.remove("btn-active");
        }

        const filterValue = button.dataset.filter;
        button.classList.add("btn-active");

        // Compteur pour savoir combien de cartes correspondent au filtre
        let visibleCardsCount = 0;

        // On parcourt toutes les cartes pour les afficher ou les masquer directement
        cards.forEach(card => {
            let isMatch = false;

            if (filterValue === "all") {
                isMatch = true;
            } else {
                // IMPORTANT: Conversion en Number pour que le switch fonctionne
                const statut = Number(card.dataset.statut);

                switch (statut) {
                    case 1:
                        const timeLeft = Number(card.dataset.dateFin) * 1000 - Date.now();
                        const enCours = timeLeft > 0 && Number(card.dataset.date) * 1000 <= Date.now();
                        const aVenir = timeLeft > 0 && Number(card.dataset.date) * 1000 > Date.now();
                        
                        if (enCours) {
                            isMatch = filterValue === "en-cours";
                        } else if (aVenir) {
                            isMatch = filterValue === "a-venir";
                        } else {
                            isMatch = filterValue === "terminee"; // Temps écoulé
                        }
                        break;
                    case 2:
                        isMatch = filterValue === "suspendue";
                        break;
                    case 3:
                        isMatch = filterValue === "annulee";
                        break;
                    case 4:
                        isMatch = filterValue === "archivee";
                        break;
                    default:
                        isMatch = false;
                }
            }

            // Si la carte correspond au filtre, on l'affiche, sinon on la masque
            if (isMatch) {
                card.classList.remove('hidden');
                visibleCardsCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // --- GESTION DU MESSAGE D'ERREUR ---
        if (visibleCardsCount === 0) {
            // On extrait proprement le texte du bouton (ex: "En cours", "Terminées") 
            // en enlevant le texte optionnel des parenthèses s'il y en a.
            let buttonText = button.textContent.split('(')[0].trim().toLowerCase();
            
            // Si le bouton s'appelle "Tous", on ajuste un peu le texte pour la grammaire
            if (filterValue === "all") {
                activeFilterLabel.textContent = "disponible";
            } else {
                activeFilterLabel.textContent = `"${buttonText}"`;
            }

            // On affiche le bloc de message
            noResultMessage.classList.remove('hidden');
        } else {
            // Des cartes sont visibles, on cache le message
            noResultMessage.classList.add('hidden');
        }
    });
}

