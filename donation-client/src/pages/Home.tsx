import AboutUs from "@/components/AboutUs";
import DonationCardForm from "@/components/DonationCardForm";
import { DonationCarousel } from "@/components/DonationCarousel";
import DonationPosts from "@/components/DonationPosts";
import HeroSection from "@/components/HeroSection";

const Home = () => {
  return (
    <>
      <DonationCardForm />
      <DonationCarousel />
      <HeroSection />
      <AboutUs />
      <DonationPosts />
    </>
  );
};

export default Home;
