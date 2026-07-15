import { Etiquette } from "./Etiquette.js";
import type { EtiquetteData } from "./Etiquette.js";
import { DatabaseCacheBase } from "../base/DatabaseCacheBase.js";

export class EtiquetteCache extends DatabaseCacheBase<number, Etiquette, EtiquetteData> {
    nomTable = "etiquette";
    colonnesClePrimaire = ["id"];

    constructor() {
        super();
    }

    override async getOrFetch(id: number): Promise<Etiquette | undefined> {
        if (!this.tousRecuperes) {
            await this.getAll();
        }
        
        return super.get(id);
    }

    fromDatabase(data: EtiquetteData): Etiquette {
        return new Etiquette(data);
    }

    getComposanteCache(element: Etiquette): number {
        return element.id;
    }
}