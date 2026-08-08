/* Partie concernant le bouton d'upload pour la couverture */
const fileInput = document.getElementById("file-input");
const uploadButton = document.getElementById("upload-button");
const uploadContainer = document.getElementById("container-couverture");

uploadButton?.addEventListener("click", () => {
    fileInput.click();
});

fileInput?.addEventListener("change", (e) => {
    const file = e.target.files[0];

    if (file) {
        const url = URL.createObjectURL(file);
        uploadContainer.classList.remove("bg-gray-100");
        uploadContainer.style.backgroundImage = `url(${url})`;
        uploadButton.textContent = "";

        const fileNameSpan = document.createElement("span");
        fileNameSpan.classList.add("truncate", "max-w-[150px]");
        fileNameSpan.textContent = file.name;

        const closeIcon = document.createElement("span");
        closeIcon.classList.add("material-symbols-outlined", "cursor-pointer", "hover:text-red-500");
        closeIcon.textContent = "close";

        closeIcon.addEventListener("click", (event) => {
            event.stopPropagation(); 
            fileInput.value = ""; 
            resetUploadButton();
        });

        uploadButton.appendChild(fileNameSpan);
        uploadButton.appendChild(closeIcon);
    } else {
        resetUploadButton();
    }
});

/**
 * Rénitialise le bouton d'upload de couverture
 */
function resetUploadButton() {
    uploadButton.textContent = "";

    uploadContainer.classList.add("bg-gray-100");
    uploadContainer.style.backgroundImage = "none";

    const uploadIcon = document.createElement("span");
    uploadIcon.classList.add("material-symbols-outlined");
    uploadIcon.textContent = "cloud_upload";

    const label = document.createElement("span");
    label.textContent = "Choisir une image ";

    uploadButton.appendChild(uploadIcon);
    uploadButton.appendChild(label);
}
/*---------------------------------------------------------------------------*/


const searchEtiquetteInput = document.getElementById("search-etiquette");

const selectedEtiquettesContainer = document.getElementById("selected-etiquettes-container");
let selectedEtiquettes = [];

let etiquetteListVisible = false;
searchEtiquetteInput.addEventListener("click", () => {
    const etiquetteList = document.getElementById("etiquette-list");
    if (etiquetteListVisible) {
        etiquetteList.classList.add("hidden");
        etiquetteListVisible = false;
    } else {
        etiquetteList.classList.remove("hidden");
        etiquetteListVisible = true;
    }
});

window.addEventListener("click", (event) => {
    const etiquetteList = document.getElementById("etiquette-list");
    if (event.target !== searchEtiquetteInput && !etiquetteList.contains(event.target)) {
        etiquetteList.classList.add("hidden");
        etiquetteListVisible = false;
    }
});

const etiquetteList = document.getElementById("etiquette-list");
const etiquettes = etiquetteList.getElementsByTagName("li");

searchEtiquetteInput.addEventListener("input", () => {
    const searchTerm = searchEtiquetteInput.value.toLowerCase();

    for (const etiquette of etiquettes) {
        const etiquetteText = etiquette.textContent.toLowerCase();
        if (etiquetteText.includes(searchTerm)) {
            etiquette.style.display = "flex";
        } else {
            etiquette.style.display = "none";
        }
    }
});

const nbEtiquettesSelected = document.getElementById("nb-etiquettes-selected");
let selectedCount = 0;

for(const etiquette of etiquettes) {
    etiquette.addEventListener("click", () => {
        console.log("Etiquette clicked:", etiquette.textContent);
        const etiquetteId = etiquette.getAttribute("data-etiquette-id");
        const etiquetteCouleur = etiquette.getAttribute("data-etiquette-couleur");
        const etiquetteIcone = etiquette.getAttribute("data-etiquette-icone");
        const etiquetteName = document.getElementById("etiquette-texte-" + etiquetteId).textContent;

        if (!selectedEtiquettes.includes(etiquetteId)) {
            selectedCount++;
            nbEtiquettesSelected.textContent = `Étiquettes (${selectedCount})`;
            selectedEtiquettes.push(etiquetteId);

            const selectedEtiquetteContainer = document.createElement("div");
            const selectedEtiquetteIcone = document.createElement("span");

            selectedEtiquetteContainer.classList.add("selected-etiquette", "px-4", "py-1.5", "rounded-full", "flex", "items-center", "gap-2");
            selectedEtiquetteContainer.style.color = "#" + etiquetteCouleur;
            selectedEtiquetteContainer.style.backgroundColor = "#" + etiquetteCouleur + "40";
            selectedEtiquetteContainer.setAttribute("data-etiquette-id", etiquetteId);
            
            selectedEtiquetteIcone.classList.add("material-symbols-outlined");
            selectedEtiquetteIcone.textContent = etiquetteIcone;

            const selectedEtiquetteText = document.createElement("span");
            selectedEtiquetteText.textContent = etiquetteName;

            selectedEtiquetteContainer.appendChild(selectedEtiquetteIcone);
            selectedEtiquetteContainer.appendChild(selectedEtiquetteText);

            const removeButton = document.createElement("span");
            removeButton.classList.add("material-symbols-outlined", "cursor-pointer");
            removeButton.textContent = "close";
            removeButton.addEventListener("click", () => {
                selectedEtiquettesContainer.removeChild(selectedEtiquetteContainer);
                selectedEtiquettes = selectedEtiquettes.filter(id => id !== etiquetteId);
                selectedCount--;
                nbEtiquettesSelected.textContent = `Étiquettes (${selectedCount})`;
            });

            selectedEtiquetteContainer.appendChild(removeButton);
            selectedEtiquettesContainer.appendChild(selectedEtiquetteContainer);
        }
    });
}

