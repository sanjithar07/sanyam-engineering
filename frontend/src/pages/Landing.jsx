import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Cog, Factory, Flame, Droplet, Car, Pill, FlaskConical, Wind,
  ArrowUpRight, ShieldCheck, Layers, Gauge, Sparkles, Phone, Mail, MapPin,
  Download, Menu, X, CheckCircle2, Send, MessageCircle,
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const MEDIA = {
  heroVideo: "https://websites.godaddy.com/categories/v4/videos/raw/video/uA41GmyyG8IMaxXdb",
  heroPoster: "https://img1.wsimg.com/isteam/videos/uA41GmyyG8IMaxXdb",
  precisionGear: "https://static.prod-images.emergentagent.com/jobs/d9d77106-0a0b-4e99-abec-d4130f02b750/images/057e2d8bc931087f4c050fe8f79ac14ec07da870fe4165c190e04c469e01ce55.png",
  cncSparks: "https://static.prod-images.emergentagent.com/jobs/d9d77106-0a0b-4e99-abec-d4130f02b750/images/e4b023789e17fb467ad5d0d0da57e1d6466acba959e24749ab6ef11fd6ace192.png",
  machine: "https://images.unsplash.com/photo-1711418235199-171c8ecb9d12?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
  flanges: "https://images.unsplash.com/photo-1548683726-203119be6a39?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
  worker: "https://images.pexels.com/photos/7739856/pexels-photo-7739856.jpeg?auto=compress&cs=tinysrgb&w=1400",
};

// Scroll reveal hook
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

// ── Navigation ────────────────────────────────────────────────────────────────
const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const links = [
    ["About", "about"], ["Capabilities", "capabilities"], ["Industries", "industries"],
    ["Machines", "machines"], ["Tooling", "tooling"], ["Contact", "contact"],
  ];

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="main-nav"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <button onClick={() => scrollTo("top")} className="flex items-center gap-3">
          <div className="w-9 h-9 border border-[#C5A059]/50 flex items-center justify-center rotate-45">
            <div className="w-4 h-4 bg-[#C5A059]" />
          </div>
          <div className="leading-none">
            <div className="font-display text-white text-lg">SANYAM</div>
            <div className="font-mono-caps text-[10px] text-[#C5A059]">ENGINEERING</div>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="font-mono-caps text-[11px] text-neutral-300 hover:text-[#C5A059] transition-colors"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="btn-gold px-5 py-2.5 text-sm font-semibold rounded-sm"
          >
            Request a Quote
          </button>
        </nav>

        <button className="lg:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#0a0a0a] border-t border-white/5 px-6 py-4 space-y-3">
          {links.map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="block font-mono-caps text-xs text-neutral-300 py-2 w-full text-left"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="btn-gold w-full py-3 text-sm font-semibold rounded-sm"
          >
            Request a Quote
          </button>
        </div>
      )}
    </header>
  );
};

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section id="top" className="relative h-screen w-full overflow-hidden">
    <video
      autoPlay muted loop playsInline poster={MEDIA.heroPoster}
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src={MEDIA.heroVideo} type="video/mp4" />
    </video>
    <div className="absolute inset-0 hero-overlay" />
    <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-10">
      <div className="reveal">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-[1px] bg-[#C5A059]" />
          <span className="font-mono-caps text-[11px] text-[#C5A059]">Precision · Performance · Partnership</span>
        </div>
        <h1 className="font-display uppercase text-white text-[14vw] md:text-[9vw] lg:text-[7.5vw] leading-[0.88] tracking-tighter"
          style={{ overflow: "visible" }}>
          Engineered
  <br />
  <span className="gold-text italic inline-block pr-[0.15em]">
    for Precision
  </span>
</h1>
        <p className="mt-8 max-w-xl text-neutral-300 text-base md:text-lg leading-relaxed">
          We operate at the intersection of precision machining, material behaviour and
          real-world application demands — building components that are understood for how
          they <em className="text-[#C5A059] not-italic">perform</em>, not just how they are drawn.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-gold px-7 py-3.5 text-sm font-semibold tracking-wider rounded-sm inline-flex items-center gap-2"
          >
            Request a Quote <ArrowUpRight size={16} />
          </button>
          <a
            href="/assets/sanyam-engineering-brochure.pdf"
            download
            className="btn-outline-gold px-7 py-3.5 text-sm font-semibold tracking-wider rounded-sm inline-flex items-center gap-2"
          >
            Download Brochure <Download size={16} />
          </a>
        </div>
      </div>
      <div className="absolute bottom-10 left-6 lg:left-10 font-mono-caps text-[10px] text-neutral-500">
        Total Control &nbsp;/&nbsp; Absolute Confidence
      </div>
    </div>
  </section>
);

