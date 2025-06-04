import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PartnerTicker } from "@/components/partner-ticker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { 
  Shield, 
  Rocket, 
  Cog, 
  Bot, 
  Brain, 
  TrendingUp, 
  MessageSquare, 
  Eye, 
  Network,
  Star,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export default function HomePage() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: Bot,
      title: t("services.automation.title"),
      description: t("services.automation.description"),
      color: "text-primary"
    },
    {
      icon: Brain,
      title: t("services.ml.title"),
      description: t("services.ml.description"),
      color: "text-purple-600"
    },
    {
      icon: TrendingUp,
      title: t("services.analytics.title"),
      description: t("services.analytics.description"),
      color: "text-green-600"
    },
    {
      icon: MessageSquare,
      title: t("services.nlp.title"),
      description: t("services.nlp.description"),
      color: "text-orange-600"
    },
    {
      icon: Eye,
      title: t("services.vision.title"),
      description: t("services.vision.description"),
      color: "text-purple-600"
    },
    {
      icon: Network,
      title: t("services.agents.title"),
      description: t("services.agents.description"),
      color: "text-teal-600"
    }
  ];

  const testimonials = [
    {
      name: "Jennifer Davis",
      role: "CEO, TechFlow Solutions",
      content: "AI Edge International transformed our customer service with their intelligent chatbot. We've seen a 400% improvement in response times and 95% customer satisfaction.",
      rating: 5
    },
    {
      name: "Michael Wong",
      role: "Operations Director, GlobalMart",
      content: "The predictive analytics system they built has revolutionized our inventory management. We've reduced waste by 60% and increased efficiency by 200%.",
      rating: 5
    },
    {
      name: "Elena Rodriguez",
      role: "CTO, InnovateLabs",
      content: "Their AI automation platform streamlined our entire workflow. What used to take hours now happens in minutes, with better accuracy than ever before.",
      rating: 5
    }
  ];

  const stats = [
    { value: "500+", label: "Projects Delivered" },
    { value: "99.8%", label: "Client Satisfaction" },
    { value: "50+", label: "Enterprise Clients" },
    { value: "24/7", label: "Global Support" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`${isVisible ? "animate-slide-up" : "opacity-0"}`}>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                <span className="text-gray-900 dark:text-white">Powering the Next Generation </span>
                <span className="text-gray-900 dark:text-white">of Business with </span>
                <span className="text-primary">Autonomous AI</span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {t("hero.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/contact">
                  <Button className="btn-primary px-8 py-4 text-lg font-semibold">
                    {t("hero.cta")}
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" className="btn-secondary px-8 py-4 text-lg font-semibold">
                    {t("hero.ctaSecondary")}
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span>{t("hero.features.security")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Rocket className="h-5 w-5 text-primary" />
                  <span>{t("hero.features.deployment")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Cog className="h-5 w-5 text-purple-500" />
                  <span>{t("hero.features.custom")}</span>
                </div>
              </div>
            </div>

            <div className={`relative ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Abstract AI technology visualization" 
                  className="rounded-2xl shadow-2xl w-full h-auto" 
                />
                
                {/* Floating stats cards */}
                <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 animate-float">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">98%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy Rate</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 animate-float" style={{ animationDelay: "-2s" }}>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Automation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Ticker */}
      <PartnerTicker />

      {/* Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t("services.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("services.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6`}>
                    <service.icon className={`h-8 w-8 ${service.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                  <Link href="/services" className="text-primary font-semibold hover:underline inline-flex items-center">
                    Learn More <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Process Timeline */}
          <Card className="p-8 md:p-12">
            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Our Development Process
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Analysis", description: "Deep dive into your business needs and data landscape" },
                { step: "2", title: "Design", description: "Create custom AI architectures tailored to your requirements" },
                { step: "3", title: "Development", description: "Build and train AI models with rigorous testing protocols" },
                { step: "4", title: "Deployment", description: "Seamless integration with ongoing support and optimization" }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* About/Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Leading the AI Revolution
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                At AI Edge International, we're not just building AI solutions – we're crafting the future of intelligent business operations. Our team of world-class engineers and data scientists brings decades of combined experience in cutting-edge AI research and enterprise implementation.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-primary/5 rounded-xl">
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Modern office workspace" 
                className="rounded-2xl shadow-2xl w-full h-auto" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Client Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See how we've transformed businesses with intelligent AI solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="flex text-yellow-400">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-gray-600 dark:text-gray-300 mb-6 italic">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary font-semibold">
                        {testimonial.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
            alt="Abstract AI technology background" 
            className="w-full h-full object-cover opacity-20" 
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {t("contact.title")}
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              {t("contact.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  {t("hero.cta")}
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold">
                  {t("hero.ctaSecondary")}
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                "Enterprise-grade security and compliance",
                "24/7 global support and monitoring", 
                "Proven ROI within 6 months",
                "Custom solutions tailored to your needs"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-4 text-white">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
