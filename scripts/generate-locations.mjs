/**
 * Generates Sunshine Coast suburb SEO landing pages + /locations hub + sitemap.xml + robots.txt.
 * Extend: edit scripts/location-seo-data.json (add object) then run: node scripts/generate-locations.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SITE = 'https://waymakerrubbishsolutions.com.au';
const PHONE_TEL = '0423101334';
const PHONE_DISP = '0423 101 334';
const EMAIL = 'mattpascua89@gmail.com';
const LASTMOD = '2026-08-07';
const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=Waymaker+Rubbish+Solutions+Reviews&hl=en';

const dataPath = path.join(__dirname, 'location-seo-data.json');
const LOCATIONS = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

/** Slugs with dedicated before/after images; others use location-before.jpg / location-after.jpg */
const CUSTOM_BEFORE_AFTER = {
  'rubbish-removal-maroochydore': 'maroochydore',
  'rubbish-removal-nambour': 'nambour',
  'junk-removal-aura': 'aura',
  'rubbish-removal-buderim': 'buderim',
  'rubbish-removal-noosa': 'noosa',
  'rubbish-removal-coolum-beach': 'coolum-beach',
  'rubbish-removal-kawana-waters': 'kawana-waters',
};

const HUB_INTRO = [
  'Looking for reliable rubbish removal on the Sunshine Coast? Waymaker Rubbish Solutions provides straightforward rubbish removal for homes, businesses, real estate agencies, builders and property managers across the region.',
  'From unwanted furniture and household rubbish to renovation waste, property clean outs and larger commercial clearances, our team handles the lifting, loading and disposal from start to finish.',
  'We are an owner operated Sunshine Coast business offering upfront quotes, professional service and a simple alternative to hiring and loading a skip bin yourself.',
  'Choose your area below to learn more about our rubbish removal services near you, or send us photos of what needs to go for a quick quote.',
];

const HUB_RUBBISH_ITEMS = [
  'Household rubbish',
  'Old furniture',
  'Mattresses',
  'Whitegoods',
  'Garage and shed clutter',
  'Green waste',
  'Renovation waste',
  'Moving and downsizing rubbish',
  'End of lease rubbish',
  'Deceased estate rubbish',
  'Office and commercial rubbish',
  'Property clean out waste',
];

const LOCATION_RUBBISH_ITEMS = [
  'Household rubbish',
  'Old furniture',
  'Mattresses',
  'Whitegoods',
  'Garage and shed clutter',
  'Green waste',
  'Moving and downsizing rubbish',
  'Renovation waste',
  'End of lease rubbish',
  'Office furniture',
  'General commercial rubbish',
  'Deceased estate rubbish',
];

const PLACE_TO_SLUG = Object.fromEntries(LOCATIONS.map((l) => [l.place, l.slug]));

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function otherSlugs(current) {
  return LOCATIONS.filter((l) => l.slug !== current).map((l) => l.slug);
}

function standardFaqs(place) {
  return [
    {
      q: `How much does rubbish removal cost in ${place}?`,
      a: 'Pricing depends on how much rubbish needs to be removed, the type of materials and access to the property. Smaller collections generally start from our standard small load pricing, while larger clean outs are quoted according to volume. Send us a few photos for a quick estimate.',
    },
    {
      q: 'Do you load the rubbish for me?',
      a: 'Yes. Our team handles the lifting and loading as part of the service. You simply show us what needs to go and we take care of the rest.',
    },
    {
      q: 'Do I need to hire a skip bin?',
      a: 'No. Waymaker provides a full rubbish removal service, so there is no need to hire or load a skip bin. We load the rubbish directly and take it away.',
    },
    {
      q: 'What types of rubbish do you remove?',
      a: 'We remove many common types of household rubbish, furniture, green waste, property waste and renovation rubbish. Heavy materials and specialised waste may require a separate quote. Send us a photo if you are unsure about a particular item.',
    },
    {
      q: 'Can you remove furniture and mattresses?',
      a: 'Yes. We can remove unwanted furniture, mattresses and other bulky household items as part of a larger clean out or as a smaller collection.',
    },
    {
      q: `Do you provide commercial rubbish removal in ${place}?`,
      a: 'Yes. Waymaker assists businesses, property managers, real estate agencies and commercial clients with rubbish removal and property clearances.',
    },
    {
      q: 'How do I get a rubbish removal quote?',
      a: `Call Waymaker on ${PHONE_DISP} or send us photos showing what needs to be removed along with the property location. We will provide a straightforward quote based on the job.`,
    },
  ];
}

