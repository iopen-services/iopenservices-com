# @iopen/tokens

Design tokens package for iOpen Services following W3C Design Tokens specification.

## Current Status

✅ **Completed:**
- Brand colors with light/dark variants
- Neutral colors (white, black, oatmeal)
- Utility colors (success, warning, error)

🚧 **In Progress/TODO:**
- Typography scales and font stacks
- Spacing and radius scales
- Elevation/shadow definitions
- Full Token Studio integration

## Features

- 🎨 iOpen brand color palette with variants
- ✒️ Typography scales (TODO)
- 📏 Consistent spacing system (TODO) 
- 🌄 Elevation/shadow definitions (TODO)
- 🔄 Figma sync via Token Studio (TODO)

## Token Categories

- **Color**: iOpen brand colors, neutrals, and utility colors
- **Typography**: Placeholder values (TODO)
- **Spacing**: Placeholder values (TODO)
- **Elevation**: Placeholder values (TODO)

## Usage

Install the package:

```bash
pnpm add @iopen/tokens
```

Import tokens in your project:

```javascript
import { colors, typography, spacing, elevation } from '@iopen/tokens'
```

## Token Studio Integration

To sync tokens with Figma (TODO):

1. Install [Token Studio](https://www.figma.com/community/plugin/843461159747178978) plugin
2. Import `tokens.json` from this package
3. Map tokens to your Figma styles

The tokens follow W3C Design Tokens format for maximum compatibility.

## Development

Build tokens:

```bash
pnpm build
```

This generates:
- CSS variables
- SCSS variables
- JavaScript/TypeScript exports

## License

MIT © [iOpen Services LLC](https://www.iopenservices.com)
