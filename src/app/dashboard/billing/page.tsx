'use client';

import { Button } from '@/app/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/app/components/ui/card';
import { Check } from 'lucide-react';

export default function BillingPage() {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Billing & Subscription</h1>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Free Plan</CardTitle>
                        <CardDescription>For casual sellers</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-4">UGX 0<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                                <Check className="mr-2 h-4 w-4 text-primary" />
                                1 Active Listing
                            </li>
                            <li className="flex items-center">
                                <Check className="mr-2 h-4 w-4 text-primary" />
                                Basic Analytics
                            </li>
                            <li className="flex items-center">
                                <Check className="mr-2 h-4 w-4 text-primary" />
                                Standard Support
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant="outline" disabled>Current Plan</Button>
                    </CardFooter>
                </Card>

                <Card className="border-primary">
                    <CardHeader>
                        <CardTitle>Pro Seller</CardTitle>
                        <CardDescription>For serious dealers</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-4">UGX 50,000<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                                <Check className="mr-2 h-4 w-4 text-primary" />
                                10 Active Listings
                            </li>
                            <li className="flex items-center">
                                <Check className="mr-2 h-4 w-4 text-primary" />
                                Featured Listings
                            </li>
                            <li className="flex items-center">
                                <Check className="mr-2 h-4 w-4 text-primary" />
                                Priority Support
                            </li>
                            <li className="flex items-center">
                                <Check className="mr-2 h-4 w-4 text-primary" />
                                Advanced Analytics
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Upgrade</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Enterprise</CardTitle>
                        <CardDescription>For large dealerships</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-4">UGX 200,000<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                                <Check className="mr-2 h-4 w-4 text-primary" />
                                Unlimited Listings
                            </li>
                            <li className="flex items-center">
                                <Check className="mr-2 h-4 w-4 text-primary" />
                                API Access
                            </li>
                            <li className="flex items-center">
                                <Check className="mr-2 h-4 w-4 text-primary" />
                                Dedicated Account Manager
                            </li>
                            <li className="flex items-center">
                                <Check className="mr-2 h-4 w-4 text-primary" />
                                Custom Branding
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant="outline">Contact Sales</Button>
                    </CardFooter>
                </Card>
            </div>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>View your past invoices</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-sm text-muted-foreground">No invoices found.</div>
                </CardContent>
            </Card>
        </>
    );
}
