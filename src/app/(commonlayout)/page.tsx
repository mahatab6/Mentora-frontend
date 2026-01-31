
import CategoriesSection from "@/components/HomeComponents/CategoriesSection";
import CountPage from "@/components/HomeComponents/count";
import FeaturedTutorsSection from "@/components/HomeComponents/FeaturedTutorsSection";
import ForStudentsSection from "@/components/HomeComponents/ForStudentsSection";
import ForTutorsSection from "@/components/HomeComponents/ForTutorsSection";
import { Hero } from "@/components/HomeComponents/hero";
import HowItWorksSection from "@/components/HomeComponents/HowItWorksSection";
import TestimonialsSection from "@/components/HomeComponents/TestimonialsSection";
import { Button } from "@/components/ui/button";
import { userServices } from "@/services/users.services";

export default async function Home() {
  const session = await userServices.getSession()
  return (
    <div>
      <Hero/>
      <CountPage/>
      <FeaturedTutorsSection/>
      <CategoriesSection/>
      <HowItWorksSection/>
      <ForStudentsSection/>
      <ForTutorsSection/>
      <TestimonialsSection/>
    </div>
  );
}
