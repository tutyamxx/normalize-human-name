# normalize-human-name

<p align="center"><a href="https://nodei.co/npm/normalize-human-name/"><img src="https://nodei.co/npm/normalize-human-name.png"></a></a></p>
<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg">
</p>

* 🎓 Normalize real human names the way they’re actually written — fixes casing, particles, honorifics, suffixes, hyphenation, Mc/Mac and O’ prefixes into clean, properly formatted names.
* ♻️ Works seamlessly with `CommonJS`, `ESM` and `TypeScript`

# Why this module is Versatile 🚀

- Most name normalization functions simply capitalize the first letter of every word. `normalizeHumanName` is built to handle the "messy" reality of human nomenclature by implementing rules for honorifics, genealogical suffixes, and complex prefixes.
- `0` Dependencies.

## Key Capabilities:
* **🛡️ Context-Aware Particles**: Automatically keeps Dutch and Romance language particles (like `van`, `von`, `di`) lowercase, but only when they appear in the middle of a name.
* **🏴󠁧󠁢󠁳󠁣󠁴󠁿 Gaelic Prefix Logic**: Intelligent handling of `Mc` and `Mac` prefixes while excluding common false positives like `"Macy"` or `"Mack"`.
* **🔗 Smart Delimiter Handling**: Splits and capitalizes correctly across both hyphens and apostrophes (e.g., `O'Brian-Smith`).
* **🌐 Unicode Safety**: Uses `NFC` normalization to ensure that accented characters (like `é`) are treated as single units, preventing "double-casing" bugs.
* **🎓 Academic & Professional Sets**: Detects specific suffixes like `PhD`, `MD`, or `JR` and ensures they maintain standard uppercase formatting.

## Edge Case Handling

| Input Category | Example Input | Normalized Output | Why it’s handled this way |
| :--- | :--- | :--- | :--- |
| **Honorifics** | `dr stephen strange` | `Dr. Stephen Strange` | Detects titles and ensures a standardized trailing period. |
| **Suffixes** | `robert downey jr` | `Robert Downey JR` | Identifies genealogical and professional suffixes to force uppercase. |
| **Middle Particles** | `vincent van gogh` | `Vincent van Gogh` | Particles stay lowercase between names but capitalize at boundaries. |
| **Hyphenated Gaelic** | `o'brian-mcdonald` | `O’Brian-McDonald` | Recursively handles multiple delimiters and converts to smart apostrophes. |
| **Exclusion Logic** | `macy gray` | `Macy Gray` | Prevents "Mac" logic from triggering on names that aren't actually prefixes. |
| **Unicode Normalization** | `REN\u0065\u0301` | `René` | Collapses decomposed accents into single characters before processing. |
| **Sanitization** | `  JOHN    DOE  ` | `John Doe` | Collapses internal whitespace and trims the string. |

# 📦 Install via [NPM](https://www.npmjs.com/package/normalize-human-name)

```bash
$ npm i normalize-human-name
```

# 💻 Usage

- See examples below

## CommonJS
```javascript
const normalizeHumanName = require('normalize-human-name');

// --| 1. The "Professional" (Honorifics & Suffixes)
// --| Handles title dots and uppercase credentials automatically
const academic = () => {
    const raw = "dr jane doe phd";
    console.log(normalizeHumanName(raw));
    // --| Result: "Dr. Jane Doe PHD"
};

// --| 2. The "European" (Middle Particles)
// --| Keeps connectors lowercase only when they are not at the start/end
const european = () => {
    const raw = "LEONARDO DI CAPRIO";
    console.log(normalizeHumanName(raw));
    // --| Result: "Leonardo di Caprio"
};

// --| 3. The "Highlander" (Gaelic Prefixes)
// --| Handles internal capitalization for Mc/Mac
const gaelic = () => {
    const raw = "mcdonald macdougal";
    console.log(normalizeHumanName(raw));
    // --| Result: "McDonald MacDougal"
};

// --| 4. The "Double-Barrel" (Hyphens & Apostrophes)
// --| Correctly cases across delimiters and converts to smart apostrophes
const hyphenated = () => {
    const raw = "anne-marie o'malley";
    console.log(normalizeHumanName(raw));
    // --| Result: "Anne-Marie O’Malley"
};

// --| 5. The "False Positive" (Exclusion Logic)
// --| Ensures common names starting with "Mac" aren't broken
const exclusion = () => {
    const raw = "macy gray";
    console.log(normalizeHumanName(raw));
    // --| Result: "Macy Gray" (Not "MacY")
};

// --| 6. The "International" (Unicode NFC)
// --| Prevents double-casing by collapsing decomposed characters
const international = () => {
    const raw = "REN\u0065\u0301";
    console.log(normalizeHumanName(raw));
    // --| Result: "René"
};

// --| 7. The "Messy Data" (Sanitization)
// --| Cleans up erratic spacing and mixed casing
const cleanup = () => {
    const raw = "  jOHN    smith   ";
    console.log(normalizeHumanName(raw));
    // --| Result: "John Smith"
};

// --| Execute all
[academic, european, gaelic, hyphenated, exclusion, international, cleanup].forEach(fn => fn());
```

