
import CountPage from "@/components/HomeComponents/count";
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
      {session?.user?.name}
      <Button>Click me</Button>
    </div>
  );
}
