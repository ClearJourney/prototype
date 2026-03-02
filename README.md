# Clear Journey

A lightweight client management and follow-up tool for independent and boutique luxury travel advisors. Store client details and preferences, track follow-ups, and stay organised without spreadsheets or complex CRMs.

## Prerequisites: Node.js and npm

You need **Node.js** (which includes **npm**) installed. If you see `zsh: command not found: npm`, install Node first.

**Option A — Download (easiest)**  
1. Go to [https://nodejs.org](https://nodejs.org).  
2. Download the **LTS** version and run the installer.  
3. Quit and reopen your terminal, then run `node -v` and `npm -v` to confirm.

**Option B — Homebrew** (if you use Homebrew)  
```bash
brew install node
```  
Then restart your terminal.

After Node is installed, continue with “Getting started” below.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React** (client components for forms and modals)

## Getting started

```bash
cd clear-journey
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage (marketing) |
| `/signup` | Create account |
| `/login` | Sign in |
| `/onboarding` | First-time: add clients one by one, import CSV, or white-glove |
| `/dashboard` | Dashboard home |
| `/dashboard/clients` | Clients list (+ Import modal via `?import=1`) |
| `/dashboard/clients/new` | Add new client (multi-step: Details, Travel Preferences, Loyalty Programs, Key Dates, Documents) |

## Flow

1. **Homepage** → Sign up or Log in  
2. **Sign up** → Start trial → **Onboarding**  
3. **Onboarding** → Add a Client **or** Upload CSV **or** Request White-Glove  
4. **Add a Client** → Multi-step form (5 tabs) → Save Client → Clients list  
5. **Upload CSV** → Import modal: Download template → Upload file → Confirm → Processing → Success → View Clients  

## Design

- Apple-like, minimal, premium UI  
- Palette: sand/off-white background, navy primary actions, charcoal text, green success  
- No backend in this MVP; all state is client-side.
