# ⚡ Activity App

> A modern, real-time daily activity tracker — schedule tasks, watch live countdowns, get weather-based suggestions, and visualise your productivity.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20App-4f46e5?style=for-the-badge)](https://activity-app-git-master-jannaten-nayems-projects.vercel.app)
[![React](https://img.shields.io/badge/React-19.1-61dafb?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.6-764abc?style=flat-square&logo=redux&logoColor=white)](https://redux-toolkit.js.org)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)

---

## What is this project?

Activity App is a **personal productivity tracker** built as a portfolio-quality React application. You create daily activities with a scheduled time, and the app counts down in real time, notifies you when a task is due, and gives you weather-aware suggestions on what to do based on current conditions in your city.

It started as a 6-year-old legacy React 17 / CRA / vanilla Redux project and was fully modernised to React 19, Vite, Redux Toolkit, and React Hook Form — with five new features added on top.

---

## ✨ Features

| Feature                     | Description                                                             |
| --------------------------- | ----------------------------------------------------------------------- |
| 📋 **Activity Management**  | Create, edit, delete, and drag-and-drop to reorder activities           |
| ⏱️ **Live Countdown**       | Per-minute countdown with animated progress bars                        |
| 🔴 **Overdue Detection**    | Activities turn red and show "X minutes overdue" automatically          |
| 🌤️ **Weather Widget**       | Live weather from OpenWeatherMap with city search                       |
| 💡 **Smart Suggestions**    | Weather-aware activity recommendations (clear sky → go for a run, etc.) |
| 🔔 **Notifications**        | Real-time panel alerts when a scheduled activity starts                 |
| 🔍 **Search & Sort**        | Debounced live search + sort by name, time, or status                   |
| 📊 **Statistics Dashboard** | Pie chart, bar chart, and 7-day trend line via Recharts                 |
| 🌙 **Dark Mode**            | System-aware dark/light mode, persisted across sessions                 |
| ↩️ **Undo Actions**         | Auto-dismissing undo toast on every delete, archive, or update          |
| 🗄️ **Session Persistence**  | Redux Persist keeps data alive across page refreshes                    |
| 📱 **Responsive Design**    | Mobile-first layout with accessible hamburger navigation                |
| ♿ **Accessible**           | ARIA labels, live regions, focus management, keyboard navigation        |
| 💨 **Skeleton Loading**     | Shimmer placeholder states during async data fetching                   |

---

## 🛠️ Tech Stack

| Layer            | Technology                                               | Version |
| ---------------- | -------------------------------------------------------- | ------- |
| UI Framework     | [React](https://react.dev)                               | 19.1    |
| Build Tool       | [Vite](https://vitejs.dev)                               | 6.x     |
| State Management | [Redux Toolkit](https://redux-toolkit.js.org)            | 2.6     |
| Routing          | [React Router](https://reactrouter.com)                  | 7.x     |
| Form Validation  | [React Hook Form](https://react-hook-form.com)           | 7.x     |
| Drag & Drop      | [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) | 18.x    |
| Charts           | [Recharts](https://recharts.org)                         | 2.x     |
| HTTP Client      | [Axios](https://axios-http.com)                          | 1.x     |
| Persistence      | [redux-persist](https://github.com/rt2zz/redux-persist)  | 6.x     |
| Styling          | SCSS Modules + CSS Custom Properties                     | —       |
| Unit Testing     | [Vitest](https://vitest.dev) + Testing Library           | 3.x     |
| E2E Testing      | [Playwright](https://playwright.dev)                     | 1.x     |
| Linting          | [ESLint 9](https://eslint.org) (flat config)             | 9.x     |
| Formatting       | [Prettier](https://prettier.io)                          | 3.x     |
| Git Hooks        | [Husky](https://typicode.github.io/husky) + lint-staged  | 9.x     |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- A free [OpenWeatherMap API key](https://openweathermap.org/api) (takes ~1 minute to get)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/jannaten/Activity-App.git
cd Activity-App

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Open .env and paste your OpenWeatherMap API key
```

### Environment Variables

Create a `.env` file in the project root (never commit this):

```env
VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key_here
VITE_DEFAULT_CITY=London
```

### Running Locally

```bash
npm run dev       # dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

---

## 📁 Project Structure

```
Activity-App/
├── index.html                        # Vite entry point
├── vite.config.js                    # Vite + Vitest config
├── .env.example                      # Environment variable template
│
└── src/
    ├── app/
    │   └── store.js                  # Redux store + redux-persist config
    │
    ├── features/
    │   ├── activities/
    │   │   ├── activitiesSlice.js    # RTK slice — all activity reducers & actions
    │   │   └── activitiesSelectors.js# Memoized selectors (search, sort, stats)
    │   ├── weather/
    │   │   ├── weatherSlice.js       # Async thunk for OpenWeatherMap API
    │   │   └── weatherSelectors.js
    │   └── theme/
    │       └── themeSlice.js         # Dark / light mode with OS preference
    │
    ├── screens/
    │   ├── Dashboard/                # Main view — active tasks, weather, archive
    │   ├── CreateActivity/           # Form with React Hook Form validation
    │   ├── CheckActivities/          # Full table with search, sort, drag-and-drop
    │   └── Statistics/               # Recharts visualisation dashboard
    │
    ├── components/
    │   ├── ActiveActivities/         # Drag-and-drop countdown cards
    │   ├── ArchivedActivities/       # Completed tasks list
    │   ├── Button/                   # Reusable button (variants + sizes)
    │   ├── EditActivityModal/        # Accessible modal with React Hook Form
    │   ├── ErrorBoundary/            # Class component error boundary
    │   ├── Header/                   # Sticky nav with dark mode toggle
    │   ├── Notifications/            # ARIA live region for due alerts
    │   ├── SkeletonLoader/           # Animated shimmer placeholder
    │   ├── UndoToast/                # Timed undo action toast
    │   ├── WeatherSuggestions/       # Weather-based activity tips
    │   └── WeatherWidget/            # Current weather + city search
    │
    ├── hooks/
    │   ├── useActivityTimer.js       # setInterval with proper cleanup
    │   ├── useDebounce.js            # Debounce hook for search input
    │   └── useTheme.js               # Reads/writes data-theme on <html>
    │
    ├── styles/
    │   └── global.scss               # CSS custom properties, reset, dark theme
    │
    ├── App.jsx                       # Routes (lazy-loaded) + ErrorBoundary
    └── main.jsx                      # React 19 createRoot entry point
```

---

## 🔄 Data Flow

```
User Action (click / form submit)
        │
        ▼
React Component (useDispatch)
        │
        ├── Sync action ──▶ RTK slice reducer (Immer draft) ──▶ New Redux state
        │                                                              │
        └── Async thunk ──▶ axios → OpenWeatherMap API                │
                               └── fulfilled / rejected action ───────┘
                                                                       │
                                                              react-redux useSelector
                                                                       │
                                                              Component re-renders
                                                                       │
                                                           redux-persist → sessionStorage
```

---

## 📸 Screenshots

| Dashboard (Light)                            | Dashboard (Dark)                           | Statistics                         |
| -------------------------------------------- | ------------------------------------------ | ---------------------------------- |
| ![Dashboard Light](docs/dashboard-light.png) | ![Dashboard Dark](docs/dashboard-dark.png) | ![Statistics](docs/statistics.png) |

| All Activities                    | Add Activity                     |
| --------------------------------- | -------------------------------- |
| ![All Activities](docs/check.png) | ![Add Activity](docs/create.png) |

> Screenshots live in the `docs/` folder. Run the app and take your own to replace the placeholders.

---

## 🧪 Testing

```bash
# Unit & component tests (Vitest + React Testing Library)
npm test                  # watch mode — re-runs on file save
npm run test:ci           # single run + coverage report (use in CI)

# End-to-end tests (Playwright)
npm run test:e2e          # headless Chromium
npm run test:e2e:headed   # visible browser window
npm run test:e2e:ui       # Playwright interactive UI

# Coverage report is generated to ./coverage/
# Open ./coverage/index.html for the HTML report
```

### Test structure

| Path                                                  | What it tests                           |
| ----------------------------------------------------- | --------------------------------------- |
| `src/components/Button/Button.test.jsx`               | Rendering, variants, interactions       |
| `src/components/Button/Button.a11y.test.jsx`          | Axe accessibility violations            |
| `src/components/ErrorBoundary/ErrorBoundary.test.jsx` | Error catching, retry flow              |
| `src/components/Header/Header.test.jsx`               | Nav links, theme dispatch, hamburger    |
| `src/components/UndoToast/UndoToast.test.jsx`         | Visibility, auto-dismiss, undo dispatch |
| `src/features/activities/activitiesSlice.test.js`     | All reducers including edge cases       |
| `src/features/activities/activitiesSelectors.test.js` | Memoized selectors, search, sort, stats |
| `src/hooks/useDebounce.test.js`                       | Debounce timing logic                   |
| `src/screens/CreateActivity/CreateActivity.test.jsx`  | Form validation, submission, navigation |
| `e2e/activity-flow.spec.js`                           | Core user journey, navigation, a11y     |

## 🔧 Code Quality Tooling

### Scripts

| Script                 | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| `npm run lint`         | ESLint check across `src/`                            |
| `npm run lint:fix`     | Auto-fix ESLint issues                                |
| `npm run format`       | Prettier — format all JS/JSX/SCSS                     |
| `npm run format:check` | Prettier — check without writing (CI)                 |
| `npm run audit`        | `npm audit` at moderate severity                      |
| `npm run analyze`      | Production build + open bundle treemap (`stats.html`) |

### ESLint

ESLint 9 flat config ([`eslint.config.js`](eslint.config.js)) with:

- `eslint-plugin-react` — React best practices
- `eslint-plugin-react-hooks` — hooks rules-of-hooks + exhaustive-deps
- `eslint-plugin-jsx-a11y` — JSX accessibility rules
- `eslint-config-prettier` — disables formatting rules that conflict with Prettier

### Pre-commit hooks (Husky + lint-staged)

Every `git commit` automatically:

1. Runs **Prettier** on staged JS/JSX/SCSS files
2. Runs **ESLint --fix** on staged JS/JSX files

Every commit message is validated by **Commitlint** against the [Conventional Commits](https://www.conventionalcommits.org/) spec:

```
feat: add dark mode toggle
fix: correct overdue time calculation
chore: update dependencies
docs: add testing section to README
```

### Releasing a new version

```bash
npm run release          # patch release (e.g. 2.0.0 → 2.0.1)
npm run release:minor    # minor release (e.g. 2.0.0 → 2.1.0)
npm run release:major    # major release (e.g. 2.0.0 → 3.0.0)
```

`standard-version` bumps `package.json`, tags the commit, and writes `CHANGELOG.md` from conventional commit history.

## 🚦 CI/CD Pipeline

GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) runs on every push and pull request to `master`:

```
quality → test → build → e2e → deploy (master only)
```

| Job         | What it does                                                |
| ----------- | ----------------------------------------------------------- |
| **quality** | `format:check` + `lint` — fails fast on any issue           |
| **test**    | `test:ci` — unit tests + coverage report                    |
| **build**   | `vite build` — verifies the production build succeeds       |
| **e2e**     | Playwright tests against the Vite dev server                |
| **deploy**  | Deploys to Vercel via CLI — only runs on pushes to `master` |

Deployment only happens after all four prior jobs pass. Pull requests run quality/test/build/e2e but never deploy.

Set the following repository secrets (Settings → Secrets and variables → Actions):

| Secret                     | Description                                                 |
| -------------------------- | ----------------------------------------------------------- |
| `VERCEL_TOKEN`             | API token from vercel.com → Account Settings → Tokens       |
| `VERCEL_ORG_ID`            | `orgId` from `.vercel/project.json` after `vercel link`     |
| `VERCEL_PROJECT_ID`        | `projectId` from `.vercel/project.json` after `vercel link` |
| `VITE_OPENWEATHER_API_KEY` | Your OpenWeatherMap API key                                 |

### TypeScript gap

This project is plain JavaScript/JSX. For production at scale, migrating to TypeScript with `strict: true` is strongly recommended. Type safety would catch a class of bugs (selector type mismatches, incorrect action payloads) that tests cannot.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit using [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `chore:`
4. Push and open a Pull Request

---

## 👤 Author

**Jannaten Nayem**

- GitHub: [@jannaten](https://github.com/jannaten)

---

## 📄 License

Distributed under the MIT License.

---

<p align="center">Built with React 19 · Redux Toolkit · Vite · Recharts</p>
