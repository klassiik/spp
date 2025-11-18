# Sierra Property Partners - AI Coding Instructions

This Next.js + TypeScript + shadcn/ui website serves Sierra Property Partners, a property management company covering 50+ cities across Placer, Nevada, Sacramento, and El Dorado counties in Northern California.

## Business Context

**Primary Office**: 11818 Kemper Rd, Auburn, CA 95603 | Phone: (530) 823-8604  
**Hours**: Mon-Fri 10 AM–2 PM, Sat-Sun Closed  
**Service Area**: 50+ cities across 4 counties (Placer, Nevada, Sacramento, El Dorado)  
**Core Business**: 21 property management services (residential, commercial, tenant placement, maintenance, evictions, HOA management, etc.)

## Architecture & Routing

### Location-Based Dynamic Routes
- **Pattern**: `/services/[county]/[city]` - generates 50+ SEO-optimized location pages
- **Counties**: `placer`, `nevada`, `sacramento`, `el-dorado` (URL-safe slugs)
- **Example**: `/services/placer/roseville`, `/services/nevada/truckee`
- **Data Source**: `src/lib/data/locations.ts` - master list mapping cities to counties and Unsplash image IDs

### Service Detail Pages
- **Pattern**: `/services/[slug]` - 21 dedicated service pages
- **Examples**: `/services/residential-property-management`, `/services/tenant-placement-leasing`
- **Data Source**: `src/lib/data/services.ts` - service objects with titles, descriptions, icons

### Key Directories
```
src/
├── app/
│   ├── services/
│   │   ├── [county]/[city]/page.tsx    # Location service pages
│   │   └── [slug]/page.tsx              # Individual service pages
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── page.tsx                          # Homepage
├── components/
│   ├── seo/                              # SEO components (schemas, meta tags)
│   ├── layout/                           # Header, Footer, Navigation
│   └── ui/                               # shadcn/ui components
├── lib/
│   ├── data/                             # Static data (locations, services, business info)
│   └── seo/                              # SEO utilities and schema generators
└── types/                                # TypeScript interfaces
```

## Development Workflows

### Installing shadcn/ui Components
Use the **shadcn/ui MCP server** (already configured):
```bash
# Via MCP server or CLI
npx shadcn@latest add button card input form
```
**Installed components go to**: `src/components/ui/`  
**Style**: New York style with `neutral` base color, CSS variables enabled

### Running Development Server
```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
```
**Turbopack**: Automatically enabled via `--turbo` flag in dev script

### Pre-Commit Schema Validation
**Hook**: Husky pre-commit runs `context7` MCP server to validate all JSON-LD structured data
```bash
# Validates all schema files in src/lib/seo/schemas/
# Checks: LocalBusiness, Organization, Service, BreadcrumbList schemas
```
**Setup**: Install Husky and configure `.husky/pre-commit` to call context7 validation script

## SEO Implementation (Priority: Local → Technical → On-Page)

### 1. Local SEO (Highest Priority)
**Every location page MUST include**:
- `LocalBusiness` JSON-LD schema with `areaServed` for specific city/county
- Business name, address (Auburn office), phone, hours in structured data
- Embedded Google Maps with city-specific marker
- City-specific H1: "Property Management Services in [City], [County]"
- Internal links to nearby cities within same county

**Example Schema** (from `src/lib/seo/schemas.ts`):
```typescript
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Sierra Property Partners",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "11818 Kemper Rd",
    "addressLocality": "Auburn",
    "addressRegion": "CA",
    "postalCode": "95603"
  },
  "areaServed": {
    "@type": "City",
    "name": "[City Name]",
    "containedInPlace": "[County Name] County, CA"
  },
  "telephone": "(530) 823-8604",
  "openingHoursSpecification": [...]
}
```

### 2. Technical SEO
- **Dynamic Sitemap**: `/app/sitemap.ts` generates XML with all 50+ location pages + service pages
- **Canonical URLs**: Every page uses `<link rel="canonical">` to avoid duplicate content
- **Image Optimization**: Use Next.js `<Image>` component with Unsplash URLs, `priority` for heroes
- **Mobile-First**: Tailwind breakpoints (`sm:`, `md:`, `lg:`) for responsive design
- **Core Web Vitals**: Lazy load below-the-fold content, optimize LCP with `priority` images
- **Robots.txt**: Allow all, link to sitemap

