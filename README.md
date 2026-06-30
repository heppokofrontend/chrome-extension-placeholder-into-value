# プレースホルダーを値に変換するやつ - Placeholder into value

Download: https://chrome.google.com/webstore/detail/placeholder-into-value/algihlehcffcpmokaliahcmebfkekkch

The placeholder is available as a value from the right-click context menu when a placeholder is set in a text field.

## How to use

1. Find a text field with [placeholders](https://developer.mozilla.org/ja/docs/Web/HTML/Element/input#placeholder).
2. Open the context menu (e.x. Do right-click on the text field)
3. Select "placeholder into value"
4. The placeholder is converted to a value

![image](https://user-images.githubusercontent.com/6637993/223464960-bfbf54ec-5216-4a3d-9bd7-aaa59c083a1a.png)

## Development

### Requirements

- Node.js — version pinned in [`.node-version`](./.node-version) (recommended: install via [mise](https://mise.jdx.dev/) or another asdf-compatible tool)
- npm (bundled with Node)

### Setup

```sh
npm install
```

### Scripts

| Command                | Description                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `npm start`            | Watch mode (esbuild) for both content script and service worker, with inline source maps. |
| `npm run build`        | Type check, then bundle and minify both entry points to `package/`.                       |
| `npm run typecheck`    | TypeScript type check only.                                                               |
| `npm run lint`         | ESLint (flat config, type-aware rules).                                                   |
| `npm run format`       | Apply Prettier formatting.                                                                |
| `npm run format:check` | Verify formatting without writing.                                                        |

### Loading the unpacked extension

1. Run `npm run build` (or `npm start` for dev watch).
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the `package/` directory.

### Project layout

```
src/                  TypeScript sources
  content_scripts.ts  Injected into web pages; reads contextmenu target, writes value via native setter
  worker.ts           Service worker; registers the context menu and dispatches the click
  constants.ts        Shared constants (menu item id)
package/              Chrome extension package (loaded as the unpacked extension)
  manifest.json       Manifest V3
  content_scripts.js  Built output (esbuild, IIFE)
  worker.js           Built output (esbuild, IIFE)
  _locales/           i18n messages
```

## License

[MIT](./LICENSE)
