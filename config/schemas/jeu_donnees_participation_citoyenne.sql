USE participation_citoyenne;

-- ============================================================================
-- 1. UTILISATEURS (3 Admins, 17 Citoyens)
-- ============================================================================
INSERT INTO utilisateur (id, nom, prenom, email, mot_de_passe, est_admin) VALUES
(1, 'Martin', 'Claire', 'claire.martin@mairie-citoyenne.fr', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 1),
(2, 'Bernard', 'Thomas', 'thomas.bernard@mairie-citoyenne.fr', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 1),
(3, 'Dubois', 'Sophie', 'sophie.dubois@mairie-citoyenne.fr', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 1),
(4, 'Petit', 'Lucas', 'lucas.petit@gmail.com', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 0),
(5, 'Robert', 'Emma', 'emma.robert@outlook.fr', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 0),
(6, 'Richard', 'Antoine', 'antoine.richard@yahoo.fr', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 0),
(7, 'Durand', 'Camille', 'camille.durand@free.fr', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 0),
(8, 'Leroy', 'Nicolas', 'nicolas.leroy@gmail.com', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 0),
(9, 'Moreau', 'Julie', 'julie.moreau@wanadoo.fr', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 0),
(10, 'Simon', 'Maxime', 'maxime.simon@laposte.net', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 0),
(11, 'Laurent', 'Chloé', 'chloe.laurent@gmail.com', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 0),
(12, 'Lefebvre', 'Alexandre', 'alex.lef@sfr.fr', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 0),
(13, 'Michel', 'Sarah', 'sarah.michel@gmail.com', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 0),
(14, 'Garcia', 'David', 'david.garcia@orange.fr', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 0),
(15, 'David', 'Léa', 'lea.david@gmail.com', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 0),
(16, 'Bertrand', 'Paul', 'paul.bertrand@outlook.com', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 0),
(17, 'Roux', 'Manon', 'manon.roux@free.fr', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 0),
(18, 'Vincent', 'Julien', 'julien.vincent@gmail.com', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 0),
(19, 'Fournier', 'Laura', 'laura.fournier@yahoo.fr', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 0),
(20, 'Morel', 'Guillaume', 'g.morel@gmail.com', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 0);

-- ============================================================================
-- 2. ÉTIQUETTES (Thématiques - Google Material Icons)
-- ============================================================================
INSERT INTO etiquette (id, nom, icone, couleur) VALUES
(1, 'Transition écologique', 'eco', '2ECC71'),
(2, 'Mobilité & Transports', 'directions_bike', '3498DB'),
(3, 'Urbanisme & Habitat', 'apartment', 'E67E22'),
(4, 'Éducation & Jeunesse', 'school', '9B59B6'),
(5, 'Sport & Santé', 'health_and_safety', 'E74C3C'),
(6, 'Culture & Patrimoine', 'theater_comedy', 'F1C40F'),
(7, 'Sécurité & Tranquillité', 'shield', '34495E'),
(8, 'Démocratie & Citoyenneté', 'groups', '1ABC9C'),
(9, 'Économie locale', 'storefront', 'D35400'),
(10, 'Solidarité & Inclusion', 'volunteer_activism', '16A085');

