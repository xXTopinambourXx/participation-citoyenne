import { ElementEnCacheBdd } from "../../base/ElementEnCacheBdd.js";

export interface VoteData {
    date_vote: number;
    consultation_id: number;
    choix_vote_id: number;
    utilisateur_id: number;
}

export class Vote extends ElementEnCacheBdd<VoteData> {
    public dateVote: number;
    public consultationId: number;
    public choixVoteId: number;
    public utilisateurId: number;

    constructor(data: VoteData) {
        super();
        this.dateVote = data.date_vote;
        this.consultationId = data.consultation_id;
        this.choixVoteId = data.choix_vote_id;
        this.utilisateurId = data.utilisateur_id;
    }

    toData(): VoteData {
        return {
            date_vote: this.dateVote,
            consultation_id: this.consultationId,
            choix_vote_id: this.choixVoteId,
            utilisateur_id: this.utilisateurId
        };
    }
}