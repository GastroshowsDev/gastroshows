import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Los Mejores Restaurantes con Menú Degustación de Barcelona 2025",
  description:
    "Los mejores restaurantes con menú degustación de Barcelona: GastroShows, Xavier Pellicer, Cruix, Slow & Low, La Tartarería y más. Precios, direcciones y reservas actualizadas.",
  keywords:
    "mejores restaurantes menu degustacion barcelona, menu degustacion barcelona, restaurantes barcelona menu degustacion, donde comer barcelona menu degustacion, tasting menu barcelona",
  alternates: {
    canonical: "https://gastroshows.es/blog/mejores-restaurantes-menu-degustacion-barcelona",
  },
  openGraph: {
    title: "Los Mejores Restaurantes con Menú Degustación de Barcelona 2025",
    description: "Guía completa de los mejores menús degustación de Barcelona. Precios, qué pedir y cómo reservar.",
    type: "article",
    locale: "es_ES",
    url: "https://gastroshows.es/blog/mejores-restaurantes-menu-degustacion-barcelona",
    images: [{ url: "https://gastroshows.es/images/experiencia/ambiente.jpg" }],
  },
};

const restaurantes = [
  {
    nombre: "GastroShows · La Cena Clandestina",
    slug: "gastroshows",
    subtitulo: "Experiencia gastronómica secreta en Barcelona",
    texto: [
      "GastroShows es creador y desarrollador de nuevas experiencias gastronómicas en Barcelona. Su propuesta estrella, la cena clandestina, es una experiencia que tiene lugar en un espacio secreto descubierto a través de pistas y enigmas enviados por mensaje la semana anterior.",
      "Se sirve un menú degustación de 7 actos con maridaje de vinos, cava y gintonics premium, con sorpresas durante toda la cena. No sabes dónde vas hasta el último momento: ese es exactamente el punto.",
      "Es la experiencia más diferente de todas las de esta lista, y también la única que empieza antes de que te sientes a la mesa.",
    ],
    precio: "Desde 120€/persona · Maridaje incluido",
    direccion: "Ubicación secreta · Barcelona",
    web: "https://gastroshows.es",
    webLabel: "Reservar en GastroShows",
    esInterno: true,
    imagen: "https://images.unsplash.com/photo-1520529529699-2e01e4cded13?w=1200&q=90",
    imagenAlt: "Sala secreta de GastroShows en Barcelona con candelabros dorados y velas",
    badge: "Nuestra recomendación",
    keywords: [
      { text: "cena clandestina", href: "/cena-clandestina" },
      { text: "menú degustación", href: "/menu-degustacion" },
    ],
  },
  {
    nombre: "Restaurante Xavier Pellicer",
    slug: "xavier-pellicer",
    subtitulo: "Alta cocina vegetal · Estrella Michelin Verde",
    texto: [
      "El restaurante de Xavier Pellicer ofrece un menú degustación de primerísima calidad. Xavier Pellicer, con un background estrellado, es especialista en verduras ecológicas que acompañan todos sus platos.",
      "Destaca el pescado de lonja salvaje y el coulant de té matcha. Una propuesta elegante y comprometida con el producto de temporada, situada en el Eixample de Barcelona.",
      "Reconocido como el Mejor Restaurante de Verduras del Mundo, Xavier Pellicer demuestra que la cocina vegetal puede ser alta gastronomía sin renunciar a nada.",
    ],
    precio: "Desde 95€/persona",
    direccion: "C/ Provença 310, Eixample, Barcelona",
    web: "https://www.xavierpellicer.com",
    webLabel: "xavierpellicer.com ↗",
    esInterno: false,
    imagen: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=90",
    imagenAlt: "Cocina vegetal de alta calidad restaurante Xavier Pellicer Barcelona",
    badge: null,
    keywords: [
      { text: "restaurantes con estrella Michelin en Barcelona", href: "/blog/restaurantes-estrella-michelin-barcelona" },
    ],
  },
  {
    nombre: "Taberna Noroeste",
    slug: "taberna-noroeste",
    subtitulo: "Producto gallego y castellano de primera",
    texto: [
      "En la Taberna Noroeste destacan productos exquisitos y una ejecución inmejorable. Los chefs, de Galicia y de Castilla y León, saben muy bien lo que hacen.",
      "No tienen menú degustación cerrado, pero la carta es pequeña y el servicio recomienda compartir una media de 7-8 platos. El precio ronda los 70-80€ por persona dependiendo de las bebidas.",
      "Uno de esos restaurantes con lista de espera que merece la pena. Reserva con tiempo.",
    ],
    precio: "~70-80€/persona (sin menú cerrado)",
    direccion: "Barcelona, Eixample",
    web: "https://www.thefork.es/restaurante/taberna-noroeste-barcelona",
    webLabel: "Reservar en TheFork ↗",
    esInterno: false,
    imagen: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=90",
    imagenAlt: "Producto gallego de primera calidad Taberna Noroeste Barcelona",
    badge: null,
    keywords: [],
  },
  {
    nombre: "Slow & Low",
    slug: "slow-and-low",
    subtitulo: "Fusión internacional · 1 Estrella Michelin",
    texto: [
      "Slow & Low es una unión de muchas culturas y gastronomías diferentes, desde recetas callejeras a técnicas de alta cocina. Utilizan productos de todo el globo de la mejor calidad, con técnicas bien ejecutadas y un deje picante característico.",
      "Su menú degustación de 80€ es extenso y variado. La coctelería juega un papel importante, con cócteles de autor que complementan perfectamente la propuesta gastronómica.",
      "Reconocida con 1 Estrella Michelin, Slow & Low es uno de los restaurantes más interesantes de la escena barcelonesa actual.",
    ],
    precio: "Desde 80€/persona",
    direccion: "C/ del Conde Borrell 119, Barcelona",
    web: "https://slowandlowbcn.com",
    webLabel: "slowandlowbcn.com ↗",
    esInterno: false,
    imagen: "https://images.unsplash.com/photo-1504674900769-35ca624d0f14?w=1200&q=90",
    imagenAlt: "Cocina de fusión internacional Slow and Low Barcelona estrella Michelin",
    badge: null,
    keywords: [
      { text: "maridaje de vinos", href: "/blog/maridaje-vinos-menu-degustacion" },
    ],
  },
  {
    nombre: "Cruix",
    slug: "cruix",
    subtitulo: "Tapas de autor y arroces · Eixample",
    texto: [
      "Cruix es una apuesta segura con tapas de autor, arroces exquisitos y socarrat de buena calidad, con mucha originalidad en las recetas. Destaca su servicio dinámico, atento y amable.",
      "Tienen un menú degustación de 50€ completo y variado, con bebidas aparte. Una experiencia gastronómica desenfadada pero de gran calidad, perfecta para descubrir la nueva cocina barcelonesa.",
      "El socarrat de Cruix es uno de los mejores de la ciudad. Si vas, no te lo pierdas.",
    ],
    precio: "Desde 50€/persona (menú sin bebidas)",
    direccion: "C/ Entença 57, Eixample, Barcelona",
    web: "https://www.cruixrestaurant.com/en/booking/",
    webLabel: "Reservar en Cruix ↗",
    esInterno: false,
    imagen: "https://images.unsplash.com/photo-1555939594-58d7cb561612?w=1200&q=90",
    imagenAlt: "Tapas de autor y arroz con socarrat Cruix Barcelona",
    badge: null,
    keywords: [
      { text: "experiencia gastronómica en Barcelona", href: "/blog/experiencia-gastronomica-barcelona" },
    ],
  },
  {
    nombre: "Casa Fierro",
    slug: "casa-fierro",
    subtitulo: "Tapas de autor y cocina de Víctor Ródenas · C/ Londres",
    texto: [
      "Casa Fierro es el nuevo refugio gastronómico de Víctor Ródenas en el corazón del Eixample. Abierto en verano 2025, la propuesta es diferente: no hay menú degustación cerrado, tú eres el protagonista y juegas la experiencia cuadrada como te apetece.",
      "Los platos destacan por su sencillez coquinaria: huevos fritos con gamba, bacon y pimiento d'Espelette, fideos con bacalao, alitas de pollo desmenuzado y butifarra, steak tartar con carne ecológica, atún rojo crudo con ponzu, oreja de cerdo asada, ostras frescas.",
      "Casa Fierro es un espacio de contrastes con la estética de una tasca catalana de toda la vida. Un precio muy accesible (~45€ sin bebidas) para una cocina de verdadera calidad. Perfecto para descubrir la nueva escena de Barcelona sin pretensiones.",
    ],
    precio: "~45€/persona (sin bebidas)",
    direccion: "C/ Londres 89, Eixample, Barcelona",
    web: "https://www.casafiero.es",
    webLabel: "casafiero.es ↗",
    esInterno: false,
    imagen: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=90",
    imagenAlt: "Tapas de autor y cocina contemporánea Casa Fierro Barcelona",
    badge: null,
    keywords: [
      { text: "restaurantes Eixample Barcelona", href: "/blog/restaurantes-eixample-barcelona" },
    ],
  },
];

