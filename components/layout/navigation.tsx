'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/constants';
import { Button } from '@/components/ui/button';
import { MobileMenu } from './mobile-menu';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ThemeSelector } from '@/components/ui/theme-selector';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div
            className={cn(
              'glass glass-hover rounded-full px-4 py-3 transition-all duration-300 md:px-8 md:py-4',
              isScrolled ? 'backdrop-blur-xl' : 'backdrop-blur-md'
            )}
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="text-xl font-bold tracking-tight transition-colors hover:text-primary md:text-2xl"
              >
                JK
              </Link>

              <ul className="hidden items-center gap-6 md:flex lg:gap-8">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'text-sm font-medium transition-colors hover:text-primary',
                        mounted && activeSection === item.href.substring(1)
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3">
                <ThemeToggle />
                <ThemeSelector />

                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label="Open menu"
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
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Button>

                <Button
                  variant="default"
                  size="sm"
                  asChild
                  className="hidden md:inline-flex"
                >
                  <Link href="#contact" prefetch={false}>
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
