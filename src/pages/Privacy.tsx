import React from 'react';
import SEO from '../components/SEO';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function Privacy() {
  return (
    <main className="pt-40 pb-32 px-6 bg-spot-cream min-h-screen">
      <SEO 
        title="Privacy Strategy | SPOT" 
        description="Our commitment to child data dignity and privacy ethics."
      />
      
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-spot-pastel-blue/20 text-blue-600 rounded-full font-black text-[10px] uppercase tracking-[0.3em] mb-8">
            <Shield size={14} /> Data Sovereignty
          </div>
          <h1 className="font-display font-black text-6xl md:text-8xl text-spot-charcoal uppercase tracking-tighter leading-none mb-6">
            Privacy <br/><span className="text-spot-red italic underline decoration-spot-pastel-pink/30 underline-offset-[12px]">Policy</span>
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
                Who We Are
              </h2>
              <p className="text-xl text-spot-charcoal/70 leading-relaxed font-bold italic">
                SPOT is a microschool and studio ecosystem designed for children and adolescents, operated by:
              </p>
              <ul className="grid md:grid-cols-2 gap-4 list-none pl-0">
                <li className="bg-slate-50 p-6 rounded-3xl border border-black/5">
                  <span className="block font-black uppercase text-[11px] tracking-widest text-spot-red mb-2">Corporate Entity</span>
                  <span className="font-bold">Insighte Childcare Private Limited</span>
                </li>
                <li className="bg-slate-50 p-6 rounded-3xl border border-black/5">
                  <span className="block font-black uppercase text-[11px] tracking-widest text-spot-red mb-2">Social Impact Entity</span>
                  <span className="font-bold">NEG FIRE Trust</span>
                </li>
              </ul>
              <p className="text-sm font-medium text-spot-charcoal/40">Both entities are based in Bangalore, Karnataka, India, and work together to deliver educational, therapeutic, and social impact programs.</p>
            </section>

            <section>
              <h2 className="font-display font-black text-3xl uppercase tracking-tight flex items-center gap-4 text-spot-charcoal">
                <span className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-spot-red font-bold text-sm">02</span>
                Who This Policy Is For
              </h2>
              <p className="text-lg">This Privacy Policy applies to Parents and guardians, Students (with parental consent), and visitors to the SPOT website.</p>
            </section>

            <section>
              <h2 className="font-display font-black text-3xl uppercase tracking-tight flex items-center gap-4 text-spot-charcoal">
                <span className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-spot-red font-bold text-sm">03</span>
                What Information We Collect
              </h2>
              <p>We collect only what is necessary to create a safe, personalized, and meaningful learning experience.</p>
              <div className="space-y-6 mt-8">
                <div className="p-8 rounded-3xl border border-black/5 bg-spot-pastel-yellow/5">
                  <h3 className="font-bold text-xl mb-4 uppercase tracking-tighter underline decoration-spot-pastel-yellow decoration-4">Parent/Guardian Information</h3>
                  <p className="text-sm font-medium opacity-70">Name, Phone number, Email address, Address/location.</p>
                </div>
                <div className="p-8 rounded-3xl border border-black/5 bg-spot-pastel-pink/5">
                  <h3 className="font-bold text-xl mb-4 uppercase tracking-tighter underline decoration-spot-pastel-pink decoration-4">Child Information</h3>
                  <p className="text-sm font-medium opacity-70">Name and age, Educational background, Learning preferences, and Neurodivergent profiles (shared voluntarily).</p>
                </div>
                <div className="p-8 rounded-3xl border border-black/5 bg-spot-pastel-blue/5">
                  <h3 className="font-bold text-xl mb-4 uppercase tracking-tighter underline decoration-spot-pastel-blue decoration-4">Sensitive Personal Data</h3>
                  <p className="text-sm font-medium opacity-70">As per Indian SPDI Rules: Health-related information, Psychological or developmental assessments, Therapy inputs and support plans.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display font-black text-3xl uppercase tracking-tight flex items-center gap-4 text-spot-charcoal">
                <span className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-spot-red font-bold text-sm">04</span>
                How We Use Your Information
              </h2>
              <div className="bg-spot-charcoal text-white p-12 rounded-[3rem] shadow-2xl">
                <p className="text-spot-pastel-pink font-black uppercase text-[10px] tracking-widest mb-8 italic italic italic">The No-Sell Commitment</p>
                <p className="text-2xl font-bold tracking-tighter leading-tight italic">
                  We use your data to deliver programs, support learning, and improve our systems. <span className="text-spot-pastel-yellow italic">We do not sell or rent your data.</span>
                </p>
              </div>
            </section>

            <section className="space-y-8">
               <h2 className="font-display font-black text-3xl uppercase tracking-tight text-spot-charcoal">AI & Data Usage</h2>
               <div className="p-10 rounded-[3rem] border border-black/5 bg-slate-50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5"><Eye size={120} /></div>
                  <h3 className="font-black text-lg uppercase tracking-tighter mb-4">Suzu AI & Future Tools</h3>
                  <p className="text-lg leading-relaxed text-spot-charcoal/70 italic">
                    SPOT uses AI-powered tools to enhance learning. AI supports, but does not replace, human decision-making. Sensitive data is processed only with explicit consent and anonymized wherever possible.
                  </p>
                  <div className="mt-6 p-4 bg-white/50 border border-black/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-spot-red italic">
                    Note: AI outputs may not always be accurate and are not medical advice.
                  </div>
               </div>
            </section>

            <section className="pt-16 border-t border-black/5 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-spot-charcoal/20 mb-8">Dignity Over Efficiency</p>
              <p className="text-lg text-spot-charcoal/50 italic max-w-lg mx-auto leading-relaxed">
                "At SPOT, we don’t see children as data points to be optimized. We see them as individuals with stories, strengths, and their own pace of becoming."
              </p>
              <div className="mt-12 flex flex-col items-center gap-2">
                <a href="mailto:team@spotschool.in" className="text-2xl font-display font-black uppercase tracking-tighter text-spot-red hover:underline decoration-4">team@spotschool.in</a>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Privacy Grievance Office • Bangalore</span>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
