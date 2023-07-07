import React, { useEffect, useState } from "react";
import { CurrencyOption, currencyOptions } from "../../utils/constants";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getConvertFormState,
  setConvertFee,
  setFromAmount,
  setFromCurrency,
  setToAmount,
  setToCurrency,
} from "../../redux/reducers/convertFormSlice";
import { convertCalculates, invertCalculates } from "../../utils/calculations";

interface IProps {
  type: "From" | "To";
}

const Input = ({ type }: IProps) => {
  const dispatch = useAppDispatch();
  // local state inital value from redux store
  const { convertForm } = useAppSelector(getConvertFormState);
  const { from, srcAmount, to, resAmount, convertRates } = convertForm;
  const inputCurrency = type === "From" ? from : to;
  const inputAmount = type === "From" ? srcAmount : resAmount;

  // local state
  const [currency, setCurrency] = useState<CurrencyOption>(inputCurrency);
  const [amount, setAmount] = useState<number>(inputAmount);

  const handleCurrencyChange = (e: SelectChangeEvent<CurrencyOption>) => {
    const selectedCurrency = e.target.value as CurrencyOption;
    // update redux state AND update local state
    if (type === "From") {
      dispatch(setFromCurrency(selectedCurrency));
    }
    if (type === "To") {
      dispatch(setToCurrency(selectedCurrency));
    }
    setCurrency(selectedCurrency);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(parseFloat(e.target.value).toFixed(2));
    // console.log(newAmount);
    if (!convertRates) return;
    const marketRate = convertRates[to];
    if (type === "From") {
      dispatch(setFromAmount(newAmount));
      const res = convertCalculates(marketRate, newAmount);
      const { targetAmount, fee } = res;
      dispatch(setToAmount(targetAmount));
      dispatch(setConvertFee(fee));
    }
    if (type === "To") {
      dispatch(setToAmount(newAmount));
      const res = invertCalculates(marketRate, newAmount);
      const { sourceAmount, fee } = res;
      dispatch(setFromAmount(sourceAmount));
      dispatch(setConvertFee(fee));
    }
  };

  // useEffect to get the input value subscribed from redux store
  useEffect(() => {
    if (type === "From") {
      setAmount(srcAmount);
    }
    if (type === "To") {
      setAmount(resAmount);
    }
  }, [srcAmount, resAmount, type]);

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
