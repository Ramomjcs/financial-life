"use client";

import Card from "@/components/UI/Card/Card";
import { useState } from "react";
import MenuTabs from "@/components/MenuTabs/MenuTabs";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import { AccountBalanceWallet } from "@mui/icons-material";

export default function Home() {
  const [cards, setCards] = useState([
    { title: "Gasto atual (mês)", value: "R$ 1.250,00", bgColor: "#ffffff", hide: false },
    { title: "Sobra atual (mês)", value: "R$ 2.120,00", bgColor: "#ffffff", hide: false },
    { title: "Obrigações total", value: "R$ 4.000,00", bgColor: "#ffffff", hide: false },
    { title: "Patrimônio total", value: "R$ 52.000,00", bgColor: "#ffffff", hide: true },
  ]);

  return (
    <div className="p-4 bg-[#fafafa] w-full h-screen flex flex-col overflow-hidden">
      <div className="md:grid hidden md:grid-cols-4 grid-cols-1 gap-4 mb-2">
        {cards.map((card, index) => (
          <DashboardCard
            icon={<AccountBalanceWallet />}
            title={card.title}
            value={card.value}
            backgroundColor="white"
            hide={card.hide}
          />
        ))}
      </div>

      <div className="flex-1">
        <MenuTabs />
      </div>
    </div>
  );
}
