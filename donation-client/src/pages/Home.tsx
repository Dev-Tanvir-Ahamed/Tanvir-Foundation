import AboutUs from "@/components/AboutUs";
import { DonationCarousel } from "@/components/DonationCarousel";
import DonationPosts from "@/components/DonationPosts";
import HeroSection from "@/components/HeroSection";

const Home = () => {
  return (
    <>
      <DonationCarousel />
      <HeroSection />
      <AboutUs />
      <DonationPosts />
    </>
  );
};

export default Home;
