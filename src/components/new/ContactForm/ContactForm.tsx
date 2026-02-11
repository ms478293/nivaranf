"use client";

import { AppButton } from "@/components/ui/app-button";
import { cn } from "@/lib/utils";
import { SendIcon } from "lucide-react";
import { useState } from "react";
import { submitContact } from "@/app/actions/submit-contact";

const ContactForm = ({ className }: { className?: string }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setStatusMessage("Please fill in all required fields.");
      return;
    }

    if (!formData.email.includes("@")) {
      setStatus("error");
      setStatusMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const res = await submitContact(formData);

      if (res.success) {
        setStatus("success");
        setStatusMessage(
          "Thank you for reaching out! We'll get back to you within 2-3 business days."
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setStatusMessage(
          res.error || "Something went wrong. Please try again later."
        );
      }
    } catch {
      setStatus("error");
      setStatusMessage(
        "An unexpected error occurred. Please try again later."
      );
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Send Us a Message
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Have a question or want to get involved? We&apos;d love to hear from
          you.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-main/20 focus:border-primary-main focus:bg-white transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-main/20 focus:border-primary-main focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="subject"
              className="text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-main/20 focus:border-primary-main focus:bg-white transition-colors"
            >
              <option value="">Select a topic</option>
              <option value="general">General Inquiry</option>
              <option value="donation">Donation Question</option>
              <option value="volunteer">Volunteer Opportunities</option>
              <option value="partnership">Partnership & Sponsorship</option>
              <option value="media">Media & Press</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="message"
              className="text-sm font-medium text-gray-700"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              rows={5}
              className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-main/20 focus:border-primary-main focus:bg-white transition-colors resize-none"
            />
          </div>

          {(status === "success" || status === "error") && (
            <p
              className={cn(
                "text-sm px-4 py-3 rounded-lg",
                status === "success"
                  ? "text-green-700 bg-green-50 border border-green-100"
                  : "text-red-600 bg-red-50 border border-red-100"
              )}
            >
              {statusMessage}
            </p>
          )}

          <AppButton
            type="submit"
            variant="primary"
            className="w-full sm:w-auto self-end px-8 py-2.5 text-sm font-medium flex items-center gap-2"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              "Sending..."
            ) : (
              <>
                Send Message
                <SendIcon className="w-4 h-4" />
              </>
            )}
          </AppButton>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
