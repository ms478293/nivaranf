"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import {
  EXECUTIVE_DASHBOARD,
  CAMP_MASTER_LOG,
  MONTHLY_TRACKER,
  FIVE_YEAR_ROLLOUT,
  SCALING_SCENARIOS,
  IMPACT_METRICS,
  FINANCIAL_SUMMARY,
  RURAL_COVERAGE,
  PROVINCE_SUMMARY,
  type CampRecord,
} from "@/content/sanjeevani-tracking-data";

// ─── Animated Counter ──────────────────────────────────────
function AnimatedCounter({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * target);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  const formatted =
    decimals > 0
      ? count.toFixed(decimals)
      : Math.round(count).toLocaleString("en-NP");

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

// ─── Section Wrapper ───────────────────────────────────────
function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`w-full px-4 py-10 md:py-14 ${className}`}>
      <div className="max-w-[1320px] mx-auto">{children}</div>
    </section>
  );
}

// ─── Section Title ─────────────────────────────────────────
function SectionTitle({ light, bold }: { light: string; bold: string }) {
  return (
    <h2 className="flex items-center gap-3 mb-8">
      <span className="w-1.5 h-10 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full" />
      <span>
        <span className="text-gray-400 font-light text-xl md:text-2xl">
          {light}{" "}
        </span>
        <span className="text-gray-900 font-bold text-xl md:text-2xl font-Poppins">
          {bold}
        </span>
      </span>
    </h2>
  );
}

// ─── Glass KPI Card ────────────────────────────────────────
function KpiCard({
  icon,
  label,
  value,
  sub,
  accent = "primary",
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  sub?: string;
  accent?: "primary" | "secondary" | "forest";
}) {
  const gradients = {
    primary: "from-primary-500/10 to-primary-500/5 ring-primary-200/60",
    secondary: "from-secondary-500/10 to-secondary-500/5 ring-secondary-200/60",
    forest: "from-forest-500/10 to-forest-500/5 ring-forest-200/60",
  };
  const iconColors = {
    primary: "bg-primary-500 text-white shadow-primary-200",
    secondary: "bg-secondary-500 text-white shadow-secondary-200",
    forest: "bg-forest-600 text-white shadow-forest-200",
  };

  return (
    <div
      className={`bg-gradient-to-br ${gradients[accent]} rounded-2xl ring-1 p-5 flex flex-col gap-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group`}
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconColors[accent]} shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <p className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">
        {label}
      </p>
      <p className="text-2xl md:text-3xl font-extrabold text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-400 leading-snug">{sub}</p>}
    </div>
  );
}

// ─── Progress Bar ──────────────────────────────────────────
function ProgressBar({
  value,
  max,
  color = "bg-primary-500",
  height = "h-3",
  showLabel = true,
}: {
  value: number;
  max: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full">
      <div className={`w-full bg-gray-100 rounded-full ${height} overflow-hidden`}>
        <div
          className={`${color} ${height} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-500 mt-1 text-right">
          {pct.toFixed(1)}%
        </p>
      )}
    </div>
  );
}

// ─── Pulse Dot ─────────────────────────────────────────────
function PulseDot({ color = "bg-green-500" }: { color?: string }) {
  return (
    <span className="relative flex h-3 w-3">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`}
      />
      <span
        className={`relative inline-flex rounded-full h-3 w-3 ${color}`}
      />
    </span>
  );
}