-- ============================================================================
-- 3. CONSULTATIONS
-- ============================================================================
INSERT INTO consultation (id, titre, contenu, budget, couverture, statut, date_creation, date_debut, date_fin, utilisateur_id) VALUES
(1, 'Réaménagement de la Place Jean-Jaurès', 'Nous vous proposons trois scénarios pour la végétalisation et la piétonnisation de la Place Jean-Jaurès afin de réduire les îlots de chaleur.', 450000.00, 'img/consultations/place-jaures.jpg', 1, 1735689600, 1738368000, 1746057600, 1),
(2, 'Plan Vélo 2026 : Quelles priorités ?', 'Donnez votre avis sur le tracé des 15 prochains kilomètres de pistes cyclables protégées au sein de l’agglomération.', 1200000.00, 'img/consultations/plan-velo.jpg', 1, 1738368000, 1740787200, 1748736000, 2),
(3, 'Budget Participatif 2025 - Écoles primaires', 'Votez pour les projets d’aménagement des cours de récréation de nos écoles primaires (cours oasis).', 300000.00, 'img/consultations/ecoles.jpg', 4, 1704067200, 1706745600, 1714521600, 1),
(4, 'Horaires d’éclairage public nocturne', 'Souhaitez-vous une extinction de l’éclairage public entre 1h et 5h du matin dans les zones résidentielles pour favoriser la biodiversité et les économies d’énergie ?', 0.00, 'img/consultations/eclairage.jpg', 1, 1741000000, 1741500000, 1750000000, 3),
(5, 'Création d’un centre culturel associatif', 'Consultation sur les usages souhaités pour l’ancienne halle industrielle réhabilitée dans le quartier Nord.', 850000.00, 'img/consultations/centre-culturel.jpg', 1, 1742000000, 1743000000, 1755000000, 2),
(6, 'Sécurisation des abords du collège Victor Hugo', 'Choix des aménagements de voirie pour ralentir la circulation aux abords de l’établissement.', 150000.00, 'img/consultations/college-securite.jpg', 2, 1739000000, 1740000000, 1745000000, 1),
(7, 'Charte esthétique des terrasses de commerces', 'Harmonisation du mobilier et des auvents pour les restaurants et cafés du centre historique.', 50000.00, 'img/consultations/terrasses.jpg', 0, 1745000000, 1750000000, 1758000000, 3),
(8, 'Nommage du nouveau parc municipal', 'Choisissez le nom du nouveau parc paysager de 4 hectares situé en bord de rivière.', 10000.00, 'img/consultations/parc.jpg', 1, 1743000000, 1743500000, 1749000000, 2);

-- ============================================================================
-- 4. PROPOSITIONS CITOYENNES
-- ============================================================================
INSERT INTO proposition (id, titre, contenu, date_creation, statut, utilisateur_id) VALUES
(1, 'Installation de composteurs collectifs', 'Il serait très utile d’installer des bacs de compostage partagés dans les parcs de la ville pour les résidents d’appartements.', 1736000000, 1, 4),
(2, 'Gratuité des bus le week-end', 'Pour redynamiser le centre-ville et limiter l’usage de la voiture, je propose la gratuité des transports en commun les samedis et dimanches.', 1736500000, 1, 7),
(3, 'Création d’un parc à chiens clôturé', 'Il manque un espace sécurisé où nos chiens peuvent courir sans laisse sans déranger les joggeurs et les enfants.', 1737000000, 1, 11),
(4, 'Boîtes à livres dans chaque quartier', 'Installer 10 nouvelles boîtes à livres construites en bois recyclé par les ateliers techniques de la ville.', 1737500000, 1, 5),
(5, 'Végétalisation des toitures des bâtiments publics', 'Obliger ou favoriser la plantation de toitures végétales sur la mairie, les gymnases et les écoles pour isoler et capter l’eau de pluie.', 1738000000, 1, 8),
(6, 'Festival de musique des jeunes talents locaux', 'Organiser un festival annuel gratuit en plein air mettant à l’honneur les musiciens et groupes de la région.', 1738500000, 1, 15),
(7, 'Aménagement de terrains de Padel et Basket 3x3', 'Remplacer le vieux court de tennis abandonné du complexe sportif par deux terrains de Padel et un terrain de Basket 3x3 moderne.', 1739000000, 1, 18),
(8, 'Ateliers d’initiation au numérique pour les seniors', 'Mettre en place des permanences hebdomadaires dans les médiathèques pour aider les personnes âgées avec les démarches administratives en ligne.', 1739500000, 1, 9),
(9, 'Espaces sans tabac devant les écoles et parcs', 'Interdire strictement la cigarette et la vapoteuse dans un rayon de 50 mètres autour des entrées d’écoles et des aires de jeux.', 1740000000, 1, 13),
(10, 'Installation de fontaines à eau potable et brumisateurs', 'Avec l’augmentation des canicules, il est urgent d’ajouter des points d’eau accessibles à tous dans l’espace public.', 1740500000, 1, 6),
(11, 'Création d’une ressourcerie / recyclerie municipale', 'Un lieu pour donner, réparer et acheter à bas prix des objets du quotidien au lieu de les jeter à la déchetterie.', 1741000000, 1, 10),
(12, 'Marché de producteurs bio en soirée', 'Créer un marché des producteurs locaux le jeudi de 17h à 20h sur la place de la Gare pour les gens qui rentrent du travail.', 1741500000, 0, 14);

