'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  HeadphonesIcon,
  MessageSquare,
  Building2,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export function PublicContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      toast.success('Support ticket submitted', {
        description: 'We\'ll get back to you within 24 hours.',
      });
    }, 1500);
  };

  return (
    <div className="pt-16 lg:pt-18">
      {/* Header */}
      <section className="bg-gradient-to-b from-forest-50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <HeadphonesIcon className="h-3 w-3 mr-1" />
              Get In Touch
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have a question or need assistance? Our support team is here to help.
              Reach out through any of the channels below.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Contact Info */}
            <motion.div {...fadeInUp} className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

                <div className="space-y-5">
                  <Card className="border-border/50 shadow-sm">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-forest-50 flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-forest-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm mb-1">Head Office</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          145 Sandton City Mall<br />
                          Rivonia Road, Sandton<br />
                          Johannesburg, 2196<br />
                          South Africa
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 shadow-sm">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-forest-50 flex items-center justify-center shrink-0">
                        <Phone className="h-5 w-5 text-forest-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm mb-1">Phone</h3>
                        <p className="text-sm text-muted-foreground">
                          General: <a href="tel:+27800001234" className="text-forest-500 hover:underline">+27 80 000 1234</a>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Support: <a href="tel:+27800005678" className="text-forest-500 hover:underline">+27 80 000 5678</a>
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 shadow-sm">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-forest-50 flex items-center justify-center shrink-0">
                        <Mail className="h-5 w-5 text-forest-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm mb-1">Email</h3>
                        <p className="text-sm text-muted-foreground">
                          General: <a href="mailto:info@jkraffle.co.za" className="text-forest-500 hover:underline">info@jkraffle.co.za</a>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Support: <a href="mailto:support@jkraffle.co.za" className="text-forest-500 hover:underline">support@jkraffle.co.za</a>
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 shadow-sm">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-forest-50 flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5 text-forest-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm mb-1">Office Hours</h3>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Monday – Friday: 08:00 – 17:00 SAST</p>
                          <p>Saturday: 09:00 – 13:00 SAST</p>
                          <p>Sunday & Public Holidays: Closed</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div {...fadeInUp} className="lg:col-span-3">
              <Card className="border-border/50 shadow-sm">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-forest-50 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-forest-500" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Submit a Support Ticket</h2>
                      <p className="text-sm text-muted-foreground">
                        We&apos;ll respond within 24 business hours
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.co.za"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Brief description of your query"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Please provide as much detail as possible..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        className="resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-forest-500 hover:bg-forest-600 text-white"
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Submit Ticket
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}