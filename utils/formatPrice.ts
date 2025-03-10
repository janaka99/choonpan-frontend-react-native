export const formatNumber = (num: number | null) => {
  try {
    if (!num || isNaN(num)) return "0.00";

    return Number(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } catch (error) {
    return "0.00";
  }
};
