import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import logo from "../assets/converter-icon.png";
import swapIcon from "../assets/converter-swap-icon.png";
import Input from "../components/Input/Input";
import { CurrencyOption } from "../utils/constants";
import { useGetConvertRatesQuery } from "../redux/api/convertApiSlice";

const Converter = () => {
  const [selectedSrc, setSelectedSrc] = useState<CurrencyOption>("AUD");
  const [srcAmount, setSrcAmount] = useState(0);
  const [selectedTarget, setSelectedTarget] = useState<CurrencyOption>("AUD");
  const [targetAmount, setTargetAmount] = useState(0);
  const [convertFee, setConvertFee] = useState(0);
  const { data: rates, isLoading, isSuccess, isError, error } = useGetConvertRatesQuery(selectedSrc);

  const convertCalculates = (marketRate: number, sourceAmount: number) => {
    const markupRate = 0.01;
    const convertedAmount = sourceAmount * marketRate;
    const targetAmount = convertedAmount / (1 + markupRate);
    const fee = convertedAmount - targetAmount;
    return {
      targetAmount: parseFloat(targetAmount.toFixed(2)),
      fee: parseFloat(fee.toFixed(2)),
    };
  };

  useEffect(() => {
    if (!rates) return;
    const marketRate = rates[selectedTarget];
    const res = convertCalculates(marketRate, srcAmount);
    console.log("cal res", res);
    setTargetAmount(res.targetAmount);
    setConvertFee(res.fee);
  }, [rates, srcAmount, selectedTarget]);

  // calculates
  const handleSubmit = () => {
    console.log("rates", rates);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        bgcolor: "#F8F9FB",
        width: "400px",
        p: 2,
        borderRadius: "8px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: "2rem" }}>
        <img src={logo} alt="logo" style={{ width: "80px", height: "80px" }} />
        <Typography sx={{ fontSize: "30px", fontWeight: 700, color: "#012754", textAlign: "center" }}>
          Currency Transfer
        </Typography>
      </Box>
      <Input type="From" setParentCurrency={setSelectedSrc} setParentAmount={setSrcAmount} parentAmount = {srcAmount}/>
      <img src={swapIcon} alt="swapIcon" style={{ width: "30px", height: "30px" }} />
      <Input type="To" setParentCurrency={setSelectedTarget} setParentAmount={setTargetAmount} parentAmount = {targetAmount}/>
      <div className="flex-col gap-1">
        <p>
          <small>Market Rate:</small>
          {isError && <span>{JSON.stringify(error)}</span>}
          {isLoading && <span>Loading</span>}
          {isSuccess && <span>{rates[selectedTarget].toFixed(5)}</span>}
        </p>
        <p>
          <small>Fee:</small>
          <span>
            {convertFee} {selectedTarget}
          </span>
        </p>
      </div>

      <button className="btn-submit" type="button" onClick={handleSubmit}>
        Submit
      </button>
    </Container>
  );
};

export default Converter;
