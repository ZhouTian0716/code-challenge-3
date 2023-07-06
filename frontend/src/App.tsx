import { Route, Routes } from "react-router-dom";
import Converter from "./pages/Converter";
import Layout from "./components/Layout";
import Transactions from "./pages/Transactions";

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
