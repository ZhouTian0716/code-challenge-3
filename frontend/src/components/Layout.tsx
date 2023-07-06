import { Link, Outlet } from "react-router-dom";
import {Container} from "@mui/material"

const Layout = () => {
  return (
    <Container>
      <header>
        <Link to="/">home</Link>
        <Link to="/transactions">transactions</Link>
      </header>
      <Outlet />
    </Container>
  );
};

export default Layout;
