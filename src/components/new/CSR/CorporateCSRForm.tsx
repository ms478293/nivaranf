"use client";

import { submitCSRInquiry } from "@/app/actions/submit-csr-inquiry";
import { AppButton } from "@/components/ui/app-button";
import { Loader2, Send } from "lucide-react";
import { useMemo, useState } from "react";

type CSRFormState = {
  fullName: string;
  workEmail: string;
  jobTitle: string;
  phone: string;
  companyName: string;
  companyWebsite: string;
  companyType: string;
  headquartersCountry: string;
  operatingRegions: string;
  employeeCount: string;
  annualCSRBudget: string;
  partnershipModels: string[];
  focusAreas: string[];
  implementationTimeline: string;
  objective: string;
  additionalNotes: string;
  consent: boolean;
};

const initialState: CSRFormState = {
  fullName: "",
  workEmail: "",
  jobTitle: "",
  phone: "",
  companyName: "",
  companyWebsite: "",
  companyType: "",
  headquartersCountry: "",
  operatingRegions: "",
  employeeCount: "",
  annualCSRBudget: "",
  partnershipModels: [],
  focusAreas: [],
  implementationTimeline: "",
  objective: "",
  additionalNotes: "",
  consent: false,
};

const companyTypes = [
  "Corporate (Public)",
  "Corporate (Private)",
  "MNC / Global Enterprise",
  "SME / Mid-Market",
  "Foundation / Philanthropic Trust",
  "NGO / Social Enterprise",
  "Educational Institution",
  "Industry Association",
  "Other",
];

const budgetBands = [
  "Under $25,000",
  "$25,000 - $100,000",
  "$100,000 - $500,000",
  "$500,000 - $1M",
  "$1M+",
  "To be discussed",
];

const employeeBands = [
  "1-50",
  "51-200",
  "201-1000",
  "1001-5000",
  "5000+",
];

const timelineOptions = [
  "Immediate (0-30 days)",
  "Near Term (1-3 months)",
  "This Fiscal Year",
  "Next Fiscal Year",
  "Exploratory Discussion",
];

const partnershipModelOptions = [
  "Strategic CSR Program",
  "Program Sponsorship",
  "Employee Engagement / Volunteering",
  "Payroll Giving / Matched Giving",
  "Cause Marketing Campaign",
  "In-Kind / Technical Support",
  "Emergency Response Partnership",
];

const focusAreaOptions = [
  "Primary Healthcare Access",
  "Maternal & Child Health",
  "Nutrition & Preventive Care",
  "Rural Health Camps",
  "Water, Sanitation & Hygiene",
  "School Health Programs",
  "Emergency Health Response",
  "Health Workforce Capacity Building",
];

