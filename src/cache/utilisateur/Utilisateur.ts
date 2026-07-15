import { ElementEnCacheBdd } from "../base/ElementEnCacheBdd.js";

export interface UtilisateurData {
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

export class Utilisateur extends ElementEnCacheBdd<UtilisateurData> {
    public id: number;
    public nom: string;
    public prenom: string;
    public email: string;
    public motDePasse: string;
    public estAdmin: number;

    constructor(data: UtilisateurData) {
        super();
        this.id = data.id;
        this.nom = data.nom;
        this.prenom = data.prenom;
        this.email = data.email;
        this.motDePasse = data.mot_de_passe;
        this.estAdmin = data.est_admin;
    }

    toData(): UtilisateurData {
        return {
            id: this.id,
            nom: this.nom,
            prenom: this.prenom,
            email: this.email,
            mot_de_passe: this.motDePasse,
            est_admin: this.estAdmin
        };
    }
}