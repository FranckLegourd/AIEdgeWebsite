import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { Link } from "wouter";
import { useEffect } from "react";
import {
  ArrowRight,
  CheckCircle,
  Mail,
  MapPin,
  Calendar,
  Lightbulb,
  Users,
  Heart,
  Handshake,
  Target,
  Zap,
  Shield,
  MessageSquare
} from "lucide-react";

declare global {
  interface Window {
    Lunacal: any;
    Cal: any;
  }
}

export default function AboutPage() {
  const { t } = useTranslation();

  useEffect(() => {
    (function (L: any, U: string, N: string) {
      let p = (a: any, ar: any) => a.q.push(ar), d = L.document;
      L.Lunacal = L.Lunacal || function () {
        let lun = L.Lunacal, ar = arguments;
        if (!lun.loaded) {
          lun.ns = {};
          lun.q = lun.q || [];
          d.head.appendChild(d.createElement("script")).src = U;
          lun.loaded = true;
        }
        if (ar[0] === N) {
          const api: any = function () { p(api, arguments); };
          const ns = ar[1];
          api.q = api.q || [];
          if (typeof ns === "string") {
            lun.ns[ns] = lun.ns[ns] || api;
            p(lun.ns[ns], ar);
            p(lun, ["initNamespace", ns]);
          } else p(lun, ar);
          return;
        }
        p(lun, ar);
      };
      if (!L.Cal) L.Cal = L.Lunacal;
    })(window, "https://app.lunacal.ai/embed/embed.js", "init");

    window.Lunacal("init", "discovery", { origin: "https://app.lunacal.ai" });

    window.Lunacal.config = window.Lunacal.config || {};
    window.Lunacal.config.forwardQueryParams = true;

    window.Lunacal.ns.discovery("ui", {
      "theme": "light",
      "styles": {
        "branding": {}
      },
      "hideEventTypeDetails": false,
      "layout": "",
      "cssVarsPerTheme": {
        "light": {
          "theme-border": "#28282B",
          "theme-background-primary": "#8f51ea",
          "theme-background-secondary": "#0044ff",
          "theme-background-card": "#010101",
          "theme-background-base": "#010101",
          "theme-text-primary": "#ffffff",
          "theme-text-secondary": "#ffffff",
          "theme-text-card": "#ffffff",
          "theme-text-base": "#ffffff",
          "theme-rounded-base": "20px",
          "theme-rounded-calendar": " 20px",
          "theme-rounded-timeslot": "8px",
          "theme-rounded-day": "6px",
          "theme-rounded-button": "4px",
          "theme-shadow-calendar": "0px 0px 0px 0px #D04F99",
          "theme-shadow-button": "0px 0px 0px 0px #D1519A88",
          "theme-shadow-timeslot": "0px 0px 0px 0px #000000",
          "theme-font-family": "Outfit"
        },
        "dark": {
          "theme-border": "#28282B",
          "theme-background-primary": "#8f51ea",
          "theme-background-secondary": "#0044ff",
          "theme-background-card": "#010101",
          "theme-background-base": "#010101",
          "theme-text-primary": "#ffffff",
          "theme-text-secondary": "#ffffff",
          "theme-text-card": "#ffffff",
          "theme-text-base": "#ffffff",
          "theme-rounded-base": "20px",
          "theme-rounded-calendar": " 20px",
          "theme-rounded-timeslot": "8px",
          "theme-rounded-day": "6px",
          "theme-rounded-button": "4px",
          "theme-shadow-calendar": "0px 0px 0px 0px #D04F99",
          "theme-shadow-button": "0px 0px 0px 0px #D1519A88",
          "theme-shadow-timeslot": "0px 0px 0px 0px #000000",
          "theme-font-family": "Outfit"
        }
      },
      "displayedContent": {
        "image": true,
        "name": true,
        "designation": true,
        "description": true,
        "eventName": true,
        "highlightBar": false
      },
      "background": null,
      "stylePreset": "midnight"
    });
  }, []);

  const approaches = [
    {
      title: t("about.approach.understand.title"),
      description: t("about.approach.understand.description"),
      icon: MessageSquare
    },
    {
      title: t("about.approach.quickWins.title"),
      description: t("about.approach.quickWins.description"),
      icon: Zap
    },
    {
      title: t("about.approach.noLockIn.title"),
      description: t("about.approach.noLockIn.description"),
      icon: Shield
    },
    {
      title: t("about.approach.support.title"),
      description: t("about.approach.support.description"),
      icon: Users
    }
  ];

  const values = [
    {
      title: t("about.values.practical.title"),
      description: t("about.values.practical.description"),
      icon: Target
    },
    {
      title: t("about.values.yourPace.title"),
      description: t("about.values.yourPace.description"),
      icon: Heart
    },
    {
      title: t("about.values.honest.title"),
      description: t("about.values.honest.description"),
      icon: Lightbulb
    },
    {
      title: t("about.values.partnership.title"),
      description: t("about.values.partnership.description"),
      icon: Handshake
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t("about.hero.title")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              {t("about.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Why We Started Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                {t("about.whyWeStarted.title")}
              </h2>

              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
                <p>{t("about.whyWeStarted.paragraph1")}</p>
                <p>{t("about.whyWeStarted.paragraph2")}</p>
                <p>{t("about.whyWeStarted.paragraph3")}</p>
              </div>
            </div>

            <div className="relative">
              <img
                src="/office_future.png"
                alt="AI-powered business workspace"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t("about.approach.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("about.approach.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {approaches.map((approach, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <approach.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {approach.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {approach.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t("about.values.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("about.values.subtitle")}
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
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t("about.contact.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("about.contact.subtitle")}
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="text-center">
              <CardContent className="p-8">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t("about.contact.email.title")}
                </h3>
                <Link href="/contact">
                  <Button size="lg" className="btn-primary mt-4">
                    {t("about.contact.cta")}
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t("contact.freeConsultation")}
                </h3>
                <Button
                  className="mt-4"
                  data-cal-link="aiedge/discovery"
                  data-cal-namespace="discovery"
                  data-cal-config='{"layout":""}'
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {t("about.contact.schedule.title")}
                </Button>
              </CardContent>
            </Card>
          </div>



        </div>
      </section>

      <Footer />
    </div>
  );
}
