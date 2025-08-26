'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS, SOCIAL_LINKS } from '@/constants';
import { cn } from '@/lib/utils';
import { useBodyScrollLock } from '@/hooks/use-body-scroll-lock';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  activeSection,
}: MobileMenuProps) {
  useBodyScrollLock(isOpen);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleLinkClick = () => {
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] h-full w-[80%] max-w-sm select-none border-l border-border bg-background md:hidden"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border p-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 transition-colors hover:bg-secondary"
                  aria-label="Close menu"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-8">
                <ul className="space-y-1">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={handleLinkClick}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors',
                          activeSection === item.href.substring(1)
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-secondary'
                        )}
                      >
                        <span className="text-xl">
                          {item.href === '#hero' && '🏠'}
                          {item.href === '#projects' && '💼'}
                          {item.href === '#skills' && '🛠️'}
                          {item.href === '#experience' && '📈'}
                          {item.href === '#contact' && '📧'}
                        </span>
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-border pt-8">
                  <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
                    Connect
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {SOCIAL_LINKS.map((link, index) => (
                      <motion.a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-2 rounded-lg border border-border p-3 transition-all hover:border-primary hover:bg-primary/5"
                      >
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-full"
                          style={{ backgroundColor: link.color + '20' }}
                        >
                          {link.platform === 'GitHub' && (
                            <svg
                              className="h-4 w-4"
                              fill={link.color}
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          )}
                          {link.platform === 'LinkedIn' && (
                            <svg
                              className="h-4 w-4"
                              fill={link.color}
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          )}
                          {link.platform === 'Twitter' && (
                            <svg
                              className="h-5 w-5"
                              fill="#ffffff"
                              viewBox="0 0 24 24"
                            >
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          )}
                          {link.platform === 'Email' && (
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke={link.color}
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm font-medium">
                          {link.platform}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
