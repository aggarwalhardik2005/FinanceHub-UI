import { format, parseISO } from "date-fns";

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString) => {
  try {
    return format(parseISO(dateString), "MMM dd, yyyy");
  } catch (error) {
    return dateString;
  }
};

export const formatShortDate = (dateString) => {
  try {
    return format(parseISO(dateString), "MMM dd");
  } catch (error) {
    return dateString;
  }
};
