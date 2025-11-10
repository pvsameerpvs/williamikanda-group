import HeroSlider from "@/components/HeroSlider";
import SectionAbout from "@/components/SectionAbout";
import SectionWhy from "@/components/SectionWhy";
import SectionWho from "@/components/SectionWho";
import SectionServices from "@/components/SectionServices";
import SectionCTA from "@/components/SectionCTA";
import FootballShowcase from "@/components/FootballShowcase";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <SectionAbout />
      <FootballShowcase />
      <SectionWhy />
      <SectionWho />
      <SectionServices />
      <SectionCTA />
    </>
  );
}
