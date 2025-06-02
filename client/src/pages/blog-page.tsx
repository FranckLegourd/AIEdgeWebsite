import { useState } from "react";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BlogPage() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All" },
    { id: "highlights", label: "Highlights" },
    { id: "updates", label: "Updates" },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI Agent Systems in Business Automation",
      excerpt: "Discover how AI agents are revolutionizing business processes and creating new opportunities for intelligent automation across industries.",
      category: "highlights",
      readTime: "5 min read",
      date: "Dec 15, 2024",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop&crop=center",
      tags: ["AI Agents", "Automation", "Business"]
    },
    {
      id: 2,
      title: "Machine Learning Model Deployment: Best Practices for 2024",
      excerpt: "A comprehensive guide to deploying ML models in production environments with security, scalability, and performance in mind.",
      category: "updates",
      readTime: "7 min read",
      date: "Dec 12, 2024",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop&crop=center",
      tags: ["Machine Learning", "DevOps", "Production"]
    },
    {
      id: 3,
      title: "Natural Language Processing: Transforming Customer Support",
      excerpt: "How advanced NLP techniques are enabling more intelligent and empathetic customer service experiences.",
      category: "highlights",
      readTime: "6 min read",
      date: "Dec 8, 2024",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500&h=300&fit=crop&crop=center",
      tags: ["NLP", "Customer Support", "AI"]
    },
    {
      id: 4,
      title: "Computer Vision Applications in Quality Control",
      excerpt: "Exploring how computer vision is revolutionizing manufacturing quality control and defect detection processes.",
      category: "updates",
      readTime: "4 min read",
      date: "Dec 5, 2024",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&h=300&fit=crop&crop=center",
      tags: ["Computer Vision", "Manufacturing", "Quality Control"]
    },
    {
      id: 5,
      title: "Predictive Analytics: From Data to Decision Making",
      excerpt: "Learn how predictive analytics models are helping businesses make data-driven decisions and forecast future trends.",
      category: "highlights",
      readTime: "8 min read",
      date: "Dec 1, 2024",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&crop=center",
      tags: ["Predictive Analytics", "Data Science", "Business Intelligence"]
    },
    {
      id: 6,
      title: "AI Ethics and Responsible Development Practices",
      excerpt: "Understanding the importance of ethical AI development and implementing responsible practices in AI projects.",
      category: "updates",
      readTime: "6 min read",
      date: "Nov 28, 2024",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500&h=300&fit=crop&crop=center",
      tags: ["AI Ethics", "Responsible AI", "Development"]
    }
  ];

  const filteredPosts = activeFilter === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            World of AI Innovation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-slide-up">
            Dive into our curated collection of insights, tutorials, and perspectives that explore the cutting-edge world of artificial intelligence and automation.
          </p>
          
          {/* Filter Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeFilter === filter.id 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "border-primary/20 hover:border-primary/40"
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card 
                  className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-border/50 hover:border-primary/20 cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge 
                        variant="secondary" 
                        className="bg-primary/90 text-primary-foreground capitalize"
                      >
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <CardTitle className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors duration-200">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="text-xs border-primary/20 text-primary/80"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto text-primary hover:text-primary/80 font-medium"
                    >
                      Read Article →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with AI Innovations</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Subscribe to our newsletter and get the latest insights on AI technology, automation strategies, and industry trends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
            <Button className="px-8 py-3 bg-primary hover:bg-primary/90">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}