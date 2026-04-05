"use client";
import SummaryCards from "@/components/SummaryCards";
import BalanceTrendChart from "@/components/BalanceTrendChart";
import SpendingBreakdown from "@/components/SpendingBreakdown";
import RecentTransactions from "@/components/RecentTransactions";

export default function DashboardView() {
  return (
    <div className="space-y-6">
      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <BalanceTrendChart />
        </div>
        <div className="lg:col-span-2">
          <SpendingBreakdown />
        </div>
      </div>

      <RecentTransactions />
    </div>
  );
}