-- ============================================================================
-- 5. LIAISONS ÉTIQUETTES (Consultations & Propositions)
-- ============================================================================
INSERT INTO consultation_etiquette (consultation_id, etiquette_id) VALUES
(1, 1), (1, 3),
(2, 1), (2, 2),
(3, 4), (3, 8),
(4, 1), (4, 7),
(5, 6), (5, 8),
(6, 2), (6, 7), (6, 4),
(7, 3), (7, 9),
(8, 1), (8, 6);

INSERT INTO proposition_etiquette (proposition_id, etiquette_id) VALUES
(1, 1), (1, 3),
(2, 1), (2, 2), (2, 9),
(3, 3), (3, 7),
(4, 6), (4, 10),
(5, 1), (5, 3),
(6, 6), (6, 4),
(7, 5), (7, 4),
(8, 10), (8, 8),
(9, 5), (9, 7), (9, 4),
(10, 1), (10, 5),
(11, 1), (11, 9), (11, 10),
(12, 9), (12, 1);

-- ============================================================================
-- 6. CHOIX DE VOTE POUR LES CONSULTATIONS
-- ============================================================================
INSERT INTO choix_vote (id, ordre, nom, couleur, consultation_id) VALUES
-- Consultation 1 (Place Jean-Jaurès)
(1, 1, 'Scénario 1 : 100% piéton et forêt urbaine', '2ECC71', 1),
(2, 2, 'Scénario 2 : Mixte avec voie de bus maintenue', 'F39C12', 1),
(3, 3, 'Scénario 3 : Maintien du parking et végétalisation légère', '95A5A6', 1),
-- Consultation 2 (Plan Vélo)
(4, 1, 'Axe Prioritaire Nord-Sud (Gare <-> Campus)', '3498DB', 2),
(5, 2, 'Axe Prioritaire Est-Ouest (Zone Commerciale <-> Centre)', '9B59B6', 2),
(6, 3, 'Boulevard circulaire autour du centre-ville', '1ABC9C', 2),
-- Consultation 3 (Budget Écoles - Archivée)
(7, 1, 'Pour la rénovation des 5 cours', '27AE60', 3),
(8, 2, 'Contre, trop coûteux', 'C0392B', 3),
(9, 3, 'Abstention / Sans avis', '7F8C8D', 3),
-- Consultation 4 (Éclairage public)
(10, 1, 'Oui, extinction totale de 1h à 5h', '2ECC71', 4),
(11, 2, 'Oui, mais uniquement de 2h à 4h', 'F1C40F', 4),
(12, 3, 'Non, maintien de l’éclairage toute la nuit', 'E74C3C', 4),
-- Consultation 5 (Centre culturel)
(13, 1, 'Dominante musiques actuelles et studios de répétition', 'E67E22', 5),
(14, 2, 'Dominante arts plastiques, expositions et ateliers participatifs', '34495E', 5),
(15, 3, 'Espace polyvalent et coworking associatif', '16A085', 5),
-- Consultation 6 (Collège Hugo)
(16, 1, 'Installation de ralentisseurs et plateau traversant', '2980B9', 6),
(17, 2, 'Mise en sens unique de la rue Victor Hugo', 'D35400', 6),
(18, 3, 'Piétonnisation définitive aux heures d’entrée/sortie', '8E44AD', 6),
-- Consultation 7 (Terrasses)
(19, 1, 'Harmonisation stricte (tonalités beiges et gris foncé)', 'BDC3C7', 7),
(20, 2, 'Charte souple autorisant les couleurs végétales', '2ECC71', 7),
-- Consultation 8 (Nom du parc)
(21, 1, 'Parc Arnaud Beltrame', '34495E', 8),
(22, 2, 'Parc de la Canopée', '27AE60', 8),
(23, 3, 'Parc des Rives du Fleuve', '3498DB', 8);

