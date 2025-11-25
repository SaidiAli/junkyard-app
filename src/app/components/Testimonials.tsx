import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Peterson",
      role: "Business Owner",
      rating: 5,
      text: "Outstanding service! The team helped me find the perfect SUV for my family. Professional and friendly throughout the entire process.",
    },
    {
      name: "David Chen",
      role: "Entrepreneur",
      rating: 5,
      text: "Best car buying experience I've ever had. Transparent pricing, excellent selection, and zero pressure sales approach. Highly recommended!",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      rating: 5,
      text: "The financing options made it incredibly easy to get my dream car. The staff went above and beyond to make sure everything was perfect.",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={"/imgs/hero-vehicles.jpg"}
          alt="Customer feedback"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/95" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Our Customer Feedback
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear what our satisfied customers have to say
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background/95 backdrop-blur-sm border-border hover:shadow-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
