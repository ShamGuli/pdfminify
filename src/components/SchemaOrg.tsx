const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PDF Minify",
  url: "https://pdfminify.com",
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
    "Designed for documents, reports, and e‑books",
  ],
  screenshot: "https://pdfminify.com/og.png",
  creator: {
    "@type": "Organization",
    name: "PDF Minify",
    url: "https://pdfminify.com",
  },
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
        text: "Yes, PDF Minify is completely free. There are no hidden fees, subscriptions, or limits on the number of files you can compress.",
      },
    },
    {
      "@type": "Question",
      name: "Does my PDF get uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All compression happens entirely in your browser using JavaScript. Your PDFs never leave your device and are never sent to any server.",
      },
    },
    {
      "@type": "Question",
      name: "What is the maximum file size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each PDF file can be up to 50 MB. You can compress multiple documents at once.",
      },
    },
    {
      "@type": "Question",
      name: "How much can I compress a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Results vary depending on the document, but typical savings range from 30% to 80%, especially for PDFs with large embedded images.",
      },
    },
  ],
};

export default function SchemaOrg() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
