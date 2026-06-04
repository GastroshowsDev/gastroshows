import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { blogPosts, getBlogPost } from "@/lib/blog-data";
import { JsonLd, breadcrumbSchema, articleSchema } from "@/components/seo/JsonLd";


type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.seoTitle || post.title,
    description: post.seoDesc || post.excerpt,
    keywords: post.keywords.join(", "),
    alternates: {
      canonical: `https://gastroshows.es/blog/${slug}`,
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDesc || post.excerpt,
      url: `https://gastroshows.es/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      locale: "es_ES",
    },
  };
}

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    // Image syntax: ![alt](url)
    if (line.startsWith("![") && line.includes("](")) {
      const match = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (match) {
        const [, alt, src] = match;
        elements.push(
          <figure
            key={i}
            style={{
              margin: "2.5rem 0",
              padding: 0,
              background: "transparent",
              border: "none",
              borderRadius: 0,
            }}
          >
            <img
              src={src}
              alt={alt}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "2px",
                marginBottom: 0,
              }}
            />
          </figure>
        );
        i++;
        continue;
      }
    }

    // Callout/Highlight: > texto
    if (line.startsWith("> ")) {
      const calloutText = line.slice(2);
      elements.push(
        <div
          key={i}
          style={{
            margin: "2rem 0",
            padding: "1.5rem",
            borderLeft: "4px solid var(--gs-gold)",
            background: "rgba(218,165,32,0.08)",
            borderRadius: "2px",
          }}
        >
          <p
            style={{
              color: "var(--gs-text)",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              fontWeight: 500,
              margin: 0,
            }}
          >
            {calloutText}
          </p>
        </div>
      );
      i++;
      continue;
    }

    // Card/Box: | titulo
    if (line.startsWith("| ") && !line.includes("|", 2)) {
      const cardTitle = line.slice(2);
      const cardLines: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() && !lines[i].trim().startsWith("|")) {
        cardLines.push(lines[i].trim());
        i++;
      }
      elements.push(
        <div
          key={`card-${i}`}
          style={{
            margin: "2rem 0",
            padding: "1.5rem",
            border: "1px solid var(--gs-border)",
            background: "rgba(218,165,32,0.02)",
            borderRadius: "4px",
          }}
        >
          <h4
            style={{
              color: "var(--gs-gold)",
              fontSize: "0.95rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              marginBottom: "1rem",
              textTransform: "uppercase",
            }}
          >
            {cardTitle}
          </h4>
          {cardLines.map((cardLine, j) => (
            <p
              key={j}
              style={{
                color: "var(--gs-muted)",
                fontSize: "0.9rem",
                lineHeight: 1.6,
                marginBottom: j < cardLines.length - 1 ? "0.5rem" : 0,
              }}
            >
              {cardLine}
            </p>
          ))}
        </div>
      );
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "1.8rem",
            fontWeight: 300,
            color: "var(--gs-text)",
            marginTop: "3rem",
            marginBottom: "1rem",
            borderBottom: "1px solid var(--gs-border)",
            paddingBottom: "0.75rem",
          }}
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={i}
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "1.3rem",
            fontWeight: 400,
            color: "var(--gs-text)",
            marginTop: "2rem",
            marginBottom: "0.75rem",
          }}
        >
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p
          key={i}
          style={{
            color: "var(--gs-text)",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            fontWeight: 600,
            marginBottom: "0.5rem",
          }}
        >
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul
          key={`ul-${i}`}
          style={{
            margin: "1rem 0",
            paddingLeft: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {listItems.map((item, j) => (
            <li
              key={j}
              style={{
                color: "var(--gs-muted)",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                listStyleType: "none",
                position: "relative",
                paddingLeft: "1rem",
              }}
            >
              <span
                style={{
                  color: "var(--gs-gold)",
                  position: "absolute",
                  left: 0,
                }}
              >
                ·
              </span>
              {item}
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (/^\d+\./.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\./.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s*/, ""));
        i++;
      }
      elements.push(
        <ol
          key={`ol-${i}`}
          style={{
            margin: "1rem 0",
            paddingLeft: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {listItems.map((item, j) => (
            <li
              key={j}
              style={{ color: "var(--gs-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}
            >
              {item}
            </li>
          ))}
        </ol>
      );
      continue;
    } else {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      elements.push(
        <p
          key={i}
          style={{
            color: "var(--gs-muted)",
            fontSize: "0.95rem",
            lineHeight: 1.8,
            marginBottom: "0.75rem",
          }}
        >
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={j} style={{ color: "var(--gs-text)", fontWeight: 600 }}>
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    }

    i++;
  }

  return elements;
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return (
    <PageLayout>
      <JsonLd
        data={articleSchema({
          title: post.seoTitle || post.title,
          description: post.seoDesc || post.excerpt,
          publishedAt: post.publishedAt,
          modifiedAt: post.publishedAt,
          slug: post.slug,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: "https://gastroshows.es" },
          { name: "Blog", url: "https://gastroshows.es/blog" },
          { name: post.title, url: `https://gastroshows.es/blog/${post.slug}` },
        ])}
      />

      {/* Hero del artículo */}
      <section
        style={{
          background: "linear-gradient(180deg, #050505 0%, var(--gs-bg) 100%)",
          padding: "0 2rem 4rem",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "2rem" }}>
            <Link
              href="/blog"
              style={{
                fontSize: "0.65rem",
                color: "var(--gs-muted)",
                textDecoration: "none",
                letterSpacing: "0.1em",
              }}
            >
              ← Blog
            </Link>
            <span style={{ color: "var(--gs-border)" }}>/</span>
            <span
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gs-gold)",
                border: "1px solid rgba(218,165,32,0.3)",
                padding: "0.2rem 0.75rem",
              }}
            >
              {post.category}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 300,
              color: "var(--gs-text)",
              lineHeight: 1.15,
              marginBottom: "1.5rem",
            }}
          >
            {post.title}
          </h1>

          <p
            style={{
              color: "var(--gs-muted)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              marginBottom: "2rem",
            }}
          >
            {post.excerpt}
          </p>

          <div style={{ display: "flex", gap: "2rem", alignItems: "center", opacity: 0.6 }}>
            <span style={{ fontSize: "0.75rem", color: "var(--gs-muted)" }}>
              {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--gs-muted)" }}>
              {post.readTime} min de lectura
            </span>
          </div>
        </div>
      </section>

      {/* Línea dorada separadora */}
      <div
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, var(--gs-gold), transparent)",
          maxWidth: "760px",
          margin: "0 auto",
          opacity: 0.2,
        }}
      />

      {/* Contenido del artículo */}
      <article
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "3rem 2rem 5rem",
        }}
      >
        {renderContent(post.content)}

        {/* CTA dentro del artículo */}
        <div
          style={{
            marginTop: "3rem",
            padding: "2.5rem",
            border: "1px solid var(--gs-border)",
            background: "rgba(218,165,32,0.02)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.5rem",
              fontWeight: 300,
              color: "var(--gs-text)",
              marginBottom: "0.75rem",
            }}
          >
            ¿Listo para vivir la experiencia?
          </p>
          <p style={{ color: "var(--gs-muted)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
            Reserva tu cena clandestina en Barcelona. Plazas limitadas.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/"
              style={{
                background: "var(--gs-gold)",
                color: "#0A0A0A",
                padding: "0.8rem 2rem",
                fontFamily: "var(--font-montserrat)",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Reservar
            </Link>
            <Link
              href="/regalo"
              style={{
                border: "1px solid var(--gs-gold)",
                color: "var(--gs-gold)",
                padding: "0.8rem 2rem",
                fontFamily: "var(--font-montserrat)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Regalar
            </Link>
          </div>
        </div>
      </article>

      {/* Artículos relacionados */}
      {related.length > 0 && (
        <section
          style={{
            background: "var(--gs-bg2)",
            borderTop: "1px solid var(--gs-border)",
            padding: "4rem 2rem",
          }}
        >
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "var(--gs-gold)",
                marginBottom: "0.75rem",
              }}
            >
              También te puede interesar
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.8rem",
                fontWeight: 300,
                color: "var(--gs-text)",
                marginBottom: "2rem",
              }}
            >
              Más artículos
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      padding: "1.5rem",
                      border: "1px solid var(--gs-border)",
                      background: "rgba(218,165,32,0.01)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.6rem",
                        color: "var(--gs-gold)",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {p.category}
                    </p>
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "1.1rem",
                        color: "var(--gs-text)",
                        marginBottom: "0.5rem",
                        fontWeight: 400,
                        lineHeight: 1.3,
                      }}
                    >
                      {p.title}
                    </h3>
                    <p style={{ color: "var(--gs-gold)", fontSize: "0.7rem", letterSpacing: "0.1em" }}>
                      Leer →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}


    </PageLayout>
  );
}
