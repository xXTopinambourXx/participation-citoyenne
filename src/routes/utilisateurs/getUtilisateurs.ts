import { utilisateurCache } from "../../cache/utilisateur/UtilisateurCache.js";

export async function getUtilisateurs() {
    const utilisateurs = await utilisateurCache.getAll();

    if (utilisateurs === undefined) {
        throw new Error("La liste des utilisateurs n'a pas pu être renvoyées.");
    }

    return utilisateurs;
}