import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useTranslation } from "@/hooks/use-translation";
import { FileText, Scale, AlertTriangle, CreditCard, Ban, RefreshCw } from "lucide-react";

export default function TermsOfServicePage() {
  const { t } = useTranslation();

  const sections = [
    {
      icon: FileText,
      title: t("terms.sections.acceptance.title"),
      content: t("terms.sections.acceptance.content"),
    },
    {
      icon: Scale,
      title: t("terms.sections.services.title"),
      content: t("terms.sections.services.content"),
    },
    {
      icon: CreditCard,
      title: t("terms.sections.payment.title"),
      content: t("terms.sections.payment.content"),
    },
    {
      icon: AlertTriangle,
      title: t("terms.sections.liability.title"),
      content: t("terms.sections.liability.content"),
    },
    {
      icon: Ban,
      title: t("terms.sections.termination.title"),
      content: t("terms.sections.termination.content"),
    },
    {
      icon: RefreshCw,
      title: t("terms.sections.changes.title"),
      content: t("terms.sections.changes.content"),
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />

      <section className="pt-32 pb-12 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FileText className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t("terms.title")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t("terms.lastUpdated")}: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {t("terms.intro")}
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
