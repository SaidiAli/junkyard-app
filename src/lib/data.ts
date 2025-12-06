export type Plan = {
    name: string;
    price: string;
    description: string;
    features: string[];
    mostPopular?: boolean;
};

export const plans: Plan[] = [
    {
        name: 'Free',
        price: 'UGX 0',
        description: "Free listing; no homepage feature, approval time up to 24h; 7 days online, can't be contacted by buyers.",
        features: [
            'Free listing',
            'No homepage feature',
            'Approval up to 24h',
            '7 days online',
            'Buyers cannot contact you',
        ],
    },
    {
        name: 'Premium',
        price: 'UGX 20,000',
        description: 'No approval time, homepage feature, up to 10 images, 30 days online, plus Twitter/Tiktok/Instagram ads for 30 days.',
        features: [
            'No approval time',
            'Homepage feature',
            'Up to 10 images per listing',
            '30 days online',
            'Ads on Twitter, TikTok, Instagram for 30 days',
        ],
        mostPopular: true,
    },
    {
        name: 'Car Dealers',
        price: 'UGX 150,000',
        description: 'No approval time, homepage feature, up to 10 images per car, 15 cars, 30 days online, plus Twitter/Tiktok/Instagram ads for 30 days.',
        features: [
            'No approval time',
            'Homepage feature',
            'Up to 10 images per car',
            'Maximum 15 cars',
            '30 days online',
            'Ads on Twitter, TikTok, Instagram for 30 days',
        ],
    },
];

// Data Lists
export const fuelTypes = [
    { value: 'diesel', label: 'Diesel' },
    { value: 'electric', label: 'Electric' },
    { value: 'petrol', label: 'Petrol' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'lpg-gas', label: 'LPG Gas' }
];

export const categories = [
    { value: 'buses', label: 'Buses' },
    { value: 'hatchback', label: 'Hatchback' },
    { value: 'mini-truck', label: 'Mini-Truck' },
    { value: 'off-road', label: 'Off-Road' },
    { value: 'pickup', label: 'Pickup' },
    { value: 'saloon', label: 'Saloon' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'truck', label: 'Truck' },
    { value: 'van', label: 'Van' },
    { value: 'wagon', label: 'Wagon' }
];

export const brands = [
    { value: 'audi', label: 'Audi' },
    { value: 'bmw', label: 'BMW' },
    { value: 'daihatsu', label: 'Daihatsu' },
    { value: 'ford', label: 'Ford' },
    { value: 'hino', label: 'Hino' },
    { value: 'isuzu', label: 'Isuzu' },
    { value: 'land-rover', label: 'Land Rover' },
    { value: 'mazda', label: 'Mazda' },
    { value: 'mercedes', label: 'Mercedes' },
    { value: 'mitsubishi', label: 'Mitsubishi' },
    { value: 'nissan', label: 'Nissan' },
    { value: 'subaru', label: 'Subaru' },
    { value: 'suzuki', label: 'Suzuki' },
    { value: 'toyota', label: 'Toyota' },
    { value: 'volkswagen', label: 'Volkswagen' },
    { value: 'volvo', label: 'Volvo' }
];

export const featuresList = [
    { value: 'abs', label: 'ABS' },
    { value: 'air-conditioner', label: 'Air Conditioner' },
    { value: 'power-steering', label: 'Power Steering' },
    { value: 'sun-roof', label: 'Sun Roof' },
    { value: 'air-bags', label: 'Air Bags' },
    { value: 'gps', label: 'GPS' },
    { value: 'security-system', label: 'Security System' },
    { value: 'power-windows', label: 'Power Windows' },
    { value: 'rear-camera', label: 'Rear Camera' },
    { value: 'bluetooth', label: 'Bluetooth' },
    { value: 'usb-port', label: 'USB Port' },
    { value: 'cruise-control', label: 'Cruise Control' },
    { value: 'keyless-entry', label: 'Keyless Entry' },
    { value: 'leather-seats', label: 'Leather Seats' },
    { value: 'alloy-wheels', label: 'Alloy Wheels' }
];

export const transmissions = [
    { value: 'manual', label: 'Manual' },
    { value: 'automatic', label: 'Automatic' }
];

export const conditions = [
    { value: 'foreign_used', label: 'Foreign Used' },
    { value: 'locally_used', label: 'Locally Used' },
    { value: 'new', label: 'New' }
];

export const driveTypes = [
    { value: '2WD', label: '2WD' },
    { value: '4WD', label: '4WD' },
    { value: 'AWD', label: 'AWD' }
];

export const locations = [
    { value: 'kampala', label: 'Kampala' },
    { value: 'jinja', label: 'Jinja' },
    { value: 'arua', label: 'Arua' },
    { value: 'gulu', label: 'Gulu' },
    { value: 'lira', label: 'Lira' },
    { value: 'masaka', label: 'Masaka' },
    { value: 'mbale', label: 'Mbale' },
    { value: 'mbarara', label: 'Mbarara' },
    { value: 'mpigi', label: 'Mpigi' },
    { value: 'mukono', label: 'Mukono' },
    { value: 'soroti', label: 'Soroti' }
];

export const adTypes = [
    { value: 'free', label: 'Free' },
    { value: 'premium', label: 'Premium' },
    { value: 'car-dealership', label: 'Car Dealership' }
];