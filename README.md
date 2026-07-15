# Aura & Frame - Luxury & Editorial Cinematography PortFolio

A premium, visual-first portfolio website designed for high-end videographers and photographers. Inspired by elite agencies like *The Wedding Filmer*, the project highlights emotional storytelling, typography, custom media controls, and smooth scroll animations.

## Key Features

1. **The Cinema Feed**: An interactive grid showcasing films and photography. Features dynamic categorization, zoom reveals, hover meta cards, and responsive columns.
2. **Creator Studio (Portal)**: A fully operational, slide-out upload portal that allows you to drag-and-drop or choose new photos and videos.
3. **Local Database Storage (IndexedDB)**: Files uploaded via the Creator Studio are parsed into Blobs and persisted locally in the browser. They immediately merge into the home page feed and persist across page refreshes.
4. **Custom Video Player**: A custom HTML5 media player modal that handles video playback with a seekable progress bar, volume slider, mute toggle, time formatting, and fullscreen support.
5. **Photography Lightbox**: A fluid, glassmorphic modal overlay for viewing images in detail with title and description captions.
6. **Original Soundscapes Player**: A custom piano soundtrack player featuring an active CSS-animated waveform visualizer, mimicking custom musical compositions.
7. **Premium Design System**: 
   - Typography: Elegant serif headers (Cinzel) and clean, geometric body copy (Outfit).
   - Theme: Deep onyx blacks, champagne gold accents, and subtle glassmorphic elements.
   - Responsiveness: Tailored layouts for mobile, tablet, and desktop screens.
   - SEO Best Practices: Fully optimized meta titles, descriptions, and semantic HTML structure.

## File Structure

- [index.html](file:///c:/Users/karti/PhotoGraphy_FilmMaker_Website/index.html): Main layout, modal overlays, slide-out drawer, and content elements.
- [styles.css](file:///c:/Users/karti/PhotoGraphy_FilmMaker_Website/styles.css): Complete styling variables, layouts, scroll reveal frames, player controllers, and keyframes.
- [db.js](file:///c:/Users/karti/PhotoGraphy_FilmMaker_Website/db.js): IndexedDB local storage engine (`AuraFrameDB`) with methods to save, load, and delete media items.
- [app.js](file:///c:/Users/karti/PhotoGraphy_FilmMaker_Website/app.js): App lifecycle coordinator, feed manager, upload dropzone logic, custom player events, and animations.
- [package.json](file:///c:/Users/karti/PhotoGraphy_FilmMaker_Website/package.json): Package definition with dev server scripts.

## Running Locally

To run the developer server locally:

1. Open your terminal in this project folder.
2. Install the lightweight development server:
   ```bash
   npm install
   ```
3. Boot the local server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Developed By:- **KARTIK PANDEY** 

---

*Note: Since the site uses IndexedDB to store files locally, please access the site through `localhost:3000` (or another served port) rather than double-clicking the file, to ensure database permissions work correctly.*
