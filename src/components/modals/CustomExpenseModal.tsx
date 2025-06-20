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
import { Item, TypeExpenses, TypePaymentWays } from "@/types/shared/item-type";
import dayjs from "dayjs";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (item: Item) => void;
  editingItem?: Item | null;
}

export function CustomExpenseModal({
  open,
  onClose,
  onAdd,
  editingItem,
}: Props) {
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<TypeExpenses>("comida");
  const [newPaymentWay, setNewPaymentWay] = useState<TypePaymentWays>("pix");
  const [newValue, setNewValue] = useState<string | undefined>();
  const [newDate, setNewDate] = useState<string>(
    dayjs().format("YYYY-MM-DDTHH:mm")
  );

  useEffect(() => {
    if (editingItem) {
      setNewTitle(editingItem.title);
      setNewType(editingItem.type as TypeExpenses);
      setNewPaymentWay(editingItem.paymentWay as TypePaymentWays);
      setNewValue(editingItem.value);
      setNewDate(dayjs(editingItem.date).format("YYYY-MM-DDTHH:mm"));
    } else {
      setNewTitle("");
      setNewType("comida");
      setNewPaymentWay("pix");
      setNewValue(undefined);
      setNewDate(dayjs().format("YYYY-MM-DDTHH:mm"));
    }
  }, [editingItem]);

  const handleClose = () => {
    setNewTitle("");
    setNewType("comida");
    setNewPaymentWay("pix");
    setNewValue(undefined);
    setNewDate(dayjs().format("YYYY-MM-DDTHH:mm"));
    onClose();
  };

  const handleSave = () => {
    if (!newTitle.trim()) return;

    onAdd({
      id: editingItem?.id ?? Date.now().toString(),
      title: newTitle,
      type: newType,
      paymentWay: newPaymentWay,
      value: newValue,
      date: dayjs(newDate).toISOString(),
    });

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {editingItem ? "Editar despesa" : "Adicionar nova despesa"}
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
            onChange={(e) => setNewType(e.target.value as TypeExpenses)}
            label="Tipo"
          >
            <MenuItem value="comida">Comida</MenuItem>
            <MenuItem value="farmacia">Farmácia</MenuItem>
            <MenuItem value="esporte">Esporte</MenuItem>
            <MenuItem value="roupa">Roupa</MenuItem>
            <MenuItem value="outros">Outros</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="forma-pagamento">Forma de Pagamento</InputLabel>
          <Select
            labelId="forma-pagamento"
            value={newPaymentWay}
            onChange={(e) =>
              setNewPaymentWay(e.target.value as TypePaymentWays)
            }
            label="Forma de Pagamento"
          >
            <MenuItem value="pix">PIX</MenuItem>
            <MenuItem value="cc_nubank_ramom">Cartão Nubank - José</MenuItem>
            <MenuItem value="cc_nubank_maria">Cartão Nubank - Maria</MenuItem>
            <MenuItem value="flash_maria">Cartão Flash - Maria</MenuItem>
            <MenuItem value="flash_josé">Cartão Flash - José</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Data"
          type="datetime-local"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          fullWidth
        />
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
