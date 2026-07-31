/* Bouton accueil */
const openLoginModalButton = document.getElementById('open-login-modal');
const openRegisterModalButton = document.getElementById('open-register-modal');

if(openLoginModalButton) {
    openLoginModalButton.addEventListener('click', (event) => {
        event.preventDefault();
        showModal(modalConnexion);
    });
}

if(openRegisterModalButton) {
    openRegisterModalButton.addEventListener('click', (event) => {
        event.preventDefault();
        showModal(modalInscription);
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

// Fonction pour afficher le modal
function showModal(element) {
    element.classList.remove('hidden');
}

// Fonction pour fermer le modal
function closeModal(modalElement, errorTextElement, errorContainerElement, formElement) {
    modalElement.classList.add('hidden');
    
    // On vide le texte de l'erreur, pas le modal entier !
    afficheErreur(errorTextElement, errorContainerElement, null); 
    
    formElement.reset(); 
}

closeModalConnexion.addEventListener('click', () => 
    closeModal(modalConnexion, errorMessageConnexion, containerErreurConnexion, formConnexion)
);

modalConnexion.addEventListener('click', (event) => {
    if (event.target === modalConnexion) {
        closeModal(modalConnexion, errorMessageConnexion, containerErreurConnexion, formConnexion);
    }
});


const emailInputConnexion = document.getElementById('email-input-connexion');
const passwordInputConnexion = document.getElementById('password-input-connexion');

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

function handleConnexionSubmit(event) {
    event.preventDefault();

    const email = emailInputConnexion.value.trim();
    const password = passwordInputConnexion.value.trim();

    if (!email || !password) {
        afficheErreur(errorMessageConnexion, containerErreurConnexion, 'Veuillez remplir tous les champs.');
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
            afficheErreur(errorMessageConnexion, containerErreurConnexion ,data.message || 'Une erreur est survenue. Veuillez réessayer.');
        }
    })
    .catch((error) => {
        console.error('Erreur réseau ou parsing:', error);
        afficheErreur(errorMessageConnexion, containerErreurConnexion, 'Une erreur réseau est survenue. Veuillez réessayer.');
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

/* Partie inscription */
const modalInscription = document.getElementById('modal-inscription');
const closeModalInscription = document.getElementById('close-modal-inscription');
const formInscription = document.getElementById('form-inscription');

const submitButtonInscription = document.getElementById('submit-button-inscription');

// Partie erreur
const containerErreurInscription = document.getElementById('error-container-inscription');
const errorMessageInscription = document.getElementById('error-message-inscription');

closeModalInscription.addEventListener('click', () => {
    closeModal(modalInscription, errorMessageInscription, containerErreurInscription, formInscription);
    // Petit bonus : on remet le formulaire d'inscription à l'étape 1 quand on le ferme
    if (typeof changerEtape === 'function') {
        changerEtape(1);
    }
});

modalInscription.addEventListener('click', (event) => {
    if (event.target === modalInscription) {
        closeModal(modalInscription, errorMessageInscription, containerErreurInscription, formInscription);
        if (typeof changerEtape === 'function') {
            changerEtape(1);
        }
    }
});

let currentStep = 1;

/* Gestion des étapes du formulaire d'inscription */
const stepIndicators = [
    document.getElementById('step-indicator-1'),
    document.getElementById('step-indicator-2'),
    document.getElementById('step-indicator-3')
];

const btnNext = document.getElementById('next-step');
const btnPrev = document.getElementById('prev-step');
const btnSubmit = document.getElementById('btn-submit');

formInscription.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && currentStep < 3) {
        event.preventDefault();
        validerEtAvancer();
    }
});

if(btnNext) {
    btnNext.addEventListener('click', (event) => {
        e.preventDefault();
        validerEtAvancer();
        console.log('Current Step:', currentStep);
    });
}

if(btnPrev) {
    btnPrev.addEventListener('click', (event) => {
        if(currentStep === 1) {
            btnPrev.disabled = true;
        } else {
            event.preventDefault();
            afficheErreur(errorMessageInscription, containerErreurInscription, null);
            changerEtape(currentStep - 1);
        }
    });
}

// Fonction pour vérifier l'e-mail auprès de l'API
async function verifierEmailBdd(email) {
    try {
        const response = await fetch(`/utilisateurs/check-email?email=${encodeURIComponent(email)}`);
        if (!response.ok) throw new Error('Erreur réseau');
        
        const data = await response.json();
        return data.existe; // Retourne true si déjà utilisé, false sinon
    } catch (error) {
        console.error('Erreur lors de la vérification:', error);
        return false; // En cas d'erreur serveur, on peut laisser passer ou bloquer selon tes besoins
    }
}

async function validerEtAvancer() {
    afficheErreur(errorMessageInscription, containerErreurInscription, null);

    if(currentStep === 1) {
        const nom = document.getElementById('nom').value.trim();
        const prenom = document.getElementById('prenom').value.trim();
        
        if(!nom || !prenom) {
            afficheErreur(errorMessageInscription, containerErreurInscription, 'Veuillez remplir tous les champs.');
            return;
        }

        if(nom.length < 2 || prenom.length < 2) {
            afficheErreur(errorMessageInscription, containerErreurInscription, 'Le nom et le prénom doivent contenir au moins 2 caractères.');
            return;
        }
    } 

    if (currentStep === 2) {
        const email = document.getElementById('email').value.trim();
        const confirmEmail = document.getElementById('email-confirm').value.trim();

        if(!email || !confirmEmail) {
            afficheErreur(errorMessageInscription, containerErreurInscription, 'Veuillez remplir tous les champs.');
            return;
        }

        if(email !== confirmEmail) {
            afficheErreur(errorMessageInscription, containerErreurInscription, 'Les adresses e-mail ne correspondent pas.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            afficheErreur(errorMessageInscription, containerErreurInscription, 'Veuillez entrer une adresse e-mail valide.');
            return;
        }

        btnNext.disabled = true; // Empêche les clics multiples pendant le fetch
    
        const emailExiste = await verifierEmailBdd(email);

        btnNext.disabled = false;

        if (emailExiste) {
            afficheErreur(errorMessageInscription, containerErreurInscription,'Cette adresse e-mail est déjà associée à un compte.');
            return;
        }
    }
    changerEtape(currentStep + 1);
}

function changerEtape(nouvelleEtape) {
    if(nouvelleEtape > 1){
        btnPrev.classList.remove('text-gray-500');
        btnPrev.classList.add('cursor-pointer', 'text-gray-700');
    } else {
        btnPrev.classList.add('text-gray-500');
        btnPrev.classList.remove('cursor-pointer', 'text-gray-700');
    }

    // 1. On cache l'étape ACTUELLE avant de changer la variable
    document.getElementById(`step-${currentStep}`).classList.add('hidden');
    
    // 2. On met à jour l'étape
    currentStep = nouvelleEtape;

    // 3. On affiche la NOUVELLE étape
    document.getElementById('current-step').textContent = currentStep;
    document.getElementById(`step-${currentStep}`).classList.remove('hidden');
}

formInscription.addEventListener('submit', (event) => {
    event.preventDefault();

    afficheErreur(errorMessageInscription, containerErreurInscription, null); // On réinitialise

    // On suppose que tes inputs HTML ont les IDs "password" et "confirm-password"
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('password-confirm').value.trim();

    if(!password || !confirmPassword) {
        afficheErreur(errorMessageInscription, containerErreurInscription, 'Veuillez remplir tous les champs.');
        return;
    }

    if(password !== confirmPassword) {
        afficheErreur(errorMessageInscription, containerErreurInscription, 'Les mots de passe ne correspondent pas.');
        return;
    }

    if(password.length < 6) {
        afficheErreur(errorMessageInscription, containerErreurInscription, 'Le mot de passe doit contenir au moins 6 caractères.');
        return;
    }

    const accepteCgu = document.getElementById('accepteCgu').checked;
    if (!accepteCgu) {
        afficheErreur(errorMessageInscription, containerErreurInscription, 'Vous devez accepter les conditions d’utilisation.');
        return;
    }

    const payload = {
        email: document.getElementById('email').value.trim(),
        motDePasse: password, // On utilise la variable déjà vérifiée
        nom: document.getElementById('nom').value.trim(),
        prenom: document.getElementById('prenom').value.trim()
    };

    fetch('/utilisateurs/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(async (response) => {
        const data = await response.json();

        if (response.ok && data.success) {
            window.location.href = '/'; // Redirection vers l'accueil après inscription
        } else {
            afficheErreur(errorMessageInscription, containerErreurInscription, data.message || 'Une erreur est survenue. Veuillez réessayer.');
        }
    })
    .catch((error) => {
        console.error('Erreur réseau ou parsing:', error);
        afficheErreur(errorMessageInscription, containerErreurInscription, 'Une erreur réseau est survenue. Veuillez réessayer.');
    });
});