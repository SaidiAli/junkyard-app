'use client'

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Upload, Info, Loader2 } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { adTypes, brands, categories, conditions, driveTypes, featuresList, fuelTypes, locations, transmissions } from '@/lib/data';
import { ApiResponse, Listing } from '@/lib/types';
import api from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import { toast } from 'sonner';

// Generate years 1990-2025
const years = Array.from({ length: 2025 - 1990 + 1 }, (_, i) => (2025 - i).toString());

const slugifyBrand = (brand: string) => {
    const lowercased = brand.toLowerCase();
    if (lowercased === 'mercedes-benz') return 'mercedes';
    return lowercased.replace(/\s+/g, '-');
};

export default function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();

    const { data: listing, isLoading: isFetching } = useQuery({
        queryKey: ['listing', id],
        queryFn: async () => {
            const response = await api.get<ApiResponse<Listing>>(`/listings/${id}`);
            return response.data.data!;
        },
    });

    const updateListingMutation = useMutation({
        mutationFn: (data: FormData) => api.put(`/listings/${id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }),
        onSuccess: () => {
            toast.success("Listing updated successfully!");
            router.push('/dashboard/listings');
        },
        onError: (error: any) => {
            console.error('Update error:', error);
            const errorData = error.response?.data;
            if (errorData && errorData.errors) {
                const errorMessages = errorData.errors.map((err: { field: string, message: string }) => `${err.field}: ${err.message}`).join(', ');
                toast.error(`Failed to update listing: ${errorMessages}`);
            } else {
                toast.error(`Failed to update listing: ${error.message || 'Unknown error'}`);
            }
        }
    });

    const [formData, setFormData] = useState({
        category: '',
        adType: 'Free',
        title: '',
        description: '',
        brand: '',
        model: '',
        year: '',
        fuel: '',
        mileage: '',
        color: '',
        transmission: '',
        condition: '',
        engineCapacity: '',
        drive: '',
        numberPlate: '',
        price: '',
        location: '',
        sellerPhone: '',
        sellerEmail: '',
        features: [] as string[],
        images: null as FileList | null,
        currentImages: [] as string[]
    });

    useEffect(() => {
        if (listing) {
            setFormData({
                category: listing.category || '',
                adType: listing.typeOfAd || 'Free',
                title: listing.title || '',
                description: listing.description || '',
                brand: listing.brand || '',
                model: listing.model || '',
                year: listing.yearOfMake?.toString() || '',
                fuel: listing.fuelType || '',
                mileage: listing.mileage?.toString() || '',
                color: listing.color || '',
                transmission: listing.transmission || '',
                condition: listing.condition?.replace('_', ' ') || '',
                engineCapacity: listing.engineCapacity || '',
                drive: listing.drive || '',
                numberPlate: listing.numberPlate || '',
                price: listing.price || '',
                location: listing.location || '',
                sellerPhone: listing.sellerPhone || '',
                sellerEmail: listing.sellerEmail || '',
                features: listing.features || [],
                images: null,
                currentImages: listing.images || []
            });
        }
    }, [listing]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (feature: string, checked: boolean) => {
        setFormData(prev => {
            if (checked) {
                return { ...prev, features: [...prev.features, feature] };
            } else {
                return { ...prev, features: prev.features.filter(f => f !== feature) };
            }
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData(prev => ({ ...prev, images: e.target.files }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.title.length < 10) {
            toast.error("Title must be at least 10 characters long.");
            return;
        }
        if (formData.description.length < 50) {
            toast.error("Description must be at least 50 characters long.");
            return;
        }
        if (!formData.brand) {
            toast.error("Please select a car brand.");
            return;
        }

        const data = new FormData();

        data.append('category', formData.category.toLowerCase());
        data.append('typeOfAd', formData.adType);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('brand', slugifyBrand(formData.brand));
        data.append('model', formData.model);
        data.append('yearOfMake', formData.year);
        data.append('fuelType', formData.fuel.toLowerCase());
        data.append('mileage', formData.mileage);
        data.append('color', formData.color);
        data.append('transmission', formData.transmission.toLowerCase());
        data.append('condition', formData.condition.toLowerCase().replace(' ', '_'));
        data.append('engineCapacity', formData.engineCapacity);
        data.append('drive', formData.drive);
        data.append('numberPlate', formData.numberPlate);
        data.append('price', formData.price);
        data.append('location', formData.location.toLowerCase());

        formData.features.forEach(feature => {
            data.append('features[]', feature.toLowerCase().replace(' ', '-'));
        });

        if (formData.images && formData.images.length > 0) {
            Array.from(formData.images).forEach(image => {
                data.append('images', image);
            });
        }

        updateListingMutation.mutate(data);
    };

    if (isFetching) {
        return (
            <ProtectedRoute>
                <div className="flex h-screen w-full items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-secondary/30 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 items-center justify-between flex">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Edit Listing</h1>
                            <p className="text-muted-foreground mt-2">Update information for your vehicle listing.</p>
                        </div>
                        <Button variant="outline" onClick={() => router.back()}>Back</Button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                                <CardDescription>Essential details about your listing.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(cat => (
                                                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="adType">Type of Ad</Label>
                                    <Select value={formData.adType} onValueChange={(value) => handleSelectChange('adType', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Ad Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {adTypes.map(type => (
                                                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="e.g., Clean Toyota Corolla 2020"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        minLength={10}
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        placeholder="Describe the condition, history, and key selling points..."
                                        className="h-32"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        minLength={50}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Vehicle Specifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Vehicle Details</CardTitle>
                                <CardDescription>Specifics about the car.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="brand">Car Brand</Label>
                                    <Select value={formData.brand} onValueChange={(value) => handleSelectChange('brand', value)} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Brand" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {brands.map(brand => (
                                                <SelectItem key={brand.value} value={brand.value}>{brand.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="model">Car Model</Label>
                                    <Input
                                        id="model"
                                        name="model"
                                        placeholder="e.g., Corolla"
                                        value={formData.model}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="year">Year of Make</Label>
                                    <Select value={formData.year} onValueChange={(value) => handleSelectChange('year', value)} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {years.map(year => (
                                                <SelectItem key={year} value={year}>{year}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="fuel">Fuel Type</Label>
                                    <Select value={formData.fuel} onValueChange={(value) => handleSelectChange('fuel', value)} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Fuel Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {fuelTypes.map(fuel => (
                                                <SelectItem key={fuel.value} value={fuel.value}>{fuel.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="transmission">Transmission</Label>
                                    <Select value={formData.transmission} onValueChange={(value) => handleSelectChange('transmission', value)} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Transmission" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {transmissions.map(trans => (
                                                <SelectItem key={trans.value} value={trans.value}>{trans.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="condition">Condition</Label>
                                    <Select value={formData.condition.toLowerCase().replace(' ', '_')} onValueChange={(value) => handleSelectChange('condition', value)} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Condition" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {conditions.map(cond => (
                                                <SelectItem key={cond.value} value={cond.value}>{cond.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="mileage">Mileage (km)</Label>
                                    <Input
                                        id="mileage"
                                        name="mileage"
                                        type="number"
                                        placeholder="0"
                                        value={formData.mileage}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="color">Color</Label>
                                    <Input
                                        id="color"
                                        name="color"
                                        placeholder="e.g., Silver"
                                        value={formData.color}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="engineCapacity">Engine Capacity (cc)</Label>
                                    <Input
                                        id="engineCapacity"
                                        name="engineCapacity"
                                        type="number"
                                        placeholder="e.g., 2000"
                                        value={formData.engineCapacity}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="drive">Drive</Label>
                                    <Select value={formData.drive} onValueChange={(value) => handleSelectChange('drive', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Drive Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {driveTypes.map(drive => (
                                                <SelectItem key={drive.value} value={drive.value}>{drive.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="numberPlate">Number Plate</Label>
                                    <Input
                                        id="numberPlate"
                                        name="numberPlate"
                                        placeholder="e.g., UBA 123A"
                                        value={formData.numberPlate}
                                        onChange={handleInputChange}
                                        maxLength={10}
                                        minLength={7}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Features & Media */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Features & Media</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-3">
                                    <Label>Features</Label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {featuresList.map((feature) => (
                                            <div key={feature.value} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`feature-${feature.value}`}
                                                    checked={formData.features.includes(feature.value)}
                                                    onCheckedChange={(checked: any) => handleCheckboxChange(feature.value, checked as boolean)}
                                                />
                                                <label
                                                    htmlFor={`feature-${feature.value}`}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {feature.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="images">Photos</Label>

                                    {formData.currentImages.length > 0 && (
                                        <div className="mb-4 grid grid-cols-3 gap-4">
                                            {formData.currentImages.map((img, idx) => (
                                                <div key={idx} className="relative aspect-video bg-muted rounded-md overflow-hidden">
                                                    <img src={img} alt="Current" className="object-cover w-full h-full" />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="border-2 border-dashed border-input rounded-lg p-8 text-center hover:bg-accent/50 transition-colors">
                                        <Input
                                            id="images"
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                        <Label htmlFor="images" className="cursor-pointer flex flex-col items-center gap-2">
                                            <Upload className="h-10 w-10 text-muted-foreground" />
                                            <span className="text-lg font-medium">
                                                {formData.currentImages.length > 0 ? "Upload new photos to replace current ones" : "Click to upload photos"}
                                            </span>
                                            <span className="text-sm text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 800x400px)</span>
                                        </Label>
                                        {formData.images && (
                                            <div className="mt-4 text-sm text-primary font-medium">
                                                {formData.images.length} new files selected (will replace existing)
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Price & Contact */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Price & Location</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price (UGX)</Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        placeholder="e.g., 25000000"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Select value={formData.location} onValueChange={(value) => handleSelectChange('location', value)} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {locations.map(loc => (
                                                <SelectItem key={loc.value} value={loc.value}>{loc.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sellerPhone">Seller Phone Number</Label>
                                    <div className="relative">
                                        <Input
                                            id="sellerPhone"
                                            name="sellerPhone"
                                            value={formData.sellerPhone}
                                            onChange={handleInputChange}
                                            className="pl-10"
                                            readOnly
                                        />
                                        <Info className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <p className="text-[0.8rem] text-muted-foreground">Phone number linked to your account.</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sellerEmail">Seller Email</Label>
                                    <div className="relative">
                                        <Input
                                            id="sellerEmail"
                                            name="sellerEmail"
                                            value={formData.sellerEmail}
                                            onChange={handleInputChange}
                                            className="pl-10"
                                            readOnly
                                        />
                                        <Info className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <p className="text-[0.8rem] text-muted-foreground">Email linked to your account.</p>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-4">
                            <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                            <Button type="submit" size="lg" className="w-full md:w-auto" disabled={updateListingMutation.isPending}>
                                {updateListingMutation.isPending ? 'Updating...' : 'Update Ad'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </ProtectedRoute>
    );
}
