'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Upload, Info } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { adTypes, brands, categories, conditions, driveTypes, featuresList, fuelTypes, locations, transmissions } from '@/lib/data';
import { ApiResponse } from '@/lib/types';
import api from '@/lib/api';

// Generate years 1990-2025
const years = Array.from({ length: 2025 - 1990 + 1 }, (_, i) => (2025 - i).toString());

// Helper to slugify brand names for the API
const slugifyBrand = (brand: string) => {
  const lowercased = brand.toLowerCase();
  if (lowercased === 'mercedes-benz') {
    return 'mercedes';
  }
  return lowercased.replace(/\s+/g, '-');
};

export default function SellYourCarPage() {
  const router = useRouter();

  const { data: packages } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<any[]>>("/packages")
      return response.data.data!
    },
  });

  const createListingMutation = useMutation({
    mutationFn: (data: FormData) => api.post('/listings', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    onSuccess: () => {
      alert("Ad submitted successfully!");
      router.push('/dashboard/listings');
    },
    onError: (error: any) => {
      console.error('Submission error:', error);
      const errorData = error.response?.data;
      if (errorData && errorData.errors) {
        const errorMessages = errorData.errors.map((err: { field: string, message: string }) => `${err.field}: ${err.message}`).join('\n');
        alert(`Failed to submit ad:\n${errorMessages}`);
      } else {
        alert(`Failed to submit ad: ${error.message || 'Unknown error'}`);
      }
    }
  });

  const [formData, setFormData] = useState({
    category: '',
    adType: 'Free', // Changed from 'For Sale' to a valid adType
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
    sellerPhone: '0777 123 456', // Default/Mock value
    sellerEmail: 'user@example.com', // Default/Mock value
    features: [] as string[],
    images: null as FileList | null
  });

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
      console.log("files", e.target.files)
      setFormData(prev => ({ ...prev, images: e.target.files }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend validation
    if (formData.title.length < 10) {
      alert("Title must be at least 10 characters long.");
      return;
    }
    if (formData.description.length < 50) {
      alert("Description must be at least 50 characters long.");
      return;
    }
    if (!formData.images || formData.images.length === 0) {
      alert("Please upload at least one photo of the vehicle.");
      return;
    }
    if (!formData.brand) {
      alert("Please select a car brand.");
      return;
    }

    const data = new FormData();

    // Append fields
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

    // Append features
    formData.features.forEach(feature => {
      data.append('features[]', feature.toLowerCase().replace(' ', '-'));
    });

    // Append images
    if (formData.images) {
      Array.from(formData.images).forEach(image => {
        data.append('images', image);
      });
    }

    // Handle packageId
    if (packages && packages.length > 0) {
      data.append('packageId', packages[0].id);
    }

    createListingMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-secondary/30 py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Sell Your Car</h1>
          <p className="text-muted-foreground mt-2">Fill in the details below to list your vehicle for sale.</p>
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
                <Select onValueChange={(value) => handleSelectChange('category', value)} required>
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
                <Select onValueChange={(value) => handleSelectChange('brand', value)} required>
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
                <Select onValueChange={(value) => handleSelectChange('year', value)} required>
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
                <Select onValueChange={(value) => handleSelectChange('fuel', value)} required>
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
                <Select onValueChange={(value) => handleSelectChange('transmission', value)} required>
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
                <Select onValueChange={(value) => handleSelectChange('condition', value)} required>
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
                <Select onValueChange={(value) => handleSelectChange('drive', value)}>
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
                <div className="border-2 border-dashed border-input rounded-lg p-8 text-center hover:bg-accent/50 transition-colors">
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    required
                  />
                  <Label htmlFor="images" className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <span className="text-lg font-medium">Click to upload photos</span>
                    <span className="text-sm text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 800x400px)</span>
                  </Label>
                  {formData.images && (
                    <div className="mt-4 text-sm text-primary font-medium">
                      {formData.images.length} files selected
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
                <Select onValueChange={(value) => handleSelectChange('location', value)} required>
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
                    readOnly // Assuming default fill implies read-only or just pre-filled
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
            <Button variant="outline" type="button" onClick={() => window.history.back()}>Cancel</Button>
            <Button type="submit" size="lg" className="w-full md:w-auto" disabled={createListingMutation.isPending}>
              {createListingMutation.isPending ? 'Posting...' : 'Post Ad'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
