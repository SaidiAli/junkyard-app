'use client';

import { Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { plans } from '@/lib/data';

export default function PricingPage() {
    return (
        <section className="min-h-screen bg-gradient-to-b from-background to-muted/50 pt-20">

            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-4xl mx-auto text-center space-y-8">

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-5 delay-100">
                        Pricing Plans
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 delay-200">
                        Choose the plan that best fits your needs. All plans give you access to the Sunday Bazaar marketplace.
                    </p>
                </div>
            </div>

            {/* Plans Grid */}
            <div className="container mx-auto px-4 pb-16 grid gap-8 md:grid-cols-3 max-w-6xl">
                {plans.map((plan) => (
                    <Card
                        key={plan.name}
                        className={`flex flex-col ${plan.mostPopular ? 'border-primary shadow-lg' : ''}`}
                    >
                        <CardHeader className="flex flex-col items-center gap-2">
                            {plan.mostPopular && (
                                <Badge variant="secondary" className="uppercase">
                                    Most Popular
                                </Badge>
                            )}
                            <CardTitle className="text-2xl font-semibold">{plan.name}</CardTitle>
                            <div className="text-4xl font-bold">{plan.price}</div>
                            <p className="text-muted-foreground text-center px-4">{plan.description}</p>
                        </CardHeader>

                        <CardContent className="flex-1">
                            <ul className="space-y-2">
                                {plan.features.map((feat) => (
                                    <li key={feat} className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-primary" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <CardFooter className="flex justify-center">
                            <Button
                                variant={plan.mostPopular ? 'default' : 'outline'}
                                className="w-full"
                                onClick={() => console.log(`Selected ${plan.name}`)}
                            >
                                {plan.mostPopular ? 'Get Started' : 'Select'}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
}