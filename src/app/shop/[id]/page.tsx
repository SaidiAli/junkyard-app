'use client'

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
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
    Phone,
    Loader2
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
import { Listing } from '@/lib/types';
import { ListingService } from '@/lib/services/listing.service';
import { useParams } from 'next/navigation';
import { Icon } from '@iconify/react';

export default function SingleListingPage() {
    const params = useParams();
    const id = params?.id as string;

    const [listing, setListing] = useState<Listing | null>(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState<string>('');
    const [relatedListings, setRelatedListings] = useState<Listing[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const response = await ListingService.getById(id);
                if (response.success && response.data) {
                    setListing(response.data);
                    setMainImage(response.data.images[0] || '/imgs/car-placeholder.jpg');

                    // Increment views
                    ListingService.incrementViews(id);
                }

                // Fetch related (using latest for now)
                const relatedResponse = await ListingService.getLatest();
                if (relatedResponse.success && relatedResponse.data) {
                    setRelatedListings(relatedResponse.data.filter(l => l.id !== id).slice(0, 4));
                }

            } catch (error) {
                console.error("Failed to fetch listing details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50/50">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50/50 gap-4">
                <h2 className="text-2xl font-bold">Listing not found</h2>
                <Button onClick={() => window.location.href = '/shop'}>Back to Shop</Button>
            </div>
        );
    }

    // Spec Helper
    const specs = {
        make: listing.brand,
        model: listing.model,
        year: listing.yearOfMake,
        mileage: `${listing.mileage} km`,
        transmission: listing.transmission,
        fuel: listing.fuelType,
        engineSize: listing.engineCapacity + "cc",
        driveType: listing.drive,
        color: listing.color,
        bodyType: listing.category,
        interior: "N/A", // Not in listing schema
        doorCount: "N/A" // Not in listing schema
    };

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
                                <BreadcrumbLink href={`/shop?brand=${listing.brand}`}>{listing.brand.toUpperCase()}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{listing.title}</BreadcrumbPage>
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
                                    src={mainImage || '/imgs/car-placeholder.jpg'}
                                    alt={listing.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute top-4 left-4">
                                    <Badge className="bg-primary text-white font-bold hover:bg-primary/90">
                                        {listing.condition === 'foreign_used' ? 'Foreign Used' : listing.condition === 'locally_used' ? 'Local Used' : 'New'}
                                    </Badge>
                                </div>
                            </div>

                            {listing.images.length > 1 && (
                                <Carousel className="w-full max-w-full">
                                    <CarouselContent className="-ml-2 md:-ml-4">
                                        {listing.images.map((img, index) => (
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
                            )}
                        </div>

                        {/* Overview & Key Specs */}
                        <Card className="border-border">
                            <CardHeader>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">{listing.title}</CardTitle>
                                        <div className="flex items-center gap-2 text-muted-foreground mt-2 text-sm">
                                            <MapPin className="h-4 w-4" />
                                            <span>{listing.location}</span>
                                            <span className="text-gray-300">|</span>
                                            <span>Posted {new Date(listing.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <div className="text-3xl font-bold text-primary">UGX {parseFloat(listing.price).toLocaleString()}</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Separator className="mb-6" />
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg">
                                        <Calendar className="h-6 w-6 text-primary mb-2" />
                                        <span className="text-xs text-muted-foreground uppercase">Year</span>
                                        <span className="font-semibold">{listing.yearOfMake}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg">
                                        <Gauge className="h-6 w-6 text-primary mb-2" />
                                        <span className="text-xs text-muted-foreground uppercase">Mileage</span>
                                        <span className="font-semibold">{listing.mileage}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg">
                                        <Settings className="h-6 w-6 text-primary mb-2" />
                                        <span className="text-xs text-muted-foreground uppercase">Transmission</span>
                                        <span className="font-semibold">{listing.transmission}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg">
                                        <Fuel className="h-6 w-6 text-primary mb-2" />
                                        <span className="text-xs text-muted-foreground uppercase">Fuel</span>
                                        <span className="font-semibold">{listing.fuelType}</span>
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
                                        {listing.description}
                                    </div>
                                </TabsContent>

                                <TabsContent value="specs" className="mt-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                        {Object.entries(specs).map(([key, value]) => (
                                            <div key={key} className="flex justify-between py-3 border-b border-border/50 last:border-0">
                                                <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                <span className="font-medium text-foreground">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="features" className="mt-0">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {listing.features.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-primary" />
                                                <span className="text-sm text-foreground">{feature}</span>
                                            </div>
                                        ))}
                                        {listing.features.length === 0 && <p className="text-muted-foreground">No specific features listed.</p>}
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
                                        <h3 className="font-bold text-lg">Seller</h3>
                                        {/* Seller name not in Listing object yet, wait, listing.userId is needed to fetch user details? */}
                                        {/* For now use generic text or if Listing has contact info */}
                                        <div className="flex items-center gap-2">
                                            {listing.sellerPhone && (
                                                <Badge variant="outline" className="text-xs font-normal">Contact Available</Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid gap-3">
                                    {listing.sellerPhone ? (
                                        <a href={`tel:${listing.sellerPhone}`}>
                                            <Button size="lg" className="w-full bg-primary hover:bg-primary/90 gap-2 text-lg font-bold hover:cursor-pointer">
                                                <Phone className="h-5 w-5" /> Call Seller
                                            </Button>
                                        </a>
                                    ) : (
                                        <Button size="lg" disabled className="w-full bg-muted text-muted-foreground gap-2 text-lg font-bold hover:cursor-not-allowed">
                                            <Phone className="h-5 w-5" /> No Phone Number
                                        </Button>
                                    )}

                                    {listing.sellerPhone ? (
                                        <a
                                            href={`https://wa.me/${listing.sellerPhone.replace(/\D/g, '').replace(/^0/, '256')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Button size="lg" variant="outline" className="w-full text-white bg-[#25D366] hover:bg-[#25D366]/80 gap-2 font-bold hover:cursor-pointer">
                                                <Icon icon={"ic:baseline-whatsapp"} className="h-8 w-8" /> Chat on WhatsApp
                                            </Button>
                                        </a>
                                    ) : (
                                        <Button size="lg" variant="outline" disabled className="w-full border-primary text-primary gap-2 font-bold opacity-50 hover:cursor-not-allowed">
                                            <Icon icon={"ic:baseline-whatsapp"} className="h-8 w-8" /> Chat on WhatsApp
                                        </Button>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" className="flex-1 border border-border hover:cursor-pointer" onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        toast.success("Link copied to clipboard", {
                                            description: "You can now share this listing with others."
                                        });
                                    }}>
                                        <Share2 className="h-4 w-4 mr-2" /> Share
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
                        <Button variant="link" className="text-primary" onClick={() => window.location.href = '/shop'}>View All</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedListings.map((vehicle) => (
                            <VehicleCard
                                key={vehicle.id}
                                id={vehicle.id}
                                image={vehicle.images[0] || "/imgs/car-placeholder.jpg"}
                                name={`${vehicle.brand} ${vehicle.model}`}
                                price={vehicle.price}
                                year={vehicle.yearOfMake?.toString()}
                                mileage={vehicle.mileage?.toString()}
                                fuel={vehicle.fuelType}
                                seats={vehicle.features.find(f => f.includes('Seats')) || undefined}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}