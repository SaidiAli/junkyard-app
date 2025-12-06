"use client";

import { useEffect, useState } from "react";
import VehicleCard from "./VehicleCard";
import { Listing } from "@/lib/types";
import { ListingService } from "@/lib/services/listing.service";

const LatestAds = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await ListingService.getLatest();
        setListings(response.data || []);
      } catch (error) {
        console.error("Failed to fetch latest ads", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[400px] bg-muted animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (listings.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Vehicles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <VehicleCard
              key={listing.id}
              id={listing.id}
              image={listing.images[0] || "/imgs/car-placeholder.jpg"}
              name={`${listing.title}`}
              price={listing.price}
              year={listing.yearOfMake?.toString()}
              mileage={listing.mileage?.toString()}
              fuel={listing.fuelType}
              seats={listing.features.find(f => f.includes('Seats')) || undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestAds;
