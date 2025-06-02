import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const { t, language, setLanguage, languages } = useTranslation();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AI Edge International</h3>
            <p className="text-gray-400 mb-4">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t("footer.services")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/services" className="hover:text-white transition-colors duration-200">{t("services.automation.title")}</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors duration-200">{t("services.ml.title")}</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors duration-200">{t("services.analytics.title")}</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors duration-200">AI Consulting</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t("footer.company")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors duration-200">{t("nav.about")}</Link></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Blog</a></li>
              <li><Link href="/contact" className="hover:text-white transition-colors duration-200">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t("footer.legal")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">GDPR Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span>{t("footer.availableIn")}</span>
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(lang.code)}
                className={`p-0 h-auto text-sm ${
                  language === lang.code 
                    ? "text-white" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {lang.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
