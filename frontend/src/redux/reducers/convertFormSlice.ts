import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  convertForm: {
    from: "USD",
    to: "EUR",
    srcAmount: 0,
    resAmount: 0,
  },
};

export const convertFormSlice = createSlice({
  name: "convertForm",
  initialState,
  reducers: {
    resetForm: (state) => {
      state.convertForm = initialState.convertForm;
    },
  },
});

// ZT-NOTE: Action creators exports
export const { resetForm } = convertFormSlice.actions;

// ZT-NOTE: Selector funtions exports for multiple react components to use
export const getConvertFormState = (state: RootState) => state.convertForm;

export default convertFormSlice.reducer;
