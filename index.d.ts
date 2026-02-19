/**
 * Normalizes a human name by handling honorifics, suffixes, middle particles,
 * and complex casing (e.g., `McDonald`, `O'Brian`, `Smith-Jones`).
 * * @param fullName - The raw name string to normalize. Defaults to an empty string.
 * @returns The formatted and normalized name string.
 */
declare function normalizeHumanName(fullName?: string): string;

export default normalizeHumanName;
export { normalizeHumanName };
