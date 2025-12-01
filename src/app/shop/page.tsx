'use client'

import Image from 'next/image';
import {
    MapPin,
    Heart,
    Camera,
    LayoutGrid,
    List as ListIcon,
    Search,
    ChevronRight
} from 'lucide-react';

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent, CardFooter } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis
} from "@/app/components/ui/pagination";
import { Separator } from "@/app/components/ui/separator";
import Link from 'next/link';

// Mock Data to match the screenshot
const listings = [
    {
        id: 1,
        image: "/imgs/car-red-1.jpg",
        title: "Nissan Xtrail 2010",
        location: "Kampala",
        condition: "Foreign Used",
        body: "SUV",
        price: "UGX 1,290,000",
        ribbon: "BAZAAR SPECIAL",
        tag: "Available at Kololo Showground",
        photoCount: 5
    },
    {
        id: 2,
        image: "/imgs/car-white-suv.jpg",
        title: "Mercedes-Benz Viano 2012",
        location: "Kampala",
        condition: "Foreign Used",
        body: "Van",
        price: "UGX 2,300,000",
        ribbon: "BAZAAR SPECIAL",
        tag: "Available at Kololo Showground",
        photoCount: 10
    },
    {
        id: 3,
        image: "/imgs/car-blue.jpg",
        title: "Volkswagen Golf 1400cc 2016",
        location: "Kampala",
        condition: "Foreign Used",
        body: "Hatchback",
        price: "UGX 1,650,000",
        ribbon: "BAZAAR SPECIAL",
        tag: "Available at Kololo Showground",
        photoCount: 4
    },
    {
        id: 4,
        image: "/imgs/loan-car.jpg",
        title: "Isuzu NPR 2016",
        location: "Kampala",
        condition: "Local Used",
        body: "Truck",
        price: "UGX 2,300,000",
        ribbon: "BAZAAR SPECIAL",
        tag: "Available at Kololo Showground",
        photoCount: 4
    },
    {
        id: 5,
        image: "/imgs/car-silver.jpg",
        title: "VW Golf Variant 2012",
        location: "Kampala",
        condition: "Foreign Used",
        body: "Wagon",
        price: "UGX 880,000",
        ribbon: "BAZAAR SPECIAL",
        tag: "Available at Kololo Showground",
        photoCount: 10
    },
    {
        id: 6,
        image: "/imgs/car-blue.jpg",
        title: "2018 Mazda Demio for sale",
        location: "Mombasa",
        condition: "Foreign Used",
        body: "Hatchback",
        price: "UGX 1,075,000",
        ribbon: "BAZAAR SPECIAL",
        tag: "Available at Kololo Showground",
        photoCount: 10
    }
];

const categories = [
    "Cars", "Buses & Minibus", "Trucks & Trailers", "Vehicle Parts & Accessories", "Heavy Equipment", "Motorcycles & Scooters"
];

const locations = [
    "Kampala", "Mombasa", "Nakuru", "Eldoret", "Kisumu", "Thika", "Malindi", "Kitale"
];

