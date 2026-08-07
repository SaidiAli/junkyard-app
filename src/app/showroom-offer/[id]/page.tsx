'use client'

import { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowRight, BadgeCheck, CarFront, Handshake, Loader2, MapPinned, Percent, ShieldCheck, Store } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import api from '@/lib/api';
import { ApiResponse, Listing, ShowroomRequest, ShowroomRequestWithDetails } from '@/lib/types';

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
    const queryClient = useQueryClient();
    const listingId = params?.id as string;
    const [sellerNotes, setSellerNotes] = useState('');

    const { data: listing, isLoading } = useQuery({
        queryKey: ['showroom-offer-listing', listingId],
        queryFn: async () => {
            const response = await api.get<ApiResponse<Listing[]>>('/users/my-listings');
            return response.data.data?.find((item) => item.id === listingId) || null;
        },
        enabled: !!listingId,
    });

    const { data: showroomRequests, isLoading: isLoadingRequests } = useQuery({
        queryKey: ['my-showroom-requests'],
        queryFn: async () => {
            const response = await api.get<ApiResponse<ShowroomRequestWithDetails[]>>('/showroom-requests/my');
            return response.data.data || [];
        },
        enabled: !!listingId,
    });

    const existingRequest = showroomRequests?.find((item) => (
        item.request.listingId === listingId || item.listing?.id === listingId
    ));
    const currentStatus = existingRequest?.request.status;
    const canRequestAgain = !existingRequest || currentStatus === 'cancelled' || currentStatus === 'declined';
    const isPendingRequest = currentStatus === 'pending';
    const isAcceptedRequest = currentStatus === 'accepted';

    const createRequestMutation = useMutation({
        mutationFn: async () => {
            const response = await api.post<ApiResponse<ShowroomRequest>>('/showroom-requests', {
                listingId,
                sellerNotes: sellerNotes.trim() || undefined,
            });
            return response.data.data!;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-showroom-requests'] });
            toast.success('Noble Pearl request submitted. Admin has been notified.');
            setTimeout(() => router.replace('/dashboard'), 700);
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to submit Noble Pearl request');
        },
    });

    const cancelRequestMutation = useMutation({
        mutationFn: async () => {
            if (!existingRequest) {
                return null;
            }

            const response = await api.patch<ApiResponse<ShowroomRequest>>(
                `/showroom-requests/${existingRequest.request.id}/cancel`
            );
            return response.data.data!;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-showroom-requests'] });
            toast.info('Noble Pearl request cancelled. You can request again later.');
            setTimeout(() => router.replace('/dashboard'), 700);
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to update Noble Pearl choice');
        },
    });

    const handleInterested = () => {
        if (!listingId) {
            toast.error('Listing not found');
            return;
        }

        createRequestMutation.mutate();
    };

    const handleSkip = () => {
        if (isPendingRequest) {
            cancelRequestMutation.mutate();
            return;
        }

        toast.info('No problem. Your Junkyard listing is still pending approval.');
        router.replace('/dashboard');
    };

    if (isLoading || isLoadingRequests) {
        return (
            <main className="min-h-screen bg-black pt-32 flex items-center justify-center text-white">
                <Loader2 className="h-8 w-8 animate-spin text-[#00d12f]" />
            </main>
        );
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#020402] px-4 pb-8 pt-28 text-white lg:h-screen lg:pb-4 lg:pt-[6.5rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,209,47,0.22),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(0,209,47,0.14),transparent_28%),linear-gradient(135deg,#020402_0%,#071407_48%,#000_100%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d12f] to-transparent opacity-70" />

            <section className="relative mx-auto flex min-h-[calc(100vh-9rem)] max-w-6xl items-center lg:h-full lg:min-h-0">
                <div className="grid w-full gap-4 lg:h-full lg:max-h-[calc(100vh-7.5rem)] lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
                    <div className="flex flex-col justify-between border border-white/10 bg-black/45 p-4 backdrop-blur md:p-5">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 border border-[#00d12f]/40 bg-[#00d12f]/10 px-3 py-1.5 text-xs font-medium text-[#9affac]">
                                <Handshake className="h-4 w-4" />
                                Junkyard x Noble Pearl Automotive
                            </div>

                            <h1 className="text-3xl font-black leading-[0.95] tracking-normal md:text-4xl xl:text-5xl">
                                Put your car where serious buyers can see it.
                            </h1>
                            <p className="max-w-2xl text-sm leading-relaxed text-white/72 md:text-base">
                                Your paid Junkyard ad is submitted. Now you can also place the car with Noble Pearl and give buyers a trusted showroom experience.
                            </p>
                        </div>

                        <div className="mt-5 space-y-3">
                            {listing && (
                                <div className="border border-white/12 bg-white/[0.04] p-3 backdrop-blur">
                                    <div className="flex items-start gap-3">
                                        <CarFront className="mt-1 h-5 w-5 text-[#00d12f]" />
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Your listing</p>
                                            <p className="mt-1 text-base font-semibold">{listing.title}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {existingRequest && (
                                <div className="border border-[#00d12f]/25 bg-[#00d12f]/10 p-3 text-sm text-[#caffd2]">
                                    <p className="font-bold">
                                        {isPendingRequest && 'Your Noble Pearl request is pending admin follow-up.'}
                                        {isAcceptedRequest && 'Your Noble Pearl request has been accepted.'}
                                        {currentStatus === 'declined' && 'This Noble Pearl request was declined, but you can request again.'}
                                        {currentStatus === 'cancelled' && 'You chose not to use Noble Pearl for now. You can request again anytime.'}
                                    </p>
                                    {existingRequest.request.adminNotes && (
                                        <p className="mt-2 text-white/70">Admin note: {existingRequest.request.adminNotes}</p>
                                    )}
                                </div>
                            )}

                            {canRequestAgain && (
                                <Textarea
                                    value={sellerNotes}
                                    onChange={(event) => setSellerNotes(event.target.value)}
                                    placeholder="Optional note for admin or Noble Pearl, e.g. best time to call, car availability..."
                                    className="min-h-16 rounded-none border-white/15 bg-black/40 text-white placeholder:text-white/40"
                                />
                            )}

                            <div className="grid gap-3 sm:grid-cols-2">
                                <Button
                                    onClick={handleInterested}
                                    disabled={!canRequestAgain || createRequestMutation.isPending || cancelRequestMutation.isPending}
                                    className="h-12 rounded-none bg-[#00d12f] text-black hover:bg-[#3dff66] font-bold"
                                >
                                    {createRequestMutation.isPending ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : isPendingRequest ? (
                                        'Request submitted'
                                    ) : isAcceptedRequest ? (
                                        'Request accepted'
                                    ) : (
                                        <>
                                            Yes, I'm interested
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                                <Button
                                    onClick={handleSkip}
                                    disabled={createRequestMutation.isPending || cancelRequestMutation.isPending || isAcceptedRequest}
                                    variant="outline"
                                    className="h-12 rounded-none border-white/20 bg-transparent text-white hover:bg-white hover:text-black"
                                >
                                    {cancelRequestMutation.isPending ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Updating...
                                        </>
                                    ) : isPendingRequest ? (
                                        'Cancel request'
                                    ) : isAcceptedRequest ? (
                                        'Accepted by admin'
                                    ) : (
                                        'Not now'
                                    )}
                                </Button>
                            </div>

                            {(isPendingRequest || isAcceptedRequest) && (
                                <Button
                                    variant="ghost"
                                    onClick={() => router.replace('/dashboard')}
                                    className="h-10 rounded-none text-white/70 hover:bg-white/10 hover:text-white"
                                >
                                    Go to dashboard
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="border border-[#00d12f]/35 bg-black/75 p-4 shadow-[0_0_60px_rgba(0,209,47,0.18)] md:p-5">
                        <div className="flex h-full flex-col gap-4">
                            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                                <div className="relative h-16 w-40 shrink-0 md:h-20 md:w-52">
                                    <Image
                                        src="/partners/noble-pearl-logo.png"
                                        alt="Noble Pearl Automotive"
                                        fill
                                        priority
                                        className="object-contain object-left"
                                    />
                                </div>
                                <div className="hidden max-w-[15rem] text-center text-sm text-white/60 sm:block">
                                    More buyer trust through a physical showroom.
                                </div>
                            </div>

                            <div className="grid flex-1 gap-3 md:grid-cols-[0.88fr_1.12fr] md:items-stretch">
                                <div className="border border-white/10 bg-white/[0.035] p-4">
                                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">Commission</p>
                                    <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-1">
                                        <div>
                                            <p className="text-4xl font-black text-[#00d12f] xl:text-5xl">4.5%</p>
                                            <p className="mt-1 text-sm text-white/62">Junkyard seller rate</p>
                                        </div>
                                        <div>
                                            <p className="text-3xl font-black text-white xl:text-4xl">5%</p>
                                            <p className="mt-1 text-sm text-white/62">Standard rate</p>
                                        </div>
                                    </div>
                                    <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-white/72">
                                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#00d12f]" />
                                        You only pay if Noble Pearl sells your car.
                                    </p>
                                </div>

                                <div className="grid gap-3">
                                    {benefits.map((benefit) => {
                                        const Icon = benefit.icon;
                                        return (
                                            <div key={benefit.title} className="flex gap-3 border border-white/10 bg-white/[0.035] p-3 xl:p-4">
                                                <Icon className="mt-1 h-5 w-5 shrink-0 text-[#00d12f]" />
                                                <div>
                                                    <h2 className="font-bold">{benefit.title}</h2>
                                                    <p className="mt-1 text-sm leading-5 text-white/62">{benefit.description}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="border border-[#00d12f]/25 bg-[#00d12f]/10 p-3 text-sm text-[#caffd2]">
                                <div className="flex gap-3">
                                    <MapPinned className="h-5 w-5 shrink-0" />
                                    <p>
                                        Noble Pearl will inspect and coordinate next steps before a vehicle is accepted into the showroom.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
