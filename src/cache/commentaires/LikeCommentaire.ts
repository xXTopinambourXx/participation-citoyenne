import { ElementEnCacheBdd } from "../base/ElementEnCacheBdd.js";

export interface LikeCommentaireData {
    utilisateur_id: number;
    commentaire_id: number;

    /* 0: aime, 1: aime pas */
    aime : number;
}

export class LikeCommentaire extends ElementEnCacheBdd<LikeCommentaireData> {
    public utilisateurId: number;
    public commentaireId: number;
    public aime: number;

    constructor(data: LikeCommentaireData) {
        super();
        this.utilisateurId = data.utilisateur_id;
        this.commentaireId = data.commentaire_id;
        this.aime = data.aime;
    }
    
    toData() {
        return {
            utilisateur_id: this.utilisateurId,
            commentaire_id: this.commentaireId,
            aime: this.aime
        };
    }
}