"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingSplash({
  logoUrl,
  brandName
}: {
  logoUrl?: string;
  brandName?: string;
}) {
  const activeBrandName = brandName || "Shah Jalal Enterprise";
  const letters = activeBrandName.split("");

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-primary/80"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading, please wait...</span>

      {/* Main Logo Container */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Animated Orbital Rings */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-32 h-32 border-2 border-white/30 rounded-full"
        />

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="absolute w-24 h-24 border border-white/50 rounded-full"
        />

        {/* Central Logo Symbol */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 1,
          }}
          className="relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg bg-white"
        >
          {/* Healthcare Cross Symbol */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            className="relative w-10 h-10"
          >
            <motion.div
              className="absolute bg-primary rounded-sm"
              initial={{ width: 0 }}
              animate={{ width: "24px" }}
              transition={{ delay: 0.5, duration: 0.3 }}
              style={{
                height: "6px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <motion.div
              className="absolute bg-primary rounded-sm"
              initial={{ height: 0 }}
              animate={{ height: "24px" }}
              transition={{ delay: 0.7, duration: 0.3 }}
              style={{
                width: "6px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </motion.div>

          {/* Pulsing Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl border border-white/40"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Connecting Dots */}
        <motion.div
          className="absolute top-0 right-0 w-3 h-3 rounded-full bg-white"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{ delay: 0.8, duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-2 h-2 rounded-full bg-white"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
        />
      </div>

      {/* Brand Text */}
      <div className="mt-12 text-center max-w-lg px-6">
        {/* BrandName Text */}
        <div className="flex flex-wrap justify-center text-3xl md:text-4xl font-bold mb-3 tracking-wide text-white drop-shadow-md">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.4 + i * 0.04,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="block"
              style={{ marginRight: letter === " " ? "0.5rem" : "0px" }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-sm md:text-md font-medium tracking-widest uppercase text-white/90"
        >
          Global Trade & Medical Tourism
        </motion.p>

        {/* Loading Bar */}
        <div className="w-48 h-1 bg-white/20 rounded-full mt-6 mx-auto overflow-hidden relative">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
            }}
            className="absolute h-full w-1/2 bg-white rounded-full"
          />
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ delay: 0.5, duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-1.5 h-1.5 rounded-full bg-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
}
