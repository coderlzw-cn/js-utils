declare class StringUtils {
    static isEmpty: (str: string | null) => boolean;
    static isBlank: (str: string | null) => boolean;
    static capitalizeFirstLetter: (str: string) => string;
    static uncapitalizeFirstLetter: (str: string) => string;
    static extractStringByRegex: (str: string, regex: RegExp, returnOriginal?: boolean) => string | null;
    static toUpperCase: (str: string) => string;
    static toLowerCase: (str: string) => string;
    static trim: (str: string) => string;
    static repeat: (str: string, n: number) => string;
    static base64Encode: (str: string) => string;
    static base64Decode: (str: string) => string;
    static removeMiddleSpaces: (str: string, removeEnds?: boolean) => string;
    static isNumeric: (str: string) => boolean;
    static stringToNumber: (str: string) => number;
    static stringToBigInt: (str: string) => bigint;
    static isPalindrome: (str: string) => boolean;
    static mostFrequentCharacters: (str: string) => string[];
    static uniqueCharacters: (str: string) => string[];
}
