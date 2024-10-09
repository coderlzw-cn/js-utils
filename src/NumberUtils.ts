/**
 * 数字工具类
 * 提供了一系列用于数字操作和格式化的静态方法
 */
export default class NumberUtils {
    /**
     * 将数字格式化为指定小数位数的字符串
     * @param num 要格式化的数字
     * @param decimalPlaces 小数位数
     * @returns 格式化后的字符串
     *
     * @example
     * NumberUtils.formatDecimal(3.14159, 2); // "3.14"
     * NumberUtils.formatDecimal(3.14159, 4); // "3.1416"
     * NumberUtils.formatDecimal(3.1, 2); // "3.10"
     */
    static formatDecimal(num: number, decimalPlaces: number): string {
        return num.toFixed(decimalPlaces);
    }

    /**
     * 将数字转换为带千位分隔符的字符串
     * @param num 要格式化的数字
     * @returns 带千位分隔符的字符串
     *
     * @example
     * NumberUtils.formatWithCommas(1234567.89); // "1,234,567.89"
     * NumberUtils.formatWithCommas(1000000); // "1,000,000"
     */
    static formatWithCommas(num: number): string {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    /**
     * 将数字四舍五入到指定的精度
     * @param num 要四舍五入的数字
     * @param precision 精度（小数位数）
     * @returns 四舍五入后的数字
     *
     * @example
     * NumberUtils.round(3.14159, 2); // 3.14
     * NumberUtils.round(3.14559, 2); // 3.15
     */
    static round(num: number, precision: number): number {
        const factor = Math.pow(10, precision);
        return Math.round(num * factor) / factor;
    }

    /**
     * 检查一个数字是否在指定范围内
     * @param num 要检查的数字
     * @param min 范围的最小值
     * @param max 范围的最大值
     * @returns 如果数字在范围内则返回 true，否则返回 false
     *
     * @example
     * NumberUtils.isInRange(5, 1, 10); // true
     * NumberUtils.isInRange(15, 1, 10); // false
     */
    static isInRange(num: number, min: number, max: number): boolean {
        return num >= min && num <= max;
    }

    /**
     * 生成指定范围内的随机整数
     * @param min 范围的最小值（包含）
     * @param max 范围的最大值（包含）
     * @returns 生成的随机整数
     *
     * @example
     * NumberUtils.randomInt(1, 10); // 可能返回 1 到 10 之间的任意整数
     */
    static randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * 计算数字的阶乘
     * @param num 要计算阶乘的非负整数
     * @returns 阶乘结果
     * @throws 如果输入的不是非负整数，则抛出错误
     *
     * @example
     * NumberUtils.factorial(5); // 120
     * NumberUtils.factorial(0); // 1
     */
    static factorial(num: number): number {
        if (num < 0 || !Number.isInteger(num)) {
            throw new Error("Input must be a non-negative integer");
        }
        if (num === 0 || num === 1) {
            return 1;
        }
        return num * this.factorial(num - 1);
    }

    /**
     * 将数字转换为百分比字符串
     * @param num 要转换的数字
     * @param decimalPlaces 小数位数
     * @returns 百分比字符串
     *
     * @example
     * NumberUtils.toPercentage(0.1234, 2); // "12.34%"
     * NumberUtils.toPercentage(1.5, 0); // "150%"
     */
    static toPercentage(num: number, decimalPlaces: number): string {
        return (num * 100).toFixed(decimalPlaces) + "%";
    }

    /**
     * 将数字转换为指定基数的字符串
     * @param num 要转换的数字
     * @param radix 基数（2-36）
     * @returns 转换后的字符串
     *
     * @example
     * NumberUtils.toRadixString(255, 16); // "ff"
     * NumberUtils.toRadixString(255, 2); // "11111111"
     */
    static toRadixString(num: number, radix: number): string {
        return num.toString(radix);
    }

    /**
     * 计算两个数的最大公约数
     * @param a 第一个数
     * @param b 第二个数
     * @returns 最大公约数
     *
     * @example
     * NumberUtils.gcd(48, 18); // 6
     * NumberUtils.gcd(100, 75); // 25
     */
    static gcd(a: number, b: number): number {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}