'use client'

import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/app/components/ui/card";

export default function PaymentSuccessPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="mx-auto mb-4 bg-green-100 p-3 rounded-full">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl">Payment Successful!</CardTitle>
                    <CardDescription>Your listing has been submitted successfully.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">
                        Your ad is now pending approval by our team. You will be notified once it goes live.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button onClick={() => router.push('/dashboard/listings')} size="lg" className="w-full">
                        Go to Dashboard
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
