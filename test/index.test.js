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

        test('Should handle "St" as a title', () => expect(normalizeHumanName('st john')).toBe('St. John'));
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
            expect(normalizeHumanName('louis v')).toBe('Louis V');
            expect(normalizeHumanName('thurston howell iii')).toBe('Thurston Howell III');
        });
    });

    // --| Section: Name Particles (Linguistic Connectors)
    describe('Name Particles', () => {
        test('Should keep particles lowercase when in the middle of a name', () => {
            expect(normalizeHumanName('leonardo di caprio')).toBe('Leonardo di Caprio');
            expect(normalizeHumanName('ludwig van beethoven')).toBe('Ludwig van Beethoven');
        });

        test('Should handle Arabic particles in Latin script', () => {
            expect(normalizeHumanName('nour al ghandour')).toBe('Nour al Ghandour');
            expect(normalizeHumanName('omar bin khattab')).toBe('Omar bin Khattab');
        });

        test('Should capitalize particles if they are at the start (boundary)', () => expect(normalizeHumanName('van winkle')).toBe('Van Winkle'));
    });

    // --| Section: Arabic Script
    describe('Arabic Script Support', () => {
        test('Should preserve Arabic script and fix spacing', () => {
            // "Zaha Hadid" in Arabic
            expect(normalizeHumanName(' زها  حديد ')).toBe('زها حديد');
        });

        test('Should handle Arabic script without attempting to case', () => {
            // "Naghib Mahfouz"
            expect(normalizeHumanName('نجيب محفوظ')).toBe('نجيب محفوظ');
        });
    });

    // --| Section: CJK Scripts (Chinese, Japanese, Korean)
    describe('CJK Script Support', () => {
        test('Should remove spaces from Chinese names', () => {
            expect(normalizeHumanName('王 小明')).toBe('王小明');
        });

        test('Should remove spaces from Japanese names', () => {
            expect(normalizeHumanName('佐藤  健')).toBe('佐藤健');
        });

        test('Should handle Korean Hangul', () => {
            expect(normalizeHumanName('김  지수')).toBe('김지수');
        });
    });

    // --| Section: Complex Casing (Mc, Mac, O’)
    describe('Complex Prefix Casing', () => {
        test('Should correctly case Mc- names', () => {
            expect(normalizeHumanName('mcdonald')).toBe('McDonald');
            expect(normalizeHumanName('mccartney')).toBe('McCartney');
        });

        test('Should correctly case Mac- names longer than 3 characters', () => expect(normalizeHumanName('macdougal')).toBe('MacDougal'));

        test('Should not over-capitalize short Mac names or exclusions', () => {
            expect(normalizeHumanName('mac')).toBe('Mac');
            expect(normalizeHumanName('macy')).toBe('Macy');
        });

        test('Should convert standard apostrophes to smart apostrophes', () => {
            expect(normalizeHumanName("o'brian")).toBe('O’Brian');
            expect(normalizeHumanName("d'angelo")).toBe('D’Angelo');
        });
    });

    // --| Section: Hyphenated Names
    describe('Hyphenated Names', () => {
        test('Should capitalize both sides of a hyphen', () => expect(normalizeHumanName('smith-jones')).toBe('Smith-Jones'));
        test('should handle Mc/Mac logic inside hyphenated segments', () => expect(normalizeHumanName('jean-mcdonald')).toBe('Jean-McDonald'));
    });

    // --| Section: Stress Tests and Edge Cases
    describe('Combined Stress Tests', () => {
        test('Should handle a nightmare combination', () => {
            const complex = "  dr. nour al-ghandour jr  ";
            expect(normalizeHumanName(complex)).toBe('Dr. Nour Al-Ghandour JR');
        });

        test('Should handle NFC normalization for international characters', () => {
            const input = 'REN\u0065\u0301'; // Decomposed é
            expect(normalizeHumanName(input)).toBe('René');
        });
    });

    // --| Section: Safety and Types (Resilience)
    describe('Resilience', () => {
        test('Should return an empty string for null or undefined', () => {
            expect(normalizeHumanName(null)).toBe('');
            expect(normalizeHumanName(undefined)).toBe('');
        });

        test('Should handle non-string inputs gracefully', () => {
            expect(normalizeHumanName(12345)).toBe('');
            expect(normalizeHumanName({})).toBe('');
            expect(normalizeHumanName([])).toBe('');
        });

        test('Should handle strings that are just spaces', () => {
            expect(normalizeHumanName('   ')).toBe('');
        });
    });
});
