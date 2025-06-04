import React from "react";
import Card from "../UI/Card/Card";
import { ExpensesList } from "../Expenses/ExpensesList";
import { TotalExpenseChart } from "../Expenses/TotalExpenseChart";
import { MonthlyExpenseSummary } from "../Expenses/MonthlyExpenseSummary";

const Expenses: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
      <Card width="100%" height="100%">
        <ExpensesList />
      </Card>
      <div className="grid md:grid-cols-1 grid-cols-1 gap-4">
        <Card width="100%" height="100%">
          <MonthlyExpenseSummary />
        </Card>
        <Card width="100%" height="100%">
          <TotalExpenseChart barColor="#2688FE" />
        </Card>
      </div>
    </div>
  );
};

export default Expenses;
