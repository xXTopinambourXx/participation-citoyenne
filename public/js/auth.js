const modal = document.getElementById("auth-modal");

/* Boutons d'ouverture */
const loginBtns = document.getElementsByClassName("open-login-modal");
const registerBtns = document.getElementsByClassName("open-register-modal");

/* Éléments de la modale */
const modalTitle = document.getElementById("modal-title");
const modalForm = document.getElementById("modal-form");
const closeBtn = document.getElementById("close-modal");

/* Écouteurs pour le Mode Connexion */
for (const btn of loginBtns) {
    btn.addEventListener("click", () => {
        currentMode = "login";
        modalTitle.textContent = "Se connecter";
        modal.classList.remove("hidden");
    });
}

/* Écouteurs pour le Mode Inscription */
for (const btn of registerBtns) {
    btn.addEventListener("click", () => {
        currentMode = "register";
        modalTitle.textContent = "Inscription";
        modal.classList.remove("hidden");
    });
}

/* Fermeture de la modale */
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.add("hidden");
    }
});

/* Soumission dynamique du formulaire */
modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // On récupère dynamiquement les champs selon le formulaire
    const emailInput = document.getElementById("email-input-login");
    const passwordInput = document.getElementById("password-input-login");

    if (!emailInput || !passwordInput) return;

    const payload = {
        email: emailInput.value,
        password: passwordInput.value,
    };

    try {
        const response = await fetch("/utilisateurs/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            console.log("Connexion réussie !");
        } else {
            const errorMsg = await response.text();
            alert("Erreur : " + errorMsg);
        }
    } catch (err) {
        console.error("Erreur réseau :", err);
    }
});