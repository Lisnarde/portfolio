# CLAUDE.md — Portfolio de Bastien
 
## Le projet
Portfolio personnel pour le BUT Informatique (S5-S6). Il présente qui je suis, mes projets, et surtout **comment mes expériences (IUT, alternance, stage, perso) construisent mon identité professionnelle**.
 
Concept : un **graphe de connaissances façon « synapses »**. Les nœuds sont les projets, les compétences, les expériences et les technos. Les liens portent du sens (`mobilise`, `renforce`…). Au survol d'une compétence, les projets liés s'allument en chaîne. L'idée : apprendre, c'est créer des connexions.
 
⚠️ Le stage ICube (RODO-app, ontologie OWL) a inspiré le concept, mais **ce n'est pas le centre du site**. Pas de jargon OWL/SPARQL/triplets à l'écran. Le stage est un nœud comme les autres.
 
## Critères d'évaluation (à garder en tête à chaque modif)
- **Ergonomie** : affordance, orthographe, lisibilité, cohérence visuelle.
- **Responsive** et **PageSpeed** (pagespeed.web.dev) : performance, accessibilité, SEO. Objectif : 90+ partout.
- **Au moins 3 projets**, dont **Níðhöggr** et le **projet T3-T4**. Chaque projet a : une description courte et claire, une illustration, les techniques/connaissances/compétences mobilisées, un lien vers le dépôt (et la prod si possible).
- **Démarche réflexive** : relier chaque projet aux compétences du référentiel BUT et à mon projet pro.
- Hébergement **GitHub Pages**, site **mis à jour pendant l'année**.
## Stack
- **Next.js (App Router) + TypeScript strict + Tailwind CSS**
- **Export statique** : `output: "export"` dans `next.config.ts` (GitHub Pages ne sert que du statique)
- Graphe : **Cytoscape.js**, chargé **uniquement côté client** via `next/dynamic` (`ssr: false`). Instance stockée dans un `useRef`, jamais dans un state.
- Déploiement : GitHub Actions → GitHub Pages
### Contraintes GitHub Pages
- `images: { unoptimized: true }` (pas d'optimisation d'image côté serveur)
- `basePath` si le dépôt ne s'appelle pas `<pseudo>.github.io`
- `trailingSlash: true` pour que les routes statiques marchent
- Fichier `public/.nojekyll`
- Pas de route API, pas de `middleware`, pas de rendu serveur dynamique : tout doit être générable au build
- Routes dynamiques via `generateStaticParams`
## Thème (centralisé)
Tout le style visuel (couleurs, polices, rayons…) se règle à **un seul endroit**, pour pouvoir changer l'identité du site rapidement.
- `src/theme/theme.css` : variables CSS (clair + sombre) exposées à Tailwind via `@theme inline` → classes `bg-background`, `text-foreground`, `text-muted`, `text-accent`, `bg-surface`, `border-border`, `rounded-theme`, `font-sans`, `font-mono`.
- `src/theme/fonts.ts` : polices chargées via `next/font` (actuellement **Ubuntu** / **Ubuntu Mono**).
- Les composants n'utilisent **jamais** de couleur ou de police en dur (`#hex`, `bg-zinc-500`, `font-family`…) : uniquement les tokens du thème. Besoin d'une nouvelle couleur → on l'ajoute dans `theme.css`.
- Le style du graphe Cytoscape lit aussi ces variables (via `getComputedStyle`), pas de couleurs dupliquées.
- Chaque couleur ajoutée doit respecter le contraste WCAG AA, en clair comme en sombre.

## Arborescence des pages
- `/` : présentation courte, graphe interactif, bouton **« Vue liste »** toujours visible
- `/projets/[slug]` : page d'un projet (description, illustration, stack, compétences, liens, retour d'expérience)
- `/parcours` : expériences dans l'ordre chronologique (IUT, alternance Helfrich, stage ICube, perso)
- `/projet-pro` : partie réflexive, identité professionnelle, perspectives
## Source de données unique
Toutes les vues (graphe, liste, pages projet) lisent **les mêmes fichiers** dans `src/data/`. On n'écrit jamais une info en dur dans un composant.
 
```ts
// src/data/types.ts
export type NodeKind = "projet" | "competence" | "experience" | "techno";
 
export interface GraphNode {
  id: string;        // "nidhoggr", "realiser", "helfrich"…
  kind: NodeKind;
  label: string;
  slug?: string;     // pour /projets/[slug]
}
 
export interface GraphEdge {
  from: string;
  to: string;
  relation: "mobilise" | "renforce" | "utilise" | "realiseDans";
  note?: string;     // phrase réflexive affichée au survol du lien
}
```
 
Les infos détaillées des projets (description, images, liens, retour d'expérience) vivent dans `src/data/projets.ts`, indexées par `slug`.
 
Compétences du référentiel BUT : **Réaliser, Optimiser, Administrer, Gérer, Conduire, Collaborer**.
 
## Accessibilité (non négociable)
- Le graphe est un bonus visuel : **tout son contenu existe aussi en vue liste**, en HTML sémantique, navigable au clavier et lisible par un lecteur d'écran.
- Respecter `prefers-reduced-motion` : pas d'animation en chaîne si l'utilisateur l'a désactivée.
- Contrastes WCAG AA, `alt` sur toutes les images, focus visible, un seul `h1` par page.
- Palette de commandes `Ctrl+K` pour filtrer (projets, compétences, technos), utilisable entièrement au clavier.
## SEO
- `metadata` / `generateMetadata` renseignés sur chaque page (title, description, Open Graph)
- `sitemap.ts` et `robots.ts` générés au build
- Le contenu principal doit être dans le HTML pré-rendu, pas seulement injecté par le JS du graphe
## Arborescence du code
```
src/
  app/                 # routes (App Router)
  components/
    graph/             # tout ce qui touche à Cytoscape (client only)
    ui/                # composants génériques
  data/                # types + contenu (source unique)
  lib/                 # fonctions utilitaires (construction du graphe, filtres…)
  theme/               # thème : couleurs, polices, tokens (seul endroit pour le style global)
```
 
## Mes préférences de code
- TypeScript strict, pas de `any`.
- Des solutions simples et pragmatiques plutôt que des abstractions compliquées.
- Responsabilités bien séparées : la logique (`lib/`) est séparée de l'affichage (`components/`).
- Données dynamiques plutôt que des structures codées en dur.
- Quand tu proposes du code : **fichiers complets, avec leur chemin indiqué**, prêts à copier-coller. Peu d'explications, sauf si je demande.
- Textes du site en **français**, ton naturel et direct, pas de formules pompeuses ou qui sonnent « IA ». Attention à l'orthographe (c'est noté).
## Commandes
```bash
npm run dev     # serveur de dev
npm run build   # build + export statique dans out/
npm run lint
```
Avant de considérer une tâche finie : `npm run build` doit passer sans erreur.
 
