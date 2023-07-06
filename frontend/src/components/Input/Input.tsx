import React, { useState } from "react";
import { currencyOptions } from "../../utils/constants";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface IProps {
  type: "From" | "To";
}

const Input = ({ type }: IProps) => {
  const [currency, setCurrency] = useState<string>("AUD");
  const [amount, setAmount] = useState<number>(0);
  const handleCurrencyChange = (e: SelectChangeEvent<string>) => {
    setCurrency(e.target.value);
  };
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const newAmount = parseFloat(parseFloat(e.target.value).toFixed(2))
    console.log(newAmount);
    setAmount(newAmount);
  };

  return (
    <FormControl sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
      <InputLabel id={`${type}-select-label`}>{type}</InputLabel>
      <Select
        labelId={`${type}-select-label`}
        id={`${type}-select`}
        value={currency}
        label={type}
        onChange={handleCurrencyChange}
        MenuProps={{ PaperProps: { sx: { maxHeight: 100 } } }}
        sx={{ width: "50%", bgcolor: "#fff" }}
      >
        {currencyOptions.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <input className="currency-input" type="number" value={amount} onChange={handleAmountChange} />
    </FormControl>
  );
};

export default Input;
