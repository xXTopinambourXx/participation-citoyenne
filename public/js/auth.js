/* Bouton accueil */
const openLoginModalButton = document.getElementById('open-login-modal');
const openRegisterModalButton = document.getElementById('open-register-modal');

if(openLoginModalButton) {
    openLoginModalButton.addEventListener('click', (event) => {
        event.preventDefault();
        showModalConnexion();
    });
}

if(openRegisterModalButton) {
    openRegisterModalButton.addEventListener('click', (event) => {
        event.preventDefault();
        showModalInscription();
    });
}

/* Partie connexion */
const modalConnexion = document.getElementById('modal-connexion');
const closeModalConnexion = document.getElementById('close-modal-connexion');
const formConnexion = document.getElementById('form-connexion');

const submitButtonConnexion = document.getElementById('submit-button-connexion');

// Partie erreur
const containerErreurConnexion = document.getElementById('error-container-connexion');
const errorMessageConnexion = document.getElementById('error-message-connexion');

// Fonction pour afficher le modal de connexion
function showModalConnexion() {
    modalConnexion.classList.remove('hidden');
}

// Fonction pour fermer le modal de connexion
function closeModalConnexionFunc() {
    modalConnexion.classList.add('hidden');
    afficheErreur(null); // Réinitialiser le message d'erreur
    formConnexion.reset(); // Réinitialiser le formulaire
}

closeModalConnexion.addEventListener('click', closeModalConnexionFunc);

modalConnexion.addEventListener('click', (event) => {
    if (event.target === modalConnexion) {
        closeModalConnexionFunc();
    }
});


const emailInputConnexion = document.getElementById('email-input-connexion');
const passwordInputConnexion = document.getElementById('password-input-connexion');

function afficheErreur(message) {
    if (message) {
        errorMessageConnexion.textContent = message;
        containerErreurConnexion.classList.remove('hidden');
        containerErreurConnexion.style.display = 'flex'; 
    } else {
        errorMessageConnexion.textContent = '';
        containerErreurConnexion.classList.add('hidden');
        containerErreurConnexion.style.display = 'none';
    }
}

function handleConnexionSubmit(event) {
    event.preventDefault();

    const email = emailInputConnexion.value.trim();
    const password = passwordInputConnexion.value.trim();

    if (!email || !password) {
        afficheErreur('Veuillez remplir tous les champs.');
        return;
    }

    fetch('/utilisateurs/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(async (response) => {
        const data = await response.json();

        // On vérifie à la fois le statut HTTP (response.ok) et le booléen data.success
        if (response.ok && data.success) {
            window.location.href = '/';
        } else {
            // Affiche le message renvoyé par l'API
            afficheErreur(data.message || 'Une erreur est survenue. Veuillez réessayer.');
        }
    })
    .catch((error) => {
        console.error('Erreur réseau ou parsing:', error);
        afficheErreur('Une erreur réseau est survenue. Veuillez réessayer.');
    });
}


formConnexion.addEventListener('submit', handleConnexionSubmit);

function handleDisconnect() {
    fetch('/utilisateurs/auth/logout', {
        method: 'GET',
    })
    .then((response) => {
        if (response.ok) {
            window.location.href = '/';
        } else {
            console.error('Erreur lors de la déconnexion:', response.statusText);
        }
    })
    .catch((error) => {
        console.error('Erreur réseau lors de la déconnexion:', error);
    });
}

const logoutButton = document.getElementById('logout-button');
if(logoutButton) {
    logoutButton.addEventListener('click', (event) => {
        event.preventDefault();
        handleDisconnect();
    });
}