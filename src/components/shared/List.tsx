"use client";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import dayjs from "dayjs";
import { Item as ItemComponent } from "./Item";
import { Item } from "@/types/shared/item-type";
import { ListProps, FilterType } from "@/types/shared/list-type";

export function List({
  items: propsItems = [],
  title,
  typeName,
  renderModal,
  hasPeriodFilter = true,
  modalOpen,
  setModalOpen,
  editingItem,
  onEditItem,
  onAddItem,
  onDeleteItem,
}: ListProps) {
  const [filter, setFilter] = useState<FilterType>("hoje");

  const filteredItems = propsItems.filter((item) => {
    const itemDate = dayjs(item.date);
    const today = dayjs();

    if (filter === "hoje") return itemDate.isSame(today, "day");
    if (filter === "semana") return itemDate.isAfter(today.subtract(7, "day"));
    return itemDate.isSame(today, "month");
  });

  return (
    <div className="w-full mx-auto p-2">
      <div className="w-full flex md:flex-row flex-col md:justify-between items-center mb-4 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          {hasPeriodFilter && (
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
          )}
        </div>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            onEditItem(null);
            setModalOpen(true);
          }}
        >
          Adicionar {typeName?.toLocaleLowerCase()}
        </Button>
      </div>

      <div className="space-y-3 max-h-full overflow-y-auto p-1">
        {filteredItems.length === 0 ? (
          <p className="text-gray-500 text-center">
            Nenhuma {typeName?.toLocaleLowerCase()} nesse período.
          </p>
        ) : (
          filteredItems.map((item) => (
            <ItemComponent
              key={item.id}
              type={item.type}
              title={item.title}
              date={item.date}
              value={item.value}
              onDelete={() => onDeleteItem?.(item.id)}
              onEdit={() => {
                onEditItem(item);
                setModalOpen(true);
              }}
            />
          ))
        )}
      </div>

      {renderModal &&
        renderModal({
          open: modalOpen,
          onClose: () => {
            setModalOpen(false);
            onEditItem(null);
          },
          onAdd: onAddItem!,
          editingItem,
        })}
    </div>
  );
}
