'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: 'easeOut' },
};

const sections = [
  {
    title: '1. Introduction',
    content: `JK Raffle Ecosystem ("JK Raffle", "we", "us", or "our") is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, visit our website, or interact with our services.\n\nThis policy applies to all members, visitors, and users of the JK Raffle platform across all branches in South Africa. By using our services, you agree to the collection and use of information in accordance with this policy.`,
  },
  {
    title: '2. Information We Collect',
    content: `We collect the following types of information:\n\n• Personal Information: Full name, email address, phone number, residential address, and South African ID number. This is collected in person by your Branch Manager during account creation.\n\n• Account Information: Login credentials (encrypted), account preferences, notification settings, and transaction history.\n\n• Payment Information: Payment method details are processed through secure third-party payment gateways. We do not store full credit/debit card numbers on our systems.\n\n• Usage Data: Pages visited, features used, time spent on the platform, device information, and IP address.\n\n• Communication Data: Support ticket correspondence, email communications, and feedback submitted to our team.`,
  },
  {
    title: '3. How We Use Your Information',
    content: `We use the information we collect to:\n\n• Create and manage your JK Raffle member account\n• Process ticket purchases and manage payments\n• Conduct raffle draws and notify winners\n• Communicate with you about campaigns, draws, and results\n• Provide customer support and respond to inquiries\n• Send important notifications (draw reminders, payment confirmations)\n• Improve our platform and develop new features\n• Comply with legal and regulatory obligations\n• Prevent fraud and ensure platform security`,
  },
  {
    title: '4. Information Sharing',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:\n\n• Branch Managers: Your assigned Branch Manager has access to your basic account information for support purposes.\n• Payment Processors: We share necessary transaction data with our payment gateway partners to process your purchases.\n• Draw Verification: Winner information (name, province, prize) may be published on our platform and social media for transparency purposes.\n• Legal Requirements: We may disclose information when required by South African law, regulation, or legal process.\n• Public Draws: For transparency, winner announcements may include the winner's first name, last initial, city, and province.`,
  },
  {
    title: '5. Data Security',
    content: `We implement industry-standard security measures to protect your personal information, including:\n\n• SSL/TLS encryption for all data in transit\n• AES-256 encryption for sensitive data at rest\n• Secure, audited payment processing through PCI-DSS compliant gateways\n• Regular security audits and penetration testing\n• Access controls and authentication requirements\n• Employee training on data protection best practices\n\nWhile we strive to protect your information, no method of electronic transmission or storage is completely secure. We encourage you to use strong passwords and keep your login credentials confidential.`,
  },
  {
    title: '6. Data Retention',
    content: `We retain your personal information for as long as your account is active or as needed to provide our services. We also retain information as required by South African law, including tax and gaming regulatory requirements (typically 5-7 years).\n\nYou may request account deletion at any time by contacting your Branch Manager or our support team. Certain records may need to be retained for legal compliance even after account deletion.`,
  },
  {
    title: '7. Your Rights',
    content: `Under the Protection of Personal Information Act (POPIA), you have the right to:\n\n• Access your personal information held by us\n• Request correction of inaccurate information\n• Request deletion of your personal information (subject to legal obligations)\n• Object to processing of your personal information\n• Withdraw consent where processing is based on consent\n• Lodge a complaint with the Information Regulator\n\nTo exercise any of these rights, please contact us at privacy@jkraffle.co.za or through your Branch Manager.`,
  },
  {
    title: '8. Cookies',
    content: `We use cookies and similar technologies to:\n\n• Remember your login session\n• Analyse platform usage and improve performance\n• Deliver personalised content and notifications\n\nYou can control cookie settings through your browser. Disabling cookies may affect some platform features. We do not use third-party advertising cookies.`,
  },
  {
    title: '9. Children\'s Privacy',
    content: `JK Raffle is only available to persons aged 18 and over. We do not knowingly collect information from minors. Account creation requires in-person age verification by a Branch Manager.`,
  },
  {
    title: '10. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our platform and, where appropriate, sending you a notification. Your continued use of the platform after changes are posted constitutes acceptance of the updated policy.`,
  },
  {
    title: '11. Contact Us',
    content: `If you have any questions about this Privacy Policy or our data practices, please contact us:\n\nJK Raffle Ecosystem\nEmail: privacy@jkraffle.co.za\nPhone: +27 80 000 1234\nAddress: 145 Sandton City Mall, Rivonia Rd, Sandton, Johannesburg, 2196\n\nFor POPIA-related complaints, you may also contact the Information Regulator of South Africa.`,
  },
];

export function PublicPrivacy() {
  return (
    <div className="pt-16 lg:pt-18">
      {/* Header */}
      <section className="bg-gradient-to-b from-forest-50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <Shield className="h-3 w-3 mr-1" />
              Legal
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: 1 June 2025 &bull; Effective: 1 June 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <motion.div {...fadeInUp} className="space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}