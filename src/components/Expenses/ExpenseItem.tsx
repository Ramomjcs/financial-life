"use client";

import {
  Fastfood,
  LocalPharmacy,
  SportsSoccer,
  Checkroom,
  DeleteOutline,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

type ExpenseType = "comida" | "farmacia" | "esporte" | "roupa";

const expenseIcons = {
  comida: <Fastfood className="text-orange-500" />,
  farmacia: <LocalPharmacy className="text-red-500" />,
  esporte: <SportsSoccer className="text-green-500" />,
  roupa: <Checkroom className="text-blue-500" />,
};

interface ExpenseItemProps {
  type: ExpenseType;
  title: string;
  date?: string;
  onDelete: () => void;
}

export function ExpenseItem({ type, title, date, onDelete }: ExpenseItemProps) {
  const formattedDateTime = date
    ? capitalizeFirstLetter(dayjs(date).format("dddd, D [de] MMMM [às] HH:mm"))
    : "";

  function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all w-full">
      <div className="w-8 flex justify-center">{expenseIcons[type]}</div>

      <div className="flex flex-col flex-1 px-4">
        <span className="font-medium text-gray-800">{title}</span>
        <span className="text-sm text-gray-500">
          <span className="capitalize">{type}</span>
          {formattedDateTime && ` · ${formattedDateTime}`}
        </span>
      </div>

      <div className="w-28 text-center font-medium text-gray-800">
        R$ 100,00
      </div>

      <IconButton
        aria-label="Apagar despesa"
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 ml-2"
      >
        <DeleteOutline />
      </IconButton>
    </div>
  );
}
