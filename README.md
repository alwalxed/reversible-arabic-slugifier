# Reversible Arabic Slugifier

A deterministic, reversible Arabic text to URL-safe slug converter with perfect round-trip fidelity.

## Features

✅ **Perfect Reversibility**: Convert Arabic text to slugs and back with 100% accuracy  
✅ **Deterministic**: Same input always produces the same output  
✅ **URL-Safe**: Generated slugs are safe for use in URLs  
✅ **Comprehensive**: Supports Arabic letters, diacritics, Arabic-Indic numerals, and common punctuation  
✅ **TypeScript**: Full TypeScript support with type definitions  
✅ **Zero Dependencies**: Lightweight with no external dependencies  
✅ **Well Tested**: Comprehensive test suite with high coverage

## Installation

```bash
# npm
npm install reversible-arabic-slugifier

# pnpm
pnpm add reversible-arabic-slugifier

# yarn
yarn add reversible-arabic-slugifier

# bun
bun i reversible-arabic-slugifier
```

## Quick Start

```typescript
import { slugify, deslugify } from "reversible-arabic-slugifier";

// Convert Arabic text to slug
const arabicText = "مرحبا بالعالم";
const slug = slugify(arabicText);
console.log(slug);
// => "~m~r~h~b~a~_~b~a~l~E~a~l~m"

const originalText = deslugify(slug);
console.log(originalText); // => "مرحبا بالعالم"

// Perfect round-trip
console.log(originalText === arabicText); // true
```

## Supported Characters

### Escape Prefix

All non-ASCII characters are escaped using a tilde (`~`) plus a short code.

### Arabic Letters

ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي  
Special forms: أ إ آ ى ة ء ؤ ئ

### Diacritics (Tashkeel)

Short vowels: َ ُ ِ  
Tanween: ً ٌ ٍ  
Other marks: ّ ْ ـ

### Numerals

Arabic-Indic digits: ٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩  
ASCII digits: 0-9

### Other Characters

- ASCII letters: a-z, A-Z
- ASCII digits: 0-9
- Common punctuation: `. , : ; ! ? ( ) [ ] { } " ' / \ & % # @ $ + = < > | ~`
- Dash (`-`) and underscore (`_`) are preserved as-is
- Spaces are escaped to `~_`

## How It Works

1. **Escape-prefix**: All escapes start with a tilde (`~`)
2. **Unique codes**: Each supported character maps to a unique code
3. **Greedy matching**: `deslugify` always picks the longest matching escape sequence
4. **ASCII pass-through**: Alphanumeric, `-`, `_` are unchanged

## Error Handling

```typescript
try {
  slugify("Hello € World");
} catch (error) {
  console.log(error.message);
  // => "Unsupported character(s): €"
}
```

## Contributing

If you encounter any issues or have suggestions, please submit them via issues or pull requests.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
