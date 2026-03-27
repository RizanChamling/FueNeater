import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, MoreHorizontal, Sparkles, Box, Info } from 'lucide-react';

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to the FurNeater Design Studio. I am your Architectural Assistant. How can I help you shape your vision today?', sender: 'agent' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const knowledgeBase = {
    store: {
      precision: "Our 3D engine uses parametric data to ensure 0.5mm accuracy between your digital design and the final physical piece.",
      location: "Our master workshop is located in Hudson Valley, NY, where we combine CNC technology with hand-finishing.",
      process: "We follow a 'Digital Twin' philosophy. Every custom order is first perfected in 3D before a single cut is made in timber.",
      materials: "We exclusively use FSC-certified hardwoods, primarily European Oak, American Walnut, and White Ash."
    },
    recommendations: {
      small_space: "For compact urban spaces, I recommend our 'Minimalist Work Desk' or 'Compact Dining Table' from the Readymade collection.",
      luxury: "If you're seeking a statement piece, our 'Dark Walnut' finish with 'Liquid Gold' hardware accents is our most prestigious combination.",
      office: "For productivity, our 'Professional Desk' series includes integrated cable management ports and ergonomic surface heights."
    },
    general: {
      ergonomics: "Furniture ergonomics isn't just about comfort; it's about spinal alignment. Our chairs are designed with a 105-degree backrest tilt for optimal lumbar support.",
      wood_care: "To preserve your timber's soul, avoid direct sunlight and maintain a stable humidity of 40-60%. We use VOC-free bioactive oils that breathe with the wood.",
      mid_century: "Mid-century modern design focuses on clean lines and organic shapes. Our 'Tapered Leg' style is a direct homage to this 1950s aesthetic."
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const q = inputValue.toLowerCase();
      let response = "That is an interesting vision. While I connect you with a master craftsman, I can tell you that our Furniture 3D Studio is specifically designed to handle such requirements. Would you like to explore our material options?";

      // Intelligent Logic
      if (q.includes('precision') || q.includes('accurate')) {
        response = knowledgeBase.store.precision;
      } else if (q.includes('where') || q.includes('location')) {
        response = knowledgeBase.store.location;
      } else if (q.includes('wood') || q.includes('walnut') || q.includes('oak')) {
        response = `${knowledgeBase.store.materials} ${knowledgeBase.general.wood_care}`;
      } else if (q.includes('small') || q.includes('apartment') || q.includes('compact')) {
        response = knowledgeBase.recommendations.small_space;
      } else if (q.includes('luxury') || q.includes('expensive') || q.includes('premium')) {
        response = knowledgeBase.recommendations.luxury;
      } else if (q.includes('ergonomic') || q.includes('back') || q.includes('sitting')) {
        response = knowledgeBase.general.ergonomics;
      } else if (q.includes('mid century') || q.includes('scandi') || q.includes('style')) {
        response = knowledgeBase.general.mid_century;
      } else if (q.includes('recommend') || q.includes('best') || q.includes('suggest')) {
        response = "Based on our latest 2026 data, many clients are opting for the 'Bookshelf Grid' for its versatility. Are you furnishing a living space or an office?";
      }

      setIsTyping(false);
      setMessages((prev) => [
         ...prev, 
         { id: Date.now() + 1, text: response, sender: 'agent' }
      ]);
    }, 1200);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-10 right-10 w-16 h-16 bg-black text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageCircle className="w-7 h-7" />
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full border-4 border-white animate-pulse" />
      </button>

      <div className={`fixed bottom-10 right-10 w-[400px] bg-white/90 backdrop-blur-3xl shadow-2xl rounded-[3rem] border border-white/40 flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right z-50 ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-10 opacity-0 pointer-events-none'}`} style={{ height: '600px' }}>
        
        {/* Editorial Header */}
        <div className="bg-black text-white p-8 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
               <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <div>
               <h3 className="font-serif font-bold text-lg leading-none">Design Concierge</h3>
               <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-2 font-bold">Studio Assistant • Online</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
             <X className="w-4 h-4" />
          </button>
        </div>

        {/* Conversation Area */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar flex flex-col gap-6">
           <div className="text-center">
              <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-gray-300">Synchronizing with Studio...</span>
           </div>

           {messages.map((msg) => (
             <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-6 rounded-[2rem] text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-black text-white rounded-br-none shadow-xl' : 'bg-white border border-gray-100 text-gray-700 rounded-bl-none shadow-sm'}`}>
                   {msg.text}
                </div>
             </div>
           ))}

           {isTyping && (
             <div className="flex justify-start">
                <div className="bg-gray-50/50 p-6 rounded-[2rem] rounded-bl-none">
                   <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                   </div>
                </div>
             </div>
           )}
           <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-gray-50 sticky bottom-0">
           <form onSubmit={handleSend} className="relative group">
              <input
                 type="text"
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 placeholder="Search studio knowledge..."
                 className="w-full bg-gray-100/50 border-none px-8 py-5 rounded-[2rem] text-sm focus:ring-2 focus:ring-black/5 transition-all outline-none"
              />
              <button type="submit" disabled={!inputValue.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 disabled:opacity-20 transition-all shadow-xl">
                 <Send className="w-4 h-4" />
              </button>
           </form>
           <p className="text-center text-[8px] text-gray-300 font-bold uppercase tracking-widest mt-4">Automated Architectural Assistant v2.6</p>
        </div>
      </div>
    </>
  );
};

export default Chatbox;
