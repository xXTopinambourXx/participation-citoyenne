import { Database } from "../../core/database/Database.js";
import { Commentaire, type CommentaireData } from "./Commentaire.js";

export class CommentaireConsultationCache {
    private rankedCommentaires: Commentaire[] = [];

    constructor(private readonly consultationId: number) {}

    /**
     * Calcule le score de classement d'un commentaire.
     * 
     * @param like le nombre de likes du commentaire
     * @param dislike le nombre de dislikes du commentaire
     * @param alpha score d'importance du like (par défaut 1 - linéaire)
     * @param beta score de pénalité du dislike (par défaut 0.5 - racine carré)
     */
    private score(like: number, dislike: number, alpha: number = 1, beta: number = 0.5): number {
        return ((Math.pow(like, alpha) * Math.log(like + dislike + 2)) / (1 + Math.pow(dislike, beta))) - Math.pow(dislike, beta);
    }

    private async rankCommentaires(commentaires: Commentaire[]): Promise<Commentaire[]> {

        // On récupère tout les ids des commentaires
        const listeIdCommentaires = commentaires.map(c => c.id);

        // Pour assigner ensuite les likes et dislikes aux commentaires
        const mapCommentaires = new Map<number, Commentaire>();
        commentaires.forEach(c => {
            const commId = Number(c.id);
            mapCommentaires.set(commId, c);
        });

        const res = new Map<number, {nb_likes: number, nb_dislikes: number}>();

        if(listeIdCommentaires.length > 0){
            const statsCommentaires = await Database.query<{commentaire_id: number, nb_likes: number, nb_dislikes: number}>(
                "SELECT commentaire_id, SUM(aime = 1) as nb_likes, SUM(aime = 0) as nb_dislikes FROM like_commentaire WHERE commentaire_id IN (?) GROUP BY commentaire_id", [listeIdCommentaires]
            );

            for(const stat of statsCommentaires){
                const commId = Number(stat.commentaire_id);
                const likes = Number(stat.nb_likes) || 0;
                const dislikes = Number(stat.nb_dislikes) || 0;

                res.set(commId, { nb_likes: likes, nb_dislikes: dislikes });

                // On associe les likes et dislikes aux commentaires
                const commentaire = mapCommentaires.get(commId);
                if(commentaire){
                    commentaire.nbLikes = likes;
                    commentaire.nbDislikes = dislikes;
                }
            }
        }

        const scores = new Map<number, number>();

        res.forEach((stats, id) => {
            scores.set(id, this.score(stats.nb_likes, stats.nb_dislikes));
        });

        const commentairesTries = commentaires.sort((a, b) => {
            const scoreA = scores.get(a.id) || 0;
            const scoreB = scores.get(b.id) || 0;
            return scoreB - scoreA;
        });

        this.rankedCommentaires = commentairesTries;

        return commentairesTries;
    }

    /* rang du dernier commentaire récupéré trié par nombre de likes. */
    private fetchedUntil = 0;
    private isAllFetched = false;
    private isInitialized = false;

    async fetchMore(count: number): Promise<Commentaire[]> {
        if (this.isAllFetched) return [];

        if(!this.isInitialized){
            // Fetch commentaires de la consultation, instanciation, les rank order by likes LIMIT fetchedUntil + count
            const commentairesData = await Database.query<CommentaireData>("SELECT commentaire.*, utilisateur.prenom as utilisateur_prenom, utilisateur.nom as utilisateur_nom FROM commentaire JOIN utilisateur ON commentaire.utilisateur_id = utilisateur.id WHERE consultation_id = ?", [this.consultationId]);
        
            // Instanciation des commentaires
            const commentaires = commentairesData.map(data => new Commentaire(data));

            // Rank commentaires by score
            this.rankedCommentaires = await this.rankCommentaires(commentaires);
            this.isInitialized = true;
        }

        // On récupère les commentaires triés par score, en prenant en compte le nombre de commentaires déjà récupérés
        const result = this.rankedCommentaires.slice(this.fetchedUntil, this.fetchedUntil + count);

        // On décale le nombre de commentaires qui ont déjà été parcouru
        this.fetchedUntil += count;

        // Si le nombre de commentaires triés est inférieur à count, cela signifie qu'on a récupéré tous les commentaires
        if(result.length < count) this.isAllFetched = true;

        // On renvoie les commentaires triés par score.
        return result;
    }
}