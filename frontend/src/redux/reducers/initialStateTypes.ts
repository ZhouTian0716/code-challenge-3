import { CurrencyOption, Rates } from "../../utils/constants";

export interface IConvertFormState {
  convertForm: {
    from: CurrencyOption;
    to: CurrencyOption;
    srcAmount: number;
    resAmount: number;
    convertFee: number;
    convertRates: Rates | null;
  };
}
