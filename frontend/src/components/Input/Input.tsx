import React, { useCallback, useEffect, useState } from "react";
import { CurrencyOption, Rates, currencyOptions } from "../../utils/constants";
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
  const { convertForm } = useAppSelector(getConvertFormState);
  const { from, srcAmount, to, resAmount, convertRates } = convertForm;
  const inputCurrency = inputType === "From" ? from : to;
  const inputAmount = inputType === "From" ? srcAmount : resAmount;

  const [currency, setCurrency] = useState<CurrencyOption>(inputCurrency);
  const [amount, setAmount] = useState<number>(inputAmount);

  const handleCurrencyChange = (e: SelectChangeEvent<CurrencyOption>) => {
    const selectedCurrency = e.target.value as CurrencyOption;
    if (inputType === "From") {
      dispatch(setFromCurrency(selectedCurrency));
    }
    if (inputType === "To") {
      dispatch(setToCurrency(selectedCurrency));
    }
    setCurrency(selectedCurrency);
  };

  const recallConvert = useCallback(
    (targetCurrency: CurrencyOption, sourceAmount: number, convertRates: Rates) => {
      const marketRate = convertRates[targetCurrency];
      const res = convertCalculates(marketRate, sourceAmount);
      const { targetAmount, fee } = res;
      // this triggers the useEffect to update the resAmount
      dispatch(setToAmount(targetAmount));
      dispatch(setConvertFee(fee));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!convertRates) return;
    // ⭐️ We want the convert result listen to changes to [to, convertRates, srcAmount]
    recallConvert(to, srcAmount, convertRates);
  }, [to, convertRates, srcAmount, dispatch, recallConvert]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    // ⭐️ Source amount change
    if (inputType === "From") {
      dispatch(setFromAmount(newAmount));
      setAmount(newAmount);
    }
    // ⭐️ Target amount change
    if (inputType === "To") {
      if (!convertRates) return;
      const marketRate = convertRates[to];
      const res = invertCalculates(marketRate, newAmount);
      const { sourceAmount, fee } = res;
      dispatch(setFromAmount(sourceAmount));
      dispatch(setConvertFee(fee));
      setAmount(newAmount);
    }
  };

  // useEffect to get the input value subscribed from redux store
  useEffect(() => {
    if (inputType === "To") {
      setAmount(resAmount);
    }
    if (inputType === "From") {
      setAmount(srcAmount);
    }
  }, [resAmount, srcAmount, inputType]);

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