function pricingTableHtml() {
  return `
        <div class="overflow-x-auto max-w-full rounded-xl border border-dark/10">
          <table class="w-full text-left text-sm sm:text-base min-w-[32rem]">
            <thead><tr class="bg-dark text-white"><th class="py-3 px-4">Load size</th><th class="py-3 px-4">Typical price</th><th class="py-3 px-4">Good for</th></tr></thead>
            <tbody>
          <tr class="border-b border-dark/10">
            <td class="py-3 pr-4 font-medium text-dark">Small Load</td>
            <td class="py-3 pr-4 font-heading font-bold text-logo whitespace-nowrap">$120 to $180</td>
            <td class="py-3 text-dark/70 text-sm">A few items, boxes or a small cleanup</td>
          </tr>
          <tr class="border-b border-dark/10">
            <td class="py-3 pr-4 font-medium text-dark">1/4 10 x 5 Trailer Load</td>
            <td class="py-3 pr-4 font-heading font-bold text-logo whitespace-nowrap">$180 to $250</td>
            <td class="py-3 text-dark/70 text-sm">Small household cleanouts or bulky items</td>
          </tr>
          <tr class="border-b border-dark/10">
            <td class="py-3 pr-4 font-medium text-dark">1/2 10 x 5 Trailer Load</td>
            <td class="py-3 pr-4 font-heading font-bold text-logo whitespace-nowrap">$250 to $300</td>
            <td class="py-3 text-dark/70 text-sm">Furniture, household junk or renovation waste</td>
          </tr>
          <tr class="border-b border-dark/10">
            <td class="py-3 pr-4 font-medium text-dark">3/4 10 x 5 Trailer Load</td>
            <td class="py-3 pr-4 font-heading font-bold text-logo whitespace-nowrap">$300 to $350</td>
            <td class="py-3 text-dark/70 text-sm">Larger cleanouts and mixed rubbish</td>
          </tr>
          <tr class="border-b border-dark/10">
            <td class="py-3 pr-4 font-medium text-dark">Full 10 x 5 Trailer Load</td>
            <td class="py-3 pr-4 font-heading font-bold text-logo whitespace-nowrap">$350 to $450</td>
            <td class="py-3 text-dark/70 text-sm">Maximum standard load for bigger cleanups</td>
          </tr>
          <tr class="border-b border-dark/10 bg-logo/10">
            <td class="py-3 pr-4 font-medium text-dark">Full Ute Load and 10 x 5 Trailer Load</td>
            <td class="py-3 pr-4 font-heading font-bold text-logo whitespace-nowrap">from $650</td>
            <td class="py-3 text-dark/70 text-sm">Maximum standard load for bigger cleanups</td>
          </tr>
          <tr class="border-b border-dark/10">
            <td class="py-3 pr-4 font-medium text-dark">Heavy Materials</td>
            <td class="py-3 pr-4 font-heading font-bold text-logo whitespace-nowrap">Custom quote</td>
            <td class="py-3 text-dark/70 text-sm">Concrete, soil, bricks, tiles and other heavy waste</td>
          </tr></tbody>
          </table>
        </div>
        <p class="text-dark/80 text-sm sm:text-base leading-relaxed mt-6">Heavy materials such as concrete, soil, bricks and tiles require a custom quote due to their weight and disposal costs. Specialised or regulated waste may also require separate disposal arrangements.</p>
        <figure class="mt-6 rounded-xl overflow-hidden border border-dark/10 shadow-md bg-offwhite">
          <img src="../assets/location-full-load.jpg" alt="Waymaker ute and caged trailer fully loaded with mattresses and furniture for rubbish removal" class="block w-full h-auto object-cover" width="1024" height="517" loading="lazy" decoding="async" />
        </figure>`;
}

function rubbishGrid(items) {
  return `<ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">${items
    .map(
      (item) =>
        `<li class="rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark/80 text-sm sm:text-base shadow-sm">${esc(item)}</li>`
    )
    .join('')}</ul>`;
}

function nearbyPills(nearby) {
  return nearby
    .map((n) => {
      const slug = PLACE_TO_SLUG[n];
      if (slug) {
        return `<a href="../${slug}/" class="inline-flex items-center px-3 py-1 rounded-full bg-white border border-primary/25 text-dark text-sm font-medium hover:border-logo hover:text-logo transition">${esc(n)}</a>`;
      }
      return `<span class="inline-flex items-center px-3 py-1 rounded-full bg-white border border-primary/25 text-dark text-sm font-medium">${esc(n)}</span>`;
    })
    .join('\n');
}

function hubLinksHtml(currentSlug) {
  return otherSlugs(currentSlug)
    .slice(0, 6)
    .map((s) => {
      const p = LOCATIONS.find((x) => x.slug === s);
      return `<a href="../${s}/" class="text-logo font-semibold hover:underline">${esc(p.place)}</a>`;
    })
    .join(' &middot; ');
}

function beforeAfterImages(loc) {
  const custom = CUSTOM_BEFORE_AFTER[loc.slug];
  const beforeFile = custom ? `${custom}-before.jpg` : 'location-before.jpg';
  const afterFile = custom ? `${custom}-after.jpg` : 'location-after.jpg';
  const beforeAlt = custom
    ? `Household rubbish piled before removal in ${loc.place}`
    : 'Household rubbish piled before removal';
  const afterAlt = custom
    ? `Cleared area after rubbish removal in ${loc.place}`
    : 'Cleared area after rubbish removal';
  return { beforeFile, afterFile, beforeAlt, afterAlt };
}

