# Canvas visibility fix

The previous build attached `engine-canvas` directly to React Three Fiber's `<Canvas>` component. R3F applies an inline `position: relative; width: 100%; height: 100%` style to its wrapper, which overrode the fixed-stage CSS. In a parent without an explicit height, the WebGL layer could collapse and appear as an empty black page.

This version:

- wraps `<Canvas>` in a true fixed full-viewport `.engine-stage`
- makes the WebGL canvas absolute inside that stage
- enables a transparent renderer and adds a visible ambient gradient fallback
- aligns scroll phase ranges with the actual section heights
- moves gallery/workflow/career objects into the visible right-side composition
- increases scene lighting and material visibility

Run:

```bash
npm install
npm run dev
```

Then hard-refresh the browser (`Cmd+Shift+R` on macOS / `Ctrl+Shift+R` on Windows).
