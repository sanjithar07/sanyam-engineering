import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  LogOut, Mail, Phone, Building2, Clock, Trash2,
  CheckCircle2, MessageSquare, RefreshCw,
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const TOKEN_KEY = "sanyam_admin_token";

// ── Login Screen ──────────────────────────────────────────────────────────────
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API}/admin/login`, { email, password });
      localStorage.setItem(TOKEN_KEY, res.data.token);
      onLogin(res.data.token);
      toast.success("Welcome back.");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <form onSubmit={submit} data-testid="admin-login-form" className="w-full max-w-sm card-dark rounded-sm p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 border border-[#C5A059]/50 rotate-45 flex items-center justify-center">
            <div className="w-4 h-4 bg-[#C5A059]" />
          </div>
          <div>
            <div className="font-display text-white text-lg">SANYAM</div>
            <div className="font-mono-caps text-[10px] text-[#C5A059]">Admin Console</div>
          </div>
        </div>
        <label className="block mb-5">
          <span className="font-mono-caps text-[10px] text-neutral-500 block mb-1">Email</span>
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            data-testid="login-email"
            className="w-full bg-transparent border-b border-white/15 focus:border-[#C5A059] outline-none py-2.5 text-white"
          />
        </label>
        <label className="block mb-8">
          <span className="font-mono-caps text-[10px] text-neutral-500 block mb-1">Password</span>
          <input
            type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            data-testid="login-password"
            className="w-full bg-transparent border-b border-white/15 focus:border-[#C5A059] outline-none py-2.5 text-white"
          />
        </label>
        <button
          type="submit" disabled={loading} data-testid="login-submit"
          className="btn-gold w-full py-3 text-sm font-semibold tracking-wider rounded-sm disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

// ── Dashboard ─────────────────────────────────────────────────────────────────
const Dashboard = ({ token, onLogout }) => {
  const [quotes, setQuotes] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, closed: 0 });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");

  const auth = { headers: { Authorization: `Bearer ${token}` } };

  const load = async () => {
    setLoading(true);
    try {
      const [q, s] = await Promise.all([
        axios.get(`${API}/admin/quotes`, auth),
        axios.get(`${API}/admin/stats`, auth),
      ]);
      setQuotes(q.data);
      setStats(s.data);
    } catch (err) {
      if (err?.response?.status === 401) onLogout();
      else toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []); // eslint-disable-line

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/admin/quotes/${id}`, { status }, auth);
      toast.success(`Marked as ${status}`);
      load();
      if (selected?.id === id) setSelected({ ...selected, status });
    } catch {
      toast.error("Failed to update status");
    }
  };

  const del = async (id) => {
    if (!window.confirm("Delete this quote permanently?")) return;
    try {
      await axios.delete(`${API}/admin/quotes/${id}`, auth);
      toast.success("Quote deleted");
      setSelected(null);
      load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const filtered = filter === "all" ? quotes : quotes.filter((q) => q.status === filter);

  const StatusPill = ({ s }) => {
    const styles = {
      new: "bg-[#C5A059]/15 text-[#C5A059] border-[#C5A059]/30",
      contacted: "bg-blue-400/15 text-blue-300 border-blue-400/30",
      closed: "bg-neutral-500/15 text-neutral-400 border-neutral-500/30",
    };
    return (
      <span className={`px-2 py-0.5 text-[10px] font-mono-caps border rounded-sm ${styles[s] || ""}`}>
        {s}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-white/5 px-6 lg:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-[#C5A059]/50 rotate-45 flex items-center justify-center">
            <div className="w-3 h-3 bg-[#C5A059]" />
          </div>
          <div>
            <div className="font-display text-white text-base">SANYAM ADMIN</div>
            <div className="font-mono-caps text-[9px] text-[#C5A059]">Quote Inquiries</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={load} data-testid="refresh-btn"
            className="btn-outline-gold px-4 py-2 text-xs rounded-sm inline-flex items-center gap-2">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={onLogout} data-testid="logout-btn"
            className="btn-outline-gold px-4 py-2 text-xs rounded-sm inline-flex items-center gap-2">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Quotes", value: stats.total, color: "text-white" },
            { label: "New", value: stats.new, color: "gold-text" },
            { label: "Contacted", value: stats.contacted, color: "text-blue-300" },
            { label: "Closed", value: stats.closed, color: "text-neutral-400" },
          ].map(({ label, value, color }) => (
            <div key={label} className="border border-white/10 p-5 rounded-sm bg-[#0f0f11]">
              <div className="font-mono-caps text-[10px] text-neutral-500 mb-2">{label}</div>
              <div className={`font-display text-4xl ${color}`}>{value}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {["all", "new", "contacted", "closed"].map((s) => (
            <button
              key={s} onClick={() => setFilter(s)} data-testid={`filter-${s}`}
              className={`px-4 py-2 text-xs font-mono-caps rounded-sm border transition-colors ${
                filter === s
                  ? "border-[#C5A059] text-[#C5A059] bg-[#C5A059]/10"
                  : "border-white/10 text-neutral-400 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Table + Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Quote list */}
          <div className="lg:col-span-7 border border-white/5 rounded-sm bg-[#0f0f11] overflow-hidden">
            <div className="grid grid-cols-12 px-5 py-3 border-b border-white/5 font-mono-caps text-[10px] text-neutral-500">
              <div className="col-span-4">Name / Company</div>
              <div className="col-span-4">Contact</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Date</div>
            </div>
            {loading ? (
              <div className="p-10 text-center text-neutral-500 text-sm">Loading…</div>
            ) : filtered.length === 0 ? (
              <div className="p-10 text-center text-neutral-500 text-sm">No quotes found.</div>
            ) : (
              filtered.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setSelected(q)}
                  data-testid={`quote-row-${q.id}`}
                  className={`w-full grid grid-cols-12 px-5 py-4 border-b border-white/5 text-left hover:bg-white/[0.02] transition-colors ${
                    selected?.id === q.id ? "bg-[#C5A059]/5" : ""
                  }`}
                >
                  <div className="col-span-4">
                    <div className="text-sm text-white">{q.name}</div>
                    <div className="text-xs text-neutral-500">{q.company || "—"}</div>
                  </div>
                  <div className="col-span-4 text-xs text-neutral-400">
                    <div>{q.email}</div>
                    <div>{q.phone}</div>
                  </div>
                  <div className="col-span-2"><StatusPill s={q.status} /></div>
                  <div className="col-span-2 text-right text-xs text-neutral-500">
                    {new Date(q.created_at).toLocaleDateString()}
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-5">
            {selected ? (
              <div data-testid="quote-detail" className="border border-white/5 rounded-sm bg-[#0f0f11] p-6 sticky top-6">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="font-mono-caps text-[10px] text-[#C5A059] mb-1">Quote #{selected.id.slice(0, 8)}</div>
                    <h3 className="font-display text-white text-2xl">{selected.name}</h3>
                    <div className="text-sm text-neutral-400">{selected.company || "—"}</div>
                  </div>
                  <StatusPill s={selected.status} />
                </div>
                <div className="space-y-3 text-sm">
                  <Row icon={<Mail size={14} />} v={selected.email} />
                  <Row icon={<Phone size={14} />} v={selected.phone} />
                  {selected.industry && <Row icon={<Building2 size={14} />} v={selected.industry} />}
                  <Row icon={<Clock size={14} />} v={new Date(selected.created_at).toLocaleString()} />
                </div>
                <div className="mt-5">
                  <div className="font-mono-caps text-[10px] text-neutral-500 mb-2 flex items-center gap-2">
                    <MessageSquare size={12} /> Message
                  </div>
                  <div className="text-sm text-neutral-300 whitespace-pre-wrap leading-relaxed bg-[#0a0a0a] border border-white/5 p-4 rounded-sm">
                    {selected.message}
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <button onClick={() => updateStatus(selected.id, "new")} data-testid="status-new-btn"
                    className="px-3 py-2 text-[11px] font-mono-caps border border-[#C5A059]/30 text-[#C5A059] rounded-sm hover:bg-[#C5A059]/10">
                    New
                  </button>
                  <button onClick={() => updateStatus(selected.id, "contacted")} data-testid="status-contacted-btn"
                    className="px-3 py-2 text-[11px] font-mono-caps border border-blue-400/30 text-blue-300 rounded-sm hover:bg-blue-400/10">
                    Contacted
                  </button>
                  <button onClick={() => updateStatus(selected.id, "closed")} data-testid="status-closed-btn"
                    className="px-3 py-2 text-[11px] font-mono-caps border border-white/10 text-neutral-400 rounded-sm hover:bg-white/5 inline-flex items-center gap-1">
                    <CheckCircle2 size={12} /> Closed
                  </button>
                  <button onClick={() => del(selected.id)} data-testid="delete-quote-btn"
                    className="ml-auto px-3 py-2 text-[11px] font-mono-caps border border-red-500/30 text-red-400 rounded-sm hover:bg-red-500/10 inline-flex items-center gap-1">
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
                <a
                  href={`mailto:${selected.email}?subject=Re: Your quote request to Sanyam Engineering`}
                  className="btn-gold mt-5 w-full py-3 text-xs font-semibold tracking-wider rounded-sm inline-flex items-center justify-center gap-2"
                >
                  Reply via Email
                </a>
              </div>
            ) : (
              <div className="border border-dashed border-white/10 rounded-sm p-10 text-center text-neutral-500 text-sm">
                Select a quote to view details.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const Row = ({ icon, v }) => (
  <div className="flex items-center gap-3 text-neutral-300">
    <span className="text-[#C5A059]">{icon}</span>
    <span>{v}</span>
  </div>
);

// ── Main Export ───────────────────────────────────────────────────────────────
export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };
  if (!token) return <Login onLogin={setToken} />;
  return <Dashboard token={token} onLogout={logout} />;
}