function reviewsCarousel() {
  return `
      <div class="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 max-w-full scroll-smooth" aria-label="Customer reviews carousel">
        <article class="snap-start shrink-0 w-[min(100%,22rem)] sm:w-80 card-hover bg-white rounded-2xl p-5 shadow-lg border-2 border-logo/45">
          <div class="flex gap-1 mb-2 text-[#fbbc04]" aria-hidden="true">${'<i class="fa-solid fa-star"></i>'.repeat(5)}</div>
          <p class="text-dark/85 text-sm leading-relaxed mb-3">&ldquo;Awesome service from Matt and his team — fast response, excellent communication, and went over and above to accommodate our needs quickly. Would highly recommend!&rdquo;</p>
          <p class="font-heading font-bold text-dark text-sm">Alana Paulin</p>
          <p class="text-dark/50 text-xs">7 reviews</p>
        </article>
        <article class="snap-start shrink-0 w-[min(100%,22rem)] sm:w-80 card-hover bg-white rounded-2xl p-5 shadow-lg border-2 border-logo/45">
          <div class="flex gap-1 mb-2 text-[#fbbc04]" aria-hidden="true">${'<i class="fa-solid fa-star"></i>'.repeat(5)}</div>
          <p class="text-dark/85 text-sm leading-relaxed mb-3">&ldquo;Matthew was very friendly, and did such a great job with removing rubbish and taking it to the tip. 100% recommend his service.&rdquo;</p>
          <p class="font-heading font-bold text-dark text-sm">Luke P</p>
          <p class="text-dark/50 text-xs">1 review</p>
        </article>
        <article class="snap-start shrink-0 w-[min(100%,22rem)] sm:w-80 card-hover bg-white rounded-2xl p-5 shadow-lg border-2 border-logo/45">
          <div class="flex gap-1 mb-2 text-[#fbbc04]" aria-hidden="true">${'<i class="fa-solid fa-star"></i>'.repeat(5)}</div>
          <p class="text-dark/85 text-sm leading-relaxed mb-3">&ldquo;I cant speak highly enough about Matts work ethic. He does everything with great punctuality, pricing and thoroughness. I would recommend his services to anyone wanting the job done right&rdquo;</p>
          <p class="font-heading font-bold text-dark text-sm">G J</p>
          <p class="text-dark/50 text-xs">1 review</p>
        </article>
        <article class="snap-start shrink-0 w-[min(100%,22rem)] sm:w-80 card-hover bg-white rounded-2xl p-5 shadow-lg border-2 border-logo/45">
          <div class="flex gap-1 mb-2 text-[#fbbc04]" aria-hidden="true">${'<i class="fa-solid fa-star"></i>'.repeat(5)}</div>
          <p class="text-dark/85 text-sm leading-relaxed mb-3">&ldquo;Matt was great to deal with, kept me informed with all processes and timing. Would definitely use his services again.&rdquo;</p>
          <p class="font-heading font-bold text-dark text-sm">Wendy Lower</p>
          <p class="text-dark/50 text-xs">2 reviews</p>
        </article>
      </div>
      <p class="text-center mt-6">
        <a href="${esc(GOOGLE_REVIEWS_URL)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center rounded-full border-2 border-logo/45 bg-logo/10 px-6 py-3 font-heading text-base font-bold text-logo shadow-sm transition hover:bg-logo/15">Read more on Google</a>
      </p>`;
}

function navFragment(prefix) {
  const home = `${prefix}index.html`;
  return `
  <header id="navbar" class="waymaker-site-header fixed top-0 left-0 right-0 z-50 nav-scrolled">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full max-w-full min-w-0" aria-label="Main navigation">
      <div class="flex items-stretch min-w-0 min-h-[4.25rem] h-20 gap-0">
        <a href="${home}" class="logo-brand inline-flex min-w-0 flex-1 items-center self-center py-1.5 pr-1 lg:flex-none lg:shrink-0 lg:pr-0 lg:py-0 transition-all bg-transparent">
          <img src="${prefix}assets/waymaker-logo.png" alt="Way Maker Rubbish Solutions logo" class="h-16 sm:h-20 md:h-24 lg:h-28 w-auto max-w-full object-contain object-left" width="280" height="80" loading="eager" decoding="async" />
        </a>
        <div class="waymaker-nav-bar-tray">
          <div class="hidden lg:flex shrink-0 items-center gap-2 xl:gap-3 flex-wrap justify-end">
            <a href="${home}#about" class="text-white/90 hover:text-primary transition font-medium text-base xl:text-lg">About</a>
            <a href="${home}#services" class="text-white/90 hover:text-primary transition font-medium text-base xl:text-lg">Our Services</a>
            <a href="${home}#google-reviews" class="text-white/90 hover:text-primary transition font-medium text-base xl:text-lg">Reviews</a>
            <a href="${home}#areas" class="text-white/90 hover:text-primary transition font-medium text-base xl:text-lg">Coverage Areas</a>
            <a href="${home}#contact" class="text-white/90 hover:text-primary transition font-medium text-base xl:text-lg">Contact</a>
            <a href="${home}#contact" class="nav-quote-cta" aria-label="Request a quote">Get a Quote</a>
          </div>
          <button id="menu-toggle" type="button" class="lg:hidden shrink-0 self-center text-white p-2.5 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
            <i class="fa-solid fa-bars text-2xl" id="menu-icon-open" aria-hidden="true"></i>
            <i class="fa-solid fa-xmark text-2xl hidden" id="menu-icon-close" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </nav>
  </header>
  <div id="mobile-menu" class="waymaker-mobile-nav lg:hidden fixed inset-0 z-[10000] flex-col overscroll-contain" data-open="false" role="dialog" aria-modal="true" aria-label="Mobile navigation" aria-hidden="true">
    <div class="waymaker-mobile-nav-panel mobile-menu-panel">
      <a href="${home}#about" class="waymaker-mobile-nav-link">About</a>
      <a href="${home}#services" class="waymaker-mobile-nav-link">Our Services</a>
      <a href="${home}#google-reviews" class="waymaker-mobile-nav-link">Reviews</a>
      <a href="${home}#areas" class="waymaker-mobile-nav-link">Coverage Areas</a>
      <a href="${home}#contact" class="waymaker-mobile-nav-link">Contact Us</a>
      <a href="tel:${PHONE_TEL}" class="waymaker-mobile-nav-cta waymaker-mobile-nav-cta--call"><i class="fa-solid fa-phone shrink-0" aria-hidden="true"></i> Call ${PHONE_DISP}</a>
      <a href="${home}#contact" class="waymaker-mobile-nav-cta waymaker-mobile-nav-cta--quote">Get a Quote</a>
    </div>
  </div>`;
}

