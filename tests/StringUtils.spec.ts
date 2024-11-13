import StringUtils from "../src/StringUtils";

describe("StringUtils 类方法测试", () => {
    test("isEmpty: 判断是否为空字符串或null", () => {
        expect(StringUtils.isEmpty(null)).toBe(true);
        expect(StringUtils.isEmpty("")).toBe(true);
        expect(StringUtils.isEmpty("abc")).toBe(false);
    });

    test("isBlank: 判断是否为null、空白字符或空字符串", () => {
        expect(StringUtils.isBlank(null)).toBe(true);
        expect(StringUtils.isBlank("")).toBe(true);
        expect(StringUtils.isBlank(" ")).toBe(true);
        expect(StringUtils.isBlank("\t")).toBe(true);
        expect(StringUtils.isBlank("abc")).toBe(false);
    });

    test("capitalizeFirstLetter: 首字母大写", () => {
        expect(StringUtils.capitalizeFirstLetter("hello")).toBe("Hello");
        expect(StringUtils.capitalizeFirstLetter("Hello")).toBe("Hello");
    });

    test("uncapitalizeFirstLetter: 首字母小写", () => {
        expect(StringUtils.uncapitalizeFirstLetter("Hello")).toBe("hello");
        expect(StringUtils.uncapitalizeFirstLetter("hello")).toBe("hello");
    });

    test("extractStringByRegex: 根据正则表达式提取字符串", () => {
        expect(StringUtils.extractStringByRegex("sample_rate_0", /^(.*)_\d+$/, false)).toBe("sample_rate");
        expect(StringUtils.extractStringByRegex("sample_rate_0", /^(.*)_\d+$/, true)).toBe("sample_rate_0");
        expect(StringUtils.extractStringByRegex("test", /(\d+)/)).toBe(null);
    });

    test("toUpperCase: 转换为大写", () => {
        expect(StringUtils.toUpperCase("hello")).toBe("HELLO");
    });

    test("toLowerCase: 转换为小写", () => {
        expect(StringUtils.toLowerCase("HELLO")).toBe("hello");
    });

    test("removeSpace: 根据配置清除空格", () => {
        expect(StringUtils.removeSpace("  hello world  ", { start: true })).toBe("hello world  ");
        expect(StringUtils.removeSpace("  hello world  ", { end: true })).toBe("  hello world");
        expect(StringUtils.removeSpace("  hello world  ", { middle: true })).toBe("  helloworld  ");
        expect(StringUtils.removeSpace("  hello world  ", { all: true })).toBe("helloworld");
    });

    test("repeat: 重复字符串", () => {
        expect(StringUtils.repeat("abc", 3)).toBe("abcabcabc");
    });

    test("isNumeric: 判断字符串是否为数字", () => {
        expect(StringUtils.isNumeric("123")).toBe(true);
        expect(StringUtils.isNumeric("abc")).toBe(false);
    });

    test("stringToNumber: 字符串转换为数字", () => {
        expect(StringUtils.stringToNumber("123")).toBe(123);
        expect(StringUtils.stringToNumber("abc")).toBeNaN();
    });

    test("stringToBigInt: 字符串转换为大整数", () => {
        expect(StringUtils.stringToBigInt("12345678901234567890")).toBe(12345678901234567890n);
        expect(() => StringUtils.stringToBigInt("abc")).toThrowError("Invalid input: string must represent a non-negative integer.");
    });

    test("isPalindrome: 判断是否为回文字符串", () => {
        expect(StringUtils.isPalindrome("racecar")).toBe(true);
        expect(StringUtils.isPalindrome("hello")).toBe(false);
    });

    test("mostFrequentCharacters: 计算字符串中出现最频繁的字符", () => {
        expect(StringUtils.mostFrequentCharacters("aabbcc")).toEqual(["a", "b", "c"]);
        expect(StringUtils.mostFrequentCharacters("aaabb")).toEqual(["a"]);
    });

    test("uniqueCharacters: 返回字符串中只出现一次的字符", () => {
        expect(StringUtils.uniqueCharacters("aabbcd")).toEqual(["c", "d"]);
    });

    test("format: 字符串格式化", () => {
        expect(StringUtils.format("Hello, %s!", "world")).toBe("Hello, world!");
        expect(StringUtils.format("%d + %d = %d", 2, 3, 5)).toBe("2 + 3 = 5");
        expect(StringUtils.format("Price: %f", 9.99)).toBe("Price: 9.990000");
    });
});