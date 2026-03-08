"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  BadgeDollarSign,
  CalendarRange,
  Clock3,
  Gauge,
  HeartPulse,
  MapPinned,
  ShieldCheck,
  Stethoscope,
  Target,
  TrendingUp,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  CAMP_MASTER_LOG,
  EXECUTIVE_DASHBOARD,
  FIVE_YEAR_ROLLOUT,
  IMPACT_METRICS,
  MONTHLY_TRACKER,
  PROVINCE_SUMMARY,
  RURAL_COVERAGE,
  type CampRecord,
} from "@/content/sanjeevani-tracking-data";
import {
  CAPITAL_PHASE_PLAN,
  PHASE_ONE_OPERATING_PATH,
  REALISTIC_SCALING_SCENARIOS,
  SANJEEVANI_FINANCE_MODEL,
  VISION_MODEL_OPTIONS,
} from "@/content/sanjeevani-finance-model";

type TabKey = "overview" | "camps" | "finance";
type Tone = "primary" | "secondary" | "forest" | "amber" | "slate";

const toneStyles: Record<Tone, string> = {
  primary:
    "bg-[linear-gradient(135deg,#fff6f1_0%,#ffffff_65%)] border-primary-100 text-primary-600",
  secondary:
    "bg-[linear-gradient(135deg,#f3f8ff_0%,#ffffff_65%)] border-secondary-100 text-secondary-600",
  forest:
    "bg-[linear-gradient(135deg,#f5fbf5_0%,#ffffff_65%)] border-forest-100 text-forest-600",
  amber:
    "bg-[linear-gradient(135deg,#fff9ef_0%,#ffffff_65%)] border-amber-100 text-amber-600",
  slate:
    "bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_65%)] border-slate-200 text-slate-700",
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatDate(date: string) {
  return dateFormatter.format(new Date(date));
}

function formatUSD(amount: number) {
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toLocaleString("en-US")}`;
}

function formatUSDRange(low: number, high: number) {
  return `${formatUSD(low)} to ${formatUSD(high)}`;
}

function formatMonthLabel(month: string) {
  return month.replace(" 20", " '");
}

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
    const element = ref.current;
    if (!element) return;

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

    observer.observe(element);
    return () => observer.disconnect();
  }, [duration, target]);

  const formatted =
    decimals > 0
      ? count.toFixed(decimals)
      : Math.round(count).toLocaleString("en-US");

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

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
    <section id={id} className={`w-full px-4 py-8 md:py-10 ${className}`}>
      <div className="max-w-[1320px] mx-auto">{children}</div>
    </section>
  );
}

function SurfaceCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)] ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-full bg-[#eaf3ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary-700">
          <span className="h-2 w-2 rounded-full bg-secondary-500" />
          {eyebrow}
        </p>
        <h2 className="mt-3 text-2xl md:text-[34px] font-semibold leading-tight text-slate-900">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

function ProgressBar({
  value,
  max,
  color = "bg-primary-500",
  height = "h-3",
  showLabel = false,
}: {
  value: number;
  max: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
}) {
  const pct = max === 0 ? 0 : Math.min((value / max) * 100, 100);

  return (
    <div className="w-full">
      <div className={`overflow-hidden rounded-full bg-slate-100 ${height}`}>
        <div
          className={`${color} ${height} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel ? (
        <p className="mt-1 text-right text-xs text-slate-500">{pct.toFixed(1)}%</p>
      ) : null}
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  tone = "slate",
}: {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  detail: string;
  tone?: Tone;
}) {
  return (
    <SurfaceCard className={`border p-5 ${toneStyles[tone]}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            {label}
          </p>
          <div className="mt-3 text-3xl font-semibold leading-none text-slate-900">
            {value}
          </div>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.14)]">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{detail}</p>
    </SurfaceCard>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-3 last:border-b-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-semibold text-slate-900">{value}</span>
    </div>
  );
}

export default function SanjeevaniTrackingDashboard() {
  const [selectedCamp, setSelectedCamp] = useState<CampRecord | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const d = EXECUTIVE_DASHBOARD;
  const finance = SANJEEVANI_FINANCE_MODEL;
  const latestMonth = MONTHLY_TRACKER[MONTHLY_TRACKER.length - 1];
  const currentYear = PHASE_ONE_OPERATING_PATH.find((year) => year.year === 2026);
  const currentScenario = REALISTIC_SCALING_SCENARIOS.find(
    (scenario) => scenario.teams === d.activeMedicalTeams
  );
  const maxProvincePatients = Math.max(...PROVINCE_SUMMARY.map((province) => province.totalPatients));
  const maxMonthlyPatients = Math.max(...MONTHLY_TRACKER.map((month) => month.patientsThisMonth));
  const maxYearlyBudget = Math.max(...PHASE_ONE_OPERATING_PATH.map((year) => year.estimatedBudget));
  const latestCamps = CAMP_MASTER_LOG.slice(-4).reverse();
  const totalReferrals = CAMP_MASTER_LOG.reduce((sum, camp) => sum + camp.referrals, 0);
  const totalMedicines = CAMP_MASTER_LOG.reduce(
    (sum, camp) => sum + camp.medicinesDistributed,
    0
  );
  const averageCampCost =
    CAMP_MASTER_LOG.reduce((sum, camp) => sum + camp.totalCost, 0) /
    CAMP_MASTER_LOG.length;
  const averageCampDuration =
    CAMP_MASTER_LOG.reduce((sum, camp) => sum + camp.effectiveDays, 0) /
    CAMP_MASTER_LOG.length;
  const averageAllInCampCost = currentYear
    ? currentYear.estimatedBudget / currentYear.projectedCamps
    : finance.currentAnnualOperatingBudget.base / 24;

  return (
    <div className="bg-[linear-gradient(180deg,#ffffff_0%,#fbfcfe_35%,#f8fafc_100%)] font-Poppins">
      <section className="relative w-full overflow-hidden px-4 pb-8 pt-2 md:pb-10">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(44,119,187,0.14),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(235,88,52,0.16),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.12]">
          <Image
            src="/sanjeevani/sanjeevani-1.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center grayscale"
          />
        </div>

        <div className="max-w-[1320px] mx-auto">
          <SurfaceCard className="overflow-hidden bg-white/88 backdrop-blur-sm">
            <div className="relative grid gap-6 p-6 md:p-8 lg:grid-cols-[1.08fr_0.92fr] lg:p-10">
              <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-primary-200/40 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-secondary-200/40 blur-3xl" />

              <div className="relative">
                <p className="inline-flex items-center gap-2 rounded-full bg-[#fff1eb] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Field Intelligence
                </p>
                <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] md:text-5xl">
                  <span className="bg-[linear-gradient(110deg,#73c7d0_0%,#84a9b8_52%,#bc88b1_100%)] bg-clip-text text-transparent">
                    Project Sanjeevani
                  </span>
                  <span className="block bg-[linear-gradient(110deg,#ef876f_0%,#f2a286_38%,#d07393_100%)] bg-clip-text text-transparent">
                    Tracking Portal
                  </span>
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                  A single operational view for Project Sanjeevani: patient volume,
                  province coverage, camp execution, cost discipline, and rollout
                  readiness across Nepal.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                    <CalendarRange className="h-4 w-4 text-secondary-500" />
                    Reporting window: May 2025 to Feb 2026
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                    <ShieldCheck className="h-4 w-4 text-forest-500" />
                    16 verified camps logged
                  </div>
                </div>
              </div>

              <div className="relative grid gap-4">
                <div className="rounded-[26px] border border-[#d8e7e8] bg-[radial-gradient(circle_at_top_left,rgba(242,139,114,0.28),transparent_32%),radial-gradient(circle_at_82%_14%,rgba(144,213,219,0.42),transparent_34%),linear-gradient(140deg,#fff8f6_0%,#f6fcfd_38%,#edf7f9_70%,#f8f1f7_100%)] p-6 text-slate-900 shadow-[0_18px_40px_rgba(132,169,184,0.18)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                        Mission Status
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold">Phase I active</h2>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur-sm">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Live reporting
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-white/50 bg-white/50 p-4 backdrop-blur-sm">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                        Coverage
                      </p>
                      <p className="mt-2 text-3xl font-semibold">
                        {RURAL_COVERAGE.coveragePercent.toFixed(1)}%
                      </p>
                      <p className="mt-2 text-xs text-slate-600">
                        {RURAL_COVERAGE.coveredSoFar} of {RURAL_COVERAGE.totalRuralMunicipalities} rural municipalities
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/50 bg-white/50 p-4 backdrop-blur-sm">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                        Latest month
                      </p>
                      <p className="mt-2 text-3xl font-semibold">
                        {latestMonth.patientsThisMonth.toLocaleString("en-US")}
                      </p>
                      <p className="mt-2 text-xs text-slate-600">
                        patients served in {latestMonth.month}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <SurfaceCard className="p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Capacity
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      <AnimatedCounter target={d.estimatedWeeklyCapacity} />
                    </p>
                    <p className="mt-1 text-xs text-slate-500">patients per week at current setup</p>
                  </SurfaceCard>
                  <SurfaceCard className="p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      All-in cost
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      <AnimatedCounter
                        target={finance.fullyLoadedCostPerPatient.base}
                        prefix="$"
                        decimals={1}
                      />
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {`base-case delivery cost; variable clinical input remains about $${finance.variableClinicalCostPerPatient.base.toFixed(1)}`}
                    </p>
                  </SurfaceCard>
                  <SurfaceCard className="p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Rollout reality
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      {currentScenario?.yearsToComplete.toFixed(1)} yrs
                    </p>
                    <p className="mt-1 text-xs text-slate-500">to cover all rural municipalities with 2 teams</p>
                  </SurfaceCard>
                </div>
              </div>
            </div>
          </SurfaceCard>

          <div className="mt-5 grid grid-cols-2 gap-4 xl:grid-cols-4">
            <MetricCard
              icon={Users}
              label="Patients Served"
              value={<AnimatedCounter target={d.totalPatientsServed} />}
              detail="Live cumulative total from all completed camps."
              tone="primary"
            />
            <MetricCard
              icon={Activity}
              label="Health Camps"
              value={<AnimatedCounter target={d.totalCampsConducted} />}
              detail={`Average ${d.avgPatientsPerCamp.toLocaleString("en-US")} patients per camp.`}
              tone="secondary"
            />
            <MetricCard
              icon={MapPinned}
              label="Province Coverage"
              value={`${PROVINCE_SUMMARY.length}/7`}
              detail="Field footprint now spans every province in Nepal."
              tone="forest"
            />
            <MetricCard
              icon={Wallet}
              label="Total Investment"
              value={<AnimatedCounter target={d.totalSpendingSoFar / 1000} prefix="$" suffix="K" />}
              detail="Actual spend logged against patient and camp delivery."
              tone="amber"
            />
          </div>
        </div>
      </section>

      <div className="sticky top-28 z-30 border-y border-slate-200 bg-white/90 backdrop-blur-md shadow-[0_6px_18px_rgba(15,23,42,0.05)]">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-2">
            {([
              { key: "overview", label: "Overview" },
              { key: "camps", label: "Camp Operations" },
              { key: "finance", label: "Finance & Scale" },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-[linear-gradient(135deg,#f7c5b3_0%,#e6f4f6_50%,#c9dfe3_100%)] text-slate-900 shadow-[0_10px_24px_rgba(132,169,184,0.18)]"
                    : "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === "overview" ? (
        <>
          <Section id="mission-control">
            <SectionHeader
              eyebrow="Mission Control"
              title="Operational performance at a glance"
              description="The overview focuses on coverage, patient throughput, province distribution, and month-over-month execution using the current Sanjeevani field logs."
            />

            <div className="grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
              <SurfaceCard className="overflow-hidden p-6 md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      National rollout progress
                    </p>
                    <h3 className="mt-2 text-3xl font-semibold text-slate-900 md:text-[38px]">
                      {RURAL_COVERAGE.coveredSoFar} municipalities reached
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-7 text-slate-600">
                      Sanjeevani has operationally touched {RURAL_COVERAGE.coveredSoFar} rural municipalities.
                      {` ${RURAL_COVERAGE.totalRuralMunicipalities - RURAL_COVERAGE.coveredSoFar}`} remain for full rural coverage.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-5 py-4 text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Coverage achieved
                    </p>
                    <p className="mt-2 text-4xl font-semibold text-primary-600">
                      {RURAL_COVERAGE.coveragePercent.toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <ProgressBar
                    value={RURAL_COVERAGE.coveredSoFar}
                    max={RURAL_COVERAGE.totalRuralMunicipalities}
                    color="bg-[linear-gradient(90deg,#eb5834_0%,#2c77bb_100%)]"
                    height="h-4"
                    showLabel
                  />
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Weekly capacity
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      <AnimatedCounter target={d.estimatedWeeklyCapacity} />
                    </p>
                    <p className="mt-1 text-xs text-slate-500">patients per week</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Medicines delivered
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      <AnimatedCounter target={totalMedicines} />
                    </p>
                    <p className="mt-1 text-xs text-slate-500">90% of patients received medication</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Referral pipeline
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      <AnimatedCounter target={totalReferrals} />
                    </p>
                    <p className="mt-1 text-xs text-slate-500">patients escalated for follow-up care</p>
                  </div>
                </div>
              </SurfaceCard>

              <SurfaceCard className="p-6 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Delivery health
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  Current operating posture
                </h3>
                <div className="mt-6 space-y-4">
                  {[
                    {
                      label: "Active medical teams",
                      value: `${d.activeMedicalTeams}`,
                      detail: "Two field teams currently deployed.",
                      icon: Stethoscope,
                      tone: "primary" as Tone,
                    },
                    {
                      label: "Average duration",
                      value: `${Math.round(averageCampDuration)} days`,
                      detail: "Typical camp length under current logistics.",
                      icon: Clock3,
                      tone: "secondary" as Tone,
                    },
                    {
                      label: "Annual capacity",
                      value: d.estimatedAnnualCapacity.toLocaleString("en-US"),
                      detail: "Projected with current team count.",
                      icon: Gauge,
                      tone: "forest" as Tone,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`rounded-2xl border p-4 ${toneStyles[item.tone]}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                          <p className="mt-1 text-2xl font-semibold text-slate-900">
                            {item.value}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">{item.detail}</p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/85">
                          <item.icon className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <Target className="h-4 w-4 text-primary-500" />
                    2030 planning note
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    The current two-team model supports execution stability, but
                    national rural coverage requires planned scale-up beyond the
                    present operating footprint.
                  </p>
                </div>
              </SurfaceCard>
            </div>
          </Section>

          <Section id="field-pulse" className="pt-0">
            <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
              <SurfaceCard className="p-6 md:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Monthly pulse
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                      Patient throughput over time
                    </h3>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Latest month
                    </p>
                    <p className="mt-1 text-xl font-semibold text-slate-900">
                      {latestMonth.patientsThisMonth.toLocaleString("en-US")}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex h-64 items-end gap-2">
                  {MONTHLY_TRACKER.map((month) => {
                    const heightPercent = (month.patientsThisMonth / maxMonthlyPatients) * 100;
                    const isLatest = month.month === latestMonth.month;
                    return (
                      <div
                        key={month.month}
                        className="flex min-w-0 flex-1 flex-col items-center gap-2"
                      >
                        <span className="text-[10px] font-semibold text-slate-600">
                          {(month.patientsThisMonth / 1000).toFixed(1)}K
                        </span>
                        <div className="flex h-52 w-full items-end rounded-t-[22px] bg-slate-50 px-1.5 pt-2">
                          <div
                            className={`w-full rounded-t-[18px] transition-all duration-700 ${
                              isLatest
                                ? "bg-[linear-gradient(180deg,#eb5834_0%,#c93f20_100%)]"
                                : "bg-[linear-gradient(180deg,#2c77bb_0%,#1e4f7e_100%)]"
                            }`}
                            style={{ height: `${heightPercent}%` }}
                          />
                        </div>
                        <span className="text-center text-[10px] leading-tight text-slate-500">
                          {formatMonthLabel(month.month)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Camps in period
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      {MONTHLY_TRACKER.reduce((sum, month) => sum + month.campsConducted, 0)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Avg monthly patients
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      {d.avgPatientsPerMonth.toLocaleString("en-US")}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Cumulative total
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      {latestMonth.cumulativePatients.toLocaleString("en-US")}
                    </p>
                  </div>
                </div>
              </SurfaceCard>

              <SurfaceCard className="p-6 md:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Latest field activity
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                      Recent camps and handoff points
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("camps")}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
                  >
                    Open camp log
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-6 space-y-3">
                  {latestCamps.map((camp) => (
                    <button
                      key={camp.campId}
                      type="button"
                      onClick={() => setSelectedCamp(camp)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition-colors hover:border-primary-200 hover:bg-white"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-[#fff1eb] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-600">
                              {camp.campId}
                            </span>
                            <span className="rounded-full bg-[#eaf3ff] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary-700">
                              {camp.teamAssigned}
                            </span>
                          </div>
                          <h4 className="mt-3 text-lg font-semibold text-slate-900">
                            {camp.district}, {camp.province}
                          </h4>
                          <p className="mt-1 text-sm text-slate-500">
                            {camp.ruralMunicipality} • {formatDate(camp.startDate)} to {formatDate(camp.endDate)}
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-3 sm:min-w-[280px]">
                          <div className="rounded-2xl bg-white px-3 py-3 text-center">
                            <p className="text-lg font-semibold text-slate-900">
                              {camp.totalPatients.toLocaleString("en-US")}
                            </p>
                            <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">
                              Patients
                            </p>
                          </div>
                          <div className="rounded-2xl bg-white px-3 py-3 text-center">
                            <p className="text-lg font-semibold text-slate-900">
                              {camp.referrals}
                            </p>
                            <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">
                              Referrals
                            </p>
                          </div>
                          <div className="rounded-2xl bg-white px-3 py-3 text-center">
                            <p className="text-lg font-semibold text-slate-900">
                              {camp.effectiveDays}
                            </p>
                            <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">
                              Days
                            </p>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </SurfaceCard>
            </div>
          </Section>

          <Section id="geographic-footprint" className="pt-0">
            <SectionHeader
              eyebrow="Geographic Footprint"
              title="Province-by-province delivery"
              description="Coverage is spread across all seven provinces, with the heaviest concentration in Karnali and Sudurpashchim based on current camp execution."
            />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {PROVINCE_SUMMARY.map((province) => (
                <SurfaceCard key={province.province} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {province.province}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {province.campsCompleted} camp{province.campsCompleted === 1 ? "" : "s"}
                      </p>
                    </div>
                    <div className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                      {province.totalPatients.toLocaleString("en-US")}
                    </div>
                  </div>

                  <div className="mt-5">
                    <ProgressBar
                      value={province.totalPatients}
                      max={maxProvincePatients}
                      color="bg-[linear-gradient(90deg,#2c77bb_0%,#eb5834_100%)]"
                      height="h-2.5"
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {province.districts.map((district) => (
                      <span
                        key={district}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-600"
                      >
                        {district}
                      </span>
                    ))}
                  </div>
                </SurfaceCard>
              ))}
            </div>
          </Section>

          <Section id="impact-and-roadmap" className="pt-0">
            <div className="grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
              <SurfaceCard className="p-6 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Impact mix
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  Beneficiary and care composition
                </h3>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      label: "Women beneficiaries",
                      value: IMPACT_METRICS.womenBeneficiaries,
                      total: IMPACT_METRICS.totalPatientsServed,
                      color: "bg-pink-500",
                      tone: "Women (42%)",
                    },
                    {
                      label: "Children beneficiaries",
                      value: IMPACT_METRICS.childrenBeneficiaries,
                      total: IMPACT_METRICS.totalPatientsServed,
                      color: "bg-amber-500",
                      tone: "Children (10%)",
                    },
                    {
                      label: "Referral cases",
                      value: IMPACT_METRICS.estimatedReferrals,
                      total: IMPACT_METRICS.totalPatientsServed,
                      color: "bg-secondary-500",
                      tone: "Referrals (5%)",
                    },
                    {
                      label: "Medicines distributed",
                      value: IMPACT_METRICS.medicinesDistributed,
                      total: IMPACT_METRICS.totalPatientsServed,
                      color: "bg-forest-500",
                      tone: "Medicines (90%)",
                    },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="mb-2 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {metric.tone}
                          </p>
                          <p className="text-xs text-slate-500">{metric.label}</p>
                        </div>
                        <p className="text-sm font-semibold text-slate-900">
                          {metric.value.toLocaleString("en-US")}
                        </p>
                      </div>
                      <ProgressBar
                        value={metric.value}
                        max={metric.total}
                        color={metric.color}
                        height="h-3"
                        showLabel
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <HeartPulse className="h-4 w-4 text-primary-500" />
                    Care quality note
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Medication distribution remains high relative to total patient
                    volume, which suggests camps are addressing immediate treatment
                    needs alongside screening and referral.
                  </p>
                </div>
              </SurfaceCard>

              <SurfaceCard className="p-6 md:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Rollout roadmap
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                      Planned scaling path through 2030
                    </h3>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Current year
                    </p>
                    <p className="mt-1 text-xl font-semibold text-primary-600">2026</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {FIVE_YEAR_ROLLOUT.map((year) => {
                    const stateLabel =
                      year.year < 2026
                        ? "Completed"
                        : year.year === 2026
                          ? "Current"
                          : "Planned";

                    return (
                      <div
                        key={year.year}
                        className={`rounded-2xl border p-5 ${
                          year.year === 2026
                            ? "border-primary-200 bg-[linear-gradient(140deg,#fff5f1_0%,#ffffff_100%)]"
                            : "border-slate-200 bg-slate-50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-2xl font-semibold text-slate-900">{year.year}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">
                              {stateLabel}
                            </p>
                          </div>
                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                              year.year === 2026
                                ? "bg-primary-500 text-white"
                                : "bg-white text-slate-600"
                            }`}
                          >
                            {year.teams} team{year.teams === 1 ? "" : "s"}
                          </span>
                        </div>

                        <div className="mt-5 space-y-3">
                          <DetailRow
                            label="Projected patients"
                            value={year.projectedPatients.toLocaleString("en-US")}
                          />
                          <DetailRow label="Projected camps" value={year.projectedCamps} />
                          <DetailRow label="Estimated budget" value={formatUSD(year.estimatedBudget)} />
                        </div>

                        <div className="mt-4">
                          <p className="mb-2 text-xs uppercase tracking-[0.14em] text-slate-500">
                            Cumulative patient growth
                          </p>
                          <ProgressBar
                            value={year.cumulativePatients}
                            max={FIVE_YEAR_ROLLOUT[FIVE_YEAR_ROLLOUT.length - 1].cumulativePatients}
                            color={year.year === 2026 ? "bg-primary-500" : "bg-secondary-500"}
                            height="h-2.5"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SurfaceCard>
            </div>
          </Section>
        </>
      ) : null}

      {activeTab === "camps" ? (
        <>
          <Section id="camp-operations">
            <SectionHeader
              eyebrow="Camp Operations"
              title="Detailed execution log"
              description="This view focuses on the camp-by-camp record: where teams went, how long they operated, how many patients they served, and what the intervention cost."
            />

            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              <MetricCard
                icon={Users}
                label="Average Patients"
                value={d.avgPatientsPerCamp.toLocaleString("en-US")}
                detail="Average patient load per camp across current records."
                tone="primary"
              />
              <MetricCard
                icon={Clock3}
                label="Average Duration"
                value={`${Math.round(averageCampDuration)} days`}
                detail="Typical operating window per camp."
                tone="secondary"
              />
              <MetricCard
                icon={BadgeDollarSign}
                label="Average Cost"
                value={formatUSD(averageCampCost)}
                detail="Average direct spend per camp delivered."
                tone="amber"
              />
              <MetricCard
                icon={ShieldCheck}
                label="Total Referrals"
                value={totalReferrals.toLocaleString("en-US")}
                detail="Patients identified for additional follow-up care."
                tone="forest"
              />
            </div>
          </Section>

          <Section id="camp-log-table" className="pt-0">
            <SurfaceCard className="overflow-hidden">
              <div className="border-b border-slate-200 px-6 py-5">
                <h3 className="text-xl font-semibold text-slate-900">
                  Camp master log
                </h3>
                <p className="mt-1 text-sm leading-7 text-slate-600">
                  Click any row to open a field summary. Totals are calculated from the same underlying records used elsewhere in this portal.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[920px] text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      <th className="px-6 py-4 font-semibold text-slate-600">Camp</th>
                      <th className="px-6 py-4 font-semibold text-slate-600">Location</th>
                      <th className="px-6 py-4 font-semibold text-slate-600">Date Range</th>
                      <th className="px-6 py-4 font-semibold text-slate-600">Team</th>
                      <th className="px-6 py-4 text-right font-semibold text-slate-600">Patients</th>
                      <th className="px-6 py-4 text-right font-semibold text-slate-600">Referrals</th>
                      <th className="px-6 py-4 text-right font-semibold text-slate-600">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CAMP_MASTER_LOG.map((camp) => (
                      <tr
                        key={camp.campId}
                        onClick={() => setSelectedCamp(camp)}
                        className="cursor-pointer border-t border-slate-100 transition-colors hover:bg-slate-50"
                      >
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-[#fff1eb] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-600">
                            {camp.campId}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-900">{camp.district}</p>
                          <p className="mt-1 text-xs text-slate-500">
                            {camp.ruralMunicipality}, {camp.province}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {formatDate(camp.startDate)} to {formatDate(camp.endDate)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                              camp.teamAssigned === "Team A"
                                ? "bg-[#eaf3ff] text-secondary-700"
                                : "bg-[#f4f0ff] text-violet-700"
                            }`}
                          >
                            {camp.teamAssigned}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-semibold text-slate-900">
                          {camp.totalPatients.toLocaleString("en-US")}
                        </td>
                        <td className="px-6 py-4 text-right text-slate-600">
                          {camp.referrals}
                        </td>
                        <td className="px-6 py-4 text-right text-slate-600">
                          {formatUSD(camp.totalCost)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-slate-200 bg-slate-50 font-semibold">
                      <td className="px-6 py-4 text-slate-900" colSpan={4}>
                        Total
                      </td>
                      <td className="px-6 py-4 text-right text-primary-600">
                        {CAMP_MASTER_LOG.reduce((sum, camp) => sum + camp.totalPatients, 0).toLocaleString("en-US")}
                      </td>
                      <td className="px-6 py-4 text-right text-slate-900">
                        {totalReferrals.toLocaleString("en-US")}
                      </td>
                      <td className="px-6 py-4 text-right text-slate-900">
                        {formatUSD(CAMP_MASTER_LOG.reduce((sum, camp) => sum + camp.totalCost, 0))}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </SurfaceCard>
          </Section>

          <Section id="monthly-tracker-table" className="pt-0">
            <SurfaceCard className="overflow-hidden">
              <div className="border-b border-slate-200 px-6 py-5">
                <h3 className="text-xl font-semibold text-slate-900">
                  Monthly tracker
                </h3>
                <p className="mt-1 text-sm leading-7 text-slate-600">
                  Month-level aggregation for camps, patients, cumulative delivery, and budget spend.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      <th className="px-6 py-4 font-semibold text-slate-600">Month</th>
                      <th className="px-6 py-4 text-right font-semibold text-slate-600">Teams</th>
                      <th className="px-6 py-4 text-right font-semibold text-slate-600">Camps</th>
                      <th className="px-6 py-4 text-right font-semibold text-slate-600">Patients</th>
                      <th className="px-6 py-4 text-right font-semibold text-slate-600">Cumulative</th>
                      <th className="px-6 py-4 text-right font-semibold text-slate-600">Budget</th>
                      <th className="px-6 py-4 text-right font-semibold text-slate-600">Avg/Camp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MONTHLY_TRACKER.map((month) => (
                      <tr
                        key={month.month}
                        className="border-t border-slate-100 transition-colors hover:bg-slate-50"
                      >
                        <td className="px-6 py-4 font-semibold text-slate-900">
                          {month.month}
                        </td>
                        <td className="px-6 py-4 text-right text-slate-600">{month.teams}</td>
                        <td className="px-6 py-4 text-right text-slate-600">
                          {month.campsConducted}
                        </td>
                        <td className="px-6 py-4 text-right font-semibold text-slate-900">
                          {month.patientsThisMonth.toLocaleString("en-US")}
                        </td>
                        <td className="px-6 py-4 text-right text-secondary-700">
                          {month.cumulativePatients.toLocaleString("en-US")}
                        </td>
                        <td className="px-6 py-4 text-right text-slate-600">
                          {formatUSD(month.budgetSpent)}
                        </td>
                        <td className="px-6 py-4 text-right text-slate-600">
                          {month.avgPatientsPerCamp.toLocaleString("en-US")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SurfaceCard>
          </Section>
        </>
      ) : null}

      {activeTab === "finance" ? (
        <>
          <Section id="finance-summary">
            <SectionHeader
              eyebrow="Finance And Scale"
              title="Finance reality, not just camp spend"
              description="This view separates verified variable spend, fully loaded operating cost, the real Phase I operating path, and the later capital layers required for the larger Sanjeevani vision."
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                icon={Wallet}
                label="Verified Variable Spend"
                value={<AnimatedCounter target={d.totalSpendingSoFar / 1000} prefix="$" suffix="K" />}
                detail="Actual medicines and basic field-delivery spend logged from verified camps."
                tone="primary"
              />
              <MetricCard
                icon={TrendingUp}
                label="Current Annual OPEX"
                value={
                  <AnimatedCounter
                    target={finance.currentAnnualOperatingBudget.base / 1000}
                    prefix="$"
                    suffix="K"
                  />
                }
                detail="Base-case all-in budget for the current 2-team, ~50-staff operating model."
                tone="secondary"
              />
              <MetricCard
                icon={Target}
                label="Phase I Through 2030"
                value={
                  <AnimatedCounter
                    target={finance.phaseOneOperatingEnvelope.base / 1_000_000}
                    prefix="$"
                    suffix="M"
                    decimals={1}
                  />
                }
                detail="Realistic operating path for mobile outreach and scale through 2030, excluding hospital construction."
                tone="forest"
              />
              <MetricCard
                icon={BadgeDollarSign}
                label="Phase I + II Tranche"
                value={
                  <AnimatedCounter
                    target={finance.phaseOnePlusTwoTranche / 1_000_000}
                    prefix="$"
                    suffix="M"
                    decimals={0}
                  />
                }
                detail="A defensible fundraising tranche for operations, hubs, referral systems, and readiness, not the full project."
                tone="amber"
              />
            </div>

            <SurfaceCard className="mt-5 p-5 md:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Finance reset
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">
                    The old $7.5 number is only the variable clinical layer
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Tracked camp records still reflect medicine and basic consultation spend.
                    Fully loaded economics also include payroll, transport, field lodging,
                    equipment, admin, compliance, and contingency. That is why the annual
                    operating budget and all-in cost per patient now sit much higher than the
                    raw camp logs alone.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[360px]">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Variable clinical cost
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      {`$${finance.variableClinicalCostPerPatient.base.toFixed(1)}`}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      direct medicines and consumables per patient
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Fully loaded cost
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      {`$${finance.fullyLoadedCostPerPatient.base.toFixed(1)}`}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      base-case delivery cost per patient
                    </p>
                  </div>
                </div>
              </div>
            </SurfaceCard>
          </Section>

          <Section id="budget-ladder" className="pt-0">
            <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
              <SurfaceCard className="p-6 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Phase I operating path
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  Year-by-year fully loaded budget
                </h3>
                <div className="mt-6 space-y-4">
                  {PHASE_ONE_OPERATING_PATH.map((year) => (
                    <div key={year.year}>
                      <div className="mb-2 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{year.year}</p>
                          <p className="text-xs text-slate-500">
                            {year.projectedCamps} camps • {year.teams} team{year.teams === 1 ? "" : "s"}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-slate-900">
                          {formatUSD(year.estimatedBudget)}
                        </p>
                      </div>
                      <ProgressBar
                        value={year.estimatedBudget}
                        max={maxYearlyBudget}
                        color={year.year <= 2026 ? "bg-primary-500" : "bg-secondary-500"}
                        height="h-3"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <CalendarRange className="h-4 w-4 text-secondary-500" />
                    2026 reference point
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    The realistic 2026 base case assumes{" "}
                    {currentYear?.projectedPatients.toLocaleString("en-US")} patients,{" "}
                    {currentYear?.projectedCamps} camps, about{" "}
                    {currentScenario?.supportStaffFootprint} total staff supporting{" "}
                    {d.activeMedicalTeams} active field teams, and an all-in operating
                    budget of {currentYear ? formatUSD(currentYear.estimatedBudget) : "-"}.
                  </p>
                </div>
              </SurfaceCard>

              <SurfaceCard className="p-6 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Scaling scenarios
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  What team expansion really costs
                </h3>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {REALISTIC_SCALING_SCENARIOS.map((scenario) => {
                    const isCurrent = scenario.teams === d.activeMedicalTeams;

                    return (
                      <div
                        key={scenario.teams}
                        className={`rounded-2xl border p-5 ${
                          isCurrent
                            ? "border-primary-200 bg-[linear-gradient(140deg,#fff5f1_0%,#ffffff_100%)]"
                            : "border-slate-200 bg-slate-50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-2xl font-semibold text-slate-900">
                              {scenario.teams} teams
                            </p>
                            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">
                              {isCurrent ? "Current setup" : "Scenario"}
                            </p>
                          </div>
                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                              isCurrent
                                ? "bg-primary-500 text-white"
                                : "bg-white text-slate-600"
                            }`}
                          >
                            {scenario.municipalitiesPerYear}/yr
                          </span>
                        </div>

                        <div className="mt-5 space-y-3">
                          <DetailRow
                            label="Annual capacity"
                            value={scenario.annualCapacity.toLocaleString("en-US")}
                          />
                          <DetailRow
                            label="Fully loaded annual budget"
                            value={formatUSD(scenario.annualBudget)}
                          />
                          <DetailRow
                            label="Support footprint"
                            value={`~${scenario.supportStaffFootprint} staff`}
                          />
                          <DetailRow
                            label="Years to full rural coverage"
                            value={scenario.yearsToComplete.toFixed(1)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SurfaceCard>
            </div>
          </Section>

          <Section id="cost-efficiency" className="pt-0">
            <div className="grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
              <SurfaceCard className="p-6 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Unit economics
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  Variable versus fully loaded cost
                </h3>
                <div className="mt-6">
                  <DetailRow
                    label="Average patients per camp"
                    value={d.avgPatientsPerCamp.toLocaleString("en-US")}
                  />
                  <DetailRow
                    label="Variable clinical cost / patient"
                    value={formatUSDRange(
                      finance.variableClinicalCostPerPatient.low,
                      finance.variableClinicalCostPerPatient.high
                    )}
                  />
                  <DetailRow
                    label="Fully loaded cost / patient"
                    value={formatUSDRange(
                      finance.fullyLoadedCostPerPatient.low,
                      finance.fullyLoadedCostPerPatient.high
                    )}
                  />
                  <DetailRow
                    label="Tracked variable cost / camp"
                    value={formatUSD(averageCampCost)}
                  />
                  <DetailRow
                    label="Estimated all-in cost / camp"
                    value={formatUSD(averageAllInCampCost)}
                  />
                  <DetailRow
                    label="Average camp duration"
                    value={`${Math.round(averageCampDuration)} days`}
                  />
                  <DetailRow
                    label="Current operating footprint"
                    value={`~${finance.currentOperatingAssumptions.totalStaff} staff`}
                  />
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <Gauge className="h-4 w-4 text-primary-500" />
                    Finance reality
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    The old $7.5 figure only covers medicines and basic clinical consumables.
                    It does not include payroll, fleet, field lodging, admin, equipment, or
                    compliance. At the current two-team configuration, full rural coverage
                    would still take about {currentScenario?.yearsToComplete.toFixed(1)} years
                    without additional scale.
                  </p>
                </div>
              </SurfaceCard>

              <SurfaceCard className="p-6 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Capital reality
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  Later phases need their own capital strategy
                </h3>

                <div className="mt-6 space-y-6">
                  {CAPITAL_PHASE_PLAN.map((phase) => (
                    <div key={phase.phase} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                            {phase.phase}
                          </span>
                          <p className="mt-2 text-lg font-semibold text-slate-900">
                            {phase.title}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-slate-900">
                          {formatUSDRange(phase.budget.low, phase.budget.high)}
                        </p>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{phase.summary}</p>
                      <p className="mt-2 text-xs leading-6 text-slate-500">{phase.note}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-[linear-gradient(140deg,#fff8f6_0%,#ffffff_100%)] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Direct ownership vision
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      {formatUSDRange(
                        VISION_MODEL_OPTIONS.directOwnership.low,
                        VISION_MODEL_OPTIONS.directOwnership.high
                      )}
                    </p>
                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      If Nivaran directly owns and funds the hospital network and the central
                      referral hospital.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-[linear-gradient(140deg,#f7fbff_0%,#ffffff_100%)] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Partnership model
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      {formatUSDRange(
                        VISION_MODEL_OPTIONS.partnershipModel.low,
                        VISION_MODEL_OPTIONS.partnershipModel.high
                      )}
                    </p>
                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      If Nivaran directly funds Phase I and II, then co-finances later
                      hospitals with government, philanthropy, or PPP partners.
                    </p>
                  </div>
                </div>
              </SurfaceCard>
            </div>
          </Section>
        </>
      ) : null}

      {selectedCamp ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[linear-gradient(180deg,rgba(132,169,184,0.38),rgba(196,109,158,0.28))] p-4 backdrop-blur-sm"
          onClick={() => setSelectedCamp(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[32px] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-t-[32px] border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(44,119,187,0.16),transparent_35%),radial-gradient(circle_at_90%_10%,rgba(235,88,52,0.18),transparent_35%),linear-gradient(140deg,#f8fbff_0%,#ffffff_60%,#fff8f4_100%)] p-6 md:p-8">
              <button
                type="button"
                onClick={() => setSelectedCamp(null)}
                aria-label="Close camp details"
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:text-slate-900"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="pr-12">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#fff1eb] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-600">
                    {selectedCamp.campId}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                      selectedCamp.teamAssigned === "Team A"
                        ? "bg-[#eaf3ff] text-secondary-700"
                        : "bg-[#f4f0ff] text-violet-700"
                    }`}
                  >
                    {selectedCamp.teamAssigned}
                  </span>
                </div>
                <h3 className="mt-4 text-3xl font-semibold text-slate-900">
                  {selectedCamp.district}, {selectedCamp.province}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {selectedCamp.ruralMunicipality} • {formatDate(selectedCamp.startDate)} to{" "}
                  {formatDate(selectedCamp.endDate)}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  {
                    label: "Patients",
                    value: selectedCamp.totalPatients.toLocaleString("en-US"),
                    tone: "primary" as Tone,
                  },
                  {
                    label: "Referrals",
                    value: selectedCamp.referrals.toLocaleString("en-US"),
                    tone: "secondary" as Tone,
                  },
                  {
                    label: "Medicines",
                    value: selectedCamp.medicinesDistributed.toLocaleString("en-US"),
                    tone: "forest" as Tone,
                  },
                  {
                    label: "Cost",
                    value: formatUSD(selectedCamp.totalCost),
                    tone: "amber" as Tone,
                  },
                ].map((item) => (
                  <div key={item.label} className={`rounded-2xl border p-4 ${toneStyles[item.tone]}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <SurfaceCard className="p-5">
                  <h4 className="text-lg font-semibold text-slate-900">
                    Operations detail
                  </h4>
                  <div className="mt-4">
                    <DetailRow
                      label="Team size"
                      value={`${selectedCamp.teamSize} members`}
                    />
                    <DetailRow label="Doctors" value={selectedCamp.doctors} />
                    <DetailRow
                      label="Effective days"
                      value={`${selectedCamp.effectiveDays} days`}
                    />
                    <DetailRow
                      label="Variable cost per patient"
                      value={`$${selectedCamp.costPerPatient.toFixed(1)}`}
                    />
                    <DetailRow label="Major cases" value={selectedCamp.majorCases} />
                  </div>
                </SurfaceCard>

                <SurfaceCard className="p-5">
                  <h4 className="text-lg font-semibold text-slate-900">
                    Demographic breakdown
                  </h4>
                  <div className="mt-5 overflow-hidden rounded-full">
                    <div className="flex h-4">
                      <div
                        className="bg-secondary-500"
                        style={{
                          width: `${(selectedCamp.male / selectedCamp.totalPatients) * 100}%`,
                        }}
                      />
                      <div
                        className="bg-pink-500"
                        style={{
                          width: `${(selectedCamp.female / selectedCamp.totalPatients) * 100}%`,
                        }}
                      />
                      <div
                        className="bg-amber-500"
                        style={{
                          width: `${(selectedCamp.children / selectedCamp.totalPatients) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      {
                        label: "Male",
                        value: selectedCamp.male,
                        color: "bg-secondary-500",
                      },
                      {
                        label: "Female",
                        value: selectedCamp.female,
                        color: "bg-pink-500",
                      },
                      {
                        label: "Children",
                        value: selectedCamp.children,
                        color: "bg-amber-500",
                      },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center gap-2">
                          <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                          <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                        </div>
                        <p className="mt-3 text-2xl font-semibold text-slate-900">
                          {item.value.toLocaleString("en-US")}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {((item.value / selectedCamp.totalPatients) * 100).toFixed(0)}% of total patients
                        </p>
                      </div>
                    ))}
                  </div>
                </SurfaceCard>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Section id="footer-note" className="pb-10 pt-2">
        <SurfaceCard className="p-6 text-center">
          <p className="text-sm leading-7 text-slate-600">
            Data consolidated from Project Sanjeevani planning and tracking workbooks used for field execution reporting.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Last updated: March 2026 • Nivaran Foundation
          </p>
        </SurfaceCard>
      </Section>
    </div>
  );
}
