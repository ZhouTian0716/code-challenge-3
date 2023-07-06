import { useState, useEffect, useRef } from "react";
import { Container, Typography } from "@mui/material";
import { getAllTransactions } from "../api/transactions";
import { ITransaction } from "../api/transactions";
import TransactionsTable from "../components/TransactionsTable";

const TransactionsWithAxios = () => {
  const firstMount = useRef(true);
  const [transactions, setTransactions] = useState<ITransaction[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const data = await getAllTransactions();
      if (!data) throw Error("Transactions not found");
      setTransactions(data);
      setFetchError(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (firstMount.current) {
      fetchTransactions();
    }
    return () => {
      firstMount.current = false;
    };
  }, []);

  return (
    <Container sx={{ height: "600px", width: "800px" }}>
      <Typography sx={{ fontSize: "30px", fontWeight: 700, color:"white", textAlign:"center" }}>Transaction Records</Typography>
      {isLoading && <p>Loading...</p>}
      {fetchError && <p>{fetchError}</p>}
      {transactions && transactions.length === 0 && <p>No records submitted yet.</p>}
      {transactions && transactions.length > 0 && <TransactionsTable rows={transactions} />}
    </Container>
  );
};

export default TransactionsWithAxios;
