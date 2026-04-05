"use client";
import { useAppStore } from "@/store/useAppStore";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import DashboardView from "@/components/DashboardView";
import TransactionsList from "@/components/TransactionsList";
import InsightsView from "@/components/InsightsView";

export default function Home() {
  const { activeTab } = useAppStore();

  return (
    <div className="flex min-h-screen bg-[#f7f6f3] dark:bg-[#0c0c10]">
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: 220 }}>
        <Topbar />

        <main className="flex-1 p-6 overflow-auto">
          <div key={activeTab} className="animate-in">
            {activeTab === "dashboard" && <DashboardView />}
            {activeTab === "transactions" && <TransactionsList />}
            {activeTab === "insights" && <InsightsView />}
          </div>
        </main>
      </div>
    </div>
  );
}
