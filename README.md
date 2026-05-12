# nix

> anonym · flüchtig · echt

Eine minimalistische Web-App, die zwei zufällige User miteinander verbindet. Kein Name, kein Bild, nur Text. Wenn einer den Chat schließt, ist alles weg.

---

## Setup

### 1. Supabase Datenbank einrichten

1. Öffne dein Supabase-Projekt → **SQL Editor**
2. Klicke auf **New Query**
3. Füge den Inhalt von `supabase-setup.sql` ein und führe ihn aus
4. Gehe zu **Authentication → Providers** und stelle sicher, dass **Anonymous Sign-ins** aktiviert ist

### 2. Credentials eintragen

Öffne `.env.local` und trage deine Supabase-Daten ein:

```
VITE_SUPABASE_URL=https://DEIN-PROJEKT.supabase.co
VITE_SUPABASE_ANON_KEY=dein-anon-key-hier
```

Beides findest du unter: **Project Settings → API**

### 3. App starten

```bash
npm install
npm run dev
```

### 4. Deployen (Vercel)

```bash
npm run build
```

Dann auf [vercel.com](https://vercel.com) importieren. Die Environment Variables (`VITE_SUPABASE_URL` und `VITE_SUPABASE_ANON_KEY`) unter **Settings → Environment Variables** eintragen.

---

## Wie es funktioniert

| Screen | Was passiert |
|--------|-------------|
| Start | User bekommt automatisch eine anonyme ID (kein Login nötig) |
| Suchen | User landet in einer Queue. Supabase Realtime verbindet zwei wartende User |
| Chat | Nachrichten werden per WebSocket in Echtzeit übertragen |
| Ende | Chat wird gelöscht → alle Nachrichten verschwinden unwiderruflich |

---

## Tech Stack

- **React + Vite** — Frontend
- **Supabase** — Datenbank, Realtime, Auth
- **Vercel** — Hosting

---

*die app kann nix. deshalb heißt sie nix.*
