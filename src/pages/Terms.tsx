import React from 'react';
import SEO from '../components/SEO';
import { motion } from 'motion/react';
import { Gavel as GavelIcon, Scale as ScaleIcon, FileCheck as FileCheckIcon, Info as InfoIcon } from 'lucide-react';

export default function Terms() {
  return (
    <main className="pt-40 pb-32 px-6 bg-spot-cream min-h-screen">
      <SEO 
        title="Terms of Service | SPOT" 
        description="Legal framework for our learning ecosystem."
      />
      
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-spot-pastel-pink/20 text-spot-red rounded-full font-black text-[10px] uppercase tracking-[0.3em] mb-8">
            <GavelIcon size={14} /> Operational Protocol
          </div>
          <h1 className="font-display font-black text-6xl md:text-8xl text-spot-charcoal uppercase tracking-tighter leading-none mb-6">
            Terms & <br/><span className="text-spot-red italic underline decoration-spot-pastel-yellow/30 underline-offset-[12px]">Conditions</span>
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
                Introduction
              </h2>
              <p className="text-xl text-spot-charcoal/70 leading-relaxed font-bold italic">
                Welcome to SPOT Microschool & Studios, operated by Insighte Childcare Private Limited and NEG FIRE Trust.
              </p>
              <p>By accessing our website, submitting an enquiry, enrolling in programs, or using our services, you agree to these Terms & Conditions.</p>
            </section>

            <section>
              <h2 className="font-display font-black text-3xl uppercase tracking-tight flex items-center gap-4 text-spot-charcoal">
                <span className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-spot-red font-bold text-sm">02</span>
                Nature of Services
              </h2>
              <p>SPOT provides Microschool programs, after-school studios, workshops, project-based learning, internships, and therapeutic support. <strong>SPOT is not a conventional school board or certification authority, unless explicitly stated.</strong></p>
            </section>

            <section>
              <h2 className="font-display font-black text-3xl uppercase tracking-tight flex items-center gap-4 text-spot-charcoal">
                <span className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-spot-red font-bold text-sm">03</span>
                Admission & Enrollment
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-8 rounded-3xl border border-black/5 bg-spot-pastel-yellow/10">
                  <h3 className="font-black text-lg uppercase tracking-tight mb-2">Selective Admission</h3>
                  <p className="text-sm">Admission is curated based on learning needs, dynamics, and capacity. Enquiries do not guarantee admission.</p>
                </div>
                <div className="p-8 rounded-3xl border border-black/5 bg-spot-pastel-pink/10">
                  <h3 className="font-black text-lg uppercase tracking-tight mb-2">Limited Seats</h3>
                   <p className="text-sm">Seats are subject to availability and internal evaluation. Priority is given to continued students.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display font-black text-3xl uppercase tracking-tight flex items-center gap-4 text-spot-charcoal">
                <span className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-spot-red font-bold text-sm">04</span>
                Use of AI & Digital Tools
              </h2>
              <div className="bg-spot-charcoal text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5"><ScaleIcon size={120} /></div>
                <p className="text-spot-pastel-blue font-black uppercase text-[10px] tracking-widest mb-8">Technology Ethics</p>
                <p className="text-xl font-medium italic">
                  By engaging with SPOT, you acknowledge that AI tools (like Suzu AI) are <span className="text-spot-pastel-yellow italic italic">assistive, not authoritative.</span> Human oversight is consistently maintained.
                </p>
              </div>
            </section>

            <section className="space-y-8">
               <h2 className="font-display font-black text-3xl uppercase tracking-tight text-spot-charcoal">Law & Jurisdiction</h2>
               <div className="p-10 rounded-[3rem] border border-black/5 bg-slate-50">
                  <p className="text-lg leading-relaxed text-spot-charcoal/70 font-medium">
                    These Terms are governed by Indian law. Any disputes are subject to the exclusive jurisdiction of the <span className="text-spot-red">courts in Bangalore, Karnataka.</span>
                  </p>
               </div>
            </section>

            <section className="pt-16 border-t border-black/5 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-spot-charcoal/20 mb-8">Human-First Learning</p>
              <p className="text-lg text-spot-charcoal/50 italic max-w-lg mx-auto leading-relaxed">
                "SPOT is designed for children who think differently. We aim to build safe, inclusive spaces and real-world learning experiences."
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
