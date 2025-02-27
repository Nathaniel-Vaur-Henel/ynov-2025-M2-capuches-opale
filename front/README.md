# Configuration du Projet Front-end

Ce document fournit les instructions pour configurer et exécuter le projet front-end basé sur React, Vite et TypeScript.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (v20 ou ultérieur recommandé)
- [npm](https://www.npmjs.com/) (v10 ou ultérieur recommandé)

## Mise en Route

### 1. Cloner le Dépôt

```bash
git clone https://github.com/Nathaniel-Vaur-Henel/ynov-2025-M2-capuches-opale.git
cd ynov-2025-M2-capuches-opale/front
```

### 2. Installer les Dépendances

```bash
npm install
```

### 3. Serveur de Développement

Démarrer le serveur de développement avec remplacement de modules à chaud :

```bash
npm run dev
```

L'application sera disponible à l'adresse `http://localhost:5173` par défaut.

### 4. Construction pour la Production

```bash
npm run build
```

Cela générera des fichiers optimisés pour la production dans le répertoire `dist`.

## Structure du Projet

```
📦 capuche-opale-frontend
├── 📂 public
│   ├── 📄 index.html
│   ├── 📄 manifest.json
│   ├── 📄 favicon.ico
│   └── 📄 robots.txt
│
├── 📂 src
│   ├── 📂 components
│   │   ├── 📂 forms
│   │   │   ├── 📄 CreateAdventurerForm.tsx
│   │   │   └── 📄 AddRequestForm.tsx
│   │   ├── 📂 ui
│   │   │   ├── 📄 AdventurerCard.tsx
│   │   │   ├── 📄 Button.tsx
│   │   │   └── 📄 Input.tsx
│   │   ├── 📂 layout
│   │   │   ├── 📄 Navbar.tsx
│   │   │   ├── 📄 Footer.tsx
│   │   │   └── 📄 Sidebar.tsx
│   │   └── 📂 pages
│   │       ├── 📄 Home.tsx
│   │       ├── 📄 Dashboard.tsx
│   │       ├── 📄 Profile.tsx
│   │       └── 📄 NotFound.tsx
│   │
│   ├── 📂 hooks
│   │   ├── 📄 useAuth.ts
│   │   ├── 📄 useFetch.ts
│   │   └── 📄 useTheme.ts
│   │
│   ├── 📂 context
│   │   ├── 📄 AuthContext.tsx
│   │   ├── 📄 ThemeContext.tsx
│   │   └── 📄 GuildContext.tsx
│   │
│   ├── 📂 services
│   │   ├── 📄 api.ts
│   │   ├── 📄 authService.ts
│   │   ├── 📄 guildService.ts
│   │   └── 📄 questService.ts
│   │
│   ├── 📂 utils
│   │   ├── 📄 helpers.ts
│   │   ├── 📄 constants.ts
│   │   ├── 📄 validation.ts
│   │   └── 📄 format.ts
│   │
│   ├── 📂 assets
│   │   ├── 📂 images
│   │   ├── 📂 icons
│   │   └── 📂 styles
│   │       ├── 📄 tailwind.css
│   │       ├── 📄 globals.css
│   │       └── 📄 typography.css
│   │
│   ├── 📄 App.tsx
│   ├── 📄 index.tsx
│   ├── 📄 main.tsx
│   ├── 📄 routes.tsx
│   ├── 📄 vite-env.d.ts
│   ├── 📄 tailwind.config.js
│   └── 📄 postcss.config.js
│
├── 📄 .gitignore
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 vite.config.ts
├── 📄 README.md
└── 📄 package-lock.json
```

## Scripts Disponibles

- `npm run dev` : Démarrer le serveur de développement
- `npm run build` : Construire pour la production
- `npm run preview` : Prévisualiser la version de production
- `npm run lint` : Exécuter ESLint
- `npm run test` : Exécuter les tests (si configurés)

## En Savoir Plus

- [Documentation React](https://react.dev/)
- [Documentation Vite](https://vitejs.dev/guide/)
- [Documentation TypeScript](https://www.typescriptlang.org/docs/)
