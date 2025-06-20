"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import dayjs from "dayjs";

type ViewMode = "mensal" | "quinzenal" | "6-meses" | "anual";

interface ItemData {
  label: string;
  value: number;
}

interface TotalChartProps {
  barColor?: string;
  title?: string;
}

function generateMockData(mode: ViewMode): ItemData[] {
  const data: ItemData[] = [];

  if (mode === "anual") {
    for (let i = 11; i >= 0; i--) {
      const month = dayjs().subtract(i, "month").format("MMM");
      data.push({
        label: month,
        value: Math.floor(Math.random() * 2000 + 200),
      });
    }
  }

  if (mode === "6-meses") {
    for (let i = 5; i >= 0; i--) {
      const month = dayjs().subtract(i, "month").format("MMM");
      data.push({
        label: month,
        value: Math.floor(Math.random() * 1500 + 100),
      });
    }
  }

  if (mode === "quinzenal") {
    for (let i = 14; i >= 0; i--) {
      const day = dayjs().subtract(i, "day").format("DD/MM");
      data.push({
        label: day,
        value: Math.floor(Math.random() * 500 + 50),
      });
    }
  }

  if (mode === "mensal") {
    const today = dayjs();
    const daysInMonth = today.daysInMonth();

    for (let i = 1; i <= daysInMonth; i++) {
      data.push({
        label: i.toString(),
        value: Math.floor(Math.random() * 300 + 50),
      });
    }
  }

  return data;
}

export function TotalChart({ barColor = "#4f46e5", title }: TotalChartProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("mensal");
  const data = generateMockData(viewMode);

  return (
    <div className="w-full mx-auto bg-white p-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {title} Total
        </h3>

        <FormControl size="small">
          <InputLabel id="view-mode-label">Visualização</InputLabel>
          <Select
            labelId="view-mode-label"
            value={viewMode}
            label="Visualização"
            onChange={(e) => setViewMode(e.target.value as ViewMode)}
          >
            <MenuItem value="mensal">Mensal (dias)</MenuItem>
            <MenuItem value="quinzenal">Últimos 15 dias</MenuItem>
            <MenuItem value="6-meses">Últimos 6 meses</MenuItem>
            <MenuItem value="anual">Últimos 12 meses</MenuItem>
          </Select>
        </FormControl>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis
            tickFormatter={(v) => `R$ ${v.toLocaleString("pt-BR")}`}
            width={80}
          />
          <Tooltip
            formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, "Total"]}
            labelFormatter={(label) => `${label}`}
          />
          <Bar dataKey="value" fill={barColor} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