function footerFragment(prefix) {
  const home = `${prefix}index.html`;
  const locLinks = LOCATIONS.map(
    (l) =>
      `<a href="${prefix}${l.slug}/" class="text-white/75 hover:text-primary text-sm font-medium">${esc(l.place)}</a>`
  ).join('\n');
  return `
  <footer class="bg-dark border-t border-white/10 py-12 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="flex flex-wrap gap-x-4 gap-y-2 items-center justify-center" aria-label="Footer navigation">
          <a href="${home}" class="text-white/90 hover:text-primary font-medium">Home</a>
          <a href="${prefix}locations/" class="text-white/90 hover:text-primary font-medium">Service areas</a>
          <a href="${home}#about" class="text-white/90 hover:text-primary font-medium">About</a>
          <a href="${home}#contact" class="text-white/90 hover:text-primary font-medium">Contact</a>
      </nav>
      <div class="mt-10 pt-8 border-t border-white/10">
        <p class="text-center text-logo font-heading font-bold text-sm uppercase tracking-wider mb-4">Service area pages</p>
        <div class="flex flex-wrap justify-center gap-x-4 gap-y-2"><a href="${prefix}locations/" class="text-white/75 hover:text-primary text-sm font-medium">All suburbs</a>${locLinks}</div>
      </div>
      <p class="text-center text-white/45 text-sm mt-10">&copy; ${new Date().getFullYear()} Waymaker Rubbish Solutions</p>
    </div>
  </footer>`;
}

function faqSection(loc, faqs) {
  const items = faqs
    .map(
      (f, i) => `
    <div class="border border-dark/10 rounded-xl overflow-hidden bg-white mb-3">
      <button type="button" class="loc-faq-btn w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-heading font-bold text-dark hover:bg-offwhite transition" aria-expanded="false" id="faq-btn-${i}">
        <span class="min-w-0 pr-2">${esc(f.q)}</span>
        <i class="fa-solid fa-chevron-down loc-faq-icon text-logo transition-transform shrink-0" aria-hidden="true"></i>
      </button>
      <div class="loc-faq-panel px-5"><p class="pb-4 text-dark/75 leading-relaxed">${esc(f.a)}</p></div>
    </div>`
    )
    .join('');
  return `
    <section class="py-14 sm:py-20 bg-white border-t border-dark/10" aria-labelledby="faq-h">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="faq-h" class="font-heading font-extrabold text-2xl sm:text-3xl text-dark text-center mb-8">Rubbish Removal ${esc(loc.place)} FAQs</h2>
        <div>${items}</div>
      </div>
    </section>`;
}

function ctaSection(place) {
  return `
    <section class="py-14 sm:py-20 bg-offwhite border-t border-dark/10" aria-labelledby="cta-h">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 id="cta-h" class="font-heading font-extrabold text-2xl sm:text-3xl text-dark mb-4">Need Rubbish Gone in ${esc(place)}?</h2>
        <p class="text-dark/80 text-lg leading-relaxed mb-8">Send Waymaker a few photos of what needs to go and we can provide a straightforward quote. We handle the lifting, loading and disposal so you can get the space cleared without the hassle.</p>
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center flex-wrap">
          <a href="../index.html#contact" class="nav-quote-cta w-full sm:w-auto justify-center">Get a Quote</a>
          <a href="tel:${PHONE_TEL}" class="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 rounded-lg border-2 border-dark/15 bg-white text-dark font-heading font-semibold hover:border-logo hover:text-logo transition"><i class="fa-solid fa-phone" aria-hidden="true"></i> Call ${PHONE_DISP}</a>
        </div>
      </div>
    </section>`;
}

