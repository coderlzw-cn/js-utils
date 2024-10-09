import CurrencyFormatter from "../src/CurrencyFormatter";

describe("CurrencyFormatter 货币格式化器", () => {
    describe("format 方法", () => {
        it("默认应该格式化为美元", () => {
            expect(CurrencyFormatter.format(1234.56)).toBe("$1,234.56");
        });

          it("应该根据自定义选项格式化", () => {
              expect(CurrencyFormatter.format(1234.56, { currency: "EUR", locale: "de-DE" })).toBe("1.234,56 €");
          });

        it("应该遵守最小小数位数设置", () => {
            expect(CurrencyFormatter.format(1234.5, {minimumFractionDigits: 3})).toBe("$1,234.500");
        });

        it("应该遵守最大小数位数设置", () => {
            expect(CurrencyFormatter.format(1234.5678, {maximumFractionDigits: 3})).toBe("$1,234.568");
        });
    });

    describe("formatCNY 方法", () => {
        it("应该格式化为人民币", () => {
            expect(CurrencyFormatter.formatCNY(1234.56)).toBe("¥1,234.56");
        });

        it("应该遵守自定义选项", () => {
            expect(CurrencyFormatter.formatCNY(1234.56, {maximumFractionDigits: 3})).toBe("¥1,234.56");
        });
    });

    describe("formatUSD 方法", () => {
        it("应该格式化为美元", () => {
            expect(CurrencyFormatter.formatUSD(1234.56)).toBe("$1,234.56");
        });

        it("应该遵守自定义选项", () => {
            expect(CurrencyFormatter.formatUSD(1234.56, {locale: "en-GB"})).toBe("US$1,234.56");
        });
    });

    describe("formatEUR 方法", () => {
        it("应该格式化为欧元", () => {
            expect(CurrencyFormatter.formatEUR(1234.56)).toBe("1.234,56 €");
        });

        it("应该遵守自定义选项", () => {
            expect(CurrencyFormatter.formatEUR(1234.56, {locale: "fr-FR"})).toBe("1.234,56 €");
        });
    });

    describe("边缘情况", () => {
        it("应该正确处理零", () => {
            expect(CurrencyFormatter.format(0)).toBe("$0.00");
        });

        it("应该正确处理负数", () => {
            expect(CurrencyFormatter.format(-1234.56)).toBe("-$1,234.56");
        });

        it("应该正确处理非常大的数字", () => {
            expect(CurrencyFormatter.format(1234567890.12)).toBe("$1,234,567,890.12");
        });

        it("应该正确处理非常小的数字", () => {
            expect(CurrencyFormatter.format(0.000001, {minimumFractionDigits: 6})).toBe("$0.000001");
        });
    });
});