import BrowseByType from "./components/BrowseByType";
import LatestAds from "./components/latestads";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import NewsSection from "./components/NewsSection";
import PopularBrands from "./components/PopularBrands";
import PremiumAds from "./components/premiumads";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}
      <Hero />
      <PremiumAds />
      <PopularBrands />
      <BrowseByType />
      <LatestAds />
      {/* <Footer /> */}
    </div>
  );
}
