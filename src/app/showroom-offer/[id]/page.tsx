'use client'

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, BadgeCheck, CarFront, Handshake, Loader2, MapPinned, Percent, ShieldCheck, Store } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/button';
import api from '@/lib/api';
import { ApiResponse, Listing } from '@/lib/types';

const benefits = [
    {
        icon: Store,
        title: 'Showroom visibility',
        description: 'Let serious walk-in buyers inspect your car in a trusted sales space.',
    },
    {
        icon: ShieldCheck,
        title: 'More buyer confidence',
        description: 'A physical showroom helps buyers feel safer before making an offer.',
    },
    {
        icon: Percent,
        title: 'Reduced seller fee',
        description: 'Junkyard sellers pay 4.5% only if Noble Pearl sells the car.',
    },
];

export default function ShowroomOfferPage() {
    const params = useParams();
    const router = useRouter();
    const listingId = params?.id as string;

    const { data: listing, isLoading } = useQuery({
        queryKey: ['showroom-offer-listing', listingId],
        queryFn: async () => {
            const response = await api.get<ApiResponse<Listing[]>>('/users/my-listings');
            return response.data.data?.find((item) => item.id === listingId) || null;
        },
        enabled: !!listingId,
    });

    const handleInterested = () => {
        toast.success('Thanks. The showroom request flow is ready for backend connection.');
        router.push('/dashboard');
    };

    const handleSkip = () => {
        toast.info('No problem. Your Junkyard listing is still pending approval.');
        router.push('/dashboard');
    };

    if (isLoading) {
        return (
            <main className="min-h-screen bg-black pt-32 flex items-center justify-center text-white">
                <Loader2 className="h-8 w-8 animate-spin text-[#00d12f]" />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#020402] text-white pt-28 pb-16 px-4 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,209,47,0.22),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(0,209,47,0.14),transparent_28%),linear-gradient(135deg,#020402_0%,#071407_48%,#000_100%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d12f] to-transparent opacity-70" />

            <section className="relative mx-auto max-w-6xl">
                <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 border border-[#00d12f]/40 bg-[#00d12f]/10 px-4 py-2 text-sm font-medium text-[#9affac]">
                            <Handshake className="h-4 w-4" />
                            Junkyard x Noble Pearl Automotive
                        </div>

                        <div className="space-y-5">
                            <h1 className="text-4xl md:text-6xl font-black leading-[0.95] tracking-normal">
                                Put your car where serious buyers can see it.
                            </h1>
                            <p className="max-w-2xl text-lg md:text-xl text-white/72 leading-relaxed">
                                Your paid Junkyard ad is submitted. Now you can also place the car with Noble Pearl and give buyers a trusted showroom experience.
                            </p>
                        </div>

                        {listing && (
                            <div className="border border-white/12 bg-white/[0.04] p-4 md:p-5 backdrop-blur">
                                <div className="flex items-start gap-3">
                                    <CarFront className="mt-1 h-5 w-5 text-[#00d12f]" />
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.28em] text-white/45">Your listing</p>
                                        <p className="mt-1 text-lg font-semibold">{listing.title}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid gap-3 sm:grid-cols-2">
                            <Button
                                onClick={handleInterested}
                                className="h-14 rounded-none bg-[#00d12f] text-black hover:bg-[#3dff66] font-bold"
                            >
                                Yes, I am interested
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button
                                onClick={handleSkip}
                                variant="outline"
                                className="h-14 rounded-none border-white/20 bg-transparent text-white hover:bg-white hover:text-black"
                            >
                                Not now
                            </Button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="border border-[#00d12f]/35 bg-black/70 p-6 md:p-8 shadow-[0_0_60px_rgba(0,209,47,0.18)]">
                            <div className="relative mx-auto aspect-[4/3] max-w-md">
                                <Image
                                    src="/partners/noble-pearl-logo.png"
                                    alt="Noble Pearl Automotive"
                                    fill
                                    priority
                                    className="object-contain"
                                />
                            </div>

                            <div className="mt-6 border-t border-white/10 pt-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-4xl font-black text-[#00d12f]">4.5%</p>
                                        <p className="mt-1 text-sm text-white/60">Junkyard seller success fee</p>
                                    </div>
                                    <div>
                                        <p className="text-4xl font-black text-white">5%</p>
                                        <p className="mt-1 text-sm text-white/60">Standard Noble Pearl fee</p>
                                    </div>
                                </div>
                                <p className="mt-5 flex items-start gap-2 text-sm text-white/70">
                                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#00d12f]" />
                                    You only pay the Noble Pearl success fee if they sell your car.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 grid gap-4 md:grid-cols-3">
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon;
                        return (
                            <div key={benefit.title} className="border border-white/10 bg-white/[0.035] p-6">
                                <Icon className="h-7 w-7 text-[#00d12f]" />
                                <h2 className="mt-5 text-xl font-bold">{benefit.title}</h2>
                                <p className="mt-3 text-sm leading-6 text-white/62">{benefit.description}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6 border border-[#00d12f]/25 bg-[#00d12f]/10 p-5 text-sm text-[#caffd2]">
                    <div className="flex gap-3">
                        <MapPinned className="h-5 w-5 shrink-0" />
                        <p>
                            Noble Pearl will inspect and coordinate next steps before a vehicle is accepted into the showroom.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
