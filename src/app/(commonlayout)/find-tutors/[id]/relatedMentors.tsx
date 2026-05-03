/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Sparkles, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { queryRagAction } from "@/app/_actions/rag.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function RelatedMentors({
  category,
  currentId,
}: {
  category: string;
  currentId: string;
}) {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      setLoading(true);
      const result = await queryRagAction(
        `Find tutors similar to ${category} expertise`,
      );

      if (result.success && result.sources) {
        const filtered = result.sources
          .filter(
            (source: any) => source.profileLink !== `/find-tutors/${currentId}`,
          )
          .slice(0, 4);
        setRecommendations(filtered);
      }
      setLoading(false);
    };

    if (category) fetchRelated();
  }, [category, currentId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (recommendations.length === 0) return null;
  console.log(recommendations);
  return (
    <section className="mt-16">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-6 w-6 text-purple-500" />
        <h2 className="text-2xl font-bold">AI Recommended Mentors</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((mentor) => (
          <Link href={mentor.profileLink || "#"} key={mentor.id}>
            <Card className="hover:shadow-lg transition-shadow border-muted bg-card">
              <CardContent className="p-4">
                <div className="relative mb-4 overflow-hidden rounded-lg aspect-square">
                  {mentor.photoUrl ? (
                    <Image
                      src={mentor.photoUrl}
                      alt={mentor.label}
                      fill
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <Avatar className="h-full w-full rounded-lg">
                      <AvatarImage src="" />{" "}
                     
                      <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary rounded-lg">
                        {mentor.label?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <h3 className="font-bold text-lg line-clamp-1">
                  {mentor.label}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 capitalize">
                  {mentor.type.toLowerCase()}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