// ── About ─────────────────────────────────────────────────────────────────────
const About = () => (
  <section id="about" className="relative py-24 md:py-32 bg-[#0a0a0a]">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-5 reveal">
        <div className="font-mono-caps text-[11px] text-[#C5A059] mb-5">— About / 01</div>
        <h2 className="font-display uppercase text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-white">
          Built right the <span className="gold-text">first time.</span>
        </h2>
        <div className="gold-rule my-8 w-28" />
        <p className="text-neutral-400 leading-relaxed">
          No corrections. No compromises. Our processes are tuned for predictability under
          stress, temperature and wear — not just inspection approval. From raw material to
          finished surface, every decision compounds into a component that earns trust in the field.
        </p>
      </div>
      <div className="lg:col-span-7 reveal">
        <div className="relative">
          <img
            src={MEDIA.precisionGear}
            alt="Precision gear macro"
            className="w-full h-[420px] md:h-[520px] object-cover rounded-sm border border-white/5"
          />
          <div className="absolute -bottom-6 -left-6 bg-[#0a0a0a] border border-[#C5A059]/30 px-6 py-5 max-w-xs hidden md:block">
            <div className="font-mono-caps text-[10px] text-[#C5A059] mb-2">Material Intelligence</div>
            <p className="text-sm text-neutral-300">
              Complete traceability through identification tags & route cards across every batch.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        ["High Efficiency", "Automation + tooling precision."],
        ["Premium Materials", "Strict sourcing, zero dilution."],
        ["Fast Delivery", "Consistency at scale, on time."],
        ["Trust-Driven", "Long-term partnerships, not orders."],
      ].map(([t, d], i) => (
        <div key={i} className="reveal card-dark p-6 rounded-sm">
          <div className="w-8 h-8 border border-[#C5A059]/50 rotate-45 flex items-center justify-center mb-4">
            <span className="-rotate-45 text-[#C5A059] text-sm font-semibold">{`0${i + 1}`}</span>
          </div>
          <h3 className="font-display text-white text-lg uppercase mb-2">{t}</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">{d}</p>
        </div>
      ))}
    </div>
  </section>
);

