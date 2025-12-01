import { Icon } from "@iconify/react";

export default function SundayBazaar() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 pt-20">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-4xl mx-auto text-center space-y-8">

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-5 delay-100">
                        Sunday <span className="text-primary">Bazaar</span>
                    </h1>

                    <p className="text-2xl md:text-3xl font-bold text-primary animate-in fade-in slide-in-from-bottom-6 delay-200">Coming Soon</p>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 delay-200">
                        Uganda's biggest monthly car market is coming online. Experience the thrill of live auctions, exclusive deals, and community trading.
                    </p>
                </div>
            </div>

            {/* Features Grid */}
            <div className="container mx-auto px-4 py-4">
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Feature 1 */}
                    <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 flex items-center justify-center mb-6 text-primary">
                            <Icon icon="fluent:tag-multiple-24-filled" className="w-12 h-12" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Exclusive Deals</h3>
                        <p className="text-muted-foreground">
                            Get access to special prices only available during the Sunday Bazaar hours.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 flex items-center justify-center mb-6 text-primary">
                            <Icon icon="fluent:megaphone-loud-16-filled" className="w-12 h-12" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Live Auctions</h3>
                        <p className="text-muted-foreground">
                            Participate in real-time bidding wars for premium vehicles and parts.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 flex items-center justify-center mb-6 text-primary">
                            <Icon icon="fluent:calendar-date-20-filled" className="w-12 h-12" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Monthly Events</h3>
                        <p className="text-muted-foreground">
                            New inventory and special themes every last Sunday of the month. Mark your calendar!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}