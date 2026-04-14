import { useState } from 'react';
import { Bot, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactForm } from './Contact';

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating AI Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="fab-chat"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open AI Estimator"
          >
            <Bot size={26} />
            <span className="fab-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              className="chat-overlay-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              className="chat-overlay"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            >
              <div className="chat-overlay-header">
                <div className="chat-overlay-title">
                  <Bot size={22} color="var(--accent)" />
                  <div>
                    <h4>AI Estimator</h4>
                    <span>Get an instant quote</span>
                  </div>
                </div>
                <div className="chat-overlay-actions">
                  <a href="tel:9858606725" className="chat-call-btn" aria-label="Call">
                    <Phone size={18} />
                  </a>
                  <button className="chat-close-btn" onClick={() => setIsOpen(false)} aria-label="Close">
                    <X size={20} />
                  </button>
                </div>
              </div>
              <ContactForm />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
