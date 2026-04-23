# 📄 Invoice Management App

A full-featured invoice management application built with **Next.js 14**, **TypeScript**, and **Styled Components**. Create, edit, filter, and manage invoices with a polished UI that supports both light and dark modes across all device sizes.

---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd invoice-management-app

# 2. Install dependencies
npm install
# or
yarn install

# 3. Run the development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

### Environment

No environment variables are required. The app uses `localStorage` for data persistence — no backend or database setup needed.

---

## 🏗️ Architecture Explanation

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Styled Components |
| Forms | Formik + Yup |
| State (theme) | React Context API |
| Data persistence | localStorage |
| Font | League Spartan (Google Fonts) |

### Folder Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — wraps ThemeProvider + AppShell + Sidebar
│   ├── page.tsx            # Invoice list page
│   └── [id]/
│       └── page.tsx        # Dynamic invoice detail page
├── components/
│   ├── AppShell.tsx        # Theme-aware root container (flex direction switch on tablet)
│   ├── Sidebar.tsx         # Navigation + dark mode toggle
│   ├── InvoiceList.tsx     # Maps invoices → InvoiceRow
│   ├── InvoiceRow.tsx      # Single invoice row with responsive grid layout
│   ├── InvoiceDetail.tsx   # Full invoice view with edit/delete/mark-as-paid
│   ├── InvoiceForm.tsx     # Formik-powered create/edit form
│   ├── EmptyState.tsx      # Shown when no invoices exist
│   ├── LeftModal.tsx       # Slide-in modal (used for create/edit form)
│   ├── CenterModal.tsx     # Centered overlay modal (used for delete confirm)
│   └── portal.tsx          # React Portal wrapper
├── lib/
│   ├── constants/
│   │   ├── colors.ts       # Design token color palette
│   │   └── breakpoints.ts  # Responsive breakpoint constants
│   ├── context/
│   │   └── ThemeContext.tsx # isDark state + toggleTheme — consumed via useTheme()
│   └── localStorage.ts     # CRUD helpers: getInvoices, addInvoice, updateInvoice, deleteInvoice
└── types/
    └── invoice.ts          # Invoice, InvoiceItem, BillFrom, BillTo type definitions
```

### Data Flow

```
localStorage  ←→  lib/localStorage.ts  ←→  page.tsx (useState)
                                               ↓
                                         InvoiceList
                                               ↓
                                         InvoiceRow  →  /[id]  →  InvoiceDetail
```

### Theme System

The dark/light mode is managed via a **React Context** (`ThemeContext`) — no external state library required. Any component can access the current theme by calling:

```tsx
const { isDark, toggleTheme } = useTheme();
```

The toggle lives in the Sidebar moon icon. `isDark` flows down as a `$isDark` prop to every styled component that needs theme-aware styles.

### Routing

The app uses Next.js **App Router**. The invoice detail page uses a dynamic segment `[id]` and unwraps `params` using React's `use()` hook (required for Next.js 15 compatibility where `params` is a Promise).

---

## ⚖️ Trade-offs

### localStorage vs. a Real Backend

**Chosen:** `localStorage` for data persistence.

- ✅ Zero setup, works offline, no backend required
- ✅ Instant read/write, no loading states needed for most operations
- ❌ Data is lost if the user clears browser storage
- ❌ Not shareable across devices or users
- ❌ No real-time sync or multi-user support

**If scaling:** replace `lib/localStorage.ts` helpers with API calls — the rest of the app is agnostic to the data layer.

---

### React Context vs. Zustand for Theme

**Chosen:** React Context API.

- ✅ No additional dependency
- ✅ Sufficient for a single global boolean (`isDark`)
- ❌ Would not scale well for complex shared state (cart, auth, filters)
- ❌ All consumers re-render on context change (acceptable here since theme changes are infrequent)

**If expanding:** Zustand would be preferable for additional global state (e.g. invoice filters, user session).

---

### Styled Components vs. Tailwind CSS

**Chosen:** Styled Components.

- ✅ Scoped styles, no class name conflicts
- ✅ Dynamic styles via props (`$isDark`, `$status`) are clean and type-safe
- ✅ Co-located with component logic
- ❌ Increases bundle size vs. utility-first CSS
- ❌ Requires `"use client"` in Next.js App Router for SSR compatibility
- ❌ More verbose than Tailwind for simple utility styles

---

### Formik + Yup vs. React Hook Form

**Chosen:** Formik + Yup.

- ✅ Declarative validation schema with Yup is readable and maintainable
- ✅ `FieldArray` makes dynamic item lists straightforward
- ❌ Heavier than React Hook Form in bundle size
- ❌ Slightly more re-renders than uncontrolled form approaches

---

## ♿ Accessibility Notes

- **Keyboard navigation:** All interactive elements (buttons, inputs, selects) are native HTML elements and are fully keyboard accessible.
- **Semantic HTML:** The form uses a proper `<form>` element (via Formik's `Form` component), and headings follow a logical hierarchy (`h1` → `h2` → `h3`).
- **ARIA labels:** The sidebar moon icon button has a `title="Toggle dark mode"` attribute for screen reader context.
- **Colour contrast:** Status badges (Paid, Pending, Draft) use distinct foreground/background colour pairs that maintain readable contrast in both light and dark modes.
- **Focus styles:** Inputs display a visible `box-shadow` focus ring using the brand purple colour (`rgba(124, 58, 237, 0.1)`), ensuring keyboard users can track focus.
- **Modal behaviour:** Both `LeftModal` and `CenterModal` use `e.stopPropagation()` to prevent accidental dismissal, and clicking the backdrop closes the modal as expected.

### Known Accessibility Gaps

- Focus is not trapped inside open modals (a full implementation would use `focus-trap-react` or equivalent).
- The delete confirmation modal does not return focus to the triggering button on close.
- Screen reader announcements for dynamic content changes (e.g. invoice saved) are not yet implemented.

---

## ✨ Improvements Beyond Requirements

### Dark Mode
Full dark/light theme toggle accessible via the sidebar moon icon. Every component — forms, modals, cards, badges — responds to the theme. The preference is held in React Context and survives navigation within the session.

### Responsive Design
Three-tier responsive layout:
- **Desktop (> 768px):** Full horizontal invoice grid with all columns visible
- **Tablet (≤ 768px):** Sidebar moves to top, invoice rows reflow into a 2-column card layout, action buttons move to a sticky bottom bar on the detail page
- **Mobile (≤ 400px):** Tighter padding and font sizes, full-width modal drawer

### Calculated Fields
When creating an invoice, `paymentDue` is automatically calculated from `invoiceDate` + `paymentTerms` (Net 15/30/60 days), and `amount` is derived from the sum of all line items — reducing manual data entry errors.

### Slide-in Form Modal
The invoice creation/edit form slides in from the left using a CSS transform animation (`translateX`), matching the Figma design spec rather than using a simple show/hide toggle.

### Live Item Totals
In the invoice form, each line item's total (`qty × price`) is computed and displayed in real time as the user types, with no submit required.

### Portal-based Modals
Both modal types render via React Portal into `document.body`, ensuring correct stacking context and preventing z-index issues with positioned parent elements.

### Form Validation with User Feedback
All form fields display inline error messages via Yup + Formik's `ErrorMessage` component. Validation only runs on submit to avoid premature error noise.

---

## 📸 Screenshots

| Light Mode | Dark Mode |
|---|---|
| Invoice List | Invoice List (Dark) |
| Invoice Detail | Invoice Detail (Dark) |

---

