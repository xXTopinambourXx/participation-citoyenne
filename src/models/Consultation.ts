import type { Etiquette } from "./Etiquette.js";

export interface Consultation {
    id_consultation: number;
    titre: string;
    descr: string;
    statut: number;
    budget: number;
    
    /* Ajout pour les participants via l'interface vote */
    nbParticipants: number;

    date_creation: number;
    date_debut: number;
    date_fin: number;
    createur_consultation_id: number;

    /* Ajout des étiquettes */
    etiquettes?: Etiquette[];
}