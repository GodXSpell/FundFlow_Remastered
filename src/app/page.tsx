"use client"

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { useAtom } from "jotai"
import { isCommandMenuOpenAtom } from "@/lib/store"
import { Activity, Shield, PieChart, Bell, Target, ArrowRight, Wallet, LineChart, Search } from "lucide-react"

// Simple placeholder image component
const PlaceholderImage = ({ className = "" }) => (
  <div className={`flex items-center justify-center bg-[#E2E8F0]/60 dark:bg-[#1E293B]/60 text-[#64748B] dark:text-[#94A3B8] font-medium ${className}`}>
    <div className="w-full h-full flex items-center justify-center opacity-30">
      <div className="w-1/2 h-1/2 border-2 border-dashed border-[#CBD5E1] dark:border-[#334155]/30 rounded-lg flex items-center justify-center">
        <svg className="w-8 h-8 text-[#64748B] dark:text-[#94A3B8]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      </div>
    </div>
  </div>
);

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const words = ["budget", "goal", "paycheck", "saver", "spender", "dream"];
export default function RootPage() {
  const [currentWord, setCurrentWord] = useState(0);
  const [, setCommandMenuOpen] = useAtom(isCommandMenuOpenAtom);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F4] dark:bg-[#121417] text-[#121417] dark:text-[#F5F5F4] font-sans selection:bg-accent-brand/10 selection:text-foreground">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#F5F5F4] dark:bg-[#121417]/70 backdrop-blur-xl transition-all duration-300 border-b border-[#CBD5E1]/5 dark:border-[#334155]/5">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="text-xl font-bold tracking-tighter text-[#5A677D] dark:text-[#C0C6DB]">
            Fund<span className="text-[#E67E6E] dark:text-[#9B4437]">Flow</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCommandMenuOpen(true)}
              className="p-2 text-[#64748B] dark:text-[#94A3B8] hover:bg-[#E2E8F0] dark:hover:bg-[#1E293B] rounded-full transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Open Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link href="/login">
              <button className="bg-[#E67E6E] dark:bg-[#9B4437] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-all duration-200">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center justify-center px-8 text-center">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto w-full z-10 flex flex-col items-center"
          >
            <motion.h1 variants={fadeIn} className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-5xl md:text-7xl font-extrabold tracking-tighter text-[#121417] dark:text-[#F5F5F4] mb-8 leading-tight">
              <span>Your Personal</span>
              <span className="relative inline-block h-[1.3em] overflow-hidden text-left text-[#E67E6E] dark:text-[#9B4437] min-w-[320px]">
                <AnimatePresence>
                  <motion.span
                    key={currentWord}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "anticipate" }}
                    className="absolute left-4 top-1 whitespace-nowrap"
                  >
                    {words[currentWord]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-[#64748B] dark:text-[#94A3B8] max-w-xl leading-relaxed mb-12 font-light">
              A digital sanctuary for high-net-worth management. We believe in intentional asymmetry, tonal depth, and financial calm.
            </motion.p>
            <motion.div variants={fadeIn} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/login">
                <button className="bg-[#E67E6E] dark:bg-[#9B4437] text-white px-10 py-4 rounded-lg font-bold tracking-tight text-lg shadow-xl hover:opacity-90 transition-all">
                  Begin Your Journey
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Mastery Over Noise (Bento) */}
        <section className="py-32 px-8 bg-[#E2E8F0]/10 dark:bg-[#1E293B]/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-[#121417] dark:text-[#F5F5F4] mb-4">Mastery Over Noise</h2>
              <p className="text-[#64748B] dark:text-[#94A3B8] max-w-xl text-lg font-light">We move beyond the template look by embracing silence. A minimalist approach to complex financial systems.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
              {/* Card 1: Intentional Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="md:col-span-8 bg-white dark:bg-[#1c1f24] p-10 rounded-[3rem] border border-[#CBD5E1]/10 dark:border-[#334155]/10 flex flex-col justify-between group overflow-hidden relative"
              >
                <div className="z-10">
                  <div className="w-14 h-14 bg-[#E2E8F0]/60 dark:bg-[#1E293B]/60 rounded-full flex items-center justify-center mb-6">
                    <Activity className="text-[#E67E6E] dark:text-[#9B4437] w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-[#121417] dark:text-[#F5F5F4]">Intentional Analysis</h3>
                  <p className="text-[#64748B] dark:text-[#94A3B8] max-w-sm">Every data point is curated. No clutter, no noise, just the essential insights for your growth.</p>
                </div>
                <div className="mt-8 flex gap-2 items-end z-10 h-32">
                  <motion.div animate={{ height: [64, 96, 64] }} transition={{ repeat: Infinity, duration: 4 }} className="h-24 w-12 bg-[#E67E6E]/10 dark:bg-[#9B4437]/10 rounded-full"></motion.div>
                  <motion.div animate={{ height: [40, 80, 40] }} transition={{ repeat: Infinity, duration: 5 }} className="h-16 w-12 bg-[#E67E6E]/20 dark:bg-[#9B4437]/20 rounded-full"></motion.div>
                  <motion.div animate={{ height: [128, 90, 128] }} transition={{ repeat: Infinity, duration: 3.5 }} className="h-32 w-12 bg-[#E67E6E]/30 dark:bg-[#9B4437]/30 rounded-full"></motion.div>
                  <motion.div animate={{ height: [80, 110, 80] }} transition={{ repeat: Infinity, duration: 4.5 }} className="h-20 w-12 bg-[#E67E6E]/15 dark:bg-[#9B4437]/15 rounded-full"></motion.div>
                </div>
              </motion.div>

              {/* Card 2: Secure Haven */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:col-span-4 bg-[#5A677D]/10 dark:bg-[#C0C6DB]/10 text-[#121417] dark:text-[#F5F5F4] p-10 rounded-[3rem] flex flex-col justify-center items-center text-center"
              >
                <Shield className="text-[#5A677D] dark:text-[#C0C6DB] w-16 h-16 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Secure Haven</h3>
                <p className="text-foreground/80">Military grade encryption wrapped in architectural simplicity.</p>
              </motion.div>

              {/* Card 3: Legacy Support */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="md:col-span-4 bg-[#E67E6E]/10 dark:bg-[#9B4437]/10 text-[#121417] dark:text-[#F5F5F4] p-10 rounded-[3rem] flex flex-col justify-end group"
              >
                <div className="mb-auto text-sm tracking-[0.2em] uppercase opacity-70 font-bold">Legacy Support</div>
                <h3 className="text-2xl font-bold">Multi-Generational Planning</h3>
                <div className="mt-4 flex -space-x-2">
                  <div className="w-10 h-10 rounded-full border-2 border-[#E67E6E]/20 dark:border-[#9B4437]/20 bg-[#5A677D]/20 dark:bg-[#C0C6DB]/20"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#E67E6E]/20 dark:border-[#9B4437]/20 bg-[#5A677D]/40 dark:bg-[#C0C6DB]/40"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#E67E6E]/20 dark:border-[#9B4437]/20 bg-[#5A677D]/60 dark:bg-[#C0C6DB]/60"></div>
                </div>
              </motion.div>

              {/* Card 4: Automated Advisory */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="md:col-span-8 bg-[#E2E8F0]/60 dark:bg-[#1E293B]/60 p-10 rounded-[3rem] flex items-center justify-between overflow-hidden"
              >
                <div className="max-w-xs">
                  <h3 className="text-2xl font-bold mb-2">Automated Advisory</h3>
                  <p className="text-muted-foreground">The machine works so you don't have to. Automated rebalancing that respects your peace.</p>
                </div>
                <div className="hidden sm:block">
                  <PlaceholderImage className="w-48 h-48 rounded-full" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stat Section */}
        <section className="py-24 px-8 border-y border-[#CBD5E1]/5 dark:border-[#334155]/5">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-12 items-baseline">
            <motion.div initial="hidden" whileInView="visible" variants={fadeIn} viewport={{ once: true }}>
              <div className="text-7xl font-extrabold text-[#121417] dark:text-[#F5F5F4] tracking-tighter">$14.2B+</div>
              <div className="text-xs uppercase tracking-[0.3em] font-medium text-[#E67E6E] dark:text-[#9B4437] mt-2">Assets Under Stewardship</div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" variants={fadeIn} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="text-7xl font-extrabold text-[#121417] dark:text-[#F5F5F4] tracking-tighter">0.02%</div>
              <div className="text-xs uppercase tracking-[0.3em] font-medium text-[#E67E6E] dark:text-[#9B4437] mt-2">Management Overhead</div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" variants={fadeIn} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <div className="text-7xl font-extrabold text-[#121417] dark:text-[#F5F5F4] tracking-tighter">24/7</div>
              <div className="text-xs uppercase tracking-[0.3em] font-medium text-[#E67E6E] dark:text-[#9B4437] mt-2">Concierge Support</div>
            </motion.div>
          </div>
        </section>

        {/* Detailed Features Sequence */}
        <section className="py-32 space-y-48">

          {/* Feature 1: Expenses */}
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-[#E2E8F0]/30 dark:bg-[#1E293B]/30 p-12 rounded-[2.5rem] border border-[#CBD5E1]/10 dark:border-[#334155]/10 order-2 md:order-1 relative group"
            >
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-xl font-bold">Monthly Outflow</h4>
                <PieChart className="text-[#5A677D] dark:text-[#C0C6DB] w-6 h-6" />
              </div>
              <div className="flex items-end gap-3 h-48">
                <div className="flex-1 bg-[#E67E6E]/10 dark:bg-[#9B4437]/10 rounded-t-lg h-[40%] transition-all group-hover:h-[45%]"></div>
                <div className="flex-1 bg-[#E67E6E]/30 dark:bg-[#9B4437]/30 rounded-t-lg h-[65%] transition-all group-hover:h-[60%]"></div>
                <div className="flex-1 bg-[#E67E6E]/20 dark:bg-[#9B4437]/20 rounded-t-lg h-[55%] transition-all group-hover:h-[65%]"></div>
                <div className="flex-1 bg-[#E67E6E]/50 dark:bg-[#9B4437]/50 rounded-t-lg h-[85%] transition-all group-hover:h-[90%]"></div>
                <div className="flex-1 bg-[#E67E6E]/15 dark:bg-[#9B4437]/15 rounded-t-lg h-[30%] transition-all group-hover:h-[25%]"></div>
              </div>
              <div className="mt-8 pt-8 border-t border-[#CBD5E1]/10 dark:border-[#334155]/10 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs uppercase text-[#64748B] dark:text-[#94A3B8] font-bold tracking-widest">Fixed</div>
                  <div className="text-lg font-bold">$12,400</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-[#64748B] dark:text-[#94A3B8] font-bold tracking-widest">Variable</div>
                  <div className="text-lg font-bold">$4,820</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 md:order-2"
            >
              <div className="text-[#E67E6E] dark:text-[#9B4437] font-bold tracking-widest uppercase text-sm mb-4">Precision Flow</div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-[#121417] dark:text-[#F5F5F4] mb-6 leading-tight">
                Spend with intention. Save with confidence. Live without limits.
              </h2>
              <p className="text-[#64748B] dark:text-[#94A3B8] text-lg leading-relaxed max-w-md font-light">
                Our intelligent tracking categorizes every transaction with architectural precision, allowing you to see exactly where your legacy is flowing.
              </p>
            </motion.div>
          </div>

          {/* Feature 2: Budgets */}
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="text-[#E67E6E] dark:text-[#9B4437] font-bold tracking-widest uppercase text-sm mb-4">Master Constraints</div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-[#121417] dark:text-[#F5F5F4] mb-6 leading-tight">
                Total control over your financial architecture
              </h2>
              <p className="text-[#64748B] dark:text-[#94A3B8] text-lg leading-relaxed max-w-md font-light">
                Set intentional boundaries for your spending. Our budget system provides real-time feedback without the stress of traditional accounting.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-[#E2E8F0] dark:bg-[#1E293B] p-12 rounded-[2.5rem] border border-[#CBD5E1]/10 dark:border-[#334155]/10"
            >
              <div className="space-y-10">
                <div>
                  <div className="flex justify-between mb-3 items-end">
                    <span className="font-bold text-sm tracking-tight">Luxury Travel</span>
                    <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">75% of $20k</span>
                  </div>
                  <div className="h-2 w-full bg-[#E2E8F0]/30 dark:bg-[#1E293B]/30 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "75%" }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} className="h-full bg-[#E67E6E] dark:bg-[#9B4437] rounded-full"></motion.div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-3 items-end">
                    <span className="font-bold text-sm tracking-tight">Venture Capital Pool</span>
                    <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">32% of $500k</span>
                  </div>
                  <div className="h-2 w-full bg-[#E2E8F0]/30 dark:bg-[#1E293B]/30 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "32%" }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} className="h-full bg-[#E67E6E] dark:bg-[#9B4437]/60 rounded-full"></motion.div>
                  </div>
                </div>
                <div className="bg-[#E2E8F0]/30 dark:bg-[#1E293B]/30 p-6 rounded-xl border border-[#CBD5E1]/5 dark:border-[#334155]/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#5A677D]/10 dark:bg-[#C0C6DB]/10 rounded-full flex items-center justify-center text-[#5A677D] dark:text-[#C0C6DB]">
                      <Bell className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium leading-tight text-[#64748B] dark:text-[#94A3B8]">You've reached 90% of your Lifestyle budget for October.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature 3: Bank Accounts */}
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-[#5A677D]/10 dark:bg-[#C0C6DB]/10 p-12 rounded-[2.5rem] text-[#121417] dark:text-[#F5F5F4] order-2 md:order-1 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
              <div className="relative z-10 space-y-6">
                <motion.div whileHover={{ scale: 1.02 }} className="bg-background/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 flex justify-between items-center transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#E67E6E]/20 dark:bg-[#9B4437]/20 rounded-full flex items-center justify-center font-bold text-[#E67E6E] dark:text-[#9B4437]">Q</div>
                    <div>
                      <div className="text-xs opacity-70 font-bold uppercase tracking-widest">Quiet Private</div>
                      <div className="font-bold">...8824</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs opacity-70">Balance</div>
                    <div className="font-bold">$1.2M</div>
                  </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="bg-background/20 p-6 rounded-2xl border border-white/5 flex justify-between items-center opacity-60 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#E67E6E]/10 dark:bg-[#9B4437]/10 rounded-full flex items-center justify-center font-bold text-[#E67E6E] dark:text-[#9B4437]">S</div>
                    <div>
                      <div className="text-xs opacity-70 font-bold uppercase tracking-widest">Swiss Trust</div>
                      <div className="font-bold">...0091</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs opacity-70">Balance</div>
                    <div className="font-bold">$4.8M</div>
                  </div>
                </motion.div>
                <button className="w-full py-4 bg-[#E67E6E] dark:bg-[#9B4437] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg">Add New Connection</button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 md:order-2"
            >
              <div className="text-[#E67E6E] dark:text-[#9B4437] font-bold tracking-widest uppercase text-sm mb-4">Central Hub</div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-[#121417] dark:text-[#F5F5F4] mb-6 leading-tight">
                The single command center for your global wealth
              </h2>
              <p className="text-[#64748B] dark:text-[#94A3B8] text-lg leading-relaxed max-w-md font-light">
                Aggregate all your accounts across borders and institutions. Unified visibility into every asset you own, in one quiet interface.
              </p>
            </motion.div>
          </div>

          {/* Feature 4: Goals */}
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="text-[#E67E6E] dark:text-[#9B4437] font-bold tracking-widest uppercase text-sm mb-4">Vision Realized</div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-[#121417] dark:text-[#F5F5F4] mb-6 leading-tight">
                Reach your milestones with quiet confidence
              </h2>
              <p className="text-[#64748B] dark:text-[#94A3B8] text-lg leading-relaxed max-w-md font-light">
                Our goal-oriented framework turns abstract aspirations into architectural blueprints. Track progress toward the moments that matter most.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="bg-white dark:bg-[#1c1f24] p-8 rounded-[2.5rem] border border-[#CBD5E1]/20 dark:border-[#334155]/20 shadow-2xl relative z-10 max-w-md mx-auto">
                <div className="aspect-video rounded-2xl mb-6 overflow-hidden">
                  <PlaceholderImage className="w-full h-full" />
                </div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h5 className="text-xl font-bold">New Home Sanctuary</h5>
                    <p className="text-sm text-[#64748B] dark:text-[#94A3B8] font-medium">Aspen, Colorado Portfolio</p>
                  </div>
                  <div className="bg-[#E67E6E]/10 dark:bg-[#9B4437]/10 text-[#121417] dark:text-[#F5F5F4] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">82%</div>
                </div>
                <div className="h-2 w-full bg-[#E2E8F0]/60 dark:bg-[#1E293B]/60 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "82%" }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} className="h-full bg-[#E67E6E] dark:bg-[#9B4437] rounded-full"></motion.div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm font-bold">$2.45M <span className="text-[#64748B] dark:text-[#94A3B8] font-normal">/ $3.0M</span></div>
                  <button className="text-xs font-bold uppercase tracking-widest text-[#E67E6E] dark:text-[#9B4437] border-b border-[#E67E6E]/20 dark:border-[#9B4437]/20 pb-1">Review Plan</button>
                </div>
              </div>
              <div className="absolute -top-10 -left-10 w-full h-full border-2 border-[#CBD5E1]/10 dark:border-[#334155]/10 rounded-[2.5rem] -z-10 translate-x-4 translate-y-4"></div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto relative bg-white dark:bg-[#1c1f24] p-20 rounded-[4rem] text-center overflow-hidden border border-[#CBD5E1]/10 dark:border-[#334155]/10"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-container/20 to-transparent opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-[#121417] dark:text-[#F5F5F4] mb-8 italic">Ready to Build?</h2>
              <p className="text-xl text-[#64748B] dark:text-[#94A3B8] max-w-2xl mx-auto mb-12 font-light">
                Access is limited to ensure the highest standard of stewardship. If you represent a significant portfolio or legacy fund, we invite you to apply.
              </p>
              <div className="flex justify-center">
                <Link href="/login">
                  <button className="bg-[#E67E6E] dark:bg-[#9B4437] text-white px-12 py-5 rounded-lg font-bold text-xl hover:scale-105 transition-all shadow-xl">
                    Request an Invitation
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#F5F5F4] dark:bg-[#121417] w-full py-16 border-t border-[#CBD5E1]/5 dark:border-[#334155]/5">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-lg font-bold text-[#5A677D] dark:text-[#C0C6DB]">
            Fund<span className="text-[#E67E6E] dark:text-[#9B4437]">Flow</span>
          </div>
          <div className="flex flex-wrap justify-center gap-10 text-xs uppercase tracking-[0.2em]">
            <a className="text-[#64748B] dark:text-[#94A3B8] hover:text-accent-brand transition-colors duration-300 cursor-pointer">Privacy</a>
            <a className="text-[#64748B] dark:text-[#94A3B8] hover:text-accent-brand transition-colors duration-300 cursor-pointer">Terms</a>
            <a className="text-[#64748B] dark:text-[#94A3B8] hover:text-accent-brand transition-colors duration-300 cursor-pointer">Security</a>
            <a className="text-[#64748B] dark:text-[#94A3B8] hover:text-accent-brand transition-colors duration-300 cursor-pointer">Help Center</a>
          </div>
          <div className="text-muted-foreground/40 text-[10px] uppercase tracking-widest">
            © 2024 FundFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}