## ESM
```javascript
import normalizeHumanName from 'normalize-human-name';

// --| 1. The "Professional" (Honorifics & Suffixes)
// --| Handles title dots and uppercase credentials automatically
const academic = () => {
    const raw = "dr jane doe phd";
    console.log(normalizeHumanName(raw));
    // --| Result: "Dr. Jane Doe PHD"
};

// --| 2. The "European" (Middle Particles)
// --| Keeps connectors lowercase only when they are not at the start/end
const european = () => {
    const raw = "LEONARDO DI CAPRIO";
    console.log(normalizeHumanName(raw));
    // --| Result: "Leonardo di Caprio"
};

// --| 3. The "Highlander" (Gaelic Prefixes)
// --| Handles internal capitalization for Mc/Mac
const gaelic = () => {
    const raw = "mcdonald macdougal";
    console.log(normalizeHumanName(raw));
    // --| Result: "McDonald MacDougal"
};

// --| 4. The "Double-Barrel" (Hyphens & Apostrophes)
// --| Correctly cases across delimiters and converts to smart apostrophes
const hyphenated = () => {
    const raw = "anne-marie o'malley";
    console.log(normalizeHumanName(raw));
    // --| Result: "Anne-Marie O’Malley"
};

// --| 5. The "False Positive" (Exclusion Logic)
// --| Ensures common names starting with "Mac" aren't broken
const exclusion = () => {
    const raw = "macy gray";
    console.log(normalizeHumanName(raw));
    // --| Result: "Macy Gray" (Not "MacY")
};

// --| 6. The "International" (Unicode NFC)
// --| Prevents double-casing by collapsing decomposed characters
const international = () => {
    const raw = "REN\u0065\u0301";
    console.log(normalizeHumanName(raw));
    // --| Result: "René"
};

// --| 7. The "Messy Data" (Sanitization)
// --| Cleans up erratic spacing and mixed casing
const cleanup = () => {
    const raw = "  jOHN    smith   ";
    console.log(normalizeHumanName(raw));
    // --| Result: "John Smith"
};

// --| Execute all
[academic, european, gaelic, hyphenated, exclusion, international, cleanup].forEach(fn => fn());
```

## TypeScript
```javascript
import normalizeHumanName from 'normalize-human-name';

// --| 1. The "Professional" (Honorifics & Suffixes)
// --| Handles title dots and uppercase credentials automatically
const academic = (): void => {
    const raw: string = "dr jane doe phd";
    console.log(normalizeHumanName(raw));
    // --| Result: "Dr. Jane Doe PHD"
};

// --| 2. The "European" (Middle Particles)
// --| Keeps connectors lowercase only when they are not at the start/end
const european = (): void => {
    const raw: string = "LEONARDO DI CAPRIO";
    console.log(normalizeHumanName(raw));
    // --| Result: "Leonardo di Caprio"
};

// --| 3. The "Highlander" (Gaelic Prefixes)
// --| Handles internal capitalization for Mc/Mac
const gaelic = (): void => {
    const raw: string = "mcdonald macdougal";
    console.log(normalizeHumanName(raw));
    // --| Result: "McDonald MacDougal"
};

// --| 4. The "Double-Barrel" (Hyphens & Apostrophes)
// --| Correctly cases across delimiters and converts to smart apostrophes
const hyphenated = (): void => {
    const raw: string = "anne-marie o'malley";
    console.log(normalizeHumanName(raw));
    // --| Result: "Anne-Marie O’Malley"
};

// --| 5. The "False Positive" (Exclusion Logic)
// --| Ensures common names starting with "Mac" aren't broken
const exclusion = (): void => {
    const raw: string = "macy gray";
    console.log(normalizeHumanName(raw));
    // --| Result: "Macy Gray" (Not "MacY")
};

// --| 6. The "International" (Unicode NFC)
// --| Prevents double-casing by collapsing decomposed characters
const international = (): void => {
    // --| \u0065\u0301 is a decomposed 'é'
    const raw: string = "REN\u0065\u0301";
    console.log(normalizeHumanName(raw));
    // --| Result: "René"
};

// --| 7. The "Messy Data" (Sanitization)
// --| Cleans up erratic spacing and mixed casing
const cleanup = (): void => {
    const raw: string = "  jOHN    smith   ";
    console.log(normalizeHumanName(raw));
    // --| Result: "John Smith"
};

// --| Execute all
const scenarios: Array<() => void> = [
    academic,
    european,
    gaelic,
    hyphenated,
    exclusion,
    international,
    cleanup
];

scenarios.forEach(fn => fn());
```
