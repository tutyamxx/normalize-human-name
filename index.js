/**
 * normalize-human-name - 🎓 Normalize real human names the way they’re actually written — fixes casing, particles, honorifics, suffixes, hyphenation, Mc/Mac and O’ prefixes into clean, properly formatted names.
 * @version: v1.0.0
 * @link: https://github.com/tutyamxx/normalize-human-name
 * @license: MIT
 **/

/**
 * Normalizes a human name by handling honorifics, suffixes, middle particles,
 * and complex casing (e.g., `McDonald`, `O'Brian`, `Smith-Jones`).
 * * @param fullName - The raw name string to normalize. Defaults to an empty string.
 * @returns The formatted and normalized name string.
 */
const normalizeHumanName = (fullName) => {
    // --| 1. Handle non-string inputs or empty values immediately
    if (typeof fullName !== 'string' || !fullName?.trim()) return '';

    const categories = {
        honorifics: new Set(['mr', 'mrs', 'ms', 'dr', 'prof', 'sir', 'madam', 'lord', 'lady']),
        suffixes: new Set(['jr', 'sr', 'ii', 'iii', 'iv', 'phd', 'md', 'viii']),
        particles: new Set(['da', 'de', 'del', 'della', 'der', 'di', 'la', 'le', 'van', 'von', 'den'])
    };

    // --| List of common names starting with Mac that are NOT prefixes
    const macExclusions = new Set(['macy', 'mace', 'mack']);

    const capitalize = (word) => word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : '';

    // --| Normalize to NFC immediately so decomposed characters (e + accent) become one unit (é)
    const normalized = fullName.normalize('NFC').trim().replaceAll(/\s+/g, ' ');
    const tokens = normalized.split(' ');

    return tokens.map((token, index, allTokens) => {
        const cleanToken = token.toLowerCase().replace(/'/g, '’');
        const isBoundary = index === 0 || index === allTokens.length - 1;

        // --| Handle Titles
        if (categories.honorifics.has?.(cleanToken)) return capitalize(cleanToken) + '.';

        // --| Handle Suffixes
        if (categories.suffixes.has?.(cleanToken)) return cleanToken.toUpperCase();

        // --| Handle Middle Particles
        if (categories.particles.has?.(cleanToken) && !isBoundary) return cleanToken;

        // --| Handle Complex Names
        return cleanToken.split(/([-’])/).map(segment => {
            if (segment === '-' || segment === '’') return segment;

            const capSegment = capitalize(segment);

            // --| Improved Mc/Mac logic
            if (segment.startsWith('mc') && segment.length > 2) {
                return 'Mc' + capitalize(segment.slice(2));
            }

            // --| Only process Mac if it's > 3 chars and NOT in our exclusion list
            if (segment.startsWith('mac') && segment.length > 3 && !macExclusions.has(segment)) {
                return 'Mac' + capitalize(segment.slice(3));
            }

            return capSegment;
        }).join('');
    }).join(' ').replace(/\s+\./g, '.');
};

// --| CommonJS export
module.exports = normalizeHumanName;

// --| ESM default export for `import` statements
module.exports.default = normalizeHumanName;
