/* ------------------ Emoji Picker ------------------ */
const emojiBtn = document.getElementById("emoji-picker-btn");
const pickerContainer = document.getElementById("picker-container");
const commentInput = document.getElementById("write-commentary");
const picker = document.querySelector("emoji-picker");

if (emojiBtn && pickerContainer && commentInput && picker) {
    emojiBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        pickerContainer.classList.toggle("hidden");
    });

    picker.addEventListener("emoji-click", (event) => {
        const emoji = event.detail.unicode;

        const start = commentInput.selectionStart;
        const end = commentInput.selectionEnd;
        const currentText = commentInput.value;

        commentInput.value = currentText.slice(0, start) + emoji + currentText.slice(end);

        commentInput.selectionStart = commentInput.selectionEnd = start + emoji.length;
        commentInput.focus();
    });

    document.addEventListener("click", (event) => {
        if (!pickerContainer.contains(event.target) && event.target !== emojiBtn) {
            pickerContainer.classList.add("hidden");
        }
    });
}

/* ------------------ Vote ------------------ */
function showModal(modal) {
    modal.classList.remove("hidden");
}

function closeModal(modal) {
    modal.classList.add("hidden");
}

const voteModal = document.getElementById("vote-modal");
const choixContainer = document.getElementById("liste-choix");
const choix = choixContainer ? Array.from(choixContainer.children) : [];

const voteBoutonLateral = document.getElementById("vote-button-lateral");
const voteBoutonBox = document.getElementById("vote-boutton-box");

const closeModalButton = document.getElementById("button-close-modal");

voteBoutonLateral?.addEventListener("click", () => {
    showModal(voteModal);
});

voteBoutonBox?.addEventListener("click", () => {
    showModal(voteModal);
});

voteModal?.addEventListener("click", (e) => {
    if (e.target === voteModal) {
        closeModal(voteModal);
    }
});

closeModalButton?.addEventListener("click", () => {
    closeModal(voteModal);
});

let choixPrecedent = null;
let selectedChoiceId = null;

choix.forEach((c) => {
    c.addEventListener("click", (e) => {
        const currentTarget = e.currentTarget;

        if (choixPrecedent && choixPrecedent === currentTarget) {
            choixPrecedent.style.backgroundColor = "white";
            choixPrecedent.style.color = choixPrecedent.getAttribute("data-couleur");
            choixPrecedent = null;
            selectedChoiceId = null;
        } else {
            choixPrecedent = currentTarget;

            choix.forEach((other) => {
                other.style.backgroundColor = "white";
                other.style.color = other.getAttribute("data-couleur");
            });

            const couleur = currentTarget.getAttribute("data-couleur");
            currentTarget.style.backgroundColor = couleur;
            currentTarget.style.color = "white";
            selectedChoiceId = Number(currentTarget.id);
        }
    });
});