/* Choix vote */
function showModal(modal) {
    modal.classList.remove("hidden");
}

function closeModal(modal) {
    modal.classList.add("hidden");
}

const ajoutChoixButton = document.getElementById("ajout-choix");
const choixModal = document.getElementById("modal-choix");
const closeModalChoix = document.getElementById("close-modal-choix");

ajoutChoixButton?.addEventListener("click", () => {
    showModal(choixModal);
});

choixModal?.addEventListener("click", (e) => {
    if (e.target === choixModal) {
        closeModal(choixModal);
    }
});

closeModalChoix?.addEventListener("click", () => {
    closeModal(choixModal);
});

// Inputs du modal
const nomChoixInput = document.getElementById("nom-choix-input");
const couleurChoixInput = document.getElementById("couleur-choix-input");
const ordreChoixInput = document.getElementById("ordre-choix-input");

const choixList = document.getElementById("choix-list");
const nbChoixSelected = document.getElementById("nb-choix-selected");
const formChoixVote = document.getElementById("form-choix");

let listeChoix = [];

// Initialisation de SortableJS pour le drag-and-drop
if (choixList) {
    new Sortable(choixList, {
        handle: ".drag-handle",
        animation: 150,
        ghostClass: "opacity-40",
        onEnd: () => {
            syncListeChoixOrder();
        }
    });
}

// Fonction pour synchroniser l'ordre des choix après un drag-and-drop
function syncListeChoixOrder() {
    const updatedList = [];
    const containers = choixList.getElementsByClassName("choix-item");

    for (let i = 0; i < containers.length; i++) {
        const container = containers[i];
        const id = container.dataset.id;
        // Retrouver l'objet dans l'ancienne liste
        const item = listeChoix.find(c => c.id === id);

        if (item) {
            // Mettre à jour l'ordre (1-based index)
            const newOrdre = (i + 1).toString();
            item.ordre = newOrdre;

            const ordreSpan = container.querySelector(".rank-badge");
            if (ordreSpan) {
                ordreSpan.textContent = `Ordre: ${newOrdre}`;
            }
            
            updatedList.push(item);
        }
    }
    listeChoix = updatedList;
}

let uniqueIdCounter = 0;

// Gestion des messages d'erreur pour le modal
function afficheErreur(element, container, message) {
    if (message) {
        element.textContent = message;
        container.classList.remove('hidden');
        container.style.display = 'flex'; 
    } else {
        element.textContent = '';
        container.classList.add('hidden');
        container.style.display = 'none';
    }
}

const errorContainer = document.getElementById("error-container-choix");
const errorMessage = document.getElementById("error-message-choix");

function estValide(propriete, valeur) {
    if (!valeur || valeur.trim() === "") return false;
    
    const valeurFormattee = valeur.trim().toLowerCase();

    const estDoublon = listeChoix.some(
        choix => choix[propriete].trim().toLowerCase() === valeurFormattee
    );

    const estNomValide = propriete === "nom" ? valeurFormattee.length > 3 : true;
    
    return !estDoublon && estNomValide;
}

