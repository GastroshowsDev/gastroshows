import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Fun Things to Do with Your Partner at Home | 5 Great Plans",
  description: "5 fun ideas for couples at home: Netflix, painting, tasting menu, yoga, photo albums. Quality time and bonding activities together.",
  keywords: "things to do with partner at home, couple activities, home date ideas, things for couples at home",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/things-to-do-with-your-partner-at-home/" },
  openGraph: {
    type: "article",
    locale: "en_GB",
    url: "https://gastroshows.es/things-to-do-with-your-partner-at-home/",
    siteName: "GastroShows",
    title: "Fun Things to Do with Your Partner at Home - 5 Great Plans",
    description: "Creative couple activities and bonding ideas to enjoy at home.",
  },
};

export default function ThingsToDoPartnerAtHomePage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Things to Do with Partner at Home", url: "https://gastroshows.es/things-to-do-with-your-partner-at-home/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={articleSchema({
        title: "Fun Things to Do with Your Partner at Home - 5 Great Plans",
        description: "Creative activities and bonding ideas for couples to enjoy quality time at home.",
        publishedAt: "2021-09-10T10:00:00+01:00",
        modifiedAt: "2026-06-05T10:00:00+01:00",
        slug: "things-to-do-with-your-partner-at-home",
        image: "https://gastroshows.es/images/couple-activities/hero-home-couple.webp",
      })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Things to Do with Partner at Home</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">
            Fun Things to Do with Your Partner at Home — 5 Great Plans!
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            <strong>Quality time together</strong> doesn't require going out. Discover 5 fun, creative, and meaningful activities to strengthen your relationship at home.
          </p>
        </header>

        <section id="netflix" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">1. Netflix Marathon for Couples</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Curl up on the sofa and watch quality series together. It's a communicative activity where you discuss plot twists, create theories, and connect over shared stories.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>Recommended series for couples:</strong>
          </p>
          <ul className="space-y-2 text-foreground/90 ml-6">
            <li>• <strong>Unorthodox</strong> — Intense and captivating drama</li>
            <li>• <strong>Sex Education</strong> — Humor, romance, and important topics</li>
            <li>• <strong>Atypical</strong> — Touching and entertaining story</li>
            <li>• <strong>How to Defend a Murderer</strong> — Thriller that hooks you</li>
            <li>• <strong>Outlander</strong> — Epic, romance, and history</li>
          </ul>
        </section>

        <section id="painting" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">2. Painting a Picture Together</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>Change your home décor in an economical and fun way.</strong> Collaborating on a painting is a creative activity that leaves a permanent memory in your space.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Paint geometric modern designs, recreate classics with your personal touch, or create abstract art. The result is a unique piece that reinforces your bond every time you see it.
          </p>
        </section>

        <section id="tasting-menu" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">3. Tasting Menu for Two at Home</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>#gastroshowsencasa</strong> — Surprise boxes with gourmet ingredients and a secret tasting menu to prepare together at home.
          </p>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded space-y-3 mb-4">
            <p><strong>Contents:</strong> 7-course menu (3 appetizers, 2 mains, 2 desserts)</p>
            <p><strong>Includes:</strong> Wine pairing (2 bottles) if desired</p>
            <p><strong>Customization:</strong> Adapted for allergies, intolerances, and dietary preferences</p>
            <p><strong>Reserve:</strong> Thursday, Friday, or Saturday</p>
          </div>
          <p className="text-foreground/90 leading-relaxed">
            Contact for personalization: <strong>esther@gastroshows.es</strong>
          </p>
        </section>

        <section id="yoga" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">4. Couples Yoga</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Yoga is a perfect activity for couples seeking to <strong>reduce stress, combat sedentary behavior, improve flexibility, and relieve back pain.</strong>
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Practice anytime: morning to start together, or evening to relax. Many social media resources provide couple-specific poses to try.
          </p>
        </section>

        <section id="photos" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">5. Photo Album Creation</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>Reconnect with your shared memories</strong> by reviewing, organizing, printing, and framing photos together. It's a beautiful way to create home décor while reliving special moments.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Plus, it's an opportunity for digital decluttering and creating personalized gifts for friends and family.
          </p>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">Experience Gastronomy as a Couple</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Surprise tasting menu for two, prepared at home or in a secret location. Perfect for quality time.</p>
          <Link href="/cena-clandestina" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Discover Our Experiences</Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">More Plans for Couples</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/ideas-para-san-valentin" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Ideas for Valentine's Day</p>
              <p className="text-sm text-muted-foreground">5 ideas to surprise your partner.</p>
            </Link>
            <Link href="/cena-clandestina" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Clandestine Dinner for Couples</p>
              <p className="text-sm text-muted-foreground">Secret experience in Barcelona.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
