import { useParams, useLocation, Link } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BookOpen, Calendar, Clock, Tag, Users } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [location] = useLocation();
  const { t } = useTranslation();
  
  // Sample blog posts data with translations
  const blogPosts = [
    {
      id: 1,
      title: t("blog.posts.1.title"),
      excerpt: t("blog.posts.1.excerpt"),
      category: "highlights",
      readTime: `5 ${t("blog.readTime")}`,
      date: "Dec 15, 2024",
      author: "Dr. Sarah Chen",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&crop=center",
      tags: ["AI Agents", "Automation", "Business"],
      content: t("blog.content.1")
    },
    {
      id: 2,
      title: t("blog.posts.2.title"),
      excerpt: t("blog.posts.2.excerpt"),
      category: "updates",
      readTime: `7 ${t("blog.readTime")}`,
      date: "Dec 12, 2024",
      author: "Marcus Rodriguez",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop&crop=center",
      tags: ["Machine Learning", "DevOps", "Production"],
      content: t("blog.content.2")
    },
    {
      id: 3,
      title: t("blog.posts.3.title"),
      excerpt: t("blog.posts.3.excerpt"),
      category: "highlights",
      readTime: `6 ${t("blog.readTime")}`,
      date: "Dec 10, 2024",
      author: "Dr. Amanda Foster",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop&crop=center",
      tags: ["Ethics", "AI Governance", "Responsibility"],
      content: t("blog.content.3")
    }
  ];

  const post = blogPosts.find(p => p.id === parseInt(id || "1"));
  
  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-4">{t("blog.postNotFound")}</h1>
              <Link href="/blog">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("blog.backToBlog")}
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get related posts (exclude current post)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header Section */}
        <div className="border-b border-border/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <Link href="/blog">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("blog.backToBlog")}
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              <Badge 
                variant="secondary"
                className="capitalize"
              >
                {t(`blog.categories.${post.category}`)}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {post.author}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
                />
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-foreground
                           [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-foreground
                           [&>h4]:text-lg [&>h4]:font-medium [&>h4]:mt-4 [&>h4]:mb-2 [&>h4]:text-foreground
                           [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>p]:mb-4
                           [&>ul]:text-muted-foreground [&>ul]:mb-4 [&>ul>li]:mb-2
                           [&>ol]:text-muted-foreground [&>ol]:mb-4 [&>ol>li]:mb-2
                           [&>strong]:text-foreground [&>strong]:font-semibold"
                />
              </div>
              
              <Separator className="my-8" />
              
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="border-primary/20 text-primary/80"
                  >
                    {t(`blog.categories.${tag.toLowerCase()}`) || tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Author Card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{t("blog.aboutAuthor")}</h3>
                    <p className="text-sm text-muted-foreground">
                      {post.author} {t("blog.authorBio")}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Table of Contents */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      {t("blog.tableOfContents")}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="text-muted-foreground hover:text-primary cursor-pointer">
                        {t("blog.tableOfContentsItems.introduction")}
                      </div>
                      <div className="text-muted-foreground hover:text-primary cursor-pointer">
                        {t("blog.tableOfContentsItems.keyConcepts")}
                      </div>
                      <div className="text-muted-foreground hover:text-primary cursor-pointer">
                        {t("blog.tableOfContentsItems.implementation")}
                      </div>
                      <div className="text-muted-foreground hover:text-primary cursor-pointer">
                        {t("blog.tableOfContentsItems.bestPractices")}
                      </div>
                      <div className="text-muted-foreground hover:text-primary cursor-pointer">
                        {t("blog.tableOfContentsItems.conclusion")}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">{t("blog.relatedPosts")}</h3>
                      <div className="space-y-4">
                        {relatedPosts.map((relatedPost) => (
                          <div key={relatedPost.id} className="group">
                            <Link href={`/blog/${relatedPost.id}`}>
                              <div className="cursor-pointer">
                                <img
                                  src={relatedPost.image}
                                  alt={relatedPost.title}
                                  className="w-full h-24 object-cover rounded mb-2 group-hover:opacity-80 transition-opacity"
                                />
                                <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                  {relatedPost.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {relatedPost.readTime}
                                </p>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Newsletter Signup */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{t("blog.newsletter.title")}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t("blog.newsletter.subtitle")}
                    </p>
                    <div className="space-y-2">
                      <input
                        type="email"
                        placeholder={t("blog.newsletter.placeholder")}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
                      />
                      <Button size="sm" className="w-full">
                        {t("blog.newsletter.button")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t("blog.cta.title")}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {t("blog.cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg">
                    {t("blog.cta.contact")}
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button variant="outline" size="lg">
                    {t("blog.cta.morePosts")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}