'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: 'easeOut' },
};

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using the JK Raffle Ecosystem platform ("Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree with any part of these Terms, you may not use the Platform.\n\nThese Terms constitute a legally binding agreement between you ("Member", "User", or "you") and JK Raffle Ecosystem, operated by the FLG Empire in partnership with IPHC.\n\nThe Platform is operated exclusively within the Republic of South Africa and is governed by South African law.`,
  },
  {
    title: '2. Eligibility',
    content: `To use the JK Raffle Platform, you must:\n\n• Be at least 18 (eighteen) years of age\n• Be a resident of the Republic of South Africa\n• Possess a valid South African ID document\n• Register in person through an authorised Branch Manager\n• Not be excluded from participating in raffles under any applicable law\n\nAccounts may only be created by authorised Branch Managers. Self-registration is not permitted. JK Raffle reserves the right to verify the identity and eligibility of any member at any time.`,
  },
  {
    title: '3. Account Registration',
    content: `Account registration is conducted exclusively at JK Raffle branches by authorised Branch Managers. During registration, you must provide accurate and complete personal information.\n\nYou are responsible for:\n\n• Maintaining the confidentiality of your login credentials\n• All activities that occur under your account\n• Notifying us immediately of any unauthorised use\n• Keeping your contact information up to date\n\nJK Raffle reserves the right to suspend or terminate accounts that violate these Terms or are associated with fraudulent activity.`,
  },
  {
    title: '4. Raffle Participation',
    content: `• Ticket purchases are final and non-refundable unless a campaign is cancelled by JK Raffle.\n• Each ticket provides one entry into the corresponding campaign draw.\n• Purchasing multiple tickets increases your chances of winning but does not guarantee a win.\n• Tickets are non-transferable and may not be resold.\n• The maximum number of tickets per campaign may be limited at JK Raffle's discretion.\n• JK Raffle reserves the right to cancel or postpone any campaign due to circumstances beyond our control.`,
  },
  {
    title: '5. Draws & Winners',
    content: `• All draws are conducted on the dates and at the locations specified in each campaign.\n• Draws are performed using verified random selection methods with independent witnesses present.\n• The winning ticket holder is announced publicly at the draw event and via the Platform.\n• Winners must claim their prize within 30 calendar days of the draw.\n• Prize claims require verification of identity and winning ticket.\n• JK Raffle reserves the right to substitute a prize of equal or greater value if the original prize becomes unavailable.\n• All decisions regarding draws and winners are final.`,
  },
  {
    title: '6. Payments',
    content: `• All prices are quoted in South African Rands (ZAR) and include applicable taxes.\n• Payment is due at the time of ticket purchase.\n• We accept credit cards, debit cards, and EFT (Electronic Funds Transfer).\n• Payments are processed through secure, PCI-DSS compliant payment gateways.\n• JK Raffle does not store full payment card details on our systems.\n• Refunds are only issued if a campaign is cancelled before the draw date. Processing fees may apply.\n• Failed payments may result in ticket cancellation.`,
  },
  {
    title: '7. Intellectual Property',
    content: `All content on the Platform, including but not limited to text, graphics, logos, images, and software, is the property of JK Raffle Ecosystem, FLG Empire, or their respective owners and is protected by South African and international intellectual property laws.\n\nYou may not:\n• Reproduce, distribute, or modify any content without prior written consent\n• Use the JK Raffle name, logo, or branding for any purpose without authorisation\n• Scrape, crawl, or extract data from the Platform`,
  },
  {
    title: '8. Prohibited Conduct',
    content: `You may not:\n\n• Create multiple accounts\n• Use the Platform for any unlawful purpose\n• Attempt to manipulate, hack, or interfere with the Platform's systems\n• Purchase tickets using fraudulent payment methods\n• Harass, abuse, or threaten other members or staff\n• Spread false or misleading information about JK Raffle\n• Attempt to resell tickets outside the Platform\n• Use automated tools or bots to interact with the Platform`,
  },
  {
    title: '9. Limitation of Liability',
    content: `To the fullest extent permitted by South African law:\n\n• JK Raffle is not liable for any indirect, incidental, or consequential damages arising from your use of the Platform.\n• Our total liability for any claim shall not exceed the amount you have paid in ticket purchases in the 12 months preceding the claim.\n• JK Raffle is not responsible for technical failures, network issues, or force majeure events that may affect draws or the Platform.\n• Participation in raffles is at your own risk.`,
  },
  {
    title: '10. Dispute Resolution',
    content: `Any disputes arising from these Terms or your use of the Platform shall first be attempted to be resolved through our internal complaints procedure by contacting support@jkraffle.co.za.\n\nIf the dispute cannot be resolved internally, it shall be referred to mediation administered by a mediator agreed upon by both parties. If mediation fails, the dispute shall be subject to the exclusive jurisdiction of the courts of the Republic of South Africa, sitting in Johannesburg.`,
  },
  {
    title: '11. Amendments',
    content: `JK Raffle reserves the right to amend these Terms at any time. Material changes will be communicated to members via email notification and/or Platform announcement at least 30 days before they take effect.\n\nYour continued use of the Platform after amendments take effect constitutes acceptance of the revised Terms.`,
  },
  {
    title: '12. Contact Information',
    content: `For questions or concerns about these Terms of Service, please contact us:\n\nJK Raffle Ecosystem\nEmail: legal@jkraffle.co.za\nPhone: +27 80 000 1234\nAddress: 145 Sandton City Mall, Rivonia Rd, Sandton, Johannesburg, 2196\n\nA proud initiative of FLG Empire in partnership with IPHC.`,
  },
];

export function PublicTerms() {
  return (
    <div className="pt-16 lg:pt-18">
      {/* Header */}
      <section className="bg-gradient-to-b from-forest-50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <FileText className="h-3 w-3 mr-1" />
              Legal
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Terms of <span className="gradient-text">Service</span>
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