function jsonLdPage(loc, faqs) {
  const pageUrl = `${SITE}/${loc.slug}/`;
  const bizId = pageUrl + '#business';
  const faqEntities = faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  }));
  const reviewSnippet = (body) => ({
    '@type': 'Review',
    reviewBody: body,
    itemReviewed: { '@id': bizId },
    author: { '@type': 'Person' },
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
  });
  const graph = [
    {
      '@type': 'BreadcrumbList',
      '@id': pageUrl + '#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
        { '@type': 'ListItem', position: 2, name: 'Service areas', item: SITE + '/locations/' },
        { '@type': 'ListItem', position: 3, name: loc.place + ' rubbish removal', item: pageUrl },
      ],
    },
    {
      '@type': 'LocalBusiness',
      '@id': bizId,
      name: 'Way Maker Rubbish Solutions',
      url: SITE + '/',
      telephone: '+61-423-101-334',
      email: EMAIL,
      priceRange: '$$',
      address: { '@type': 'PostalAddress', addressRegion: 'QLD', addressCountry: 'AU' },
      areaServed: [{ '@type': 'City', name: loc.place }, { '@type': 'AdministrativeArea', name: 'Sunshine Coast' }],
      geo: { '@type': 'GeoCoordinates', latitude: loc.lat, longitude: loc.lng },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '50', bestRating: '5', worstRating: '1' },
      sameAs: [GOOGLE_REVIEWS_URL],
      review: [
        { ...reviewSnippet('Awesome service from Matt and his team — fast response and excellent communication.'), author: { '@type': 'Person', name: 'Alana Paulin' } },
        { ...reviewSnippet('Matthew was very friendly and did a great job removing rubbish.'), author: { '@type': 'Person', name: 'Luke P' } },
        { ...reviewSnippet('Great punctuality and thoroughness — recommend for anyone wanting the job done right.'), author: { '@type': 'Person', name: 'G J' } },
        { ...reviewSnippet('Matt was great to deal with and kept me informed with all processes and timing.'), author: { '@type': 'Person', name: 'Wendy Lower' } },
      ],
    },
    {
      '@type': 'Service',
      '@id': pageUrl + '#service',
      name: 'Rubbish removal ' + loc.place,
      serviceType: 'Rubbish removal',
      provider: { '@id': bizId },
      areaServed: loc.nearby.map((n) => ({ '@type': 'City', name: n })),
      url: pageUrl,
      description: loc.meta,
    },
    { '@type': 'FAQPage', '@id': pageUrl + '#faq', mainEntity: faqEntities },
  ];
  return `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  })}</script>`;
}

