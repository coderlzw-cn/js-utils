export default class StringUtils {
    /**
     * 判断字符串是否为空字符串或null
     * @param str 要检查的字符串
     * @returns 如果为空字符串或null则返回true，否则返回false
     * @example
     * StringUtils.isEmpty(null);  // true
     * StringUtils.isEmpty("");    // true
     * StringUtils.isEmpty("abc"); // false
     */
    static isEmpty = (str: string | null) => str === null || str.length === 0;

    /**
     * 判断字符串是否为null、undefined、空白字符、换行符、制表符
     * @param str 要检查的字符串
     * @returns 如果为null、undefined、空白字符、换行符或制表符则返回true，否则返回false
     * @example
     * StringUtils.isBlank(null);   // true
     * StringUtils.isBlank(" ");    // true
     * StringUtils.isBlank("abc");  // false
     */
    static isBlank = (str: string | null) => str == null || str.trim().length === 0;

    /**
     * 将字符串的首字母转为大写
     * @param str 要转换的字符串
     * @returns 首字母大写后的字符串
     * @example
     * StringUtils.capitalizeFirstLetter("hello"); // "Hello"
     */
    static capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    /**
     * 将字符串的首字母转为小写
     * @param str 要转换的字符串
     * @returns 首字母小写后的字符串
     * @example
     * StringUtils.uncapitalizeFirstLetter("Hello"); // "hello"
     */
    static uncapitalizeFirstLetter = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);

    /**
     * 根据正则表达式提取字符串
     * @param str 输入的字符串
     * @param regex 正则表达式模式
     * @param returnOriginal 指示是否返回原始字符串，默认为false
     * @returns 提取的字符串或null
     * @example
     * StringUtils.extractStringByRegex("sample_rate_0", /^(.*)_\d+$/, true);  // "sample_rate_0"
     * StringUtils.extractStringByRegex("sample_rate_0", /^(.*)_\d+$/, false); // "sample_rate"
     */
    static extractStringByRegex = (str: string, regex: RegExp, returnOriginal = false) => {
        const match = str.match(regex);
        return match ? (returnOriginal ? match[0] : match[1]) : null;
    };

    /**
     * 将字符串转换为大写
     * @param str 要转换的字符串
     * @returns 大写后的字符串
     * @example
     * StringUtils.toUpperCase("hello"); // "HELLO"
     */
    static toUpperCase = (str: string) => str.toUpperCase();

    /**
     * 将字符串转换为小写
     * @param str 要转换的字符串
     * @returns 小写后的字符串
     * @example
     * StringUtils.toLowerCase("HELLO"); // "hello"
     */
    static toLowerCase = (str: string) => str.toLowerCase();

    /**
     * 根据配置清除字符串中的空格
     * @param str 要处理的字符串
     * @param options 配置项，默认为清除首尾空格
     * @param options.start 是否清除字符串开头的空格，默认为false
     * @param options.end 是否清除字符串末尾的空格，默认为false
     * @param options.middle 是否清除字符串中间的空格，默认为false
     * @param options.all 是否清除字符串中所有位置的空格，默认为false
     * @returns 处理后的字符串
     * @example
     * StringUtils.removeSpace("  hello world  "); // "hello world" (默认清除首尾空格)
     * StringUtils.removeSpace("  hello world  ", { start: true }); // "hello world  " (清除开头空格)
     * StringUtils.removeSpace("  hello world  ", { end: true }); // "  hello world" (清除末尾空格)
     * StringUtils.removeSpace("  hello world  ", { middle: true }); // "  helloworld  " (清除中间空格)
     * StringUtils.removeSpace("  hello world  ", { all: true }); // "helloworld" (清除所有空格)
     */
    static removeSpace = (
        str: string,
        { start = false, end = false, middle = false, all = false } = {}
    ): string => {
        // 如果配置了 all，则直接移除所有空格
        if (all) {
            return str.replace(/\s+/g, "");
        }

        // 移除首尾空格（默认）
        if (start && end) {
            str = str.trim();
        } else if (start) {
            str = str.replace(/^\s+/, ""); // 移除开头空格
        } else if (end) {
            str = str.replace(/\s+$/, ""); // 移除末尾空格
        }

        // 移除中间空格
        if (middle) {
            str = str.replace(/(\S)\s+(?=\S)/g, "$1"); // 保留首尾，移除中间空格
        }

        return str;
    };

    /**
     * 重复字符串n次
     * @param str 要重复的字符串
     * @param n 重复的次数
     * @returns 重复后的字符串
     * @example
     * StringUtils.repeat("abc", 3); // "abcabcabc"
     */
    static repeat = (str: string, n: number) => str.repeat(n);

    /**
     * 判断字符串是否为数字
     * @param str 要检查的字符串
     * @returns 如果字符串是数字则返回true，否则返回false
     * @example
     * StringUtils.isNumeric("123"); // true
     * StringUtils.isNumeric("abc"); // false
     */
    static isNumeric = (str: string) => /^\d+$/.test(str);

    /**
     * 将字符串转换为数字
     * @param str 要转换的字符串
     * @returns 转换后的数字，如果无法转换则返回NaN
     * @example
     * StringUtils.stringToNumber("123");  // 123
     * StringUtils.stringToNumber("abc");  // NaN
     */
    static stringToNumber = (str: string) => {
        if (!/^\d+$/.test(str)) {
            return NaN;
        }
        return Number(str);
    };

    /**
     * 将字符串转换为大整数
     * @param str 要转换的字符串
     * @returns 转换后的大整数，如果无法转换则抛出错误
     * @example
     * StringUtils.stringToBigInt("12345678901234567890"); // 12345678901234567890n
     */
    static stringToBigInt = (str: string) => {
        if (!/^\d+$/.test(str)) {
            throw new Error("Invalid input: string must represent a non-negative integer.");
        }
        return BigInt(str);
    };

    /**
     * 检查字符串是否为回文字符串
     * @param str 要检查的字符串
     * @returns 如果是回文字符串返回true，否则返回false
     * @example
     * StringUtils.isPalindrome("racecar");  // true
     * StringUtils.isPalindrome("hello");    // false
     */
    static isPalindrome = (str: string) => {
        const reversedStr = str.split("").reverse().join("");
        return str === reversedStr;
    };

    /**
     * 计算字符串中出现最频繁的字符
     * @param str 要计算的字符串
     * @returns 最频繁的字符数组，可能是多个字符
     * @example
     * StringUtils.mostFrequentCharacters("aabbcc"); // ["a", "b", "c"]
     */
    static mostFrequentCharacters = (str: string) => {
        const charMap: Record<string, number> = {};

        for (const char of str) {
            charMap[char] = charMap[char] + 1 || 1;
        }

        const maxCount = Math.max(...Object.values(charMap));

        return Object.keys(charMap).filter(char => charMap[char] === maxCount);
    };

    /**
     * 返回字符串中只出现一次的字符数组
     * @param str 要处理的字符串
     * @returns 只出现一次的字符数组
     * @example
     * StringUtils.uniqueCharacters("aabbcd"); // ["c", "d"]
     */
    static uniqueCharacters = (str: string) => {
        const charCount: Record<string, number> = {};

        for (const char of str) {
            charCount[char] = (charCount[char] || 0) + 1;
        }

        return Object.keys(charCount).filter(char => charCount[char] === 1);
    };

    /**
     * 用于字符串拼接和格式化
     * 支持的占位符：
     * - %s: 字符串
     * - %d: 整数
     * - %f: 浮点数
     * - %j: JSON字符串
     *
     * @param format 格式化字符串，包含占位符
     * @param args 替换占位符的参数列表
     * @returns 格式化后的字符串
     * @example
     * StringUtils.format("Hello, %s!", "world"); // "Hello, world!"
     * StringUtils.format("%d + %d = %d", 2, 3, 2 + 3); // "2 + 3 = 5"
     * StringUtils.format("Price: %f", 9.99); // "Price: 9.990000"
     */
    static format = (format: string, ...args: any[]): string => {
        let i = 0;
        return format.replace(/%[sdjf]/g, (match) => {
            const arg = args[i++];
            switch (match) {
                case "%s": // 字符串
                    return String(arg);
                case "%d": // 整数
                    return Number(arg).toFixed(0);
                case "%f": // 浮点数
                    return Number(arg).toFixed(6); // 默认6位小数
                case "%j": // JSON字符串
                    return JSON.stringify(arg);
                default:
                    return match;
            }
        });
    };
}