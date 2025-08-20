'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SITE_CONFIG } from '@/constants';

const contactDetails = [
  {
    icon: '📧',
    label: 'Email',
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: '📍',
    label: 'Location',
    value: SITE_CONFIG.location,
  },
  {
    icon: '💼',
    label: 'Availability',
    value: SITE_CONFIG.availability,
  },
];

export function ContactInfo() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contactDetails.map((detail, index) => (
          <motion.div
            key={detail.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3"
          >
            <span className="text-2xl">{detail.icon}</span>
            <div>
              <p className="text-sm text-muted-foreground">{detail.label}</p>
              {detail.href ? (
                <a
                  href={detail.href}
                  className="font-medium transition-colors hover:text-primary"
                >
                  {detail.value}
                </a>
              ) : (
                <p className="font-medium">{detail.value}</p>
              )}
            </div>
          </motion.div>
        ))}

        <div className="mt-6 space-y-3">
          <p className="text-sm text-muted-foreground">Response time</p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <p className="text-sm">Usually responds within 24 hours</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
