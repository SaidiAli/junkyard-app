'use client'

import { useState } from 'react';
import Image from 'next/image';
import {
    MapPin,
    Calendar,
    Gauge,
    Fuel,
    Settings,
    Car,
    Shield,
    Share2,
    Heart,
    Phone,
    MessageCircle
} from 'lucide-react';

import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/app/components/ui/carousel";
import VehicleCard from "@/app/components/VehicleCard";

// Mock Data for Single Listing
const carDetails = {
    id: "1",
    title: "2018 Mazda Demio for sale",
    price: "UGX 1,075,000",
    location: "Mombasa, Kenya",
    condition: "Foreign Used",
    posted: "2 days ago",
    images: [
        "/imgs/car-silver.jpg",
        "/imgs/car-red-1.jpg",
        "/imgs/car-blue.jpg",
        "/imgs/car-silver.jpg",
        "/imgs/car-white-suv.jpg"
    ],
    specs: {
        make: "Mazda",
        model: "Demio",
        year: "2018",
        mileage: "85,000 km",
        transmission: "Automatic",
        fuel: "Petrol",
        engineSize: "1300cc",
        driveType: "2WD",
        color: "Blue",
        bodyType: "Hatchback",
        interior: "Cloth",
        doorCount: "5"
    },
    features: [
        "ABS", "Air Conditioning", "Airbags", "Power Steering", "Power Windows",
        "AM/FM Radio", "CD Player", "Alloy Wheels", "Fog Lights", "Keyless Entry",
        "Power Mirrors", "Rear Spoiler", "Traction Control", "Cup Holders"
    ],
    description: `
    Clean Mazda Demio 2018 model available for immediate sale. 
    
    This vehicle is in pristine condition, foreign used and recently imported. 
    It features a fuel-efficient 1300cc petrol engine paired with a smooth automatic transmission.
    
    Key highlights:
    - Original paint
    - Accident free
    - Low mileage
    - Clean interior
    - All documents available for transfer
    
    Perfect for city driving and daily commute. Financing options available.
  `,
    seller: {
        name: "Kololo Showground",
        type: "Dealer",
        phone: "0777 000-000",
        verified: true
    }
};

// Mock Related Listings
const relatedListings = [
    {
        image: "/imgs/car-red-1.jpg",
        name: "Nissan Xtrail 2010",
        price: "UGX 1,290,000",
        year: "2010",
        mileage: "120k km",
        fuel: "Petrol",
        seats: "5"
    },
    {
        image: "/imgs/car-white-suv.jpg",
        name: "Toyota Vitz 2016",
        price: "UGX 1,280,000",
        year: "2016",
        mileage: "65k km",
        fuel: "Petrol",
        seats: "5"
    },
    {
        image: "/imgs/car-silver.jpg",
        name: "VW Golf Variant",
        price: "UGX 880,000",
        year: "2012",
        mileage: "90k km",
        fuel: "Diesel",
        seats: "5"
    },
    {
        image: "/imgs/loan-car.jpg",
        name: "Isuzu NPR 2016",
        price: "UGX 2,300,000",
        year: "2016",
        mileage: "150k km",
        fuel: "Diesel",
        seats: "3"
    }
];