-- ============================================================================
-- 7. VOTES DES UTILISATEURS (Clé primaire : utilisateur_id, consultation_id)
-- ============================================================================
INSERT INTO vote (date_vote, utilisateur_id, consultation_id, choix_vote_id) VALUES
-- Votes Consultation 1
(1738400000, 4, 1, 1), (1738410000, 5, 1, 1), (1738420000, 6, 1, 2),
(1738430000, 7, 1, 1), (1738440000, 8, 1, 3), (1738450000, 9, 1, 2),
(1738460000, 10, 1, 1), (1738470000, 11, 1, 1), (1738480000, 12, 1, 2),
(1738490000, 13, 1, 1), (1738500000, 14, 1, 3), (1738510000, 15, 1, 1),
(1738520000, 16, 1, 1), (1738530000, 17, 1, 2), (1738540000, 18, 1, 1),
-- Votes Consultation 2
(1740800000, 4, 2, 4), (1740810000, 5, 2, 4), (1740820000, 6, 2, 6),
(1740830000, 7, 2, 5), (1740840000, 8, 2, 4), (1740850000, 10, 2, 6),
(1740860000, 12, 2, 4), (1740870000, 13, 2, 4), (1740880000, 15, 2, 5),
(1740890000, 17, 2, 6), (1740900000, 19, 2, 4), (1740910000, 20, 2, 4),
-- Votes Consultation 3 (Archivée)
(1706800000, 4, 3, 7), (1706810000, 5, 3, 7), (1706820000, 6, 3, 8),
(1706830000, 7, 3, 7), (1706840000, 8, 3, 7), (1706850000, 9, 3, 9),
(1706860000, 11, 3, 7), (1706870000, 14, 3, 7), (1706880000, 18, 3, 8),
-- Votes Consultation 4
(1741550000, 4, 4, 10), (1741560000, 6, 4, 10), (1741570000, 8, 4, 12),
(1741580000, 9, 4, 11), (1741590000, 10, 4, 10), (1741600000, 13, 4, 10),
(1741610000, 14, 4, 12), (1741620000, 16, 4, 11), (1741630000, 19, 4, 10),
-- Votes Consultation 5
(1743100000, 5, 5, 13), (1743110000, 7, 5, 15), (1743120000, 11, 5, 14),
(1743130000, 12, 5, 15), (1743140000, 15, 5, 13), (1743150000, 18, 5, 13),
(1743160000, 20, 5, 15),
-- Votes Consultation 8
(1743600000, 4, 8, 22), (1743610000, 5, 8, 22), (1743620000, 10, 8, 23),
(1743630000, 17, 8, 21), (1743640000, 18, 8, 22);

-- ============================================================================
-- 8. SOUTIENS AUX PROPOSITIONS (Clé primaire : utilisateur_id, proposition_id)
-- ============================================================================
INSERT INTO soutien (date_soutien, utilisateur_id, proposition_id) VALUES
-- Proposition 1 (Composteurs - succès)
(1736050000, 5, 1), (1736060000, 6, 1), (1736070000, 7, 1), (1736080000, 8, 1),
(1736090000, 9, 1), (1736100000, 10, 1), (1736110000, 11, 1), (1736120000, 12, 1),
(1736130000, 13, 1), (1736140000, 14, 1), (1736150000, 15, 1), (1736160000, 16, 1),
-- Proposition 2 (Bus gratuits week-end)
(1736550000, 4, 2), (1736560000, 5, 2), (1736570000, 6, 2), (1736580000, 8, 2),
(1736590000, 10, 2), (1736600000, 11, 2), (1736610000, 17, 2), (1736620000, 19, 2),
(1736630000, 20, 2),
-- Proposition 3 (Parc à chiens)
(1737050000, 4, 3), (1737060000, 12, 3), (1737070000, 14, 3), (1737080000, 18, 3),
-- Proposition 5 (Toitures végétales)
(1738050000, 4, 5), (1738060000, 5, 5), (1738070000, 7, 5), (1738080000, 9, 5),
(1738090000, 13, 5), (1738100000, 15, 5), (1738110000, 17, 5),
-- Proposition 7 (Padel & Basket 3x3)
(1739050000, 4, 7), (1739060000, 6, 7), (1739070000, 10, 7), (1739080000, 12, 7),
(1739090000, 16, 7), (1739100000, 20, 7),
-- Proposition 10 (Fontaines à eau)
(1740550000, 5, 10), (1740560000, 7, 10), (1740570000, 8, 10), (1740580000, 11, 10),
(1740590000, 13, 10), (1740600000, 14, 10), (1740610000, 17, 10), (1740620000, 19, 10),
-- Proposition 11 (Ressourcerie)
(1741050000, 4, 11), (1741060000, 5, 11), (1741070000, 9, 11), (1741080000, 18, 11);

