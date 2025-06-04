"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ExpenseItem } from "./ExpenseItem";
import dayjs from "dayjs";

type ExpenseType = "comida" | "farmacia" | "esporte" | "roupa";
type FilterType = "hoje" | "semana" | "mes";

interface Expense {
  id: string;
  title: string;
  type: ExpenseType;
  date: string;
}

export function ExpensesList() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      title: "Remédio para dor de cabeça",
      type: "farmacia",
      date: dayjs().subtract(1, "day").toISOString(),
    },
    {
      id: "2",
      title: "Almoço com amigos",
      type: "comida",
      date: dayjs().toISOString(),
    },
    {
      id: "3",
      title: "Tênis de corrida",
      type: "esporte",
      date: dayjs().subtract(6, "day").toISOString(),
    },
    {
      id: "4",
      title: "Blusa nova",
      type: "roupa",
      date: dayjs().subtract(15, "day").toISOString(),
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<ExpenseType>("comida");
  const [filter, setFilter] = useState<FilterType>("hoje");

  const handleAddExpense = () => {
    if (!newTitle.trim()) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      type: newType,
      date: dayjs().toISOString(),
    };

    setExpenses((prev) => [newExpense, ...prev]);
    setNewTitle("");
    setNewType("comida");
    setModalOpen(false);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = dayjs(expense.date);
    const today = dayjs();

    if (filter === "hoje") {
      return expenseDate.isSame(today, "day");
    }
    if (filter === "semana") {
      return expenseDate.isAfter(today.subtract(7, "day"));
    }
    return expenseDate.isSame(today, "month");
  });

  return (
    <div className="w-full mx-auto p-2">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800">Minhas Despesas</h2>
          <FormControl size="small">
            <InputLabel id="filter-label">Período</InputLabel>
            <Select
              labelId="filter-label"
              value={filter}
              label="Período"
              onChange={(e) => setFilter(e.target.value as FilterType)}
            >
              <MenuItem value="hoje">Hoje</MenuItem>
              <MenuItem value="semana">Últimos 7 dias</MenuItem>
              <MenuItem value="mes">Este mês</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
        >
          Adicionar despesa
        </Button>
      </div>

      <div className="space-y-3 max-h-full overflow-y-auto p-1">
        {filteredExpenses.length === 0 ? (
          <p className="text-gray-500 text-center">
            Nenhuma despesa nesse período.
          </p>
        ) : (
          filteredExpenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              type={expense.type}
              title={expense.title}
              date={expense.date}
              onDelete={() => handleDeleteExpense(expense.id)}
            />
          ))
        )}
      </div>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Adicionar nova despesa</DialogTitle>
        <DialogContent className="flex flex-col gap-4 mt-2">
          <TextField
            label="Título da despesa"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            fullWidth
            autoFocus
          />

          <FormControl fullWidth>
            <InputLabel id="tipo-label">Tipo</InputLabel>
            <Select
              labelId="tipo-label"
              value={newType}
              label="Tipo"
              onChange={(e) => setNewType(e.target.value as ExpenseType)}
            >
              <MenuItem value="comida">Comida</MenuItem>
              <MenuItem value="farmacia">Farmácia</MenuItem>
              <MenuItem value="esporte">Esporte</MenuItem>
              <MenuItem value="roupa">Roupa</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleAddExpense}>
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
