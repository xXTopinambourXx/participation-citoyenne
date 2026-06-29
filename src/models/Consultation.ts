export interface Consultation {
    id_consultation: number;
    titre: string;
    descr: string;
    statut: number;

    date_creation: number;
    date_debut: number;
    date_fin: number;

    createur_consultation_id: number;
}