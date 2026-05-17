# ORM (Off-Road Modifications) Project Guidelines

## Tech Stack
- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS v3.4.1 (Utility-first approach)
- **State Management:** React Context (Auth, Cart, Wishlist)
- **Routing:** React Router DOM v7
- **3D Rendering:** Google Model Viewer (`<model-viewer>`)
- **Backend:** Python/Django (Hosted on Render: `https://orm-backend-gejw.onrender.com`)

## Engineering Standards

### 1. Styling & UI
- **Tailwind Only:** DO NOT add new CSS files or use external stylesheets. All styling must be done via Tailwind utility classes.
- **Design System:** Use the custom theme defined in `tailwind.config.cjs`:
  - **Colors:** `orm-gold` (primary), `orm-dark` (background), `orm-surface` (cards/elevated), `orm-gray` (borders).
  - **Fonts:** `font-merriweather` (headings), `font-sans` (Inter for UI/Body).
- **Professional Look:** Maintain the "clean" aesthetic—use `rounded-2xl` or `rounded-3xl` for cards, `backdrop-blur` for overlays, and `orm-premium` shadows for depth.
- **Responsive Prefixes:** Always ensure components are mobile-friendly using `max-[breakpoint]:` or standard `md:`, `lg:` prefixes.

### 2. Component Structure
- **Logic Preservation:** Never modify API integration logic (`fetch` calls) or state management hooks unless specifically requested.
- **Surgical Edits:** When updating components, keep the existing JSX structure (nesting) to avoid breaking React Refs or layout relationships.
- **Iconography:** Use `react-icons/fa` (Font Awesome) for consistency.

### 3. File Organization
- **Components:** `src/components/` for customer-facing UI.
- **Admin:** `src/components/admin/` for back-office management.
- **Global Styles:** `src/index.css` contains Tailwind directives and global base styles.
- **No Styles Folder:** The `src/styles` folder has been deprecated and removed.

### 4. Critical Constraints
- **Imports:** Always use `useNavigate` from `react-router-dom`, never `navigate`.
- **Media URLs:** Use the `BASE_URL` constant or helper functions to handle relative backend image paths.
- **3D Models:** Ensure `.glb` models are loaded with `camera-controls` and `shadow-intensity` for visual quality.

## Project Memory
- **Migration Date:** May 2026
- **Major Change:** Complete conversion from Vanilla CSS to Tailwind CSS to fix style coupling and modernize the UI.
- **Structure Status:** The project structure has been kept identical to the original version, with only styling implementation being changed.
