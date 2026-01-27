
import CountPage from "@/components/HomeComponents/count";
import { Hero } from "@/components/HomeComponents/hero";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Hero/>
      <CountPage/>
      <Button>Click me</Button>
    </div>
  );
}
