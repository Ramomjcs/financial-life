"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React from "react";
import GoalProgressBar from "./GoalProgressBar";

ChartJS.register(ArcElement, Tooltip, Legend);

const dataRaw = [
  { name: "Comida", value: 1200, color: "#0088FE" },
  { name: "Farmácia", value: 450, color: "#00C49F" },
  { name: "Esporte", value: 300, color: "#FFBB28" },
  { name: "Roupas", value: 250, color: "#FF8042" },
];

export function MonthlySummary() {
  const total = dataRaw.reduce((sum, item) => sum + item.value, 0);

  const chartData = {
    labels: dataRaw.map((item) => item.name),
    datasets: [
      {
        data: dataRaw.map((item) => item.value),
        backgroundColor: dataRaw.map((item) => item.color),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      tooltip: {
        backgroundColor: "#000000",
        bodyColor: "#ffffff",
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            const value = context.parsed;
            const percent = ((value / total) * 100).toFixed(1);
            return `${context.label}: R$ ${value.toLocaleString(
              "pt-BR"
            )} (${percent}%)`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white w-full p-2 rounded-lg">
      <div className="flex">
        <div className="relative w-[200px] h-[200px]">
          <Doughnut data={chartData} options={options} />

          <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none">
            <span className="text-sm text-gray-500">Total (Mês)</span>
            <span className="text-xl font-semibold text-gray-800">
              R$ {total.toLocaleString("pt-BR")}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2 pl-4">
          {dataRaw.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-gray-700">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 md:px-4 w-full">
        <div className="flex flex-col gap-5 w-full">
          <GoalProgressBar
            title="Meta de Economia"
            description="R$2.800,00 de R$3.000,00"
            percentage={84}
            barColor="bg-emerald-500"
            backgroundColor="bg-emerald-100"
            showPercentageInside={true}
          />

          <GoalProgressBar
            title="Limite de Gastos"
            description="R$750,00 de R$1.500,00"
            percentage={52}
            barColor="bg-orange-400"
            backgroundColor="bg-emerald-100"
            showPercentageInside={true}
          />
        </div>
      </div>
    </div>
  );
}