export function CorporateCSRForm() {
  const [formData, setFormData] = useState<CSRFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const completion = useMemo(() => {
    const required = [
      formData.fullName,
      formData.workEmail,
      formData.companyName,
      formData.companyType,
      formData.implementationTimeline,
      formData.objective,
      formData.consent ? "yes" : "",
      formData.partnershipModels.length ? "yes" : "",
      formData.focusAreas.length ? "yes" : "",
    ];
    const filled = required.filter(Boolean).length;
    return Math.round((filled / required.length) * 100);
  }, [formData]);

  const updateField = (name: keyof CSRFormState, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value as never }));
    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  };

  const toggleArrayField = (
    field: "partnershipModels" | "focusAreas",
    value: string
  ) => {
    setFormData((prev) => {
      const exists = prev[field].includes(value);
      return {
        ...prev,
        [field]: exists
          ? prev[field].filter((item) => item !== value)
          : [...prev[field], value],
      };
    });
    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await submitCSRInquiry(formData);
      if (res.success) {
        setStatus("success");
        setMessage(
          "CSR inquiry submitted successfully. Our partnerships team will contact you within 2-3 business days."
        );
        setFormData(initialState);
      } else {
        setStatus("error");
        setMessage(res.error || "Unable to submit your CSR inquiry right now.");
      }
    } catch {
      setStatus("error");
      setMessage("Unexpected error occurred while submitting your inquiry.");
    }
  };

  return (
    <div className="w-full rounded-3xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
            Start Your CSR Partnership
          </h3>
          <span className="text-xs font-medium text-slate-500">
            Application completion: {completion}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#eb5834] via-[#2c77bb] to-[#2aa89a] transition-all duration-300"
            style={{ width: `${completion}%` }}
          />
        </div>
        <p className="text-sm text-slate-600">
          Share your CSR priorities and partnership goals. We will map a
          high-integrity execution plan and impact reporting path.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldLabel label="Full Name" required>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              placeholder="Jane Doe"
              className={inputClass}
            />
          </FieldLabel>
          <FieldLabel label="Work Email" required>
            <input
              type="email"
              value={formData.workEmail}
              onChange={(e) => updateField("workEmail", e.target.value)}
              placeholder="jane@company.com"
              className={inputClass}
            />
          </FieldLabel>
          <FieldLabel label="Job Title">
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => updateField("jobTitle", e.target.value)}
              placeholder="CSR Lead / Sustainability Director"
              className={inputClass}
            />
          </FieldLabel>
          <FieldLabel label="Phone / WhatsApp">
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+1 555 000 0000"
              className={inputClass}
            />
          </FieldLabel>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldLabel label="Company Name" required>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              placeholder="Company / Organization name"
              className={inputClass}
            />
          </FieldLabel>
          <FieldLabel label="Company Type" required>
            <select
              value={formData.companyType}
              onChange={(e) => updateField("companyType", e.target.value)}
              className={inputClass}
            >
              <option value="">Select company type</option>
              {companyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </FieldLabel>
          <FieldLabel label="Company Website">
            <input
              type="text"
              value={formData.companyWebsite}
              onChange={(e) => updateField("companyWebsite", e.target.value)}
              placeholder="https://www.company.com"
              className={inputClass}
            />
          </FieldLabel>
          <FieldLabel label="Headquarters Country">
            <input
              type="text"
              value={formData.headquartersCountry}
              onChange={(e) => updateField("headquartersCountry", e.target.value)}
              placeholder="United States, Nepal, UK, etc."
              className={inputClass}
            />
          </FieldLabel>
          <FieldLabel label="Operating Regions">
            <input
              type="text"
              value={formData.operatingRegions}
              onChange={(e) => updateField("operatingRegions", e.target.value)}
              placeholder="US, Europe, APAC, South Asia"
              className={inputClass}
            />
          </FieldLabel>
          <FieldLabel label="Employee Count">
            <select
              value={formData.employeeCount}
              onChange={(e) => updateField("employeeCount", e.target.value)}
              className={inputClass}
            >
              <option value="">Select employee range</option>
              {employeeBands.map((band) => (
                <option key={band} value={band}>
                  {band}
                </option>
              ))}
            </select>
          </FieldLabel>
          <FieldLabel label="Annual CSR / Social Impact Budget">
            <select
              value={formData.annualCSRBudget}
              onChange={(e) => updateField("annualCSRBudget", e.target.value)}
              className={inputClass}
            >
              <option value="">Select budget range</option>
              {budgetBands.map((band) => (
                <option key={band} value={band}>
                  {band}
                </option>
              ))}
            </select>
          </FieldLabel>
          <FieldLabel label="Implementation Timeline" required>
            <select
              value={formData.implementationTimeline}
              onChange={(e) => updateField("implementationTimeline", e.target.value)}
              className={inputClass}
            >
              <option value="">Select timeline</option>
              {timelineOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FieldLabel>
        </section>

        <section className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-900">
            Preferred Partnership Models <span className="text-red-500">*</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {partnershipModelOptions.map((option) => {
              const active = formData.partnershipModels.includes(option);
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => toggleArrayField("partnershipModels", option)}
                  className={`px-3 py-2 rounded-full text-sm border transition ${
                    active
                      ? "border-[#eb5834] bg-[#fff1ec] text-[#bf431f]"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-900">
            Priority Focus Areas <span className="text-red-500">*</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {focusAreaOptions.map((option) => {
              const active = formData.focusAreas.includes(option);
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => toggleArrayField("focusAreas", option)}
                  className={`px-3 py-2 rounded-full text-sm border transition ${
                    active
                      ? "border-[#2c77bb] bg-[#edf5ff] text-[#1f5e97]"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4">
          <FieldLabel label="What is your core CSR objective with Nivaran?" required>
            <textarea
              value={formData.objective}
              onChange={(e) => updateField("objective", e.target.value)}
              rows={4}
              placeholder="Describe the social outcome you want to drive, timeline expectations, and internal success KPIs."
              className={inputClass}
            />
          </FieldLabel>
          <FieldLabel label="Additional Notes">
            <textarea
              value={formData.additionalNotes}
              onChange={(e) => updateField("additionalNotes", e.target.value)}
              rows={3}
              placeholder="Compliance requirements, due diligence needs, reporting cadence, or country-specific details."
              className={inputClass}
            />
          </FieldLabel>
        </section>

        <label className="flex items-start gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={formData.consent}
            onChange={(e) => updateField("consent", e.target.checked)}
            className="mt-1"
          />
          <span>
            I confirm this inquiry is submitted on behalf of my organization and I
            agree to be contacted regarding partnership opportunities and due
            diligence requirements. <span className="text-red-500">*</span>
          </span>
        </label>

        {(status === "success" || status === "error") && (
          <p
            className={`rounded-xl px-4 py-3 text-sm ${
              status === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {message}
          </p>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-slate-500">
            For immediate coordination: partnerships@nivaranfoundation.org
          </p>
          <AppButton type="submit" variant="primary" disabled={status === "loading"}>
            {status === "loading" ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                Submit CSR Inquiry
                <Send className="w-4 h-4" />
              </span>
            )}
          </AppButton>
        </div>
      </form>
    </div>
  );
}

function FieldLabel({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-slate-800">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#eb5834]/20 focus:border-[#eb5834] focus:bg-white transition";

