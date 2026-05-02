"use client";

import { IRagSource } from "@/services/rag.services";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Message {
  role: "user" | "ai";
  text: string;
  matchScore?: string;
  sources?: { label: string; link: string | null; type: string }[];
}

export default function ChatMessages({ messages }: { messages: Message[] }) {
  return (
    <ScrollArea className="h-[350px] p-4">
      <div className="flex flex-col gap-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-blue-500 text-white rounded-tr-none"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none"
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
              
              {msg.role === "ai" && msg.matchScore && (
                <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-[10px] opacity-70 mb-1">
                    Confidence: {msg.matchScore}
                  </p>
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {msg.sources.map((src, i) => (
                        <div key={i}>
                          {src.link ? (
                            <Link href={src.link} target="_blank">
                              <Badge variant="outline" className="cursor-pointer hover:bg-blue-500 hover:text-white transition-colors text-[10px]">
                                {src.label}
                              </Badge>
                            </Link>
                          ) : (
                            <Badge variant="secondary" className="text-[10px]">
                              {src.label}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}