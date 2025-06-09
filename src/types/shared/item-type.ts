export type TypeExpenses = "comida" | "farmacia" | "esporte" | "roupa" | "outros";
export type TypeIncomes = "freelance" | "claro" | "conversion" | "educandus" | "outros";

export interface ItemProps {
  type: TypeExpenses | TypeIncomes;
  title: string;
  date?: string;
  value?: string;
  onDelete: () => void;
  onEdit?: () => void;
}

export interface Item {
  id: string;
  title: string;
  type: TypeExpenses | TypeIncomes;
  date: string;
  value?: string;
}
