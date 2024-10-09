import NumberUtils from "../src/NumberUtils";

describe("NumberUtils", () => {
    describe("formatDecimal", () => {
        it("应该将数字格式化为指定小数位数的字符串", () => {
            expect(NumberUtils.formatDecimal(3.14159, 2)).toBe("3.14");
            expect(NumberUtils.formatDecimal(3.14159, 4)).toBe("3.1416");
            expect(NumberUtils.formatDecimal(3.1, 2)).toBe("3.10");
        });
    });

    describe("formatWithCommas", () => {
        it("应该将数字转换为带千位分隔符的字符串", () => {
            expect(NumberUtils.formatWithCommas(1234567.89)).toBe("1,234,567.89");
            expect(NumberUtils.formatWithCommas(1000000)).toBe("1,000,000");
        });
    });

    describe("round", () => {
        it("应该将数字四舍五入到指定的精度", () => {
            expect(NumberUtils.round(3.14159, 2)).toBe(3.14);
            expect(NumberUtils.round(3.14559, 2)).toBe(3.15);
        });
    });

    describe("isInRange", () => {
        it("应该检查一个数字是否在指定范围内", () => {
            expect(NumberUtils.isInRange(5, 1, 10)).toBe(true);
            expect(NumberUtils.isInRange(15, 1, 10)).toBe(false);
            expect(NumberUtils.isInRange(1, 1, 10)).toBe(true);
            expect(NumberUtils.isInRange(10, 1, 10)).toBe(true);
        });
    });

    describe("randomInt", () => {
        it("应该生成指定范围内的随机整数", () => {
            const result = NumberUtils.randomInt(1, 10);
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(10);
            expect(Number.isInteger(result)).toBe(true);
        });
    });

    describe("factorial", () => {
        it("应该计算数字的阶乘", () => {
            expect(NumberUtils.factorial(5)).toBe(120);
            expect(NumberUtils.factorial(0)).toBe(1);
            expect(NumberUtils.factorial(1)).toBe(1);
        });

        it("应该对非法输入抛出错误", () => {
            expect(() => NumberUtils.factorial(-1)).toThrow("Input must be a non-negative integer");
            expect(() => NumberUtils.factorial(3.5)).toThrow("Input must be a non-negative integer");
        });
    });

    describe("toPercentage", () => {
        it("应该将数字转换为百分比字符串", () => {
            expect(NumberUtils.toPercentage(0.1234, 2)).toBe("12.34%");
            expect(NumberUtils.toPercentage(1.5, 0)).toBe("150%");
        });
    });

    describe("toRadixString", () => {
        it("应该将数字转换为指定基数的字符串", () => {
            expect(NumberUtils.toRadixString(255, 16)).toBe("ff");
            expect(NumberUtils.toRadixString(255, 2)).toBe("11111111");
        });
    });

    describe("gcd", () => {
        it("应该计算两个数的最大公约数", () => {
            expect(NumberUtils.gcd(48, 18)).toBe(6);
            expect(NumberUtils.gcd(100, 75)).toBe(25);
            expect(NumberUtils.gcd(-48, 18)).toBe(6);
            expect(NumberUtils.gcd(0, 5)).toBe(5);
        });
    });
});