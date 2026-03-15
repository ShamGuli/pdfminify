import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { posts11to20 } from './seed-posts-11-20';
import { posts21to30 } from './seed-posts-21-30';

dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

// Use service_role key to bypass RLS for seeding
const supabaseUrl = process.env.SUPABASE_SERVICE_URL || 'https://mhryztriafnzrueacpyk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseKey) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY. Set it in .env.local or as env var.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
}

const posts: BlogPost[] = [
// ─── POST 1 ───
{
  title: "How to Compress PDF on Mac — 5 Free Methods That Actually Work",
  slug: "how-to-compress-pdf-on-mac",
  excerpt: "Learn 5 proven ways to compress PDF files on Mac — from browser-based tools to Preview and Automator. No software to install. Step-by-step with screenshots.",
  cover_image: null,
  tags: ["pdf", "compressor", "free compressor", "mac", "compress"],
  published: true,
  created_at: "2025-04-14T00:00:00Z",
  content: `## Why Are PDFs So Large on Mac?

If you have ever exported a document from Pages, Keynote, or any Mac application, you may have noticed the resulting PDF is surprisingly large. There are several reasons for this. Mac applications tend to embed high-resolution images optimized for Retina displays, which means every graphic is rendered at 2x density. Additionally, macOS Preview sometimes creates uncompressed PDF streams when you use the "Export as PDF" option, which inflates file sizes well beyond what is necessary for normal viewing or sharing.

The good news is that compressing a PDF on Mac is straightforward, and you do not need to pay for expensive software like Adobe Acrobat Pro. In this guide, we cover five completely free methods that actually deliver meaningful file size reductions.

## Method 1: PDF Minify — Browser-Based Compression

The fastest and most reliable method is using [PDF Minify](https://pdfminify.com), a free browser-based PDF compressor. Because the compression happens entirely in your browser, your files never leave your Mac. There is nothing to install or sign up for.

### Step-by-Step Instructions

1. Open Safari or Chrome on your Mac.
2. Navigate to [pdfminify.com](https://pdfminify.com).
3. Drag your PDF file onto the upload area, or click to browse.
4. Adjust the compression slider — "Medium" works well for most documents.
5. Click "Compress" and wait a few seconds.
6. Download your compressed file.

Most users see a 40–70% reduction in file size. For documents heavy on scanned images, the savings can be even greater. This is the method we recommend because it works on any Mac without requiring system-level changes or Terminal knowledge.

## Method 2: macOS Preview — "Reduce File Size" Filter

Mac's built-in Preview application has a lesser-known "Reduce File Size" quartz filter. It is a quick option, though the results can be aggressive.

### How to Use It

1. Open your PDF in Preview (double-click the file).
2. Go to **File → Export**.
3. In the "Quartz Filter" dropdown, select **Reduce File Size**.
4. Choose a save location and click **Save**.

### What to Expect

Preview's built-in filter applies heavy image downsampling. Text-based PDFs will compress well, but documents with photos or charts may look noticeably blurry. The filter targets approximately 72 DPI for images, which is too low for many use cases.

If the quality is too degraded, consider using a tool like [PDF Minify](https://pdfminify.com) that offers adjustable compression levels, or customize the quartz filter through ColorSync Utility (covered in Method 5).

## Method 3: Automator Workflow for Batch Compression

If you need to compress PDFs regularly, creating an Automator workflow can save significant time.

### Building the Workflow

1. Open **Automator** from your Applications folder.
2. Choose **Quick Action** as the document type.
3. Set "Workflow receives current" to **PDF files** in **Finder**.
4. Add the action **Apply Quartz Filter to PDF Documents**.
5. Select the **Reduce File Size** filter.
6. Save the workflow with a descriptive name like "Compress PDF".

Now you can right-click any PDF in Finder, go to **Quick Actions**, and select your workflow. This is especially useful for batch processing — select multiple PDFs, right-click, and compress them all at once.

### Limitations

Like Preview, Automator uses the same built-in quartz filters, so quality reduction can be significant. For more control, you can create custom filters in ColorSync Utility (see Method 5) or use an online tool for important documents.

## Method 4: Terminal with Ghostscript

For advanced users comfortable with the command line, Ghostscript provides the most granular control over PDF compression on Mac.

### Installing Ghostscript

First, install Homebrew if you do not have it, then install Ghostscript:

\`\`\`bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install ghostscript
\`\`\`

### The Compression Command

\`\`\`bash
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=compressed.pdf input.pdf
\`\`\`

### Understanding PDFSETTINGS

- **/screen** — 72 DPI, smallest file, lowest quality.
- **/ebook** — 150 DPI, good balance of size and quality.
- **/printer** — 300 DPI, high quality, moderate compression.
- **/prepress** — 300 DPI, preserves color accuracy for professional printing.

For most users, \`/ebook\` provides the best trade-off. The command processes the PDF and writes a compressed version, typically reducing size by 50–80% depending on the content.

## Method 5: ColorSync Utility — Custom Filters

ColorSync Utility lets you create custom quartz filters with precise control over image quality and resolution. This is the hidden power-user method most guides do not mention.

### Creating a Custom Filter

1. Open **ColorSync Utility** (search for it in Spotlight).
2. Go to the **Filters** tab.
3. Click the **+** button to add a new filter.
4. Name it something like "Compress PDF Medium".
5. Add a **Image Effects → Image Compression** component.
6. Set the quality slider to your preference (50–70% works well).
7. Optionally add **Image Effects → Image Scaling** and set a maximum pixel size.

Once created, your custom filter appears in Preview's Export dialog and in Automator, giving you a reusable compression profile tailored to your needs.

## Comparison Table

| Method | Ease of Use | Quality Control | Batch Support | Best For |
|--------|------------|-----------------|---------------|----------|
| PDF Minify | Very Easy | Adjustable slider | Yes | Most users |
| Preview | Easy | No control | No | Quick one-off |
| Automator | Moderate | Limited | Yes | Repetitive tasks |
| Ghostscript | Advanced | Full control | Via scripting | Power users |
| ColorSync | Moderate | Good control | Via Preview | Custom profiles |

## Which Method Should You Choose?

For most Mac users, [PDF Minify](https://pdfminify.com) is the best starting point. It requires zero setup, works in any browser, and provides adjustable quality levels. If you need to process files offline regularly, consider setting up an Automator workflow with a custom ColorSync filter.

If you need to [compress a PDF for email](https://pdfminify.com/compress/compress-pdf-for-email), any of these methods will get your files under Gmail's 25 MB limit. For the most control over output quality and the fastest results, browser-based compression strikes the best balance between convenience and effectiveness.

Start compressing your Mac PDFs for free at [pdfminify.com](https://pdfminify.com) — no signup, no software, no nonsense.
`
},

// ─── POST 2 ───
{
  title: "How to Compress PDF on iPhone Without Installing Any App",
  slug: "compress-pdf-on-iphone-no-app",
  excerpt: "Compress PDF files directly on your iPhone using Safari — no app download needed. Step-by-step guide with screenshots for iOS 17+.",
  cover_image: null,
  tags: ["pdf", "compressor", "free compressor", "iphone", "compress", "browser-based"],
  published: true,
  created_at: "2025-04-28T00:00:00Z",
  content: `## The Problem: iOS Has No Built-In PDF Compression

Apple's iOS is excellent at creating and viewing PDFs, but it offers no native way to reduce their file size. If you have a 15 MB PDF and need to email it, you are stuck. The Files app can preview PDFs, markup tools can annotate them, but neither can compress them.

The App Store has dozens of PDF compressor apps, but most are riddled with ads, require subscriptions, or — worse — upload your private documents to unknown servers. For a task you might do once a week, installing and paying for a dedicated app makes little sense.

There is a better way. You can compress PDFs directly in Safari using a browser-based tool, and it works beautifully on any iPhone running iOS 15 or later.

## Why Browser-Based Compression Is Perfect for iPhone

Browser-based PDF compression runs entirely within Safari on your device. Your PDF is processed using JavaScript in the browser — the file never leaves your iPhone. This means:

- **No app installation** — saves storage space and avoids bloatware.
- **No account signup** — no email address or personal information required.
- **No file uploads** — your documents stay on your device, which is critical for sensitive files.
- **Works on any iPhone** — no compatibility issues or iOS version restrictions beyond basic Safari support.

## Step-by-Step: Compress a PDF on iPhone Using Safari

### Step 1: Open Safari and Navigate to PDF Minify

Open Safari on your iPhone and go to [pdfminify.com](https://pdfminify.com). The site is fully responsive and designed to work on mobile screens.

### Step 2: Select Your PDF

Tap the upload area or the "Choose File" button. iOS will present you with options:

- **Browse Files** — opens the Files app to select a PDF.
- **Photo Library** — if your PDF is saved as a photo (not common).
- **Take Photo** — scan a document using the camera.

Navigate to your PDF in the Files app and tap to select it.

### Step 3: Adjust Compression Settings

Once your file loads, you will see a compression quality slider. Here is what each level does:

- **Low compression** — smallest reduction, highest quality. Good for documents with important images.
- **Medium compression** — balanced option. Recommended for most files.
- **High compression** — maximum reduction. Best for text-heavy documents where image quality is less critical.

For most PDFs, medium compression reduces file size by 40–60% without noticeable quality loss.

### Step 4: Compress and Download

Tap the "Compress" button. The process takes a few seconds, even for larger files. When finished, you will see the original and compressed file sizes displayed. Tap "Download" to save the compressed PDF.

### Step 5: Find Your Compressed File

The compressed PDF is saved to your iPhone's Downloads folder. To find it:

1. Open the **Files** app.
2. Navigate to **On My iPhone → Downloads**.
3. Your compressed PDF will be there with the original filename.

## Sharing Your Compressed PDF

Once compressed, you can share the PDF through any iPhone sharing method:

### Via Email (Mail or Gmail)

1. Open the Files app and locate your compressed PDF.
2. Long-press the file and tap **Share**.
3. Select **Mail** or **Gmail**.
4. Compose your message and send.

### Via AirDrop

AirDrop is the fastest way to share with nearby Apple devices. Long-press the file, tap Share, and select the recipient's device from the AirDrop section.

### Via iMessage

You can send PDFs directly through iMessage. The compressed file will be small enough to send quickly, even on cellular data.

### Via WhatsApp or Other Messaging Apps

WhatsApp, Telegram, and other messaging apps accept PDF attachments. The compressed file will upload and download much faster for both you and the recipient.

## Tips for Best Results on iPhone

### Handling Large PDFs

If your PDF is over 50 MB, the compression might take a bit longer on older iPhones. Be patient and keep Safari in the foreground during the process. Closing Safari or switching apps may interrupt the compression.

### Compressing Multiple PDFs

If you need to compress several PDFs, you can process them one at a time. Each compression is independent, so you can download one and immediately start the next.

### Saving Storage Space

After compressing, consider deleting the original large PDF from your Files app to free up iPhone storage. You can always re-download the original from its source if needed.

### Managing File Names

iOS Safari may add a number suffix to the downloaded file (like "document (1).pdf"). You can rename the file in the Files app by long-pressing and selecting "Rename."

## What About iPad?

Everything in this guide works identically on iPad. Safari on iPad provides an even better experience because of the larger screen, and iPadOS supports the same Files app workflow.

## Common Questions

### Does this work offline?

The initial page load requires an internet connection, but once the page is loaded, the actual compression runs locally. However, you need to stay on the page — navigating away will lose the session.

### Is there a file size limit?

Browser-based tools are limited by your device's available memory. For most iPhones, files up to 100 MB work without issues. Files over 200 MB may be slow on older devices.

### Will my PDF look different after compression?

At medium compression, most users cannot tell the difference. Text remains perfectly sharp because PDF text is vector-based and is not affected by compression. Only embedded images are downsampled, and at 150 DPI the results are still excellent for screen viewing.

## The Bottom Line

You do not need to install an app to compress PDFs on your iPhone. [PDF Minify](https://pdfminify.com) works directly in Safari, keeps your files private, and delivers excellent compression results. Whether you need to [compress a PDF for email](https://pdfminify.com/compress/compress-pdf-for-email) or just free up storage, this browser-based approach is the simplest solution for iPhone users.

Try it now — open Safari and visit [pdfminify.com](https://pdfminify.com) to compress your first PDF in under 30 seconds.
`
},

// ─── POST 3 ───
{
  title: "Gmail Attachment Limit: How to Compress PDF Under 25 MB",
  slug: "compress-pdf-under-25mb-gmail-limit",
  excerpt: "Gmail blocks attachments over 25 MB. Learn how to quickly compress PDF files to fit Gmail's limit — without losing document quality.",
  cover_image: null,
  tags: ["pdf", "compressor", "free compressor", "gmail", "email", "reduce size"],
  published: true,
  created_at: "2025-05-12T00:00:00Z",
  content: `## Understanding Gmail's 25 MB Attachment Limit

Gmail enforces a strict 25 MB limit on email attachments. When you try to attach a file larger than 25 MB, Gmail does not send it — instead, it automatically uploads the file to Google Drive and inserts a download link. While this workaround exists, it is not always ideal. Recipients may not have Google accounts, corporate firewalls may block Drive links, and some automated systems only accept direct attachments.

For professionals who need to send PDF reports, presentations, contracts, or design files, hitting this limit is a frequent frustration. The good news is that most PDFs can be compressed well below 25 MB without meaningful quality loss.

## What Happens When You Exceed the Limit

When you attach a PDF over 25 MB in Gmail, you will see a notification that says "File too large for attachment. File will be sent as a Google Drive link instead." The recipient receives an email with a Google Drive link instead of the actual file. This creates several problems:

- **Access issues** — the recipient needs a Google account or you need to configure sharing permissions.
- **Link expiration** — Google Drive links can be revoked or files deleted, making the email useless later.
- **Corporate restrictions** — many companies block external cloud storage links for security reasons.
- **Automated systems** — application portals, legal submissions, and other systems that expect direct attachments will not process Drive links.

Compressing your PDF to fit under 25 MB eliminates all of these issues.

## How to Compress a PDF for Gmail

### Using PDF Minify (Recommended)

The fastest way to get your PDF under 25 MB is to use [PDF Minify](https://pdfminify.com). Here is the process:

1. Open [pdfminify.com](https://pdfminify.com) in your browser.
2. Upload or drag your oversized PDF.
3. Start with **Medium** compression — this usually achieves 40–60% reduction.
4. If the result is still over 25 MB, try **High** compression.
5. Download the compressed file and attach it to your Gmail message.

The entire process takes less than a minute. Because compression runs in your browser, your documents stay private — important for contracts, financial reports, and other sensitive attachments.

### Checking Your Result

After downloading the compressed PDF, check the file size:

- **Windows**: Right-click the file → Properties → see Size.
- **Mac**: Right-click the file → Get Info → see Size.
- **iPhone/iPad**: Open Files app → long-press the file → Get Info.

Make sure the file size shows less than 25 MB (25,000 KB) before attaching to Gmail.

## Expected Compression Results

The amount of compression depends on what your PDF contains:

| PDF Content Type | Original Size | After Compression | Typical Reduction |
|-----------------|--------------|-------------------|-------------------|
| Text-heavy report | 30 MB | 8–12 MB | 60–75% |
| Presentation with images | 40 MB | 12–18 MB | 50–65% |
| Scanned document (300 DPI) | 50 MB | 10–15 MB | 70–80% |
| Vector graphics/charts | 28 MB | 20–25 MB | 10–30% |
| High-res photo portfolio | 60 MB | 15–25 MB | 55–75% |

Text-heavy PDFs and scanned documents compress the most because text streams can be deflated efficiently and scanned images respond well to downsampling. PDFs that are mostly vector graphics (like CAD drawings or charts) compress less because vector data is already compact.

## What If Compression Is Not Enough?

Sometimes a PDF is so large that even aggressive compression does not bring it under 25 MB. Here are alternative strategies:

### Split the PDF

If your document is 80 pages, consider splitting it into two 40-page PDFs and sending them as separate attachments. Gmail allows multiple attachments as long as the total does not exceed 25 MB.

### Remove Unnecessary Pages

Before compressing, check if your PDF contains pages that the recipient does not need — cover pages, blank pages, appendices, or full-page images that are not essential.

### Reduce Image Quality Before PDF Creation

If you are creating the PDF yourself, reduce image resolution before exporting. In PowerPoint, go to File → Options → Advanced → Image Size and Quality, and select 150 PPI or 96 PPI instead of the default.

### Use Google Drive Intentionally

If the file truly cannot be reduced below 25 MB, use Google Drive deliberately rather than relying on Gmail's automatic conversion. Upload the file, set sharing permissions to "Anyone with the link," and include the link in your email with clear instructions.

## Other Email Provider Limits

Gmail is not the only service with attachment limits. Here is a comparison:

| Email Provider | Attachment Limit | Notes |
|---------------|-----------------|-------|
| Gmail | 25 MB | Auto-converts to Drive link |
| Outlook.com | 20 MB | Offers OneDrive for larger files |
| Yahoo Mail | 25 MB | No cloud fallback |
| Apple iCloud Mail | 20 MB | Mail Drop for up to 5 GB |
| ProtonMail | 25 MB | End-to-end encrypted |
| Zoho Mail | 20 MB | Free tier limit |
| Corporate Exchange | 10–25 MB | Varies by IT policy |

Notice that Outlook and corporate Exchange servers often have even stricter limits — 10 MB or 20 MB. If you are sending to a corporate recipient, 10 MB is a safer target.

## Tips for Recurring Email Attachments

If you regularly send PDF reports via email, here are practices that will save you time:

### Optimize PDFs at Creation Time

When exporting from Word, Excel, or other applications, choose "Minimum size" or "Optimized for web" options. This reduces the starting file size before any additional compression.

### Set Up an Automator or Script

If you send compressed PDFs daily, consider bookmarking [PDF Minify](https://pdfminify.com) in your browser toolbar for one-click access.

### Communicate with Recipients

If you regularly share large files with the same people, consider setting up a shared folder (Google Drive, Dropbox, OneDrive) instead of attaching files to every email. Reserve email attachments for one-off or time-sensitive documents.

## The Bottom Line

Gmail's 25 MB attachment limit does not have to be a roadblock. With browser-based compression from [PDF Minify](https://pdfminify.com), most PDFs can be reduced to well under 25 MB in seconds. For documents that need to be [compressed for email](https://pdfminify.com/compress/compress-pdf-for-email), medium compression preserves quality while typically achieving 50–70% file size reduction.

Stop fighting with attachment limits — compress your PDF and send it with confidence.
`
},

// ─── POST 4 ───
{
  title: "Compress PDF for WhatsApp — Send Documents Without Size Issues",
  slug: "compress-pdf-for-whatsapp-guide",
  excerpt: "WhatsApp limits document sharing to 2 GB but large PDFs load slowly. Learn how to compress PDFs for fast, smooth WhatsApp sharing.",
  cover_image: null,
  tags: ["pdf", "compressor", "free compressor", "whatsapp", "compress", "reduce size"],
  published: true,
  created_at: "2025-05-26T00:00:00Z",
  content: `## WhatsApp Document Sharing: The Real Limits

WhatsApp officially supports document attachments up to 2 GB. In theory, you can send almost any PDF without worrying about size limits. In practice, the experience is very different. Large PDFs create real problems for both senders and recipients on WhatsApp.

When you send a 30 MB PDF over WhatsApp, the upload takes significant time — especially on mobile data. The recipient then has to download 30 MB before they can view the document. On a slow connection, this can take minutes. For group chats where multiple people need the document, this means everyone in the group has to download that 30 MB individually.

The practical sweet spot for WhatsApp documents is 1–5 MB. Files in this range send nearly instantly, download quickly for recipients, and do not consume excessive mobile data.

## Why Your PDFs Are Too Large for Comfortable Sharing

Several factors make PDFs grow beyond comfortable sharing sizes:

### Embedded High-Resolution Images

The number one reason PDFs are large is embedded images. A single high-resolution photo at 300 DPI can be 5–10 MB within a PDF. A document with 10 such images can easily reach 50–100 MB.

### Scanned Documents

Scanned PDFs treat each page as a full-page image. A 20-page scanned document at 300 DPI can easily be 40 MB or more — each page is essentially a photograph of a piece of paper.

### Presentation Exports

PowerPoint and Keynote presentations exported to PDF retain all the high-resolution background images, graphics, and media placeholders. A 30-slide presentation can easily produce a 20–40 MB PDF.

### Uncompressed PDF Streams

Some PDF creation tools do not apply internal compression to the document's data streams. This means the raw content is stored at its full size, making the PDF much larger than necessary.

## Step-by-Step: Compress PDF for WhatsApp

Using [PDF Minify](https://pdfminify.com), you can compress any PDF to a WhatsApp-friendly size in under a minute:

### On Your Phone

1. Open your phone's browser (Chrome, Safari, or any browser).
2. Go to [pdfminify.com](https://pdfminify.com).
3. Tap the upload area and select your PDF from your file manager.
4. Choose your compression level:
   - **Medium** for general documents (recommended).
   - **High** for maximum compression when quality is secondary.
5. Tap **Compress** and wait for processing.
6. Download the compressed file.
7. Open WhatsApp, go to your chat, tap the attachment icon, select **Document**, and choose the compressed PDF.

### On Your Computer

1. Open [pdfminify.com](https://pdfminify.com) in your browser.
2. Drag your PDF onto the upload area.
3. Adjust compression settings and click **Compress**.
4. Download the result.
5. If you use WhatsApp Web or the WhatsApp desktop app, you can attach the compressed PDF directly.

## Recommended Target Sizes for WhatsApp

While WhatsApp allows large files, here are practical recommendations based on real-world usage:

| Scenario | Recommended Max Size | Why |
|----------|---------------------|-----|
| Quick document share in chat | 1–2 MB | Instant send/receive |
| Business proposal or contract | 2–5 MB | Fast on WiFi and 4G |
| Photo-heavy brochure | 5–10 MB | Acceptable wait time |
| Large report (50+ pages) | 10–15 MB | WiFi recommended |
| Anything over 15 MB | Compress further or split | Slow on mobile data |

## Multi-Page PDF Tips for WhatsApp

### Compressing Catalogs and Brochures

Product catalogs and brochures are among the largest PDFs people share on WhatsApp. They are full of product photos, background images, and designed layouts. For these documents:

- Use **High** compression to aggressively reduce image sizes.
- The output at 100–120 DPI is perfectly readable on phone screens, which are typically 5–7 inches.
- A 50 MB catalog can often be reduced to 5–8 MB.

### Sharing Multi-Chapter Documents

If you need to share a large manual or report, consider whether the recipient needs all of it. Sometimes sharing just the relevant chapter or section is more practical than sending the entire document.

### Group Chat Considerations

In WhatsApp groups, every member downloads the file independently. A 20 MB PDF in a group of 50 people means 1 GB of total bandwidth consumed. Compressing to 3 MB makes the experience better for everyone, especially those on limited data plans.

## Privacy Matters When Sharing Documents

When you share documents on WhatsApp, they are end-to-end encrypted during transmission. However, the compression step before sharing is where privacy can be compromised — if you use a server-based compression tool, your document is uploaded to a third-party server.

[PDF Minify](https://pdfminify.com) avoids this problem entirely. Compression runs in your browser using JavaScript. Your PDF never leaves your device. This is especially important for:

- Business contracts and proposals
- Financial documents
- Personal identification documents
- Medical records
- Legal paperwork

## WhatsApp Business and PDF Sharing

If you use WhatsApp Business, compressed PDFs are even more important. Business accounts often share:

- Product catalogs with multiple pages and images
- Price lists and quotations
- Order confirmations and invoices
- Shipping documents and tracking information

For all of these, keeping file sizes under 5 MB ensures a professional, smooth experience for your customers. Nothing looks worse than sending a customer a document that takes two minutes to download.

## Common Issues and Solutions

### "File Too Large" Error

While rare with WhatsApp's 2 GB limit, some older versions or modified clients may enforce lower limits. Compression solves this immediately.

### PDF Does Not Open on Recipient's Phone

This is usually not a compression issue — it is a missing PDF viewer issue. Suggest the recipient install a free PDF reader like Google PDF Viewer or Adobe Acrobat Reader.

### Image Quality Concerns

If the recipient needs to print the document, use **Low** or **Medium** compression to maintain 150+ DPI. For screen-only viewing (which is the case for most WhatsApp documents), **High** compression is perfectly fine since phone screens do not benefit from resolution above 150 DPI.

## Conclusion

WhatsApp may allow 2 GB attachments, but practical sharing demands much smaller files. By compressing your PDFs to 1–5 MB using [PDF Minify](https://pdfminify.com), you ensure instant delivery, fast downloads, and minimal data usage for everyone involved. Whether you are sharing business documents or personal files, [compressing PDFs for email and messaging](https://pdfminify.com/compress/compress-pdf-for-email) is a simple habit that improves every sharing experience.

Compress your next PDF before sending it on WhatsApp — visit [pdfminify.com](https://pdfminify.com) and see the difference.
`
},

// ─── POST 5 ───
{
  title: "How to Reduce PDF File Size Without Losing Quality — Complete Guide",
  slug: "reduce-pdf-size-without-losing-quality",
  excerpt: "Reduce PDF file size by up to 80% while keeping text sharp and images clear. Understand compression levels and when quality loss is acceptable.",
  cover_image: null,
  tags: ["pdf", "compressor", "free compressor", "quality", "reduce size", "optimization"],
  published: true,
  created_at: "2025-06-09T00:00:00Z",
  content: `## What Does "Quality" Mean for a PDF?

Before discussing how to reduce PDF size without losing quality, it is important to understand what quality means in the context of PDF files. A PDF can contain two fundamentally different types of content, and each responds to compression differently.

**Text and vector graphics** are resolution-independent. Text is stored as character codes and font references, and vector graphics are stored as mathematical descriptions of shapes. These elements look perfectly sharp at any zoom level, and compressing the PDF does not degrade them at all. No matter how aggressively you compress, text remains text.

**Raster images** — photographs, scanned pages, screenshots — are resolution-dependent. They are stored as grids of pixels, and their quality is measured in DPI (dots per inch). Compression reduces image quality by lowering the DPI or increasing JPEG compression. This is where quality loss can occur.

The key insight is this: if your PDF is mostly text and vector graphics, you can compress it dramatically with zero quality loss. If it contains many photographs, you need to find the right balance.

## Lossless vs. Lossy Compression

PDF compression uses two types of techniques, and understanding the difference helps you make better decisions.

### Lossless Compression

Lossless compression reduces file size without discarding any data. The decompressed result is identical to the original. Techniques include:

- **Stream compression** — PDF content streams can be compressed with algorithms like FlateDecode (zlib/deflate). This is like creating a ZIP file of the internal data.
- **Removing duplicate resources** — PDFs sometimes embed the same font or image multiple times. Deduplication removes the copies.
- **Stripping metadata** — Creation dates, author names, editing history, and other metadata can be removed without affecting the visible document.

Lossless compression typically achieves 10–30% file size reduction. It is always safe and never affects visual quality.

### Lossy Compression

Lossy compression achieves much greater size reduction by permanently discarding some data. Techniques include:

- **Image downsampling** — reducing image resolution from, say, 300 DPI to 150 DPI. A 3000x2000 pixel image becomes 1500x1000 pixels.
- **JPEG recompression** — increasing JPEG compression level, which introduces artifacts but dramatically reduces image data size.
- **Color space conversion** — converting images from CMYK (4 channels) to RGB (3 channels) where print quality is not needed.

Lossy compression can achieve 50–80% reduction, but the results depend on how aggressive the settings are.

## Finding the Sweet Spot

The ideal compression level depends on how the PDF will be used:

### For Screen Viewing and Email

If the PDF will only be viewed on screens (computers, phones, tablets), 150 DPI is more than sufficient. Most screens display PDFs at 72–96 DPI, so 150 DPI provides excellent quality with significant headroom. At this setting, you can typically achieve 50–70% compression with no perceptible quality loss on screen.

### For Standard Printing

If the recipient might print the document on a regular office printer, 150–200 DPI maintains good print quality. Text will be perfectly sharp (it is vector, not raster), and images will look good at normal viewing distance.

### For Professional Printing

If the document is going to a print shop, you should either not compress it or use very light compression (high quality setting). Professional printing typically requires 300 DPI images and CMYK color spaces.

## Step-by-Step: Compress Without Visible Quality Loss

Here is the recommended workflow using [PDF Minify](https://pdfminify.com):

1. **Start with Medium compression.** Upload your PDF and select the medium compression level. This targets approximately 150 DPI for images and applies moderate JPEG compression.

2. **Check the result.** Download the compressed PDF and open it. Zoom in on the most important images. Do they look acceptable? For most documents, the answer is yes.

3. **If quality is not acceptable, try Low compression.** This uses lighter settings (around 200 DPI) and less JPEG compression. The file will be larger but closer to the original quality.

4. **If you need more compression, try High.** This targets around 100 DPI and uses aggressive JPEG compression. Text will still look perfect, but photographs will show some softness.

## Which PDFs Compress Well?

Not all PDFs compress equally. Here is what to expect:

| PDF Type | Typical Compression | Quality Impact |
|----------|-------------------|----------------|
| Text-only (reports, contracts) | 60–80% | None — text is vector |
| Text with a few charts | 40–60% | None to minimal |
| Presentation with photos | 50–70% | Minimal at medium |
| Scanned documents | 60–80% | Moderate — depends on DPI |
| Photo portfolios | 40–60% | Noticeable at high compression |
| CAD/engineering drawings | 10–20% | None — mostly vector |

## Before and After: Real-World Examples

### Business Report (30 pages, charts, tables)
- Original: 12 MB
- Medium compression: 3.2 MB (73% reduction)
- Quality difference: None visible. Charts and tables are vector elements that are not affected.

### Scanned Contract (15 pages, 300 DPI scans)
- Original: 25 MB
- Medium compression: 6.1 MB (76% reduction)
- Quality difference: Slight softening of scan texture, but all text remains clearly readable.

### Marketing Brochure (8 pages, full-bleed photos)
- Original: 18 MB
- Medium compression: 7.4 MB (59% reduction)
- Quality difference: Photos slightly less crisp when zoomed to 200%+, but perfect at normal viewing size.

## When Quality Loss Is Acceptable

There are many situations where some quality loss is perfectly fine:

- **Email attachments** — recipients view on screen at normal zoom. 150 DPI is excellent.
- **Internal documents** — meeting notes, internal reports, and drafts do not need perfect images.
- **Archival** — if you are archiving thousands of documents, the storage savings justify moderate compression.
- **Web downloads** — PDFs offered as downloads on websites should be as small as possible for fast loading.

## When to Preserve Full Quality

Keep the original uncompressed PDF in these situations:

- **Professional print production** — brochures, posters, and marketing materials going to a print shop.
- **Legal documents** — some jurisdictions require unaltered original documents.
- **Medical imaging** — diagnostic images must not be degraded.
- **Master copies** — always keep an uncompressed master and compress copies as needed.

## Conclusion

Reducing PDF file size without losing quality is not only possible — it is easy when you understand what gets compressed and why. Text and vector elements are never affected. Image quality depends on your compression settings, and for screen viewing, 150 DPI delivers excellent results with dramatic file size savings.

Use [PDF Minify](https://pdfminify.com) to compress your PDFs with adjustable quality levels. Start with medium compression, check the result, and adjust if needed. For most users, the [compress PDF for email](https://pdfminify.com/compress/compress-pdf-for-email) workflow delivers the perfect balance of size and quality.

Try it free at [pdfminify.com](https://pdfminify.com) — your text stays sharp, your images stay clear, and your files become dramatically smaller.
`
},

// ─── POST 6 ───
{
  title: "Compress PDF to Under 1 MB — When Every Kilobyte Matters",
  slug: "compress-pdf-to-under-1mb",
  excerpt: "Need your PDF under 1 MB? Learn maximum compression techniques, what to expect, and when 1 MB is achievable for different document types.",
  cover_image: null,
  tags: ["pdf", "compressor", "free compressor", "reduce size", "compress", "upload"],
  published: true,
  created_at: "2025-06-23T00:00:00Z",
  content: `## When Do You Need a PDF Under 1 MB?

There are surprisingly many situations where you need a PDF to be under 1 MB. Government portals, job application systems, and university submission platforms frequently impose strict file size limits. Some common examples include:

- **Government visa applications** — many countries limit supporting document uploads to 500 KB or 1 MB per file.
- **Job portals** — Workday, Taleo, and other applicant tracking systems often cap resume uploads at 1 MB.
- **Online forms** — insurance claims, permit applications, and banking forms frequently have 1 MB limits.
- **Email signature attachments** — if you include a PDF brochure in your email signature, it needs to be tiny.
- **Mobile-optimized downloads** — PDFs offered on mobile websites should be as small as possible.

The challenge is that 1 MB is quite small for a PDF. A single high-resolution photo can exceed 1 MB, so achieving this target requires understanding what is in your PDF and how compression works.

## Is 1 MB Realistic for Your Document?

The honest answer is: it depends on the content. Here are realistic expectations:

| Document Type | Pages | Likely Achievable? | Notes |
|--------------|-------|-------------------|-------|
| Text-only resume | 1-2 | Yes, easily | Often compresses to 100-300 KB |
| Resume with photo | 1-2 | Yes | Photo will be downsampled |
| Text report, no images | 5-10 | Yes | Text compresses very well |
| Report with charts | 5-10 | Usually | Charts are often vector, compress well |
| Presentation with photos | 10-20 | Difficult | May need to reduce image count |
| Scanned document | 5+ | Very difficult | Each page is a full image |
| Photo portfolio | Any | Unlikely | Photos are the content |

For text-heavy documents with few images, reaching 1 MB is straightforward. For image-heavy documents, it may require trade-offs.

## Maximum Compression Settings

To achieve the smallest possible file size with [PDF Minify](https://pdfminify.com), use the following approach:

### Step 1: Start with High Compression

Select the highest compression level available. This applies the most aggressive image downsampling (targeting around 72-100 DPI) and maximum JPEG compression. For screen-only viewing, this is perfectly acceptable.

### Step 2: Check the Result

After compression, check two things:
1. Is the file under 1 MB?
2. Is the content still readable?

If the answer to both is yes, you are done. If the file is still too large, continue to the next steps.

### Step 3: Consider What Can Be Removed

If maximum compression does not achieve 1 MB, the PDF likely contains content that inherently cannot be compressed further. Consider:

- **Remove unnecessary pages.** Does the recipient need every page? Remove appendices, cover pages, or blank pages.
- **Remove or resize images.** If possible, go back to the source document and reduce image sizes before re-exporting to PDF.
- **Simplify graphics.** Complex illustrations with many layers and gradients take more space than simple graphics.
- **Remove embedded fonts.** If the document uses uncommon fonts, each embedded font file adds to the PDF size. Switch to standard fonts like Arial, Times New Roman, or Helvetica.

### Step 4: Re-export from Source

If you have access to the original document (Word, PowerPoint, etc.), try re-exporting with optimized settings:

- **In Microsoft Word**: File → Save As → PDF → Minimum size (publishing online).
- **In PowerPoint**: File → Save As → PDF → Minimize size.
- **In Google Docs**: File → Download → PDF (Google Docs produces relatively compact PDFs).

Then compress the re-exported PDF for additional savings.

## Typical File Sizes After Maximum Compression

Here are real-world examples of what maximum compression achieves:

### One-Page Resume with Photo
- Original (Word export): 2.4 MB
- After maximum compression: 380 KB
- Result: Under 1 MB easily. Photo is slightly less sharp but perfectly presentable.

### Five-Page Business Proposal
- Original: 8.5 MB (includes company logo, product photos)
- After maximum compression: 1.1 MB
- Result: Close but over 1 MB. Removing one decorative background image brought it to 820 KB.

### Ten-Page Scanned Document (300 DPI)
- Original: 22 MB
- After maximum compression: 3.8 MB
- Result: Still over 1 MB. Scanned documents at 10 pages are extremely difficult to get under 1 MB while maintaining readability.

### Twenty-Page Text Report with Charts
- Original: 4.2 MB
- After maximum compression: 680 KB
- Result: Well under 1 MB. Charts are vector and compress losslessly. Text compresses dramatically.

## When 1 MB Is Not Achievable

Some documents simply cannot be compressed to 1 MB without destroying usability. If your PDF is a 20-page scanned document, each page is essentially a photograph. Even at 72 DPI with maximum JPEG compression, 20 full-page images will exceed 1 MB.

In these cases, consider these alternatives:

- **Split the document** into multiple files, each under 1 MB, and upload separately if the portal allows.
- **Convert scanned pages to searchable PDF** using OCR, then recreate the document with actual text instead of page images.
- **Contact the organization** that imposed the limit. Many will make exceptions for legitimate documents that cannot be reduced further.
- **Use a different format** if allowed. Some portals accept JPEG or PNG images instead of PDFs. Individual page images may be smaller than a multi-page PDF.

## Tips for Consistently Small PDFs

If you regularly need to create PDFs under 1 MB, adopt these habits:

### Design for Small Size

- Use standard system fonts instead of custom fonts.
- Use vector graphics (SVG, EMF) instead of raster images where possible.
- Keep image dimensions appropriate for the document — a 4000x3000 pixel photo in a small report is overkill.
- Use solid colors instead of gradient backgrounds.

### Optimize Images Before PDF Creation

- Resize photos to the actual display size needed. If an image will display at 2 inches wide, it only needs to be 300 pixels wide at 150 DPI.
- Save images as JPEG with 70-80% quality before inserting into your document.
- Remove EXIF data from photos before insertion.

### Export Smart

- Always select "minimum size" or "optimized for web" when exporting to PDF.
- Avoid "Print to PDF" when possible — use "Export to PDF" instead, as it produces better-optimized output.

## Conclusion

Getting a PDF under 1 MB is achievable for most text-based documents and documents with limited images. Start by compressing with [PDF Minify](https://pdfminify.com) at maximum settings, then optimize the source document if needed. For documents that must meet strict upload limits, the [compress PDF for email](https://pdfminify.com/compress/compress-pdf-for-email) workflow is a reliable starting point.

Visit [pdfminify.com](https://pdfminify.com) to compress your PDF right now — see exactly how small your file can get before uploading to any portal.
`
},

// ─── POST 7 ───
{
  title: "Best Free PDF Compressor Tools in 2026 — Honest Comparison",
  slug: "best-free-pdf-compressor-tools-2026",
  excerpt: "We tested 8 free PDF compressors in 2026. Compare features, privacy, speed, and compression quality. Find the best tool for your needs.",
  cover_image: null,
  tags: ["pdf", "compressor", "free compressor", "comparison", "compress"],
  published: true,
  created_at: "2025-07-07T00:00:00Z",
  content: `## How We Tested

We tested eight popular free PDF compressor tools using the same set of five test documents: a 15-page business report (8 MB), a 30-page scanned document (28 MB), a 10-slide presentation export (14 MB), a text-only contract (2 MB), and a photo-heavy brochure (22 MB). We evaluated each tool on compression ratio, output quality, processing speed, privacy practices, and user experience.

All tests were conducted in March 2026 using Chrome on Windows 11 and Safari on macOS Sonoma.

## The Tools We Tested

### 1. PDF Minify (pdfminify.com)

[PDF Minify](https://pdfminify.com) is a browser-based PDF compressor that processes files entirely in your browser using JavaScript. No files are uploaded to any server.

- **Compression**: Achieved 55-72% reduction across our test files. The adjustable slider provides good control over the quality-size trade-off.
- **Privacy**: Best in class. Files never leave your device. No server-side processing whatsoever.
- **Speed**: Fast for files under 20 MB. Larger files take longer since they are processed by your device's CPU.
- **Free tier**: Completely free with no limits on file size, number of files, or daily usage.
- **Batch support**: Yes, with ZIP download.
- **Verdict**: Best overall for privacy-conscious users and everyday compression needs.

### 2. iLovePDF (ilovepdf.com)

iLovePDF is one of the most popular online PDF tools, offering compression alongside dozens of other PDF utilities.

- **Compression**: Achieved 50-68% reduction. Three preset levels (extreme, recommended, less compression).
- **Privacy**: Files are uploaded to iLovePDF servers. They state files are deleted after 2 hours.
- **Speed**: Very fast due to server-side processing with powerful hardware.
- **Free tier**: Limited to one file at a time, daily file limits apply.
- **Batch support**: Yes, but limited in the free tier.
- **Verdict**: Good compression quality but requires uploading your documents to their servers.

### 3. Smallpdf (smallpdf.com)

Smallpdf offers a clean, modern interface with PDF compression and many other tools.

- **Compression**: Achieved 45-65% reduction. Two levels: basic (free) and strong (pro only).
- **Privacy**: Files uploaded to Smallpdf servers. Deleted after 1 hour per their policy.
- **Speed**: Fast server-side processing.
- **Free tier**: Limited to 2 tasks per day. Strong compression requires Pro subscription ($12/month).
- **Batch support**: Pro only.
- **Verdict**: Limited free tier makes it impractical for regular use without a subscription.

### 4. Adobe Acrobat Online (adobe.com/acrobat/online)

Adobe's online tools bring some of Acrobat's functionality to the browser.

- **Compression**: Achieved 48-70% reduction. Three levels available.
- **Privacy**: Files processed on Adobe's servers. Subject to Adobe's privacy policy.
- **Speed**: Moderate — requires Adobe account login which adds friction.
- **Free tier**: Limited to a few tasks per day. Full access requires Acrobat subscription ($22.99/month).
- **Batch support**: No batch in the free tier.
- **Verdict**: Good compression but limited free usage and requires an Adobe account.

### 5. PDF24 (tools.pdf24.org)

PDF24 is a German-developed suite of PDF tools available both online and as a desktop application.

- **Compression**: Achieved 50-65% reduction. Multiple DPI presets available.
- **Privacy**: Files uploaded to PDF24 servers in Germany. GDPR compliant.
- **Speed**: Moderate.
- **Free tier**: Completely free with no daily limits.
- **Batch support**: Yes, fully supported in the free tier.
- **Verdict**: Generous free tier with good features, but server-based processing.

### 6. pdfcompressor.com

A single-purpose tool focused exclusively on PDF compression.

- **Compression**: Achieved 40-58% reduction. Limited control over compression settings.
- **Privacy**: Server-based processing. Privacy policy is less detailed than competitors.
- **Speed**: Moderate to slow.
- **Free tier**: Free to use with ads.
- **Batch support**: Yes, up to 20 files.
- **Verdict**: Functional but ad-heavy, and compression results were consistently lower than competitors.

### 7. Sejda (sejda.com)

Sejda offers a comprehensive suite of PDF tools with both online and desktop versions.

- **Compression**: Achieved 45-60% reduction. Multiple quality options.
- **Privacy**: Files uploaded to servers. Deleted after 2 hours.
- **Speed**: Moderate.
- **Free tier**: 3 tasks per hour, file size limit of 50 MB, max 200 pages.
- **Batch support**: Limited in the free tier.
- **Verdict**: Decent compression but restrictive free tier limits.

### 8. HiPDF (hipdf.com)

HiPDF by Wondershare offers PDF compression alongside other tools.

- **Compression**: Achieved 42-62% reduction. Three compression levels.
- **Privacy**: Server-based processing. Part of the Wondershare ecosystem.
- **Speed**: Moderate.
- **Free tier**: Limited to 5 tasks per day.
- **Batch support**: Premium only.
- **Verdict**: Average compression quality with moderate free tier limitations.

## Comparison Table

| Tool | Avg. Reduction | Privacy | Free Limits | Batch | Best For |
|------|---------------|---------|-------------|-------|----------|
| PDF Minify | 63% | Browser-only | Unlimited | Yes | Privacy & daily use |
| iLovePDF | 59% | Server | Daily limit | Limited | Quick one-off tasks |
| Smallpdf | 55% | Server | 2/day | Pro only | Paid users |
| Adobe Online | 59% | Server | Few/day | No | Adobe subscribers |
| PDF24 | 57% | Server (EU) | Unlimited | Yes | EU users wanting GDPR |
| pdfcompressor | 49% | Server | Unlimited | Yes | Basic needs |
| Sejda | 52% | Server | 3/hour | Limited | Occasional use |
| HiPDF | 52% | Server | 5/day | Premium | Wondershare users |

## Key Findings

### Privacy Is the Biggest Differentiator

Most PDF compressors upload your files to remote servers for processing. This is a significant concern for confidential documents — contracts, financial statements, medical records, legal filings. PDF Minify is the only tool in our test that processes files entirely in the browser with zero server contact.

### "Free" Often Means "Limited"

Several tools advertise themselves as free but impose daily task limits (Smallpdf: 2/day, HiPDF: 5/day, Sejda: 3/hour). For users who need to compress multiple documents, these limits are frustrating. PDF Minify and PDF24 stand out for offering truly unlimited free usage.

### Compression Quality Is Comparable

The actual compression ratios across tools are surprisingly similar, ranging from 49% to 63% average reduction. The difference between the best and worst is not dramatic. This means your choice should be based more on privacy, convenience, and pricing than on compression performance alone.

### Server-Based Tools Are Faster for Very Large Files

For files over 50 MB, server-based tools like iLovePDF and Adobe generally process faster because they use powerful server hardware. Browser-based tools depend on your device's CPU, which can be slower for very large files on older computers or phones.

## Our Verdict

For most users, [PDF Minify](https://pdfminify.com) is the best choice. It offers competitive compression ratios, complete privacy, unlimited free usage, and works on any device with a browser. If you specifically need server-side speed for very large files and privacy is not a concern, iLovePDF is a solid alternative.

If you need to [compress PDFs for email](https://pdfminify.com/compress/compress-pdf-for-email) on a regular basis, having an unlimited free tool with no daily caps is essential. Bookmark [pdfminify.com](https://pdfminify.com) and you will always have a reliable compressor at your fingertips.
`
},

// ─── POST 8 ───
{
  title: "How to Compress Scanned PDFs — Tips for Maximum Size Reduction",
  slug: "compress-scanned-pdf-maximum-reduction",
  excerpt: "Scanned PDFs are image-heavy and often huge. Learn why they're so large and how to compress them by 60-80% without making text unreadable.",
  cover_image: null,
  tags: ["pdf", "compressor", "free compressor", "scanned pdf", "compress", "dpi"],
  published: true,
  created_at: "2025-07-21T00:00:00Z",
  content: `## Why Scanned PDFs Are So Much Larger Than Regular PDFs

A regular PDF created from a word processor stores text as character codes and formatting instructions. A 100-page text document might be just 500 KB because text is incredibly compact — each character takes about one byte.

A scanned PDF is fundamentally different. When you scan a paper document, the scanner captures a photograph of each page. That photograph is stored as a raster image inside the PDF. Instead of storing text characters, the PDF stores millions of pixels — every letter, every line, every background texture is captured as part of a full-page image.

At a typical scanning resolution of 300 DPI, a single letter-sized page produces an image of approximately 2550 x 3300 pixels — that is 8.4 million pixels. Even with JPEG compression, each page can be 1–3 MB. A 20-page scanned document easily reaches 20–60 MB.

This fundamental difference is why scanned PDFs require special attention when compressing.

## How Compression Works on Scanned PDFs

When you compress a scanned PDF, the primary technique is image downsampling — reducing the resolution (DPI) of each page image. Here is what happens at different DPI levels:

### 300 DPI (Original Scan Quality)
This is the standard scanning resolution. Images are sharp, text is crisp, and every detail is captured. However, files are large.

### 200 DPI
A good compromise for documents that need to remain very readable. Text is still sharp, fine details in diagrams are preserved. File size is reduced by approximately 40-50% compared to 300 DPI.

### 150 DPI
The sweet spot for most screen-based viewing. Text is perfectly readable, charts and diagrams are clear, and file size is 60-75% smaller than the 300 DPI original. This is the recommended setting for scanned documents you need to email or upload.

### 100 DPI
Aggressive compression. Text is readable but shows some softening. Fine details in images may be lost. Suitable when the document is for reference only and does not need to look polished.

### 72 DPI
Maximum compression. Text becomes noticeably fuzzy, especially smaller fonts. Only appropriate for documents where you just need to verify content exists, not read it carefully.

## Step-by-Step: Compress a Scanned PDF

### Using PDF Minify

1. Go to [pdfminify.com](https://pdfminify.com) in your browser.
2. Upload your scanned PDF.
3. For scanned documents, start with **Medium** compression (approximately 150 DPI output).
4. Click **Compress** and wait — scanned PDFs take slightly longer due to the large image data.
5. Download and check the result.

### Checking Readability

After compression, verify:
- Open the compressed PDF and zoom to 100% (actual size).
- Read a few paragraphs of normal text — is it comfortable to read?
- Check any small text (footnotes, table entries) — is it still legible?
- Look at any stamps, signatures, or handwritten notes — are they clear enough?

If everything passes these checks, your compression level is good. If small text is too blurry, try a lower compression setting.

## Results Table: Scanned PDF Compression

| Document | Pages | DPI | Original | 200 DPI | 150 DPI | 100 DPI |
|----------|-------|-----|----------|---------|---------|---------|
| Scanned contract | 10 | 300 | 15 MB | 8.2 MB | 5.1 MB | 3.4 MB |
| Scanned report | 25 | 300 | 38 MB | 19 MB | 12 MB | 7.8 MB |
| Scanned textbook chapter | 40 | 300 | 52 MB | 28 MB | 17 MB | 11 MB |
| Scanned form (color) | 5 | 300 | 12 MB | 6.5 MB | 4.2 MB | 2.8 MB |
| Scanned receipt (B&W) | 1 | 300 | 1.8 MB | 0.9 MB | 0.6 MB | 0.4 MB |

Color scans compress more than black-and-white scans in absolute terms because color images have three channels of data compared to one.

## OCR Before Compressing: A Powerful Strategy

OCR (Optical Character Recognition) converts the scanned images of text into actual searchable text. While OCR does not directly reduce file size — the images are still there — it enables a powerful workflow:

1. **Run OCR** on the scanned PDF using a tool like Adobe Acrobat, ABBYY FineReader, or a free OCR tool.
2. The OCR process creates a text layer on top of the page images.
3. Some advanced tools can then **replace page images** with the extracted text and reconstructed layout.
4. The resulting PDF is dramatically smaller because text characters replace full-page photographs.

This approach works best for documents that are primarily text. For documents with important visual elements (diagrams, photos, signatures), the OCR-and-replace approach may lose critical content.

## Tips for Better Scanned PDF Compression

### Scan at the Right Resolution

If you are doing the scanning yourself, choose your resolution wisely:
- **150 DPI** for documents that will only be viewed on screen.
- **200 DPI** for documents that might be printed occasionally.
- **300 DPI** only for archival originals or documents requiring the highest quality.

Scanning at a lower DPI from the start produces smaller files before any compression.

### Use Grayscale Instead of Color

If the document is primarily text (contracts, letters, forms), scan in grayscale instead of color. Grayscale images are one-third the size of color images because they have one channel instead of three.

### Clean Up Before Scanning

Remove sticky notes, paper clips, and anything that adds unnecessary visual content. These items add complexity to the scanned image without adding document value.

### Scan Both Sides

If your document is double-sided, use a duplex scanner. Scanning single-sided and accidentally including blank backs doubles your page count and file size.

## Handling Very Large Scanned PDFs

For scanned PDFs over 100 MB (common in legal, medical, and archival contexts), consider:

- **Processing in chunks** — split the PDF into 20-30 page sections, compress each, then recombine.
- **Using desktop tools** — for files over 100 MB, desktop tools like Ghostscript may handle the processing more reliably than browser-based tools, due to memory constraints.
- **Compressing overnight** — very large files may take several minutes to process. Start the compression and let it run.

## The Bottom Line

Scanned PDFs are uniquely challenging because they are entirely composed of images. However, compression can still achieve 60-80% size reduction at 150 DPI while maintaining perfectly readable text. Use [PDF Minify](https://pdfminify.com) to compress your scanned documents quickly and privately, and consider the [compress PDF for email](https://pdfminify.com/compress/compress-pdf-for-email) workflow when you need to share scanned documents electronically.

For the best results, combine smart scanning practices (appropriate DPI, grayscale when possible) with effective compression. Visit [pdfminify.com](https://pdfminify.com) to start compressing your scanned PDFs today.
`
},

// ─── POST 9 ───
{
  title: "PDF File Too Large? 7 Reasons Why and How to Fix Each One",
  slug: "pdf-file-too-large-reasons-and-fixes",
  excerpt: "Your PDF is too large to email or upload. Here are the 7 most common reasons PDFs grow oversized — and specific fixes for each one.",
  cover_image: null,
  tags: ["pdf", "compressor", "free compressor", "reduce size", "optimization"],
  published: true,
  created_at: "2025-08-04T00:00:00Z",
  content: `## Why Your PDF Became So Large

You created a simple document — maybe a report, a form, or a presentation. When you exported it to PDF, the result was unexpectedly enormous. A 10-page document should not be 40 MB, yet here you are, unable to email it or upload it to a portal.

PDF bloat happens for specific, identifiable reasons. Understanding the cause helps you choose the most effective fix. Here are the seven most common culprits and exactly how to address each one.

## Reason 1: High-Resolution Embedded Images

**The Problem:** This is the number one reason for oversized PDFs. When you insert a photo into a Word document or PowerPoint presentation, the full-resolution image is embedded in the PDF — even if it displays at a small size on the page. A 12-megapixel photo from a smartphone is approximately 4000 x 3000 pixels and can be 5-8 MB in JPEG format. If your document has 10 such images, they alone account for 50-80 MB.

**The Fix:** Compress the PDF to downsample images to an appropriate resolution. For screen viewing, 150 DPI is more than sufficient. Use [PDF Minify](https://pdfminify.com) with medium compression to automatically downsample all images in the document. Alternatively, resize images in your source document before exporting to PDF.

## Reason 2: Uncompressed Content Streams

**The Problem:** PDFs store their content in internal data streams. These streams can be compressed (using algorithms like FlateDecode/zlib) or stored raw. Some PDF creation tools, especially older ones or "Print to PDF" drivers, do not compress these streams. The raw data takes significantly more space than compressed data.

**The Fix:** Running the PDF through a compressor applies stream compression automatically. Even without changing image quality, this alone can reduce file size by 15-30% for uncompressed PDFs. [PDF Minify](https://pdfminify.com) applies FlateDecode compression to all content streams.

## Reason 3: Embedded Fonts (Full Character Sets)

**The Problem:** When a PDF embeds a font, it can include either a subset (only the characters used in the document) or the complete font file. A complete font file can be 500 KB to several megabytes. If your document uses five custom fonts, that is 2.5-15 MB just in font data.

**The Fix:** When exporting from your source application, enable "Subset embedded fonts" if available. In Word, go to File → Options → Save and check "Embed only the characters used in the document." If the PDF is already created, compression tools can sometimes optimize font data, but the most effective fix is at the source.

## Reason 4: Hidden Layers and Unused Content

**The Problem:** PDFs can contain hidden layers, deleted but not purged content, and objects that are not visible on any page. This happens frequently with PDFs created by design tools like Adobe InDesign, Illustrator, or Photoshop. Each hidden layer retains all its content data even though it is not visible.

**The Fix:** In Adobe Acrobat Pro, use Edit → Preflight → PDF Fixups → Remove hidden layers. For a quicker approach, compressing the PDF with a tool like [PDF Minify](https://pdfminify.com) can strip some of this unused content. For documents from design tools, export a "flat" PDF without layer preservation.

## Reason 5: Excessive DPI for the Document's Purpose

**The Problem:** Many scanning apps and document creation tools default to 300 DPI or even 600 DPI. While 300 DPI is appropriate for professional printing, it is overkill for documents that will only be viewed on screens (which typically display at 72-150 DPI). A document at 300 DPI contains four times the pixel data of the same document at 150 DPI.

**The Fix:** Downsample to the DPI appropriate for your use case. For email and screen viewing, 150 DPI is ideal. For web downloads, 100-120 DPI is often sufficient. Use [PDF Minify's](https://pdfminify.com) compression slider to choose your target quality level.

## Reason 6: Duplicate Resources

**The Problem:** Some PDF creation tools embed the same image or font multiple times if it appears on multiple pages. Instead of referencing a single copy, they create duplicates. A company logo that appears on every page of a 50-page document could be embedded 50 times.

**The Fix:** PDF optimization tools can detect and deduplicate these resources. When the same image is referenced multiple times, a single copy can be shared across all pages. This fix can produce dramatic savings for documents with repeated elements.

## Reason 7: Excessive Metadata and Thumbnails

**The Problem:** PDFs can store extensive metadata: author information, revision history, creation tool details, XMP metadata, and page thumbnails. Page thumbnails are small preview images of each page — in a 100-page document, the thumbnails alone can add several megabytes.

**The Fix:** Metadata stripping is one of the simplest optimizations. It removes non-essential data without affecting the document's appearance or content in any way. Most PDF compressors, including [PDF Minify](https://pdfminify.com), remove unnecessary metadata during compression.

## The Quick Fix: Compress Everything at Once

While understanding the reasons is useful for prevention, the fastest solution for an existing oversized PDF is to compress it with a tool that addresses all seven issues simultaneously.

[PDF Minify](https://pdfminify.com) handles:
- Image downsampling (Reason 1, 5)
- Stream compression (Reason 2)
- Content optimization (Reason 4, 6)
- Metadata removal (Reason 7)

In most cases, a single compression pass reduces file size by 40-70%, solving the immediate problem in seconds.

## Prevention: Creating Smaller PDFs from the Start

### In Microsoft Office
- Go to File → Options → Advanced → Image Size and Quality.
- Check "Discard editing data" and set default resolution to 150 PPI.
- When saving as PDF, select "Minimum size (publishing online)."

### In Google Docs
- Google Docs generally produces compact PDFs. If your document is still large, it is usually due to embedded images. Resize images before inserting them.

### In Adobe InDesign
- Export with the "Smallest File Size" preset.
- Under Compression, set all images to Bicubic Downsampling at 150 PPI.
- Under Output, choose RGB for screen-only documents.

### When Scanning
- Scan at 150 DPI for screen-only documents.
- Use grayscale instead of color for text documents.
- Use the scanner's built-in compression options.

## Conclusion

An oversized PDF is not a mystery — it is the result of specific, fixable causes. Whether it is high-resolution images, uncompressed streams, or duplicate resources, every byte of bloat has a reason. The fastest fix is to compress with [PDF Minify](https://pdfminify.com), which addresses multiple causes in a single pass. For ongoing prevention, adjust your document creation settings to produce leaner PDFs from the start.

Need to [compress a PDF for email](https://pdfminify.com/compress/compress-pdf-for-email) right now? Visit [pdfminify.com](https://pdfminify.com) and drag your file in — it takes less than a minute.
`
},

// ─── POST 10 ───
{
  title: "How to Batch Compress Multiple PDFs at Once — Save Hours",
  slug: "batch-compress-multiple-pdfs",
  excerpt: "Need to compress 10 or 20 PDFs at once? Learn how batch compression works and why it's faster than compressing one file at a time.",
  cover_image: null,
  tags: ["pdf", "compressor", "free compressor", "batch", "compress", "zip"],
  published: true,
  created_at: "2025-08-18T00:00:00Z",
  content: `## When Do You Need Batch PDF Compression?

Individual PDF compression is fine when you have one file to shrink. But what about these scenarios?

- **End of quarter:** You need to compress 25 monthly reports before archiving them.
- **Office migration:** Hundreds of PDFs need to be optimized for a new document management system with file size limits.
- **Email campaign:** You are sending different PDF brochures to different client segments and need all of them under 5 MB.
- **Legal filing:** A case file contains 15 exhibits, each needing to meet a court's upload size limit.
- **Academic submission:** A research paper with supplementary materials — all separate PDFs, all needing to fit upload limits.

Compressing these one at a time is tedious and time-consuming. Batch compression processes all files simultaneously, turning an hour-long task into a five-minute one.

## How Batch Compression Works

Batch PDF compression applies the same compression settings to multiple files in a single operation. Instead of uploading, configuring, compressing, and downloading each file individually, you select all your files at once, choose your settings, and let the tool process them all.

### The Basic Workflow

1. **Select multiple files** — either by multi-selecting in the file picker or dragging a group of files onto the upload area.
2. **Choose compression settings** — the same quality level applies to all files.
3. **Start compression** — all files are processed, either simultaneously or in sequence.
4. **Download results** — compressed files are packaged in a ZIP file for convenient download.

### Browser-Based Batch Processing

With [PDF Minify](https://pdfminify.com), batch compression runs entirely in your browser. Each file is processed sequentially using your device's CPU. The advantage is that none of your documents are uploaded to any server, which is critical for confidential business documents. The trade-off is that processing time depends on your device's performance.

## Step-by-Step: Batch Compress with PDF Minify

### Step 1: Select Your Files

Go to [pdfminify.com](https://pdfminify.com). You can add multiple files by:
- Clicking the upload area and holding Ctrl (Windows) or Cmd (Mac) to select multiple files.
- Dragging multiple files from your file explorer onto the upload area.

### Step 2: Configure Compression

Choose your compression level. For batch processing, consider:
- **Medium** — best all-around choice. Good compression with minimal quality impact.
- **High** — if you need maximum size reduction and quality is secondary (e.g., internal archives).
- **Low** — if the documents contain important images that need to stay sharp.

The same setting applies to all files in the batch.

### Step 3: Process

Click **Compress**. You will see progress indicators for each file. Processing time depends on the number of files and their sizes:
- 5 files, 5-10 MB each: approximately 15-30 seconds.
- 10 files, 10-20 MB each: approximately 1-3 minutes.
- 20 files, various sizes: approximately 3-5 minutes.

### Step 4: Download

When processing completes, download individual compressed files or get all of them as a ZIP archive. The ZIP download is the most convenient option — it preserves the original filenames with a compression suffix.

## Organizing Your Files Before Batch Compression

For large batch operations, some preparation saves time and prevents confusion:

### Group by Compression Needs

Not all documents need the same compression level. Separate your files into groups:
- **Standard documents** (reports, forms, letters) — medium compression.
- **Image-heavy documents** (brochures, presentations) — test with medium first, adjust if needed.
- **High-importance documents** (client deliverables, legal filings) — low compression to maximize quality.

Process each group separately with appropriate settings.

### Establish a Naming Convention

Before compressing, ensure your files have clear, descriptive names. After compression, you will have both originals and compressed versions. A naming convention prevents confusion:
- Original: Q4-Report-2025.pdf
- Compressed: Q4-Report-2025-compressed.pdf

Most batch tools add a suffix automatically, but check the output to confirm.

### Create a Backup

Before any batch operation, copy your original files to a backup folder. While compression creates new files and does not modify originals, having a backup ensures you can always start over.

## Time Comparison: Individual vs. Batch

Here is a realistic comparison for compressing 20 PDF files:

### Individual Processing

For each file:
1. Navigate to the tool (5 seconds — if already open).
2. Upload the file (5-10 seconds).
3. Configure settings (5 seconds).
4. Wait for compression (10-20 seconds).
5. Download the result (5-10 seconds).

Total per file: approximately 30-50 seconds.
Total for 20 files: approximately 10-17 minutes.

### Batch Processing

1. Select all 20 files at once (15 seconds).
2. Configure settings once (5 seconds).
3. Wait for compression (2-4 minutes for all files).
4. Download ZIP (10 seconds).

Total for 20 files: approximately 3-5 minutes.

Batch processing saves 60-70% of the time, and the savings scale linearly — the more files you have, the more time you save.

## Tips for Large Batch Operations

### Start with a Test File

Before committing to a batch of 50 files, compress one representative file first. Check the quality and file size. If the results are good, proceed with the full batch.

### Monitor Browser Memory

Browser-based batch processing uses your device's RAM. For very large batches (30+ files, each over 20 MB), your browser might run low on memory. If you notice the browser slowing down, process files in smaller batches of 10-15.

### Keep the Tab Active

During browser-based processing, keep the browser tab active and in the foreground. Some browsers throttle background tabs to save resources, which can slow down or interrupt processing.

### Verify Results

After batch compression, spot-check a few files to ensure quality is acceptable. Open the most image-heavy file in the batch and verify that graphics are still clear and text is sharp.

## Batch Compression for Teams

If your team regularly needs to compress PDFs, consider establishing a standard workflow:

1. **Designate a compression standard** — agree on which compression level to use for different document types.
2. **Create a shared process document** — brief instructions so anyone on the team can batch compress files.
3. **Schedule regular optimization** — compress accumulated documents weekly or monthly to prevent storage bloat.

## Conclusion

Batch compression transforms a tedious, repetitive task into a quick operation. Whether you are archiving quarterly reports, preparing documents for a filing system, or optimizing your team's shared drive, processing multiple files at once saves significant time.

Use [PDF Minify](https://pdfminify.com) for private, browser-based batch compression with no daily limits. For regular document management tasks like [compressing PDFs for email](https://pdfminify.com/compress/compress-pdf-for-email), batch processing is the efficient way to handle volume.

Visit [pdfminify.com](https://pdfminify.com) and try batch compressing your next set of PDFs — you will never go back to one-at-a-time processing.
`
},
];

const allPosts = [...posts, ...posts11to20, ...posts21to30];

async function seed() {
  console.log(`Starting blog post seed... (${allPosts.length} posts)`);

  for (let i = 0; i < allPosts.length; i++) {
    const post = allPosts[i];
    console.log(`[${i + 1}/${allPosts.length}] Upserting: ${post.title}`);

    const { error } = await supabase
      .from('posts')
      .upsert(
        {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          cover_image: post.cover_image,
          tags: post.tags,
          published: post.published,
          created_at: post.created_at,
        },
        { onConflict: 'slug' }
      );

    if (error) {
      console.error(`  ERROR: ${error.message}`);
    } else {
      console.log(`  OK`);
    }
  }

  console.log('\nSeed complete!');
}

seed().catch(console.error);
