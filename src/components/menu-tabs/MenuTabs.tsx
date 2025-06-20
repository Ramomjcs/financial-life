import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Expenses from "../tabs/Expenses";
import Incomes from "../tabs/Incomes";
import FixedMonthly from "../tabs/FixedMonthly";
import Summary from "../tabs/Summary";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className="flex-grow min-h-0 overflow-hidden"
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }} className="h-full">
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MenuTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }} className="h-full">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab label="Despesas" {...a11yProps(0)} />
          <Tab label="Receitas" {...a11yProps(1)} />
          <Tab label="Fixo Mensal" {...a11yProps(2)} />
          <Tab label="Resumo" {...a11yProps(3)} />
          <Tab label="Parcelados" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <div className="flex-grow min-h-0 flex flex-col overflow-auto">
        <CustomTabPanel value={value} index={0}>
          <Expenses />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Incomes />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <FixedMonthly />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Summary />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          Parcelados
        </CustomTabPanel>
      </div>
    </Box>
  );
}