export default function SingleListingPage() {
    const [mainImage, setMainImage] = useState(carDetails.images[0]);

    return (
        <div className="min-h-screen bg-gray-50/50 pt-24 pb-12">
            <div className="container mx-auto px-4">

                {/* Breadcrumbs */}
                <div className="mb-6">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">{carDetails.specs.make}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{carDetails.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                                <Image
                                    src={mainImage}
                                    alt={carDetails.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute top-4 left-4">
                                    <Badge className="bg-primary text-white font-bold hover:bg-primary/90">
                                        {carDetails.condition}
                                    </Badge>
                                </div>
                            </div>

                            <Carousel className="w-full max-w-full">
                                <CarouselContent className="-ml-2 md:-ml-4">
                                    {carDetails.images.map((img, index) => (
                                        <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/5 cursor-pointer" onClick={() => setMainImage(img)}>
                                            <div className={`relative aspect-4/3 overflow-hidden rounded-md border-2 ${mainImage === img ? 'border-primary' : 'border-transparent'}`}>
                                                <Image
                                                    src={img}
                                                    alt={`View ${index + 1}`}
                                                    fill
                                                    className="object-cover hover:opacity-80 transition-opacity"
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-2" />
                                <CarouselNext className="right-2" />
                            </Carousel>
                        </div>

                        {/* Overview & Key Specs */}
                        <Card className="border-border">
                            <CardHeader>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">{carDetails.title}</CardTitle>
                                        <div className="flex items-center gap-2 text-muted-foreground mt-2 text-sm">
                                            <MapPin className="h-4 w-4" />
                                            <span>{carDetails.location}</span>
                                            <span className="text-gray-300">|</span>
                                            <span>Posted {carDetails.posted}</span>
                                        </div>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <div className="text-3xl font-bold text-primary">{carDetails.price}</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Separator className="mb-6" />
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg">
                                        <Calendar className="h-6 w-6 text-primary mb-2" />
                                        <span className="text-xs text-muted-foreground uppercase">Year</span>
                                        <span className="font-semibold">{carDetails.specs.year}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg">
                                        <Gauge className="h-6 w-6 text-primary mb-2" />
                                        <span className="text-xs text-muted-foreground uppercase">Mileage</span>
                                        <span className="font-semibold">{carDetails.specs.mileage}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg">
                                        <Settings className="h-6 w-6 text-primary mb-2" />
                                        <span className="text-xs text-muted-foreground uppercase">Transmission</span>
                                        <span className="font-semibold">{carDetails.specs.transmission}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg">
                                        <Fuel className="h-6 w-6 text-primary mb-2" />
                                        <span className="text-xs text-muted-foreground uppercase">Fuel</span>
                                        <span className="font-semibold">{carDetails.specs.fuel}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Details Tabs */}
                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                                <TabsTrigger
                                    value="overview"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent py-3 px-6"
                                >
                                    Description
                                </TabsTrigger>
                                <TabsTrigger
                                    value="specs"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent py-3 px-6"
                                >
                                    Specifications
                                </TabsTrigger>
                                <TabsTrigger
                                    value="features"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent py-3 px-6"
                                >
                                    Features
                                </TabsTrigger>
                            </TabsList>

                            <div className="mt-6 bg-white rounded-lg border border-border p-6">
                                <TabsContent value="overview" className="mt-0">
                                    <div className="prose max-w-none text-muted-foreground whitespace-pre-line">
                                        {carDetails.description}
                                    </div>
                                </TabsContent>

                                <TabsContent value="specs" className="mt-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                        {Object.entries(carDetails.specs).map(([key, value]) => (
                                            <div key={key} className="flex justify-between py-3 border-b border-border/50 last:border-0">
                                                <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                <span className="font-medium text-foreground">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="features" className="mt-0">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {carDetails.features.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-primary" />
                                                <span className="text-sm text-foreground">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                            </div>
                        </Tabs>

                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-6">

                        {/* Seller Card */}
                        <Card className="border-border sticky top-24">
                            <CardHeader className="bg-muted/30">
                                <CardTitle>Seller Information</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center border">
                                        <Car className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{carDetails.seller.name}</h3>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-xs font-normal">{carDetails.seller.type}</Badge>
                                            {carDetails.seller.verified && (
                                                <span className="text-xs text-green-600 flex items-center gap-1 font-medium">
                                                    <Shield className="h-3 w-3" /> Verified
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid gap-3">
                                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90 gap-2 text-lg font-bold">
                                        <Phone className="h-5 w-5" /> Call Seller
                                    </Button>
                                    <Button size="lg" variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 gap-2 font-bold">
                                        <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
                                    </Button>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" className="flex-1 border border-border">
                                        <Share2 className="h-4 w-4 mr-2" /> Share
                                    </Button>
                                    <Button variant="ghost" size="sm" className="flex-1 border border-border">
                                        <Heart className="h-4 w-4 mr-2" /> Save
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Safety Tips */}
                        <Card className="bg-amber-50 border-amber-200">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-amber-800 flex items-center gap-2 text-lg">
                                    <Shield className="h-5 w-5" /> Safety Tips
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-amber-700 space-y-2">
                                <p>• Do not pay in advance even for the delivery</p>
                                <p>• Try to meet at a safe, public location</p>
                                <p>• Check the item BEFORE you buy it</p>
                                <p>• Pay only after collecting the item</p>
                            </CardContent>
                        </Card>

                    </div>
                </div>

                {/* Related Listings Section */}
                <div className="mt-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">Similar Vehicles</h2>
                        <Button variant="link" className="text-primary">View All</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedListings.map((vehicle, index) => (
                            <VehicleCard key={index} {...vehicle} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}