-- ============================================================================
-- 9. COMMENTAIRES
-- ============================================================================
INSERT INTO commentaire (id, contenu, date_commentaire, consultation_id, proposition_id, utilisateur_id) VALUES
-- Commentaires sur Consultation 1
(1, 'Le scénario 1 est indispensable pour lutter contre les fortes chaleurs en été !', 1738415000, 1, NULL, 4),
(2, 'Attention aux commerces de la place, il faut prévoir un accès livraison le matin.', 1738425000, 1, NULL, 6),
(3, 'Entièrement d’accord avec Lucas, les arbres feront un bien fou à ce quartier bétonné.', 1738435000, 1, NULL, 7),
(4, 'Le scénario 2 me semble un bon compromis pour ne pas paralyser le réseau de bus.', 1738455000, 1, NULL, 9),
-- Commentaires sur Consultation 2
(5, 'L’axe Nord-Sud est le plus accidentogène actuellement, il faut prioriser ce tracé.', 1740815000, 2, NULL, 5),
(6, 'Pouvez-vous prévoir des arceaux de stationnement vélo sécurisés près de la gare dans ce plan ?', 1740825000, 2, NULL, 12),
(7, 'Très bonne initiative, mais veillez à la continuité des pistes sur les carrefours !', 1740835000, 2, NULL, 8),
-- Commentaires sur Consultation 4
(8, 'En tant que travailleur en horaires décalés, couper à 1h du matin me pose des problèmes de sécurité.', 1741575000, 4, NULL, 8),
(9, 'La faune nocturne vous remerciera ! Et la facture d’électricité de la commune aussi.', 1741585000, 4, NULL, 13),
-- Commentaires sur Proposition 1
(10, 'J’ai un appartement sans balcon juste en face du parc du centre, ce serait génial pour mes déchets verts !', 1736065000, 5, NULL, 1),
(11, 'Qui s’occupera de l’entretien et du brassage du compost ? Une association ?', 1736075000, 5, NULL, 14),
(12, 'Je suis bénévole à l’association Terre de Charente, nous sommes prêts à former des référents de site !', 1736085000, 5, NULL, 7),
-- Commentaires sur Proposition 2
(13, 'Excellente idée, la ville de Dunkerque le fait déjà tout le temps et ça dynamise le commerce.', 1736565000, NULL, 2, 6),
(14, 'Le coût pour la métropole ne risque-t-il pas d’entraîner une hausse des impôts locaux ?', 1736575000, NULL, 2, 16),
-- Commentaires sur Proposition 3
(15, 'S’il vous plaît, faites-le au Parc de la Bourrelière, il y a de la place au fond.', 1737065000, NULL, 3, 12),
-- Commentaires sur Proposition 7
(16, 'Le padel est en plein essor, ce serait top pour les jeunes et moins jeunes de la commune.', 1739065000, NULL, 7, 6),
(17, 'N’oubliez pas l’éclairage à LED avec minuterie pour pouvoir jouer le soir en automne.', 1739075000, NULL, 7, 10),
-- Commentaires sur Proposition 10
(18, 'C’est une question de santé publique, particulièrement pour les personnes sans-abri et les personnes âgées.', 1740565000, NULL, 10, 7),
-- Commentaires additionnels de débats et modération
(19, 'Franchement cette consultation ne sert à rien, la mairie a déjà pris sa décision !', 1738505000, 1, NULL, 14),
(20, 'Merci de rester constructif David, nous sommes là pour débattre sereinement.', 1738515000, 1, NULL, 1),
(21, 'Pour les terrasses, il faudrait interdire les chauffages extérieurs en hiver qui gaspillent l’énergie.', 1745100000, 7, NULL, 5),
(22, 'Le centre culturel devrait proposer des tarifs réduits pour les demandeurs d’emploi.', 1743125000, 5, NULL, 11),
(23, 'Ce parc devrait porter le nom d’une femme célèbre, il y en a trop peu dans notre ville !', 1743625000, 8, NULL, 17),
(24, 'Totalement d’accord avec Manon ! Pourquoi pas "Parc Joséphine Baker" ou "Parc Gisèle Halimi" ?', 1743635000, 8, NULL, 5),
(25, 'Arrêtez avec le vélo, les automobilistes payent déjà assez de taxes comme ça !!!', 1740845000, 2, NULL, 16);

