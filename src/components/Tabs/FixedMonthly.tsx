import React, { useState } from "react";
import dayjs from "dayjs";
import Card from "../ui/Card/Card";
import { List } from "../shared/List";
import { CustomExpenseModal } from "../modals/CustomExpenseModal";
import { CustomIncomeModal } from "../modals/CustomIncomeModal";
import { Item } from "@/types/shared/item-type";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const FixedMonthly: React.FC = () => {
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [editingExpenseItem, setEditingExpenseItem] = useState<Item | null>(
    null
  );
  const [editingIncomeItem, setEditingIncomeItem] = useState<Item | null>(null);
  const [selectedType, setSelectedType] = useState("despesa");

  const dataRaw = [
    { name: "Comida", value: 1200, percentage: "45%", color: "#0088FE" },
    { name: "Farmácia", value: 450, percentage: "10%", color: "#00C49F" },
    { name: "Esporte", value: 300, percentage: "30%", color: "#FFBB28" },
    { name: "Roupas", value: 250, percentage: "15%", color: "#FF8042" },
    { name: "Comida", value: 1200, percentage: "45%", color: "#0088FE" },
  ];

  const [expenseItems, setExpenseItems] = useState<Item[]>([
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
  ]);

  const [incomeItems, setIncomeItems] = useState<Item[]>([
    {
      id: "3",
      title: "Freelance mês",
      type: "freelance",
      date: dayjs().subtract(6, "day").toISOString(),
      value: "1200,00",
    },
    {
      id: "4",
      title: "Salário mensal",
      type: "claro",
      date: dayjs().subtract(15, "day").toISOString(),
      value: "3000,00",
    },
  ]);

  const handleAddOrUpdateExpense = (item: Item) => {
    setExpenseItems((prevItems) => {
      const index = prevItems.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        const updated = [...prevItems];
        updated[index] = item;
        return updated;
      }
      return [item, ...prevItems];
    });
    setEditingExpenseItem(null);
    setExpenseModalOpen(false);
  };

  const handleAddOrUpdateIncome = (item: Item) => {
    setIncomeItems((prevItems) => {
      const index = prevItems.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        const updated = [...prevItems];
        updated[index] = item;
        return updated;
      }
      return [item, ...prevItems];
    });
    setEditingIncomeItem(null);
    setIncomeModalOpen(false);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenseItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteIncome = (id: string) => {
    setIncomeItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="grid grid-cols-1 gap-4 my-4">
      <Card width="100%">
        <div className="flex flex-col gap-2 m-2 ">
          <h2 className="text-xl font-bold text-gray-800 mt-1">Fixo Mensal</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 text-[18px] items-center">
            <div className="flex flex-col col-span-1">
              <span className="text-gray-600">Despesa Fixa Mensal: </span>
              <span className="font-semibold">R$ 3.500,00</span>
            </div>

            <div className="flex flex-col col-span-1">
              <span className="text-gray-600">Receita Fixa Mensal: </span>
              <span className="font-semibold">R$ 3.500,00</span>
            </div>

            <div className="flex flex-col col-span-1">
              <span className="text-gray-600">Saldo Mensal: </span>
              <span className="font-semibold">R$ 3.500,00</span>
            </div>

            <div className="md:col-span-2 flex flex-col">
              <FormControl size="small" sx={{ width: 120, marginBottom: 1 }}>
                <InputLabel id="type-select-label">Tipo</InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type-select"
                  value={selectedType}
                  label="Tipo"
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <MenuItem value="despesa">Despesa</MenuItem>
                  <MenuItem value="receita">Receita</MenuItem>
                </Select>
              </FormControl>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {dataRaw.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-[17px]"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-700">
                      {item.name} ({item.percentage})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {/* Despesas Fixas */}
        <Card width="100%">
          <List
            title="Despesas Fixas"
            typeName="despesa fixa"
            items={expenseItems}
            hasPeriodFilter={false}
            modalOpen={expenseModalOpen}
            setModalOpen={setExpenseModalOpen}
            editingItem={editingExpenseItem}
            onEditItem={(item) => setEditingExpenseItem(item)}
            onAddItem={handleAddOrUpdateExpense}
            onDeleteItem={handleDeleteExpense} // <-- Adicione aqui
            renderModal={({ open, onClose, onAdd, editingItem }) => (
              <CustomExpenseModal
                open={open}
                onClose={() => {
                  onClose();
                  setEditingExpenseItem(null);
                }}
                onAdd={handleAddOrUpdateExpense}
                editingItem={editingItem}
              />
            )}
          />
        </Card>

        {/* Receitas Fixas */}
        <Card width="100%">
          <List
            title="Receitas Fixas"
            typeName="receita fixa"
            items={incomeItems}
            hasPeriodFilter={false}
            modalOpen={incomeModalOpen}
            setModalOpen={setIncomeModalOpen}
            editingItem={editingIncomeItem}
            onEditItem={(item) => setEditingIncomeItem(item)}
            onAddItem={handleAddOrUpdateIncome}
            onDeleteItem={handleDeleteIncome}
            renderModal={({ open, onClose, onAdd, editingItem }) => (
              <CustomIncomeModal
                open={open}
                onClose={() => {
                  onClose();
                  setEditingIncomeItem(null);
                }}
                onAdd={handleAddOrUpdateIncome}
                editingItem={editingIncomeItem}
              />
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default FixedMonthly;
