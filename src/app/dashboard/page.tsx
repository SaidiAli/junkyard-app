'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/app/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/app/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';
import { Edit, MoreHorizontal, PlusCircle, Trash, Loader2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { api } from '@/lib/api';
import { Listing, ApiResponse } from '@/lib/types';
import { toast } from 'sonner';

export default function MyListingsPage() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            const response = await api.get<ApiResponse<Listing[]>>('/users/my-listings');
            if (response.data.success && response.data.data) {
                setListings(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching listings:', error);
            toast.error('Failed to load listings');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this listing?')) return;

        try {
            await api.delete(`/listings/${id}`);
            toast.success('Listing deleted successfully');
            fetchListings();
        } catch (error) {
            console.error('Error deleting listing:', error);
            toast.error('Failed to delete listing');
        }
    };

    const formatPrice = (price: string) => {
        return new Intl.NumberFormat('en-UG', {
            style: 'currency',
            currency: 'UGX',
            maximumFractionDigits: 0,
        }).format(Number(price));
    };

    return (
        <ProtectedRoute>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">My Listings</h1>
                <Button asChild>
                    <Link href="/sell-your-car">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Listing
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Vehicles</CardTitle>
                    <CardDescription>
                        Manage your vehicle listings and view their performance.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center p-8">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="hidden w-[100px] sm:table-cell">
                                        Image
                                    </TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="hidden md:table-cell">Price</TableHead>
                                    <TableHead className="hidden md:table-cell">Views</TableHead>
                                    <TableHead className="hidden md:table-cell">Created at</TableHead>
                                    <TableHead>
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {listings.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8">
                                            No listings found. Start by adding a new vehicle!
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    listings.map((listing) => (
                                        <TableRow key={listing.id}>
                                            <TableCell className="hidden sm:table-cell">
                                                <div className="h-16 w-16 rounded-md bg-muted overflow-hidden relative">
                                                    {listing.images && listing.images.length > 0 ? (
                                                        <img
                                                            src={listing.images[0]}
                                                            alt={listing.title}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                            <span className="text-xs text-gray-500">No img</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {listing.title}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={
                                                    listing.status === 'approved' ? 'default' :
                                                        listing.status === 'sold' ? 'secondary' : 'outline'
                                                }>
                                                    {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {formatPrice(listing.price)}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">{listing.views}</TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {new Date(listing.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Toggle menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/dashboard/listings/${listing.id}/edit`}>
                                                                <Edit className="mr-2 h-4 w-4" /> Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-destructive cursor-pointer"
                                                            onClick={() => handleDelete(listing.id)}
                                                        >
                                                            <Trash className="mr-2 h-4 w-4" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </ProtectedRoute>
    );
}
