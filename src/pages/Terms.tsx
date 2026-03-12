import React from 'react';

export default function Terms() {
  return (
    <main className="pt-32 pb-24 px-6 bg-spot-cream min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-black/5">
        <h1 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg text-spot-charcoal/80 space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="font-bold text-2xl text-spot-charcoal mt-8 mb-4">1. Agreement to Terms</h2>
          <p>By accessing our website, you agree to be bound by these Terms of Service and to use the site in accordance with these Terms of Service, our Privacy Policy, and any additional terms and conditions that may apply to specific sections of the site or to products and services available through the site or from SPOT Microschool.</p>
          
          <h2 className="font-bold text-2xl text-spot-charcoal mt-8 mb-4">2. Intellectual Property Rights</h2>
          <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.</p>

          <h2 className="font-bold text-2xl text-spot-charcoal mt-8 mb-4">3. User Representations</h2>
          <p>By using the Site, you represent and warrant that:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>All registration information you submit will be true, accurate, current, and complete.</li>
            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
            <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
            <li>You will not use the Site for any illegal or unauthorized purpose.</li>
          </ul>

          <h2 className="font-bold text-2xl text-spot-charcoal mt-8 mb-4">4. Modifications and Interruptions</h2>
          <p>We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site without notice at any time.</p>

          <h2 className="font-bold text-2xl text-spot-charcoal mt-8 mb-4">5. Governing Law</h2>
          <p>These Terms shall be governed by and defined following the laws of the jurisdiction in which SPOT Microschool operates. SPOT Microschool and yourself irrevocably consent that the courts of that jurisdiction shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>
        </div>
      </div>
    </main>
  );
}
