import dotenv from "dotenv";

export class ConfigManager {

    /** Variables d'environnement (.env). Chargées uniquement si présentes (utile hors Docker) */
    private static envConfig = dotenv.config({ 'quiet': true });

    /**
     * Lire une variable d'environnement ou lève une erreur si elle n'est pas définie.
     * Priorité à process.env (Docker), fallback sur dotenv (local)
     * @param nomVar nom de la var
     * @returns
     */
    public static getVarEnv(nomVar: string): string {
        const valeur = process.env[nomVar] || (this.envConfig.parsed ? this.envConfig.parsed[nomVar] : undefined);
        if (valeur === undefined) throw new Error(`La variable d'environnement ${nomVar} doit être définie.`);
        return valeur;
    }

}