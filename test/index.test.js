const normalizeHumanName = require('../index.js');

describe('normalizeHumanName()', () => {
    // --| Section: Basic Casing and Spacing
    describe('Basic Casing and Spacing', () => {
        test('Should capitalize simple lowercase names', () => expect(normalizeHumanName('john doe')).toBe('John Doe'));
        test('Should fix all-caps names', () => expect(normalizeHumanName('JANE DOE')).toBe('Jane Doe'));
        test('Should trim leading and trailing whitespace', () => expect(normalizeHumanName('   marcus aurelius   ')).toBe('Marcus Aurelius'));
        test('Should collapse multiple internal spaces into one', () => expect(normalizeHumanName('william    shakespeare')).toBe('William Shakespeare'));
        test('Should handle mixed casing strings correctly', () => expect(normalizeHumanName('eLoN mUsK')).toBe('Elon Musk'));
    });

    // --| Section: Honorifics (Titles)
    describe('Honorifics and Titles', () => {
        test('Should capitalize honorifics and append a period', () => {
            expect(normalizeHumanName('dr stephen strange')).toBe('Dr. Stephen Strange');
            expect(normalizeHumanName('prof xavier')).toBe('Prof. Xavier');
        });

        test('Should not add a second period if one already exists', () => expect(normalizeHumanName('mr. smith')).toBe('Mr. Smith'));
        test('Should handle multiple honorifics', () => expect(normalizeHumanName('sir prof smith')).toBe('Sir. Prof. Smith'));
    });

    // --| Section: Suffixes
    describe('Suffixes', () => {
        test('Should force suffixes to uppercase', () => {
            expect(normalizeHumanName('robert downey jr')).toBe('Robert Downey JR');
            expect(normalizeHumanName('tony stark phd')).toBe('Tony Stark PHD');
        });

        test('Should handle Roman numeral suffixes', () => {
            expect(normalizeHumanName('king henry viii')).toBe('King Henry VIII');
            expect(normalizeHumanName('thurston howell iii')).toBe('Thurston Howell III');
        });
    });

    // --| Section: Name Particles (Linguistic Connectors)
    describe('Name Particles', () => {
        test('Should keep particles lowercase when in the middle of a name', () => {
            expect(normalizeHumanName('leonardo di caprio')).toBe('Leonardo di Caprio');
            expect(normalizeHumanName('ludwig van beethoven')).toBe('Ludwig van Beethoven');
        });

        test('Should capitalize particles if they are at the start (boundary)', () => expect(normalizeHumanName('van winkle')).toBe('Van Winkle'));
        test('Should capitalize particles if they are the only name provided', () => expect(normalizeHumanName('de')).toBe('De'));
    });

    // --| Section: Complex Casing (Mc, Mac, O’)
    describe('Complex Prefix Casing', () => {
        test('Should correctly case Mc- names', () => {
            expect(normalizeHumanName('mcdonald')).toBe('McDonald');
            expect(normalizeHumanName('mccartney')).toBe('McCartney');
        });

        test('Should correctly case Mac- names longer than 3 characters', () => expect(normalizeHumanName('macdougal')).toBe('MacDougal'));

        test('Should not over-capitalize short Mac names or names starting with Mac', () => {
            // --| "Mac" is 3 chars, so it should just be capitalized normally
            expect(normalizeHumanName('mac')).toBe('Mac');
            expect(normalizeHumanName('macy')).toBe('Macy');
        });

        test('Should convert standard apostrophes to smart apostrophes and case correctly', () => {
            expect(normalizeHumanName("o'brian")).toBe('O’Brian');
            expect(normalizeHumanName("d'angelo")).toBe('D’Angelo');
        });
    });

    // --| Section: Hyphenated Names
    describe('Hyphenated Names', () => {
        test('Should capitalize both sides of a hyphen', () => expect(normalizeHumanName('smith-jones')).toBe('Smith-Jones'));
        test('should handle Mc/Mac logic inside hyphenated segments', () => expect(normalizeHumanName('jean-mcdonald')).toBe('Jean-McDonald'));
        test('should handle triple-barrelled names', () => expect(normalizeHumanName('fiennes-clinton-hope')).toBe('Fiennes-Clinton-Hope'));
    });

    // --| Section: Stress Tests and Edge Cases
    describe('Combined Stress Tests', () => {
        test('Should handle a nightmare combination of all rules', () => {
            const complex = "  dr. ronald   mcdonald-o'hara   jr  ";
            // --| Expected: Title fix, spacing fix, Mc fix, apostrophe fix, hyphen fix, suffix fix
            expect(normalizeHumanName(complex)).toBe('Dr. Ronald McDonald-O’Hara JR');
        });

        test('Should handle NFC normalization for international characters', () => {
            // --| Decomposed e + accent -> é
            const input = 'REN\u0065\u0301';
            expect(normalizeHumanName(input)).toBe('René');
        });

        test('Should handle non-Latin characters gracefully', () => expect(normalizeHumanName('李小龍')).toBe('李小龍'));
    });

    // --| Section: Safety and Types
    describe('Resilience', () => {
        test('Should return an empty string for null or undefined', () => {
            expect(normalizeHumanName(null)).toBe('');
            expect(normalizeHumanName(undefined)).toBe('');
        });

        test('Should handle non-string inputs gracefully', () => {
            expect(normalizeHumanName(12345)).toBe('');
        });
    });
});
