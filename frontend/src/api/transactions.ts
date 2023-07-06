import axios from "axios";

export interface ITransaction {
  id: number;
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: number;
  targetAmount: number;
  fee: number;
  createdAt: string;
}

const baseUrl = "http://localhost:3333";
export const getAllTransactions = async () => {
  const { data } = await axios.get<ITransaction[]>(`${baseUrl}/transactions`);
  return data;
};

export const fetchConvertRate = async () => {
  const { data } = await axios.get<ITransaction[]>(`${baseUrl}/transactions`);
  return data;
};