// ─── Format USD ────────────────────────────────────────────
function formatUSD(amount: number) {
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toLocaleString()}`;
}

// ─── Icons (inline SVG) ────────────────────────────────────
const Icons = {
  patients: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  camp: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  team: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  money: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  medicine: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  globe: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  chart: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  calendar: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  women: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="8" r="5" />
      <path strokeLinecap="round" d="M12 13v8m-3-3h6" />
    </svg>
  ),
  child: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  referral: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  ),
  target: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
};

// ─── MAIN PAGE COMPONENT ───────────────────────────────────
export default function SanjeevaniTrackingDashboard() {
  const [selectedCamp, setSelectedCamp] = useState<CampRecord | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "camps" | "finance">("overview");

  const d = EXECUTIVE_DASHBOARD;

  return (
    <div className="min-h-screen bg-gray-50/50 font-Poppins">
      {/* ═══════ HERO ═══════ */}
      <div className="relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        {/* Colored accent strips */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-forest-500" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-3xl" />

        <div className="max-w-[1320px] mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <PulseDot color="bg-green-400" />
            <span className="text-green-400 text-xs font-bold tracking-[0.2em] uppercase">
              Live Tracking Dashboard
            </span>
          </div>
          <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-[1.1] mb-4 tracking-tight">
            Project{" "}
            <span className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
              Sanjeevani
            </span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
            National Rural Health Mission — Real-time progress across all 7
            provinces of Nepal, targeting 460 rural municipalities by 2030.
          </p>

          {/* Hero stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { label: "Patients Served", value: "17,355", icon: "👥", color: "from-primary-500/20 to-primary-600/10 border-primary-500/30" },
              { label: "Health Camps", value: "16", icon: "🏥", color: "from-secondary-500/20 to-secondary-600/10 border-secondary-500/30" },
              { label: "Provinces Covered", value: "7/7", icon: "🗺️", color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30" },
              { label: "Target Year", value: "2030", icon: "🎯", color: "from-amber-500/20 to-amber-600/10 border-amber-500/30" },
            ].map((s) => (
              <div
                key={s.label}
                className={`bg-gradient-to-br ${s.color} border backdrop-blur-sm rounded-2xl p-4 md:p-5`}
              >
                <span className="text-2xl">{s.icon}</span>
                <p className="text-white text-2xl md:text-3xl font-extrabold mt-2">{s.value}</p>
                <p className="text-gray-400 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════ TAB NAV ═══════ */}
      <div className="sticky top-28 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-[1320px] mx-auto px-4 flex gap-1 overflow-x-auto">
          {(
            [
              { key: "overview", label: "📊 Overview", mobileLabel: "Overview" },
              { key: "camps", label: "🏕️ Camp Details", mobileLabel: "Camps" },
              { key: "finance", label: "💰 Finance & Scale", mobileLabel: "Finance" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3.5 text-sm font-semibold whitespace-nowrap border-b-[3px] transition-all ${
                activeTab === tab.key
                  ? "border-primary-500 text-primary-600 bg-primary-50/50"
                  : "border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="hidden md:inline">{tab.label}</span>
              <span className="md:hidden">{tab.mobileLabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ═══════ OVERVIEW TAB ═══════ */}
      {activeTab === "overview" && (
        <>
          {/* ── Executive KPIs ── */}
          <Section id="kpis" className="bg-white">
            <SectionTitle light="Executive" bold="Dashboard" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <KpiCard
                icon={Icons.patients}
                label="Total Patients Served"
                value={<AnimatedCounter target={d.totalPatientsServed} />}
                sub="Since May 2025"
              />
              <KpiCard
                icon={Icons.camp}
                label="Camps Conducted"
                value={<AnimatedCounter target={d.totalCampsConducted} />}
                sub={`Avg ${d.avgPatientsPerCamp.toLocaleString()} patients/camp`}
                accent="secondary"
              />
              <KpiCard
                icon={Icons.team}
                label="Active Medical Teams"
                value={<AnimatedCounter target={d.activeMedicalTeams} />}
                sub={`${d.estimatedWeeklyCapacity.toLocaleString()} patients/week capacity`}
                accent="forest"
              />
              <KpiCard
                icon={Icons.money}
                label="Total Spent (USD)"
                value={<AnimatedCounter target={d.totalSpendingSoFar / 1_000} prefix="$" suffix="K" decimals={0} />}
                sub="~$7.50 per patient"
              />
              <KpiCard
                icon={Icons.chart}
                label="Annual Capacity"
                value={<AnimatedCounter target={d.estimatedAnnualCapacity} />}
                sub="With current 2 teams"
                accent="secondary"
              />
              <KpiCard
                icon={Icons.globe}
                label="Rural Municipalities"
                value={
                  <>
                    <AnimatedCounter target={RURAL_COVERAGE.coveredSoFar} />
                    <span className="text-gray-400 text-lg font-normal">
                      /{RURAL_COVERAGE.totalRuralMunicipalities}
                    </span>
                  </>
                }
                sub={`${RURAL_COVERAGE.coveragePercent.toFixed(1)}% covered`}
                accent="forest"
              />
              <KpiCard
                icon={Icons.calendar}
                label="Target Year"
                value="2030"
                sub="5-year national rollout"
              />
              <KpiCard
                icon={Icons.medicine}
                label="Medicines Given"
                value={<AnimatedCounter target={IMPACT_METRICS.medicinesDistributed} />}
                sub="90% of patients received medicine"
                accent="secondary"
              />
            </div>
          </Section>

          {/* ── Rural Coverage Progress ── */}
          <Section id="coverage">
            <SectionTitle light="Rural Coverage" bold="Progress" />
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <p className="text-4xl font-bold text-gray-900">
                    <AnimatedCounter target={RURAL_COVERAGE.coveredSoFar} />{" "}
                    <span className="text-lg font-normal text-gray-500">
                      of {RURAL_COVERAGE.totalRuralMunicipalities} Rural
                      Municipalities
                    </span>
                  </p>
                  <p className="text-gray-500 mt-1">
                    {RURAL_COVERAGE.coveragePercent.toFixed(1)}% coverage
                    achieved — {RURAL_COVERAGE.totalRuralMunicipalities - RURAL_COVERAGE.coveredSoFar}{" "}
                    remaining
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <PulseDot color="bg-green-500" />
                  <span className="text-green-700 text-sm font-medium">
                    Active — On Track
                  </span>
                </div>
              </div>
              <ProgressBar
                value={RURAL_COVERAGE.coveredSoFar}
                max={RURAL_COVERAGE.totalRuralMunicipalities}
                color="bg-gradient-to-r from-primary-500 to-secondary-500"
                height="h-4"
              />
            </div>
          </Section>

          {/* ── Province Distribution ── */}
          <Section id="provinces" className="bg-white">
            <SectionTitle light="Province-wise" bold="Distribution" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {PROVINCE_SUMMARY.map((p, idx) => {
                const maxPatients = Math.max(
                  ...PROVINCE_SUMMARY.map((x) => x.totalPatients)
                );
                const colors = [
                  "from-primary-500 to-primary-600",
                  "from-secondary-500 to-secondary-600",
                  "from-emerald-500 to-emerald-600",
                  "from-amber-500 to-amber-600",
                  "from-purple-500 to-purple-600",
                  "from-pink-500 to-pink-600",
                  "from-cyan-500 to-cyan-600",
                ];
                return (
                  <div
                    key={p.province}
                    className="bg-white rounded-2xl ring-1 ring-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    <div className={`h-1.5 bg-gradient-to-r ${colors[idx % colors.length]}`} />
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-gray-900">
                          {p.province}
                        </h3>
                        <span className="text-xs bg-gray-900 text-white px-2.5 py-0.5 rounded-full font-semibold">
                          {p.campsCompleted}
                        </span>
                      </div>
                      <p className="text-3xl font-extrabold text-gray-900 mb-0.5">
                        {p.totalPatients.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400 mb-3">patients served</p>
                      <ProgressBar
                        value={p.totalPatients}
                        max={maxPatients}
                        color={`bg-gradient-to-r ${colors[idx % colors.length]}`}
                        height="h-2"
                        showLabel={false}
                      />
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.districts.map((d) => (
                          <span
                            key={d}
                            className="text-[11px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full border border-gray-100"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* ── Impact Metrics ── */}
          <Section id="impact">
            <SectionTitle light="Impact" bold="Metrics" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                {
                  icon: Icons.patients,
                  label: "Total Patients",
                  value: IMPACT_METRICS.totalPatientsServed,
                  color: "text-primary-600",
                  bg: "bg-primary-50",
                  ring: "ring-primary-100",
                },
                {
                  icon: Icons.women,
                  label: "Women (42%)",
                  value: IMPACT_METRICS.womenBeneficiaries,
                  color: "text-pink-600",
                  bg: "bg-pink-50",
                  ring: "ring-pink-100",
                },
                {
                  icon: Icons.child,
                  label: "Children (10%)",
                  value: IMPACT_METRICS.childrenBeneficiaries,
                  color: "text-amber-600",
                  bg: "bg-amber-50",
                  ring: "ring-amber-100",
                },
                {
                  icon: Icons.referral,
                  label: "Referrals (5%)",
                  value: IMPACT_METRICS.estimatedReferrals,
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                  ring: "ring-blue-100",
                },
                {
                  icon: Icons.medicine,
                  label: "Medicines (90%)",
                  value: IMPACT_METRICS.medicinesDistributed,
                  color: "text-forest-600",
                  bg: "bg-forest-50",
                  ring: "ring-forest-100",
                },
              ].map((m) => (
                <div
                  key={m.label}
                  className={`${m.bg} rounded-2xl ring-1 ${m.ring} p-5 text-center`}
                >
                  <div className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center ${m.color} bg-white shadow-sm mb-3`}>
                    {m.icon}
                  </div>
                  <p className={`text-2xl font-bold ${m.color}`}>
                    <AnimatedCounter target={m.value} />
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Monthly Progress ── */}
          <Section id="monthly" className="bg-white">
            <SectionTitle light="Monthly" bold="Progress" />
            <div className="overflow-x-auto">
              {/* Visual bar chart */}
              <div className="flex items-end gap-2 h-64 mb-6 px-2">
                {MONTHLY_TRACKER.map((m) => {
                  const maxP = Math.max(
                    ...MONTHLY_TRACKER.map((x) => x.patientsThisMonth)
                  );
                  const heightPct = (m.patientsThisMonth / maxP) * 100;
                  return (
                    <div
                      key={m.month}
                      className="flex-1 min-w-[60px] flex flex-col items-center gap-1"
                    >
                      <span className="text-xs font-semibold text-gray-700">
                        {m.patientsThisMonth.toLocaleString()}
                      </span>
                      <div
                        className="w-full bg-gradient-to-t from-primary-500 to-primary-300 rounded-t-lg transition-all duration-700"
                        style={{ height: `${heightPct}%` }}
                      />
                      <span className="text-[10px] text-gray-500 text-center leading-tight">
                        {m.month.replace(" 20", " '")}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Cumulative line */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-600 mb-3">
                  Cumulative Patient Growth
                </p>
                <div className="flex items-end gap-1 h-20">
                  {MONTHLY_TRACKER.map((m, i) => {
                    const maxC = MONTHLY_TRACKER[MONTHLY_TRACKER.length - 1].cumulativePatients;
                    const pct = (m.cumulativePatients / maxC) * 100;
                    return (
                      <div
                        key={m.month}
                        className="flex-1 flex flex-col items-center gap-0.5"
                      >
                        <div
                          className="w-full bg-secondary-400 rounded-t-sm"
                          style={{ height: `${pct}%` }}
                        />
                        {(i === 0 ||
                          i === MONTHLY_TRACKER.length - 1 ||
                          i === Math.floor(MONTHLY_TRACKER.length / 2)) && (
                          <span className="text-[9px] text-gray-400">
                            {(m.cumulativePatients / 1000).toFixed(1)}K
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Section>

          {/* ── 5-Year Rollout ── */}
          <Section id="rollout">
            <SectionTitle light="5-Year" bold="Rollout Plan (2025–2030)" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FIVE_YEAR_ROLLOUT.map((yr) => {
                const maxCum = FIVE_YEAR_ROLLOUT[FIVE_YEAR_ROLLOUT.length - 1].cumulativePatients;
                const isCurrent = yr.year === 2026;
                return (
                  <div
                    key={yr.year}
                    className={`rounded-2xl p-5 ring-1 transition-shadow hover:shadow-md ${
                      isCurrent
                        ? "bg-primary-50 ring-primary-200 shadow-sm"
                        : "bg-white ring-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`text-2xl font-bold ${isCurrent ? "text-primary-600" : "text-gray-900"}`}>
                        {yr.year}
                      </h3>
                      {isCurrent && (
                        <span className="flex items-center gap-1.5 text-xs bg-primary-500 text-white px-2.5 py-1 rounded-full font-medium">
                          <PulseDot color="bg-white" />
                          Current
                        </span>
                      )}
                      {yr.year < 2026 && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Completed
                        </span>
                      )}
                      {yr.year > 2026 && (
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                          Planned
                        </span>
                      )}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Patients</span>
                        <span className="font-semibold text-gray-900">
                          {yr.projectedPatients.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Camps</span>
                        <span className="font-semibold text-gray-900">
                          {yr.projectedCamps}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Budget</span>
                        <span className="font-semibold text-gray-900">
                          {formatUSD(yr.estimatedBudget)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Cumulative</span>
                        <span>
                          {yr.cumulativePatients.toLocaleString()} /{" "}
                          {maxCum.toLocaleString()}
                        </span>
                      </div>
                      <ProgressBar
                        value={yr.cumulativePatients}
                        max={maxCum}
                        color={isCurrent ? "bg-primary-500" : "bg-secondary-400"}
                        height="h-2"
                        showLabel={false}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>
        </>
      )}

      {/* ═══════ CAMPS TAB ═══════ */}
      {activeTab === "camps" && (
        <>
          {/* ── Camp Master Log Table ── */}
          <Section id="camps-table" className="bg-white">
            <SectionTitle light="Camp Master" bold="Log" />
            <p className="text-gray-500 text-sm mb-6">
              Comprehensive record of all {CAMP_MASTER_LOG.length} health camps
              conducted across Nepal. Click any row for details.
            </p>

            <div className="overflow-x-auto rounded-2xl ring-1 ring-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 font-semibold text-gray-600">
                      Camp
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-600">
                      Location
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-600">
                      Date
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-600">
                      Team
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-right">
                      Patients
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-right">
                      Referrals
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-right">
                      Cost (USD)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {CAMP_MASTER_LOG.map((camp) => (
                    <tr
                      key={camp.campId}
                      onClick={() => setSelectedCamp(camp)}
                      className="border-t border-gray-100 hover:bg-primary-50/50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-primary-600">
                        {camp.campId}
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium text-gray-900">
                          {camp.district}
                        </span>
                        <br />
                        <span className="text-xs text-gray-500">
                          {camp.ruralMunicipality}, {camp.province}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {new Date(camp.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            camp.teamAssigned === "Team A"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {camp.teamAssigned}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        {camp.totalPatients.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600">
                        {camp.referrals}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600">
                        {camp.totalCost.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 border-t-2 border-gray-200 font-bold">
                    <td className="px-4 py-3" colSpan={4}>
                      TOTAL
                    </td>
                    <td className="px-4 py-3 text-right text-primary-600">
                      {CAMP_MASTER_LOG.reduce(
                        (s, c) => s + c.totalPatients,
                        0
                      ).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {CAMP_MASTER_LOG.reduce(
                        (s, c) => s + c.referrals,
                        0
                      ).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {CAMP_MASTER_LOG.reduce(
                        (s, c) => s + c.totalCost,
                        0
                      ).toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Section>

          {/* ── Camp Detail Modal ── */}
          {selectedCamp && (
            <div
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedCamp(null)}
            >
              <div
                className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal header with gradient */}
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 md:p-8 text-white relative">
                  <button
                    onClick={() => setSelectedCamp(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-lg transition-colors"
                  >
                    &times;
                  </button>
                  <p className="text-white/70 text-xs font-bold tracking-wider uppercase mb-1">{selectedCamp.campId}</p>
                  <h3 className="text-xl font-bold">{selectedCamp.district}</h3>
                  <p className="text-white/80 text-sm">
                    {selectedCamp.ruralMunicipality}, {selectedCamp.province}
                  </p>
                  <div className="flex gap-3 mt-4">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">{selectedCamp.teamAssigned}</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">{selectedCamp.effectiveDays} days</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">{selectedCamp.teamSize} members</span>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-primary-50 rounded-xl">
                      <p className="text-2xl font-extrabold text-primary-600">{selectedCamp.totalPatients.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wide mt-0.5">Patients</p>
                    </div>
                    <div className="text-center p-3 bg-secondary-50 rounded-xl">
                      <p className="text-2xl font-extrabold text-secondary-600">{selectedCamp.referrals}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wide mt-0.5">Referrals</p>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-xl">
                      <p className="text-2xl font-extrabold text-forest-600">${selectedCamp.totalCost.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wide mt-0.5">Cost</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm mb-6">
                    {[
                      { label: "Start Date", value: new Date(selectedCamp.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
                      { label: "End Date", value: new Date(selectedCamp.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
                      { label: "Doctors", value: selectedCamp.doctors },
                      { label: "Medicines", value: selectedCamp.medicinesDistributed.toLocaleString() },
                      { label: "Cost/Patient", value: `$${selectedCamp.costPerPatient}` },
                      { label: "Major Cases", value: selectedCamp.majorCases },
                    ].map((item) => (
                      <div key={item.label} className="bg-gray-50 rounded-lg px-3 py-2">
                        <p className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
                          {item.label}
                        </p>
                        <p className="font-semibold text-gray-900 text-sm">{item.value}</p>
                      </div>
                    ))}
                  </div>

                {/* Gender breakdown bar */}
                <div className="mt-6">
                  <p className="text-xs text-gray-500 mb-2 font-medium">
                    Gender &amp; Age Breakdown
                  </p>
                  <div className="flex h-4 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-400"
                      style={{
                        width: `${(selectedCamp.male / selectedCamp.totalPatients) * 100}%`,
                      }}
                      title={`Male: ${selectedCamp.male}`}
                    />
                    <div
                      className="bg-pink-400"
                      style={{
                        width: `${(selectedCamp.female / selectedCamp.totalPatients) * 100}%`,
                      }}
                      title={`Female: ${selectedCamp.female}`}
                    />
                    <div
                      className="bg-amber-400"
                      style={{
                        width: `${(selectedCamp.children / selectedCamp.totalPatients) * 100}%`,
                      }}
                      title={`Children: ${selectedCamp.children}`}
                    />
                  </div>
                  <div className="flex gap-4 mt-2 text-xs">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                      Male ({((selectedCamp.male / selectedCamp.totalPatients) * 100).toFixed(0)}%)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-pink-400" />
                      Female ({((selectedCamp.female / selectedCamp.totalPatients) * 100).toFixed(0)}%)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      Children ({((selectedCamp.children / selectedCamp.totalPatients) * 100).toFixed(0)}%)
                    </span>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Monthly Tracker Table ── */}
          <Section id="monthly-table">
            <SectionTitle light="Monthly" bold="Tracker" />
            <div className="overflow-x-auto rounded-2xl ring-1 ring-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 font-semibold text-gray-600">Month</th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-right">Camps</th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-right">Patients</th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-right">Cumulative</th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-right">Budget (USD)</th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-right">Avg/Camp</th>
                  </tr>
                </thead>
                <tbody>
                  {MONTHLY_TRACKER.map((m) => (
                    <tr key={m.month} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">{m.month}</td>
                      <td className="px-4 py-3 text-right">{m.campsConducted}</td>
                      <td className="px-4 py-3 text-right font-semibold">{m.patientsThisMonth.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-secondary-600 font-medium">{m.cumulativePatients.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-3 text-right">{m.budgetSpent.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-gray-500">{m.avgPatientsPerCamp.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </>
      )}

      {/* ═══════ FINANCE TAB ═══════ */}
      {activeTab === "finance" && (
        <>
          {/* ── Financial Summary ── */}
          <Section id="finance" className="bg-white">
            <SectionTitle light="Financial" bold="Summary" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
                <p className="text-white/70 text-sm mb-1">Total Spent So Far</p>
                <p className="text-3xl font-bold">
                  $<AnimatedCounter target={FINANCIAL_SUMMARY.totalSpentSoFar / 1_000} decimals={0} suffix="K" />
                </p>
                <p className="text-white/50 text-xs mt-2">Since May 2025</p>
              </div>
              <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl p-6 text-white">
                <p className="text-white/70 text-sm mb-1">
                  Projected Annual Budget
                </p>
                <p className="text-3xl font-bold">
                  $<AnimatedCounter target={FINANCIAL_SUMMARY.projectedAnnualBudget / 1_000} decimals={0} suffix="K" />
                </p>
                <p className="text-white/50 text-xs mt-2">
                  With 2 active teams
                </p>
              </div>
              <div className="bg-gradient-to-br from-forest-600 to-forest-700 rounded-2xl p-6 text-white">
                <p className="text-white/70 text-sm mb-1">
                  5-Year Budget (2026–2030)
                </p>
                <p className="text-3xl font-bold">
                  $<AnimatedCounter target={FINANCIAL_SUMMARY.projected5YearBudget / 1_000_000} decimals={1} suffix="M" />
                </p>
                <p className="text-white/50 text-xs mt-2">
                  Full national rollout
                </p>
              </div>
            </div>

            {/* Budget timeline */}
            <div className="mt-8 bg-gray-50 rounded-2xl p-6">
              <p className="text-sm font-medium text-gray-600 mb-4">
                Yearly Budget Allocation
              </p>
              <div className="space-y-3">
                {FIVE_YEAR_ROLLOUT.map((yr) => {
                  const maxBudget = Math.max(
                    ...FIVE_YEAR_ROLLOUT.map((y) => y.estimatedBudget)
                  );
                  return (
                    <div key={yr.year} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700 w-10">
                        {yr.year}
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                        <div
                          className={`h-full rounded-full flex items-center px-3 text-xs text-white font-medium transition-all duration-700 ${
                            yr.year <= 2026
                              ? "bg-primary-500"
                              : "bg-secondary-400"
                          }`}
                          style={{
                            width: `${(yr.estimatedBudget / maxBudget) * 100}%`,
                          }}
                        >
                          {formatUSD(yr.estimatedBudget)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Section>

          {/* ── Scaling Scenarios ── */}
          <Section id="scaling">
            <SectionTitle light="Scaling" bold="Scenarios" />
            <p className="text-gray-500 text-sm mb-6">
              How fast can we cover all 460 rural municipalities with different
              team sizes?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SCALING_SCENARIOS.map((s) => {
                const isCurrent = s.teams === 2;
                return (
                  <div
                    key={s.teams}
                    className={`rounded-2xl p-6 ring-1 transition-all hover:shadow-lg ${
                      isCurrent
                        ? "bg-primary-50 ring-primary-300 shadow-md scale-[1.02]"
                        : "bg-white ring-gray-100"
                    }`}
                  >
                    <div className="text-center mb-4">
                      <div
                        className={`inline-flex items-center justify-center w-14 h-14 rounded-full text-xl font-bold ${
                          isCurrent
                            ? "bg-primary-500 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {s.teams}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Medical Teams
                      </p>
                    </div>
                    {isCurrent && (
                      <div className="text-center mb-3">
                        <span className="text-xs bg-primary-500 text-white px-2.5 py-0.5 rounded-full">
                          Current Setup
                        </span>
                      </div>
                    )}
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Annual Capacity</span>
                        <span className="font-semibold">
                          {s.annualCapacity.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Annual Budget</span>
                        <span className="font-semibold">
                          {formatUSD(s.annualBudget)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Years to Complete</span>
                        <span
                          className={`font-bold text-lg ${
                            isCurrent ? "text-primary-600" : "text-gray-900"
                          }`}
                        >
                          {s.yearsToComplete}
                        </span>
                      </div>
                    </div>
                    {/* Mini timeline */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <ProgressBar
                        value={1}
                        max={s.yearsToComplete}
                        color={
                          isCurrent ? "bg-primary-500" : "bg-secondary-400"
                        }
                        height="h-1.5"
                        showLabel={false}
                      />
                      <p className="text-[10px] text-gray-400 mt-1 text-center">
                        ~{Math.ceil(460 / s.yearsToComplete)} municipalities/year
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* ── Cost Efficiency ── */}
          <Section id="efficiency" className="bg-white">
            <SectionTitle light="Cost" bold="Efficiency" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Per-Camp Economics
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      label: "Avg Patients per Camp",
                      value: EXECUTIVE_DASHBOARD.avgPatientsPerCamp.toLocaleString(),
                    },
                    {
                      label: "Cost per Patient",
                      value: `$${EXECUTIVE_DASHBOARD.costPerPatient.toLocaleString()}`,
                    },
                    {
                      label: "Avg Cost per Camp",
                      value: formatUSD(
                        CAMP_MASTER_LOG.reduce((s, c) => s + c.totalCost, 0) /
                          CAMP_MASTER_LOG.length
                      ),
                    },
                    {
                      label: "Avg Camp Duration",
                      value: `${Math.round(CAMP_MASTER_LOG.reduce((s, c) => s + c.effectiveDays, 0) / CAMP_MASTER_LOG.length)} days`,
                    },
                    {
                      label: "Doctors per Camp",
                      value: "3",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
                    >
                      <span className="text-gray-600 text-sm">
                        {item.label}
                      </span>
                      <span className="font-semibold text-gray-900">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Team Performance
                </h3>
                <div className="space-y-6">
                  {["Team A", "Team B"].map((team) => {
                    const camps = CAMP_MASTER_LOG.filter(
                      (c) => c.teamAssigned === team
                    );
                    const totalP = camps.reduce(
                      (s, c) => s + c.totalPatients,
                      0
                    );
                    const avgP = Math.round(totalP / camps.length);
                    return (
                      <div key={team}>
                        <div className="flex justify-between items-center mb-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              team === "Team A"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {team}
                          </span>
                          <span className="text-sm text-gray-500">
                            {camps.length} camps · {totalP.toLocaleString()}{" "}
                            patients
                          </span>
                        </div>
                        <ProgressBar
                          value={totalP}
                          max={EXECUTIVE_DASHBOARD.totalPatientsServed}
                          color={
                            team === "Team A"
                              ? "bg-blue-500"
                              : "bg-purple-500"
                          }
                          height="h-3"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Avg: {avgP.toLocaleString()} patients/camp
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Section>
        </>
      )}

      {/* ═══════ FOOTER ═══════ */}
      <Section id="footer-note" className="pb-8">
        <div className="bg-gray-50 rounded-2xl p-6 text-center">
          <p className="text-gray-500 text-sm">
            Data consolidated from Project Sanjeevani National Strategy, Master
            All-In-One, and Full System with 753 Palikas tracking workbooks.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Last updated: March 2026 · Nivaran Foundation
          </p>
        </div>
      </Section>
    </div>
  );
}
