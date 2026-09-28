# Caractère Media — media.studio

Site de réservation en français, compatible avec Next.js et Vercel.

- Studio seul : 4 000 DA/heure.
- Studio + tournage : 6 000 DA/heure.
- Prêt à publier et options : devis personnalisé.
- Les demandes sont enregistrées en attente, puis confirmées par téléphone.

## Développement

Node.js 22.13 ou supérieur.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

## Déploiement Vercel

Importer le dépôt `yakoumobi-sys/media.studio`, sélectionner Next.js et déployer la branche `main`. Aucune variable secrète n'est nécessaire pour cette architecture.

## Backend et administration

Le backend de production reste hébergé à https://caractere-media-studio.mokka266.chatgpt.site. La version Vercel relaie uniquement les requêtes publiques nécessaires : lecture des disponibilités et horaires, création d'une demande de réservation. Elle ne relaie aucun cookie ni en-tête d'identité.

Le lien `/admin` ouvre l'espace administrateur du backend existant, avec son authentification. Il contient le planning hebdomadaire par heure, les demandes à confirmer, les réservations manuelles et les horaires. Les données clients restent dans la base existante ; ce dépôt ne contient ni données clients ni secrets.

**Dépendance opérationnelle :** conserver l'hébergement existant actif et public pour les API de réservation. La version Vercel ne constitue pas une migration de la base ni de l'authentification. Une migration complète vers une base et une authentification autonomes pourra être effectuée séparément.