-- ============================================================================
-- 10. SIGNALEMENTS DE MODÉRATION
-- ============================================================================
INSERT INTO signalement (id, date_signalement, motif, contenu, commentaire_id, proposition_id, utilisateur_id) VALUES
(1, 1738510000, 1, 'Propos diffamatoire envers le processus de concertation et suspicion infondée.', 19, NULL, 4),
(2, 1740850000, 2, 'Commentaire agressif qui relance un conflit stérile entre automobilistes et cyclistes sans apporter d’idée.', 25, NULL, 8),
(3, 1736580000, 3, 'Spam récurrent de cet utilisateur sur plusieurs propositions.', 14, NULL, 5),
(4, 1739080000, 1, 'Publicité déguisée pour un club de sport privé dans le texte du commentaire.', 16, NULL, 2),
(5, 1741580000, 4, 'Hors-sujet total concernant les horaires d’éclairage.', 8, NULL, 10),
(6, 1740600000, 2, 'Langage inapproprié et provocateur dans la discussion.', NULL, 3, 11);

-- ============================================================================
-- 11. MISES À JOUR (Suivi des projets par les auteurs / la mairie)
-- ============================================================================
INSERT INTO mise_a_jour (id, titre, contenu, date_mise_a_jour, utilisateur_id, consultation_id, proposition_id) VALUES
-- Suivi sur Consultation 1
(1, 'Fin de la phase de vote - Dépouillement en cours', 'Merci à tous pour votre forte participation ! Plus de 1500 citoyens ont voté. Les équipes techniques analysent actuellement la faisabilité technique finale du scénario 1, largement plébiscité.', 1746100000, 1, 1, NULL),
(2, 'Présentation des plans architecturaux définitifs', 'Le conseil municipal a validé le Scénario 1 avec intégration de zones de livraison partagées de 6h à 10h du matin pour répondre aux inquiétudes des commerçants.', 1748000000, 1, 1, NULL),
-- Suivi sur Consultation 2
(3, 'Ateliers de concertation par quartier', 'Trois réunions publiques seront organisées en mairie la semaine prochaine pour affiner les tracés des carrefours à points aveugles avec les associations de cyclistes.', 1742000000, 2, 2, NULL),
-- Suivi sur Consultation 3 (Archivée)
(4, 'Livraison des deux premières cours oasis !', 'Les écoles primaire Pasteur et Jules Ferry ont inauguré leurs nouvelles cours sans bitume, plantées d’arbres et équipées de sols perméables.', 1725187200, 1, 3, NULL),
-- Suivi sur Proposition 1 (Composteurs)
(5, 'Seuil de soutiens atteint !', 'Notre proposition a dépassé le seuil des 50 soutiens requis ! Elle va être examinée par la commission technique d’urbanisme le mois prochain.', 1736200000, 4, NULL, 1),
(6, 'Validation du projet par la Ville !', 'Excellente nouvelle : la mairie a validé le budget pour l’installation de 5 premiers composteurs en phase de test dès le mois de septembre.', 1738000000, 1, NULL, 1),
-- Suivi sur Proposition 2 (Bus gratuits)
(7, 'Évaluation financière en cours', 'Les services de la Métropole réalisent actuellement une étude d’impact sur les recettes de la billetterie et le coût d’une augmentation de la fréquence des bus le samedi.', 1737000000, 2, NULL, 2),
-- Suivi sur Proposition 5 (Toitures végétales)
(8, 'Intégration au Plan Climat Communal', 'Suite à vos nombreux soutiens, cette idée a été intégrée comme exigence obligatoire dans la révision de notre Plan Local d’Urbanisme (PLU).', 1740000000, 3, NULL, 5),
-- Suivi sur Proposition 7 (Padel)
(9, 'Visite sur site avec les élus aux sports', 'Une délégation municipale s’est rendue sur l’ancien court de tennis avec l’auteur de la proposition pour évaluer les coûts de terrassement.', 1740500000, 18, NULL, 7),
-- Suivi sur Consultation 5
(10, 'Prolongation de la consultation de deux semaines', 'Afin de permettre aux associations étudiantes de mieux participer après la période des examens, nous prolongeons le dépôt des contributions jusqu’à fin août.', 1754000000, 2, 5, NULL);