function InlineLink({ text, href }: { text: string; href: string }) {
  return (
    <Link href={href} style={{ color: "var(--gs-gold)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
      {text}
    </Link>
  );
}

function renderParagraph(text: string, keywords: { text: string; href: string }[]) {
  if (!keywords.length) return <span>{text}</span>;
  let result = text;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  keywords.forEach(({ text: kw, href }) => {
    const idx = result.toLowerCase().indexOf(kw.toLowerCase());
    if (idx === -1) return;
    parts.push(result.slice(lastIndex, idx));
    parts.push(<InlineLink key={kw} text={result.slice(idx, idx + kw.length)} href={href} />);
    lastIndex = idx + kw.length;
  });
  parts.push(result.slice(lastIndex));
  return <>{parts}</>;
}

export default function MejoresMenusDegustacion() {
  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema([
        { name: "Inicio", url: "https://gastroshows.es" },
        { name: "Blog", url: "https://gastroshows.es/blog" },
        { name: "Mejores menús degustación Barcelona", url: "https://gastroshows.es/blog/mejores-restaurantes-menu-degustacion-barcelona" },
      ])} />
      <JsonLd data={articleSchema({
        title: "Los Mejores Restaurantes con Menú Degustación de Barcelona 2025",
        description: "Los mejores restaurantes con menú degustación de Barcelona: precios, descripción y reservas.",
        publishedAt: "2024-03-01",
        modifiedAt: "2025-05-07",
        slug: "mejores-restaurantes-menu-degustacion-barcelona",
        image: "https://gastroshows.es/images/experiencia/ambiente.jpg",
      })} />

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "55vh", overflow: "hidden" }}>
        <Image
          src="/images/experiencia/mesa-cena-clandestina.jpg"
          alt="Los mejores restaurantes con menú degustación de Barcelona"
          fill priority sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 35%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,5,5,0.25) 0%, rgba(5,5,5,0.85) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: "0 2rem 4rem", textAlign: "center" }}>
          <Link href="/blog" style={{ fontSize: "0.65rem", color: "rgba(245,240,232,0.5)", textDecoration: "none", letterSpacing: "0.1em", marginBottom: "1.25rem" }}>← Blog</Link>
          <p style={{ fontSize: "0.58rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gs-gold)", marginBottom: "0.75rem" }}>Guías Gastronómicas · Barcelona</p>
          <h1 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(1.8rem,4.5vw,3.2rem)", fontWeight: 300, color: "#F5F0E8", lineHeight: 1.15, maxWidth: "750px" }}>
            Los Mejores Restaurantes con Menú Degustación de Barcelona
          </h1>
        </div>
      </section>

      {/* ── META + INTRO ── */}
      <section style={{ background: "var(--gs-bg)", padding: "4rem 2rem 3rem" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>

          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center", marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid var(--gs-border)" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--gs-muted)" }}>Actualizado: mayo 2025</span>
            <span style={{ fontSize: "0.72rem", color: "var(--gs-muted)" }}>6 restaurantes</span>
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gs-gold)", border: "1px solid rgba(218,165,32,0.3)", padding: "0.2rem 0.75rem" }}>Barcelona</span>
          </div>

          <p style={{ fontSize: "1.05rem", color: "var(--gs-text)", lineHeight: 1.9, marginBottom: "1.25rem", fontFamily: "var(--font-cormorant),Georgia,serif" }}>
            No es ningún secreto que la gastronomía está de moda. En los últimos años, la cocina ha
            experimentado una subida de popularidad gracias a las redes sociales. Foodies, chefs y
            restaurantes comparten platos y recetas. Pero, ¿por dónde empezar? ¿O dónde continuar explorando?
          </p>
          <p style={{ color: "var(--gs-muted)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            Aquí presentamos los mejores restaurantes con{" "}
            <Link href="/menu-degustacion" style={{ color: "var(--gs-gold)", textDecoration: "underline", textUnderlineOffset: "3px" }}>menú degustación de Barcelona</Link>
            {" "}que no dejarán indiferentes. Lugares donde dejarte llevar por las elaboraciones que
            preparan y recomiendan los chefs en sus menús cerrados. No hay nada mejor para disfrutar
            que dejar rienda suelta al genio.
          </p>
          <p style={{ color: "var(--gs-muted)", lineHeight: 1.85 }}>
            Barcelona es una ciudad con una escena gastronómica extraordinaria: restaurantes con
            Estrella Michelin, propuestas de cocina de autor, cocina de fusión y experiencias únicas
            como la{" "}
            <Link href="/cena-clandestina" style={{ color: "var(--gs-gold)", textDecoration: "underline", textUnderlineOffset: "3px" }}>cena clandestina de GastroShows</Link>
            . Aquí tienes los mejores.
          </p>
        </div>
      </section>

      {/* ── RESTAURANTES ── */}
      {restaurantes.map((r, idx) => (
        <article key={r.slug} id={r.slug} style={{ borderTop: "1px solid var(--gs-border)", background: idx % 2 === 0 ? "var(--gs-bg)" : "var(--gs-bg2)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr" }}>

            {/* Imagen */}
            <div style={{ position: "relative", height: "520px", overflow: "hidden", order: idx % 2 === 0 ? 0 : 1 }}>
              <Image
                src={r.imagen}
                alt={r.imagenAlt}
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              {r.badge && (
                <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", background: "var(--gs-gold)", color: "#0A0A0A", padding: "0.35rem 1rem", fontFamily: "var(--font-montserrat)", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  {r.badge}
                </div>
              )}
            </div>

            {/* Texto */}
            <div style={{ padding: "3.5rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center", order: idx % 2 === 0 ? 1 : 0 }}>
              <p style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gs-muted)", marginBottom: "0.75rem" }}>{r.subtitulo}</p>

              <h2 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(1.5rem,2.2vw,2rem)", fontWeight: 300, color: "var(--gs-text)", marginBottom: "1.5rem", lineHeight: 1.2 }}>
                {r.nombre}
              </h2>

              {r.texto.map((p, i) => (
                <p key={i} style={{ color: "var(--gs-muted)", fontSize: "0.875rem", lineHeight: 1.8, marginBottom: "0.9rem" }}>
                  {i === 0 && r.keywords.length > 0
                    ? renderParagraph(p, r.keywords)
                    : p}
                </p>
              ))}

              <div style={{ borderTop: "1px solid var(--gs-border)", paddingTop: "1.25rem", marginTop: "0.5rem", marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--gs-muted)" }}>💰 {r.precio}</span>
                <span style={{ fontSize: "0.8rem", color: "var(--gs-muted)" }}>📍 {r.direccion}</span>
              </div>

              <a
                href={r.web}
                target={r.esInterno ? "_self" : "_blank"}
                rel={r.esInterno ? undefined : "noopener noreferrer"}
                style={{ display: "inline-block", background: r.esInterno ? "var(--gs-gold)" : "transparent", border: r.esInterno ? "none" : "1px solid rgba(218,165,32,0.4)", color: r.esInterno ? "#0A0A0A" : "var(--gs-gold)", padding: "0.75rem 1.75rem", fontFamily: "var(--font-montserrat)", fontSize: "0.65rem", fontWeight: r.esInterno ? 700 : 500, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", alignSelf: "flex-start" }}>
                {r.webLabel}
              </a>
            </div>
          </div>
        </article>
      ))}

      {/* ── ÍNDICE RÁPIDO ── */}
      <section style={{ background: "var(--gs-bg2)", borderTop: "1px solid var(--gs-border)", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 300, color: "var(--gs-text)", marginBottom: "0.75rem" }}>
            Resumen: los 6 mejores menús degustación de Barcelona
          </h2>
          <p style={{ color: "var(--gs-muted)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            Un vistazo rápido a todos los restaurantes de esta guía:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {restaurantes.map((r, i) => (
              <a key={r.slug} href={`#${r.slug}`} style={{ display: "flex", gap: "1.5rem", alignItems: "baseline", padding: "1rem 0", borderBottom: "1px solid var(--gs-border)", textDecoration: "none" }}>
                <span style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "1.5rem", fontWeight: 300, color: "var(--gs-gold)", opacity: 0.3, minWidth: "2rem" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <span style={{ color: "var(--gs-text)", fontSize: "0.9rem", fontFamily: "var(--font-cormorant),Georgia,serif" }}>{r.nombre}</span>
                  <span style={{ color: "var(--gs-muted)", fontSize: "0.78rem", marginLeft: "1rem" }}>{r.precio.split("·")[0].trim()}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONCLUSIÓN + CTA ── */}
      <section style={{ background: "var(--gs-bg)", padding: "5rem 2rem", borderTop: "1px solid var(--gs-border)" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 300, color: "var(--gs-text)", marginBottom: "1.25rem" }}>
            ¿Cuál elegir?
          </h2>
          <p style={{ color: "var(--gs-muted)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            Depende de lo que busques. Si quieres{" "}
            <Link href="/cena-clandestina" style={{ color: "var(--gs-gold)", textDecoration: "underline", textUnderlineOffset: "3px" }}>una experiencia gastronómica diferente y misteriosa</Link>
            {" "}en Barcelona, GastroShows es única: empieza antes de llegar. Si te importa la técnica
            y la cocina vegetal, Xavier Pellicer es insuperable. Si buscas{" "}
            <Link href="/preguntas-frecuentes" style={{ color: "var(--gs-gold)", textDecoration: "underline", textUnderlineOffset: "3px" }}>la mejor relación calidad-precio</Link>
            , Cruix es imbatible.
          </p>
          <p style={{ color: "var(--gs-muted)", lineHeight: 1.85, marginBottom: "3rem" }}>
            Lo que sí es seguro: cualquiera de los seis justifica un buen plan en Barcelona.
            Y si quieres{" "}
            <Link href="/regalo" style={{ color: "var(--gs-gold)", textDecoration: "underline", textUnderlineOffset: "3px" }}>regalar una experiencia gastronómica</Link>
            {" "}a alguien especial, la cena clandestina de GastroShows es la opción más memorable.
          </p>

          <div style={{ padding: "2.5rem", border: "1px solid rgba(218,165,32,0.18)", background: "rgba(218,165,32,0.02)", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "1.6rem", fontWeight: 300, color: "var(--gs-text)", marginBottom: "0.5rem" }}>
              ¿Te quedas con la cena clandestina?
            </p>
            <p style={{ color: "var(--gs-muted)", fontSize: "0.85rem", marginBottom: "2rem" }}>
              Plazas limitadas · 15% de descuento los miércoles y jueves
            </p>
            <Link href="/" style={{ background: "var(--gs-gold)", color: "#0A0A0A", padding: "0.9rem 2.5rem", fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>
              Reservar GastroShows
            </Link>
          </div>
        </div>
      </section>

      {/* ── ARTÍCULOS RELACIONADOS ── */}
      <section style={{ background: "var(--gs-bg2)", borderTop: "1px solid var(--gs-border)", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gs-gold)", marginBottom: "2rem" }}>
            También te puede interesar
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1.5rem" }}>
            {[
              { slug: "cena-clandestina-barcelona-experiencia-unica", title: "Cena Clandestina en Barcelona: Todo lo que Debes Saber" },
              { slug: "restaurantes-estrella-michelin-barcelona",     title: "Restaurantes con Estrella Michelin en Barcelona" },
              { slug: "maridaje-vinos-menu-degustacion",              title: "Maridaje de Vinos en un Menú Degustación: Guía Práctica" },
              { slug: "experiencia-gastronomica-barcelona",           title: "Las Mejores Experiencias Gastronómicas de Barcelona" },
            ].map(a => (
              <Link key={a.slug} href={`/blog/${a.slug}`} style={{ textDecoration: "none" }}>
                <div style={{ padding: "1.5rem", border: "1px solid var(--gs-border)", background: "var(--gs-bg)", transition: "border-color 0.2s" }}>
                  <h3 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "1.05rem", color: "var(--gs-text)", marginBottom: "0.75rem", fontWeight: 400, lineHeight: 1.3 }}>
                    {a.title}
                  </h3>
                  <span style={{ color: "var(--gs-gold)", fontSize: "0.68rem", letterSpacing: "0.1em" }}>Leer →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
