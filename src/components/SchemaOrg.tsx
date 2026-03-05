const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PNG Minify",
  url: "https://pngminify.com",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires a modern web browser with JavaScript enabled",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Compress PNG images online for free. Reduce file size up to 80% without losing quality. No upload to server — 100% private.",
  featureList: [
    "Browser-side compression — files never leave your device",
    "Batch processing — compress up to 20 files at once",
    "No file upload required",
    "Download all as ZIP",
    "Adjustable compression level",
  ],
  screenshot: "https://pngminify.com/og.png",
  creator: {
    "@type": "Organization",
    name: "PNG Minify",
    url: "https://pngminify.com",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is PNG Minify free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, PNG Minify is completely free. There are no hidden fees, subscriptions, or limits on the number of files you can compress.",
      },
    },
    {
      "@type": "Question",
      name: "Does my image get uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All compression happens entirely in your browser using JavaScript. Your images never leave your device and are never sent to any server.",
      },
    },
    {
      "@type": "Question",
      name: "What is the maximum file size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each PNG file can be up to 50 MB. You can compress up to 20 files at once.",
      },
    },
    {
      "@type": "Question",
      name: "How much can I compress a PNG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Results vary depending on the PNG content, but typical savings range from 30% to 80%. Photographic PNGs compress more than simple graphics or icons.",
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
