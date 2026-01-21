import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/use-translation";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertInquirySchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Users,
  Zap,
  Shield,
  ArrowRight,
  Linkedin,
  Twitter,
  Github
} from "lucide-react";

export default function ContactPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const contactForm = useForm({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      serviceInterest: "",
      message: "",
      status: "new",
    },
  });

  const submitInquiryMutation = useMutation({
    mutationFn: async (data: z.infer<typeof insertInquirySchema>) => {
      const res = await apiRequest("POST", "/api/inquiries", data);
      return res.json();
    },
    onSuccess: (data) => {
      setIsSubmitted(true);
      setDebugInfo(data._debug || null);
      window.scrollTo({ top: 0, behavior: "smooth" });
      contactForm.reset();
      toast({
        title: "Success",
        description: "Your inquiry has been submitted successfully. Our team will review your request and get back to you within 24 hours or less.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof insertInquirySchema>) => {
    submitInquiryMutation.mutate(data);
  };

  const benefits = [
    {
      icon: CheckCircle,
      title: "Free Consultation",
      description: "Get expert advice on your AI transformation journey at no cost."
    },
    {
      icon: Zap,
      title: "Rapid Response",
      description: "We respond to all inquiries within 24 hours during business days."
    },
    {
      icon: Shield,
      title: "Confidential Discussion",
      description: "Your business information is kept strictly confidential."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Connect directly with our AI specialists and industry experts."
    }
  ];

  const faqs = [
    {
      question: t("contact.faqs.q1.question"),
      answer: t("contact.faqs.q1.answer")
    },
    {
      question: t("contact.faqs.q2.question"),
      answer: t("contact.faqs.q2.answer")
    },
    {
      question: t("contact.faqs.q3.question"),
      answer: t("contact.faqs.q3.answer")
    },
    {
      question: t("contact.faqs.q4.question"),
      answer: t("contact.faqs.q4.answer")
    },
    {
      question: t("contact.faqs.q5.question"),
      answer: t("contact.faqs.q5.answer")
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
            alt="Abstract AI technology background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t("contact.title")}
            </h1>
            <p className="text-xl max-w-4xl mx-auto mb-8 opacity-90">
              {t("contact.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl">
                {!isSubmitted && (
                  <CardHeader>
                    <CardTitle className="text-2xl">Get Started Today</CardTitle>
                    <p className="text-gray-600 dark:text-gray-300">
                      Fill out the form below and we'll get back to you within 24 hours or less.
                    </p>
                  </CardHeader>
                )}
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Thank You!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Your inquiry has been submitted successfully. Our team will review your request and get back to you within 24 hours or less.
                      </p>
                      <Button
                        onClick={() => {
                          setIsSubmitted(false);
                          setDebugInfo(null);
                        }}
                        variant="outline"
                      >
                        Submit Another Inquiry
                      </Button>

                      {/* Debug Info Section - Remove after troubleshooting */}
                      {debugInfo && (
                        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
                          <h4 className="font-bold text-sm mb-2 text-gray-700 dark:text-gray-300">
                            📧 Email Debug Info (for troubleshooting):
                          </h4>
                          <div className="text-xs font-mono space-y-1 text-gray-600 dark:text-gray-400">
                            <p><strong>Status:</strong> <span className={debugInfo.emailStatus === 'sent' ? 'text-green-600' : 'text-red-600'}>{debugInfo.emailStatus}</span></p>
                            {debugInfo.emailError && (
                              <p><strong>Error:</strong> <span className="text-red-600">{debugInfo.emailError}</span></p>
                            )}
                            <p><strong>Host:</strong> {debugInfo.mailConfig?.host}</p>
                            <p><strong>Port:</strong> {debugInfo.mailConfig?.port}</p>
                            <p><strong>Secure:</strong> {String(debugInfo.mailConfig?.secure)}</p>
                            <p><strong>Username:</strong> {debugInfo.mailConfig?.username}</p>
                            <p><strong>Password Set:</strong> {String(debugInfo.mailConfig?.passwordSet)}</p>
                            <p><strong>Password Length:</strong> {debugInfo.mailConfig?.passwordLength}</p>
                            <p><strong>Node Env:</strong> {debugInfo.nodeEnv}</p>
                            <p><strong>Timestamp:</strong> {debugInfo.timestamp}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <form onSubmit={contactForm.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">{t("contact.form.firstName")} <span className="text-destructive">*</span></Label>
                          <Input
                            id="firstName"
                            {...contactForm.register("firstName")}
                            className={contactForm.formState.errors.firstName ? "border-destructive" : ""}
                          />
                          {contactForm.formState.errors.firstName && (
                            <p className="text-sm text-destructive">{contactForm.formState.errors.firstName.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName">{t("contact.form.lastName")} <span className="text-destructive">*</span></Label>
                          <Input
                            id="lastName"
                            {...contactForm.register("lastName")}
                            className={contactForm.formState.errors.lastName ? "border-destructive" : ""}
                          />
                          {contactForm.formState.errors.lastName && (
                            <p className="text-sm text-destructive">{contactForm.formState.errors.lastName.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">{t("contact.form.email")} <span className="text-destructive">*</span></Label>
                        <Input
                          id="email"
                          type="email"
                          {...contactForm.register("email")}
                          className={contactForm.formState.errors.email ? "border-destructive" : ""}
                        />
                        {contactForm.formState.errors.email && (
                          <p className="text-sm text-destructive">{contactForm.formState.errors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">{t("contact.form.company")} <span className="text-destructive">*</span></Label>
                        <Input
                          id="company"
                          {...contactForm.register("company")}
                          className={contactForm.formState.errors.company ? "border-destructive" : ""}
                        />
                        {contactForm.formState.errors.company && (
                          <p className="text-sm text-destructive">{contactForm.formState.errors.company.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="serviceInterest">{t("contact.form.serviceInterest")} <span className="text-destructive">*</span></Label>
                        <Select onValueChange={(value) => contactForm.setValue("serviceInterest", value)}>
                          <SelectTrigger className={contactForm.formState.errors.serviceInterest ? "border-destructive" : ""}>
                            <SelectValue placeholder="Select service interest" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lead_generation">{t("footer.links.leadGeneration")}</SelectItem>
                            <SelectItem value="voice_agents">{t("services.ml.title")}</SelectItem>
                            <SelectItem value="rag">{t("footer.links.rag")}</SelectItem>
                            <SelectItem value="video_image">{t("services.nlp.title")}</SelectItem>
                            <SelectItem value="dm_marketing">{t("services.vision.title")}</SelectItem>
                            <SelectItem value="agents">{t("services.agents.title")}</SelectItem>
                            <SelectItem value="consulting">{t("footer.links.consulting")}</SelectItem>
                            <SelectItem value="training">{t("footer.links.trainingEducation")}</SelectItem>
                            <SelectItem value="spec_development">{t("footer.links.rapidDevelopment")}</SelectItem>
                            <SelectItem value="other">{t("contact.form.other")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">{t("contact.form.message")} (Optional)</Label>
                        <Textarea
                          id="message"
                          rows={6}
                          {...contactForm.register("message")}
                          className={contactForm.formState.errors.message ? "border-destructive" : ""}
                        />
                        {contactForm.formState.errors.message && (
                          <p className="text-sm text-destructive">{contactForm.formState.errors.message.message}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full btn-primary"
                        disabled={submitInquiryMutation.isPending}
                      >
                        {submitInquiryMutation.isPending ? (
                          "Submitting..."
                        ) : (
                          <>
                            {t("contact.form.submit")}
                            <Send className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information & Benefits */}
            <div className="space-y-8">
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("contact.info.title")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t("contact.info.email")}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t("contact.info.location")}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Mon-Fri: 9AM-6PM PST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>Why Choose Us?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                        <benefit.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t("contact.faqs.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t("contact.faqs.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t("contact.faqs.moreQuestions")}
            </p>
            <Button variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              {t("contact.faqs.scheduleCall")}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
