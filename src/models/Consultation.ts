import type { Etiquette } from "./Etiquette.js";

export interface Consultation {
    id: number;
    titre: string;
    contenu: string;
    statut: number;
    budget?: number;
    couverture?: string;
    date_creation: number;
    date_debut: number;
    date_fin: number;
    utilisateur_id: number;

    /* Ajout pour les participants via l'interface vote */
    nbParticipants: number;

    /* Ajout des étiquettes */
    etiquettes?: Etiquette[];
}