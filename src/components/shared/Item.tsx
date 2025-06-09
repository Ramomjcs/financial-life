"use client";

import {
  Fastfood,
  LocalPharmacy,
  SportsSoccer,
  Checkroom,
  DeleteOutline,
  Edit,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { ItemProps } from "@/types/shared/item-type";

dayjs.locale("pt-br");

const icons = {
  comida: <Fastfood className="text-orange-500" />,
  farmacia: <LocalPharmacy className="text-red-500" />,
  esporte: <SportsSoccer className="text-green-500" />,
  roupa: <Checkroom className="text-blue-500" />,
  outros: <Checkroom className="text-blue-500" />,
  freelance: <Checkroom className="text-blue-500" />,
  claro: <Checkroom className="text-blue-500" />,
  conversion: <Checkroom className="text-blue-500" />,
  educandus: <Checkroom className="text-blue-500" />,
};

export function Item({
  type,
  title,
  date,
  value,
  onDelete,
  onEdit,
}: ItemProps & { onEdit?: () => void }) {
  const formattedDateTime = date
    ? capitalizeFirstLetter(dayjs(date).format("dddd, D [de] MMMM [às] HH:mm"))
    : "";

  function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all w-full">
      <div className="w-8 flex justify-center">{icons[type]}</div>

      <div className="flex flex-col flex-1 px-4">
        <span className="font-medium text-gray-800 leading-5">{title}</span>
        <div className="flex gap-1 text-sm text-gray-500">
          <span className="capitalize">{type}</span>
          <span className="hidden md:flex">
            {formattedDateTime && `· ${formattedDateTime}`}
          </span>
        </div>
      </div>

      <div className="w-28 text-center font-medium text-gray-800">
        {value ? `R$ ${value}` : "—"}
      </div>

      <IconButton
        aria-label="Editar"
        onClick={onEdit}
        className="text-blue-500 hover:text-blue-700"
      >
        <Edit />
      </IconButton>

      <IconButton
        aria-label="Apagar"
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 ml-2"
      >
        <DeleteOutline />
      </IconButton>
    </div>
  );
}
