import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";
import Image from "next/image";

export default function Blogpage() {
  const posts = [
    {
      id: "post-1",
      title: "Strategies for Effective Online Tutoring",
      summary:
        "Discover the top 10 digital tools and pedagogical techniques that keep students engaged in a virtual classroom environment.",
      label: "Teaching Tips",
      author: "Dr. Ariful Islam",
      published: "Feb 05, 2026",
      image: "https://i.ibb.co.com/RTv22hCk/pexels-max-fischer-5212682.jpg",
    },
    {
      id: "post-2",
      title: "Mastering Mathematics: A Student's Guide",
      summary:
        "Breaking down complex algebraic concepts into bite-sized, understandable steps for high school students preparing for exams.",
      label: "Mathematics",
      author: "Sarah Jenkins",
      published: "Feb 03, 2026",
      image: "https://i.ibb.co.com/MyXJfCd9/pexels-thirdman-8926546.jpg",
    },
    {
      id: "post-3",
      title: "The Role of AI in Modern Education",
      summary:
        "How artificial intelligence is helping tutors personalize lesson plans and track student progress more efficiently than ever.",
      label: "Tech in Ed",
      author: "Emma Thompson",
      published: "Jan 28, 2026",
      image:
        "https://i.ibb.co.com/Kjg5JLkT/pexels-tima-miroshnichenko-5427648.jpg",
    },
    {
      id: "post-4",
      title: "Creative Writing: Finding Your Voice",
      summary:
        "Practical exercises to help students overcome writer's block and develop unique narratives in their academic essays.",
      label: "Languages",
      author: "Marcus Rodriguez",
      published: "Jan 15, 2026",
      image: "https://i.ibb.co.com/RGj29n4N/pexels-max-fischer-5212336.jpg",
    },
    {
      id: "post-5",
      title: "Science Experiments You Can Do At Home",
      summary:
        "Engaging STEM activities that use everyday household items to teach fundamental physics and chemistry principles.",
      label: "Science",
      author: "Dr. Alan Grant",
      published: "Jan 10, 2026",
      image: "https://i.ibb.co.com/8LMDf3xT/pexels-ron-lach-10643469.jpg",
    },
    {
      id: "post-6",
      title: "The Importance of Peer-to-Peer Learning",
      summary:
        "Why collaborative study sessions often yield better retention rates and improve social problem-solving skills in teenagers.",
      label: "Social Science",
      author: "Amina Begum",
      published: "Jan 05, 2026",
      image: "https://i.ibb.co.com/N6Vrnf64/pexels-ahmetkurt-35745340.jpg",
    },
    {
      id: "post-7",
      title: "Building a Productive Study Space",
      summary:
        "A guide to ergonomics and environment design to help students minimize distractions and maximize deep work focus.",
      label: "Productivity",
      author: "David Chen",
      published: "Dec 28, 2025",
      image:
        "https://i.ibb.co.com/7N4pGKcC/pexels-anastasia-shuraeva-8466704.jpg",
    },
    {
      id: "post-8",
      title: "Preparing for College Applications",
      summary:
        "Step-by-step advice on writing compelling personal statements and managing application deadlines without the stress.",
      label: "Counseling",
      author: "Sophia Williams",
      published: "Dec 20, 2025",
      image: "https://i.ibb.co.com/9kFF7wFX/pexels-max-fischer-5212345.jpg",
    },
  ];

  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center gap-6 mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-foreground">
            Mentora Education Blog
          </h2>
          <p className="text-muted-foreground text-lg">
            Expert advice, study tips, and the latest in educational technology
            to help you excel.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-primary/50"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={500}
                  height={500}
                  className=" object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-black text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm">
                  {post.label}
                </div>
              </div>

              <CardHeader className="p-5 pb-2">
                <div className="flex items-center gap-2 text-[12px] text-muted-foreground mb-3">
                  <Calendar className="size-3" />
                  <span>{post.published}</span>
                </div>
                <h3 className="text-lg font-bold leading-tight line-clamp-2 transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent className="p-5 pt-0 flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </CardContent>

              <CardFooter className="p-5 pt-0 mt-auto flex items-center justify-between border-t border-muted/30 pt-4">
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">
                    {post.author.charAt(0)}
                  </div>
                  <span className="text-xs font-medium text-foreground">
                    {post.author}
                  </span>
                </div>
                <button className="text-primary hover:text-primary/80 transition-colors">
                  <BookOpen className="size-4" />
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
