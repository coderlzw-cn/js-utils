/**
 * 货币格式化选项接口
 * @interface CurrencyOptions
 * @property {string} [locale] - 地区设置，例如 'en-US', 'zh-CN', 'de-DE'
 * @property {string} [currency] - 货币代码，例如 'USD', 'CNY', 'EUR'
 * @property {number} [minimumFractionDigits] - 最小小数位数
 * @property {number} [maximumFractionDigits] - 最大小数位数
 */
export type CurrencyOptions = {
    locale?: string;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
};

/**
 * 货币格式化工具类
 *
 * 提供了将数字转换为各种货币格式的方法
 *
 * @example
 * // 基本使用
 * CurrencyFormatter.format(1234.56); // "$1,234.56"
 *
 * // 自定义选项
 * CurrencyFormatter.format(1234.56, { currency: 'EUR', locale: 'de-DE' }); // "1.234,56 €"
 *
 * // 使用预设方法
 * CurrencyFormatter.formatCNY(1234.56); // "¥1,234.56"
 * CurrencyFormatter.formatUSD(1234.56); // "$1,234.56"
 * CurrencyFormatter.formatEUR(1234.56); // "1.234,56 €"
 *
 * // 自定义小数位
 * CurrencyFormatter.format(1234.5678, { maximumFractionDigits: 3 }); // "$1,234.568"
 */
export default class CurrencyFormatter {
    /**
     * 默认格式化选项
     * @private
     */
    private static defaultOptions: CurrencyOptions = {
        locale: "en-US",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };

    /**
     * 将数字格式化为货币字符串
     * @param {number} amount - 要格式化的金额
     * @param {CurrencyOptions} [options] - 格式化选项
     * @returns {string} 格式化后的货币字符串
     */
    static format(amount: number, options: CurrencyOptions = {}): string {
        const mergedOptions = {...this.defaultOptions, ...options};
        let {maximumFractionDigits = 0} = mergedOptions;
        const {locale, currency, minimumFractionDigits = 0} = mergedOptions;
        if (maximumFractionDigits < minimumFractionDigits) {
            maximumFractionDigits = minimumFractionDigits;
        }

         const formatted = new Intl.NumberFormat(locale, {
            style: "currency",
            currency,
            minimumFractionDigits,
            maximumFractionDigits
        }).format(amount);

        return formatted.replace(/\u00A0/g, " ");
    }

    /**
     * 将数字格式化为人民币（CNY）字符串
     * @param {number} amount - 要格式化的金额
     * @param {Omit<CurrencyOptions, "currency">} [options] - 格式化选项（不包括货币选项）
     * @returns {string} 格式化后的人民币字符串
     */
    static formatCNY(amount: number, options: Omit<CurrencyOptions, "currency"> = {}): string {
        const formatted = this.format(amount, {...options, currency: "CNY", locale: "zh-CN"});
        return formatted.replace(/\u00A0/g, " ");
    }

    /**
     * 将数字格式化为美元（USD）字符串
     * @param {number} amount - 要格式化的金额
     * @param {Omit<CurrencyOptions, "currency">} [options] - 格式化选项（不包括货币选项）
     * @returns {string} 格式化后的美元字符串
     */
    static formatUSD(amount: number, options: Omit<CurrencyOptions, "currency"> = {}): string {
        const formatted = this.format(amount, {...options, currency: "USD"});
        return formatted.replace(/\u00A0/g, " ");
    }

    /**
     * 将数字格式化为欧元（EUR）字符串
     * @param {number} amount - 要格式化的金额
     * @param {Omit<CurrencyOptions, "currency">} [options] - 格式化选项（不包括货币选项）
     * @returns {string} 格式化后的欧元字符串
     */
    static formatEUR(amount: number, options: Omit<CurrencyOptions, "currency"> = {}): string {
        const formatted = this.format(amount, {...options, currency: "EUR", locale: "de-DE"});
        // 将 NBSP 替换为普通空格
        return formatted.replace(/\u00A0/g, " ");
    }

    // 可以继续添加其他货币的格式化方法...
}