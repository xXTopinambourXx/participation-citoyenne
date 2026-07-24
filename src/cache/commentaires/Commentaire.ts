import { ElementEnCacheBdd } from "../base/ElementEnCacheBdd.js";

export interface CommentaireData {
    id: number;
    contenu: string;
    date_commentaire: number;
    utilisateur_id: number;
    consultation_id: number | null;
    proposition_id: number | null;

    nb_likes?: number;
    nb_dislikes?: number;

    utilisateur_prenom: string;
    utilisateur_nom: string;
}

export class Commentaire extends ElementEnCacheBdd<CommentaireData> {
    public id: number;
    public contenu: string;
    public dateCommentaire: number;
    public utilisateurId: number;
    public consultationId: number | null;
    public propositionId: number | null;

    public nbLikes: number;
    public nbDislikes: number;

    public utilisateurPrenom: string;
    public utilisateurNom: string;

    constructor(data: CommentaireData) {
        super();
        this.id = data.id;
        this.contenu = data.contenu;
        this.dateCommentaire = data.date_commentaire;
        this.utilisateurId = data.utilisateur_id;
        this.consultationId = data.consultation_id;
        this.propositionId = data.proposition_id;

        this.nbLikes = data.nb_likes ?? 0;
        this.nbDislikes = data.nb_dislikes ?? 0;

        this.utilisateurPrenom = data.utilisateur_prenom;
        this.utilisateurNom = data.utilisateur_nom;
    }
    
    toData(): CommentaireData {
        return {
            id: this.id,
            contenu: this.contenu,
            date_commentaire: this.dateCommentaire,
            utilisateur_id: this.utilisateurId,
            consultation_id: this.consultationId,
            proposition_id: this.propositionId,

            nb_likes: this.nbLikes,
            nb_dislikes: this.nbDislikes,

            utilisateur_prenom: this.utilisateurPrenom,
            utilisateur_nom: this.utilisateurNom 
        };
    }
}