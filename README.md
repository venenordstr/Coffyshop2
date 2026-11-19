# ☕ Ember & Oak — Coffee Shop Landing Page

A single-page, zero-dependency landing page for a specialty coffee roaster.

- **Living background**: a WebGL fragment shader (domain-warped noise) renders a swirling coffee-and-cream "video" behind the whole site. It follows the cursor and reacts to scroll. It falls back to a gradient without WebGL and freezes for `prefers-reduced-motion`.
- **Glassmorphism UI**: frosted `backdrop-filter` cards, floating nav, film grain.
- **Scroll animations**: IntersectionObserver reveals, hero parallax, counters, scroll-linked timeline and progress bar.
- **8-drink menu**: generated SVG cups, Hot/Iced filter, 3D tilt hover with cursor light.

## Run locally

No build step. Open `index.html`, or serve it:

```bash
python3 -m http.server 8000   # http://localhost:8000
```

## Deploy to GitHub Pages

1. Push this repo to GitHub (branch `main`).
2. Go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow in `.github/workflows/pages.yml` publishes on every push.

## Customize

| What | Where |
| --- | --- |
| Shop name, copy, hours, address | `index.html` |
| Drinks, prices, cup colors | `D` array at the top of `js/main.js` |
| Colors, fonts, glass strength | CSS variables in `css/style.css` (`:root`) |
| Background colors / speed | GLSL string in `js/background.js` |

### Using a real video instead
Put an MP4/WebM in `assets/` and replace the `<canvas id="bg">` in `index.html` with:

```html
<video id="bg" src="assets/coffee.mp4" autoplay muted loop playsinline></video>
```
Add `object-fit: cover` to the `#bg` rule, and remove `js/background.js`.

## Structure

```
index.html
css/style.css
js/main.js         menu + scroll animation
js/background.js   WebGL shader background
.github/workflows/pages.yml
```

Shop details are placeholders. License: MIT.
