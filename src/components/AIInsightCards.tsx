"use client";
import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { generateInsights, Insight } from "@/lib/insightEngine";
import { useTheme } from "next-themes";
import { Sparkles, RefreshCw } from "lucide-react";

const TYPE_CONFIG = {
  warning: {
    bg: "rgba(255,71,87,0.08)",
    border: "rgba(255,71,87,0.2)",
    badge: "rgba(255,71,87,0.12)",
    badgeText: "#ff4757",
    label: "Warning",
    backBg: "rgba(255,71,87,0.06)",
  },
  success: {
    bg: "rgba(0,196,140,0.08)",
    border: "rgba(0,196,140,0.2)",
    badge: "rgba(0,196,140,0.12)",
    badgeText: "#00c48c",
    label: "Positive",
    backBg: "rgba(0,196,140,0.06)",
  },
  tip: {
    bg: "rgba(61,127,255,0.08)",
    border: "rgba(61,127,255,0.2)",
    badge: "rgba(61,127,255,0.12)",
    badgeText: "#3d7fff",
    label: "Tip",
    backBg: "rgba(61,127,255,0.06)",
  },
  trend: {
    bg: "rgba(255,184,0,0.08)",
    border: "rgba(255,184,0,0.2)",
    badge: "rgba(255,184,0,0.12)",
    badgeText: "#ffb800",
    label: "Trend",
    backBg: "rgba(255,184,0,0.06)",
  },
};

function InsightCard({ insight, index }: { insight: Insight; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === "dark";
  const config = TYPE_CONFIG[insight.type];

  return (
    <div
      className="relative cursor-pointer"
      style={{ height: 200, perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          animationDelay: `${index * 80}ms`,
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: isDark
              ? config.bg
              : `rgba(255,255,255,0.9)`,
            border: `1px solid ${config.border}`,
            boxShadow: isDark
              ? `0 4px 24px rgba(0,0,0,0.2)`
              : `0 4px 24px rgba(0,0,0,0.06)`,
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 22 }}>{insight.emoji}</span>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: config.badge,
                  color: config.badgeText,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {config.label}
              </span>
            </div>
            <span
              className="text-xs"
              style={{
                color: "var(--text-muted)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Tap to flip
            </span>
          </div>

          <div>
            <h3
              className="font-bold text-base mb-1 leading-snug"
              style={{
                fontFamily: "'Syne', sans-serif",
                color: "var(--text-primary)",
              }}
            >
              {insight.title}
            </h3>
            {insight.metric && (
              <div className="flex items-baseline gap-2 mt-2">
                <span
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    color: config.badgeText,
                  }}
                >
                  {insight.metric}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {insight.metricLabel}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: isDark ? config.backBg : "#ffffff",
            border: `1px solid ${config.border}`,
            boxShadow: isDark
              ? `0 4px 24px rgba(0,0,0,0.2)`
              : `0 4px 24px rgba(0,0,0,0.06)`,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} style={{ color: config.badgeText }} />
            <span
              className="text-xs font-semibold"
              style={{
                color: config.badgeText,
                fontFamily: "'Syne', sans-serif",
              }}
            >
              AI Analysis
            </span>
          </div>
          <p
            className="text-sm leading-relaxed flex-1"
            style={{
              color: "var(--text-secondary)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {insight.description}
          </p>
          <span
            className="text-xs mt-3"
            style={{
              color: "var(--text-muted)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Tap to flip back
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AIInsightCards() {
  const { transactions } = useAppStore();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadInsights = () => {
    setRefreshing(true);
    setTimeout(() => {
      setInsights(generateInsights(transactions));
      setLoading(false);
      setRefreshing(false);
    }, 800);
  };

  useEffect(() => {
    loadInsights();
  }, [transactions]);

  return (
    <div className="card p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(124,58,237,0.1)" }}
          >
            <Sparkles size={16} style={{ color: "var(--accent-purple)" }} />
          </div>
          <div>
            <h2
              className="font-bold text-base"
              style={{
                fontFamily: "'Syne', sans-serif",
                color: "var(--text-primary)",
              }}
            >
              AI Insights
            </h2>
            <p
              className="text-xs mt-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              Tap any card to see detailed analysis
            </p>
          </div>
        </div>
        <button
          onClick={loadInsights}
          className="flex items-center gap-2 btn-ghost text-xs"
          style={{ padding: "6px 12px" }}
        >
          <RefreshCw
            size={12}
            style={{
              animation: refreshing ? "spin 0.8s linear infinite" : "none",
            }}
          />
          Refresh
        </button>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl skeleton"
              style={{ height: 200 }}
            />
          ))}
        </div>
      ) : insights.length === 0 ? (
        <div
          className="text-center py-12"
          style={{ color: "var(--text-muted)" }}
        >
          <p style={{ fontSize: 36 }}>🤖</p>
          <p
            className="mt-3 font-medium"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Not enough data yet
          </p>
          <p className="text-sm mt-1">Add more transactions to get insights</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((insight, i) => (
            <InsightCard key={insight.id} insight={insight} index={i} />
          ))}
        </div>
      )}

      {/* Footer note */}
      <p
        className="text-xs mt-5 text-center"
        style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}
      >
        ✨ Insights are generated from your actual transaction data
      </p>
    </div>
  );
}