function buildLocationPage(loc) {
  const prefix = '../';
  const canonical = `${SITE}/${loc.slug}/`;
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(loc.mapQuery.replace(/\+/g, ' '))}&z=13&output=embed`;
  const faqs = standardFaqs(loc.place);
  const imgs = beforeAfterImages(loc);
  const heroParagraphs = Array.isArray(loc.heroIntro) ? loc.heroIntro : [loc.heroIntro];

  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${esc(loc.title)}</title>
  <meta name="google-site-verification" content="58aDHM72qS6SwXVsT_tugAWntXOrw8_XsQqvhvdy3pY" />
  <meta name="description" content="${esc(loc.meta)}" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#10B981" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:title" content="${esc(loc.title)}" />
  <meta property="og:description" content="${esc(loc.meta)}" />
  <meta property="og:locale" content="en_AU" />
  <meta property="og:site_name" content="Way Maker Rubbish Solutions" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(loc.title)}" />
  <meta name="twitter:description" content="${esc(loc.meta)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="stylesheet" href="${prefix}assets/location-subpage.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = { theme: { extend: { colors: { primary: '#10B981', accent: '#F97316', logo: '#6DBA2E', dark: '#232529', offwhite: '#F8FAFC' }, fontFamily: { heading: ['Poppins','sans-serif'], body: ['Inter','sans-serif'] } } } };
  </script>
  ${jsonLdPage(loc, faqs)}
</head>
<body class="location-subpage bg-offwhite text-dark font-body antialiased overflow-x-hidden w-full min-h-screen flex flex-col">
  ${navFragment(prefix)}
  <main id="main" class="flex-1 pt-24">
    <section class="bg-dark text-white py-12 sm:py-16" aria-labelledby="page-h1">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="text-sm text-white/60 mb-4" aria-label="Breadcrumb"><a href="${prefix}index.html" class="hover:text-primary">Home</a> <span class="mx-1">/</span> <a href="${prefix}locations/" class="hover:text-primary">Service areas</a> <span class="mx-1">/</span> <span class="text-white/90">${esc(loc.place)}</span></nav>
        <h1 id="page-h1" class="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">${esc(loc.h1)}</h1>
        <div class="text-lg text-white/85 max-w-3xl leading-relaxed mb-6 space-y-4">
          ${heroParagraphs.map((p) => `<p>${esc(p)}</p>`).join('\n          ')}
        </div>
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
          <a href="tel:${PHONE_TEL}" class="nav-quote-cta w-full sm:w-auto justify-center"><i class="fa-solid fa-phone" aria-hidden="true"></i> Call ${PHONE_DISP}</a>
          <a href="${prefix}index.html#contact" class="nav-quote-cta w-full sm:w-auto justify-center">Get a quote now</a>
        </div>
      </div>
    </section>
    <section class="py-12 sm:py-16 bg-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 class="font-heading font-bold text-2xl text-dark mb-4">${esc(loc.localSection.heading)}</h2>
          ${loc.localSection.paragraphs.map((p) => `<p class="text-dark/80 text-lg leading-relaxed mb-4">${esc(p)}</p>`).join('\n          ')}
        </div>
        <div class="rounded-2xl overflow-hidden border border-dark/10 shadow-lg aspect-video bg-dark/5">
          <iframe title="Map of ${esc(loc.place)} Queensland — Waymaker service area" src="${esc(mapSrc)}" class="w-full h-full min-h-[240px]" style="border:0" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </section>
    <section class="py-12 bg-offwhite border-t border-dark/10">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-heading font-bold text-2xl text-dark mb-4">Rubbish Removal Near ${esc(loc.place)}</h2>
        <p class="text-dark/80 mb-4">We also provide rubbish removal throughout surrounding Sunshine Coast suburbs including:</p>
        <div class="flex flex-wrap gap-2 justify-center lg:justify-start">${nearbyPills(loc.nearby)}</div>
        <p class="text-center lg:text-left text-sm text-dark/60 mt-6">More service areas: ${hubLinksHtml(loc.slug)} &middot; <a href="${prefix}locations/" class="text-logo font-semibold hover:underline">View all Sunshine Coast rubbish removal areas</a></p>
      </div>
    </section>
    <section class="py-12 sm:py-16 bg-white border-t border-dark/10">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-heading font-bold text-2xl text-dark mb-4">Rubbish Removal Prices in ${esc(loc.place)}</h2>
        <div class="text-dark/80 mb-6 space-y-4">
          <p>Rubbish removal pricing depends on the amount of rubbish, the type of materials and access to the property. Waymaker provides upfront quotes so you know the expected cost before work begins.</p>
          <p>Our standard pricing includes loading, transport and base disposal fees. Send us a few photos of what needs to go and your location and we can usually provide a straightforward quote before booking.</p>
        </div>
        ${pricingTableHtml()}
      </div>
    </section>
    <section class="py-14 sm:py-20 bg-offwhite border-t border-primary/15" aria-labelledby="svc-h">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="svc-h" class="font-heading font-extrabold text-2xl sm:text-3xl text-dark mb-6">Rubbish Removal Services in ${esc(loc.place)}</h2>
        <p class="text-dark/80 text-lg leading-relaxed mb-8">Waymaker provides rubbish removal for everything from a few unwanted household items to larger property and commercial clean outs. Our team handles the lifting and loading, then transports the rubbish for appropriate disposal.</p>
        <ul class="grid sm:grid-cols-2 gap-4">
          <li class="rounded-xl border border-dark/10 bg-white p-5 shadow-sm"><h3 class="font-heading font-bold text-dark mb-2">Residential Rubbish Removal</h3><p class="text-dark/75 text-sm leading-relaxed">Clear unwanted furniture, household rubbish, garage clutter, mattresses, whitegoods, moving waste and other unwanted items without having to load and transport everything yourself.</p></li>
          <li class="rounded-xl border border-dark/10 bg-white p-5 shadow-sm"><h3 class="font-heading font-bold text-dark mb-2">Commercial Rubbish Removal</h3><p class="text-dark/75 text-sm leading-relaxed">Rubbish removal for offices, retail premises, hospitality businesses, property managers and commercial sites, including furniture, general waste and clearances.</p></li>
          <li class="rounded-xl border border-dark/10 bg-white p-5 shadow-sm"><h3 class="font-heading font-bold text-dark mb-2">Real Estate &amp; Rental Clean Outs</h3><p class="text-dark/75 text-sm leading-relaxed">Fast property clearances for end of lease situations, abandoned belongings, pre sale clean ups and properties that need to be cleared before the next tenant or owner.</p></li>
          <li class="rounded-xl border border-dark/10 bg-white p-5 shadow-sm"><h3 class="font-heading font-bold text-dark mb-2">Deceased Estate Clean Outs</h3><p class="text-dark/75 text-sm leading-relaxed">Respectful assistance clearing unwanted items and rubbish from deceased estates, with care taken around the property and belongings throughout the process.</p></li>
        </ul>
      </div>
    </section>
    <section class="py-12 sm:py-16 bg-white border-t border-dark/10" aria-labelledby="remove-h">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="remove-h" class="font-heading font-bold text-2xl text-dark mb-4">What Rubbish Can We Remove in ${esc(loc.place)}?</h2>
        <p class="text-dark/80 text-lg leading-relaxed mb-6">Every clean up is different. Waymaker can remove a wide range of common household, property, commercial and renovation rubbish, with the lifting, loading and transport taken care of.</p>
        ${rubbishGrid(LOCATION_RUBBISH_ITEMS)}
        <p class="text-dark/70 text-sm sm:text-base leading-relaxed mt-6">Not sure whether we can take something? Send us a photo and we will let you know before booking.</p>
      </div>
    </section>
    <section class="py-12 sm:py-16 bg-offwhite border-t border-dark/10" aria-labelledby="skip-h">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="skip-h" class="font-heading font-bold text-2xl text-dark mb-4">Rubbish Removal or Skip Bin Hire in ${esc(loc.place)}?</h2>
        <div class="text-dark/80 text-lg leading-relaxed space-y-4">
          <p>A skip bin can be useful when you need a container on site for several days and want to load the rubbish gradually. If your rubbish is already ready to go, a full service rubbish removal team can be a more convenient option.</p>
          <p>With Waymaker, there is no skip bin to load yourself. We arrive, load the rubbish, take it away and handle the disposal.</p>
          <p>For furniture removal, household clean outs, rental clearances and smaller renovation clean ups, this can save considerable time and physical work.</p>
        </div>
      </div>
    </section>
    <section class="py-12 sm:py-16 bg-white border-t border-dark/10">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-heading font-bold text-2xl text-dark mb-6 text-center">Before and After</h2>
        <div class="grid sm:grid-cols-2 gap-6">
          <figure class="rounded-xl overflow-hidden border border-dark/10 shadow-md bg-offwhite h-full flex flex-col">
            <div class="aspect-[4/3] overflow-hidden bg-offwhite">
              <img src="${prefix}assets/${imgs.beforeFile}" alt="${esc(imgs.beforeAlt)}" class="block w-full h-full object-cover object-center" width="768" height="1024" loading="lazy" decoding="async" />
            </div>
          </figure>
          <figure class="rounded-xl overflow-hidden border border-dark/10 shadow-md bg-offwhite h-full flex flex-col">
            <div class="aspect-[4/3] overflow-hidden bg-offwhite">
              <img src="${prefix}assets/${imgs.afterFile}" alt="${esc(imgs.afterAlt)}" class="block w-full h-full object-cover object-center" width="768" height="1024" loading="lazy" decoding="async" />
            </div>
          </figure>
        </div>
      </div>
    </section>
    ${faqSection(loc, faqs)}
    ${ctaSection(loc.place)}
    <section class="py-14 sm:py-20 bg-offwhite border-t border-dark/10" aria-labelledby="rev-h">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="rev-h" class="font-heading font-bold text-logo text-center uppercase tracking-widest text-sm mb-2">Google Reviews</h2>
        <p class="text-center text-dark/80 font-heading font-semibold text-lg mb-8">Real Sunshine Coast feedback</p>
        ${reviewsCarousel()}
      </div>
    </section>
  </main>
  ${footerFragment(prefix)}
  <script>
    (function(){var m=document.getElementById('menu-toggle'),p=document.getElementById('mobile-menu'),o=document.getElementById('menu-icon-open'),c=document.getElementById('menu-icon-close'),n=document.getElementById('navbar');
    function set(v){if(!p||!m)return;p.setAttribute('data-open',v?'true':'false');p.setAttribute('aria-hidden',v?'false':'true');m.setAttribute('aria-expanded',v?'true':'false');document.body.classList.toggle('overflow-hidden',v);document.documentElement.classList.toggle('waymaker-menu-open',v);document.body.classList.toggle('waymaker-menu-open',v);if(o)o.classList.toggle('hidden',v);if(c)c.classList.toggle('hidden',!v);if(n)n.classList.toggle('nav-scrolled',v||window.scrollY>20);}
    if(m&&p){m.addEventListener('click',function(){set(p.getAttribute('data-open')!=='true');});p.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){set(false);});});}
    window.addEventListener('resize',function(){if(window.innerWidth>=1024&&p&&p.getAttribute('data-open')==='true')set(false);});
    document.querySelectorAll('.loc-faq-btn').forEach(function(btn){btn.addEventListener('click',function(){var ex=btn.getAttribute('aria-expanded')==='true';document.querySelectorAll('.loc-faq-btn').forEach(function(b){b.setAttribute('aria-expanded','false');var pan=b.nextElementSibling;if(pan)pan.classList.remove('open');});if(!ex){btn.setAttribute('aria-expanded','true');var p2=btn.nextElementSibling;if(p2)p2.classList.add('open');}});});
    var ob=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting)x.target.classList.add('visible');});},{threshold:0.08});
    document.querySelectorAll('.animate-on-scroll').forEach(function(el){ob.observe(el);});
    })();
  </script>
</body>
</html>`;
}

