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
const LASTMOD = '2026-05-15';
const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=Waymaker+Rubbish+Solutions+Reviews&hl=en';

const dataPath = path.join(__dirname, 'location-seo-data.json');
const LOCATIONS = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

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

function reviewsCarousel(prefix) {
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

function navFragment(prefix, currentSlug, isHub) {
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

function servicesSection(place, slug) {
  const angle =
    slug.includes('aura')
      ? 'new-build packaging, display-home strip-outs, and moving-day cardboard'
      : slug.includes('nambour')
        ? 'hinterland estates, acreage sheds, and post-storm green waste'
        : slug.includes('noosa')
          ? 'prestige homes, holiday lets, and discreet office purges'
          : 'units, houses, and local businesses';
  return `
    <section class="py-14 sm:py-20 bg-offwhite border-t border-primary/15" aria-labelledby="svc-h">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="svc-h" class="font-heading font-extrabold text-2xl sm:text-3xl text-dark mb-6">Rubbish &amp; junk services near ${esc(place)}</h2>
        <p class="text-dark/80 text-lg leading-relaxed mb-8">WayMaker tailors each load for ${esc(place)}—${angle}. Every job includes labour, responsible disposal, and clear communication from Matt&apos;s crew.</p>
        <ul class="grid sm:grid-cols-2 gap-4">
          <li class="rounded-xl border border-dark/10 bg-white p-5 shadow-sm"><h3 class="font-heading font-bold text-dark mb-2">Residential</h3><p class="text-dark/75 text-sm leading-relaxed">Garage clean-outs, pre-move purges, mattress &amp; whitegoods, green waste, vermin-safe bagged waste.</p></li>
          <li class="rounded-xl border border-dark/10 bg-white p-5 shadow-sm"><h3 class="font-heading font-bold text-dark mb-2">Commercial &amp; strata</h3><p class="text-dark/75 text-sm leading-relaxed">Retail back-of-house, office furniture, archived files (non-confidential unless arranged), shop fit-out debris.</p></li>
          <li class="rounded-xl border border-dark/10 bg-white p-5 shadow-sm"><h3 class="font-heading font-bold text-dark mb-2">Real estate &amp; rentals</h3><p class="text-dark/75 text-sm leading-relaxed">End-of-lease clears, bond cleans support, tenant left-behinds, open-home tidy-ups.</p></li>
          <li class="rounded-xl border border-dark/10 bg-white p-5 shadow-sm"><h3 class="font-heading font-bold text-dark mb-2">Deceased estates</h3><p class="text-dark/75 text-sm leading-relaxed">Respectful sorting, donation-first mindset where practical, and prompt removal of true rubbish.</p></li>
        </ul>
      </div>
    </section>`;
}

function faqSection(loc) {
  const items = loc.faqs
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
        <h2 id="faq-h" class="font-heading font-extrabold text-2xl sm:text-3xl text-dark text-center mb-8">${esc(loc.place)} rubbish removal FAQ</h2>
        <div>${items}</div>
      </div>
    </section>`;
}

function jsonLdPage(loc) {
  const pageUrl = `${SITE}/${loc.slug}/`;
  const bizId = pageUrl + '#business';
  const faqEntities = loc.faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  }));
  const reviewSnippet = (body) => ({ '@type': 'Review', reviewBody: body, itemReviewed: { '@id': bizId }, author: { '@type': 'Person' }, reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 } });
  const graph = [
    {
      '@type': 'BreadcrumbList',
      '@id': pageUrl + '#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
        { '@type': 'ListItem', position: 2, name: 'Suburbs', item: SITE + '/locations/' },
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
      serviceType: 'Rubbish removal and junk removal',
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
  const internalOthers = otherSlugs(loc.slug)
    .slice(0, 6)
    .map((s) => {
      const p = LOCATIONS.find((x) => x.slug === s);
      return `<a href="${prefix}${s}/" class="text-logo font-semibold hover:underline">${esc(p.place)}</a>`;
    })
    .join(' &middot; ');

  const pricingRows = loc.pricingExamples
    .map(
      (r) => `
          <tr class="border-b border-dark/10">
            <td class="py-3 pr-4 font-medium text-dark">${esc(r.label)}</td>
            <td class="py-3 pr-4 font-heading font-bold text-logo whitespace-nowrap">${esc(r.range)}</td>
            <td class="py-3 text-dark/70 text-sm">${esc(r.note)}</td>
          </tr>`
    )
    .join('');

  const nearby = loc.nearby.map((n) => `<span class="inline-flex items-center px-3 py-1 rounded-full bg-white border border-primary/25 text-dark text-sm font-medium">${esc(n)}</span>`).join('\n');

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
    tailwind.config = { theme: { extend: { colors: { primary: '#10B981', accent: '#F97316', logo: '#6DBA2E', dark: '#232529', offwhite: '#282a2e' }, fontFamily: { heading: ['Poppins','sans-serif'], body: ['Inter','sans-serif'] } } } };
  </script>
  ${jsonLdPage(loc)}
</head>
<body class="location-subpage bg-offwhite text-dark font-body antialiased overflow-x-hidden w-full min-h-screen flex flex-col">
  ${navFragment(prefix, loc.slug, false)}
  <main id="main" class="flex-1 pt-24">
    <section class="bg-dark text-white py-12 sm:py-16" aria-labelledby="page-h1">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="text-sm text-white/60 mb-4" aria-label="Breadcrumb"><a href="${prefix}index.html" class="hover:text-primary">Home</a> <span class="mx-1">/</span> <a href="${prefix}locations/" class="hover:text-primary">Suburbs</a> <span class="mx-1">/</span> <span class="text-white/90">${esc(loc.place)}</span></nav>
        <h1 id="page-h1" class="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">${esc(loc.h1)}</h1>
        <p class="text-lg text-white/85 max-w-3xl leading-relaxed mb-6">Owner-operated <strong class="text-white">rubbish removal ${esc(loc.place)}</strong> and <strong class="text-white">junk removal ${esc(loc.place)}</strong> — plus transparent <strong class="text-white">rubbish removal Sunshine Coast ${esc(loc.place)}</strong> quotes from a Christian family business you can recommend with confidence.</p>
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
          <a href="tel:${PHONE_TEL}" class="nav-quote-cta w-full sm:w-auto justify-center"><i class="fa-solid fa-phone" aria-hidden="true"></i> Call ${PHONE_DISP}</a>
          <a href="https://wa.me/61423101334" target="_blank" rel="noopener noreferrer" class="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/30 text-white font-heading font-semibold hover:bg-white/10">WhatsApp</a>
          <a href="${prefix}index.html#contact" class="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-white font-heading font-semibold hover:bg-emerald-500">Quote form</a>
        </div>
      </div>
    </section>
    <section class="py-12 sm:py-16 bg-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 class="font-heading font-bold text-2xl text-dark mb-4">Why ${esc(loc.place)} homeowners choose WayMaker</h2>
          ${loc.intro.map((p) => `<p class="text-dark/80 text-lg leading-relaxed mb-4">${esc(p)}</p>`).join('')}
          <p class="text-dark/70 text-sm leading-relaxed">${esc(loc.pricingNote)}</p>
        </div>
        <div class="rounded-2xl overflow-hidden border border-dark/10 shadow-lg aspect-video bg-dark/5">
          <iframe title="Map of ${esc(loc.place)} Queensland — WayMaker service area" src="${esc(mapSrc)}" class="w-full h-full min-h-[240px]" style="border:0" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
      <p class="text-center text-dark/75 text-sm mt-8 max-w-3xl mx-auto px-4">We service <strong>${esc(loc.place)}</strong> and all surrounding Sunshine Coast areas — book rubbish removal or junk removal and we&apos;ll confirm access before we arrive.</p>
    </section>
    <section class="py-12 bg-offwhite border-t border-dark/10">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-heading font-bold text-2xl text-dark mb-4">Nearby suburbs we run to from ${esc(loc.place)}</h2>
        <div class="flex flex-wrap gap-2 justify-center lg:justify-start">${nearby}</div>
        <p class="text-center lg:text-left text-sm text-dark/60 mt-6">More hubs: ${internalOthers}</p>
      </div>
    </section>
    <section class="py-12 sm:py-16 bg-white border-t border-dark/10">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-heading font-bold text-2xl text-dark mb-4">Quote-based pricing (${esc(loc.place)})</h2>
        <p class="text-dark/80 mb-6">Every load is quoted upfront after we understand volume, access, and materials. Tip fees and labour are included in the examples below — final price confirmed on-site or via clear photos.</p>
        <div class="overflow-x-auto max-w-full rounded-xl border border-dark/10">
          <table class="w-full text-left text-sm sm:text-base min-w-[32rem]">
            <thead><tr class="bg-dark text-white"><th class="py-3 px-4">Job type</th><th class="py-3 px-4">Typical range (AUD)</th><th class="py-3 px-4">Notes</th></tr></thead>
            <tbody>${pricingRows}</tbody>
          </table>
        </div>
      </div>
    </section>
    ${servicesSection(loc.place, loc.slug)}
    <section class="py-12 sm:py-16 bg-white border-t border-dark/10">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-heading font-bold text-2xl text-dark mb-6 text-center">Before &amp; after (${esc(loc.place)} rubbish removal)</h2>
        <div class="grid sm:grid-cols-2 gap-6">
          <figure class="rounded-xl overflow-hidden border border-dark/10 shadow-md bg-offwhite">
            <div class="aspect-[4/3] bg-gradient-to-br from-dark/10 to-logo/20 flex items-center justify-center text-dark/40 text-sm font-medium">Before — ${esc(loc.place)}</div>
            <figcaption class="p-3 text-xs text-dark/60">Placeholder: upload WebP before photo — <strong>rubbish removal ${esc(loc.place)}</strong> garage clean-out.</figcaption>
          </figure>
          <figure class="rounded-xl overflow-hidden border border-dark/10 shadow-md bg-offwhite">
            <div class="aspect-[4/3] bg-gradient-to-br from-logo/30 to-primary/20 flex items-center justify-center text-dark/40 text-sm font-medium">After — ${esc(loc.place)}</div>
            <figcaption class="p-3 text-xs text-dark/60">Placeholder: upload WebP after photo — <strong>junk removal ${esc(loc.place)}</strong> site clear.</figcaption>
          </figure>
        </div>
      </div>
    </section>
    <section class="py-14 sm:py-20 bg-offwhite border-t border-dark/10" aria-labelledby="rev-h">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="rev-h" class="font-heading font-bold text-logo text-center uppercase tracking-widest text-sm mb-2">Google Reviews</h2>
        <p class="text-center text-dark/80 font-heading font-semibold text-lg mb-8">Real Sunshine Coast feedback</p>
        ${reviewsCarousel(prefix)}
      </div>
    </section>
    ${faqSection(loc)}
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
        <h2 class="font-heading font-bold text-xl text-dark group-hover:text-logo mb-2">${esc(l.place)}</h2>
        <p class="text-dark/75 text-sm leading-relaxed line-clamp-3">${esc(l.meta)}</p>
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
        { '@type': 'ListItem', position: 2, name: 'Suburbs', item: canonical },
      ],
    },
    {
      '@type': 'CollectionPage',
      '@id': canonical + '#page',
      name: 'WayMaker Sunshine Coast suburb pages',
      url: canonical,
      description: 'Local rubbish and junk removal landing pages for Maroochydore, Caloundra, Noosa, Aura, and more.',
      provider: { '@type': 'LocalBusiness', name: 'Way Maker Rubbish Solutions', telephone: '+61-423-101-334', url: SITE + '/' },
    },
  ];
  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>Sunshine Coast suburbs | Rubbish removal pages | WayMaker</title>
  <meta name="google-site-verification" content="58aDHM72qS6SwXVsT_tugAWntXOrw8_XsQqvhvdy3pY" />
  <meta name="description" content="WayMaker Rubbish Solutions services Maroochydore, Caloundra, Noosa, Aura, Buderim, Mooloolaba, Coolum Beach, Kawana Waters, Peregian Beach, Nambour and more. Family-owned Sunshine Coast junk removal." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonical}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="stylesheet" href="${prefix}assets/location-subpage.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>tailwind.config={theme:{extend:{colors:{primary:'#10B981',logo:'#6DBA2E',dark:'#232529',offwhite:'#282a2e'},fontFamily:{heading:['Poppins','sans-serif'],body:['Inter','sans-serif']}}}};</script>
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
</head>
<body class="location-subpage bg-offwhite text-dark font-body antialiased overflow-x-hidden w-full flex flex-col min-h-screen">
  ${navFragment(prefix, null, true)}
  <main class="flex-1 pt-24 pb-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-dark mb-4">Sunshine Coast suburbs</h1>
      <p class="text-lg text-dark/80 max-w-3xl mb-10">Choose your suburb for location-specific <strong>rubbish removal</strong> and <strong>junk removal</strong> guidance, FAQs, and pricing context. Christian family–owned WayMaker — call <a href="tel:${PHONE_TEL}" class="text-logo font-semibold">${PHONE_DISP}</a> or use the <a href="${prefix}index.html#contact" class="text-logo font-semibold underline">quote form</a>.</p>
      <ul class="grid sm:grid-cols-2 gap-6">${cards}</ul>
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
