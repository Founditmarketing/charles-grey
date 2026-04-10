import { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';

export function ContactForm() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm the Charles Grey AI Estimator. I can get you a high-level estimate right now. First, what type of project are you planning?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);

  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e, textOverride = null) => {
    if (e) e.preventDefault();
    const txt = textOverride || inputMessage;
    if (!txt.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: txt }]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: txt,
          history: messages
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`API returned ${response.status}`);
      }
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.response || "Something went wrong!" }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting right now. Please call us directly at 985-860-6725!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const showOptions = messages.length === 1;

  return (
    <div className="ai-chat-container">
      <div className="chat-header">
        <Bot size={24} color="var(--accent)" />
        <div>
          <h4>Charles Grey Estimator</h4>
          <span>AI Assistant</span>
        </div>
      </div>
      
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((msg, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={idx} 
            className={`chat-message ${msg.role}`}
          >
            <div className="msg-avatar">{msg.role === 'ai' ? <Bot size={16}/> : <User size={16}/>}</div>
            <div className="msg-bubble">{msg.text}</div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="chat-message ai">
            <div className="msg-avatar"><Bot size={16}/></div>
            <div className="msg-bubble typing">
              <span></span><span></span><span></span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {showOptions && (
        <div className="chat-quick-options">
          <button type="button" onClick={() => handleSendMessage(null, "Residential Build")}>Residential Build</button>
          <button type="button" onClick={() => handleSendMessage(null, "Commercial Metal Building")}>Commercial Metal Build</button>
          <button type="button" onClick={() => handleSendMessage(null, "Restaurant Build-out")}>Restaurant Build-out</button>
        </div>
      )}

      <form className="chat-input-area" onSubmit={(e) => handleSendMessage(e)}>
        <input 
          type="text" 
          placeholder="Type your message..." 
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          disabled={isTyping}
        />
        <button type="submit" disabled={isTyping || !inputMessage.trim()}><Send size={18}/></button>
      </form>
    </div>
  );
}

export function SocialProof() {
  const reviews = [
    {
      name: "Verified Homeowner",
      location: "Houma, LA",
      text: "Impeccable customer service from start to finish. The crew showed up on time every single day and the quality of work exceeded our expectations. Would absolutely hire again.",
      rating: 5,
      source: "HomeAdvisor",
      verified: true
    },
    {
      name: "Commercial Client",
      location: "Thibodaux, LA",
      text: "Great response time. We needed a metal building erected on a tight deadline and Charles Grey delivered ahead of schedule. Their line-item estimate was transparent — zero surprises.",
      rating: 5,
      source: "HomeAdvisor",
      verified: true
    },
    {
      name: "Restaurant Owner",
      location: "New Orleans, LA",
      text: "They handled our full restaurant build-out — demolition, framing, electrical, plumbing, and finishing. One contractor, one point of contact, done right the first time.",
      rating: 5,
      source: "Google",
      verified: true
    },
    {
      name: "Property Developer",
      location: "Baton Rouge, LA",
      text: "I've worked with a lot of GCs across Louisiana and Charles Grey is the real deal. Competitive pricing, fast deployment, and they don't cut corners. Period.",
      rating: 5,
      source: "Google",
      verified: true
    }
  ];

  const stars = (count) => '★'.repeat(count) + '☆'.repeat(5 - count);

  return (
    <section className="section social-proof" id="reviews">
      <div className="section-tag">Verified Reviews</div>
      <h2 className="section-title">Proven. Not Promised.</h2>
      <p className="section-desc">Real feedback from real Louisiana homeowners, developers, and business owners.</p>
      
      <div className="test-grid">
        {reviews.map((r, i) => (
          <div className="test-card" key={i}>
            <div className="review-stars">{stars(r.rating)}</div>
            <p className="test-text">"{r.text}"</p>
            <div className="test-author">
              <div className="review-avatar">{r.name.charAt(0)}</div>
              <div>
                <h4>{r.name}</h4>
                <span>{r.location}</span>
              </div>
            </div>
            {r.verified && (
              <div className="review-source">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Verified on {r.source}
              </div>
            )}
          </div>
        ))}
      </div>


      {/* Invisible JSON-LD AggregateRating Schema for Google Rich Snippets */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "GeneralContractor",
        "name": "Charles Grey Construction LLC",
        "image": "https://charlesgreyconstruction.com/hero-poster.png",
        "telephone": "985-860-6725",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "488 Corporate Dr #11",
          "addressLocality": "Houma",
          "addressRegion": "LA",
          "postalCode": "70360",
          "addressCountry": "US"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "27"
        },
        "priceRange": "$$$$"
      })}} />
    </section>
  );
}
