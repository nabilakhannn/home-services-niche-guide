// ScaleBuds Marketing: Terms of Service (A2P 10DLC Compliant)
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ORANGE = "#D4622A";
const LAST_UPDATED = "April 10, 2026";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-16" style={{ background: "#0F172A" }}>
        <div className="container max-w-2xl mx-auto text-center">
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,3vw,2.5rem)", color: "#fff", marginBottom: "0.75rem" }}>
            Terms of Service
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#94A3B8" }}>Last Updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-3xl mx-auto">
          <div className="prose-custom">

            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using the ScaleBuds Marketing website (<strong>scalebuds.com</strong>) or any of our services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our website or services.</p>

            <h2>2. Services Description</h2>
            <p>ScaleBuds Marketing provides digital marketing services for home service contractors, including but not limited to: AI phone answering systems, Google Ads management, Local SEO, Facebook and Instagram advertising, review generation, and speed-to-lead automation.</p>

            <h2>3. SMS Messaging Terms</h2>
            <p>By providing your phone number and consenting to receive SMS messages from ScaleBuds Marketing, you agree to the following terms:</p>

            <h3>3.1 Program Description</h3>
            <p>ScaleBuds Marketing sends SMS messages for the following purposes: appointment confirmations, strategy call reminders, follow-up communications regarding your inquiry, and information about our marketing services.</p>

            <h3>3.2 Message Frequency</h3>
            <p>Message frequency varies. You may receive up to 5 messages per month, depending on your level of engagement with our services.</p>

            <h3>3.3 Message and Data Rates</h3>
            <p>Message and data rates may apply. These charges are billed by your mobile carrier. ScaleBuds Marketing is not responsible for any charges imposed by your carrier.</p>

            <h3>3.4 Opt-Out Instructions</h3>
            <p>You may opt out of receiving SMS messages at any time by:</p>
            <ul>
              <li>Replying <strong>STOP</strong> to any SMS message from us</li>
              <li>Contacting us at <a href="mailto:nabila@scalebuds.com" style={{ color: ORANGE }}>nabila@scalebuds.com</a></li>
              <li>Calling us at (609) 977-1129</li>
            </ul>
            <p>After sending STOP, you will receive one final confirmation message. You will not receive further SMS messages unless you re-subscribe by texting <strong>START</strong>.</p>

            <h3>3.5 Help</h3>
            <p>For assistance, reply <strong>HELP</strong> to any SMS message or contact us at <a href="mailto:nabila@scalebuds.com" style={{ color: ORANGE }}>nabila@scalebuds.com</a> or (609) 977-1129.</p>

            <h3>3.6 Supported Carriers</h3>
            <p>Supported carriers include AT&T, T-Mobile, Verizon Wireless, Sprint, Boost Mobile, MetroPCS, U.S. Cellular, and other major U.S. carriers. Carriers are not liable for delayed or undelivered messages. Message delivery is not guaranteed.</p>

            <h3>3.7 No Condition of Purchase</h3>
            <p>Consent to receive SMS messages is not a condition of purchasing any product or service from ScaleBuds Marketing.</p>

            <h2>4. Use of Website</h2>
            <p>You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of others. You may not:</p>
            <ul>
              <li>Use the website in any way that violates applicable laws or regulations</li>
              <li>Transmit any unsolicited or unauthorized advertising or promotional material</li>
              <li>Attempt to gain unauthorized access to any part of the website</li>
              <li>Use automated tools to scrape or extract data from the website</li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>All content on this website, including text, graphics, logos, images, and software, is the property of ScaleBuds Marketing and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>

            <h2>6. Disclaimer of Warranties</h2>
            <p>Our website and services are provided "as is" without any warranties, express or implied. ScaleBuds Marketing does not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.</p>

            <h2>7. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, ScaleBuds Marketing shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services, even if we have been advised of the possibility of such damages.</p>

            <h2>8. Indemnification</h2>
            <p>You agree to indemnify and hold harmless ScaleBuds Marketing, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our services or violation of these Terms.</p>

            <h2>9. Privacy Policy</h2>
            <p>Your use of our website and services is also governed by our <a href="/privacy-policy" style={{ color: ORANGE }}>Privacy Policy</a>, which is incorporated into these Terms by reference.</p>

            <h2>10. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the State of New Jersey, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of New Jersey.</p>

            <h2>11. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. We will notify you of significant changes by posting the updated Terms on this page with a new "Last Updated" date. Your continued use of our services after changes constitutes acceptance of the updated Terms.</p>

            <h2>12. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <div className="contact-block">
              <p><strong>ScaleBuds Marketing</strong><br />
              Email: <a href="mailto:nabila@scalebuds.com" style={{ color: ORANGE }}>nabila@scalebuds.com</a><br />
              Phone: <a href="tel:+16099771129" style={{ color: ORANGE }}>(609) 977-1129</a></p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
