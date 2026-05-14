type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function restaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    name: "GastroShows",
    description:
      "Cena clandestina y menú degustación en Barcelona. Una experiencia gastronómica única con ubicación secreta, maridaje y 7 actos culinarios.",
    url: "https://gastroshows.es",
    telephone: "+34-XXX-XXX-XXX",
    email: "info@gastroshows.es",
    image: "https://gastroshows.es/og-image.jpg",
    priceRange: "€€€",
    servesCuisine: ["Catalana", "Mediterránea", "Alta Cocina"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barcelona",
      addressRegion: "Cataluña",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.3851,
      longitude: 2.1734,
    },
    areaServed: {
      "@type": "City",
      name: "Barcelona",
    },
    hasMap: "https://maps.google.com/?q=Barcelona",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "13:00",
        closes: "16:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "20:00",
        closes: "23:00",
      },
    ],
    menu: "https://gastroshows.es/menu-degustacion",
    reservations: "https://gastroshows.es",
    paymentAccepted: ["Cash", "CreditCard"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "247",
      bestRating: "5",
    },
    sameAs: [
      "https://www.instagram.com/gastroshows",
      "https://www.facebook.com/gastroshows",
    ],
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function eventSchema({
  name,
  description,
  startDate,
  endDate,
  price,
}: {
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  price: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Ubicación secreta en Barcelona",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Barcelona",
        addressCountry: "ES",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "GastroShows",
      url: "https://gastroshows.es",
    },
    offers: {
      "@type": "Offer",
      price: price.toString(),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: "https://gastroshows.es",
      validFrom: startDate,
    },
    ...(startDate ? { startDate } : {}),
    ...(endDate ? { endDate } : {}),
  };
}

export function articleSchema({
  title,
  description,
  publishedAt,
  modifiedAt,
  slug,
  image,
}: {
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt: string;
  slug: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: {
      "@type": "Organization",
      name: "GastroShows",
      url: "https://gastroshows.es",
    },
    publisher: {
      "@type": "Organization",
      name: "GastroShows",
      logo: {
        "@type": "ImageObject",
        url: "https://gastroshows.es/logo.png",
      },
    },
    url: `https://gastroshows.es/blog/${slug}`,
    mainEntityOfPage: `https://gastroshows.es/blog/${slug}`,
    ...(image ? { image: { "@type": "ImageObject", url: image } } : {}),
  };
}

export function menuSchema({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name,
    description,
    restaurant: {
      "@type": "Restaurant",
      name: "GastroShows",
      url: "https://gastroshows.es",
    },
  };
}

export function recipeSchema({
  name,
  description,
  image,
  prepTime,
  cookTime,
  recipeYield,
  ingredients,
  instructions,
  category,
  cuisine,
}: {
  name: string;
  description: string;
  image?: string;
  prepTime?: string;
  cookTime?: string;
  recipeYield?: string;
  ingredients: string[];
  instructions: string[];
  category?: string;
  cuisine?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name,
    description,
    ...(image ? { image } : {}),
    author: { "@type": "Organization", name: "GastroShows" },
    ...(prepTime ? { prepTime } : {}),
    ...(cookTime ? { cookTime } : {}),
    ...(recipeYield ? { recipeYield } : {}),
    recipeIngredient: ingredients,
    recipeInstructions: instructions.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: step,
    })),
    ...(category ? { recipeCategory: category } : {}),
    ...(cuisine ? { recipeCuisine: cuisine } : {}),
  };
}

export function productSchema({
  name,
  description,
  price,
}: {
  name: string;
  description: string;
  price: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    brand: {
      "@type": "Brand",
      name: "GastroShows",
    },
    offers: {
      "@type": "Offer",
      price: price.toString(),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: "https://gastroshows.es/regalo",
    },
  };
}
