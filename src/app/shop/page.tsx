'use client'

import Image from 'next/image';
import {
    MapPin,
    Camera,
    LayoutGrid,
    List as ListIcon,
    Search,
    Loader2
} from 'lucide-react';

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent } from "@/app/components/ui/card";
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
import { useEffect, useState, Suspense } from 'react';
import { Listing, ListingFilter } from '@/lib/types';
import { ListingService } from '@/lib/services/listing.service';
import { useRouter, useSearchParams } from 'next/navigation';
import { brands as brandsData } from '@/lib/data';
import { getImageUrl } from '@/lib/utils';

const categories = [
    "Buses", "Hatchback", "Mini Truck", "Off Road", "Pickup",
    "Saloon", "Sedan", "SUV", "Truck", "Van", "Wagon"
];

const locations = [
    { label: "Kampala", value: "kampala" },
    { label: "Jinja", value: "jinja" },
    { label: "Arua", value: "arua" },
    { label: "Gulu", value: "gulu" },
    { label: "Lira", value: "lira" },
    { label: "Masaka", value: "masaka" },
    { label: "Mbale", value: "mbale" },
    { label: "Mbarara", value: "mbarara" },
    { label: "Mpigi", value: "mpigi" },
    { label: "Mukono", value: "mukono" },
    { label: "Soroti", value: "soroti" }
];

function ShopContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const [meta, setMeta] = useState<any>(null); // PaginatedResponse meta

    // Filters state
    const [category, setCategory] = useState(searchParams.get('category') || 'all');
    const [brand, setBrand] = useState(searchParams.get('brand') || 'all');
    const [location, setLocation] = useState(searchParams.get('location') || '');
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

    // Debounce search term to avoid too many API calls
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams();
        if (category && category !== 'all') params.set('category', category);
        if (brand && brand !== 'all') params.set('brand', brand);
        if (location) params.set('location', location);
        if (debouncedSearch) params.set('search', debouncedSearch);
        if (page > 1) params.set('page', page.toString());

        router.push(`/shop?${params.toString()}`, { scroll: false });
    }, [category, brand, location, debouncedSearch, page, router]);

    // Fetch listings
    useEffect(() => {
        const fetchListings = async () => {
            setLoading(true);
            try {
                const filters: ListingFilter = {
                    limit: 12,
                    offset: (page - 1) * 12
                };

                if (category && category !== 'all') filters.category = category as any;
                if (brand && brand !== 'all') filters.brand = brand as any;
                if (location) filters.location = location;
                if (debouncedSearch) filters.search = debouncedSearch;

                const response = await ListingService.getAll(filters);
                if (response.success && response.data) {
                    setListings(response.data.items);
                    setMeta({
                        total: response.data.total,
                        page: response.data.page,
                        totalPages: response.data.totalPages
                    });
                }
            } catch (error) {
                console.error("Failed to fetch listings", error);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, [category, brand, location, debouncedSearch, page]);


    return (
        <div className="min-h-screen bg-gray-50/50 pt-24 pb-12">
            <div className="container mx-auto px-4">

                {/* Top Search Bar */}
                <div className="bg-primary p-2 rounded-lg flex flex-col md:flex-row gap-2 mb-6 shadow-lg">
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="bg-white border-0 h-10 md:w-[200px]">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map(c => (
                                <SelectItem key={c} value={c.toLowerCase().replace(/ /g, '-')}>{c}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Input
                        placeholder="Search Make or Model"
                        className="bg-white border-0 h-10 flex-1"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(1); // Reset page on search
                        }}
                    />

                    <div className="relative md:w-[250px]">
                        <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Specify location"
                            className="bg-white border-0 h-10 pl-10"
                            value={location}
                            onChange={(e) => {
                                setLocation(e.target.value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <Button variant="default" className="bg-white text-primary hover:bg-white/90 font-bold px-8">
                        <Search className="h-4 w-4 mr-2" /> Find
                    </Button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 shrink-0 space-y-8 hidden lg:block">
                        <div className="bg-white p-6 rounded-lg border border-border">
                            <h3 className="font-bold text-lg mb-4">CAR MODELS</h3>
                            <Separator className="mb-4" />
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                {brandsData.map((b) => (
                                    <li key={b.value}>
                                        <button
                                            onClick={() => {
                                                setBrand(b.value === brand ? 'all' : b.value);
                                                setPage(1);
                                            }}
                                            className={`hover:text-primary transition-colors text-left w-full ${brand === b.value ? 'text-primary font-bold' : ''}`}
                                        >
                                            {b.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-border">
                            <h3 className="font-bold text-lg mb-4">LOCATIONS</h3>
                            <Separator className="mb-4" />
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                {locations.map((loc) => (
                                    <li key={loc.value}>
                                        <button
                                            onClick={() => {
                                                setLocation(loc.value);
                                                setPage(1);
                                            }}
                                            className={`hover:text-primary transition-colors text-left w-full ${location === loc.value ? 'text-primary font-bold' : ''}`}
                                        >
                                            {loc.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Main Listing Area */}
                    <main className="flex-1">

                        {/* Filter Tabs & Sort */}
                        <div className="bg-white p-4 rounded-lg border border-border mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex gap-1 bg-muted/30 p-1 rounded-md">
                                <Button variant="ghost" size="sm" className="bg-white shadow-sm text-primary font-bold">
                                    All Ads <span className="ml-2 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full">{meta?.total || 0}</span>
                                </Button>
                            </div>

                            <div className="flex items-center gap-4">
                                <Select defaultValue="newest">
                                    <SelectTrigger className="w-[140px] h-9">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">Newest First</SelectItem>
                                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high">Price: High to Low</SelectItem>
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

                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : listings.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-lg border border-border">
                                <h3 className="text-xl font-bold mb-2">No listings found</h3>
                                <p className="text-muted-foreground">Try adjusting your search or filters</p>
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        setCategory('all');
                                        setBrand('all');
                                        setLocation('');
                                        setSearchTerm('');
                                        setPage(1);
                                    }}
                                    className="mt-4"
                                >
                                    Clear all filters
                                </Button>
                            </div>
                        ) : (
                            <>
                                {/* Listing Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {listings.map((listing) => (
                                        <Link href={`/shop/${listing.id}`} key={listing.id}>
                                            <Card className="overflow-hidden hover:shadow-md transition-all duration-300 group border-border h-full flex flex-col">
                                                <div className="relative aspect-4/3 bg-muted">
                                                    {listing.isFeatured && (
                                                        <div className="absolute top-4 -left-10 bg-primary text-white text-[10px] font-bold py-1 px-10 -rotate-45 z-10 shadow-md">
                                                            FEATURED
                                                        </div>
                                                    )}

                                                    <Image
                                                        src={getImageUrl(listing.images[0]) || "/imgs/car-placeholder.jpg"}
                                                        alt={listing.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />

                                                    <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                                                        <Camera className="h-3 w-3" />
                                                        <span>{listing.images.length}</span>
                                                    </div>
                                                </div>

                                                <CardContent className="p-4 flex-1">
                                                    <p className="text-primary text-xs mb-2 font-medium">
                                                        {listing.brand.toUpperCase()} {listing.model}
                                                    </p>

                                                    <h3 className="font-bold text-foreground mb-3 truncate">{listing.title}</h3>

                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        <Badge variant="secondary" className="font-normal text-muted-foreground bg-muted/50">
                                                            {listing.condition === 'foreign_used' ? 'Foreign' : listing.condition === 'locally_used' ? 'Local' : 'New'}
                                                        </Badge>
                                                        <div className="flex items-center text-xs text-muted-foreground">
                                                            <span className="bg-primary/10 text-primary px-1 rounded mr-1">
                                                                {'Car'}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center text-xs text-muted-foreground">
                                                            <MapPin className="h-3 w-3 mr-1" />
                                                            {listing.location}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-end justify-between mt-auto">
                                                        <div className="text-right w-full">
                                                            <p className="text-xl font-bold text-foreground">UGX {listing.price}</p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {meta && meta.totalPages > 1 && (
                                    <div className="mt-12 flex justify-center">
                                        <Pagination>
                                            <PaginationContent>
                                                <PaginationItem>
                                                    <PaginationPrevious
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (page > 1) setPage(p => p - 1);
                                                        }}
                                                        aria-disabled={page <= 1}
                                                        className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                                                    />
                                                </PaginationItem>

                                                {/* Simple pagination logic - can be improved */}
                                                {Array.from({ length: meta.totalPages }, (_, i) => i + 1)
                                                    .filter(p => p === 1 || p === meta.totalPages || (p >= page - 1 && p <= page + 1))
                                                    .map((p, i, arr) => (
                                                        <>
                                                            {i > 0 && arr[i - 1] !== p - 1 && (
                                                                <PaginationItem key={`ellipsis-${p}`}>
                                                                    <PaginationEllipsis />
                                                                </PaginationItem>
                                                            )}
                                                            <PaginationItem key={p}>
                                                                <PaginationLink
                                                                    href="#"
                                                                    isActive={p === page}
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setPage(p);
                                                                    }}
                                                                    className={p === page ? "bg-primary text-white hover:bg-primary/90 hover:text-white" : ""}
                                                                >
                                                                    {p}
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        </>
                                                    ))
                                                }

                                                <PaginationItem>
                                                    <PaginationNext
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (page < meta.totalPages) setPage(p => p + 1);
                                                        }}
                                                        aria-disabled={page >= meta.totalPages}
                                                        className={page >= meta.totalPages ? "pointer-events-none opacity-50" : ""}
                                                    />
                                                </PaginationItem>
                                            </PaginationContent>
                                        </Pagination>
                                    </div>
                                )}
                            </>
                        )}

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

export default function ShopPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
}