export interface Etiquette {
    id: number; // SMALLINT UNSIGNED en BDD
    nom: string;
    icone: string;
    /**
     * Code couleur au format HEX sans le symbole # (ex: "2ECC71")
     * Correspond au CHAR(6) de la base de données
     */
    couleur: string;
}