### 3. On-Page SEO
- **Title Format**: "[City] Property Management | Sierra Property Partners"
- **Meta Description**: 150-160 chars, include city name + 2-3 key services
- **Heading Hierarchy**: H1 (city/service name) → H2 (service categories) → H3 (details)
- **Semantic HTML**: `<header>`, `<main>`, `<article>`, `<section>`, `<footer>`
- **Internal Linking**: Breadcrumbs, related cities, service cross-links
- **Alt Text**: All images need descriptive alt text: "Property management services in [City]"

### Other SEO Types
- **Mobile SEO**: Touch targets 44x44px minimum, viewport meta tag, responsive images
- **Image SEO**: Unsplash images with alt text, WebP format via Next.js Image
- **Social SEO**: Open Graph + Twitter Card meta tags in `src/components/seo/SocialMetaTags.tsx`
- **Content SEO**: Unique 300+ word descriptions per location, keyword density 1-2%
- **AI SEO**: Structured data for AI crawlers, semantic HTML5, FAQ schema where applicable
- **SXO**: Fast load times, clear CTAs, location-aware contact forms

## Data Layer Patterns

### Locations Data (`src/lib/data/locations.ts`)
```typescript
export interface Location {
  slug: string;           // URL-safe: "roseville"
  name: string;           // Display: "Roseville"
  county: County;         // "placer" | "nevada" | "sacramento" | "el-dorado"
  unsplashId: string;     // Single hero image ID from Unsplash
  zipCodes?: string[];    // Optional for enhanced local SEO
}

export const locations: Location[] = [
  { slug: "roseville", name: "Roseville", county: "placer", unsplashId: "abc123" },
  // ... 50+ more
];
```

### Services Data (`src/lib/data/services.ts`)
```typescript
export interface Service {
  slug: string;
  title: string;
  category: "core" | "additional";
  description: string;
  icon: LucideIcon;      // From lucide-react
}

export const services: Service[] = [
  {
    slug: "residential-property-management",
    title: "Residential Property Management",
    category: "core",
    description: "...",
    icon: Home
  },
  // ... 21 total services
];
```

### Unsplash Image Integration
**Mapping File**: `src/lib/data/unsplash-images.ts`
```typescript
export const locationImages: Record<string, string> = {
  roseville: "photo-123-xyz",  // Unsplash photo ID
  auburn: "photo-456-abc",
  // ... map all 50+ cities
};
```
**Usage**: `https://images.unsplash.com/photo-${unsplashId}?w=1920&q=80`  
**Strategy**: Single high-quality property/city image per location, pre-mapped for consistency

## Component Patterns

### Location-Aware Contact Forms
**File**: `src/components/ContactForm.tsx`
```typescript
// Pre-populate with location from URL params
const form = useForm({
  defaultValues: {
    city: params.city,
    county: params.county,
    service: searchParams.get('service')
  }
});
```
**Behavior**: When user navigates from `/services/placer/roseville`, contact form auto-fills city/county

### SEO Wrapper Component
**File**: `src/components/seo/SEOHead.tsx`  
Centralizes: `<title>`, `<meta>`, canonical URL, Open Graph, JSON-LD injection  
**Usage**: Wrap every page's default export with `<SEOHead>` props

### Hero Section with Unsplash
**File**: `src/components/layout/HeroSection.tsx`
```tsx
<Image 
  src={`https://images.unsplash.com/${unsplashId}?w=1920`}
  alt={`Property management in ${city}`}
  priority
  fill
  className="object-cover"
