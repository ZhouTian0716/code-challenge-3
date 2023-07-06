import { Container, Typography } from "@mui/material";
import TransactionsTable from "../components/TransactionsTable";
import { useGetTransactionsQuery } from "../redux/api/convertApiSlice";

const Transactions = () => {
  const { data: transactions = [], isLoading, isSuccess, isError, error } = useGetTransactionsQuery();

  return (
    <Container sx={{ height: "600px", width: "800px" }}>
      <Typography sx={{ fontSize: "30px", fontWeight: 700, color: "white", textAlign: "center" }}>
        Transaction Records
      </Typography>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{JSON.stringify(error)}</p>}
      {isSuccess && transactions.length === 0 && <p>No records submitted yet.</p>}
      {isSuccess && transactions.length > 0 && <TransactionsTable rows={transactions} />}
    </Container>
  );
};

export default Transactions;
