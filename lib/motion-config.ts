import { MotionProps } from 'framer-motion';

export const fadeInUp: MotionProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.5 },
  style: { transform: 'translateZ(0)' },
};

export const fadeIn: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
  style: { transform: 'translateZ(0)' },
};

export const scaleIn: MotionProps = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.3 },
  style: { transform: 'translateZ(0)' },
};

export const slideInLeft: MotionProps = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3 },
  style: { transform: 'translateZ(0)' },
};

export const slideInRight: MotionProps = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.3 },
  style: { transform: 'translateZ(0)' },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getMotionProps = (props: MotionProps): MotionProps => {
  if (prefersReducedMotion()) {
    return {
      ...props,
      initial: false,
      animate: true,
      transition: { duration: 0 },
    };
  }
  return props;
};
