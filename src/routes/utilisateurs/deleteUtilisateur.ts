import { utilisateurCache } from "../../cache/utilisateur/UtilisateurCache.js";

export async function deleteUtilisateur(id: string): Promise<{ success: boolean }> {
    const idUtilisateur = parseInt(id);

    if (isNaN(idUtilisateur)) {
        throw new Error("L'identifiant de l'utilisateur est invalide.");
    }

    try {
        await utilisateurCache.delete(idUtilisateur);
        return { success: true };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Erreur lors de la suppression de l'utilisateur :", message);
        throw new Error("Erreur interne lors de la suppression de l'utilisateur.");
    }
}