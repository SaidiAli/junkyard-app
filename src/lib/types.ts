export interface ApiResponse<T = any> {
    success: boolean
    message: string
    data?: T
    error?: string
    timestamp: string
}

export interface PaginatedResponse<T> {
    items: T[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface ErrorResponse {
    success: false
    error: string
    message: string
    timestamp: string
}

export type Category =
    | 'buses'
    | 'hatchback'
    | 'mini-truck'
    | 'off-road'
    | 'pickup'
    | 'saloon'
    | 'sedan'
    | 'suv'
    | 'truck'
    | 'van'
    | 'wagon';

export type Brand =
    | 'audi'
    | 'bmw'
    | 'daihatsu'
    | 'ford'
    | 'hino'
    | 'isuzu'
    | 'land-rover'
    | 'mazda'
    | 'mercedes'
    | 'mitsubishi'
    | 'nissan'
    | 'subaru'
    | 'suzuki'
    | 'toyota'
    | 'volkswagen'
    | 'volvo';

export type ListingStatus = 'pending' | 'approved' | 'rejected' | 'sold';

export interface Listing {
    id: string;
    userId: string;
    packageId: string;
    category: Category;
    typeOfAd: string;
    brand: Brand;
    model: string;
    yearOfMake: number;
    mileage: number;
    fuelType: string;
    transmission: string;
    condition: string;
    engineCapacity: string;
    drive: string;
    color: string;
    numberPlate: string;
    price: string;
    features: string[];
    location: string;
    title: string;
    description: string;
    images: string[];
    sellerPhone: string;
    sellerEmail: string;
    status: ListingStatus;
    isActive: boolean;
    isFeatured: boolean;
    views: number;
    createdAt: string; // Serialized date
    updatedAt: string; // Serialized date
}

export interface Payment {
    id: string;
    userId: string;
    listingId: string;
    packageId: string;
    amount: string;
    paymentMethod: 'mobile_money' | 'bank_transfer' | 'qr_code';
    paymentReference: string;
    status: 'pending' | 'completed' | 'failed';
    createdAt: string;
    updatedAt: string;
    listing?: Listing; // Optional, might be joined
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    phone?: string;
    isVerified: boolean;
    createdAt: string;
}
