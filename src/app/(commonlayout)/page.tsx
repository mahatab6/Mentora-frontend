
import CategoriesSection from "@/components/HomeComponents/CategoriesSection";
import CountPage from "@/components/HomeComponents/count";
import FeaturedTutorsSection from "@/components/HomeComponents/FeaturedTutorsSection";
import { Hero } from "@/components/HomeComponents/hero";
import { Button } from "@/components/ui/button";
import { userServices } from "@/services/users.services";

export default async function Home() {
  const session = await userServices.getSession()

  console.log(session)
  return (
    <div>
      <Hero/>
      <CountPage/>
      <FeaturedTutorsSection/>
      <CategoriesSection/>
      {session?.user?.name}
      {session?.user?.role}
      <Button>Click me</Button>
    </div>
  );
}
