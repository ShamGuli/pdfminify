const SITE_URL = "https://pdfminify.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PDF Minify",
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  sameAs: [],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PDF Minify",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PDF Minify",
  url: SITE_URL,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires a modern web browser with JavaScript enabled",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Compress PDF files online for free. Reduce file size up to 80% without losing quality. No upload to server — 100% private.",
  featureList: [
    "Browser-side compression — files never leave your device",
    "Batch processing — compress multiple PDFs at once",
    "No file upload required",
    "Download all as ZIP",
    "Designed for documents, reports, and e-books",
  ],
  screenshot: `${SITE_URL}/og.png`,
  creator: {
    "@type": "Organization",
    name: "PDF Minify",
    url: SITE_URL,
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Compress PDF Files Online for Free",
  description:
    "Reduce PDF file size up to 80% without losing quality using PDF Minify — a free, browser-based PDF compressor.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Upload your PDF",
      text: "Drag & drop your PDF files or browse from your device. Only PDF files are accepted — up to 20 files, each up to 50 MB.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Compress",
      text: "PDF Minify optimizes your documents entirely in the browser. No files are ever uploaded to a server. Adjust the compression slider for smaller file or better quality.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download",
      text: "Download individual compressed PDFs or all at once as a ZIP archive, ready to share or upload.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is PDF Minify free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. PDF Minify is completely free to use. There are no hidden fees or usage limits.",
      },
    },
    {
      "@type": "Question",
      name: "Does my PDF get uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All compression happens locally in your browser using JavaScript. Your PDFs never leave your device.",
      },
    },
    {
      "@type": "Question",
      name: "What is the maximum file size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each PDF file can be up to 50 MB, and you can compress up to 20 files at a time.",
      },
    },
    {
      "@type": "Question",
      name: "How much can I compress a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the content. Many PDFs can be reduced by 30–80% without visible quality loss, especially if they contain large embedded images.",
      },
    },
    {
      "@type": "Question",
      name: "Do you support Word, JPG, or other formats?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PDF Minify is focused on PDF only. For images we recommend tools like pngminify.com, miniwebp.com, and miniheic.com.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use PDF Minify for commercial projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can use the compressed PDFs in any personal or commercial project.",
      },
    },
  ],
};

const schemas = [
  organizationSchema,
  webSiteSchema,
  webAppSchema,
  howToSchema,
  faqSchema,
];

export default function SchemaOrg() {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
