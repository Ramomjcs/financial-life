import React, { useState } from "react";
import dayjs from "dayjs";
import Card from "../ui/Card/Card";
import { List } from "../shared/List";
import { MonthlySummary } from "../shared/MonthlySummary";
import { TotalChart } from "../shared/TotalChart";
import { CustomExpenseModal } from "../modals/CustomExpenseModal";
import { Item } from "@/types/shared/item-type";

const Expenses: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [items, setItems] = useState<Item[]>([
    {
      id: "1",
      title: "Remédio para dor de cabeça",
      type: "farmacia",
      date: dayjs().subtract(1, "day").toISOString(),
      value: "24,90",
    },
    {
      id: "2",
      title: "Almoço com amigos",
      type: "comida",
      date: dayjs().toISOString(),
      value: "52,00",
    },
    {
      id: "3",
      title: "Tênis de corrida",
      type: "esporte",
      date: dayjs().subtract(6, "day").toISOString(),
      value: "250,00",
    },
    {
      id: "4",
      title: "Blusa nova",
      type: "roupa",
      date: dayjs().subtract(15, "day").toISOString(),
      value: "120,00",
    },
  ]);

  const handleAddOrUpdateItem = (item: Item) => {
    setItems((prevItems) => {
      const index = prevItems.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[index] = item;
        return updatedItems;
      }
      return [item, ...prevItems];
    });
    setEditingItem(null);
    setModalOpen(false);
  };

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-4">
      <Card width="100%">
        <List
          title="Minhas Despesas"
          typeName="despesa"
          items={items}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          editingItem={editingItem}
          onEditItem={setEditingItem}
          onAddItem={handleAddOrUpdateItem}
          onDeleteItem={(id) =>
            setItems((prev) => prev.filter((item) => item.id !== id))
          }
          renderModal={({ open, onClose, onAdd, editingItem }) => (
            <CustomExpenseModal
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
          <TotalChart title="Despesa" barColor="#2688FE" />
        </Card>
      </div>
    </div>
  );
};

export default Expenses;
