import { ElementEnCacheBdd } from "../base/ElementEnCacheBdd.js";
import { ChoixVote, type ChoixVoteData } from "./ChoixVote.js";
import { CommentaireConsultationCache } from "../commentaires/CommentaireConsultationCache.js";
import { Etiquette, type EtiquetteData } from "../etiquettes/Etiquette.js";

export interface ConsultationData {
    id: number;
    titre: string;
    contenu: string;
    statut: number;
    budget: number | undefined;
    couverture: string | undefined;
    date_creation: number;
    date_debut: number;
    date_fin: number;
    utilisateur_id: number;

    /* Ajout pour les participants via l'interface vote */
    nb_participants: number;
}

export interface ConsultationDataWithChoixEtiquette extends ConsultationData {
    choix: ChoixVoteData[];
    etiquettes: EtiquetteData[];
}

export class Consultation extends ElementEnCacheBdd<ConsultationDataWithChoixEtiquette> {
    public id: number;
    public titre: string;
    public contenu: string;
    public statut: number;
    public budget: number | undefined;
    public couverture: string | undefined;
    public dateCreation: number;
    public dateDebut: number;
    public dateFin: number;
    public utilisateurId: number;

    /* Ajout pour les choix de votes */
    public choix: ChoixVote[] = [];

    public etiquettes: Etiquette[] = [];

    /* Cache des commentaires de la consultation */
    public commentaires: CommentaireConsultationCache;

    get nbParticipants(): number {
        let tot = 0;
        this.choix.forEach(c => {
            tot += c.nbVotes;
        })
        return tot;
    }

    constructor(data: ConsultationData) {
        super();
        this.id = data.id;
        this.titre = data.titre;
        this.contenu = data.contenu;
        this.statut = data.statut;
        this.budget = data.budget;
        this.couverture = data.couverture;
        this.dateCreation = data.date_creation;
        this.dateDebut = data.date_debut;
        this.dateFin = data.date_fin;
        this.utilisateurId = data.utilisateur_id;

        /* Initialisation deu cache */
        this.commentaires = new CommentaireConsultationCache(this.id);
    }

    public async changerStatut(nouveauStatut: number): Promise<void> {
        this.statut = nouveauStatut;
        
    }

    public toData(): ConsultationDataWithChoixEtiquette {
        return {
            id: this.id,
            titre: this.titre,
            contenu: this.contenu,
            statut: this.statut,
            budget: this.budget,
            couverture: this.couverture,
            date_creation: this.dateCreation,
            date_debut: this.dateDebut,
            date_fin: this.dateFin,
            utilisateur_id: this.utilisateurId,
            nb_participants: this.nbParticipants,
            choix: this.choix.map(choix => choix.toData()),
            etiquettes: this.etiquettes.map(etiquette => etiquette.toData())
        };
    }
}