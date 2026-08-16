# Maricopa Consolidated logo SVG set

Each concept includes:

- `*-lockup-outlined.svg`: production-ready horizontal logo with the wordmark converted to vector paths for identical rendering everywhere.
- `*-lockup.svg`: editable horizontal logo retaining live text.
- `*-symbol.svg`: icon-only mark for responsive website headers, favicons, and compact UI.

## Recommended website use

Use the icon-only SVG beside live HTML text in the primary site header. This keeps the long department name readable and responsive.

```html
<a class="site-brand" href="/" aria-label="Maricopa Consolidated home">
  <img src="/images/maricopa-v2-desert-horizon-symbol.svg" alt="" width="48" height="58">
  <span class="site-brand__text">
    <strong>Maricopa Consolidated</strong>
    <small>Domestic Water Improvement District</small>
  </span>
</a>
```

The editable lockups use Georgia Bold and Arial. Use the outlined lockups when exact typography and maximum portability matter; use the editable lockups while adjusting the wording or type treatment.

## Palette

Colors are matched to the site's current CSS variables (`css/styles.css`, Corporate Blue scheme):

- Civic navy: `#0D1F3D` (`--navy`)
- Water blue: `#2563A8` (`--teal`)
- Secondary blue-gray: `#5B6B82` (`--muted`)
- Desert orange: `#D4952E` (`--gold`)
- Desert sand: `#E3BA77` (tint of `--gold` — Corporate Blue has no warm/tan color, so this is derived rather than matched)

These are baked-in hex values, not `var()` references — SVGs loaded via `<img>` can't see the host page's CSS variables. If the site's color scheme changes, these values need to be re-matched (or the chosen logo inlined directly into the HTML instead of referenced via `<img>`).

All marks use flat fills and contain no gradients, filters, or embedded raster images.
