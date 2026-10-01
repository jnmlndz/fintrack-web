# English

# FinTrack Web

Frontend for **FinTrack**, a personal finance dashboard. Consumes the [fintrack-api](https://github.com/jnmlndz/fintrack-api) backend.

## Stack

- **React + TypeScript** (Vite)
- **React Router** — routing and private route protection
- **Context API** — global session management
- **Axios** — API consumption
- **Recharts** — data visualization
- **Tailwind CSS** — design system with centralized brand tokens

## Features

- Registration and login with error handling (including duplicate email conflicts)
- Protected routes: automatic redirect to `/login` when there's no active session
- Dashboard with:
  - Balance cards (income, expenses, net balance)
  - Pie chart: expenses by category
  - Bar chart: income vs. expenses by month
  - Transaction history with inline editing and deletion
  - Creation form that automatically refreshes the rest of the dashboard
- Centralized design system (`src/assets/styles/theme.ts`) — a single place to update brand colors across the whole project

## Running it locally

1. Install dependencies:
```bash
   npm install
```

2. Make sure [fintrack-api](https://github.com/jnmlndz/fintrack-api) is running on `http://localhost:3000`.

3. Start the development server:
```bash
   npm run dev
```

The app runs on `http://localhost:5173`.

## Notable technical decisions

- **Context API over external libraries**: for this project's scope (user session), Context is sufficient and avoids unnecessary dependencies.
- **"Lifting state up" pattern**: the transaction form doesn't know how the dashboard's data gets refreshed — it just notifies that something changed (`onCreated`), and the parent component decides what to do.
- **TypeScript types mirroring the backend**: interfaces like `Transaction` and `Balance` match the API's response shape exactly, so a mismatch gets caught at compile time.

______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


# Español

# FinTrack Web

Frontend de **FinTrack**, un dashboard de finanzas personales. Consume la API de [fintrack-api](https://github.com/jnmlndz/fintrack-api).

## Stack

- **React + TypeScript** (Vite)
- **React Router** — rutas y protección de rutas privadas
- **Context API** — manejo de sesión global
- **Axios** — consumo de la API
- **Recharts** — visualización de datos
- **Tailwind CSS** — sistema de diseño con tokens de marca centralizados

## Features

- Registro e inicio de sesión con manejo de errores (incluyendo conflicto de email duplicado)
- Rutas protegidas: redirección automática a `/login` si no hay sesión activa
- Dashboard con:
  - Tarjetas de balance (ingresos, gastos, balance neto)
  - Gráfica de pie: gastos por categoría
  - Gráfica de barras: ingresos vs gastos por mes
  - Historial de transacciones con edición y eliminación inline
  - Formulario de creación con actualización automática del resto del dashboard
- Sistema de diseño centralizado (`src/assets/styles/theme.ts`) — un solo lugar para actualizar colores de marca en todo el proyecto

## Cómo correrlo localmente

1. Instala dependencias:
   \`\`\`bash
   npm install
   \`\`\`

2. Asegúrate de que [fintrack-api](https://github.com/jnmlndz/fintrack-api) esté corriendo en `http://localhost:3000`.

3. Levanta el servidor de desarrollo:
   \`\`\`bash
   npm run dev
   \`\`\`

La app corre en `http://localhost:5173`.

## Decisiones técnicas destacadas

- **Context API sobre librerías externas**: para el alcance de este proyecto (sesión de usuario), Context es suficiente y evita dependencias innecesarias.
- **Patrón "lifting state up"**: el formulario de transacciones no sabe cómo se recargan los datos del dashboard — solo notifica que algo cambió (`onCreated`), y el componente padre decide qué hacer.
- **Tipos espejo del backend**: las interfaces de TypeScript (`Transaction`, `Balance`, etc.) replican exactamente la forma de las respuestas de la API, detectando en tiempo de compilación si algo deja de coincidir.