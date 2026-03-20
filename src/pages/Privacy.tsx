import React from 'react';

export default function Privacy() {
  return (
    <main className="pt-32 pb-24 px-6 bg-spot-cream min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-black/5">
        <h1 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg text-spot-charcoal/80 space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="font-bold text-2xl text-spot-charcoal mt-8 mb-4">1. Introduction</h2>
          <p>Welcome to SPOT Microschool. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
          
          <h2 className="font-bold text-2xl text-spot-charcoal mt-8 mb-4">2. The Data We Collect About You</h2>
          <p>Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
          </ul>

          <h2 className="font-bold text-2xl text-spot-charcoal mt-8 mb-4">3. How We Use Your Personal Data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>

          <h2 className="font-bold text-2xl text-spot-charcoal mt-8 mb-4">4. Data Security</h2>
          <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>

          <h2 className="font-bold text-2xl text-spot-charcoal mt-8 mb-4">5. Contact Us</h2>
          <p>If you have any questions about this privacy policy or our privacy practices, please contact us at team@spotschool.in.</p>
        </div>
      </div>
    </main>
  );
}