formChoixVote?.addEventListener("submit", (e) => {
    e.preventDefault();

    afficheErreur(errorMessage, errorContainer, ""); // Réinitialiser le message d'erreur

    const nomChoix = nomChoixInput.value.trim();
    const couleurChoix = couleurChoixInput.value;

    const isNomValide = estValide("nom", nomChoix);
    const isCouleurValide = estValide("couleur", couleurChoix);

    if (nomChoix && couleurChoix && isNomValide && isCouleurValide) {
        
        const id = `choix-${uniqueIdCounter++}`;

        const dragHandler = document.createElement("span");
        dragHandler.classList.add("material-symbols-outlined", "cursor-grab", "active:cursor-grabbing", "hover:text-gray-500", "transition-colors", "text-gray-400", "drag-handle", "select-none");
        dragHandler.textContent = "drag_indicator";

        // Conteneur de la carte choix
        const choixContainer = document.createElement("div");
        choixContainer.classList.add("choix-item", "flex", "w-full", "items-center", "gap-3", "p-3", "border", "rounded-xl", "border-gray-300", "bg-gray-100", "shadow-sm");
        choixContainer.dataset.id = id;

        // Pastille de couleur
        const couleurSpan = document.createElement("span");
        couleurSpan.classList.add("w-7", "h-7", "shrink-0", "rounded-full", "border", "border-black/10");
        couleurSpan.style.backgroundColor = couleurChoix;

        // Bloc Nom + Ordre
        const nomOrdreDiv = document.createElement("div");
        nomOrdreDiv.classList.add("flex", "flex-col");

        const nomSpan = document.createElement("span");
        nomSpan.classList.add("font-semibold", "text-lg", "text-gray-800");
        nomSpan.textContent = nomChoix;

        const ordreSpan = document.createElement("span");
        ordreSpan.classList.add("text-gray-500", "text-sm", "rank-badge");
        ordreSpan.textContent = `Ordre: ${listeChoix.length + 1}`;

        nomOrdreDiv.appendChild(nomSpan);
        nomOrdreDiv.appendChild(ordreSpan);

        // Bouton Supprimer
        const removeButtonContainer = document.createElement("div");
        removeButtonContainer.classList.add("flex", "justify-end", "flex-1");

        const removeButton = document.createElement("span");
        removeButton.classList.add("material-symbols-outlined", "cursor-pointer", "hover:text-red-500", "transition-colors", "text-gray-400");
        removeButton.textContent = "delete";

        removeButton.addEventListener("click", () => {
            choixContainer.remove();
            listeChoix = listeChoix.filter(choix => choix.id !== id);
            syncListeChoixOrder();
            nbChoixSelected.textContent = `Choix (${listeChoix.length})`;
        });

        removeButtonContainer.appendChild(removeButton);

        choixContainer.appendChild(dragHandler);
        choixContainer.appendChild(couleurSpan);
        choixContainer.appendChild(nomOrdreDiv);
        choixContainer.appendChild(removeButtonContainer);

        choixList.appendChild(choixContainer);

        const newChoix = {
            id: id,
            nom: nomChoix,
            couleur: couleurChoix.replace("#", ""),
            ordre: (listeChoix.length + 1).toString()
        };
        
        listeChoix.push(newChoix);

        syncListeChoixOrder();
        nbChoixSelected.textContent = `Choix (${listeChoix.length})`;

        // Réinitialiser le champ texte du modal et fermer le modal
        nomChoixInput.value = "";
        closeModal(choixModal);
    } else {
        let errorMsg = "";
        if (!nomChoix) {
            errorMsg = "Le nom du choix est requis.";
        } else if (!couleurChoix) {
            errorMsg = "La couleur du choix est requise.";
        } else if (!isNomValide) {
            errorMsg = "Le nom du choix doit être unique et contenir au moins 4 caractères.";
        } else if (!isCouleurValide) {
            errorMsg = "La couleur du choix doit être unique.";
        } else {
            errorMsg = "Une erreur inattendue s'est produite.";
        }
        afficheErreur(errorMessage, errorContainer, errorMsg);
    }
});



/* Submit final */
const titreConsultationInput = document.getElementById("titre-consultation-input");
const budgetConsultationInput = document.getElementById("budget-consultation-input");

const formConsultation = document.getElementById("form-consultation");

formConsultation?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const titre = titreConsultationInput.value.trim();
    const contenu = await editor.save();
    const budget = budgetConsultationInput.value.trim();

    const dateDebut = Math.floor(fp.selectedDates[0].getTime() / 1000);
    const dateFin = Math.floor(fp.selectedDates[1].getTime() / 1000);

    if( listeChoix.length === 0 ) {
        alert("Veuillez ajouter au moins un choix de vote.");
        return;
    }

    if( selectedEtiquettes.length === 0 ) {
        alert("Veuillez sélectionner au moins une étiquette.");
        return;
    }

    if( !titre || !contenu || !dateDebut || !dateFin || !budget ) {
        alert("Veuillez remplir tous les champs requis.");
        return;
    }

    const result = await fetch("/administrateur/consultations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            titre,
            contenu: contenu.blocks,
            dateDebut,
            dateFin,
            budget,
            choix: listeChoix,
            etiquettes: selectedEtiquettes
        })
    });

    console.log("Réponse du serveur:", result);

    if (result.ok) {
        const data = await result.json();
        console.log("Consultation créée avec succès:", data);
        alert("Consultation créée avec succès !");
        window.location.href = "/administrateur/";
    } else {
        const errorData = await result.json();
        console.error("Erreur lors de la création de la consultation:", errorData);
        alert("Une erreur est survenue lors de la création de la consultation. Veuillez réessayer.");
    }
});