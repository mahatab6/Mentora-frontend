"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Database } from "lucide-react";
import { toast } from "sonner"; 
import { ingestTutorsAction } from "@/app/_actions/rag.action";

export default function AdminSyncTools() {
  const [loading, setLoading] = useState(false);

  const handleSync = async () => {
    setLoading(true);
    try {
      const res = await ingestTutorsAction();
      if (res.success) {
        toast.success(`${res.indexedCount} Tutors synced successfully!`);
      } else {
        toast.error(res.error);
      }
    } catch (err) {
      toast.error("Sync failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 border-t bg-slate-50 dark:bg-slate-900">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
          <Database size={12} /> Admin Control
        </span>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full text-xs h-8 gap-2"
        onClick={handleSync}
        disabled={loading}
      >
        <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        {loading ? "Syncing Tutors..." : "Sync Tutor Data"}
      </Button>
    </div>
  );
}