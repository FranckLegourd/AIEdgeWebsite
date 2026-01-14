import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useTranslation } from "@/hooks/use-translation";
import { Shield, Lock, Eye, Database, UserCheck, Mail } from "lucide-react";

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();

  const sections = [
    {
      icon: Database,
      title: t("privacy.sections.dataCollection.title"),
      content: t("privacy.sections.dataCollection.content"),
    },
    {
      icon: Eye,
      title: t("privacy.sections.dataUsage.title"),
      content: t("privacy.sections.dataUsage.content"),
    },
    {
      icon: Lock,
      title: t("privacy.sections.dataSecurity.title"),
      content: t("privacy.sections.dataSecurity.content"),
    },
    {
      icon: UserCheck,
      title: t("privacy.sections.yourRights.title"),
      content: t("privacy.sections.yourRights.content"),
    },
    {
      icon: Shield,
      title: t("privacy.sections.cookies.title"),
      content: t("privacy.sections.cookies.content"),
    },
    {
      icon: Mail,
      title: t("privacy.sections.contact.title"),
      content: t("privacy.sections.contact.content"),
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />

      <section className="pt-32 pb-12 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t("privacy.title")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t("privacy.lastUpdated")}: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {t("privacy.intro")}
            </p>
          </div>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-0">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
