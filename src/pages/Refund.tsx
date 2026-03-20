import React from 'react';
import SEO from '../components/SEO';
import { motion } from 'motion/react';
import { CreditCard, Receipt, CalendarX, ArrowLeftRight } from 'lucide-react';

export default function Refund() {
  return (
    <main className="pt-40 pb-32 px-6 bg-spot-cream min-h-screen">
      <SEO 
        title="Pricing & Refund Policy | SPOT" 
        description="Transparent financial and cancellation protocols for SPOT programs."
      />
      
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-spot-pastel-yellow/20 text-yellow-700 rounded-full font-black text-[10px] uppercase tracking-[0.3em] mb-8">
            <CreditCard size={14} /> Financial Transparency
          </div>
          <h1 className="font-display font-black text-6xl md:text-8xl text-spot-charcoal uppercase tracking-tighter leading-none mb-6">
            Refund <br/><span className="text-spot-red italic underline decoration-spot-pastel-pink/30 underline-offset-[12px]">Strategy</span>
          </h1>
          <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 italic">
            <span>Effective: 01.01.2026</span>
            <span>Last Updated: 20.03.2026</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-10 md:p-20 rounded-[4rem] shadow-2xl border border-black/5 prose prose-2xl prose-spot max-w-none"
        >
          <div className="space-y-16">
            <section>
              <h2 className="font-display font-black text-3xl uppercase tracking-tight flex items-center gap-4 text-spot-charcoal">
                <span className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-spot-red font-bold text-sm">01</span>
                Overview
              </h2>
              <p className="text-xl text-spot-charcoal/70 leading-relaxed font-bold italic">
                This policy is in compliance with applicable Indian laws and Razorpay payment guidelines.
              </p>
              <p className="text-sm opacity-60">By making a payment on our website or through our payment links, you agree to this Pricing, Cancellation & Refund Policy.</p>
            </section>

            <section>
              <h2 className="font-display font-black text-3xl uppercase tracking-tight flex items-center gap-4 text-spot-charcoal text-spot-charcoal">
                <span className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-spot-red font-bold text-sm">02</span>
                Cancellation Policy
              </h2>
              <div className="space-y-6 mt-8">
                <div className="flex gap-6 p-8 bg-slate-50 rounded-3xl border border-black/5 group hover:border-spot-red transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-spot-red shrink-0">
                    <CalendarX size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg uppercase tracking-tight mb-2">By Parent/Guardian</h3>
                    <p className="text-sm">Requests must be emailed to <span className="font-bold underline">team@spotschool.in</span>. Cancellation is effective only after written confirmation from SPOT.</p>
                  </div>
                </div>
                <div className="flex gap-6 p-8 bg-slate-50 rounded-3xl border border-black/5 group hover:border-spot-red transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-spot-red shrink-0">
                    <ArrowLeftRight size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg uppercase tracking-tight mb-2">By SPOT</h3>
                    <p className="text-sm">SPOT reserves the right to cancel due to low enrollment or safety. Full refunds or transfers will be offered.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display font-black text-3xl uppercase tracking-tight flex items-center gap-4 text-spot-charcoal">
                <span className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-spot-red font-bold text-sm">03</span>
                Refund Matrix
              </h2>
              <div className="overflow-hidden rounded-[2.5rem] border border-black/5 shadow-xl mt-8">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-spot-charcoal text-white uppercase text-[10px] font-black tracking-[0.2em]">
                      <th className="p-6">Timeline</th>
                      <th className="p-6">Eligibility</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-bold">
                    <tr className="border-b border-black/5">
                      <td className="p-6">7+ Days before start</td>
                      <td className="p-6 text-spot-red">50% Refund (minus admin charges)</td>
                    </tr>
                    <tr className="border-b border-black/5 bg-slate-50/50">
                      <td className="p-6">Less than 7 days</td>
                      <td className="p-6 opacity-40">No Refund</td>
                    </tr>
                    <tr>
                      <td className="p-6">After program start</td>
                      <td className="p-6 opacity-40">No Refund</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-display font-black text-3xl uppercase tracking-tight flex items-center gap-4 text-spot-charcoal">
                <span className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-spot-red font-bold text-sm">04</span>
                Processing Timeline
              </h2>
              <div className="bg-spot-charcoal text-white p-12 rounded-[3rem] shadow-2xl">
                <p className="text-spot-pastel-pink font-black uppercase text-[10px] tracking-widest mb-8 italic">Financial Protocol</p>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="text-5xl font-display font-black text-spot-pastel-yellow italic">7-10 Days</div>
                  <p className="text-lg leading-snug">
                    Approved refunds will be processed to the original payment method within <span className="font-bold underline decoration-spot-pastel-pink decoration-2 underline-offset-4">7–10 working days</span> per Razorpay compliance.
                  </p>
                </div>
              </div>
            </section>

            <section className="pt-16 border-t border-black/5 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-spot-charcoal/20 mb-8">Clarity Over Compromise</p>
              <p className="text-lg text-spot-charcoal/50 italic max-w-lg mx-auto leading-relaxed">
                "We encourage families to review program details thoroughly before payment, as our seats are strictly limited to maintain quality."
              </p>
              <div className="mt-12 flex flex-col items-center gap-2">
                <a href="mailto:team@spotschool.in" className="text-2xl font-display font-black uppercase tracking-tighter text-spot-red hover:underline decoration-4">team@spotschool.in</a>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
