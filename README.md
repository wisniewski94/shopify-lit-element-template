# shopify-lit-element-template

This is template repository for Shopify Online Store 2.0 project that focuses on using [lit-element](https://lit.dev/). Modern-browser oriented solution.

Features:
- TypeScript / JavaScript support
- Small bundles thanks to [terser](https://www.npmjs.com/package/terser) and [minify-html-literals](https://www.npmjs.com/package/minify-html-literals)
- Works only with [ES6 modules](https://caniuse.com/es6-module)
- Works in parallel with shopify theme serve command
- Minimalistic setup

## Requirements

- Shopify CLI
- Node version 16+

Authenticate to your development Shopify store before runing the development server.

```
shopify login --store your-store.myshopify.com
```

Clone repository and initialize store project:

```
shopify theme init -u https://github.com/wisniewski94/shopify-lit-element-template.git
```

## Quick start

1. Install dependencies:

```
npm install
```

2. Run watch commamd with shopify theme serve using:

```
npm run watch
```

3. Or just build modules and push theme:
```
npm run build
shopify theme push
```

## Structure

All magic happens in the `/src` directory. Catalogs under `/components` are treated like names for entry files. Each catalog under `/components` **must** contain index.{ts,js} file. Files in the `/utils` directory will keep their names. After build process is finished those files will be moved into shopify's `/assets` dir.

```
- src/
  - components/
    - moduleA/
      - index.js
    - moduleB/
      - dependency.js
      - index.ts
  - utils/
    - slider.js
```

will be transformed into:

```
- assets/
  - component-moduleA.js
  - component-moduleB.js
  - lib-slider.js
```

### External dependencies

Please note that some dependencies are omitted during build process and you have to include them manually. You can control this behavior by editing index.js. One of those dependencies is lit-element itself.

### Contributing

Made by the community for the community. I am always welcome to hear your comments. Feel free to make PRs and create [Issues](https://github.com/wisniewski94/shopify-lit-element-template/issues).








