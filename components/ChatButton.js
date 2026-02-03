"use client";

import { MessageCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useChatModalStore } from "@/store/chatModalStore";

export default function ChatButton() {
  const onOpen = useChatModalStore((s) => s.openChat);
  // const onClose = useChatModalStore((s) => s.closeChat);
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: 0.5,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="fixed bottom-6 left-6 z-50">
      {/* Pulsing Ring Effect */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-xl"
      />

      {/* Main Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onOpen}
        className="group relative w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl shadow-indigo-500/40 flex items-center justify-center overflow-hidden border border-white/20 hover:shadow-indigo-500/60 transition-all duration-300">
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
          />
        </div>

        {/* Icon */}
        <MessageCircle className="relative z-10 w-6 h-6 text-white" />

        {/* Sparkle Icon (appears on hover) */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileHover={{ scale: 1, rotate: 0 }}
          className="absolute -top-1 -right-1 z-20">
          <Sparkles className="w-4 h-4 text-yellow-300" />
        </motion.div>
      </motion.button>

      {/* Notification Badge */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full border-2 border-slate-900 shadow-lg flex items-center justify-center z-30">
        <motion.span
          animate={{
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-2 h-2 bg-white rounded-full"
        />
      </motion.div>

      {/* Floating Orbs */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full blur-lg pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 10, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-pink-500/30 to-cyan-500/30 rounded-full blur-lg pointer-events-none"
      />
    </motion.div>
  );
}
