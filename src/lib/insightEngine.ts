import { Transaction } from "@/lib/mockData";

export interface Insight {
  id: string;
  type: "warning" | "success" | "tip" | "trend";
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
  emoji: string;
}

export function generateInsights(transactions: Transaction[]): Insight[] {
  const insights: Insight[] = [];

  const expenses = transactions.filter((t) => t.type === "expense");
  const income = transactions.filter((t) => t.type === "income");

  const totalIncome = income.reduce((s, t) => s + t.amount, 0);
  const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);
  const savingsRate = totalIncome > 0
    ? ((totalIncome - totalExpense) / totalIncome) * 100
    : 0;

  // --- By Month ---
  const byMonth: Record<string, { income: number; expense: number }> = {};
  transactions.forEach((t) => {
    const m = t.date.slice(0, 7);
    if (!byMonth[m]) byMonth[m] = { income: 0, expense: 0 };
    if (t.type === "income") byMonth[m].income += t.amount;
    else byMonth[m].expense += t.amount;
  });
  const months = Object.keys(byMonth).sort();
  const lastMonth = months[months.length - 1];
  const prevMonth = months[months.length - 2];

  // --- By Category ---
  const byCategory: Record<string, number> = {};
  expenses.forEach((t) => {
    byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
  });
  const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];

  // --- Insight 1: Savings Rate ---
  if (savingsRate >= 30) {
    insights.push({
      id: "savings-great",
      type: "success",
      emoji: "🏆",
      title: "Excellent Savings!",
      description: `You are saving ${savingsRate.toFixed(1)}% of your income. That's well above the recommended 20% — keep it up!`,
      metric: `${savingsRate.toFixed(1)}%`,
      metricLabel: "Savings Rate",
    });
  } else if (savingsRate < 15) {
    insights.push({
      id: "savings-low",
      type: "warning",
      emoji: "⚠️",
      title: "Low Savings Rate",
      description: `You're only saving ${savingsRate.toFixed(1)}% of income. Try to target at least 20% by reducing discretionary spend.`,
      metric: `${savingsRate.toFixed(1)}%`,
      metricLabel: "Savings Rate",
    });
  }

  // --- Insight 2: Month over Month expense change ---
  if (lastMonth && prevMonth) {
    const diff = byMonth[lastMonth].expense - byMonth[prevMonth].expense;
    const pct = (diff / byMonth[prevMonth].expense) * 100;
    if (pct > 10) {
      insights.push({
        id: "expense-up",
        type: "warning",
        emoji: "📈",
        title: "Spending Spiked This Month",
        description: `Your expenses jumped by ${pct.toFixed(1)}% compared to last month. Main culprit might be ${topCategory?.[0] || "discretionary spending"}.`,
        metric: `+${pct.toFixed(1)}%`,
        metricLabel: "vs Last Month",
      });
    } else if (pct < -5) {
      insights.push({
        id: "expense-down",
        type: "success",
        emoji: "📉",
        title: "Great Spending Control!",
        description: `You cut expenses by ${Math.abs(pct).toFixed(1)}% this month compared to last. Consistency is key!`,
        metric: `${pct.toFixed(1)}%`,
        metricLabel: "vs Last Month",
      });
    }
  }

  // --- Insight 3: Top category warning ---
  if (topCategory) {
    const pct = (topCategory[1] / totalExpense) * 100;
    if (pct > 35) {
      insights.push({
        id: "top-category",
        type: "tip",
        emoji: "🔍",
        title: `${topCategory[0]} Dominates Spend`,
        description: `${topCategory[0]} accounts for ${pct.toFixed(1)}% of all your expenses — $${topCategory[1].toLocaleString()} total. Consider setting a budget limit.`,
        metric: `${pct.toFixed(1)}%`,
        metricLabel: "of Total Spend",
      });
    }
  }

  // --- Insight 4: Income consistency ---
  const incomeMonths = months.filter((m) => byMonth[m].income > 0);
  const avgIncome = incomeMonths.reduce((s, m) => s + byMonth[m].income, 0) / incomeMonths.length;
  const lastIncome = byMonth[lastMonth]?.income || 0;
  if (lastIncome > avgIncome * 1.15) {
    insights.push({
      id: "income-high",
      type: "success",
      emoji: "💰",
      title: "Above Average Income Month!",
      description: `This month's income of $${lastIncome.toLocaleString()} is ${(((lastIncome - avgIncome) / avgIncome) * 100).toFixed(1)}% above your average. Great time to boost savings!`,
      metric: `$${lastIncome.toLocaleString()}`,
      metricLabel: "This Month",
    });
  }

  // --- Insight 5: Tip if no freelance ---
  const hasFreelance = income.some((t) => t.category === "Freelance");
  if (!hasFreelance) {
    insights.push({
      id: "diversify",
      type: "tip",
      emoji: "💡",
      title: "Single Income Source",
      description: "All your income comes from one source. Consider diversifying with freelance, investments, or passive income for financial resilience.",
      metric: "1",
      metricLabel: "Income Source",
    });
  }

  // --- Insight 6: Weekend spending (fun insight) ---
  const weekendSpend = expenses.filter((t) => {
    const day = new Date(t.date).getDay();
    return day === 0 || day === 6;
  }).reduce((s, t) => s + t.amount, 0);
  const weekendPct = (weekendSpend / totalExpense) * 100;
  if (weekendPct > 25) {
    insights.push({
      id: "weekend",
      type: "tip",
      emoji: "🎉",
      title: "Weekend Splurger Detected!",
      description: `${weekendPct.toFixed(1)}% of your spending happens on weekends — $${weekendSpend.toFixed(0)}. Fun is important but keep an eye on it!`,
      metric: `${weekendPct.toFixed(1)}%`,
      metricLabel: "Weekend Spend",
    });
  }

  return insights.slice(0, 6);
}