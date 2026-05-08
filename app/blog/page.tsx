import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { blogPosts } from "@/lib/blog-data";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Blog Gastronómico · GastroShows Barcelona",
  description:
    "Blog de gastronomía de GastroShows. Recetas catalanas, guías de restaurantes Barcelona, maridajes, experiencias gastronómicas y todo sobre la cena clandestina más famosa de la ciudad.",
  keywords:
    "blog gastronomia barcelona, recetas catalanas, guia restaurantes barcelona, menu degustacion, cena clandestina barcelona",
  alternates: {
    canonical: "https://gastroshows.es/blog",
  },
};

const categories = Array.from(new Set(blogPosts.map((p) => p.category)));

export default function Blog() {
  return (
    <PageLayout>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: "https://gastroshows.es" },
          { name: "Blog", url: "https://gastroshows.es/blog" },
        ])}
      />

      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(180deg, #050505 0%, var(--gs-bg) 100%)",
          padding: "8rem 2rem 5rem",
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
            Gastronomía · Barcelona
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
            Blog{" "}
            <em style={{ color: "var(--gs-gold)", fontStyle: "italic" }}>Gastronómico</em>
          </h1>
          <p style={{ color: "var(--gs-muted)", fontSize: "1rem", lineHeight: 1.7 }}>
            Recetas, guías, experiencias y todo lo que necesitas saber sobre la gastronomía barcelonesa.
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
          <Link
            href="/blog"
            style={{
              padding: "0.4rem 1.2rem",
              background: "var(--gs-gold)",
              color: "#0A0A0A",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Todos
          </Link>
          {categories.map((cat) => (
            <span
              key={cat}
              style={{
                padding: "0.4rem 1.2rem",
                border: "1px solid var(--gs-border)",
                color: "var(--gs-muted)",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              {cat}
            </span>
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
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none" }}
            >
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
                    {post.readTime} min
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
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: "var(--gs-muted)",
                      opacity: 0.6,
                    }}
                  >
                    {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--gs-gold)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Leer →
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
