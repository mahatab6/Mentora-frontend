/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatMessages from "./ChatMessages";
import AdminSyncTools from "./AdminSyncTools";
import { getUserRoleAction, queryRagAction } from "@/app/_actions/rag.action";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    {
      role: "ai",
      text: "Hello! I'm Mentora AI. How can I help you find the right tutor today?",
    },
  ]);

  useEffect(() => {
    const fetchRole = async () => {
      const userRole = await getUserRoleAction();
      setRole(userRole);
    };
    fetchRole();
  }, []);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMsg = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const res = await queryRagAction(text);

    if (res.success) {
      setMessages((prev) => [
        ...prev,
        { 
          role: "ai", 
          text: res.answer, 
          matchScore: res.matchScore, 
          sources: res.sources 
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Sorry, I encountered an error. Please try again." },
      ]);
    }
    setLoading(false);
  };

  const quickQueries = [
    "Best tutors on your platform",
    "Math tutors under $50",
    "Top rated courses",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] overflow-hidden rounded-2xl border bg-white dark:bg-slate-950 shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-500 p-4 text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={20} />
              <span className="font-semibold text-sm">Mentora AI Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:opacity-80 transition-opacity cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <ChatMessages messages={messages} />

          {/* Quick Queries */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickQueries.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-[11px] bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 px-3 py-1.5 rounded-full border transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="focus-visible:ring-blue-500"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={loading} 
                className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
              >
                <Send size={18} />
              </Button>
            </form>
          </div>

          {/* Admin Tools */}
          {(role === "admin" || role === "superadmin") && <AdminSyncTools />}
        </div>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="h-14 w-14 rounded-full bg-blue-500 shadow-lg hover:bg-blue-600 transition-transform active:scale-95 cursor-pointer"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </Button>
    </div>
  );
}