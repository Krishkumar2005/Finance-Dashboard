"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb,
  TrendingUp, Shield, Eye,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "insights", label: "Insights", icon: Lightbulb },
] as const;

export default function Sidebar() {
  const { activeTab, setActiveTab, role, setRole } = useAppStore();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? theme === "dark" : false;

  return (
    <aside
      className="fixed top-0 left-0 h-full w-[220px] flex flex-col z-30 transition-all duration-150"
      style={{
        background: isDark ? "#0c0c10" : "#ffffff",
        borderRight: isDark
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid rgba(0,0,0,0.08)",
        boxShadow: isDark
          ? "4px 0 24px rgba(0,0,0,0.4)"
          : "4px 0 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* Logo */}
      <div
        className="px-5 pt-7 pb-6"
        style={{
          borderBottom: isDark
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid rgba(0,0,0,0.07)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "var(--accent-green)" }}
          >
            <TrendingUp size={16} className="text-white" />
          </div>
          <span
            className="font-bold text-lg tracking-tight transition-colors duration-300"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: isDark ? "#ffffff" : "#0f0f13",
            }}
          >
            FinanceIQ
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pt-5 space-y-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as typeof activeTab)}
            className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background:
                activeTab === id
                  ? isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.06)"
                  : "transparent",
              color:
                activeTab === id
                  ? isDark
                    ? "#ffffff"
                    : "#0f0f13"
                  : isDark
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(0,0,0,0.4)",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== id) {
                (e.currentTarget as HTMLElement).style.background = isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.04)";
                (e.currentTarget as HTMLElement).style.color = isDark
                  ? "rgba(255,255,255,0.8)"
                  : "rgba(0,0,0,0.75)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== id) {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = isDark
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(0,0,0,0.4)";
              }
            }}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      {/* Role Switcher */}
      <div className="px-3 pb-6 space-y-3">
        {/* Separator line above role section */}
        <div
          className="mb-4"
          style={{
            borderTop: isDark
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid rgba(0,0,0,0.07)",
            marginLeft: "-12px",
            marginRight: "-12px",
            paddingTop: "16px",
          }}
        />

        <p
          className="text-xs uppercase tracking-widest px-2"
          style={{
            fontFamily: "'Syne', sans-serif",
            color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)",
          }}
        >
          Role
        </p>
        <div
          className="rounded-xl p-1 flex gap-1"
          style={{
            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          }}
        >
          {(["admin", "viewer"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background:
                  role === r
                    ? isDark
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(0,0,0,0.08)"
                    : "transparent",
                color:
                  role === r
                    ? isDark
                      ? "#ffffff"
                      : "#0f0f13"
                    : isDark
                    ? "rgba(255,255,255,0.35)"
                    : "rgba(0,0,0,0.35)",
              }}
            >
              {r === "admin" ? <Shield size={12} /> : <Eye size={12} />}
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
        <p
          className="text-xs text-center"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)",
          }}
        >
          {role === "admin" ? "Full access enabled" : "Read-only mode"}
        </p>
      </div>
    </aside>
  );
}