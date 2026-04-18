# GreenPump Care Design System

> Inspired by Uber's confident minimalism, adapted for a premium heat pump cleaning brand.
> Uses Framer Motion for all transitions and micro-interactions.

---

## 1. Visual Theme & Atmosphere

GreenPump Care's design language combines Uber's bold, efficient layout system with a teal-green palette that communicates cleanliness, professionalism, and environmental responsibility. The interface is clean and confident -- not sterile, but purposeful. Every element earns its place.

The design is built on a strong white foundation with teal accents that reference the company's vehicle wraps and eco-friendly positioning. Like Uber, pill-shaped interactive elements (999px border-radius) create a modern, thumb-friendly interface. Card-based layouts with whisper-soft shadows keep the experience clean and scannable.

This is a blue-collar service brand presented with white-glove polish -- approachable enough for Halifax homeowners, professional enough to justify premium pricing.

**Key Characteristics:**
- Clean white foundation with teal (#09A47A) as the dominant brand accent
- Work Sans (headlines) + Inter (body) -- open-source Google Fonts
- Pill-shaped CTAs and navigation chips (999px border-radius), Uber-style
- Card-based service layouts with subtle shadows (0.12 opacity)
- 8px spacing grid with compact, scannable layouts
- Full-bleed hero sections with bold photography of clean heat pump systems
- Teal footer anchoring the page (mirrors vehicle wrap aesthetic)
- Framer Motion for scroll reveals, hover lifts, and page transitions

---

## 2. Color Palette & Roles

### Brand Primary
- **Primary Teal** (`#09A47A`): The dominant brand color -- headers, primary CTAs, hero backgrounds, navigation active states. Matches the vehicle wrap and all customer-facing materials.
- **Dark Teal** (`#077A5B`): Section headings, hover/active states on primary buttons, table headers. The "pressed" version of teal.

### Brand Accent
- **Mint Accent** (`#3FD691`): Accent lines, highlights, secondary badges, subtle gradients. Use sparingly.
- **Leaf Green** (`#669B43`): Eco-friendly messaging, "eco-friendly" badges, environmental callouts only.

### Neutrals
- **Text Dark** (`#28251D`): Primary body text, headings on light backgrounds. Near-black with warmth.
- **Background Light** (`#F7F6F2`): Alternating section backgrounds, card surfaces on white pages.
- **Table Stripe** (`#F0FAF6`): Light teal-tinted background for alternating table rows, feature cards, and pricing highlights.
- **Pure White** (`#FFFFFF`): Page backgrounds, card surfaces, text on teal elements.

### Interactive & Button States
- **Hover Teal** (`#077A5B`): Primary button hover state (darkens to Dark Teal).
- **Chip Light** (`#F0FAF6`): Background for secondary/filter chips and navigation pills.
- **Chip Active** (`#09A47A`): Active chip state -- teal background with white text (inversion).

### Shadows & Depth
- **Shadow Light** (`rgba(0, 0, 0, 0.08)`): Standard card elevation -- featherweight lift.
- **Shadow Medium** (`rgba(0, 0, 0, 0.12)`): Slightly stronger for floating elements and hover states.
- **Shadow Strong** (`rgba(9, 164, 122, 0.15)`): Teal-tinted shadow for primary CTA hover lift.

### Status & Trust
- **Success Green** (`#22C55E`): Checkmarks, success states, "included" indicators.
- **Warning Amber** (`#F59E0B`): Attention callouts, seasonal alerts.
- **Star Gold** (`#FBBF24`): Google review stars, rating displays.
- **BBB Blue** (`#005A8C`): BBB A-rating badge accent.

### Gradient System
- **Hero Gradient**: `linear-gradient(135deg, #09A47A 0%, #077A5B 100%)` -- used on hero backgrounds and CTA sections.
- **Subtle Teal Wash**: `linear-gradient(180deg, #F0FAF6 0%, #FFFFFF 100%)` -- section background transitions.
- Gradients are used sparingly and only on large surfaces, never on buttons or small components.

---

## 3. Typography Rules

### Font Family
- **Headline / Display**: `Work Sans`, with fallbacks: `system-ui, -apple-system, Helvetica Neue, Arial, sans-serif`
- **Body / UI**: `Inter`, with fallbacks: `system-ui, -apple-system, Helvetica Neue, Arial, sans-serif`

Both fonts are free via Google Fonts. Load Work Sans weights 600 and 700. Load Inter weights 400, 500, and 700.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Notes |
|------|------|------|--------|-------------|-------|
| Display / Hero | Work Sans | 52px (3.25rem) | 700 | 1.2 | Maximum impact, hero headlines |
| Section Heading | Work Sans | 36px (2.25rem) | 700 | 1.2 | Major section anchors |
| Card Title | Work Sans | 28px (1.75rem) | 600 | 1.3 | Service cards, feature headings |
| Sub-heading | Work Sans | 24px (1.5rem) | 600 | 1.3 | Secondary section headers |
| Small Heading | Work Sans | 20px (1.25rem) | 600 | 1.4 | Compact headings, list titles |
| Nav / UI Large | Inter | 16px (1rem) | 500 | 1.5 | Navigation links, prominent UI text |
| Body | Inter | 16px (1rem) | 400 | 1.6 | Standard paragraphs, descriptions |
| Button Label | Inter | 16px (1rem) | 600 | 1.0 | Button text, CTA labels |
| Caption | Inter | 14px (0.875rem) | 400 | 1.5 | Metadata, small descriptions |
| Micro / Legal | Inter | 12px (0.75rem) | 400 | 1.5 | Fine print, legal text, footnotes |

### Principles
- **Bold headlines, readable body**: Work Sans headings at 600-700 weight for confident authority. Inter body at 400 for comfortable reading.
- **Sentence case everywhere**: "Service offerings" not "Service Offerings". Consistent with brand guidelines.
- **Minimum sizes**: 12px for footnotes, 16px for body text. Never smaller.
- **Tabular figures**: Use `font-variant-numeric: tabular-nums` in pricing tables and financial data.

---

## 4. Component Stylings

### Buttons

**Primary Teal (CTA)**
- Background: Primary Teal (`#09A47A`)
- Text: Pure White (`#FFFFFF`)
- Padding: 14px 28px
- Radius: 999px (full pill)
- Font: Inter 600, 16px
- Hover: background shifts to Dark Teal (`#077A5B`), shadow `rgba(9,164,122,0.15) 0px 4px 16px`
- Framer Motion: `whileHover={{ scale: 1.02, y: -1 }}` `whileTap={{ scale: 0.98 }}`
- The primary action button -- book now, get a quote, call us

**Secondary White**
- Background: Pure White (`#FFFFFF`)
- Text: Primary Teal (`#09A47A`)
- Border: 2px solid Primary Teal (`#09A47A`)
- Padding: 12px 24px
- Radius: 999px (full pill)
- Hover: background shifts to Table Stripe (`#F0FAF6`)
- Used as secondary action alongside Primary Teal

**Ghost / Text Button**
- Background: transparent
- Text: Primary Teal (`#09A47A`)
- Padding: 8px 16px
- Hover: background shifts to `#F0FAF6`, underline appears
- Used for tertiary actions, "Learn more" links

**Chip / Filter**
- Background: Chip Light (`#F0FAF6`)
- Text: Text Dark (`#28251D`)
- Padding: 10px 20px
- Radius: 999px (full pill)
- Active: Primary Teal background, white text (inversion)
- Service type selectors, category filters

**Phone CTA (Sticky)**
- Background: Primary Teal (`#09A47A`)
- Icon: phone icon in white, left-aligned
- Text: "(782) 830-5900" in White, Inter 600
- Radius: 999px
- Shadow: `rgba(0,0,0,0.12) 0px 4px 16px`
- Fixed position on mobile (bottom of viewport)
- Framer Motion: slide up on scroll, `initial={{ y: 100 }}` `animate={{ y: 0 }}`

### Cards & Containers

**Service Card**
- Background: Pure White (`#FFFFFF`)
- Border: none -- defined by shadow
- Radius: 12px
- Shadow: `rgba(0,0,0,0.08) 0px 4px 16px`
- Hover shadow: `rgba(9,164,122,0.12) 0px 8px 24px`
- Padding: 32px
- Framer Motion: `whileHover={{ y: -4 }}` with spring transition
- Contains: service icon, title (Work Sans 600), price, description, CTA button

**Pricing Card**
- Same as Service Card but with a highlighted "Most Popular" variant:
  - Border-top: 4px solid Primary Teal (`#09A47A`)
  - Badge: "Most Popular" pill in Primary Teal with white text
  - Background: `#F0FAF6` for the highlighted card

**Testimonial Card**
- Background: Background Light (`#F7F6F2`)
- Radius: 12px
- Padding: 24px
- Stars: 5x Star Gold (`#FBBF24`) icons
- Quote text: Inter 400, 16px, italic
- Customer name: Inter 600, 14px
- Source badge: "Google Review" with Google icon

**Trust Badge Row**
- Horizontal row of badges: BBB A Rating, 5.0 Google Stars (38 reviews), Eco-Friendly, Licensed #4615849
- Each badge: pill-shaped, Chip Light background, small icon + text
- Framer Motion: stagger fade-in on scroll, 0.1s delay between each

### Navigation

**Desktop Nav**
- Sticky top, white background, shadow on scroll: `rgba(0,0,0,0.06) 0px 1px 0px`
- Logo: GreenPump Care stacked wordmark, left-aligned
- Links: Inter 500, 16px, Text Dark (`#28251D`)
- Active link: Primary Teal text with 2px bottom border
- CTA: Primary Teal pill button "Book Now" right-aligned
- Phone: "(782) 830-5900" with phone icon, right of CTA
- Framer Motion: nav shadow fades in on scroll `useMotionValueEvent`

**Mobile Nav**
- Hamburger menu icon (3 lines), 44px touch target
- Slide-in panel from right, white background
- Full-height overlay with backdrop blur
- Links stacked vertically, 48px row height
- Framer Motion: `AnimatePresence` slide + fade

### Inputs & Forms

**Text Input**
- Background: Pure White
- Border: 1px solid `#D1D5DB` (gray-300), focus: 2px solid Primary Teal
- Radius: 8px
- Padding: 14px 16px
- Label: Inter 500, 14px, above input
- Placeholder: Inter 400, `#9CA3AF` (gray-400)

**Booking Widget**
- Prominent form card with teal header bar
- Fields: Service type (dropdown), Preferred date, Name, Phone, Email, Address
- CTA: Full-width Primary Teal pill button "Book Your Clean"
- Trust text below: "Free estimates. No obligation." in Caption size

### Before/After Slider
- Full-width image container, 12px radius
- Draggable divider line in Primary Teal
- "Before" / "After" labels in pill badges
- Framer Motion: `drag="x"` on divider with constraints

---

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px
- Button padding: 14px 28px (primary), 12px 24px (secondary)
- Card internal padding: 24-32px
- Section vertical spacing: 80-128px between major sections
- Component gap: 16-24px within card grids

### Grid & Container
- Max container width: 1200px, centered with 24px horizontal padding
- Hero: full-width teal gradient or image background, content max-width 1200px
- Service sections: 3-column card grid (desktop), 1-column (mobile)
- Pricing: 3-column card grid with center card elevated
- Footer: 4-column link grid on teal background

### Whitespace Philosophy
- **Clean but not empty**: Enough space to breathe, dense enough to feel professional and trustworthy. This is a service company -- customers need information, not art galleries.
- **Above-the-fold priority**: Phone number, booking CTA, and value proposition must be visible without scrolling.
- **F-pattern scanning**: Key information (pricing, phone, booking) placed along the natural eye path.

### Border Radius Scale
- Sharp (0px): Not used on interactive elements
- Subtle (4px): Small badges, inline tags
- Standard (8px): Input fields, small cards, images
- Comfortable (12px): Service cards, pricing cards, containers
- Full Pill (999px): All buttons, chips, nav pills, CTAs
- Circle (50%): Avatar images, icon containers, step numbers

---

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (L0) | No shadow | Page background, inline content |
| Subtle (L1) | `rgba(0,0,0,0.06) 0px 1px 3px` | Nav bar on scroll, subtle dividers |
| Card (L2) | `rgba(0,0,0,0.08) 0px 4px 16px` | Service cards, testimonial cards |
| Elevated (L3) | `rgba(0,0,0,0.12) 0px 8px 24px` | Pricing highlight card, modals |
| Floating (L4) | `rgba(9,164,122,0.15) 0px 8px 24px` | Hover state for CTAs, floating phone button |
| Pressed | `rgba(0,0,0,0.06) inset` | Active/pressed button states |

---

## 7. Framer Motion Specifications

### Page Transitions
```jsx
// Page wrapper
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
/>
```

### Scroll Reveal (Sections)
```jsx
// Each major section
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
/>
```

### Stagger Children (Card Grids)
```jsx
// Parent container
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};
// Each card
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};
```

### Card Hover
```jsx
<motion.div
  whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(9,164,122,0.12)" }}
  transition={{ type: "spring", stiffness: 300, damping: 25 }}
/>
```

### Button Interactions
```jsx
<motion.button
  whileHover={{ scale: 1.02, y: -1 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 20 }}
/>
```

### Counter Animation (Stats)
```jsx
// "38 Five-Star Reviews", "99 Jobs Completed"
<motion.span
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
/>
// Use framer-motion useMotionValue + useTransform for counting
```

### Mobile Menu
```jsx
<AnimatePresence>
  {isOpen && (
    <motion.nav
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
    />
  )}
</AnimatePresence>
```

### Scroll-Linked Nav Shadow
```jsx
const { scrollY } = useScroll();
const navShadow = useTransform(scrollY, [0, 50], ["0px 0px 0px rgba(0,0,0,0)", "0px 1px 3px rgba(0,0,0,0.06)"]);
```

---

## 8. Page Structure

### Required Pages

| Page | URL Path | Purpose |
|------|----------|---------|
| Home | `/` | Value proposition, trust badges, booking CTA, services overview, testimonials |
| Ductless Mini-Split | `/ductless-mini-split-cleaning` | Detailed service page, $199 pricing, process steps, before/after |
| Ducted System | `/ducted-system-cleaning` | Dedicated ducted service page, $349 pricing |
| HRV/ERV Cleaning | `/hrv-erv-cleaning` | First-mover SEO page, $129 pricing, education content |
| Pricing | `/pricing` | All services + Care Plans side-by-side, bundle deals, transparent pricing |
| About | `/about` | Team, company story, certifications, BBB rating, values |
| Blog | `/blog` | Halifax-specific content, seasonal guides, maintenance tips |
| Contact | `/contact` | Phone, email, form, hours, booking widget, map |

### Home Page Sections (in order)
1. **Hero**: Full-width teal gradient background, headline "Halifax's Premium Heat Pump Cleaning Service", sub-text, "Book Your Clean" CTA + phone number
2. **Trust Bar**: BBB A Rating | 5.0 Stars (38 Reviews) | Licensed | Eco-Friendly -- pill badges in a horizontal row
3. **Services Overview**: 3 service cards (Mini-Split $199, Ducted $349, HRV/ERV $129) + Bundle card
4. **Why GreenPump Care**: Icon grid -- 1+ Hour Deep Clean, Before/After Photos, Eco-Friendly Products, Warranty Compliant, Extended Hours, All Brands Serviced
5. **Before/After Slider**: Interactive image comparison showing cleaning results
6. **Care Plans**: 3 pricing cards (Essential $22/mo, Comfort $35/mo, Complete $55/mo)
7. **Testimonials**: Carousel of Google reviews with star ratings
8. **Booking CTA Section**: Full-width teal background, "Ready for Cleaner Air?", booking form or CTA
9. **Service Area**: Map of Halifax Regional Municipality coverage
10. **Footer**: Teal background, 4-column layout (Services, Company, Contact, Hours), social links, legal

---

## 9. Company Information

| Field | Value |
|-------|-------|
| Company Name | GreenPump Care Inc. |
| Parent Company | GreenPump Energy Inc. (DO NOT reference on customer-facing site) |
| Phone | (782) 830-5900 |
| Email | info@greenpumpcare.com |
| Website | www.greenpumpcare.ca |
| Address | 3600 Kempt Rd 212, Halifax, NS B3K 4X8 |
| License | #4615849 |
| Service Area | Halifax Regional Municipality, Nova Scotia |
| Hours | Mon-Fri 8am-8pm, Sat 10am-5pm |
| BBB Rating | A (accredited since Jan 2025) |
| Google Rating | 5.0 / 5.0 (38 reviews, 100% five-star) |
| Brand Promise | "Professional. Reliable. Communicative." |

### Services & Pricing (before HST)
| Service | Price | Description |
|---------|-------|-------------|
| Ductless Mini-Split Deep Clean | $199 | 1+ hour per head; complete disassembly; coil wash; antimicrobial; before/after photos |
| Ducted System Deep Clean | $349 | Full ducted system service with complete coil and component cleaning |
| HRV/ERV Cleaning | $129 | Core, filters, and ductwork -- the only premium HRV service in Halifax |
| HP + HRV Bundle | $299 | Mini-split + HRV combined (save $29) |

### Care Plan Subscriptions
| Plan | Monthly | Includes |
|------|---------|----------|
| Essential | $22/mo | Annual deep clean, 10% off additional services |
| Comfort | $35/mo | Semi-annual deep clean, priority scheduling, 15% off |
| Complete | $55/mo | Quarterly check-ins, priority scheduling, 20% off, diagnostic fee waiver |

---

## 10. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | < 640px | Single column, stacked cards, hamburger nav, sticky phone CTA |
| Tablet | 640-1024px | 2-column grids, expanded cards |
| Desktop | > 1024px | 3-column grids, horizontal nav, full hero layout |

### Mobile-First Priorities
- Phone number always visible (sticky footer bar on mobile)
- Booking CTA above the fold on all devices
- Service cards stack to full-width single column
- Pricing cards: horizontal scroll or stacked with "Most Popular" first
- Navigation collapses to hamburger with slide-in panel
- Hero headline scales: 52px (desktop) -> 36px (tablet) -> 28px (mobile)

---

## 11. Do's and Don'ts

### Do
- Use Primary Teal (`#09A47A`) as the dominant accent -- it IS the GreenPump Care brand
- Use 999px border-radius for all buttons, chips, and pill-shaped elements (Uber influence)
- Keep Work Sans for all headings at 600-700 weight -- confident and clean
- Show pricing transparently on every service page -- transparency builds trust
- Include phone number (782) 830-5900 in header, visible on every page
- Use subtle shadows (0.08-0.12 opacity) for card elevation
- Add Framer Motion scroll reveals to every section (once: true, no repeat)
- Use before/after photography as primary visual content
- Include trust badges (BBB, Google rating, eco-friendly, licensed) prominently

### Don't
- Don't reference GreenPump Energy anywhere on the site
- Don't use heavy shadows or glowing effects -- keep depth subtle
- Don't hide pricing behind forms or phone calls -- be transparent
- Don't use stock photography of generic HVAC -- use real before/after content
- Don't over-animate -- Framer Motion should enhance, not distract. Max 0.6s duration.
- Don't use serif fonts -- Work Sans + Inter only
- Don't place teal text on green backgrounds (or vice versa) -- maintain WCAG AA contrast (4.5:1 min)
- Don't use the GreenPump Energy logo anywhere
- Don't use aggressive sales language -- be educational and service-first
