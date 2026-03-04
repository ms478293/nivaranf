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

/* ─── Animated Counter ────────────────────────────────────── */
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

/* ─── Section Wrapper (matches site max-w-[1320px] px-4) ── */
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
    <section id={id} className={`w-full px-4 py-10 md:py-12 ${className}`}>
      <div className="max-w-[1320px] mx-auto">{children}</div>
    </section>
  );
}

/* ─── Section Title (matches MainTitle border-l-4 pattern) ─ */
function SectionTitle({ light, bold }: { light: string; bold: string }) {
  return (
    <h2 className="flex flex-wrap gap-x-3 items-center font-Poppins text-xl/10 sm:text-2xl/10 md:text-[40px]/10 border-l-4 border-primary-500 px-2 sm:min-h-10 mb-6">
      <span className="font-thin text-gray-800 leading-8">{light}</span>
      <span className="font-medium text-primary-500 leading-8">{bold}</span>
    </h2>
  );
}

/* ─── Progress Bar ────────────────────────────────────────── */
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
        <p className="text-xs text-gray-500 mt-1 text-right">{pct.toFixed(1)}%</p>
      )}
    </div>
  );
}

/* ─── Format USD ──────────────────────────────────────────── */
function formatUSD(amount: number) {
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toLocaleString()}`;
}

/* ═══════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                            */
/* ═══════════════════════════════════════════════════════════ */
export default function SanjeevaniTrackingDashboard() {
  const [selectedCamp, setSelectedCamp] = useState<CampRecord | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "camps" | "finance">("overview");
  const d = EXECUTIVE_DASHBOARD;

  return (
    <div className="min-h-screen bg-white font-Poppins">
      {/* ═══════ PAGE HEADER ═══════ */}
      <section className="w-full px-4 pt-6 pb-10">
        <div className="max-w-[1320px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm text-gray-500 mb-1">Project Sanjeevani</p>
              <h1 className="flex flex-wrap gap-x-3 items-center font-Poppins text-2xl sm:text-3xl md:text-[40px] border-l-4 border-primary-500 px-3">
                <span className="font-thin text-gray-800 leading-tight">Live Tracking</span>
                <span className="font-medium text-primary-500 leading-tight">Dashboard</span>
              </h1>
              <p className="text-sm text-gray-500 mt-2 max-w-xl">
                National Rural Health Mission — Real-time progress across all 7
                provinces of Nepal, targeting 460 rural municipalities by 2030.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-4 py-2 rounded-full shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Active — On Track
            </div>
          </div>

          {/* Summary KPI row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Patients Served", value: d.totalPatientsServed.toLocaleString(), sub: "Since May 2025", accent: "border-primary-500", color: "text-primary-600" },
              { label: "Health Camps", value: d.totalCampsConducted.toString(), sub: `Avg ${d.avgPatientsPerCamp.toLocaleString()} patients/camp`, accent: "border-secondary-500", color: "text-secondary-600" },
              { label: "Total Investment", value: `$${Math.round(d.totalSpendingSoFar / 1000)}K`, sub: `~$${d.costPerPatient} per patient`, accent: "border-forest-500", color: "text-forest-600" },
              { label: "Target Year", value: "2030", sub: "5-year national rollout", accent: "border-gray-400", color: "text-gray-900" },
            ].map((s) => (
              <div key={s.label} className={`bg-white rounded-xl border border-gray-200 border-l-4 ${s.accent} p-4 md:p-5`}>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{s.label}</p>
                <p className={`text-2xl md:text-3xl font-bold ${s.color} mt-1`}>{s.value}</p>
                <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TAB NAV ═══════ */}
      <div className="sticky top-28 z-30 bg-white border-b border-gray-200">
        <div className="max-w-[1320px] mx-auto px-4 flex gap-1 overflow-x-auto">
          {([
            { key: "overview", label: "Overview" },
            { key: "camps", label: "Camp Details" },
            { key: "finance", label: "Finance & Scale" },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-[3px] transition-colors ${
                activeTab === tab.key
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-400 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════ OVERVIEW TAB ═══════ */}
      {activeTab === "overview" && (
        <>
          {/* ── Executive KPIs ── */}
          <Section id="kpis">
            <SectionTitle light="Executive" bold="Dashboard" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Patients", value: <AnimatedCounter target={d.totalPatientsServed} />, sub: "Since May 2025", border: "border-t-primary-500" },
                { label: "Camps Conducted", value: <AnimatedCounter target={d.totalCampsConducted} />, sub: `Avg ${d.avgPatientsPerCamp.toLocaleString()} patients/camp`, border: "border-t-secondary-500" },
                { label: "Active Teams", value: <AnimatedCounter target={d.activeMedicalTeams} />, sub: `${d.estimatedWeeklyCapacity.toLocaleString()} patients/week`, border: "border-t-forest-500" },
                { label: "Total Spent (USD)", value: <AnimatedCounter target={d.totalSpendingSoFar / 1_000} prefix="$" suffix="K" decimals={0} />, sub: `~$${d.costPerPatient} per patient`, border: "border-t-primary-500" },
                { label: "Annual Capacity", value: <AnimatedCounter target={d.estimatedAnnualCapacity} />, sub: "With current 2 teams", border: "border-t-secondary-500" },
                { label: "Rural Coverage", value: <><AnimatedCounter target={RURAL_COVERAGE.coveredSoFar} /><span className="text-gray-400 text-lg font-normal">/{RURAL_COVERAGE.totalRuralMunicipalities}</span></>, sub: `${RURAL_COVERAGE.coveragePercent.toFixed(1)}% covered`, border: "border-t-forest-500" },
                { label: "Medicines Given", value: <AnimatedCounter target={IMPACT_METRICS.medicinesDistributed} />, sub: "90% of patients received", border: "border-t-primary-500" },
                { label: "Target Year", value: "2030", sub: "5-year national rollout", border: "border-t-secondary-500" },
              ].map((kpi) => (
                <div key={kpi.label} className={`bg-white rounded-xl border border-gray-200 border-t-4 ${kpi.border} p-5 hover:shadow-md transition-shadow`}>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2">{kpi.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{kpi.sub}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Rural Coverage Progress ── */}
          <Section id="coverage" className="bg-gray-50">
            <SectionTitle light="Rural Coverage" bold="Progress" />
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    <AnimatedCounter target={RURAL_COVERAGE.coveredSoFar} />{" "}
                    <span className="text-lg font-normal text-gray-500">of {RURAL_COVERAGE.totalRuralMunicipalities} Rural Municipalities</span>
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {RURAL_COVERAGE.coveragePercent.toFixed(1)}% coverage achieved — {RURAL_COVERAGE.totalRuralMunicipalities - RURAL_COVERAGE.coveredSoFar} remaining
                  </p>
                </div>
              </div>
              <ProgressBar value={RURAL_COVERAGE.coveredSoFar} max={RURAL_COVERAGE.totalRuralMunicipalities} color="bg-primary-500" height="h-4" />
            </div>
          </Section>

          {/* ── Province Distribution ── */}
          <Section id="provinces">
            <SectionTitle light="Province-wise" bold="Distribution" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {PROVINCE_SUMMARY.map((p) => {
                const maxPatients = Math.max(...PROVINCE_SUMMARY.map((x) => x.totalPatients));
                return (
                  <div key={p.province} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900">{p.province}</h3>
                      <span className="text-xs bg-primary-50 text-primary-600 border border-primary-200 px-2 py-0.5 rounded-full font-medium">
                        {p.campsCompleted} {p.campsCompleted === 1 ? "camp" : "camps"}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-0.5">{p.totalPatients.toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mb-3">patients served</p>
                    <ProgressBar value={p.totalPatients} max={maxPatients} color="bg-primary-500" height="h-2" showLabel={false} />
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.districts.map((dist) => (
                        <span key={dist} className="text-[11px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded border border-gray-100">{dist}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* ── Impact Metrics ── */}
          <Section id="impact" className="bg-gray-50">
            <SectionTitle light="Impact" bold="Metrics" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { label: "Total Patients", value: IMPACT_METRICS.totalPatientsServed, color: "text-primary-600", border: "border-t-primary-500" },
                { label: "Women (42%)", value: IMPACT_METRICS.womenBeneficiaries, color: "text-pink-600", border: "border-t-pink-500" },
                { label: "Children (10%)", value: IMPACT_METRICS.childrenBeneficiaries, color: "text-amber-600", border: "border-t-amber-500" },
                { label: "Referrals (5%)", value: IMPACT_METRICS.estimatedReferrals, color: "text-secondary-600", border: "border-t-secondary-500" },
                { label: "Medicines (90%)", value: IMPACT_METRICS.medicinesDistributed, color: "text-forest-600", border: "border-t-forest-500" },
              ].map((m) => (
                <div key={m.label} className={`bg-white rounded-xl border border-gray-200 border-t-4 ${m.border} p-5 text-center hover:shadow-md transition-shadow`}>
                  <p className={`text-2xl font-bold ${m.color}`}><AnimatedCounter target={m.value} /></p>
                  <p className="text-xs text-gray-500 mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Monthly Progress ── */}
          <Section id="monthly">
            <SectionTitle light="Monthly" bold="Progress" />
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-end gap-2 h-56 mb-4 px-2">
                {MONTHLY_TRACKER.map((m) => {
                  const maxP = Math.max(...MONTHLY_TRACKER.map((x) => x.patientsThisMonth));
                  const heightPct = (m.patientsThisMonth / maxP) * 100;
                  return (
                    <div key={m.month} className="flex-1 min-w-[50px] flex flex-col items-center gap-1">
                      <span className="text-[11px] font-semibold text-gray-700">{m.patientsThisMonth.toLocaleString()}</span>
                      <div className="w-full bg-primary-500 rounded-t-md transition-all duration-700" style={{ height: `${heightPct}%` }} />
                      <span className="text-[10px] text-gray-500 text-center leading-tight">{m.month.replace(" 20", " '")}</span>
                    </div>
                  );
                })}
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mt-2">
                <p className="text-sm font-medium text-gray-600 mb-3">Cumulative Patient Growth</p>
                <div className="flex items-end gap-1 h-16">
                  {MONTHLY_TRACKER.map((m, i) => {
                    const maxC = MONTHLY_TRACKER[MONTHLY_TRACKER.length - 1].cumulativePatients;
                    const pct = (m.cumulativePatients / maxC) * 100;
                    return (
                      <div key={m.month} className="flex-1 flex flex-col items-center gap-0.5">
                        <div className="w-full bg-secondary-400 rounded-t-sm" style={{ height: `${pct}%` }} />
                        {(i === 0 || i === MONTHLY_TRACKER.length - 1 || i === Math.floor(MONTHLY_TRACKER.length / 2)) && (
                          <span className="text-[9px] text-gray-400">{(m.cumulativePatients / 1000).toFixed(1)}K</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Section>

          {/* ── 5-Year Rollout ── */}
          <Section id="rollout" className="bg-gray-50">
            <SectionTitle light="5-Year" bold="Rollout Plan (2025–2030)" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FIVE_YEAR_ROLLOUT.map((yr) => {
                const maxCum = FIVE_YEAR_ROLLOUT[FIVE_YEAR_ROLLOUT.length - 1].cumulativePatients;
                const isCurrent = yr.year === 2026;
                return (
                  <div key={yr.year} className={`rounded-xl border p-5 transition-shadow hover:shadow-md ${isCurrent ? "bg-primary-50 border-primary-300" : "bg-white border-gray-200"}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`text-2xl font-bold ${isCurrent ? "text-primary-600" : "text-gray-900"}`}>{yr.year}</h3>
                      {isCurrent && <span className="text-xs bg-primary-500 text-white px-2.5 py-1 rounded-full font-medium">Current</span>}
                      {yr.year < 2026 && <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">Completed</span>}
                      {yr.year > 2026 && <span className="text-xs bg-gray-50 text-gray-500 border border-gray-200 px-2 py-0.5 rounded-full">Planned</span>}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Patients</span><span className="font-semibold text-gray-900">{yr.projectedPatients.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Camps</span><span className="font-semibold text-gray-900">{yr.projectedCamps}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Budget</span><span className="font-semibold text-gray-900">{formatUSD(yr.estimatedBudget)}</span></div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Cumulative</span>
                        <span>{yr.cumulativePatients.toLocaleString()} / {maxCum.toLocaleString()}</span>
                      </div>
                      <ProgressBar value={yr.cumulativePatients} max={maxCum} color={isCurrent ? "bg-primary-500" : "bg-secondary-400"} height="h-2" showLabel={false} />
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
          <Section id="camps-table">
            <SectionTitle light="Camp Master" bold="Log" />
            <p className="text-gray-500 text-sm mb-6">
              Comprehensive record of all {CAMP_MASTER_LOG.length} health camps conducted across Nepal. Click any row for details.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 font-semibold text-gray-600">Camp</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">Location</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">Date</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">Team</th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-right">Patients</th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-right">Referrals</th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-right">Cost (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {CAMP_MASTER_LOG.map((camp) => (
                    <tr key={camp.campId} onClick={() => setSelectedCamp(camp)} className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                      <td className="px-4 py-3 font-medium text-primary-600">{camp.campId}</td>
                      <td className="px-4 py-3">
                        <span className="font-medium text-gray-900">{camp.district}</span><br />
                        <span className="text-xs text-gray-500">{camp.ruralMunicipality}, {camp.province}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {new Date(camp.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${camp.teamAssigned === "Team A" ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-purple-50 text-purple-700 border border-purple-200"}`}>
                          {camp.teamAssigned}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">{camp.totalPatients.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-gray-600">{camp.referrals}</td>
                      <td className="px-4 py-3 text-right text-gray-600">{camp.totalCost.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 border-t-2 border-gray-200 font-bold">
                    <td className="px-4 py-3" colSpan={4}>TOTAL</td>
                    <td className="px-4 py-3 text-right text-primary-600">{CAMP_MASTER_LOG.reduce((s, c) => s + c.totalPatients, 0).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">{CAMP_MASTER_LOG.reduce((s, c) => s + c.referrals, 0).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">{CAMP_MASTER_LOG.reduce((s, c) => s + c.totalCost, 0).toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Section>

          {/* ── Camp Detail Modal ── */}
          {selectedCamp && (
            <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setSelectedCamp(null)}>
              <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="border-b border-gray-200 p-6 flex justify-between items-start">
                  <div>
                    <p className="text-xs text-primary-600 font-medium mb-1">{selectedCamp.campId}</p>
                    <h3 className="text-xl font-bold text-gray-900">{selectedCamp.district}</h3>
                    <p className="text-sm text-gray-500">{selectedCamp.ruralMunicipality}, {selectedCamp.province}</p>
                  </div>
                  <button onClick={() => setSelectedCamp(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none p-1">&times;</button>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xl font-bold text-primary-600">{selectedCamp.totalPatients.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wide mt-0.5">Patients</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xl font-bold text-secondary-600">{selectedCamp.referrals}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wide mt-0.5">Referrals</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xl font-bold text-forest-600">${selectedCamp.totalCost.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wide mt-0.5">Cost</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-6">
                    {[
                      { label: "Team", value: `${selectedCamp.teamAssigned} (${selectedCamp.teamSize} members)` },
                      { label: "Duration", value: `${selectedCamp.effectiveDays} days` },
                      { label: "Start Date", value: new Date(selectedCamp.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
                      { label: "End Date", value: new Date(selectedCamp.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
                      { label: "Doctors", value: selectedCamp.doctors },
                      { label: "Medicines", value: selectedCamp.medicinesDistributed.toLocaleString() },
                      { label: "Cost/Patient", value: `$${selectedCamp.costPerPatient}` },
                      { label: "Major Cases", value: selectedCamp.majorCases },
                    ].map((item) => (
                      <div key={item.label} className="py-2 border-b border-gray-100">
                        <p className="text-gray-400 text-xs">{item.label}</p>
                        <p className="font-medium text-gray-900">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2 font-medium">Gender &amp; Age Breakdown</p>
                    <div className="flex h-3 rounded-full overflow-hidden">
                      <div className="bg-blue-400" style={{ width: `${(selectedCamp.male / selectedCamp.totalPatients) * 100}%` }} />
                      <div className="bg-pink-400" style={{ width: `${(selectedCamp.female / selectedCamp.totalPatients) * 100}%` }} />
                      <div className="bg-amber-400" style={{ width: `${(selectedCamp.children / selectedCamp.totalPatients) * 100}%` }} />
                    </div>
                    <div className="flex gap-4 mt-2 text-xs text-gray-600">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400" />Male ({((selectedCamp.male / selectedCamp.totalPatients) * 100).toFixed(0)}%)</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-pink-400" />Female ({((selectedCamp.female / selectedCamp.totalPatients) * 100).toFixed(0)}%)</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" />Children ({((selectedCamp.children / selectedCamp.totalPatients) * 100).toFixed(0)}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Monthly Tracker Table ── */}
          <Section id="monthly-table" className="bg-gray-50">
            <SectionTitle light="Monthly" bold="Tracker" />
            <div className="overflow-x-auto rounded-xl border border-gray-200">
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
                    <tr key={m.month} className="border-t border-gray-100 hover:bg-gray-50 transition-colors bg-white">
                      <td className="px-4 py-3 font-medium text-gray-900">{m.month}</td>
                      <td className="px-4 py-3 text-right">{m.campsConducted}</td>
                      <td className="px-4 py-3 text-right font-semibold">{m.patientsThisMonth.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right"><span className="text-secondary-600 font-medium">{m.cumulativePatients.toLocaleString()}</span></td>
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
          <Section id="finance">
            <SectionTitle light="Financial" bold="Summary" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Total Spent So Far", value: <><AnimatedCounter target={FINANCIAL_SUMMARY.totalSpentSoFar / 1_000} prefix="$" decimals={0} suffix="K" /></>, sub: "Since May 2025", accent: "border-t-primary-500" },
                { label: "Projected Annual Budget", value: <><AnimatedCounter target={FINANCIAL_SUMMARY.projectedAnnualBudget / 1_000} prefix="$" decimals={0} suffix="K" /></>, sub: "With 2 active teams", accent: "border-t-secondary-500" },
                { label: "5-Year Budget (2026–2030)", value: <><AnimatedCounter target={FINANCIAL_SUMMARY.projected5YearBudget / 1_000_000} prefix="$" decimals={1} suffix="M" /></>, sub: "Full national rollout", accent: "border-t-forest-500" },
              ].map((card) => (
                <div key={card.label} className={`bg-white rounded-xl border border-gray-200 border-t-4 ${card.accent} p-6 hover:shadow-md transition-shadow`}>
                  <p className="text-sm text-gray-500 mb-1">{card.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-xs text-gray-400 mt-2">{card.sub}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gray-50 rounded-xl border border-gray-200 p-6">
              <p className="text-sm font-medium text-gray-600 mb-4">Yearly Budget Allocation</p>
              <div className="space-y-3">
                {FIVE_YEAR_ROLLOUT.map((yr) => {
                  const maxBudget = Math.max(...FIVE_YEAR_ROLLOUT.map((y) => y.estimatedBudget));
                  return (
                    <div key={yr.year} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700 w-10">{yr.year}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                        <div
                          className={`h-full rounded-full flex items-center px-3 text-xs text-white font-medium transition-all duration-700 ${yr.year <= 2026 ? "bg-primary-500" : "bg-secondary-400"}`}
                          style={{ width: `${(yr.estimatedBudget / maxBudget) * 100}%` }}
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

          <Section id="scaling" className="bg-gray-50">
            <SectionTitle light="Scaling" bold="Scenarios" />
            <p className="text-gray-500 text-sm mb-6">How fast can we cover all 460 rural municipalities with different team sizes?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SCALING_SCENARIOS.map((s) => {
                const isCurrent = s.teams === 2;
                return (
                  <div key={s.teams} className={`rounded-xl border p-6 transition-shadow hover:shadow-md ${isCurrent ? "bg-primary-50 border-primary-300" : "bg-white border-gray-200"}`}>
                    <div className="text-center mb-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold ${isCurrent ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-700"}`}>{s.teams}</div>
                      <p className="text-sm text-gray-500 mt-2">Medical Teams</p>
                    </div>
                    {isCurrent && <div className="text-center mb-3"><span className="text-xs bg-primary-500 text-white px-2.5 py-0.5 rounded-full">Current Setup</span></div>}
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Annual Capacity</span><span className="font-semibold">{s.annualCapacity.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Annual Budget</span><span className="font-semibold">{formatUSD(s.annualBudget)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Years to Complete</span><span className={`font-bold text-lg ${isCurrent ? "text-primary-600" : "text-gray-900"}`}>{s.yearsToComplete}</span></div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <ProgressBar value={1} max={s.yearsToComplete} color={isCurrent ? "bg-primary-500" : "bg-secondary-400"} height="h-1.5" showLabel={false} />
                      <p className="text-[10px] text-gray-400 mt-1 text-center">~{Math.ceil(460 / s.yearsToComplete)} municipalities/year</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>

          <Section id="efficiency">
            <SectionTitle light="Cost" bold="Efficiency" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Per-Camp Economics</h3>
                <div className="space-y-3">
                  {[
                    { label: "Avg Patients per Camp", value: EXECUTIVE_DASHBOARD.avgPatientsPerCamp.toLocaleString() },
                    { label: "Cost per Patient", value: `$${EXECUTIVE_DASHBOARD.costPerPatient.toLocaleString()}` },
                    { label: "Avg Cost per Camp", value: formatUSD(CAMP_MASTER_LOG.reduce((s, c) => s + c.totalCost, 0) / CAMP_MASTER_LOG.length) },
                    { label: "Avg Camp Duration", value: `${Math.round(CAMP_MASTER_LOG.reduce((s, c) => s + c.effectiveDays, 0) / CAMP_MASTER_LOG.length)} days` },
                    { label: "Doctors per Camp", value: "3" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600 text-sm">{item.label}</span>
                      <span className="font-semibold text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Team Performance</h3>
                <div className="space-y-6">
                  {["Team A", "Team B"].map((team) => {
                    const camps = CAMP_MASTER_LOG.filter((c) => c.teamAssigned === team);
                    const totalP = camps.reduce((s, c) => s + c.totalPatients, 0);
                    const avgP = Math.round(totalP / camps.length);
                    return (
                      <div key={team}>
                        <div className="flex justify-between items-center mb-2">
                          <span className={`px-2.5 py-0.5 rounded text-xs font-medium ${team === "Team A" ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-purple-50 text-purple-700 border border-purple-200"}`}>{team}</span>
                          <span className="text-sm text-gray-500">{camps.length} camps · {totalP.toLocaleString()} patients</span>
                        </div>
                        <ProgressBar value={totalP} max={EXECUTIVE_DASHBOARD.totalPatientsServed} color={team === "Team A" ? "bg-blue-500" : "bg-purple-500"} height="h-3" />
                        <p className="text-xs text-gray-400 mt-1">Avg: {avgP.toLocaleString()} patients/camp</p>
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
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-center">
          <p className="text-gray-500 text-sm">
            Data consolidated from Project Sanjeevani National Strategy, Master All-In-One, and Full System with 753 Palikas tracking workbooks.
          </p>
          <p className="text-gray-400 text-xs mt-2">Last updated: March 2026 · Nivaran Foundation</p>
        </div>
      </Section>
    </div>
  );
}
