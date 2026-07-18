# Rug Studio

Portfolio demo of an ecommerce experience for custom tufted rugs. The project presents a fictional brand and a complete customer flow, from catalog and product configuration to delivery, payment, and order management.

## Highlights

The public interface includes an editorial landing page, product catalog, configurable rug size and date, reference image upload, delivery selection, checkout, and payment result states. A separate admin area covers order and schedule management.

All rug visuals in the current interface were generated specifically for this demo. They do not represent an existing company or product catalog.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run lint
npm run build
```

The application uses Next.js, TypeScript, Supabase, and Stripe. Environment variables are required for the connected ordering and admin flows.
