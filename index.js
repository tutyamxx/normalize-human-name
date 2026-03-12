/**
 * normalize-human-name - 🎓 Normalize real human names the way they’re actually written — fixes casing, particles, honorifics, suffixes, hyphenation, Mc/Mac and O’ prefixes into clean, properly formatted names.
 * @version: v1.0.9
 * @link: https://github.com/tutyamxx/normalize-human-name
 * @license: MIT
 **/

/**
 * Normalizes a human name by handling honorifics, suffixes, middle particles, and complex casing (e.g., `McDonald`, `O'Brian`, `Smith-Jones`).
 *
 * @param fullName - The raw name string to normalize. Defaults to an empty string.
 * @returns The formatted and normalized name string.
 */
const normalizeHumanName = (fullName) => {
    // --| Handle non-string inputs or empty values immediately
    if (typeof fullName !== 'string' || !fullName?.trim?.()) return '';

    // --| Normalize to NFC immediately so decomposed characters become one unit
    const normalized = fullName?.normalize?.('NFC')?.trim?.();

    // --| Handle CJK (Chinese, Japanese, Korean) scripts
    // --| We check for common CJK characters and strip unnecessary spaces
    const isCJK = /\p{Script=Han}|\p{Script=Hiragana}|\p{Script=Katakana}|\p{Script=Hangul}/u.test(normalized);
    if (isCJK) return normalized?.replace?.(/\s+/g, '');

    // --| Handle Arabic script (Return as-is as Arabic has no concept of casing)
    const isArabic = /\p{Script=Arabic}/u.test(normalized);
    if (isArabic) return normalized?.replace?.(/\s+/g, ' ');

    const categories = {
        honorifics: new Set([
            'mr', 'mrs', 'ms', 'dr', 'prof', 'sir', 'madam', 'lord', 'lady', 'st',
            'rev', 'fr', 'sister', 'br', 'rabbi', 'imam', 'pastor', 'mstr', 'don', 'dona',
            'assoc', 'asst', 'dean', 'gen', 'col', 'maj', 'capt', 'lt', 'sgt', 'herr', 'frau'
        ]),
        suffixes: new Set([
            'jr', 'sr', 'phd', 'md', 'esq', 'dds', 'dvm', 'do',
            'rn', 'np', 'pa', 'pharmd', 'cpa', 'cfa', 'mba', 'jd', 'obe', 'mbe'
        ]),
        particles: new Set([
            'da', 'de', 'del', 'della', 'der', 'di', 'la', 'le', 'van', 'von', 'den',
            'al', 'bin', 'ibn', 'du', 'des', 'vander', 'ten', 'ter', 'te', 'am', 'auf',
            'zu', 'do', 'dos', 'das', 'e', 'y', 'lo', 'li'
        ])
    };

    // --| Regex for Roman Numerals (I to XXXIX). Capped at 39 to avoid words like 'MIX' or 'DI' since it might cause issues
    const romanNumeralRegex = /^(?:X{0,3})(?:IX|IV|V?I{0,3})$/i;

    // --| List of common names starting with Mac that are NOT prefixes
    const macExclusions = new Set(['macy', 'mace', 'mack']);

    const capitalize = (word) => word ? word?.charAt?.(0)?.toUpperCase?.() + word?.slice?.(1)?.toLowerCase?.() : '';

    const tokens = normalized?.replaceAll?.(/\s+/g, ' ')?.split?.(' ');

    return tokens?.map?.((token, index, allTokens) => {
        const cleanToken = token?.toLowerCase?.()?.replace?.(/'/g, '’');
        const isBoundary = index === 0 || index === allTokens?.length - 1;

        // --| Handle Titles
        if (categories?.honorifics?.has?.(cleanToken)) return capitalize(cleanToken) + '.';

        // --| Handle Middle Particles (Check this BEFORE Roman Numerals to catch 'di')
        if (categories?.particles?.has?.(cleanToken) && !isBoundary) return cleanToken;

        // --| Handle Suffixes & Roman Numerals (Exclude 'di' as a numeral to be safe)
        const isRoman = romanNumeralRegex.test(cleanToken) && cleanToken !== 'di';
        if (categories?.suffixes?.has?.(cleanToken) || isRoman) return cleanToken?.toUpperCase?.();

        // --| Handle Complex Names
        return cleanToken?.split?.(/([-’])/)?.map?.(segment => {
            if (segment === '-' || segment === '’') return segment;

            const capSegment = capitalize(segment);

            // --| Improved Mc/Mac logic
            if (segment?.startsWith?.('mc') && segment?.length > 2) {
                return 'Mc' + capitalize(segment?.slice?.(2));
            }

            // --| Only process Mac if it's > 3 chars and NOT in our exclusion list
            if (segment?.startsWith?.('mac') && segment?.length > 3 && !macExclusions?.has?.(segment)) {
                return 'Mac' + capitalize(segment?.slice?.(3));
            }

            return capSegment;
        })?.join?.('');
    })?.join?.(' ')?.replace?.(/\s+\./g, '.');
};

// --| CommonJS export
module.exports = normalizeHumanName;

// --| ESM default export for `import` statements
module.exports.default = normalizeHumanName;
