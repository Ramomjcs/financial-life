import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import CurrencyInput from "react-currency-input-field";
import { useState, useEffect } from "react";
import { Item, TypeIncomes } from "@/types/shared/item-type";
import dayjs from "dayjs";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (item: Item) => void;
  editingItem?: Item | null;
}

export function CustomIncomeModal({
  open,
  onClose,
  onAdd,
  editingItem,
}: Props) {
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<TypeIncomes>("freelance");
  const [newValue, setNewValue] = useState<string | undefined>();

  useEffect(() => {
    if (editingItem) {
      setNewTitle(editingItem.title);
      setNewType(editingItem.type as TypeIncomes);
      setNewValue(editingItem.value);
    } else {
      setNewTitle("");
      setNewType("freelance");
      setNewValue(undefined);
    }
  }, [editingItem]);

  const handleClose = () => {
    setNewTitle("");
    setNewType("freelance");
    setNewValue(undefined);
    onClose();
  };

  const handleSave = () => {
    if (!newTitle.trim()) return;

    onAdd({
      id: editingItem?.id ?? Date.now().toString(),
      title: newTitle,
      type: newType,
      value: newValue,
      date: editingItem?.date ?? dayjs().toISOString(),
    });

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {editingItem ? "Editar receita" : "Adicionar nova receita"}
      </DialogTitle>
      <DialogContent className="flex flex-col gap-6 mt-3">
        <TextField
          label="Título"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          fullWidth
        />
        <CurrencyInput
          placeholder="R$ 0,00"
          value={newValue}
          decimalsLimit={2}
          decimalSeparator=","
          groupSeparator="."
          prefix="R$ "
          intlConfig={{ locale: "pt-BR", currency: "BRL" }}
          onValueChange={(v) => setNewValue(v)}
          className="border border-[#C4C4C4] rounded px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FormControl fullWidth>
          <InputLabel id="tipo-label">Tipo</InputLabel>
          <Select
            labelId="tipo-label"
            value={newType}
            onChange={(e) => setNewType(e.target.value as TypeIncomes)}
            label="Tipo"
          >
            <MenuItem value="freelance">Freelance</MenuItem>
            <MenuItem value="claro">Claro</MenuItem>
            <MenuItem value="conversion">Conversion</MenuItem>
            <MenuItem value="educandus">Educandus</MenuItem>
            <MenuItem value="outros">Outros</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>
          {editingItem ? "Salvar" : "Adicionar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
