import { Route, Routes } from "react-router-dom";
import Converter from "./pages/Converter";
import Transactions from "./pages/Transactions";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Converter />} />
        <Route path="/transactions" element={<Transactions />} />
      </Route>
    </Routes>
  );
};

export default App;
