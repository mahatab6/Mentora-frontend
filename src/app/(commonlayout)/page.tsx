
import CategoriesSection from "@/components/HomeComponents/CategoriesSection";
import CountPage from "@/components/HomeComponents/count";
import FeaturedTutorsSection from "@/components/HomeComponents/FeaturedTutorsSection";
import ForStudentsSection from "@/components/HomeComponents/ForStudentsSection";
import ForTutorsSection from "@/components/HomeComponents/ForTutorsSection";
import { Hero } from "@/components/HomeComponents/hero";
import HowItWorksSection from "@/components/HomeComponents/HowItWorksSection";
import Newsletter from "@/components/HomeComponents/Newsletter";
import TestimonialsSection from "@/components/HomeComponents/TestimonialsSection";


export default async function Home() {
  
  return (
    <div>
      <Hero/>
      <CountPage/>
      <FeaturedTutorsSection/>
      <CategoriesSection/>
      <HowItWorksSection/>
      <ForStudentsSection/>
      <ForTutorsSection/>
      <Newsletter/>
      <TestimonialsSection/>
    </div>
  );
}
