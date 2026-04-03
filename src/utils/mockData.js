import { subDays, subMonths } from "date-fns";

const CATEGORIES = ["Housing", "Food", "Transport", "Entertainment", "Healthcare", "Shopping", "Utilities"];

const generateRandomAmount = (min, max) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

const generateMockTransactions = () => {
  const transactions = [];
  const now = new Date();

  // Income transactions (Salary & Freelance)
  for (let i = 0; i < 6; i++) {
    transactions.push({
      id: `inc-${i}`,
      date: subMonths(now, i).toISOString(),
      amount: generateRandomAmount(4000, 4500),
      category: "Salary",
      type: "income",
    });
    if (i % 2 === 0) {
      transactions.push({
        id: `inc-free-${i}`,
        date: subDays(now, i * 15).toISOString(),
        amount: generateRandomAmount(300, 800),
        category: "Freelance",
        type: "income",
      });
    }
  }

  // Expense transactions
  for (let i = 0; i < 40; i++) {
    const randomDaysAgo = Math.floor(Math.random() * 180); // within last 180 days
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    let amount;
    
    if (category === "Housing") amount = generateRandomAmount(1200, 1500);
    else if (category === "Healthcare") amount = generateRandomAmount(50, 400);
    else if (category === "Utilities") amount = generateRandomAmount(80, 200);
    else amount = generateRandomAmount(10, 150); // Food, Transport, etc.

    transactions.push({
      id: `exp-${i}`,
      date: subDays(now, randomDaysAgo).toISOString(),
      amount: amount,
      category: category,
      type: "expense",
    });
  }

  // Sort descending by date
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const initialTransactions = generateMockTransactions();
