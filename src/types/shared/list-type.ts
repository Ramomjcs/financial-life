import { JSX } from "react";
import { Item } from "./item-type";

export interface ListProps {
  title?: string;
  typeName?: string;
  items?: Item[];
  hasPeriodFilter?: boolean;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  editingItem: Item | null;
  onEditItem: (item: Item | null) => void;
  onAddItem: (item: Item) => void;
  onDeleteItem?: (id: string) => void;
  renderModal?: (props: {
    open: boolean;
    onClose: () => void;
    onAdd: (item: Item) => void;
    editingItem?: Item | null;
  }) => JSX.Element;
}

export type FilterType = "hoje" | "semana" | "mes";
