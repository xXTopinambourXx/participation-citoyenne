export interface Consultation {
  id: number;
  title: string;
  description: string;
  status: "en-cours" | "a-venir" | "termine";
}

export const consultations: Consultation[] = [
  {
    id: 1,
    title: "Consultation sur le plan local d'urbanisme",
    description: "Participez à la consultation sur le plan local d'urbanisme de la ville.",
    status: "en-cours",
  },
  {
    id: 2,
    title: "Consultation sur le budget participatif",
    description: "Exprimez votre avis sur les projets proposés pour le budget participatif.",
    status: "a-venir",
  },
  {
    id: 3,
    title: "Consultation sur la sécurité routière",
    description: "Donnez votre avis sur les mesures de sécurité routière dans la ville.",
    status: "termine",
  },
];