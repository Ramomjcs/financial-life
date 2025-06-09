export type TypeExpenses = "comida" | "farmacia" | "esporte" | "roupa" | "outros";
export type TypeIncomes = "freelance" | "claro" | "conversion" | "educandus" | "outros";
export type TypePaymentWays = "dinheiro" | "cartao" | "pix" | "boleto";

export interface ItemProps {
  type: TypeExpenses | TypeIncomes;
  paymentWay?: TypePaymentWays;
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
  paymentWay?: TypePaymentWays;
  date: string;
  value?: string;
}
