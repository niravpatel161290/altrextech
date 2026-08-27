import { useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { motion, type Variants } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Activity,
  Headset,
  Layers,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CharReveal from "@/components/CharReveal";
import { SectionBadge } from "@/components/ui/section-badge";
import { Seo } from "@/components/Seo";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const INDUSTRIES = [
  "CGD",
  "Oil Gas",
  "Water Wastewater",
  "Power Utilities",
  "Renewable Energy",
  "Manufacturing Automation",
  "Logistics Transportation",
  "Smart Cities",
  "Infrastructure Utilities",
  "Others (Specify In Message)"
];

const CONTACT_CARDS = [
  {
    icon: MapPin,
    label: "Headquarters",
    value: "Ahmedabad, India",
    href: "https://maps.google.com/?q=Ahmedabad,India",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@altrextech.com",
    href: "mailto:info@altrextech.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 92654 69633",
    href: "tel:+919265469633",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Fri, 9 AM – 6 PM IST",
    href: null,
  },
];

const SIDE_PANEL_STATS = [
  { icon: Activity, label: "Platform availability", value: "99.9%" },
  { icon: Layers, label: "Connected assets monitored", value: "1,000+" },
  { icon: Headset, label: "Monitoring coverage", value: "24/7" },
];

const EMAILJS_SERVICE_ID = "service_8555u0o";
const EMAILJS_TEMPLATE_ID = "template_sy9wo75";
const EMAILJS_PUBLIC_KEY = "KoRY7N3zj8okmHci2"; // Replace with your EmailJS public key

type FormStatus = "idle" | "submitting" | "success" | "error";

const Contact = () => {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [industry, setIndustry] = useState("");
  const [industryOpen, setIndustryOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("submitting");

    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Seo
        title="Contact Us | Altrex Digital Platforms Pvt Ltd"
        description="Get in touch with Altrex Digital Platforms Pvt Ltd for demos, partnerships and support. Headquartered in Ahmedabad, India — reach us by phone, email or the contact form."
        path="/contact"
      />
      {/* ---------------- Hero ---------------- */}
      <section>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-40">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mx-auto max-w-7xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <SectionBadge
                title="CONTACT US"
                dot={true}
                dotColor="bg-emerald-500"
                className="mb-8"
              />
            </motion.div>

            <CharReveal
              as="h1"
              lines={["Get in touch with our team", "to discuss your project."]}
              className="max-w-9xl text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-5xl lg:text-5xl xl:text-6xl mt-8 leading-[0.95] uppercase"
              immediate
              delay={0}
              stagger={0.028}
              lineGap="mt-6"
            />

            <motion.p
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.2 }}
              className="mt-10 max-w-2xl text-base leading-7 text-muted-foreground font-semibold sm:text-lg text-center mx-auto"
            >
              Share your challenge, book a demo, or start a pilot. Altrex helps
              manufacturing, energy, and logistics teams modernize operations
              with secure IoT, analytics, and automation.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.6 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                SOC 2 compliant
              </span>
              <span className="flex items-center gap-2 font-medium">
                <Activity className="h-4 w-4 text-emerald-500" />
                99.9% platform uptime
              </span>
              <span className="flex items-center gap-2 font-medium">
                <Headset className="h-4 w-4 text-emerald-500" />
                24/7 monitoring support
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        {/* ---------------- Contact info cards ---------------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CONTACT_CARDS.map((card) => {
            const Icon = card.icon;
            const content = (
              <>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-sm font-medium text-muted-foreground">
                  {card.label}
                </p>
                <p className="mt-1.5 text-base font-semibold text-foreground">
                  {card.value}
                </p>
              </>
            );

            return card.href ? (
              <motion.a
                key={card.label}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  card.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                variants={fadeUpVariants}
                className="group rounded-2xl border border-border bg-card p-6"
              >
                {content}
              </motion.a>
            ) : (
              <motion.div
                key={card.label}
                variants={fadeUpVariants}
                className="group rounded-2xl border border-border bg-card p-6"
              >
                {content}
              </motion.div>
            );
          })}
        </motion.div>

        {/* ---------------- Form + side panel ---------------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <motion.section
            variants={fadeUpVariants}
            className="rounded-2xl border border-border bg-card p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.16)] sm:p-10"
          >
            {status === "success" ? (
              <div className="flex h-full min-h-[480px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
                <h2 className="mt-6 text-2xl font-semibold text-foreground">
                  Message sent.
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">
                  Thanks for reaching out. Our team typically replies within one
                  business day.
                </p>
                <Button
                  variant="outline"
                  className="mt-8 border-border"
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </Button>
              </div>
            ) : status === "error" ? (
              <div className="flex h-full min-h-[480px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                  <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                </div>
                <h2 className="mt-6 text-2xl font-semibold text-foreground">
                  Something went wrong.
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">
                  We couldn't send your message. Please try again or email us directly at{" "}
                  <a href="mailto:info@altrextech.com" className="text-accent underline underline-offset-2">info@altrextech.com</a>.
                </p>
                <Button
                  variant="outline"
                  className="mt-8 border-border"
                  onClick={() => setStatus("idle")}
                >
                  Try again
                </Button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="grid gap-8">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.1em] font-semibold text-muted-foreground">
                    Request a consultation
                  </p>
                  <h2 className="text-3xl font-semibold text-foreground">
                    Send us a note and we’ll reply shortly.
                  </h2>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Full Name
                    </label>
                    <Input
                      required
                      name="name"
                      placeholder="Your name"
                      className="mt-3 w-full p-5"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Work Email
                    </label>
                    <Input
                      required
                      name="email"
                      type="email"
                      placeholder="name@company.com"
                      className="mt-3 w-full p-5"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Company
                    </label>
                    <Input
                      name="company"
                      placeholder="Company name"
                      className="mt-3 w-full p-5"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Phone
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="+91 12345 67890"
                      className="mt-3 w-full p-5"
                    />
                  </div>

                  <div className="relative sm:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Industry
                    </label>
                    <button
                      type="button"
                      onClick={() => setIndustryOpen((open) => !open)}
                      className="mt-3 flex w-full items-center justify-between rounded-lg border border-input bg-transparent px-5 py-3 text-left text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <span className={industry ? "" : "text-muted-foreground"}>
                        {industry || "Select your industry"}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform ${
                          industryOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {/* Hidden input carries the industry value for EmailJS */}
                    <input type="hidden" name="industry" value={industry} />
                    {industryOpen && (
                      <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-border bg-card shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)]">
                        {INDUSTRIES.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setIndustry(option);
                              setIndustryOpen(false);
                            }}
                            className="block w-full px-5 py-3 text-left text-sm text-foreground transition-colors hover:bg-orange-500/10"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      required
                      name="message"
                      rows={6}
                      className="mt-3 min-h-[160px] w-full rounded-lg border border-input bg-transparent px-4 py-4 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                      placeholder="Tell us about your project, timeline, and current challenges."
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground">
                    We typically reply within one business day.
                  </p>
                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full sm:w-auto bg-accent px-8 py-6 cursor-pointer"
                  >
                    {status === "submitting" ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.section>

          <motion.aside
            variants={fadeUpVariants}
            className="space-y-5 rounded-2xl border border-border bg-card p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.16)] sm:p-10"
          >
            <div className="rounded-xl bg-gradient-to-r from-orange-500/10 via-transparent to-fuchsia-500/10 p-7">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Live platform status
                </p>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-foreground">
                Talk with our enterprise team.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Fast-track your industrial digital transformation with secure,
                realtime systems designed for production and operations teams.
              </p>
            </div>

            <div className="grid gap-4">
              {SIDE_PANEL_STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/15 to-fuchsia-500/15">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-foreground">
                      {stat.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;