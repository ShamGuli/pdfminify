const SITE_URL = "https://pdfminify.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "PDF Minify",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/apple-touch-icon.png`,
    width: 180,
    height: 180,
  },
  description:
    "Free online PDF compressor. Reduce PDF file size up to 80% without losing quality. 100% browser-side, no upload to server.",
  foundingDate: "2025",
  email: "hello@pdfminify.com",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "hello@pdfminify.com",
    url: `${SITE_URL}/contact`,
    availableLanguage: "English",
  },
  sameAs: [],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "PDF Minify",
  alternateName: ["PDFMinify", "PDF Minify Compressor"],
  url: SITE_URL,
  description:
    "Free online PDF compressor. Reduce PDF size up to 80% in your browser. No signup, no server upload.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#app`,
  name: "PDF Minify — Free Online PDF Compressor",
  description:
    "Compress PDF files up to 80% smaller without losing quality. Free, instant, 100% browser-based. No signup, no upload to server. Batch process up to 20 files.",
  url: SITE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem:
    "All (Web-based — works on Windows, Mac, Linux, iOS, Android, ChromeOS)",
  browserRequirements:
    "Any modern browser with JavaScript enabled (Chrome, Firefox, Safari, Edge)",
  softwareVersion: "1.0",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "Reduce PDF size up to 80%",
    "100% browser-side processing — files never leave your device",
    "Batch processing — compress up to 20 files at once",
    "Adjustable compression slider for quality control",
    "No watermark on output files",
    "No signup or account required",
    "Max 50 MB per file",
    "Download as ZIP for batch results",
    "Works on all devices and platforms",
    "Powered by pdf-lib open-source library",
  ],
  screenshot: `${SITE_URL}/og.png`,
  creator: { "@id": `${SITE_URL}/#organization` },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Compress PDF Files Online for Free",
  description:
    "Reduce PDF file size in 3 simple steps using PDF Minify — free, private, and instant.",
  totalTime: "PT1M",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: "0",
  },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Upload Your PDF",
      text: "Drag and drop your PDF files onto the upload zone, or click to browse from your device. You can upload up to 20 PDF files at once, each up to 50 MB in size. Only PDF format is accepted.",
      url: `${SITE_URL}/#upload`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Adjust Compression & Compress",
      text: "Use the compression slider to choose your preferred balance between file size and quality. Move left for maximum compression (smallest file), or right for higher quality. Click compress and wait a few seconds — all processing happens in your browser, nothing is uploaded.",
      url: `${SITE_URL}/#compress`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download Compressed PDF",
      text: "Download your compressed PDF files individually, or download all at once as a convenient ZIP archive. Files are ready to email, upload, or share immediately — no watermarks added.",
      url: `${SITE_URL}/#download`,
    },
  ],
  tool: {
    "@type": "HowToTool",
    name: "PDF Minify — Free Online PDF Compressor",
    url: SITE_URL,
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
        text: "Yes, PDF Minify is completely free to use with no hidden fees, usage limits, or premium tiers. You can compress as many PDF files as you need, as often as you want, without ever being asked to pay or create an account. There are no daily limits, no file count restrictions, and no features locked behind a paywall.",
      },
    },
    {
      "@type": "Question",
      name: "Does my PDF get uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All compression happens locally in your browser using JavaScript and the open-source pdf-lib library. Your PDF files never leave your device — no data is transmitted over the internet at any point during the compression process. This makes PDF Minify one of the most private and secure PDF compression tools available online.",
      },
    },
    {
      "@type": "Question",
      name: "What is the maximum file size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each individual PDF file can be up to 50 MB in size. You can compress up to 20 files simultaneously using our batch processing feature. After compression, you can download each file individually or grab all of them at once as a single ZIP archive for convenience.",
      },
    },
    {
      "@type": "Question",
      name: "How much can I compress a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Compression results depend on the content of your PDF. Documents with large embedded images — such as scanned PDFs, presentations with photos, or image-heavy reports — can typically be reduced by 50-80%. Text-heavy PDFs with few or no images may only shrink by 5-20%, since the text itself is already compact. Use the adjustable compression slider to find the perfect balance between file size and visual quality for your specific document.",
      },
    },
    {
      "@type": "Question",
      name: "Do you support Word, JPG, or other formats?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PDF Minify is focused exclusively on PDF compression to deliver the best possible results for this specific format. We do not process Word documents, images, or other file types. For image compression, we recommend pngminify.com for PNG files, miniwebp.com for WebP images, and miniheic.com for HEIC photos from iPhones.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use PDF Minify for commercial projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. You can use PDF Minify and the compressed output files for any personal or commercial purpose without any restrictions. There are no licensing fees, no attribution requirements, and no usage limitations. Whether you're compressing invoices for your business, portfolios for clients, or reports for your team — it's all free and unrestricted.",
      },
    },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Popular PDF Compression Use Cases",
  description:
    "Most popular ways people use PDF Minify to compress their documents.",
  numberOfItems: 12,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Compress PDF for Email", url: `${SITE_URL}/compress/compress-pdf-for-email` },
    { "@type": "ListItem", position: 2, name: "Compress PDF for Gmail", url: `${SITE_URL}/compress/compress-pdf-for-gmail` },
    { "@type": "ListItem", position: 3, name: "Compress PDF for Outlook", url: `${SITE_URL}/compress/compress-pdf-for-outlook` },
    { "@type": "ListItem", position: 4, name: "Compress PDF for WhatsApp", url: `${SITE_URL}/compress/compress-pdf-for-whatsapp` },
    { "@type": "ListItem", position: 5, name: "Compress PDF for Slack", url: `${SITE_URL}/compress/compress-pdf-for-slack` },
    { "@type": "ListItem", position: 6, name: "Compress PDF Under 1 MB", url: `${SITE_URL}/compress/compress-pdf-under-1mb` },
    { "@type": "ListItem", position: 7, name: "Compress PDF Under 5 MB", url: `${SITE_URL}/compress/compress-pdf-under-5mb` },
    { "@type": "ListItem", position: 8, name: "Compress Scanned PDF", url: `${SITE_URL}/compress/compress-scanned-pdf` },
    { "@type": "ListItem", position: 9, name: "Compress PDF Resume", url: `${SITE_URL}/compress/compress-pdf-resume` },
    { "@type": "ListItem", position: 10, name: "Compress PDF Without Losing Quality", url: `${SITE_URL}/compress/compress-pdf-without-losing-quality` },
    { "@type": "ListItem", position: 11, name: "Compress PDF on Mac", url: `${SITE_URL}/compress/compress-pdf-on-mac` },
    { "@type": "ListItem", position: 12, name: "Compress PDF on iPhone", url: `${SITE_URL}/compress/compress-pdf-on-iphone` },
  ],
};

const schemas = [
  organizationSchema,
  webSiteSchema,
  softwareAppSchema,
  howToSchema,
  faqSchema,
  itemListSchema,
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
