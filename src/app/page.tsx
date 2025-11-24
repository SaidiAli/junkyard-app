import BrowseByType from "./components/BrowseByType";
import FeaturedVehicles from "./components/FeaturedVehicles";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import NewsSection from "./components/NewsSection";
import PopularBrands from "./components/PopularBrands";
import RecentVehicles from "./components/RecentVehicles";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedVehicles />
      <PopularBrands />
      <BrowseByType />
      <WhyChooseUs />
      <RecentVehicles />
      <Testimonials />
      <NewsSection />
      <Footer />
    </div>
  );
}
