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
export const categories = ['Buses', 'Hatchback', 'Mini-Truck', 'Off-Road', 'Pickup', 'Saloon', 'Sedan', 'SUV', 'Truck', 'Van', 'Wagon'];
export const brands = ['Audi', 'BMW', 'Daihatsu', 'Ford', 'Hino', 'Isuzu', 'Land Rover', 'Mazda', 'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Subaru', 'Suzuki', 'Toyota', 'Volkswagen', 'Volvo'];
export const fuelTypes = ['Diesel', 'Electric', 'Petrol', 'Hybrid', 'LPG Gas'];
export const featuresList = ['ABS', 'Air Conditioner', 'Power Steering', 'Sun Roof', 'Air Bags', 'GPS', 'Security System'];
export const transmissions = ['Automatic', 'Manual'];
export const conditions = ['Foreign Used', 'Locally Used', 'New'];
export const driveTypes = ['2WD', '4WD', 'AWD'];
export const locations = ['Kampala', 'Jinja', 'Arua', 'Gulu', 'Lira', 'Masaka', 'Mbale', 'Mbarara', 'Mpigi', 'Mukono', 'Soroti'];
export const adTypes = ['Free', 'Premium', 'Car dealership'];