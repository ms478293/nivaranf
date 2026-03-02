"use client";

import { submitLocalPartner, type LocalPartnerData, type TeamMember } from "@/app/actions/submit-local-partner";
import { uploadTeamPhoto } from "@/app/actions/upload-team-photo";
import { AppButton } from "@/components/ui/app-button";
import { Camera, Loader2, Plus, Send, Trash2, Upload, Users } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import Image from "next/image";

const groupTypes = [
  "High School Club / Organization",
  "College / University Group",
  "Youth Group",
  "Community Group",
  "Religious Organization",
  "Neighborhood Association",
  "Sports Team / Athletic Club",
  "Cultural / Ethnic Organization",
  "Parent-Teacher Association (PTA)",
  "Other",
];

const eventTypeOptions = [
  "Bake Sale / Food Sale",
  "Fun Run / Walkathon",
  "Charity Dinner / Gala",
  "Talent Show / Performance",
  "Car Wash",
  "Raffle / Auction",
  "Community Fair / Festival",
  "Online Fundraiser (GoFundMe, etc.)",
  "Sports Tournament",
  "Cultural Event",
  "Awareness Campaign",
  "Other",
];

const fundRanges = [
  "Under $500",
  "$500 - $1,000",
  "$1,000 - $2,500",
  "$2,500 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
];

const expenseOptions = [
  "10% or less",
  "10-15%",
  "15-20%",
  "20% (maximum allowed)",
];

const memberCountOptions = [
  "2-5 members",
  "6-10 members",
  "11-20 members",
  "21-50 members",
  "50+ members",
];

type FormState = Omit<LocalPartnerData, "teamMembers"> & {
  teamMembers: TeamMember[];
};

const initialState: FormState = {
  groupName: "",
  groupType: "",
  city: "",
  state: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  socialMediaLink: "",
  memberCount: "",
  hasAdultAdvisor: false,
  advisorName: "",
  advisorEmail: "",
  advisorPhone: "",
  eventTypes: [],
  eventDescription: "",
  estimatedFundsToRaise: "",
  expensePercentage: "",
  proposedDate: "",
  eventLocation: "",
  teamMembers: [],
  agreedToTerms: false,
  agreedExpensePolicy: false,
  additionalNotes: "",
};

