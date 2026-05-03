/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";

const NEXT_PUBLIC_BASE_API = env.NEXT_PUBLIC_BASE_API;



export interface IRagQueryPayload {
  query: string;
  topK?: number;
  sourceType?: "TUTOR" | "COURSE" | "REVIEW";
}

export interface IRagSource {
  id: string;
  sourceType: string;
  sourceLabel: string;
  similarity: number;
  photoUrl?: string;
  profileLink?: string;
  content?: string;
}

export interface IRagQueryResponse {
  success: boolean;
  data: {
    answer: string | any;
    sources: IRagSource[];
    contextUsed: boolean;
  };
}

export interface IIngestResponse {
  success: boolean;
  message: string;
  data: {
    message: string;
    count: number;
  };
}



export const ragService = {

  query: async function (payload: IRagQueryPayload): Promise<IRagQueryResponse> {
    const response = await fetch(`${NEXT_PUBLIC_BASE_API}/api/rag/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("RAG Query failed");
    }

    return await response.json();
  },

 
  ingestTutors: async function (): Promise<IIngestResponse> {
    const response = await fetch(`${NEXT_PUBLIC_BASE_API}/api/rag/ingest-tutors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    return await response.json();
  },

 
  ingestCourses: async function (): Promise<IIngestResponse> {
    const response = await fetch(`${NEXT_PUBLIC_BASE_API}/api/rag/ingest-courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    return await response.json();
  },


  ingestReviews: async function (): Promise<IIngestResponse> {
    const response = await fetch(`${NEXT_PUBLIC_BASE_API}/api/rag/ingest-reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    return await response.json();
  },

 
  getStats: async function () {
    const response = await fetch(`${NEXT_PUBLIC_BASE_API}/api/rag/stats`, {
      method: "GET",
      cache: "no-store",
    });

    return await response.json();
  },

  
  clearAll: async function (): Promise<IIngestResponse> {
    const response = await fetch(`${NEXT_PUBLIC_BASE_API}/api/rag/clear`, {
      method: "DELETE",
      cache: "no-store",
    });

    return await response.json();
  },
};