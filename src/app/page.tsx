import BrowseByType from "./components/BrowseByType";
import LatestAds from "./components/latestads";
import Hero from "./components/Hero";
import PopularBrands from "./components/PopularBrands";
import PremiumAds from "./components/premiumads";
import NoblePearlBanner from "./components/NoblePearlBanner";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <NoblePearlBanner />
      <PremiumAds />
      <PopularBrands />
      <BrowseByType />
      <LatestAds />
    </div>
  );
}
