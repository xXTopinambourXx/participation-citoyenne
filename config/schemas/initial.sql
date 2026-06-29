CREATE TABLE utilisateur (
    id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,

    email VARCHAR(255) NOT NULL UNIQUE,
    telephone VARCHAR(20),

    mot_de_passe VARCHAR(255) NOT NULL,

    est_admin BOOLEAN NOT NULL DEFAULT FALSE 
);

CREATE TABLE consultation (
    id_consultation INT AUTO_INCREMENT PRIMARY KEY,

    titre VARCHAR(255) NOT NULL,
    descr TEXT NOT NULL,

    statut TINYINT UNSIGNED NOT NULL,-- 0 : A venir, 1 : En cours, 2 : Terminee

    date_creation INT UNSIGNED NOT NULL,
    date_debut INT UNSIGNED NOT NULL,
    date_fin INT UNSIGNED NOT NULL,

    createur_consultation_id INT NOT NULL,

    CONSTRAINT fk_consultation_createur 
        FOREIGN KEY (createur_consultation_id) 
        REFERENCES utilisateur(id_utilisateur) 
        ON DELETE CASCADE
);

CREATE TABLE proposition (
    id_proposition INT AUTO_INCREMENT PRIMARY KEY,

    titre VARCHAR(255) NOT NULL,
    descr TEXT NOT NULL,

    date_creation INT UNSIGNED NOT NULL,

    createur_proposition_id INT NOT NULL,

    CONSTRAINT fk_proposition_createur 
        FOREIGN KEY (createur_proposition_id) 
        REFERENCES utilisateur(id_utilisateur) 
        ON DELETE CASCADE
);

CREATE TABLE commentaire (
    id_commentaire INT AUTO_INCREMENT PRIMARY KEY,

    contenu TEXT NOT NULL,

    consultation_id INT DEFAULT NULL,
    proposition_id INT DEFAULT NULL,

    date_creation INT UNSIGNED NOT NULL,

    createur_commentaire_id INT NOT NULL,

    CONSTRAINT fk_commentaire_consultation
        FOREIGN KEY (consultation_id)
        REFERENCES consultation(id_consultation)
        ON DELETE CASCADE,

    CONSTRAINT fk_commentaire_proposition
        FOREIGN KEY (proposition_id)
        REFERENCES proposition(id_proposition)
        ON DELETE CASCADE,

    CONSTRAINT fk_commentaire_createur
        FOREIGN KEY (createur_commentaire_id)
        REFERENCES utilisateur(id_utilisateur)
        ON DELETE CASCADE,

    CONSTRAINT chk_commentaire
        CHECK (
            (consultation_id IS NOT NULL AND proposition_id IS NULL)
            OR
            (consultation_id IS NULL AND proposition_id IS NOT NULL)
        )
);

CREATE TABLE vote (
    id_vote INT AUTO_INCREMENT PRIMARY KEY,

    date_vote INT UNSIGNED NOT NULL,

    consultation_id INT DEFAULT NULL,

    createur_vote_id INT NOT NULL,

    CONSTRAINT fk_vote_consultation
        FOREIGN KEY (consultation_id)
        REFERENCES consultation(id_consultation)
        ON DELETE CASCADE,

    CONSTRAINT fk_vote_createur
        FOREIGN KEY (createur_vote_id)
        REFERENCES utilisateur(id_utilisateur)
        ON DELETE CASCADE,

    CONSTRAINT uq_vote_consultation
        UNIQUE (createur_vote_id, consultation_id)
);

CREATE TABLE soutien (
    id_soutien INT AUTO_INCREMENT PRIMARY KEY,

    date_soutien INT UNSIGNED NOT NULL,

    proposition_id INT NOT NULL,

    createur_soutien_id INT NOT NULL,

    CONSTRAINT fk_soutien_proposition
        FOREIGN KEY (proposition_id)
        REFERENCES proposition(id_proposition)
        ON DELETE CASCADE,

    CONSTRAINT fk_soutien_createur
        FOREIGN KEY (createur_soutien_id)
        REFERENCES utilisateur(id_utilisateur)
        ON DELETE CASCADE,

    CONSTRAINT uq_soutien_proposition
        UNIQUE (createur_soutien_id, proposition_id)
);