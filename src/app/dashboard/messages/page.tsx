"use client";

import {
  deleteMessage,
  getMessages,
  type MessageRecord,
  updateMessageStatus,
} from "@/app/actions/messages";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  Filter,
  Inbox,
  Loader2,
  Mail,
  MailCheck,
  MailOpen,
  MessageSquareReply,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";

type Category = "all" | "contact" | "csr" | "local-partner";
type Status = "all" | "unread" | "read" | "replied";

function categorize(msg: MessageRecord): "contact" | "csr" | "local-partner" {
  const sub = (msg.subject || "").toLowerCase();
  const body = (msg.message || "").toLowerCase();
  if (sub.includes("local partner") || body.includes("local fundraising partner")) {
    return "local-partner";
  }
  if (sub.includes("csr") || body.includes("csr partnership")) {
    return "csr";
  }
  return "contact";
}

const categoryLabels: Record<string, string> = {
  all: "All Messages",
  contact: "Contact",
  csr: "CSR Inquiry",
  "local-partner": "Local Partner",
};

const statusColors: Record<string, string> = {
  unread: "bg-blue-100 text-blue-700",
  read: "bg-gray-100 text-gray-600",
  replied: "bg-green-100 text-green-700",
};

const categoryColors: Record<string, string> = {
  contact: "bg-slate-100 text-slate-700",
  csr: "bg-purple-100 text-purple-700",
  "local-partner": "bg-orange-100 text-orange-700",
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Category>("all");
  const [statusFilter, setStatusFilter] = useState<Status>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError("");
    const res = await getMessages();
    if (res.error) {
      setError(res.error);
    }
    setMessages(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filtered = useMemo(() => {
    return messages.filter((msg) => {
      const cat = categorize(msg);
      if (categoryFilter !== "all" && cat !== categoryFilter) return false;
      if (statusFilter !== "all" && msg.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          msg.name.toLowerCase().includes(q) ||
          msg.email.toLowerCase().includes(q) ||
          (msg.subject || "").toLowerCase().includes(q) ||
          msg.message.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [messages, categoryFilter, statusFilter, search]);

  const counts = useMemo(() => {
    const c = { all: messages.length, contact: 0, csr: 0, "local-partner": 0, unread: 0 };
    messages.forEach((m) => {
      c[categorize(m)]++;
      if (m.status === "unread") c.unread++;
    });
    return c;
  }, [messages]);

  const handleStatusChange = async (id: string, status: "unread" | "read" | "replied") => {
    setActionLoading(id);
    const res = await updateMessageStatus(id, status);
    if (res.success) {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status } : m))
      );
    }
    setActionLoading(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message permanently?")) return;
    setActionLoading(id);
    const res = await deleteMessage(id);
    if (res.success) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (expandedId === id) setExpandedId(null);
    }
    setActionLoading(null);
  };

  return (
    <div className="font-Poppins">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Inbox className="w-6 h-6" />
            Messages & Submissions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {counts.unread} unread · {counts.all} total
          </p>
        </div>
        <button
          onClick={fetchMessages}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#eb5834]/20 focus:border-[#eb5834] transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
            </button>
          )}
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-slate-500" />
          {(["all", "contact", "csr", "local-partner"] as Category[]).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  categoryFilter === cat
                    ? "bg-[#eb5834] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {categoryLabels[cat]}
                {cat !== "all" && (
                  <span className="ml-1 opacity-70">
                    ({counts[cat]})
                  </span>
                )}
              </button>
            )
          )}
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-1.5">
          {(["all", "unread", "read", "replied"] as Status[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                statusFilter === s
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 mb-4">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16 text-slate-500">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          Loading messages...
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-16 text-slate-500">
          <Mail className="w-10 h-10 mx-auto mb-3 text-slate-300" />
          <p className="font-medium">No messages found</p>
          <p className="text-sm mt-1">
            {search || categoryFilter !== "all" || statusFilter !== "all"
              ? "Try adjusting your filters."
              : "Submissions will appear here when someone fills out a form."}
          </p>
        </div>
      )}

      {/* Messages list */}
      {!loading && filtered.length > 0 && (
        <div className="space-y-2">
          {filtered.map((msg) => {
            const cat = categorize(msg);
            const isExpanded = expandedId === msg.id;
            const isActing = actionLoading === msg.id;
            const isUnread = msg.status === "unread";

            return (
              <div
                key={msg.id}
                className={`rounded-xl border transition-colors ${
                  isUnread
                    ? "border-blue-200 bg-blue-50/40"
                    : "border-slate-200 bg-white"
                }`}
              >
                {/* Row Header */}
                <button
                  onClick={() => {
                    setExpandedId(isExpanded ? null : msg.id);
                    // Auto-mark as read when opening
                    if (!isExpanded && msg.status === "unread") {
                      handleStatusChange(msg.id, "read");
                    }
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                >
                  {/* Unread dot */}
                  <div className="flex-shrink-0 w-2">
                    {isUnread && (
                      <span className="block w-2 h-2 rounded-full bg-blue-500" />
                    )}
                  </div>

                  {/* Name & email */}
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm truncate ${isUnread ? "font-semibold text-slate-900" : "font-medium text-slate-700"}`}>
                      {msg.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{msg.email}</p>
                  </div>

                  {/* Subject */}
                  <p className="hidden md:block text-sm text-slate-600 truncate max-w-[280px] flex-1">
                    {msg.subject || "—"}
                  </p>

                  {/* Badges */}
                  <span className={`hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${categoryColors[cat]}`}>
                    {categoryLabels[cat]}
                  </span>
                  <span className={`hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${statusColors[msg.status] || statusColors.unread}`}>
                    {msg.status}
                  </span>

                  {/* Date */}
                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    {new Date(msg.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year:
                        new Date(msg.created_at).getFullYear() !==
                        new Date().getFullYear()
                          ? "numeric"
                          : undefined,
                    })}
                  </span>

                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-slate-100">
                    {/* Mobile badges */}
                    <div className="flex gap-2 mt-3 sm:hidden">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${categoryColors[cat]}`}>
                        {categoryLabels[cat]}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${statusColors[msg.status] || statusColors.unread}`}>
                        {msg.status}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-slate-500">From:</span>{" "}
                        <span className="text-slate-900 font-medium">{msg.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Email:</span>{" "}
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-[#2c77bb] hover:underline"
                        >
                          {msg.email}
                        </a>
                      </div>
                      <div>
                        <span className="text-slate-500">Date:</span>{" "}
                        <span className="text-slate-700">
                          {new Date(msg.created_at).toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    {msg.subject && (
                      <p className="mt-2 text-sm">
                        <span className="text-slate-500">Subject:</span>{" "}
                        <span className="font-medium text-slate-900">
                          {msg.subject}
                        </span>
                      </p>
                    )}

                    {/* Message body */}
                    <div className="mt-3 p-4 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-800 whitespace-pre-wrap leading-relaxed max-h-[400px] overflow-y-auto">
                      {msg.message}
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.status !== "unread" && (
                        <ActionBtn
                          icon={<Mail className="w-3.5 h-3.5" />}
                          label="Mark Unread"
                          loading={isActing}
                          onClick={() => handleStatusChange(msg.id, "unread")}
                        />
                      )}
                      {msg.status !== "read" && (
                        <ActionBtn
                          icon={<MailOpen className="w-3.5 h-3.5" />}
                          label="Mark Read"
                          loading={isActing}
                          onClick={() => handleStatusChange(msg.id, "read")}
                        />
                      )}
                      {msg.status !== "replied" && (
                        <ActionBtn
                          icon={<MessageSquareReply className="w-3.5 h-3.5" />}
                          label="Mark Replied"
                          loading={isActing}
                          onClick={() => handleStatusChange(msg.id, "replied")}
                        />
                      )}
                      <ActionBtn
                        icon={<Eye className="w-3.5 h-3.5" />}
                        label="Reply via Email"
                        onClick={() => window.open(`mailto:${msg.email}?subject=Re: ${msg.subject || "Your Inquiry"}`)}
                      />
                      <ActionBtn
                        icon={<Trash2 className="w-3.5 h-3.5" />}
                        label="Delete"
                        loading={isActing}
                        variant="danger"
                        onClick={() => handleDelete(msg.id)}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Stats row */}
      {!loading && messages.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {(
            [
              { label: "Total", count: counts.all, icon: <Inbox className="w-4 h-4" /> },
              { label: "Unread", count: counts.unread, icon: <Mail className="w-4 h-4" /> },
              { label: "Contact", count: counts.contact, icon: <MailCheck className="w-4 h-4" /> },
              { label: "CSR", count: counts.csr, icon: <MailCheck className="w-4 h-4" /> },
              { label: "Local Partner", count: counts["local-partner"], icon: <MailCheck className="w-4 h-4" /> },
            ] as const
          ).map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm"
            >
              <span className="text-slate-400">{stat.icon}</span>
              <span className="text-slate-500">{stat.label}:</span>
              <span className="font-semibold text-slate-900">{stat.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ActionBtn({
  icon,
  label,
  loading,
  variant,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  loading?: boolean;
  variant?: "danger";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 ${
        variant === "danger"
          ? "border border-red-200 bg-white text-red-600 hover:bg-red-50"
          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : icon}
      {label}
    </button>
  );
}
