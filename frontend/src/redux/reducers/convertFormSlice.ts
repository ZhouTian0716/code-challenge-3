import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IConvertFormState } from "./initialStateTypes";
import { CurrencyOption, Rates } from "../../utils/constants";

const initialState: IConvertFormState = {
  convertForm: {
    from: "AUD",
    to: "AUD",
    srcAmount: 0,
    resAmount: 0,
    convertFee: 0,
    convertRates: null,
  },
};

export const convertFormSlice = createSlice({
  name: "convertForm",
  initialState,
  reducers: {
    resetForm: (state) => {
      state.convertForm = initialState.convertForm;
    },
    setFromCurrency: (state, action: PayloadAction<CurrencyOption>) => {
      state.convertForm.from = action.payload;
    },
    setFromAmount: (state, action: PayloadAction<number>) => {
      state.convertForm.srcAmount = action.payload;
    },
    setToCurrency: (state, action: PayloadAction<CurrencyOption>) => {
      state.convertForm.to = action.payload;
    },
    setToAmount: (state, action: PayloadAction<number>) => {
      state.convertForm.resAmount = action.payload;
    },
    setConvertFee: (state, action: PayloadAction<number>) => {
      state.convertForm.convertFee = action.payload;
    },
    setConvertRates: (state, action: PayloadAction<Rates>) => {
      state.convertForm.convertRates = action.payload;
    },
  },
});

// ZT-NOTE: Action creators exports
export const { resetForm, setFromCurrency, setFromAmount, setToCurrency, setToAmount, setConvertFee, setConvertRates } =
  convertFormSlice.actions;

// ZT-NOTE: Selector funtions exports for multiple react components to use
export const getConvertFormState = (state: RootState) => state.convertForm;

export default convertFormSlice.reducer;
