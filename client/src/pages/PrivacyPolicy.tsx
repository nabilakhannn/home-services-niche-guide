// ScaleBuds Marketing: Privacy Policy (A2P / SMS + chat widget disclosure)
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BUSINESS_ADDRESS_LINES, BUSINESS_EMAIL } from "@/config/businessContact";

const ORANGE = "#D4622A";
const LAST_UPDATED = "April 14, 2026";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-16" style={{ background: "#0F172A" }}>
        <div className="container max-w-2xl mx-auto text-center">
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,3vw,2.5rem)", color: "#fff", marginBottom: "0.75rem" }}>
            Privacy Policy
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#94A3B8" }}>Last Updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-3xl mx-auto">
          <div className="prose-custom">

            <h2>1. Introduction</h2>
            <p>ScaleBuds Marketing ("Company," "we," "us," or "our") operates the website <strong>scalebuds.com</strong> and provides marketing services to home service contractors. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you visit our website or use our services.</p>
            <p>By using our website or services, you agree to the collection and use of information in accordance with this policy.</p>

            <h2>2. Information We Collect</h2>
            <p>We collect the following categories of personal information:</p>
            <ul>
              <li><strong>Contact Information:</strong> Name, email address, phone number, business name</li>
              <li><strong>Business Information:</strong> Trade/niche, service interests, business details you provide</li>
              <li><strong>Usage Data:</strong> IP address, browser type, pages visited, time spent on pages</li>
              <li><strong>Communications:</strong> Messages, emails, and call recordings (with consent)</li>
            </ul>

            <h2>3. SMS / Text Message Communications</h2>
            <p>
              <strong>Website contact form:</strong> Our strategy-call form collects your name, email, and optional phone number so we can respond to your inquiry by email or voice call. It does <strong>not</strong> add you to a separate SMS marketing program by checkbox on that form.
            </p>
            <p>
              <strong>Website chat widget:</strong> If you start a conversation in our embedded chat and voluntarily provide a mobile number, you may receive customer-care or follow-up SMS in line with the consent and disclosures presented in that chat experience (including how to opt out).
            </p>
            <p>When you have opted in to SMS from us (for example through the chat widget), messages may include:</p>
            <ul>
              <li>Appointment confirmations and reminders</li>
              <li>Follow-up communications regarding your inquiry</li>
              <li>Service-related messages about your support request</li>
            </ul>
            <p><strong>Message Frequency:</strong> Message frequency varies based on your interaction with us.</p>
            <p><strong>Message and Data Rates:</strong> Standard message and data rates may apply depending on your mobile carrier and plan.</p>
            <p><strong>Opt-Out:</strong> You may opt out of SMS communications at any time by replying <strong>STOP</strong> to any text message from us. After opting out, you will receive one final confirmation message. To re-subscribe, text <strong>START</strong>.</p>
            <p><strong>Help:</strong> For help or more information, reply <strong>HELP</strong> to any text message or contact us at <a href={`mailto:${BUSINESS_EMAIL}`} style={{ color: ORANGE }}>{BUSINESS_EMAIL}</a>.</p>
            <p><strong>No Sharing of Phone Numbers:</strong> We will not share, sell, or rent your phone number to third parties for their marketing purposes. Your consent to receive SMS messages is not a condition of purchasing any product or service.</p>
            <p><strong>Supported Carriers:</strong> AT&T, T-Mobile, Verizon, Sprint, Boost Mobile, MetroPCS, U.S. Cellular, and other major carriers. Carriers are not liable for delayed or undelivered messages.</p>

            <h2>4. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and provide our services</li>
              <li>Schedule and conduct strategy calls</li>
              <li>Send you relevant communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and ensure security</li>
            </ul>

            <h2>5. How We Share Your Information</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
            <ul>
              <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our website and delivering services (e.g., CRM software, email platforms, SMS platforms), bound by confidentiality agreements</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>

            <h2>6. Data Retention</h2>
            <p>We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your data at any time by contacting us at <a href={`mailto:${BUSINESS_EMAIL}`} style={{ color: ORANGE }}>{BUSINESS_EMAIL}</a>.</p>

            <h2>7. Cookies and Tracking Technologies</h2>
            <p>Our website uses cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookie settings through your browser preferences.</p>

            <h2>8. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul>
              <li>The right to access the personal information we hold about you</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to opt out of marketing communications</li>
              <li>The right to data portability</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href={`mailto:${BUSINESS_EMAIL}`} style={{ color: ORANGE }}>{BUSINESS_EMAIL}</a>.</p>

            <h2>9. Security</h2>
            <p>We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet is 100% secure.</p>

            <h2>10. Children's Privacy</h2>
            <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.</p>

            <h2>11. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those websites and encourage you to review their privacy policies.</p>

            <h2>12. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated "Last Updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.</p>

            <h2>13. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
            <div className="contact-block">
              <p>
                <strong>ScaleBuds Marketing</strong>
                <br />
                {BUSINESS_ADDRESS_LINES.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
                Email: <a href={`mailto:${BUSINESS_EMAIL}`} style={{ color: ORANGE }}>{BUSINESS_EMAIL}</a>
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
