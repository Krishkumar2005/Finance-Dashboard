export type TransactionCategory =
  | "Food & Dining"
  | "Shopping"
  | "Transport"
  | "Housing"
  | "Entertainment"
  | "Healthcare"
  | "Education"
  | "Salary"
  | "Freelance"
  | "Investment"
  | "Utilities"
  | "Travel";

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: TransactionCategory;
  type: TransactionType;
  amount: number;
  merchant?: string;
}

export const TRANSACTIONS: Transaction[] = [
  { id: "t1", date: "2024-03-01", description: "Monthly Salary", category: "Salary", type: "income", amount: 5800, merchant: "Zorvyn Corp" },
  { id: "t2", date: "2024-03-02", description: "Grocery Shopping", category: "Food & Dining", type: "expense", amount: 134.5, merchant: "Whole Foods" },
  { id: "t3", date: "2024-03-03", description: "Uber Ride", category: "Transport", type: "expense", amount: 18.75, merchant: "Uber" },
  { id: "t4", date: "2024-03-04", description: "Netflix Subscription", category: "Entertainment", type: "expense", amount: 15.99, merchant: "Netflix" },
  { id: "t5", date: "2024-03-05", description: "Freelance Project", category: "Freelance", type: "income", amount: 1200, merchant: "Client A" },
  { id: "t6", date: "2024-03-06", description: "Electricity Bill", category: "Utilities", type: "expense", amount: 89.0, merchant: "City Power" },
  { id: "t7", date: "2024-03-07", description: "Restaurant Dinner", category: "Food & Dining", type: "expense", amount: 67.3, merchant: "The Grill House" },
  { id: "t8", date: "2024-03-08", description: "Amazon Purchase", category: "Shopping", type: "expense", amount: 213.4, merchant: "Amazon" },
  { id: "t9", date: "2024-03-09", description: "Doctor Visit", category: "Healthcare", type: "expense", amount: 120.0, merchant: "City Clinic" },
  { id: "t10", date: "2024-03-10", description: "Online Course", category: "Education", type: "expense", amount: 49.0, merchant: "Udemy" },
  { id: "t11", date: "2024-03-11", description: "Dividend Income", category: "Investment", type: "income", amount: 340.0, merchant: "Brokerage" },
  { id: "t12", date: "2024-03-12", description: "Rent Payment", category: "Housing", type: "expense", amount: 1450.0, merchant: "Landlord" },
  { id: "t13", date: "2024-03-13", description: "Coffee & Snacks", category: "Food & Dining", type: "expense", amount: 23.4, merchant: "Starbucks" },
  { id: "t14", date: "2024-03-14", description: "Gym Membership", category: "Healthcare", type: "expense", amount: 45.0, merchant: "FitLife" },
  { id: "t15", date: "2024-03-15", description: "Flight Tickets", category: "Travel", type: "expense", amount: 380.0, merchant: "Emirates" },
  { id: "t16", date: "2024-03-17", description: "Spotify", category: "Entertainment", type: "expense", amount: 9.99, merchant: "Spotify" },
  { id: "t17", date: "2024-03-18", description: "Freelance Bonus", category: "Freelance", type: "income", amount: 500.0, merchant: "Client B" },
  { id: "t18", date: "2024-03-19", description: "Internet Bill", category: "Utilities", type: "expense", amount: 60.0, merchant: "ISP" },
  { id: "t19", date: "2024-03-20", description: "Clothing Purchase", category: "Shopping", type: "expense", amount: 178.0, merchant: "Zara" },
  { id: "t20", date: "2024-03-22", description: "Movie Tickets", category: "Entertainment", type: "expense", amount: 34.0, merchant: "Cinema" },
  { id: "t21", date: "2024-02-01", description: "Monthly Salary", category: "Salary", type: "income", amount: 5800, merchant: "Zorvyn Corp" },
  { id: "t22", date: "2024-02-04", description: "Grocery Shopping", category: "Food & Dining", type: "expense", amount: 112.0, merchant: "Trader Joe's" },
  { id: "t23", date: "2024-02-08", description: "Rent Payment", category: "Housing", type: "expense", amount: 1450.0, merchant: "Landlord" },
  { id: "t24", date: "2024-02-12", description: "Freelance Project", category: "Freelance", type: "income", amount: 900.0, merchant: "Client C" },
  { id: "t25", date: "2024-02-15", description: "Shopping Spree", category: "Shopping", type: "expense", amount: 290.0, merchant: "Mall" },
  { id: "t26", date: "2024-02-18", description: "Gas Bill", category: "Utilities", type: "expense", amount: 55.0, merchant: "Gas Co" },
  { id: "t27", date: "2024-02-20", description: "Restaurant Lunch", category: "Food & Dining", type: "expense", amount: 45.0, merchant: "Bistro" },
  { id: "t28", date: "2024-02-24", description: "Dividend Income", category: "Investment", type: "income", amount: 280.0, merchant: "Brokerage" },
  { id: "t29", date: "2024-01-01", description: "Monthly Salary", category: "Salary", type: "income", amount: 5800, merchant: "Zorvyn Corp" },
  { id: "t30", date: "2024-01-05", description: "Grocery Shopping", category: "Food & Dining", type: "expense", amount: 98.0, merchant: "Whole Foods" },
  { id: "t31", date: "2024-01-08", description: "Rent Payment", category: "Housing", type: "expense", amount: 1450.0, merchant: "Landlord" },
  { id: "t32", date: "2024-01-12", description: "New Year Shopping", category: "Shopping", type: "expense", amount: 320.0, merchant: "Amazon" },
  { id: "t33", date: "2024-01-18", description: "Freelance Project", category: "Freelance", type: "income", amount: 750.0, merchant: "Client D" },
  { id: "t34", date: "2024-01-22", description: "Healthcare Visit", category: "Healthcare", type: "expense", amount: 85.0, merchant: "Clinic" },
  { id: "t35", date: "2024-01-28", description: "Travel Booking", category: "Travel", type: "expense", amount: 420.0, merchant: "Booking.com" },
];

export const MONTHLY_TREND = [
  { month: "Oct", income: 6200, expenses: 3800, balance: 2400 },
  { month: "Nov", income: 6500, expenses: 4200, balance: 2300 },
  { month: "Dec", income: 7800, expenses: 5100, balance: 2700 },
  { month: "Jan", income: 7350, expenses: 3780, balance: 3570 },
  { month: "Feb", income: 6980, expenses: 3420, balance: 3560 },
  { month: "Mar", income: 7840, expenses: 3939, balance: 3901 },
];

export const CATEGORY_COLORS: Record<string, string> = {
  "Food & Dining": "#f97316",
  Shopping: "#8b5cf6",
  Transport: "#3b82f6",
  Housing: "#ef4444",
  Entertainment: "#ec4899",
  Healthcare: "#10b981",
  Education: "#06b6d4",
  Utilities: "#f59e0b",
  Travel: "#6366f1",
};
