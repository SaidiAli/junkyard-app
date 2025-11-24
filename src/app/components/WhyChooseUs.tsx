import { Shield, DollarSign, Users, Award } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Trusted By Thousands",
      description: "Over 50,000 satisfied customers trust us for their automotive needs",
    },
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description: "Best market rates with transparent pricing and no hidden fees",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Professional advisors to guide you through every step of your purchase",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Every vehicle inspected and certified for your peace of mind",
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience excellence in automotive retail with our premium services
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-border hover:shadow-hover transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