function buildHubPage() {
  const prefix = '../';
  const canonical = `${SITE}/locations/`;
  const cards = LOCATIONS.map(
    (l) => `
    <li class="rounded-2xl border border-dark/10 bg-white p-6 shadow-sm hover:shadow-md transition">
      <a href="${prefix}${l.slug}/" class="block group">
        <h3 class="font-heading font-bold text-xl text-dark group-hover:text-logo mb-2">${esc(l.place)}</h3>
        <p class="text-dark/75 text-sm leading-relaxed">${esc(l.cardDescription)}</p>
        <span class="inline-flex mt-4 text-logo font-heading font-semibold text-sm">View ${esc(l.place)} page &rarr;</span>
      </a>
    </li>`
  ).join('');
  const graph = [
    {
      '@type': 'BreadcrumbList',
      '@id': canonical + '#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
        { '@type': 'ListItem', position: 2, name: 'Service areas', item: canonical },
      ],
    },
    {
      '@type': 'CollectionPage',
      '@id': canonical + '#page',
      name: 'Rubbish Removal Sunshine Coast service areas',
      url: canonical,
      description: 'Waymaker provides rubbish removal across the Sunshine Coast for homes, businesses and property clean outs. View our service areas and request a quote.',
      provider: { '@type': 'LocalBusiness', name: 'Way Maker Rubbish Solutions', telephone: '+61-423-101-334', url: SITE + '/' },
    },
  ];
  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>Rubbish Removal Sunshine Coast | Areas We Service</title>
  <meta name="google-site-verification" content="58aDHM72qS6SwXVsT_tugAWntXOrw8_XsQqvhvdy3pY" />
  <meta name="description" content="Waymaker provides rubbish removal across the Sunshine Coast for homes, businesses and property clean outs. View our service areas and request a quote." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonical}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="stylesheet" href="${prefix}assets/location-subpage.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>tailwind.config={theme:{extend:{colors:{primary:'#10B981',logo:'#6DBA2E',dark:'#232529',offwhite:'#F8FAFC'},fontFamily:{heading:['Poppins','sans-serif'],body:['Inter','sans-serif']}}}};</script>
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
</head>
<body class="location-subpage bg-offwhite text-dark font-body antialiased overflow-x-hidden w-full flex flex-col min-h-screen">
  ${navFragment(prefix)}
  <main class="flex-1 pt-24 pb-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="text-sm text-dark/60 mb-4" aria-label="Breadcrumb"><a href="${prefix}index.html" class="hover:text-logo">Home</a> <span class="mx-1">/</span> <span class="text-dark/90">Service areas</span></nav>
      <h1 class="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-dark mb-6">Rubbish Removal Across the Sunshine Coast</h1>
      ${HUB_INTRO.map((p) => `<p class="text-lg text-dark/80 max-w-3xl mb-4">${esc(p)}</p>`).join('\n      ')}
      <h2 class="font-heading font-bold text-2xl sm:text-3xl text-dark mt-10 mb-6">Rubbish Removal Areas We Service</h2>
      <ul class="grid sm:grid-cols-2 gap-6">${cards}</ul>
      <section class="mt-16 pt-12 border-t border-dark/10" aria-labelledby="skip-hub-h">
        <h2 id="skip-hub-h" class="font-heading font-bold text-2xl sm:text-3xl text-dark mb-4">Sunshine Coast Rubbish Removal Without the Skip Bin</h2>
        <div class="text-dark/80 text-lg leading-relaxed space-y-4 max-w-3xl">
          <p>Getting rid of unwanted rubbish does not always need to mean hiring a skip, finding somewhere to put it and spending your weekend loading it yourself.</p>
          <p>With Waymaker, you show us what needs to go and we take care of the rest. Our rubbish removal service includes the labour, loading, transport and disposal, making it a practical option for household clean outs, bulky furniture, rental clearances, renovation waste and jobs where a skip bin is difficult to place.</p>
          <p>We service suburbs across the Sunshine Coast and provide upfront quotes based on the volume and type of rubbish, site access and any special disposal requirements.</p>
        </div>
      </section>
      <section class="mt-16 pt-12 border-t border-dark/10" aria-labelledby="hub-rubbish-h">
        <h2 id="hub-rubbish-h" class="font-heading font-bold text-2xl sm:text-3xl text-dark mb-6">Rubbish We Can Remove Across the Sunshine Coast</h2>
        ${rubbishGrid(HUB_RUBBISH_ITEMS)}
      </section>
    </div>
  </main>
  ${footerFragment(prefix)}
  <script>
    (function(){var m=document.getElementById('menu-toggle'),p=document.getElementById('mobile-menu'),o=document.getElementById('menu-icon-open'),c=document.getElementById('menu-icon-close'),n=document.getElementById('navbar');
    function set(v){if(!p||!m)return;p.setAttribute('data-open',v?'true':'false');p.setAttribute('aria-hidden',v?'false':'true');m.setAttribute('aria-expanded',v?'true':'false');document.body.classList.toggle('overflow-hidden',v);document.documentElement.classList.toggle('waymaker-menu-open',v);document.body.classList.toggle('waymaker-menu-open',v);if(o)o.classList.toggle('hidden',v);if(c)c.classList.toggle('hidden',!v);if(n)n.classList.toggle('nav-scrolled',v||window.scrollY>20);}
    if(m&&p){m.addEventListener('click',function(){set(p.getAttribute('data-open')!=='true');});p.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){set(false);});});}
    window.addEventListener('resize',function(){if(window.innerWidth>=1024&&p&&p.getAttribute('data-open')==='true')set(false);});
    })();
  </script>
</body>
</html>`;
}

function writeSitemap() {
  const urls = [
    { loc: SITE + '/', priority: '1.0' },
    { loc: SITE + '/thanks.html', priority: '0.3' },
    { loc: SITE + '/locations/', priority: '0.9' },
    ...LOCATIONS.map((l) => ({ loc: `${SITE}/${l.slug}/`, priority: '0.85' })),
  ];
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) => `  <url>\n    <loc>${esc(u.loc)}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
      )
      .join('\n') +
    `\n</urlset>\n`;
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml, 'utf8');
}

function writeRobots() {
  fs.writeFileSync(
    path.join(ROOT, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`,
    'utf8'
  );
}

// ——— Write files ———
for (const loc of LOCATIONS) {
  const dir = path.join(ROOT, loc.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), buildLocationPage(loc), 'utf8');
  console.log('Wrote', loc.slug);
}

fs.mkdirSync(path.join(ROOT, 'locations'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'locations', 'index.html'), buildHubPage(), 'utf8');
console.log('Wrote locations/index.html');

writeSitemap();
writeRobots();
console.log('Done: sitemap.xml + robots.txt');