export default function ShopPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 pt-24 pb-12">
            <div className="container mx-auto px-4">

                {/* Top Search Bar - Matches the Red bar in screenshot */}
                <div className="bg-primary p-2 rounded-lg flex flex-col md:flex-row gap-2 mb-6 shadow-lg">
                    <Select>
                        <SelectTrigger className="bg-white border-0 h-10 md:w-[200px]">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="cars">Cars</SelectItem>
                        </SelectContent>
                    </Select>

                    <Input
                        placeholder="Search Make or Model"
                        className="bg-white border-0 h-10 flex-1"
                    />

                    <div className="relative md:w-[250px]">
                        <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Specify location"
                            className="bg-white border-0 h-10 pl-10"
                        />
                    </div>

                    <Button variant="default" className="bg-white text-primary hover:bg-white/90 font-bold px-8">
                        <Search className="h-4 w-4 mr-2" /> Find
                    </Button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 shrink-0 space-y-8">
                        <div className="bg-white p-6 rounded-lg border border-border">
                            <h3 className="font-bold text-lg mb-4">ALL CATEGORIES</h3>
                            <Separator className="mb-4" />
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                {categories.map((cat) => (
                                    <li key={cat}>
                                        <a href="#" className="hover:text-primary transition-colors">{cat}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-border">
                            <h3 className="font-bold text-lg mb-4">LOCATIONS</h3>
                            <Separator className="mb-4" />
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                {locations.map((loc) => (
                                    <li key={loc}>
                                        <a href="#" className="hover:text-primary transition-colors">{loc}</a>
                                    </li>
                                ))}
                                <li className="pt-2">
                                    <a href="#" className="text-primary hover:underline font-medium">View More (83)</a>
                                </li>
                            </ul>
                        </div>
                    </aside>

                    {/* Main Listing Area */}
                    <main className="flex-1">

                        {/* Filter Tabs & Sort */}
                        <div className="bg-white p-4 rounded-lg border border-border mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex gap-1 bg-muted/30 p-1 rounded-md">
                                <Button variant="ghost" size="sm" className="bg-white shadow-sm text-primary font-bold">
                                    All Ads <span className="ml-2 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full">5266</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                                    Private Seller <span className="ml-2 bg-muted text-muted-foreground text-[10px] px-1.5 py-0.5 rounded-full">439</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                                    Dealer <span className="ml-2 bg-muted text-muted-foreground text-[10px] px-1.5 py-0.5 rounded-full">4827</span>
                                </Button>
                            </div>

                            <div className="flex items-center gap-4">
                                <Select defaultValue="sort">
                                    <SelectTrigger className="w-[140px] h-9">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sort">Sort by</SelectItem>
                                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                                        <SelectItem value="newest">Newest First</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
                                        <ListIcon className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-9 w-9 bg-muted text-foreground">
                                        <LayoutGrid className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-sm font-bold text-foreground">All ads</h2>
                        </div>

                        {/* Listing Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {listings.map((car) => (
                                <Link href="/shop/1">
                                    <Card key={car.id} className="overflow-hidden hover:shadow-md transition-all duration-300 group border-border">
                                        <div className="relative aspect-4/3 bg-muted">
                                            {/* Ribbon - Using Primary Color */}
                                            {car.ribbon && (
                                                <div className="absolute top-4 -left-10 bg-primary text-white text-[10px] font-bold py-1 px-10 -rotate-45 z-10 shadow-md">
                                                    {car.ribbon}
                                                </div>
                                            )}

                                            <Image
                                                src={car.image}
                                                alt={car.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />

                                            <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                                                <Camera className="h-3 w-3" />
                                                <span>{car.photoCount}</span>
                                            </div>
                                        </div>

                                        <CardContent className="p-4">
                                            {car.tag && (
                                                <p className="text-primary text-xs mb-2 font-medium">{car.tag}</p>
                                            )}

                                            <h3 className="font-bold text-foreground mb-3 truncate">{car.title}</h3>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <Badge variant="secondary" className="font-normal text-muted-foreground bg-muted/50">
                                                    D
                                                </Badge>
                                                <div className="flex items-center text-xs text-muted-foreground">
                                                    <span className="bg-primary/10 text-primary px-1 rounded mr-1">Categories</span>
                                                    {car.body}
                                                </div>
                                                <div className="flex items-center text-xs text-muted-foreground">
                                                    <MapPin className="h-3 w-3 mr-1" />
                                                    {car.location}
                                                </div>
                                            </div>

                                            <div className="flex items-end justify-between">
                                                <div className="text-right w-full">
                                                    <p className="text-xl font-bold text-foreground">{car.price}</p>
                                                </div>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                                            <Button size="icon" className="bg-primary hover:bg-primary/90 rounded-sm h-8 w-8">
                                                <span className="sr-only">View</span>
                                                <div className="h-2 w-2 bg-white rounded-full" />
                                            </Button>
                                            <Button size="icon" variant="outline" className="rounded-sm h-8 w-8 border-border">
                                                <Heart className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex justify-center">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#" isActive className="bg-primary text-white hover:bg-primary/90 hover:text-white">1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">2</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">3</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">4</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">5</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">330</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href="#" />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>

                        {/* Bottom CTA */}
                        <div className="mt-16 text-center space-y-4 py-12 border-t border-border">
                            <h2 className="text-2xl md:text-3xl font-medium text-foreground">
                                Are you looking to buy or sell a car in Uganda?
                            </h2>
                            <p className="text-muted-foreground">
                                Sell your car through our platform. It is easy, efficient and trustworthy!
                            </p>
                            <Link href="/sell-your-car">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8">
                                    Start Now!
                                </Button>
                            </Link>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
}