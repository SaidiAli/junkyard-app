import { Calendar, ArrowRight } from "lucide-react";
import carRed from "@/assets/car-red-1.jpg";
import carWhite from "@/assets/car-white-suv.jpg";
import carBlue from "@/assets/car-blue.jpg";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const NewsSection = () => {
  const articles = [
    {
      image: "/imgs/car-red-1.jpg",
      date: "January 15, 2024",
      title: "The Future of Electric Vehicles: What to Expect in 2024",
      excerpt: "Discover the latest trends and innovations shaping the electric vehicle market this year.",
    },
    {
      image: "/imgs/car-white-suv.jpg",
      date: "January 12, 2024",
      title: "Top 10 SUVs for Families: A Comprehensive Guide",
      excerpt: "Find the perfect family SUV with our detailed comparison of safety, comfort, and features.",
    },
    {
      image: "/imgs/car-blue.jpg",
      date: "January 8, 2024",
      title: "Luxury Car Maintenance: Tips from the Pros",
      excerpt: "Expert advice on keeping your luxury vehicle in pristine condition year-round.",
    },
  ];

  return (
    <section className="py-20 bg-background" id="news">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest News & Articles</h2>
            <p className="text-lg text-muted-foreground">
              Stay updated with the latest automotive insights and trends
            </p>
          </div>
          <Button className="hidden md:flex">
            View All Articles
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-hover transition-all duration-300 border-border cursor-pointer">
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{article.date}</span>
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground">{article.excerpt}</p>
                <Button className="p-0 h-auto group/btn">
                  Read More
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
