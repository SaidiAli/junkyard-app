"use client";

import { useEffect, useState } from "react";
import VehicleCard from "./VehicleCard";
import { Button } from "./ui/button";
import Link from "next/link";
import { Listing } from "@/lib/types";
import { ListingService } from "@/lib/services/listing.service";

const PremiumAds = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        // Fetch featured
        const response = await ListingService.getFeatured();
        setListings(response.data || []);
      } catch (error) {
        console.error("Failed to fetch featured ads", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-background" id="listings">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Premium ADS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[400px] bg-muted animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If no featured, maybe show latest or nothing? 
  // Let's show nothing if strictly no featured, or fallback logic if desired.
  // For now, if empty, hide section.
  if (listings.length === 0) return null;

  return (
    <section className="py-20 bg-background" id="listings">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Premium ADS</h2>
          </div>
          <Link href="/shop">
            <Button variant="hero" className="hidden md:flex cursor">
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <VehicleCard
              key={listing.id}
              id={listing.id}
              image={listing.images[0] || "/imgs/car-placeholder.jpg"}
              name={`${listing.brand} ${listing.model}`}
              price={listing.price}
              year={listing.yearOfMake?.toString()}
              mileage={listing.mileage?.toString()}
              fuel={listing.fuelType}
              seats={listing.features.find(f => f.includes('Seats')) || undefined}
            />
          ))}
        </div>
        <div className="text-center mt-8 md:hidden">
          <Link href="/shop">
            <Button variant="hero">View All</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PremiumAds;
