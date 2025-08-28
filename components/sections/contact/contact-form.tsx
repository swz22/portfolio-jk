'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface SubmitStatus {
  type: 'success' | 'error' | 'rate-limit';
  message: string;
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Watch form values for character counts
  const watchedMessage = watch('message', '');
  const watchedSubject = watch('subject', '');

  const onSubmit = useCallback(
    async (data: ContactFormData) => {
      setIsSubmitting(true);
      setSubmitStatus(null);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          setSubmitStatus({
            type: 'success',
            message: result.message || 'Message sent successfully!'
          });
          reset();
        } else if (response.status === 429) {
          setSubmitStatus({
            type: 'rate-limit',
            message: result.error || 'Rate limit exceeded. Please wait before trying again.'
          });
        } else {
          setSubmitStatus({
            type: 'error',
            message: result.error || 'Something went wrong. Please try again.'
          });
        }
      } catch (error) {
        console.error('Contact form submission error:', error);
        setSubmitStatus({
          type: 'error',
          message: 'Network error. Please check your connection and try again.'
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [reset]
  );

  const clearStatus = () => setSubmitStatus(null);

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📧</span>
          Send me a message
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Name *
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className={cn(
                  'w-full rounded-lg border bg-background px-4 py-2 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
                  errors.name && 'border-destructive focus:border-destructive focus:ring-destructive/20'
                )}
                placeholder="Your name"
                disabled={isSubmitting}
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1 text-sm text-destructive"
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email *
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className={cn(
                  'w-full rounded-lg border bg-background px-4 py-2 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
                  errors.email && 'border-destructive focus:border-destructive focus:ring-destructive/20'
                )}
                placeholder="you@company.com"
                disabled={isSubmitting}
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1 text-sm text-destructive"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject *
              </label>
              <span className="text-xs text-muted-foreground">
                {watchedSubject.length}/100
              </span>
            </div>
            <input
              {...register('subject')}
              type="text"
              id="subject"
              maxLength={100}
              className={cn(
                'w-full rounded-lg border bg-background px-4 py-2 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
                errors.subject && 'border-destructive focus:border-destructive focus:ring-destructive/20'
              )}
              placeholder="What can I help you with?"
              disabled={isSubmitting}
            />
            <AnimatePresence>
              {errors.subject && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1 text-sm text-destructive"
                >
                  {errors.subject.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="message" className="text-sm font-medium">
                Message *
              </label>
              <span className="text-xs text-muted-foreground">
                {watchedMessage.length}/2000
              </span>
            </div>
            <textarea
              {...register('message')}
              id="message"
              rows={6}
              maxLength={2000}
              className={cn(
                'w-full rounded-lg border bg-background px-4 py-2 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y',
                errors.message && 'border-destructive focus:border-destructive focus:ring-destructive/20'
              )}
              placeholder="Tell me about your project, ask a question, or just say hello! I love hearing from fellow developers and potential collaborators."
              disabled={isSubmitting}
            />
            <AnimatePresence>
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1 text-sm text-destructive"
                >
                  {errors.message.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 md:flex-none"
              loading={isSubmitting}
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  Send Message
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </Button>

            {submitStatus && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearStatus}
                className="text-xs"
              >
                Clear
              </Button>
            )}
          </div>

          <AnimatePresence>
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className={cn(
                  'rounded-lg p-4 shadow-sm',
                  submitStatus.type === 'success' && 'bg-green-500/10 text-green-600 border border-green-500/20',
                  submitStatus.type === 'error' && 'bg-red-500/10 text-red-600 border border-red-500/20',
                  submitStatus.type === 'rate-limit' && 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {submitStatus.type === 'success' && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {submitStatus.type === 'error' && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {submitStatus.type === 'rate-limit' && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">
                      {submitStatus.type === 'success' && '✨ Message Sent!'}
                      {submitStatus.type === 'error' && '❌ Error'}
                      {submitStatus.type === 'rate-limit' && '⏰ Rate Limited'}
                    </p>
                    <p className="text-sm opacity-90 mt-1">
                      {submitStatus.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="mt-6 rounded-lg bg-secondary/20 p-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <strong>Quick Response Time:</strong> I typically respond within 24 hours. 
          </p>
          <p className="mt-2 opacity-75">
            Looking for something urgent? Feel free to reach out on{' '}
            <a 
              href="https://www.linkedin.com/in/jkim022/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-primary transition-colors"
            >
              LinkedIn
            </a>{' '}
            or{' '}
            <a 
              href="https://x.com/jkdev220" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-primary transition-colors"
            >
              Twitter/X
            </a>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}