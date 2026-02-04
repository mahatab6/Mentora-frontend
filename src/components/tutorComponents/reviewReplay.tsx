"use client";

import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea' 
import { Loader2, Reply } from 'lucide-react'
import { toast } from 'sonner'
import { env } from '@/env';

const NEXT_PUBLIC_BASE_API = env.NEXT_PUBLIC_BASE_API

export default function ReviewReplay({ id }: { id: number }) {
  const [replayContent, setReplayContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleReplay = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!replayContent.trim()) {
      return toast.error("Please write something before replying!");
    }

    setLoading(true);

    try {
      const response = await fetch(`${NEXT_PUBLIC_BASE_API}/api/reviews/replay`, {
        method: "PATCH", 
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          replay: replayContent,
        }),
      });

      if (!response.ok) throw new Error("Failed to send replay");

      toast.success("Reply sent successfully!");
      setOpen(false); 
      setReplayContent(""); 
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Reply className="w-4 h-4" /> Reply
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md rounded-2xl">
        <form onSubmit={handleReplay}>
          <DialogHeader>
            <DialogTitle className="text-xl">Reply to Student</DialogTitle>
            <DialogDescription>
              Write a thoughtful response to the students feedback. 
              This will be visible on your profile.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="replay" className="font-semibold">
                Your Response
              </Label>
              <Textarea
                id="replay"
                placeholder="Thank you for your feedback! It was a pleasure teaching you..."
                value={replayContent}
                onChange={(e) => setReplayContent(e.target.value)}
                className="min-h-[120px] rounded-xl focus-visible:ring-blue-600"
                required
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button type="button" variant="ghost" className='hover:cursor-pointer'>
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 hover:cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reply"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}