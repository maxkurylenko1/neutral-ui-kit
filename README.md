# Neutral UI Kit

> A production-ready React component library built with accessibility, performance, and developer experience in mind.

The repository already includes:

- a running demo application (Next.js) – https://neutral-ui-kit.vercel.app
- a documented component catalog (Storybook) – https://maxkurylenko1.github.io/neutral-ui-kit
- CI/CD pipelines (GitHub Actions) for linting, unit tests, visual tests, and Storybook deploy

---

## Live

- **Next.js demo**: https://neutral-ui-kit.vercel.app
- **Storybook**: https://maxkurylenko1.github.io/neutral-ui-kit
- **Source**: https://github.com/maxkurylenko1/neutral-ui-kit

The demo page (`/demo`) shows components in realistic layout blocks (foundation, forms, data, overlays), so reviewers can quickly understand the scope.

---

## ✨ Highlights

- **Component-first**: buttons, inputs, textarea, select, checkbox, switch, tabs, dropdown menu, dialog, tooltip (wrapped to avoid Radix single-child errors), toast/toaster.
- **Data view**: table on top of **@tanstack/react-table** with sorting, pagination, empty state and stable width between pages.
- **Theme support**: light/dark via a shared theme provider and Tailwind-based tokens.
- **Two entry points**: Next.js app (integration example) and Storybook (component-level documentation).
- **Automated quality**: Vitest for unit tests, Playwright for visual regression, ESLint + Prettier.
- **CI/CD ready**: workflows already run on push/PR, install Playwright browsers, build Storybook, and can publish releases.

---

## 🎯 Tech stack

- **Framework:** Next.js 14 (App Router)
- **UI primitives:** Radix UI
- **Styling:** TailwindCSS 3, class-variance-authority, tailwind-merge
- **Tables:** @tanstack/react-table v8
- **Docs:** Storybook 8 (`@storybook/nextjs`)
- **Tests:** Vitest + @testing-library/react
- **Visual tests:** Playwright
- **CI/CD:** GitHub Actions

---

## 🚀 Getting started

```bash
git clone https://github.com/maxkurylenko1/neutral-ui-kit.git
cd neutral-ui-kit

pnpm install          # or: npm install

pnpm dev              # http://localhost:3000
# Demo: http://localhost:3000/demo

pnpm storybook        # http://localhost:6006
```

---

## 📦 Components

### Base Inputs ✅

- **Button** - 5 variants, 3 sizes, loading state, icon support
- **Input** - Label, error, helper text, left/right icons
- **Checkbox** - Indeterminate state, compound pattern
- **Switch** - Toggle with label, description, error handling

### Overlays ✅

- **Dialog** - Focus trap, ESC/backdrop close
- **Toast** - Queue manager, auto-dismiss
- **Tooltip** - Keyboard friendly, customizable delay

### Navigation ✅

- **Tabs** - Controlled/uncontrolled modes
- **Dropdown** - Keyboard navigation

### Form Components ✅

- **Select** - Custom dropdown, keyboard navigation, controlled/uncontrolled
- **Textarea** - Auto-resize, character count, error state

### Data Display ✅

- **Table** - Sorting, sticky header, empty state
- **Pagination** - Keyboard accessible, page size control

### Coming Soon 🚧

- Card, Badge, Avatar

---

## 🏗️ Project Structure

```
neutral-ui-kit/
├── app/                    # Next.js pages
├── components/
│   ├── ui/                # UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── tests/         # Component tests
│   └── theme-provider.tsx
├── stories/               # Storybook stories
├── styles/
│   ├── globals.css
│   └── tokens.css         # Design tokens
├── lib/
│   ├── utils.ts           # cn() helper
│   └── constants.ts       # Z-index, breakpoints
└── .storybook/            # Storybook config
```

---

## 🧪 Testing

**Unit tests (Vitest):**

```bash
pnpm test:run
```

**Visual tests (Playwright):**

```bash
# make sure Storybook is running or built and served
pnpm storybook

# run visual suite
pnpm test:visual

# accept intentional UI changes
pnpm test:visual:update
```

Visual baselines are committed under:

```text
tests/visual/*.spec.ts-snapshots/
```

CI installs Playwright browsers (`pnpm exec playwright install --with-deps`) and compares current UI against these baselines. If there is a difference (e.g. fonts on Linux), the workflow uploads a report.

---

## CI / CD

Workflows in `.github/workflows/` perform:

1. dependency installation (pnpm)
2. linting (`next lint`)
3. unit tests (`pnpm test:run`)
4. visual tests (`pnpm exec playwright test`)
5. Storybook build and publication to GitHub Pages
6. optional semantic-release (tags and GitHub releases)

---

## 🎯 Design Principles

1. **Accessibility First** - Every component follows WCAG 2.1 guidelines
2. **Composable** - Build complex UIs from simple primitives
3. **Type-Safe** - Catch errors at compile time, not runtime
4. **Performant** - Optimized bundle size and runtime performance
5. **Developer Experience** - Clear APIs, great documentation

---

## 9. License

MIT — you can reuse the structure, component patterns, and workflows.

**Built with ❤️ by Maksym Kurylenko**
