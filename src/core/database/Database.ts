import { readFileSync } from "fs";
import { type ConnectionOptions, createPool, type Pool, type ResultSetHeader, type RowDataPacket } from "mysql2";
import { join } from "path";
import { logInfo } from "../../utils/logger.js";
import { ConfigManager } from "../ConfigManager.js";
import { Transaction } from "./Transaction.js";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type QueryValue = string | number | null | boolean | Date | Buffer | unknown;
export type RowData = Record<string, QueryValue>;

/**
 * Wrapper d'accès à la base de données MySQL participation citoyenne.
 */
export class Database {

    /** Pool de connexions. Undefined tant que non initialisé */
    private static pool: Pool | undefined;

    /**
     * Créé et retourne la pool de connexion à la base de données.
     * @returns Pool de connexion.
     */
    public static async connexion(): Promise<Pool> {
        if (this.pool !== undefined) {
            return this.pool;
        }

        const access: ConnectionOptions = {
            user: ConfigManager.getVarEnv("BDD_USER_NAME"),
            password: ConfigManager.getVarEnv("BDD_PASSWORD"),
            database: ConfigManager.getVarEnv("BDD_NAME"),
            port: Number(ConfigManager.getVarEnv("BDD_PORT")),
            host: ConfigManager.getVarEnv("BDD_HOST")
        };

        // Créer la pool de connexion
        this.pool = createPool(access);

        // Importer le schéma initial si nécessaire
        const bddEstVide = await this.importer();

        return this.pool;
    }

    /**
     * Faire une requête de selection.
     * @template T Le type des lignes retournées.
     * @param sql Requête SQL.
     * @param params paramètres de la requête 
     */
    public static async query<T>(sql: string, params?: QueryValue[]): Promise<T[]> {
        const pool = await this.connexion();
        return new Promise<T[]>((resolve, reject) => {
            pool.query<(RowDataPacket & T)[]>(sql, params, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results as T[]);
                }
            });
        });
    }

    /**
     * Faire une requête de mutation (insert, update, delete, ...).
     * @param sql Requête SQL.
     * @param params paramètres de la requête
     */
    public static async execute(sql: string, params?: unknown[]): Promise<ResultSetHeader> {
        const pool = await this.connexion();
        return new Promise<ResultSetHeader>((resolve, reject) => {
            pool.execute<ResultSetHeader>(sql, params as string[] /* cast obligatoire à cause d'un bug dans la bibliothèque */, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    /**
     * Importer le schéma initial de la base de données, si celle-ci est vide.
     * @return true si l'import a été fait, false si la BDD n'était pas vide.
     */
    private static async importer(): Promise<boolean> {

        const results = await this.query<{ nbTables: number }>("SELECT COUNT(*) as nbTables FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema = ?", [ConfigManager.getVarEnv("BDD_NAME")]);
        if (results[0] && results[0].nbTables === 0) {

            // Fichier sql contenant le schéma de la BDD
            const sqlFilePath = join(__dirname, "..", "..", "..", "config", "schemas", "initial.sql");
            const sqlFile = readFileSync(sqlFilePath, "utf-8");

            await this.executerSQL(sqlFile);

            logInfo("Database", "Tables créées avec succès.");
            return true;
        }

        return false;
    }

    /**
     * Exécuter le contenu d'un fichier SQL.
     * @param sqlContent au format texte, brut
     */
    private static async executerSQL(sqlContent: string): Promise<void> {
        // Exécuter les instructions du script une par une pour éviter le multi statement et problèmes
        const statements = sqlContent
            .split(/;\s*/)
            .map((statement) => statement.trim())
            .filter((statement) => statement.length > 0);

        for (const statement of statements) {
            await this.execute(statement);
        }
    }

    /**
     * Créer une transaction.
     * @return instance de Transaction
     */
    public static async creerTransaction(): Promise<Transaction> {
        const pool = await this.connexion();
        return new Promise<Transaction>((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Transaction(connection));
                }
            });
        });
    }
}