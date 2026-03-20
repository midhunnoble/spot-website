import React from 'react';

export default function Refund() {
  return (
    <main className="pt-32 pb-24 px-6 bg-spot-cream min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-black/5">
        <h1 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal mb-8">Refund Policy</h1>
        
        <div className="prose prose-lg text-spot-charcoal/80 space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="font-bold text-2xl text-spot-charcoal mt-8 mb-4">1. Enrollment Fees</h2>
          <p>The registration fee paid at the time of application is non-refundable. This fee covers the administrative costs of processing the application and conducting the initial assessment/interview.</p>
          
          <h2 className="font-bold text-2xl text-spot-charcoal mt-8 mb-4">2. Tuition Refunds</h2>
          <p>Tuition refunds are handled on a case-by-case basis depending on the timing of the withdrawal:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Before the term starts:</strong> 80% of the tuition fee is refundable.</li>
            <li><strong>Within the first 2 weeks of term:</strong> 50% of the tuition fee is refundable.</li>
            <li><strong>After 2 weeks of term:</strong> No refunds will be provided for the current term.</li>
          </ul>

          <h2 className="font-bold text-2xl text-spot-charcoal mt-8 mb-4">3. Studio & Workshop Refunds</h2>
          <p>For short-term workshops, summer camps, and individual studio sessions:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cancellations made more than 7 days before the start date: 90% refund.</li>
            <li>Cancellations made between 2-7 days before the start date: 50% refund.</li>
            <li>Cancellations made less than 48 hours before the start date: Non-refundable.</li>
          </ul>

          <h2 className="font-bold text-2xl text-spot-charcoal mt-8 mb-4">4. Process for Refund</h2>
          <p>To request a refund, please send an email to team@spotschool.in with your registration details and the reason for withdrawal. Refunds will be processed within 10-15 working days.</p>
          
          <h2 className="font-bold text-2xl text-spot-charcoal mt-8 mb-4">5. Contact Us</h2>
          <p>If you have any questions about our refund policy, please contact us at team@spotschool.in.</p>
        </div>
      </div>
    </main>
  );
}
