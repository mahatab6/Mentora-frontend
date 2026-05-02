"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Mentora?",
    answer:
      "Mentora is a full-stack tutoring platform that connects students with expert tutors for personalized learning. We provide a seamless experience for browsing, booking, and managing educational sessions.",
  },
  {
    question: "How do I book a session with a tutor?",
    answer:
      "Students can browse through our list of expert tutors, view their profiles and availability, and book sessions instantly through our integrated booking system.",
  },
  {
    question: "Can I leave a review for my tutor?",
    answer:
      "Yes! Mentora encourages students to leave reviews after their sessions to help others find the best tutors and to provide valuable feedback to our educators.",
  },
  {
    question: "How do tutors manage their schedules?",
    answer:
      "Tutors have access to a dedicated dashboard where they can manage their professional profiles, set their availability, and oversee all their upcoming and past sessions.",
  },
  {
    question: "Is there an administrative oversight for the platform?",
    answer:
      "Absolutely. Our admins oversee the entire platform to ensure a safe, high-quality learning environment for both students and tutors.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Everything you need to know about the Mentora platform.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 px-6 px-4"
            >
              <AccordionTrigger className="text-left font-semibold text-slate-900 dark:text-slate-100 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;