import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { Link } from "wouter";
import { 
  Users, 
  Award, 
  Globe, 
  Target,
  ArrowRight,
  CheckCircle,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Calendar,
  TrendingUp
} from "lucide-react";

export default function AboutPage() {
  const { t } = useTranslation();

  const stats = [
    { value: "500+", label: "Projects Delivered", icon: Target },
    { value: "99.8%", label: "Client Satisfaction", icon: Award },
    { value: "50+", label: "Enterprise Clients", icon: Users },
    { value: "24/7", label: "Global Support", icon: Globe }
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief AI Officer",
      bio: "PhD in Machine Learning from MIT. 15+ years experience in enterprise AI solutions and research.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      linkedin: "#",
      twitter: "#",
      email: "sarah.chen@aiedge.com"
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Engineer",
      bio: "Former Google AI researcher. Specialist in large-scale distributed AI systems and MLOps.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      linkedin: "#",
      twitter: "#",
      email: "marcus.rodriguez@aiedge.com"
    },
    {
      name: "Dr. Aisha Patel",
      role: "Data Science Director",
      bio: "Stanford PhD in Statistics. Expert in predictive modeling and business intelligence.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      linkedin: "#",
      twitter: "#",
      email: "aisha.patel@aiedge.com"
    },
    {
      name: "James Kim",
      role: "VP of Engineering",
      bio: "Former Microsoft Azure AI lead. Specializes in cloud architecture and enterprise integration.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      linkedin: "#",
      twitter: "#",
      email: "james.kim@aiedge.com"
    },
    {
      name: "Emily Watson",
      role: "Head of Product",
      bio: "Product strategy expert with 12+ years building AI-powered enterprise solutions.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      linkedin: "#",
      twitter: "#",
      email: "emily.watson@aiedge.com"
    },
    {
      name: "David Thompson",
      role: "Chief Technology Officer",
      bio: "20+ years in technology leadership. Former CTO at several successful AI startups.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      linkedin: "#",
      twitter: "#",
      email: "david.thompson@aiedge.com"
    }
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We push the boundaries of what's possible with AI, constantly exploring new technologies and methodologies.",
      icon: TrendingUp
    },
    {
      title: "Client Success",
      description: "Your success is our success. We're committed to delivering solutions that drive real business value.",
      icon: Target
    },
    {
      title: "Ethical AI",
      description: "We believe in responsible AI development that respects privacy, fairness, and transparency.",
      icon: CheckCircle
    },
    {
      title: "Global Impact",
      description: "Our solutions help organizations worldwide transform their operations and create positive change.",
      icon: Globe
    }
  ];

  const milestones = [
    {
      year: "2018",
      title: "Company Founded",
      description: "AI Edge International was established with a vision to democratize AI for businesses."
    },
    {
      year: "2019",
      title: "First Enterprise Client",
      description: "Successfully deployed our first large-scale AI automation solution."
    },
    {
      year: "2020",
      title: "Global Expansion",
      description: "Expanded operations to serve clients across North America, Europe, and Asia."
    },
    {
      year: "2021",
      title: "100+ Projects Milestone",
      description: "Delivered our 100th AI project, establishing ourselves as industry leaders."
    },
    {
      year: "2022",
      title: "Research Partnership",
      description: "Formed strategic partnerships with leading universities for AI research."
    },
    {
      year: "2023",
      title: "500+ Projects Delivered",
      description: "Reached 500+ successful project deliveries with 99.8% client satisfaction."
    },
    {
      year: "2024",
      title: "Next Generation AI",
      description: "Launching advanced agentic AI systems for autonomous business operations."
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
              Leading the AI Revolution
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
              At AI Edge International, we're not just building AI solutions – we're crafting the future of intelligent business operations. Our team of world-class engineers and data scientists brings decades of combined experience in cutting-edge AI research and enterprise implementation.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                Our Mission & Vision
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Mission</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    To democratize AI technology by making it accessible, practical, and transformative for businesses of all sizes. We bridge the gap between cutting-edge AI research and real-world business applications.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Vision</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    To be the global leader in AI-powered business transformation, creating a world where intelligent automation enhances human potential and drives sustainable growth.
                  </p>
                </div>
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

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Contact Info */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ready to start your AI transformation journey? Let's talk about how we can help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <CardContent className="p-8">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Headquarters
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  San Francisco, CA<br />
                  United States
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Email
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  info@aiedgeinternational.com<br />
                  contact@aiedge.com
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Schedule a Call
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Book a consultation<br />
                  to discuss your needs
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/contact">
              <Button size="lg" className="btn-primary">
                Start Your AI Journey
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
