# Rug Studio design direction

source: extracted from the existing interface and refined for a portfolio demo

## Character

Rug Studio is a bold editorial commerce concept. It combines gallery like product photography with a direct black, warm white, and yellow interface. The result should feel crafted, tactile, and clearly presented as a fictional portfolio project.

## Build mandate

Every public screen must communicate that this is a portfolio demo, not a real company website. Lead with the rugs, use concise Polish copy, preserve the strong black and yellow contrast, and avoid references to real delivery brands or a named workshop owner.

## Composition patterns

Use full width dark sections for primary moments, warm neutral surfaces for product context, and yellow sections for process explanations. Keep content inside the existing centered wide containers. Pair large editorial headlines with practical microcopy and visible demo labels.

## Component and usage rules

Use compact squared cards, restrained corner rounding, thin borders, and strong text hierarchy. Product photography should have generous framing and clear alt text. Calls to action use the yellow accent on dark surfaces or dark ink on yellow surfaces. Motion stays subtle and respects reduced motion preferences.

## Responsive behavior

Stack image and copy on small screens. Keep touch targets at least 44 pixels high. Allow editorial split layouts from the large breakpoint. Do not crop the main rug silhouettes on mobile.

## Tokens

Token values live in `app/globals.css`. Tailwind utility classes remain the implementation source of truth.
