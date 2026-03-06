# Fallback Frontend

Frontend for the Fallback application, built with React + TypeScript + Vite.

## Stack

- React 19
- Material UI (MUI)
- React Router
- i18next + react-i18next (English, Greek)

## Implemented Features

- Login screen with switchable auth mode (`mock` / `api`) and JWT-style token storage.
- Protected dashboard layout with:
  - sticky top bar
  - language switcher (English / Greek)
  - user avatar + logout menu
  - sticky collapsible left sidebar (`Home`, `Requests`)
- `Home` page with welcome message.
- `Requests` page with:
  - search form (request + parent + member fields)
  - paginated table
  - parent request modal
  - editable request modal
  - expandable rows with member links and member details modal (read-only)

## Data Source Strategy (Mock or API)

The app supports both local JSON data and a real API.

Config file: `src/config/appConfig.ts`

Environment variables:

- `VITE_DATA_SOURCE=mock|api`
- `VITE_AUTH_MODE=mock|api`
- `VITE_API_BASE_URL=/api` (or your backend URL)

Default behavior is `mock` for both data and auth.

## Mock Data

SQL seed has been mapped into JSON files:

- `src/mocks/data/requests.json`
- `src/mocks/data/requestMembers.json`

These are consumed by `src/domain/requests/repository.ts` when `VITE_DATA_SOURCE=mock`.

## Run

```powershell
npm install
npm run dev
```

## Build / Type Check

```powershell
npm run ts-check
npm run build
```

## Routes

- `/login`
- `/home`
- `/requests`

## UI Wrapper Components

Reusable wrappers are in `src/ui/components/` (for example `AppTextField`, `AppButton`, `AppSelect`, `AppDialog`, `AppCard`, `AppPagination`) and are used by feature forms and dialogs.
