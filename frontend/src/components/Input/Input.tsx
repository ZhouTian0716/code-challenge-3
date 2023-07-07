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
  inputType: "From" | "To";
}

const Input = ({ inputType }: IProps) => {

  const dispatch = useAppDispatch();
  // local state inital value from redux store
  const { convertForm } = useAppSelector(getConvertFormState);
  const { from, srcAmount, to, resAmount, convertRates } = convertForm;
  const inputCurrency = inputType === "From" ? from : to;
  const inputAmount = inputType === "From" ? srcAmount : resAmount;

  // Input values local state for display
  const [currency, setCurrency] = useState<CurrencyOption>(inputCurrency);
  const [amount, setAmount] = useState<number>(inputAmount);

  // ZT-NOTE: This function is triggering convert or invert calculations
  const handleCurrencyChange = (e: SelectChangeEvent<CurrencyOption>) => {
    const selectedCurrency = e.target.value as CurrencyOption;
    // update redux state AND update local state
    if (inputType === "From") {
      dispatch(setFromCurrency(selectedCurrency));
    }
    if (inputType === "To") {
      dispatch(setToCurrency(selectedCurrency));
    }
    setCurrency(selectedCurrency);
  };

  // ZT-NOTE: This function is triggering convert or invert calculations
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(parseFloat(e.target.value).toFixed(2));
    if (!convertRates) {
      console.log("convertRates is not ready");
      return;
    }
    const marketRate = convertRates[to];
    if (inputType === "From") {
      dispatch(setFromAmount(newAmount));
      const res = convertCalculates(marketRate, newAmount);
      const { targetAmount, fee } = res;
      dispatch(setToAmount(targetAmount));
      dispatch(setConvertFee(fee));
    }
    if (inputType === "To") {
      dispatch(setToAmount(newAmount));
      const res = invertCalculates(marketRate, newAmount);
      const { sourceAmount, fee } = res;
      dispatch(setFromAmount(sourceAmount));
      dispatch(setConvertFee(fee));
    }
  };

  // useEffect to get the input value subscribed from redux store
  useEffect(() => {
    if (inputType === "From") {
      setAmount(srcAmount);
    }
    if (inputType === "To") {
      setAmount(resAmount);
    }
  }, [srcAmount, resAmount,inputType]);

  return (
    <FormControl sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
      <InputLabel id={`${inputType}-select-label`}>{inputType}</InputLabel>
      <Select
        labelId={`${inputType}-select-label`}
        id={`${inputType}-select`}
        value={currency}
        label={inputType}
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