// ── Capabilities ──────────────────────────────────────────────────────────────
const Capabilities = () => {
  const items = [
    { icon: Layers, t: "Material Intelligence", d: "Sourcing premium raw materials with batch-level traceability using identification tags and route cards." },
    { icon: ShieldCheck, t: "Precision Partnership", d: "Engineering insight for durability, reduced wear and extended product life — not just geometry." },
    { icon: Gauge, t: "Consistency at Scale", d: "High-volume production with repeat accuracy through automation and supervised CNC control." },
    { icon: Sparkles, t: "Engineering Excellence", d: "In-house jigs, fixtures and specialised tooling via advanced CAD-CAM strategies." },
  ];
  return (
    <section id="capabilities" className="relative py-24 md:py-32 bg-[#0b0b0d]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 reveal">
          <div>
            <div className="font-mono-caps text-[11px] text-[#C5A059] mb-4">— Core Capabilities / 02</div>
            <h2 className="font-display uppercase text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-white">
              Four pillars. <span className="gold-text">One standard.</span>
            </h2>
          </div>
          <p className="max-w-md text-neutral-400 text-sm leading-relaxed">
            Every component we ship is the product of disciplined systems built around material behaviour, tooling strategy and relentless quality at scale.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {items.map(({ icon: Icon, t, d }, i) => (
            <div key={i} className="reveal card-dark p-8 rounded-sm group">
              <Icon size={28} className="text-[#C5A059] mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="font-display uppercase text-white text-xl mb-3">{t}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Industries ────────────────────────────────────────────────────────────────
const Industries = () => {
  const list = [
    { icon: Flame, t: "Boiler" },
    { icon: Factory, t: "Textile" },
    { icon: Wind, t: "High-Pressure Nozzles" },
    { icon: Cog, t: "Motors" },
    { icon: Car, t: "Automotive" },
    { icon: Pill, t: "Pharma" },
    { icon: Droplet, t: "Oil & Gas" },
    { icon: FlaskConical, t: "Chemical" },
  ];
  return (
    <section id="industries" className="py-24 md:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="reveal max-w-3xl">
          <div className="font-mono-caps text-[11px] text-[#C5A059] mb-4">— Industries Served / 03</div>
          <h2 className="font-display uppercase text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-white">
            Trusted across <span className="gold-text">critical sectors.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
          {list.map(({ icon: Icon, t }, i) => (
            <div key={i} className="reveal card-dark p-7 rounded-sm flex flex-col items-start gap-4">
              <Icon size={26} className="text-[#C5A059]" />
              <div className="font-display uppercase text-white text-base leading-tight">{t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Machines ──────────────────────────────────────────────────────────────────
const Machines = () => {
  const machines = [
    { t: "CNC Turning Centre", d: "Precision turning for shafts, couplings and rotational components." },
    { t: "Vertical Machining Centre", d: "3-axis VMC for complex profiles, drilling and milling." },
    { t: "Automated Angle Drill", d: "High throughput drilling for flanges and pattern components." },
    { t: "CNC Laser Cutting", d: "Clean-edge sheet and profile cutting to tight tolerances." },
  ];
  return (
    <section id="machines" className="relative py-24 md:py-32 bg-[#0b0b0d] overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${MEDIA.machine})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(1) contrast(1.1)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0d]/70 via-[#0b0b0d]/90 to-[#0b0b0d]" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="reveal grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <div className="font-mono-caps text-[11px] text-[#C5A059] mb-4">— Machines & Infrastructure / 04</div>
            <h2 className="font-display uppercase text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-white">
              Advanced metalwork, <span className="gold-text">disciplined output.</span>
            </h2>
          </div>
          <p className="lg:col-span-4 text-neutral-400 text-sm leading-relaxed">
            Skilled CNC supervision paired with intelligent tooling strategies — engineered for consistency, durability and cost-efficiency at any batch size.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-14">
          {machines.map((m, i) => (
            <div key={i} className="reveal card-dark rounded-sm p-7 flex gap-5 items-start">
              <div className="font-display text-[#C5A059] text-3xl leading-none w-12 shrink-0">{`0${i + 1}`}</div>
              <div>
                <h3 className="font-display uppercase text-white text-xl mb-2">{m.t}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{m.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Tooling ───────────────────────────────────────────────────────────────────
const Tooling = () => {
  const inserts = [
    "Tungsten Carbide", "Coated Carbide", "Cermet", "Ceramic (Hardened)",
    "Cubic Boron Nitride (CBN)", "Polycrystalline Diamond (PCD)",
  ];
  return (
    <section id="tooling" className="py-24 md:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 reveal">
          <img
            src={MEDIA.cncSparks}
            alt="CNC Tooling Sparks"
            className="w-full h-[480px] object-cover rounded-sm border border-white/5"
          />
        </div>
        <div className="lg:col-span-6 reveal">
          <div className="font-mono-caps text-[11px] text-[#C5A059] mb-4">— Intelligent Tooling / 05</div>
          <h2 className="font-display uppercase text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-white">
            Superior <span className="gold-text">performance.</span>
          </h2>
          <div className="gold-rule my-8 w-28" />
          <p className="text-neutral-400 leading-relaxed mb-8">
            High-feed milling, wiper geometry inserts and TiAlN/AlTiN coatings deliver up to
            <span className="text-[#C5A059] font-semibold"> 50% Ra improvement</span> — paired with tool condition monitoring
            and predictive tooling strategies that extend cycle life and reduce cost per part.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {inserts.map((ins, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-neutral-300">
                <CheckCircle2 size={14} className="text-[#C5A059] shrink-0" />
                {ins}
              </div>
            ))}
          </div>
          <div className="mt-10 flex gap-6">
            <div>
              <div className="font-display text-5xl gold-text">50%</div>
              <div className="font-mono-caps text-[10px] text-neutral-500 mt-1">Ra Improvement</div>
            </div>
            <div className="w-[1px] bg-white/10" />
            <div>
              <div className="font-display text-5xl gold-text">100%</div>
              <div className="font-mono-caps text-[10px] text-neutral-500 mt-1">Traceability</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── Products ──────────────────────────────────────────────────────────────────
const Products = () => (
  <section id="products" className="py-24 md:py-32 bg-[#0b0b0d]">
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <div className="reveal">
        <div className="font-mono-caps text-[11px] text-[#C5A059] mb-4">— Products / 06</div>
        <h2 className="font-display uppercase text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-white mb-12">
          Components that <span className="gold-text">endure.</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { img: MEDIA.flanges, t: "Flanges", d: "Weld-neck, blind, slip-on — ASTM grade traceability." },
          { img: MEDIA.machine, t: "Couplings & Shafts", d: "Keyed shaft couplings engineered for torque stability." },
          { img: MEDIA.worker, t: "Precision Components", d: "Bespoke nozzles, fittings and pressure parts." },
        ].map((p, i) => (
          <div key={i} className="reveal group relative overflow-hidden rounded-sm border border-white/5">
            <img src={p.img} alt={p.t} className="w-full h-[320px] object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="font-display uppercase text-white text-xl">{p.t}</h3>
              <p className="text-xs text-neutral-400 mt-1">{p.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Contact / Quote Form ──────────────────────────────────────────────────────
const Contact = () => {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", industry: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error("Please fill all required fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/quotes`, form);
      toast.success("Quote request received. We'll get back to you within 24 hours.");
      setForm({ name: "", company: "", email: "", phone: "", industry: "", message: "" });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      let message = "Something went wrong. Try again.";
      if (typeof detail === "string") {
        message = detail;
      } else if (Array.isArray(detail)) {
        // FastAPI validation errors come as an array like [{msg: "...", loc: [...]}]
        message = detail.map((e) => e.msg).join(", ");
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 reveal">
          <div className="font-mono-caps text-[11px] text-[#C5A059] mb-4">— Contact / 07</div>
          <h2 className="font-display uppercase text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-white">
            Let's <span className="gold-text">build it right.</span>
          </h2>
          {/* <p className="text-neutral-400 leading-relaxed mt-6 max-w-md">
            Share your drawings, application and volume. We'll respond with a precision-engineered answer, not a templated quote.
          </p> */}
          <p className="text-neutral-400 leading-relaxed mt-6 max-w-md">
            Share your drawings, application and volume. Our engineers will respond with a precision-engineered answer — not a templated quote. From complex flow simulations on ANSYS Fluent to real-world machining, our technicians bring both the knowledge and the tools to solve your toughest problems before production even begins.
          </p>
          <div className="mt-10 space-y-5">
            <ContactRow icon={<Phone size={18} />} label="Phone / WhatsApp">
              <a href="tel:+918460812572" className="text-white hover:text-[#C5A059] transition-colors">+91 84608 12572</a>
            </ContactRow>
            <ContactRow icon={<Mail size={18} />} label="Email">
              <a href="mailto:sidhant@sanyamengineering.com" className="text-white hover:text-[#C5A059] transition-colors">
                sidhant@sanyamengineering.com
              </a>
            </ContactRow>
            <ContactRow icon={<MapPin size={18} />} label="Location">
              <span className="text-white">Surat, Gujarat, India</span>
            </ContactRow>
          </div>
          <div className="mt-10 rounded-sm overflow-hidden border border-white/10 h-64">
            <iframe
              title="Sanyam Engineering Location"
              src="https://www.google.com/maps?q=Surat,Gujarat,India&output=embed"
              className="w-full h-full"
              loading="lazy"
              style={{ filter: "invert(0.92) hue-rotate(180deg) contrast(0.85) saturate(0.6)" }}
            />
          </div>
        </div>

        <div className="lg:col-span-7 reveal">
          <form onSubmit={submit} data-testid="quote-form" className="card-dark rounded-sm p-8 md:p-10 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Name *">
                <input required value={form.name} onChange={onChange("name")} data-testid="input-name"
                  className="w-full bg-transparent border-b border-white/15 focus:border-[#C5A059] outline-none py-2.5 text-white transition-colors" />
              </Field>
              <Field label="Company">
                <input value={form.company} onChange={onChange("company")} data-testid="input-company"
                  className="w-full bg-transparent border-b border-white/15 focus:border-[#C5A059] outline-none py-2.5 text-white transition-colors" />
              </Field>
              <Field label="Email *">
                <input required type="email" value={form.email} onChange={onChange("email")} data-testid="input-email"
                  className="w-full bg-transparent border-b border-white/15 focus:border-[#C5A059] outline-none py-2.5 text-white transition-colors" />
              </Field>
              <Field label="Phone *">
                <input required value={form.phone} onChange={onChange("phone")} data-testid="input-phone"
                  className="w-full bg-transparent border-b border-white/15 focus:border-[#C5A059] outline-none py-2.5 text-white transition-colors" />
              </Field>
            </div>
            <Field label="Industry">
              <select value={form.industry} onChange={onChange("industry")} data-testid="input-industry"
                className="w-full bg-transparent border-b border-white/15 focus:border-[#C5A059] outline-none py-2.5 text-white transition-colors">
                <option value="" className="bg-[#0a0a0a]">Select industry</option>
                {["Boiler", "Textile", "High-Pressure Nozzles", "Motors", "Automotive", "Pharma", "Oil & Gas", "Chemical", "Other"].map((o) => (
                  <option key={o} value={o} className="bg-[#0a0a0a]">{o}</option>
                ))}
              </select>
            </Field>
            <Field label="Project details *">
              <textarea required rows={5} value={form.message} onChange={onChange("message")} data-testid="input-message"
                className="w-full bg-transparent border-b border-white/15 focus:border-[#C5A059] outline-none py-2.5 text-white transition-colors resize-none" />
            </Field>
            <button
              type="submit"
              disabled={loading}
              data-testid="submit-quote-btn"
              className="btn-gold w-full md:w-auto px-8 py-3.5 text-sm font-semibold tracking-wider rounded-sm inline-flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? "Sending..." : (<>Submit Request <Send size={16} /></>)}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, children }) => (
  <label className="block">
    <span className="font-mono-caps text-[10px] text-neutral-500 mb-1 block">{label}</span>
    {children}
  </label>
);

const ContactRow = ({ icon, label, children }) => (
  <div className="flex items-start gap-4">
    <span className="text-[#C5A059] mt-1">{icon}</span>
    <div>
      <div className="font-mono-caps text-[10px] text-neutral-500">{label}</div>
      {children}
    </div>
  </div>
);

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-[#070708] border-t border-white/5 py-14">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-[#C5A059]/50 rotate-45 flex items-center justify-center">
            <div className="w-3 h-3 bg-[#C5A059]" />
          </div>
          <div>
            <div className="font-display text-white text-base">SANYAM ENGINEERING</div>
            <div className="font-mono-caps text-[9px] text-[#C5A059]">Engineered for Precision</div>
          </div>
        </div>
        <p className="text-xs text-neutral-500 mt-5 leading-relaxed max-w-xs">
          Precision machining, material intelligence and engineering excellence — delivered with total control and absolute confidence.
        </p>
      </div>
      <div>
        <div className="font-mono-caps text-[10px] text-[#C5A059] mb-4">Contact</div>
        <div className="text-sm text-neutral-300 space-y-2">
          <div>+91 84608 12572</div>
          <div>sidhant@sanyamengineering.com</div>
          <div>Surat, Gujarat, India</div>
        </div>
      </div>
      <div>
        <div className="font-mono-caps text-[10px] text-[#C5A059] mb-4">Resources</div>
        <div className="text-sm text-neutral-300 space-y-2">
          <a href="/assets/sanyam-engineering-brochure.pdf" download className="block hover:text-[#C5A059]">Download Brochure</a>
          <a href="#contact" className="block hover:text-[#C5A059]">Request a Quote</a>
          <a href="/admin" className="block hover:text-[#C5A059]">Admin</a>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between gap-3 text-xs text-neutral-500">
      <div>© {new Date().getFullYear()} Sanyam Engineering. All rights reserved.</div>
      <div className="font-mono-caps text-[9px]">TOTAL CONTROL / ABSOLUTE CONFIDENCE</div>
    </div>
  </footer>
);

// ── WhatsApp Float ────────────────────────────────────────────────────────────
const WhatsAppFloat = () => (
  <a
    href="https://wa.me/918460812572?text=Hi%20Sanyam%20Engineering%2C%20I%27d%20like%20to%20discuss%20a%20project."
    target="_blank"
    rel="noreferrer"
    data-testid="whatsapp-float"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-xl wa-pulse hover:scale-110 transition-transform"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={26} />
  </a>
);

// ── Main Export ───────────────────────────────────────────────────────────────
export default function Landing() {
  useReveal();
  return (
    <div className="App grain">
      <Nav />
      <Hero />
      <About />
      <Capabilities />
      <Industries />
      <Machines />
      <Tooling />
      <Products />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
