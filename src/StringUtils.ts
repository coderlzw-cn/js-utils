class StringUtils {
    /**
     * 判断字符串是否为空字符串或null
     * @param str 要检查的字符串
     * @returns 如果为空字符串或null则返回true，否则返回false
     * @example
     * isEmpty(" ")     // false
     * isEmpty("\n")    // false
     * isEmpty("\t")    // false
     */
    static isEmpty = (str: string | null) => str === null || str.length === 0;

    /**
     * 判断字符串是否为null、undefined、空白字符、换行符、制表符
     * @param str 要检查的字符串
     * @returns 如果为null、undefined、空白字符、换行符或制表符则返回true，否则返回false
     * @example
     * isBlank(" ")     // true
     * isBlank("\n")    // true
     * isBlank("\t")    // true
     */
    static isBlank = (str: string | null) => str == null || str.trim().length === 0;

    /**
     * 将字符串的首字母转为大写
     * @param str 要转换的字符串
     * @returns 首字母大写后的字符串
     */
    static capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    /**
     * 将字符串的首字母转为小写
     * @param str 要转换的字符串
     * @returns 首字母小写后的字符串
     */
     static uncapitalizeFirstLetter = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);

    /**
     * 根据正则表达式提取字符串
     * 如果没有匹配则根据 returnOriginal 参数返回原始字符串或null
     * @param str 输入的字符串
     * @param regex 正则表达式模式
     * @param returnOriginal 指示是否返回原始字符串，默认为false
     * @returns 如果匹配成功，根据 returnOriginal 参数返回提取的字符串或原始字符串，匹配失败返回null
     * @example
     * const str = extractStringByRegex("sample_rate_0", /^(.*)_\d+$/, true); // sample_rate_0
     * const str = extractStringByRegex("sample_rate", /^(.*)_\d+$/, false); // null
     */
     static extractStringByRegex = (str: string, regex: RegExp, returnOriginal = false) => {
        const match = str.match(regex);
        return match ? (returnOriginal ? match[0] : match[1]) : null;
    };

    /**
     * 将字符串转换为大写
     * @param str 要转换的字符串
     * @returns 大写后的字符串
     */
     static toUpperCase = (str: string) => str.toUpperCase();

    /**
     * 将字符串转换为小写
     * @param str 要转换的字符串
     * @returns 小写后的字符串
     */
     static toLowerCase = (str: string) => str.toLowerCase();

    /**
     * 去掉字符串两端的空白字符
     * @param str 要处理的字符串
     * @returns 去掉空白后的字符串
     */
     static trim = (str: string) => str.trim();

    /**
     * 重复字符串n次
     * @param str 要重复的字符串
     * @param n 重复的次数
     * @returns 重复后的字符串
     * @example
     * repeat("abc", 3) // "abcabcabc"
     */
     static repeat = (str: string, n: number) => str.repeat(n);

    /**
     * 将字符串编码为Base64
     * @param str 要编码的字符串
     * @returns Base64编码字符串
     */
     static base64Encode = (str: string) => btoa(encodeURIComponent(str));

    /**
     * 解码Base64编码字符串
     * @param str Base64编码字符串
     * @returns 解码后的字符串
     */
     static base64Decode = (str: string) => decodeURIComponent(atob(str));

    /**
     * 去掉字符串中间的空格
     * @param str 要处理的字符串
     * @param removeEnds 是否去除首尾空格，默认为 false
     * @returns 处理后的字符串
     */
     static removeMiddleSpaces = (str: string, removeEnds: boolean = false) => removeEnds ? str.trim().replace(/\s/g, '') : str.replace(/\s/g, '')


    /**
     * 判断字符串是否为数字
     * @param str 要检查的字符串
     * @returns 如果字符串是数字则返回true，否则返回false
     * @example
     * isNumeric("123")   // true
     * isNumeric("abc")   // false
     */
     static isNumeric = (str: string) => /^\d+$/.test(str);


    /**
     * 将字符串转换为数字
     * @param str 要转换的字符串
     * @returns 转换后的数字，如果无法转换则返回NaN
     */
     static stringToNumber = (str: string) => {
        if (!this.isNumeric(str)) {
            return NaN;
        }
        return Number(str)
    };

    /**
     * 将字符串转换为大整数
     * @param str 要转换的字符串
     * @returns 转换后的大整数，如果无法转换则抛出错误
     */
     static stringToBigInt = (str: string) => {
        if (!/^\d+$/.test(str)) {
            throw new Error("Invalid input: string must represent a non-negative integer.");
        }
        return BigInt(str);
    };

    /**
     * 检查字符串是否为回文字符串（回文字符串是指正反拼写一样的字符串）
     * @param str The string to check
     * @returns True if the string is a palindrome, false otherwise
     */
     static isPalindrome = (str: string) => {
        const reversedStr = str.split('').reverse().join('');
        return str === reversedStr;
    };

    /**
     * 计算字符串中出现最频繁的字符
     * @param str 要计算的字符串
     * @returns 最频繁的字符数组，可能是多个字符
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
     */
     static uniqueCharacters = (str: string) => {
        const charCount: Record<string, number> = {};

        // 计数字符出现次数
        for (const char of str) {
            charCount[char] = (charCount[char] || 0) + 1;
        }

        // 过滤出只出现一次的字符
        return Object.keys(charCount).filter(char => charCount[char] === 1);
    };
}