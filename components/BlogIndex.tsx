"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { PageLayout } from "@/components/PageLayout";
import { getAllBlogPosts } from "@/lib/blog-data";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

type Locale = "es" | "ca" | "en";

const translations = {
  es: {
    location: "Gastronomía · Barcelona",
    title: "Blog",
    titleEm: "Gastronómico",
    subtitle: "Recetas, guías, experiencias y todo lo que necesitas saber sobre la gastronomía barcelonesa.",
    allCategories: "Todos",
    readTime: "min",
    readMore: "Leer →",
    home: "Inicio",
  },
  ca: {
    location: "Gastronomia · Barcelona",
    title: "Blog",
    titleEm: "Gastronòmic",
    subtitle: "Receptes, guies, experiències i tot el que necessites saber sobre la gastronomia barcelonesa.",
    allCategories: "Tots",
    readTime: "min",
    readMore: "Llegir →",
    home: "Inici",
  },
  en: {
    location: "Gastronomy · Barcelona",
    title: "Blog",
    titleEm: "Guide",
    subtitle: "Recipes, guides, experiences and everything you need to know about Barcelona's gastronomy.",
    allCategories: "All",
    readTime: "min",
    readMore: "Read →",
    home: "Home",
  },
} as const;

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const dateLocale: Record<Locale, string> = {
  es: "es-ES",
  ca: "ca-ES",
  en: "en-GB",
};

export function BlogIndex({ locale }: { locale: Locale }) {
  const t = translations[locale];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const postsInLocale = useMemo(() => getAllBlogPosts(locale), [locale]);
  const categories = useMemo(
    () => Array.from(new Set(postsInLocale.map((p) => p.category))),
    [postsInLocale]
  );

  const filteredPosts =
    selectedCategory === null
      ? postsInLocale
      : postsInLocale.filter((post) => post.category === selectedCategory);

  const getBlogLink = (slug: string) =>
    locale === "es" ? `/blog/${slug}` : `/${locale}/blog/${slug}`;

  const getBlogUrl = () =>
    locale === "es"
      ? "https://gastroshows.es/blog"
      : `https://gastroshows.es/${locale}/blog`;

  return (
    <PageLayout>
      <JsonLd
        data={breadcrumbSchema([
          { name: t.home, url: locale === "es" ? "https://gastroshows.es" : `https://gastroshows.es/${locale}` },
          { name: "Blog", url: getBlogUrl() },
        ])}
      />

      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(180deg, #050505 0%, var(--gs-bg) 100%)",
          padding: "0 2rem 5rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--gs-gold)",
              marginBottom: "1rem",
            }}
          >
            {t.location}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 300,
              color: "var(--gs-text)",
              marginBottom: "1.5rem",
              lineHeight: 1.1,
            }}
          >
            {t.title}{" "}
            <em style={{ color: "var(--gs-gold)", fontStyle: "italic" }}>{t.titleEm}</em>
          </h1>
          <p style={{ color: "var(--gs-muted)", fontSize: "1rem", lineHeight: 1.7 }}>
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Categorías */}
      <section
        style={{
          background: "var(--gs-bg2)",
          borderTop: "1px solid var(--gs-border)",
          borderBottom: "1px solid var(--gs-border)",
          padding: "1.5rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              padding: "0.4rem 1.2rem",
              background: selectedCategory === null ? "var(--gs-gold)" : "transparent",
              color: selectedCategory === null ? "#0A0A0A" : "var(--gs-muted)",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              border: selectedCategory === null ? "none" : "1px solid var(--gs-border)",
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.2s",
            }}
          >
            {t.allCategories}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "0.4rem 1.2rem",
                border: selectedCategory === cat ? "1px solid var(--gs-gold)" : "1px solid var(--gs-border)",
                color: selectedCategory === cat ? "var(--gs-gold)" : "var(--gs-muted)",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                background: "transparent",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid de artículos */}
      <section style={{ padding: "4rem 2rem 6rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {filteredPosts.map((post) => (
            <Link key={post.slug} href={getBlogLink(post.slug)} style={{ textDecoration: "none" }}>
              <article
                style={{
                  border: "1px solid var(--gs-border)",
                  padding: "2rem",
                  background: "rgba(218,165,32,0.01)",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--gs-gold)",
                      border: "1px solid rgba(218,165,32,0.3)",
                      padding: "0.25rem 0.75rem",
                    }}
                  >
                    {post.category}
                  </span>
                  <span style={{ fontSize: "0.7rem", color: "var(--gs-muted)" }}>
                    {post.readTime} {t.readTime}
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.4rem",
                    fontWeight: 400,
                    color: "var(--gs-text)",
                    marginBottom: "0.75rem",
                    lineHeight: 1.3,
                  }}
                >
                  {post.title}
                </h2>

                <p
                  style={{
                    color: "var(--gs-muted)",
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                    marginBottom: "1.5rem",
                  }}
                >
                  {post.excerpt}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "0.65rem", color: "var(--gs-muted)", opacity: 0.6 }}>
                    {new Date(post.publishedAt).toLocaleDateString(dateLocale[locale], dateFormatOptions)}
                  </span>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--gs-gold)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t.readMore}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
