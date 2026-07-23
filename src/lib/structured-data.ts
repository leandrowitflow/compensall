import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site-metadata";
import {
  LEGAL_ENTITY_EMAIL,
  LEGAL_ENTITY_NAME,
  LEGAL_ENTITY_NIF,
} from "@/lib/passenger-rights";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: LEGAL_ENTITY_NAME,
    taxID: LEGAL_ENTITY_NIF,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo.svg`,
    description: SITE_DESCRIPTION,
    email: LEGAL_ENTITY_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Paulo da Gama 629",
      addressLocality: "Porto",
      postalCode: "4150-589",
      addressCountry: "PT",
    },
    sameAs: [
      "https://www.linkedin.com/company/compensall",
      "https://www.instagram.com/compensall/",
      "https://www.facebook.com/profile.php?id=61591145513794",
      "https://www.tiktok.com/@compensall",
    ],
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/airlines?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildFaqPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildArticleSchema(input: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: `${SITE_URL}${input.image}`,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/logo.svg`,
      },
    },
    mainEntityOfPage: `${SITE_URL}${input.path}`,
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function buildHowToSchema(steps: Array<{ name: string; text: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to claim flight compensation with Compensall",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function buildProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    areaServed: "European Union",
    serviceType: "Flight compensation claims under EU regulation EC 261/2004",
  };
}
