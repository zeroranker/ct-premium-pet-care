"use client";

import { motion } from "framer-motion";
import MaskedHeading from "@/components/ui/MaskedHeading";

export default function PrivacyPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="relative z-10 px-6 md:px-12 py-32 pt-40"
    >
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-50px" }} 
            transition={{ duration: 0.5 }}
            className="text-eyebrow mb-4"
          >
            Legal
          </motion.p>
          <MaskedHeading className="text-display text-4xl text-white md:text-6xl">Privacy Policy</MaskedHeading>
        </div>

        <div className="space-y-10 text-slate-400 font-light leading-relaxed">
          <section>
            <h3 className="text-xl font-medium text-white mb-4">1. Information We Collect</h3>
            <p className="mb-4">
              CT Premium Pet Care collects information that you provide directly to us when filling out our booking wizard. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Client Name, Phone Number, and Email Address</li>
              <li>Dog Name, Size, and Behavioral Notes</li>
              <li>Requested Service, Date, and Time</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-medium text-white mb-4">2. How We Use Your Information</h3>
            <p className="mb-4">
              The information we collect is used strictly to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Process and confirm your booking requests.</li>
              <li>Communicate with you regarding your appointment.</li>
              <li>Provide our dog walking and pet sitting services safely and effectively.</li>
            </ul>
            <p className="mt-4">
              We do not sell, rent, or trade your personal information to third parties.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-medium text-white mb-4">3. Data Transmission</h3>
            <p>
              Booking requests are transmitted securely through our third-party form processor, Formspree. Once submitted, the data is sent directly to our internal team email to facilitate your booking.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-medium text-white mb-4">4. Data Retention</h3>
            <p>
              We retain your contact and pet information only for as long as necessary to provide our services and to maintain records for future bookings. You may request deletion of your data at any time by contacting us.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-medium text-white mb-4">5. Contact Us</h3>
            <p>
              If you have any questions or concerns about this Privacy Policy or how your data is handled, please reach out to us directly.
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
}