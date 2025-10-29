# Neutral UI Kit

> A production-ready React component library built with accessibility, performance, and developer experience in mind.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Storybook](https://img.shields.io/badge/Storybook-8.4-ff4785.svg)](https://storybook.js.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **Design System** - HSL-based theming with automatic dark mode
- ♿ **Accessibility First** - WCAG 2.1 compliant with proper ARIA attributes
- 🔧 **Type-Safe** - Full TypeScript support with strict mode
- 📦 **Tree-Shakeable** - Import only what you need
- 🧪 **Well Tested** - 50%+ test coverage with Vitest + RTL
- 📖 **Documented** - Comprehensive Storybook documentation
- 🎭 **Composable** - Built on Radix UI primitives
- 🚀 **Performance** - Optimized bundle size and runtime

## 🎯 Tech Stack

```
Frontend:     React 18, TypeScript, Tailwind CSS
Primitives:   Radix UI (Dialog, Dropdown, Tabs, Tooltip, etc.)
Styling:      CVA (class-variance-authority), clsx, tailwind-merge
Testing:      Vitest, React Testing Library, @testing-library/jest-dom
Docs:         Storybook 8.4 with autodocs
Tooling:      Next.js 14, ESLint, Prettier, Husky
```

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

### Coming Soon ✅

- Select, Radio, Textarea
- Card, Badge, Avatar
- Table, Pagination

## 🚀 Getting Started

### Prerequisites

```bash
Node.js 18+ and pnpm (or npm/yarn)
```

### Installation

```bash
# Clone the repository
git clone https://github.com/maxkurylenko1/neutral-ui-kit.git
cd neutral-ui-kit

# Install dependencies
pnpm install

# Start Storybook
pnpm storybook

# Run tests
pnpm test

# Run Next.js dev server
pnpm dev
```

### Usage Example

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

function App() {
  return (
    <form>
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        helperText="We'll never share your email"
      />

      <Checkbox
        label="Subscribe to newsletter"
        description="Get weekly updates"
      />

      <Button variant="primary" size="lg">
        Submit
      </Button>
    </form>
  );
}
```

## 🎨 Theming

The design system uses CSS variables for easy theming:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... */
}

[data-theme="dark"] {
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  /* ... */
}
```

Switch themes programmatically:

```tsx
import { useTheme } from "@/components/theme-provider";

const { theme, setTheme } = useTheme();
setTheme("dark"); // or 'light'
```

## 🧪 Testing

All components include:

- **Unit tests** - Vitest + React Testing Library
- **Accessibility tests** - ARIA attributes, keyboard navigation
- **Visual regression** - Storybook stories

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui
```

## 📚 Documentation

Explore components in Storybook:

```bash
pnpm storybook
```

Visit `http://localhost:6006` to see:

- Live component examples
- Interactive controls
- Accessibility guidelines
- Code snippets

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

## 🎯 Design Principles

1. **Accessibility First** - Every component follows WCAG 2.1 guidelines
2. **Composable** - Build complex UIs from simple primitives
3. **Type-Safe** - Catch errors at compile time, not runtime
4. **Performant** - Optimized bundle size and runtime performance
5. **Developer Experience** - Clear APIs, great documentation

## 🔧 Development

```bash
# Lint code
pnpm lint

# Format code
pnpm format

# Build for production
pnpm build

# Type check
pnpm type-check
```

## 📈 Roadmap

- [x] : Base inputs (Button, Input, Checkbox, Switch)
- [x] : Overlays (Dialog, Toast, Tooltip) + Navigation (Tabs, Dropdown)
- [x] : Form components (Select, Radio, Textarea)
- [x] : Data display (Card, Badge, Avatar)
- [x] : Advanced (Table, Pagination, Carousel)
- [ ] : Polish, docs, npm publish

## 📄 License

MIT © [Maksym Kurylenko](https://github.com/maxkurylenko1)

## 🔗 Links

- [LinkedIn](https://www.linkedin.com/in/maxkurylenko)
- [GitHub](https://github.com/maxkurylenko1)

---

**Built with ❤️ by Maksym Kurylenko**
