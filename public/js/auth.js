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
        let data = {};
        try {
            data = await response.json();
        } catch (e) {
            console.error('Erreur lors du parsing JSON:', e);
        }

        if (response.ok && data.success) {
            window.location.href = '/';
        } else {
            
            const message = data.message || (response.status === 401 
                ? 'Identifiants incorrects ou inexistant.' 
                : 'Une erreur est survenue. Veuillez réessayer.');

            afficheErreur(errorMessageConnexion, containerErreurConnexion, message);
        }
    })
    .catch((error) => {
        console.error('Erreur réseau ou connexion impossible :', error);
        afficheErreur(errorMessageConnexion, containerErreurConnexion, 'Erreur réseau : impossible de contacter le serveur.');
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

formInscription.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter' && currentStep < 3) {
        e.preventDefault();
        await validerEtAvancer();
    }
});

if (btnNext) {
    btnNext.addEventListener('click', async (e) => {
        e.preventDefault();
        await validerEtAvancer();
        console.log('Current Step:', currentStep);
    });
}

if (btnPrev) {
    btnPrev.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentStep === 1) {
            btnPrev.disabled = true;
        } else {
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
        return false;
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

        btnNext.disabled = true;
    
        try {
            const emailExiste = await verifierEmailBdd(email);

            if (emailExiste) {
                afficheErreur(errorMessageInscription, containerErreurInscription, 'Cette adresse e-mail est déjà associée à un compte.');
                return;
            }
        } finally {
            btnNext.disabled = false;
        }
    }
    changerEtape(currentStep + 1);
}

function changerEtape(nouvelleEtape) {
    /* Bouton précédent */
    if(nouvelleEtape > 1) {
        btnPrev.classList.remove('text-gray-500');
        btnPrev.classList.add('cursor-pointer', 'text-gray-700');
    } else {
        btnPrev.classList.add('text-gray-500');
        btnPrev.classList.remove('cursor-pointer', 'text-gray-700');
    }

    /* Bouton suivant */
    if(nouvelleEtape === 3) {
        btnNext.classList.add('hidden');
        btnSubmit.classList.remove('hidden');
    } else {
        btnNext.classList.remove('hidden');
        btnSubmit.classList.add('hidden');
    }

    // On cache l'étape ACTUELLE avant de changer la variable
    document.getElementById(`step-${currentStep}`).classList.add('hidden');
    
    // On met à jour l'étape
    currentStep = nouvelleEtape;

    // On affiche la NOUVELLE étape
    document.getElementById('current-step').textContent = currentStep;
    document.getElementById(`step-${currentStep}`).classList.remove('hidden');

    // On met à jour les indicateurs d'étape
    stepIndicators.forEach((indicator, index) => {
        if (index + 1 <= currentStep) {
            indicator.classList.add('bg-primary/80', 'border-primary');
            indicator.classList.remove('border-gray-300');
        } else {
            indicator.classList.remove('bg-primary/80', 'border-primary');
            indicator.classList.add('border-gray-300');
        }
    });

    // On réinitialise les messages d'erreur à chaque changement d'étape
    afficheErreur(errorMessageInscription, containerErreurInscription, null);
}

formInscription.addEventListener('submit', (event) => {
    event.preventDefault();

    afficheErreur(errorMessageInscription, containerErreurInscription, null); // On réinitialise

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

    const accepteCgu = document.getElementById('cgu').checked;
    if (!accepteCgu) {
        afficheErreur(errorMessageInscription, containerErreurInscription, 'Vous devez accepter les conditions d’utilisation.');
        return;
    }

    const payload = {
        email: document.getElementById('email').value.trim(),
        motDePasse: password,
        nom: document.getElementById('nom').value.trim(),
        prenom: document.getElementById('prenom').value.trim()
    };

    fetch('/utilisateurs/auth/creer', {
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