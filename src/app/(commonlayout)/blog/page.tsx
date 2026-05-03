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
    <section className="py-24 px-4 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto">
      
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900 dark:text-white">
            Education <span className="text-blue-600 dark:text-blue-400">Insights</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Expert advice, study tips, and the latest in educational technology 
            to help you excel in your learning journey.
          </p>
        </div>

     
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="group flex flex-col h-full overflow-hidden transition-all duration-300 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-500/10"
            >
             
              <div className="relative aspect-16/10 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-lg">
                  {post.label}
                </div>
              </div>

              <CardHeader className="p-5 pb-2">
                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                  <Calendar className="size-3 text-blue-600 dark:text-blue-400" />
                  <span>{post.published}</span>
                </div>
                <h3 className="text-lg font-bold leading-tight line-clamp-2 text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent className="p-5 pt-0 flex-grow">
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </CardContent>

              <CardFooter className="p-5 pt-4 mt-auto flex items-center justify-between border-t border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs ring-2 ring-white dark:ring-slate-900">
                    {post.author.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-semibold text-slate-900 dark:text-slate-200">
                      {post.author}
                    </span>
                    <span className="text-[10px] text-slate-500">Author</span>
                  </div>
                </div>
                
                <button 
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow-sm"
                  title="Read More"
                >
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
