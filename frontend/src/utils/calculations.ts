// Feature 1: Convert source amount to target amount
export const convertCalculates = (marketRate: number, sourceAmount: number) => {
  const FX_Rate = 0.01;
  const convertedAmount = sourceAmount * marketRate;
  const targetAmount = convertedAmount / (1 + FX_Rate);
  const fee = convertedAmount - targetAmount;
  return {
    targetAmount: parseFloat(targetAmount.toFixed(2)),
    fee: parseFloat(fee.toFixed(2)),
  };
};

// Feature 2: Invert target amount to source amount
export const invertCalculates = (marketRate: number, targetAmount: number) => {
  const FX_Rate = 0.01;
  const invertedAmount = targetAmount / marketRate;
  const fee = invertedAmount * FX_Rate;
  const sourceAmount = invertedAmount + fee;
  return {
    sourceAmount: parseFloat(sourceAmount.toFixed(2)),
    fee: parseFloat(fee.toFixed(2)),
  };
};
