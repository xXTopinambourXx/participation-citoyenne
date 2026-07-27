import { Database } from "../../core/database/Database.js";
import { Commentaire, type CommentaireData } from "./Commentaire.js";

export class CommentaireConsultationCache {
    private rankedCommentaires: Commentaire[] = [];
    private fetchedUntil = 0;
    private isAllFetched = false;

    constructor(private readonly consultationId: number) {}

    /**
     * Permet de récupérer les n commentaires d'une consultation, triés par score (likes - dislikes) et paginés.
     * @param count le nombre de commentaires à récupérer
     * @returns true si des commentaires ont été récupérés, false si tous les commentaires ont déjà été récupérés
     */
    async fetchMore(count: number): Promise<boolean> {
        if (this.isAllFetched) return false;

        const a = 1.5;

        const commentairesData = await Database.query<CommentaireData>(
            "SELECT c.*, u.prenom AS utilisateur_prenom, u.nom AS utilisateur_nom, (SIGN(c.nb_likes - c.nb_dislikes) * (? * LOG(ABS(c.nb_likes - c.nb_dislikes) + 1))) AS score FROM commentaire c JOIN utilisateur u ON c.utilisateur_id = u.id WHERE c.consultation_id = ? ORDER BY score DESC LIMIT ? OFFSET ?",
            [a, this.consultationId, count, this.fetchedUntil]
        );

        // On instancie les commentaires récupérés et on les ajoute à la liste des commentaires classés
        const result = commentairesData.map(data => new Commentaire(data));
        this.rankedCommentaires.push(...result);

        // Avancement du curseur de pagination
        this.fetchedUntil += result.length;

        // Si le serveur renvoie moins d'éléments que demandé, cela signifie qu'il n'y a plus de commentaires à récupérer
        if (result.length < count) {
            this.isAllFetched = true;
        }

        return true;
    }
}