DROP DATABASE IF EXISTS participation_citoyenne;

CREATE DATABASE participation_citoyenne
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE participation_citoyenne;

CREATE TABLE utilisateur (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    est_admin TINYINT UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE consultation (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL,
    contenu TEXT NOT NULL,
    budget INT UNSIGNED,
    couverture VARCHAR(255),
    statut TINYINT UNSIGNED NOT NULL DEFAULT 0, -- 0: brouillon, 1: publié, 2: suspendu, 3: annulé, 4: archivé
    date_creation INT UNSIGNED NOT NULL,
    date_debut INT UNSIGNED NOT NULL,
    date_fin INT UNSIGNED NOT NULL,
    utilisateur_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_consultation_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE proposition (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL,
    contenu TEXT NOT NULL,
    date_creation INT UNSIGNED NOT NULL,
    statut TINYINT UNSIGNED NOT NULL DEFAULT 0,
    utilisateur_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_proposition_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE etiquette (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT, -- (max 65 535 étiquettes)
    nom VARCHAR(100) NOT NULL UNIQUE,
    icone VARCHAR(50) NOT NULL,
    couleur CHAR(6) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE consultation_etiquette (
    consultation_id INT UNSIGNED NOT NULL,
    etiquette_id SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (consultation_id, etiquette_id),
    CONSTRAINT fk_ce_consultation FOREIGN KEY (consultation_id) REFERENCES consultation(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_ce_etiquette FOREIGN KEY (etiquette_id) REFERENCES etiquette(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE proposition_etiquette (
    proposition_id INT UNSIGNED NOT NULL,
    etiquette_id SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (proposition_id, etiquette_id),
    CONSTRAINT fk_pe_proposition FOREIGN KEY (proposition_id) REFERENCES proposition(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_pe_etiquette FOREIGN KEY (etiquette_id) REFERENCES etiquette(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE commentaire (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    contenu TEXT NOT NULL,
    date_commentaire INT UNSIGNED NOT NULL,
    consultation_id INT UNSIGNED DEFAULT NULL,
    proposition_id INT UNSIGNED DEFAULT NULL,
    utilisateur_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_commentaire_consultation FOREIGN KEY (consultation_id) REFERENCES consultation(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_commentaire_proposition FOREIGN KEY (proposition_id) REFERENCES proposition(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_commentaire_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE like_commentaire (
    utilisateur_id INT UNSIGNED NOT NULL,
    commentaire_id INT UNSIGNED NOT NULL,

    aime TINYINT UNSIGNED, -- 0: aime pas, 1: aime

    CONSTRAINT fk_uc_commentaire FOREIGN KEY (commentaire_id) REFERENCES commentaire(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_uc_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE signalement (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    date_signalement INT UNSIGNED NOT NULL,
    motif TINYINT UNSIGNED NOT NULL,
    contenu TEXT,
    commentaire_id INT UNSIGNED DEFAULT NULL,
    proposition_id INT UNSIGNED DEFAULT NULL,
    utilisateur_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_signalement_commentaire FOREIGN KEY (commentaire_id) REFERENCES commentaire(id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_signalement_proposition FOREIGN KEY (proposition_id) REFERENCES proposition(id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_signalement_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE choix_vote (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    ordre TINYINT UNSIGNED NOT NULL,
    nom VARCHAR(100) NOT NULL,
    couleur CHAR(6) NOT NULL,
    consultation_id INT UNSIGNED NOT NULL,
    nb_votes INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_choix_vote_consultation FOREIGN KEY (consultation_id) REFERENCES consultation(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE vote (
    date_vote INT UNSIGNED NOT NULL,
    utilisateur_id INT UNSIGNED NOT NULL,
    consultation_id INT UNSIGNED NOT NULL,
    choix_vote_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (utilisateur_id, consultation_id),
    CONSTRAINT fk_vote_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_vote_consultation FOREIGN KEY (consultation_id) REFERENCES consultation(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_vote_choix_vote FOREIGN KEY (choix_vote_id) REFERENCES choix_vote(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE soutien (
    date_soutien INT UNSIGNED NOT NULL,
    utilisateur_id INT UNSIGNED NOT NULL,
    proposition_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (utilisateur_id, proposition_id),
    CONSTRAINT fk_soutien_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_soutien_proposition FOREIGN KEY (proposition_id) REFERENCES proposition(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE mise_a_jour (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL,
    contenu TEXT NOT NULL,
    date_mise_a_jour INT UNSIGNED NOT NULL,
    utilisateur_id INT UNSIGNED NOT NULL,
    consultation_id INT UNSIGNED DEFAULT NULL,
    proposition_id INT UNSIGNED DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_maj_consultation FOREIGN KEY (consultation_id) REFERENCES consultation(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_maj_proposition FOREIGN KEY (proposition_id) REFERENCES proposition(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_maj_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE ON UPDATE CASCADE
);