/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ragService } from "@/services/rag.services";
import { userServices } from "@/services/users.services";

export const queryRagAction = async (query: string) => {
  try {
    const response = await ragService.query({ query });

    if (!response?.success || !response?.data?.answer) {
      return {
        success: false,
        error: "No answer received from AI. Please try again",
      };
    }

    let answer = response.data.answer;
    const rawSources = response.data.sources || [];

    if (typeof answer === "object" && answer !== null) {
      if ("tutors" in answer && Array.isArray(answer.tutors)) {
        const tutors = answer.tutors.slice(0, 5);

        if (tutors.length > 0) {
          answer =
            `I found ${tutors.length} tutors who may help you:\n\n` +
            tutors
              .map((t: any, i: number) => {
                let text = `${i + 1}. **${t.name || t.fullName}**\n`;
                if (t.subjects)
                  text += `Subjects: ${Array.isArray(t.subjects) ? t.subjects.join(", ") : t.subjects}\n`;
                if (t.hourlyRate) text += `Rate: $${t.hourlyRate}/hr\n`;
                if (t.reason) text += `Reason: ${t.reason}\n`;
                return text;
              })
              .join("\n");
        } else {
          answer = "I couldn't find any tutors matching your query.";
        }
      } else {
        answer = JSON.stringify(answer, null, 2);
      }
    }

    const matchPercentage =
      rawSources.length > 0
        ? (rawSources[0].similarity * 100).toFixed(2)
        : "0.00";

    const formattedSources = rawSources.map((source) => ({
      id: source.id,
      label: source.sourceLabel,

      profileLink: source.profileLink || null,
      photoUrl: source.photoUrl || null,
      type: source.sourceType,
      similarity: source.similarity,
    }));

    return {
      success: true,
      answer: answer as string,
      matchScore: `${matchPercentage}% matched`,
      sources: formattedSources,
    };
  } catch (error) {
    console.error("RAG Action Error:", error);
    return {
      success: false,
      error:
        "Failed to reach the AI Assistant. Please check your connection and try again.",
    };
  }
};

export const ingestTutorsAction = async () => {
  try {
    const response = await ragService.ingestTutors();

    return {
      success: true,
      indexedCount: response.data?.count || 0,
      message: response.data?.message || "Tutors data synced successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to sync tutor data. Please try again.",
    };
  }
};

export const getUserRoleAction = async () => {
  try {
    const session = await userServices.getSession();

    return session?.user?.role || null;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
};
