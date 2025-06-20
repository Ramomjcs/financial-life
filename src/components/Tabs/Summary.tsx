import React, { useState } from "react";
import Card from "../ui/Card/Card";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const Summary: React.FC = () => {
  const [selectedType, setSelectedType] = useState("despesa");

  const dataRaw = [
    { name: "Comida", value: 1200, percentage: "45%", color: "#0088FE" },
    { name: "Farmácia", value: 450, percentage: "10%", color: "#00C49F" },
    { name: "Esporte", value: 300, percentage: "30%", color: "#FFBB28" },
    { name: "Roupas", value: 250, percentage: "15%", color: "#FF8042" },
    { name: "Comida", value: 1200, percentage: "45%", color: "#0088FE" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 my-4">
      <Card width="100%">
        <div className="flex flex-col gap-2 m-2">
          <h2 className="text-xl font-bold text-gray-800 mt-1">Resumo</h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-[18px] items-start">
            
            <div className="grid col-span-1 md:col-span-3 md:grid-cols-3 gap-2">
              <div className="flex flex-col">
                <span className="text-gray-600">Despesa Fixa Mensal:</span>
                <span className="font-semibold">R$ 3.500,00</span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-600">Receita Fixa Mensal:</span>
                <span className="font-semibold">R$ 3.500,00</span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-600">Saldo Mensal:</span>
                <span className="font-semibold">R$ 3.500,00</span>
              </div>
            </div>

            <div className="md:col-span-2 col-span-1 flex flex-col gap-2 md:mt-[-34px]">
              <FormControl size="small" sx={{ width: 120 }}>
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
  
    </div>
  );
};

export default Summary;
