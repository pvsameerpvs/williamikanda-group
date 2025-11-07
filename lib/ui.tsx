"use client";
import { motion } from 'framer-motion';

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 }
};

export const MotionDiv = motion.div;
export const MotionImg = motion.img;
