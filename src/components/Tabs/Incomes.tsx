import React, { useState } from "react";
import dayjs from "dayjs";
import Card from "../ui/Card/Card";
import { List } from "../shared/List";
import { MonthlySummary } from "../shared/MonthlySummary";
import { TotalChart } from "../shared/TotalChart";
import { CustomIncomeModal } from "../modals/CustomIncomeModal";
import { Item } from "@/types/shared/item-type";

const Incomes: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [items, setItems] = useState<Item[]>([
    {
      id: "1",
      title: "Trabalho freelancer",
      type: "freelance",
      date: dayjs().subtract(1, "day").toISOString(),
      value: "24,90",
    },
    {
      id: "2",
      title: "Trabalho B",
      type: "claro",
      date: dayjs().toISOString(),
      value: "52,00",
    },
    {
      id: "3",
      title: "Trabalho C",
      type: "conversion",
      date: dayjs().subtract(6, "day").toISOString(),
      value: "250,00",
    },
    {
      id: "4",
      title: "Trabalho D",
      type: "educandus",
      date: dayjs().subtract(15, "day").toISOString(),
      value: "120,00",
    },
  ]);

  const handleAddOrUpdateItem = (item: Item) => {
    setItems((prevItems) => {
      const index = prevItems.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        const updated = [...prevItems];
        updated[index] = item;
        return updated;
      }
      return [item, ...prevItems];
    });
    setEditingItem(null);
    setModalOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-4">
      <Card width="100%">
        <List
          title="Minhas Receitas"
          typeName="receita"
          items={items}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          editingItem={editingItem}
          onEditItem={setEditingItem}
          onAddItem={handleAddOrUpdateItem}
          onDeleteItem={handleDeleteItem}
          renderModal={({ open, onClose, onAdd, editingItem }) => (
            <CustomIncomeModal
              open={open}
              onClose={() => {
                onClose();
                setEditingItem(null);
              }}
              onAdd={handleAddOrUpdateItem}
              editingItem={editingItem}
            />
          )}
        />
      </Card>

      <div className="grid md:grid-cols-1 grid-cols-1 gap-4">
        <Card width="100%">
          <MonthlySummary />
        </Card>
        <Card width="100%">
          <TotalChart title="Receita" barColor="#2688FE" />
        </Card>
      </div>
    </div>
  );
};

export default Incomes;
