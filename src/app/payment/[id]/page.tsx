'use client'

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Loader2, Phone, AlertCircle } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import api from '@/lib/api';
import { ApiResponse, Listing } from '@/lib/types';

type Package = {
    id: string;
    name: string;
    displayName: string;
    price: string;
};

export default function PaymentPage() {
    const router = useRouter();
    const params = useParams();
    const listingId = params?.id as string;
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentReference, setPaymentReference] = useState<string | null>(null);
    const [polling, setPolling] = useState(false);
    const [paymentFailed, setPaymentFailed] = useState(false);

    const { data: listing, isLoading: listingLoading } = useQuery({
        queryKey: ['my-listing', listingId],
        queryFn: async () => {
            const response = await api.get<ApiResponse<Listing[]>>('/users/my-listings');
            const foundListing = response.data.data?.find((item) => item.id === listingId);
            if (!foundListing) {
                throw new Error('Listing not found');
            }
            return foundListing;
        },
        enabled: !!listingId,
    });

    const { data: packages = [] } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const response = await api.get<ApiResponse<Package[]>>('/packages/public');
            return response.data.data || [];
        },
    });

    // Initiate Payment Mutation
    const initiatePaymentMutation = useMutation({
        mutationFn: async (data: any) => {
            const response = await api.post('/payments/initiate', data);
            return response.data.data;
        },
        onSuccess: (data) => {
            setPaymentReference(data.payment.paymentReference);
            setPaymentFailed(false);
            setPolling(true);
        },
        onError: (error: any) => {
            console.error('Payment initiation error:', error);
        }
    });

    // Check if already paid
    useEffect(() => {
        if (listing?.status === 'approved') {
            router.push(`/showroom-offer/${listing.id}`);
        }
    }, [listing, router]);

    // Poll for payment status
    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (polling && paymentReference) {
            intervalId = setInterval(async () => {
                try {
                    const response = await api.post('/payments/verify', { paymentReference });
                    const status = response.data?.data?.status;

                    if (status === 'completed') {
                        setPolling(false);
                        clearInterval(intervalId);
                        router.push(`/showroom-offer/${listingId}`);
                    } else if (status === 'failed') {
                        setPolling(false);
                        setPaymentFailed(true);
                        clearInterval(intervalId);
                    }
                } catch (error) {
                    console.error("Polling error", error);
                }
            }, 5000); // Check every 5 seconds
        }

        return () => clearInterval(intervalId);
    }, [polling, paymentReference, router]);


    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!listing) return;

        // Validate phone number (simple check)
        if (phoneNumber.length < 10) {
            alert("Please enter a valid phone number");
            return;
        }

        initiatePaymentMutation.mutate({
            listingId: listing.id,
            packageId: listing.packageId,
            paymentMethod: 'mobile_money',
            payerPhone: phoneNumber,
        });
    };

    if (listingLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Listing not found.</p>
            </div>
        );
    }

    const pkg = packages.find((item) => item.id === listing.packageId);
    const amount = pkg ? pkg.price : '0';

    return (
        <div className="min-h-screen bg-secondary/30 py-12 px-4 sm:px-6 lg:px-8 pt-32">
            <div className="max-w-md mx-auto">

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Complete Payment</CardTitle>
                        <CardDescription>Pay securely with Mobile Money</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        {/* Order Summary */}
                        <div className="bg-muted p-4 rounded-lg space-y-2">
                            <div className="flex justify-between font-medium">
                                <span>Car name</span>
                                <span className="truncate w-1/2 text-right">{listing.title}</span>
                            </div>
                            <div className="flex justify-between font-medium">
                                <span>Package</span>
                                <span>{pkg?.displayName || 'Standard'}</span>
                            </div>
                            <div className="border-t border-border pt-2 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>UGX {parseFloat(amount).toLocaleString()}</span>
                            </div>
                        </div>

                        {initiatePaymentMutation.isError && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {(initiatePaymentMutation.error as Error)?.message || "Failed to initiate payment. Please try again."}
                                </AlertDescription>
                            </Alert>
                        )}

                        {paymentFailed && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Payment failed</AlertTitle>
                                <AlertDescription>
                                    The mobile money payment was not approved. Please try again.
                                </AlertDescription>
                            </Alert>
                        )}

                        {!polling ? (
                            <form onSubmit={handlePayment} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Mobile Money Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="0770000000"
                                            className="pl-10"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Enter the number you want to pay with.</p>
                                </div>

                                <Button type="submit" className="w-full" size="lg" disabled={initiatePaymentMutation.isPending}>
                                    {initiatePaymentMutation.isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        `Pay UGX ${parseFloat(amount).toLocaleString()}`
                                    )}
                                </Button>
                            </form>
                        ) : (
                            <div className="text-center space-y-4 py-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Loader2 className="h-16 w-16 animate-spin text-primary/20" />
                                    </div>
                                    <Phone className="h-16 w-16 mx-auto text-primary animate-pulse" />
                                </div>

                                <h3 className="text-xl font-semibold">Check your phone!</h3>
                                <p className="text-muted-foreground">
                                    We've sent a prompt to <strong>{phoneNumber}</strong>.<br />
                                    Please enter your PIN to approve the transaction.
                                </p>

                                <div className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-md mt-4">
                                    Do not close this page. We are waiting for confirmation...
                                </div>
                            </div>
                        )}

                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
