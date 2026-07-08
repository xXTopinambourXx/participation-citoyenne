export interface Utilisateur {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    mot_de_passe: string;
    /**
     * Rôle administrateur stocké sous forme de TINYINT
     * 0 = Utilisateur standard
     * 1 = Administrateur
     */
    est_admin: number;
}