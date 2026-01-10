import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { Link } from "wouter";
import { 
  Filter, 
  Mic, 
  Database, 
  Video, 
  MessageSquare, 
  Bot,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Clock,
  Target,
  Users,
  BarChart
} from "lucide-react";

export default function ServicesPage() {
  const { t } = useTranslation();

  const services = [
    {
      icon: Filter,
      title: t("services.automation.title"),
      description: t("services.automation.description"),
      color: "text-primary",
      bgColor: "bg-primary/10",
      features: t("services.automation.features") as unknown as string[],
      useCases: t("services.automation.useCases") as unknown as string[]
    },
    {
      icon: Mic,
      title: t("services.ml.title"),
      description: t("services.ml.description"),
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      features: t("services.ml.features") as unknown as string[],
      useCases: t("services.ml.useCases") as unknown as string[]
    },
    {
      icon: Database,
      title: t("services.analytics.title"),
      description: t("services.analytics.description"),
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      features: t("services.analytics.features") as unknown as string[],
      useCases: t("services.analytics.useCases") as unknown as string[]
    },
    {
      icon: Video,
      title: t("services.nlp.title"),
      description: t("services.nlp.description"),
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
      features: t("services.nlp.features") as unknown as string[],
      useCases: t("services.nlp.useCases") as unknown as string[]
    },
    {
      icon: MessageSquare,
      title: t("services.vision.title"),
      description: t("services.vision.description"),
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      features: t("services.vision.features") as unknown as string[],
      useCases: t("services.vision.useCases") as unknown as string[]
    },
    {
      icon: Bot,
      title: t("services.agents.title"),
      description: t("services.agents.description"),
      color: "text-teal-600",
      bgColor: "bg-teal-100 dark:bg-teal-900/20",
      features: t("services.agents.features") as unknown as string[],
      useCases: t("services.agents.useCases") as unknown as string[]
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Increased Efficiency",
      description: "Automate repetitive tasks and optimize workflows to boost productivity by up to 400%."
    },
    {
      icon: Target,
      title: "Better Decision Making",
      description: "Data-driven insights help you make informed decisions that drive business growth."
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Enterprise-grade security measures protect your data and ensure compliance."
    },
    {
      icon: Clock,
      title: "24/7 Operations",
      description: "AI systems work around the clock, providing continuous service without breaks."
    },
    {
      icon: Users,
      title: "Improved Customer Experience",
      description: "Deliver personalized experiences that exceed customer expectations."
    },
    {
      icon: BarChart,
      title: "Measurable ROI",
      description: "Track and measure the impact of AI solutions with clear metrics and KPIs."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Analysis",
      description: "We analyze your business processes, data, and goals to identify AI opportunities.",
      duration: "1-2 weeks"
    },
    {
      step: "02",
      title: "Strategy & Design",
      description: "Create a comprehensive AI strategy and design custom solutions for your needs.",
      duration: "2-3 weeks"
    },
    {
      step: "03",
      title: "Development & Training",
      description: "Build and train AI models using your data with rigorous testing protocols.",
      duration: "4-8 weeks"
    },
    {
      step: "04",
      title: "Integration & Deployment",
      description: "Seamlessly integrate AI solutions into your existing systems and workflows.",
      duration: "2-4 weeks"
    },
    {
      step: "05",
      title: "Monitoring & Optimization",
      description: "Continuous monitoring and optimization to ensure peak performance.",
      duration: "Ongoing"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-16 py-20 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t("services.title")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
              {t("services.subtitle")}
            </p>
            <Link href="/contact">
              <Button size="lg" className="btn-primary">
                {t("services.getStarted")}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                    <service.icon className={`h-8 w-8 ${service.color}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Key Features:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <CheckCircle className={`h-4 w-4 mr-2 ${service.color}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Use Cases:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.useCases.map((useCase, useCaseIndex) => (
                        <span
                          key={useCaseIndex}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link href="/contact">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {t("services.learnMore")}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose AI Solutions?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover the transformative benefits of implementing AI in your business operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Implementation Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A proven methodology to ensure successful AI implementation and maximum ROI
            </p>
          </div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-primary text-white p-8 md:w-48 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-2">{step.step}</div>
                        <div className="text-sm opacity-90">{step.duration}</div>
                      </div>
                    </div>
                    <div className="p-8 flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Let's discuss how our AI solutions can drive innovation and growth for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Start Your AI Journey
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                {t("services.learnMoreAboutUs")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
