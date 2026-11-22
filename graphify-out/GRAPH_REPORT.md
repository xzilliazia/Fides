# Graph Report - Fides  (2026-11-22)

## Corpus Check
- Corpus is ~4,360 words - fits in a single context window. You may not need a graph.

## Summary
- 237 nodes · 316 edges · 35 communities (19 shown, 16 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Package Dependencies
- Expo App Screens
- Android App Configuration
- Core Framework Setup
- Project Reset Script
- Project Documentation
- Secure Token Storage
- TypeScript Configuration
- Geometric Icon Grid
- Package Scripts
- Front Office Screens
- Fides App Icon
- Lab Environment Images
- React Branding
- Expo Tutorial Preview
- Grid Icon Pattern
- Expo Monochrome Logo
- Fides Logo
- Splash Icon
- Expo Symbol
- Android Monochrome Icon
- Expo Badge Logo
- Fides Favicon
- Blue Glow Logo
- React Atom Logo
- Explore Navigation
- Explore Tab Concept
- Home Navigation
- Graphify Knowledge Graph
- Android App Logo
- Expo Badge Variant
- React Logo Variant
- Explore Icon Variant
- Home Icon Variant
- Home Icon Variant

## God Nodes (most connected - your core abstractions)
1. `expo` - 13 edges
2. `react-native` - 10 edges
3. `react` - 9 edges
4. `expo-router` - 7 edges
5. `scripts` - 7 edges
6. `PrimaryButton()` - 7 edges
7. `COLORS` - 7 edges
8. `SIZES` - 7 edges
9. `Geometric Icon Construction` - 6 edges
10. `adaptiveIcon` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Expo v57 Versioned Documentation Requirement` --conceptually_related_to--> `Expo Documentation`  [INFERRED]
  .github/copilot-instructions.md → README.md
- `ContactFrontOfficeScreen()` --calls--> `InfoScreen()`  [EXTRACTED]
  src/app/contact-fo.tsx → src/components/InfoScreen.tsx
- `LoginScreen()` --calls--> `useAuth()`  [EXTRACTED]
  src/app/login.tsx → src/context/AuthContext.tsx
- `ReservationGuideScreen()` --calls--> `InfoScreen()`  [EXTRACTED]
  src/app/reservation-guide.tsx → src/components/InfoScreen.tsx
- `TokenStorageScreen()` --calls--> `PrimaryButton()`  [EXTRACTED]
  src/app/token-storage.tsx → src/components/PrimaryButton.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Geometric Icon Alignment System** — assets_images_android_icon_background_outer_circle, assets_images_android_icon_background_inner_circle, assets_images_android_icon_background_triangle_guides, assets_images_android_icon_background_vertical_axis, assets_images_android_icon_background_horizontal_baseline [EXTRACTED 1.00]
- **Computer Lab Training Setup** — assets_images_lab_bg_computer_lab, assets_images_lab_bg_workstations, assets_images_lab_bg_windows_desktop, assets_images_lab_bg_training_environment [INFERRED 0.85]
- **Tutorial Web Welcome Experience** — assets_images_tutorial_web_expo_starter_page, assets_images_tutorial_web_welcome_to_expo, assets_images_tutorial_web_localhost_preview [INFERRED 0.75]

## Communities (35 total, 16 thin omitted)

### Community 0 - "Package Dependencies"
Cohesion: 0.05
Nodes (52): dependencies, expo@~58.0.26, expo-constants@~58.0.16, expo-device@~58.0.5, expo-font@~58.0.12, expo-glass-effect@~58.0.5, expo-image@~58.0.18, expo-linking@~58.0.17 (+44 more)

### Community 1 - "Expo App Screens"
Cohesion: 0.14
Nodes (23): expo-router, @expo/vector-icons, react, react-native, ExternalApiScreen(), styles, LoginScreen(), quickLinks (+15 more)

### Community 2 - "Android App Configuration"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, predictiveBackGestureEnabled, reactCompiler, typedRoutes (+16 more)

### Community 3 - "Core Framework Setup"
Cohesion: 0.19
Nodes (13): @expo-google-fonts/montserrat-alternates@^0.4.1, expo-splash-screen@~58.0.14, @supabase/supabase-js@^2.119.2, @expo-google-fonts/montserrat-alternates, expo-splash-screen, @supabase/supabase-js, RootLayout(), RootNavigator() (+5 more)

### Community 4 - "Project Reset Script"
Cohesion: 0.17
Nodes (7): exampleDirPath, fs, oldDirs, path, readline, rl, root

### Community 5 - "Project Documentation"
Cohesion: 0.22
Nodes (7): AGENTS Instructions Import, ESLint Setup, Expo Welcome App, Expo Documentation, File-based Routing, reset-project Workflow, Unit Testing with Jest

### Community 6 - "Secure Token Storage"
Cohesion: 0.36
Nodes (8): expo-secure-store@~58.0.3, expo-secure-store, TokenStorageScreen(), ensureNativePlatform(), loadTokens(), saveTokens(), StoredTokens, wipeTokens()

### Community 7 - "TypeScript Configuration"
Cohesion: 0.25
Nodes (7): expo/tsconfig.base, compilerOptions, paths, strict, extends, include, @/assets/*

### Community 8 - "Geometric Icon Grid"
Cohesion: 0.29
Nodes (6): Geometric Icon Construction, Horizontal Baseline, Inner Circle, Outer Circle, Triangular Construction Guides, Vertical Construction Axis

### Community 9 - "Package Scripts"
Cohesion: 0.29
Nodes (7): scripts, android, ios, lint, reset-project, start, web

### Community 10 - "Front Office Screens"
Cohesion: 0.60
Nodes (3): ContactFrontOfficeScreen(), ReservationGuideScreen(), InfoScreen()

### Community 11 - "Fides App Icon"
Cohesion: 0.67
Nodes (4): Fides App Icon, Blue Geometric Grid Background, Sparkle Accent Details, White Upward Chevron Mark

### Community 12 - "Lab Environment Images"
Cohesion: 0.50
Nodes (4): Computer Laboratory, Computer Training Environment, Windows Desktop Computers, Rows of Computer Workstations

### Community 13 - "React Branding"
Cohesion: 0.50
Nodes (4): Atom Symbol, Cyan Line Illustration, Dark Background, React Logo

### Community 14 - "Expo Tutorial Preview"
Cohesion: 0.83
Nodes (4): Expo Starter Page, Localhost 8081 Preview, Tutorial Web Screenshot, Welcome to Expo

### Community 15 - "Grid Icon Pattern"
Cohesion: 0.67
Nodes (3): Circular Grid Pattern, Dark Circular Canvas, Grid Icon

### Community 16 - "Expo Monochrome Logo"
Cohesion: 0.67
Nodes (3): Dark Background, Expo Logo, Monochrome A-shaped Mark

### Community 17 - "Fides Logo"
Cohesion: 0.67
Nodes (3): Dark Grid Background, Fides Logo Mark, Rounded Blue Geometric Forms

### Community 18 - "Splash Icon"
Cohesion: 0.67
Nodes (3): Angular A Brand Mark, Dark Splash Background, Splash Icon

## Knowledge Gaps
- **49 isolated node(s):** `expo/tsconfig.base`, `Graphify Repository Knowledge Graph`, `AGENTS Instructions Import`, `File-based Routing`, `reset-project Workflow` (+44 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 108 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Package Dependencies` to `Core Framework Setup`, `Secure Token Storage`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base`, `Graphify Repository Knowledge Graph`, `AGENTS Instructions Import` to the rest of the system?**
  _49 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Package Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05297532656023222 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `Expo App Screens` to `Package Dependencies`, `Core Framework Setup`, `Secure Token Storage`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Should `Expo App Screens` be split into smaller, more focused modules?**
  _Cohesion score 0.13636363636363635 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Expo App Screens` to `Package Dependencies`, `Core Framework Setup`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Should `Android App Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._