export function LocalPartnerForm() {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [pendingMember, setPendingMember] = useState<{ name: string; role: string }>({ name: "", role: "" });
  const [uploading, setUploading] = useState(false);

  const completion = useMemo(() => {
    const required = [
      formData.groupName,
      formData.groupType,
      formData.city,
      formData.state,
      formData.contactName,
      formData.contactEmail,
      formData.contactPhone,
      formData.eventDescription,
      formData.estimatedFundsToRaise,
      formData.expensePercentage,
      formData.eventTypes.length ? "yes" : "",
      formData.teamMembers.length ? "yes" : "",
      formData.agreedToTerms ? "yes" : "",
      formData.agreedExpensePolicy ? "yes" : "",
    ];
    const filled = required.filter(Boolean).length;
    return Math.round((filled / required.length) * 100);
  }, [formData]);

  const updateField = (name: keyof FormState, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value as never }));
    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  };

  const toggleEventType = (value: string) => {
    setFormData((prev) => {
      const exists = prev.eventTypes.includes(value);
      return {
        ...prev,
        eventTypes: exists
          ? prev.eventTypes.filter((item) => item !== value)
          : [...prev.eventTypes, value],
      };
    });
    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith("image/")) {
      setStatus("error");
      setMessage("Please upload an image file (JPG, PNG, etc.).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setStatus("error");
      setMessage("Image must be under 5MB.");
      return;
    }

    if (!pendingMember.name.trim()) {
      setStatus("error");
      setMessage("Please enter the member name before uploading a photo.");
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await uploadTeamPhoto(fd);
      if (res.error) {
        setStatus("error");
        setMessage(res.error);
      } else if (res.url) {
        addTeamMember(res.url);
      }
    } catch {
      setStatus("error");
      setMessage("Failed to upload photo. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const addTeamMember = (photoUrl: string = "") => {
    if (!pendingMember.name.trim()) return;
    setFormData((prev) => ({
      ...prev,
      teamMembers: [
        ...prev.teamMembers,
        {
          name: pendingMember.name.trim(),
          role: pendingMember.role.trim() || "Member",
          photoUrl,
        },
      ],
    }));
    setPendingMember({ name: "", role: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeTeamMember = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      // Photos are already uploaded to Supabase Storage — URLs are real
      const res = await submitLocalPartner(formData);
      if (res.success) {
        setStatus("success");
        setMessage(
          "Your application has been submitted successfully! Check your email for a confirmation. Our team will contact you within 3-5 business days."
        );
        setFormData(initialState);
      } else {
        setStatus("error");
        setMessage(res.error || "Unable to submit your application right now.");
      }
    } catch {
      setStatus("error");
      setMessage("Unexpected error occurred. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="w-full rounded-3xl border border-emerald-200 bg-emerald-50 shadow-sm p-8 md:p-12 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-semibold text-emerald-800 mb-3">
          Application Submitted!
        </h3>
        <p className="text-emerald-700 max-w-lg mx-auto mb-6">
          {message}
        </p>
        <AppButton
          variant="primary"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
        >
          Submit Another Application
        </AppButton>
      </div>
    );
  }

  return (
    <div className="w-full rounded-3xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
            Local Partner Application
          </h3>
          <span className="text-xs font-medium text-slate-500">
            {completion}% complete
          </span>
        </div>
        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#eb5834] via-[#2c77bb] to-[#2aa89a] transition-all duration-500"
            style={{ width: `${completion}%` }}
          />
        </div>
        <p className="text-sm text-slate-600">
          Tell us about your group, event plans, and team. All fields marked with <span className="text-red-500">*</span> are required.
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* ----- Section 1: Group Information ----- */}
        <section>
          <SectionTitle number={1} title="Group Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FieldLabel label="Group / Organization Name" required>
              <input
                type="text"
                value={formData.groupName}
                onChange={(e) => updateField("groupName", e.target.value)}
                placeholder="e.g. Lincoln High School Service Club"
                className={inputClass}
              />
            </FieldLabel>
            <FieldLabel label="Group Type" required>
              <select
                value={formData.groupType}
                onChange={(e) => updateField("groupType", e.target.value)}
                className={inputClass}
              >
                <option value="">Select group type</option>
                {groupTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </FieldLabel>
            <FieldLabel label="City" required>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => updateField("city", e.target.value)}
                placeholder="e.g. Boston"
                className={inputClass}
              />
            </FieldLabel>
            <FieldLabel label="State" required>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => updateField("state", e.target.value)}
                placeholder="e.g. Massachusetts"
                className={inputClass}
              />
            </FieldLabel>
            <FieldLabel label="Number of Members">
              <select
                value={formData.memberCount}
                onChange={(e) => updateField("memberCount", e.target.value)}
                className={inputClass}
              >
                <option value="">Select range</option>
                {memberCountOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </FieldLabel>
            <FieldLabel label="Social Media Link (Instagram, etc.)">
              <input
                type="text"
                value={formData.socialMediaLink}
                onChange={(e) => updateField("socialMediaLink", e.target.value)}
                placeholder="https://instagram.com/yourgroup"
                className={inputClass}
              />
            </FieldLabel>
          </div>
        </section>

        {/* ----- Section 2: Contact Information ----- */}
        <section>
          <SectionTitle number={2} title="Contact Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FieldLabel label="Your Full Name" required>
              <input
                type="text"
                value={formData.contactName}
                onChange={(e) => updateField("contactName", e.target.value)}
                placeholder="Jane Smith"
                className={inputClass}
              />
            </FieldLabel>
            <FieldLabel label="Email Address" required>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => updateField("contactEmail", e.target.value)}
                placeholder="jane@email.com"
                className={inputClass}
              />
            </FieldLabel>
            <FieldLabel label="Phone Number" required>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => updateField("contactPhone", e.target.value)}
                placeholder="+1 555 000 0000"
                className={inputClass}
              />
            </FieldLabel>
          </div>

          {/* Adult Advisor */}
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={formData.hasAdultAdvisor}
                onChange={(e) => updateField("hasAdultAdvisor", e.target.checked)}
                className="mt-1"
              />
              <span>
                Our group has an <strong>adult advisor or sponsor</strong> (recommended for high school groups)
              </span>
            </label>
            {formData.hasAdultAdvisor && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                <FieldLabel label="Advisor Name">
                  <input
                    type="text"
                    value={formData.advisorName}
                    onChange={(e) => updateField("advisorName", e.target.value)}
                    placeholder="Mr. / Ms. Full Name"
                    className={inputClass}
                  />
                </FieldLabel>
                <FieldLabel label="Advisor Email">
                  <input
                    type="email"
                    value={formData.advisorEmail}
                    onChange={(e) => updateField("advisorEmail", e.target.value)}
                    placeholder="advisor@school.edu"
                    className={inputClass}
                  />
                </FieldLabel>
                <FieldLabel label="Advisor Phone">
                  <input
                    type="tel"
                    value={formData.advisorPhone}
                    onChange={(e) => updateField("advisorPhone", e.target.value)}
                    placeholder="+1 555 000 0000"
                    className={inputClass}
                  />
                </FieldLabel>
              </div>
            )}
          </div>
        </section>

        {/* ----- Section 3: Event & Fundraising Plan ----- */}
        <section>
          <SectionTitle number={3} title="Event & Fundraising Plan" />
          <div className="space-y-4 mt-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-2">
                Type of Event(s) <span className="text-red-500">*</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {eventTypeOptions.map((option) => {
                  const active = formData.eventTypes.includes(option);
                  return (
                    <button
                      type="button"
                      key={option}
                      onClick={() => toggleEventType(option)}
                      className={`px-3 py-2 rounded-full text-sm border transition-colors ${
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldLabel label="Estimated Funds to Raise" required>
                <select
                  value={formData.estimatedFundsToRaise}
                  onChange={(e) => updateField("estimatedFundsToRaise", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select range</option>
                  {fundRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </FieldLabel>
              <FieldLabel label="Expense Allocation (% kept for costs)" required>
                <select
                  value={formData.expensePercentage}
                  onChange={(e) => updateField("expensePercentage", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select percentage</option>
                  {expenseOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </FieldLabel>
              <FieldLabel label="Proposed Event Date">
                <input
                  type="date"
                  value={formData.proposedDate}
                  onChange={(e) => updateField("proposedDate", e.target.value)}
                  className={inputClass}
                />
              </FieldLabel>
              <FieldLabel label="Event Location / Venue">
                <input
                  type="text"
                  value={formData.eventLocation}
                  onChange={(e) => updateField("eventLocation", e.target.value)}
                  placeholder="e.g. School Gymnasium, Community Center"
                  className={inputClass}
                />
              </FieldLabel>
            </div>

            <FieldLabel label="Describe Your Event Plan" required>
              <textarea
                value={formData.eventDescription}
                onChange={(e) => updateField("eventDescription", e.target.value)}
                rows={4}
                placeholder="Tell us about your event idea, who will attend, how you'll promote it, and any special plans to engage your community."
                className={inputClass}
              />
            </FieldLabel>
          </div>
        </section>

        {/* ----- Section 4: Team Members (with photos) ----- */}
        <section>
          <SectionTitle number={4} title="Your Team" />
          <p className="text-sm text-slate-600 mt-1 mb-4">
            Add each team member with their name, role, and a photo. At least one member is required. <span className="text-red-500">*</span>
          </p>

          {/* Existing Members Grid */}
          {formData.teamMembers.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
              {formData.teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="relative group border border-slate-200 rounded-xl p-3 text-center bg-slate-50"
                >
                  <button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    aria-label={`Remove ${member.name}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  {member.photoUrl && member.photoUrl !== "(photo uploaded)" ? (
                    <div className="w-16 h-16 mx-auto rounded-full overflow-hidden mb-2 border-2 border-slate-200">
                      <Image
                        src={member.photoUrl}
                        alt={member.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 mx-auto rounded-full bg-slate-200 flex items-center justify-center mb-2">
                      <Users className="w-6 h-6 text-slate-400" />
                    </div>
                  )}
                  <p className="text-sm font-medium text-slate-800 truncate">{member.name}</p>
                  <p className="text-xs text-slate-500 truncate">{member.role}</p>
                </div>
              ))}
            </div>
          )}

          {/* Add New Member */}
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/50">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
              <FieldLabel label="Member Name">
                <input
                  type="text"
                  value={pendingMember.name}
                  onChange={(e) => setPendingMember((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="First Last"
                  className={inputClass}
                />
              </FieldLabel>
              <FieldLabel label="Role in Group">
                <input
                  type="text"
                  value={pendingMember.role}
                  onChange={(e) => setPendingMember((prev) => ({ ...prev, role: e.target.value }))}
                  placeholder="e.g. President, Volunteer, etc."
                  className={inputClass}
                />
              </FieldLabel>
              <div className="flex gap-2">
                <label
                  className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 cursor-pointer hover:border-slate-300 transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}
                  title="Upload photo & add member"
                >
                  {uploading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">{uploading ? "Uploading..." : "Photo & Add"}</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => addTeamMember()}
                  disabled={!pendingMember.name.trim() || uploading}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#eb5834] text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#d44e2d] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add (no photo)</span>
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Upload a photo of the member (optional, max 5MB). Click &quot;Add&quot; to add without photo.
            </p>
          </div>
        </section>

        {/* ----- Section 5: Additional Notes ----- */}
        <section>
          <SectionTitle number={5} title="Additional Notes" />
          <div className="mt-4">
            <FieldLabel label="Anything else we should know?">
              <textarea
                value={formData.additionalNotes}
                onChange={(e) => updateField("additionalNotes", e.target.value)}
                rows={3}
                placeholder="Any special requirements, questions, or additional context about your group or event."
                className={inputClass}
              />
            </FieldLabel>
          </div>
        </section>

        {/* ----- Agreements ----- */}
        <section className="space-y-3 bg-slate-50 rounded-xl p-4 border border-slate-200">
          <h4 className="text-sm font-semibold text-slate-900">Agreements</h4>
          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={formData.agreedToTerms}
              onChange={(e) => updateField("agreedToTerms", e.target.checked)}
              className="mt-1"
            />
            <span>
              I confirm that I am authorized to represent this group and that all information provided is accurate. I understand Nivaran Foundation will review this application and may contact us. <span className="text-red-500">*</span>
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={formData.agreedExpensePolicy}
              onChange={(e) => updateField("agreedExpensePolicy", e.target.checked)}
              className="mt-1"
            />
            <span>
              I agree that our group will retain <strong>no more than 20%</strong> of funds raised to cover event expenses, and <strong>all remaining funds will be transferred directly</strong> to Nivaran Foundation&apos;s account. <span className="text-red-500">*</span>
            </span>
          </label>
        </section>

        {/* Status Message */}
        {status === "error" && (
          <p className="rounded-xl px-4 py-3 text-sm bg-red-50 border border-red-200 text-red-700">
            {message}
          </p>
        )}

        {/* Submit */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          <p className="text-xs text-slate-500">
            Questions? Email partnerships@nivaranfoundation.org
          </p>
          <AppButton type="submit" variant="primary" disabled={status === "loading"}>
            {status === "loading" ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                Submit Application
                <Send className="w-4 h-4" />
              </span>
            )}
          </AppButton>
        </div>
      </form>
    </div>
  );
}

// --- Helper Components ---

function SectionTitle({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#eb5834] text-white text-sm font-semibold">
        {number}
      </span>
      <h4 className="text-lg font-semibold text-slate-900">{title}</h4>
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
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#eb5834]/20 focus:border-[#eb5834] focus:bg-white transition-colors";