/>
```

## MCP Server Integration

### shadcn/ui MCP Server
**Purpose**: Install UI components on demand  
**Usage**: AI agents should suggest components available in shadcn registry  
**Common Components**: `button`, `card`, `form`, `input`, `select`, `dialog`, `dropdown-menu`, `navigation-menu`, `breadcrumb`

### context7 MCP Server
**Purpose**: Validate JSON-LD structured data before deployment  
**Integration**: Pre-commit hook in `.husky/pre-commit`  
**Validates**: All schema files in `src/lib/seo/schemas/`, ensures compliance with schema.org standards  
**Failure Behavior**: Commit blocked if schema validation fails

## Conventions & Standards

### File Naming
- **Components**: PascalCase (e.g., `HeroSection.tsx`, `ContactForm.tsx`)
- **Data files**: camelCase (e.g., `locations.ts`, `services.ts`)
- **Routes**: kebab-case in URLs, folders match Next.js conventions

### TypeScript
- **Strict mode**: Enabled in `tsconfig.json`
- **Interfaces**: Define in `src/types/` for shared types
- **Props**: Use `interface` for component props, export when reused

### Styling
- **Tailwind v4**: Use `@import "tailwindcss"` in globals.css
- **shadcn Theming**: CSS variables in `:root` for colors (see `globals.css`)
- **Responsive**: Mobile-first, use `sm:`, `md:`, `lg:`, `xl:` breakpoints
- **Spacing**: Tailwind's 4px scale (`p-4` = 16px)

### Git Workflow
- **Pre-commit**: Schema validation via context7 MCP server (required to pass)
- **Branch Strategy**: Feature branches, PR to main
- **Commit Messages**: Conventional commits (feat:, fix:, docs:, etc.)

## Critical Integration Points

### Dynamic Metadata Generation
**Every dynamic route** (`[county]/[city]`, `[slug]`) must export `generateMetadata`:
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `${params.city} Property Management | Sierra Property Partners`,
    description: `Professional property management in ${params.city}...`,
    openGraph: { ... },
  };
}
```

### Sitemap Generation
**File**: `src/app/sitemap.ts`  
Must dynamically generate URLs for:
- All 50+ `/services/[county]/[city]` pages
- All 21 `/services/[slug]` service pages
- Static pages (home, about, contact)
**Priority**: Location pages = 0.8, Service pages = 0.7, Static = 0.9

### Cross-Component Communication
- **Business Info**: Centralized in `src/lib/data/business.ts`, imported by Header/Footer/Schema
- **Location Context**: Use React Context or URL params for location-aware components
- **Service Filtering**: Components can filter `services` array by category ("core" vs "additional")

## Performance & Build

### Image Optimization
- **Format**: Unsplash serves WebP automatically via Next.js Image
- **Sizes**: Define `sizes` prop for responsive images
- **Priority**: Set `priority` on hero images to prevent LCP issues

### Build Output
```bash
npm run build
# Generates static pages for all routes via generateStaticParams
# Outputs to .next/static and .next/server
```

### Environment Variables
**Required** (create `.env.local`):
```
NEXT_PUBLIC_SITE_URL=https://sierrapropertypartners.com
UNSPLASH_ACCESS_KEY=your_key_here  # If using Unsplash API dynamically
```

## Testing & Validation

### Manual SEO Checks
1. **Schema Validator**: Use Google Rich Results Test or Schema Markup Validator
2. **Lighthouse**: Target 90+ for Performance, Accessibility, Best Practices, SEO
3. **Mobile-Friendly Test**: Google's Mobile-Friendly Test tool
4. **Local SEO**: Verify Google My Business integration and local pack ranking

### Automated Checks
- **Pre-commit**: context7 validates all JSON-LD schemas
- **ESLint**: Runs on commit, enforces code quality
- **TypeScript**: Strict type checking during build

## Common Patterns

### Adding a New Location
1. Add to `src/lib/data/locations.ts` with county and Unsplash ID
2. Re-run build to generate static page via `generateStaticParams`
3. Verify schema includes `areaServed` for new city
4. Update sitemap (automatic if using dynamic generation)

### Adding a New Service
1. Add to `src/lib/data/services.ts` with slug, title, category, icon
2. Create `/app/services/[slug]/page.tsx` if doesn't exist
3. Add service schema to `src/lib/seo/schemas.ts`
4. Update service listing components to include new service

### Modifying SEO Strategy
1. Update schema templates in `src/lib/seo/schemas.ts`
2. Modify `generateMetadata` functions in affected pages
3. Run context7 validation before committing
4. Test with Google Rich Results Test

---

**Last Updated**: Nov 13, 2025  
**Framework**: Next.js 16.0.3 (App Router, Turbopack)  
**Styling**: Tailwind v4 + shadcn/ui (New York style)  
**Type Safety**: TypeScript 5+ (strict mode)
