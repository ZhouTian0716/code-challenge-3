import { Box, Container, Typography } from "@mui/material";
import logo from "../assets/converter-icon.png";
import  swapIcon from "../assets/converter-swap-icon.png";
import Input from "../components/Input/Input";

const Converter = () => {
  const handleSubmit = () => {
    console.log("Submit");
  }
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap:"1rem",
        alignItems: "center",
        bgcolor: "#F8F9FB",
        width: "400px",
        p: 2,
        borderRadius: "8px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom:"2rem" }}>
        <img src={logo} alt="logo" style={{ width: "80px", height: "80px" }} />
        <Typography sx={{ fontSize: "30px", fontWeight: 700, color: "#012754", textAlign: "center" }}>
          Currency Transfer
        </Typography>
      </Box>
      <Input type="From"/>
      <img src={swapIcon} alt="swapIcon" style={{ width: "30px", height: "30px" }} />
      <Input type="To"/>
      <div className="flex-col gap-1">
        <p><small>Market Rate:</small><span>1.20433</span></p>
        <p><small>Fee:</small><span>699.43 USD</span></p>
      </div>

      <button className="btn-submit" type="button" onClick={handleSubmit}>Submit</button>
    </Container>
  );
};

export default Converter;
