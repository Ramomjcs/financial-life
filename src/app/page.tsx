"use client";

import Card from "@/components/ui/Card/Card";
import { useState } from "react";
import MenuTabs from "@/components/menu-tabs/MenuTabs";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { AccountBalanceWallet } from "@mui/icons-material";

export default function Home() {
  const [cards, setCards] = useState([
    { title: "Gasto atual (mês)", value: "R$ 1.250,00", bgColor: "#ffffff", hide: false },
    { title: "Sobra atual (mês)", value: "R$ 2.120,00", bgColor: "#ffffff", hide: false },
    { title: "Obrigações total", value: "R$ 4.000,00", bgColor: "#ffffff", hide: false },
    { title: "Patrimônio total", value: "R$ 52.000,00", bgColor: "#ffffff", hide: true },
  ]);

  return (
    <div className=" bg-[#fafafa] h-screen w-screen flex flex-col overflow-hidden">
      <div className="md:grid hidden md:grid-cols-4 grid-cols-1 gap-4 px-4 pt-4">
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

      <div className="overflow-y-auto flex-grow min-h-0 px-4 pb-4">
        <MenuTabs />
      </div>
    </div>
  );
}
