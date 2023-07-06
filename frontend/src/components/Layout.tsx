import { Link, Outlet } from "react-router-dom";
import { Button, Container } from '@mui/material';

const Layout = () => {
  return (
    <Container sx={{display:"flex", flexDirection:"column", gap:"1rem", alignItems:"center", bgcolor:"#012754", height:"100vh", padding:"2rem"}}>
      <header style={{display:"flex", gap:"1rem"}}>
        <Link to="/"><Button variant="contained">Convert</Button></Link>
        <Link to="/transactions"><Button variant="contained">Records</Button></Link>
      </header>
      <Outlet />
    </Container>
  );
};

export default Layout;
