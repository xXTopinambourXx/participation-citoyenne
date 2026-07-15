import { ElementEnCacheBdd } from "../base/ElementEnCacheBdd.js";

export interface CommentaireData {
    id: number;
    contenu: string;
    date_commentaire: number;
    utilisateur_id: number;
    consultation_id: number | null;
    proposition_id: number | null;
}

export class Commentaire extends ElementEnCacheBdd<CommentaireData> {
    public id: number;
    public contenu: string;
    public dateCommentaire: number;
    public utilisateurId: number;
    public consultationId: number | null;
    public propositionId: number | null;

    constructor(data: CommentaireData) {
        super();
        this.id = data.id;
        this.contenu = data.contenu;
        this.dateCommentaire = data.date_commentaire;
        this.utilisateurId = data.utilisateur_id;
        this.consultationId = data.consultation_id;
        this.propositionId = data.proposition_id;
    }
    
    toData() {
        return {
            id: this.id,
            contenu: this.contenu,
            date_commentaire: this.dateCommentaire,
            utilisateur_id: this.utilisateurId,
            consultation_id: this.consultationId,
            proposition_id: this.propositionId
        };
    }
}