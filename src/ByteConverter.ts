/**
 * 字节单位枚举
 * 定义了从比特（bit）到尧字节（YB）的单位
 */
export enum ByteUnit {
    Bit = "bit",
    Byte = "B",
    Kilobyte = "KB",
    Megabyte = "MB",
    Gigabyte = "GB",
    Terabyte = "TB",
    Petabyte = "PB",
    Exabyte = "EB",
    Zettabyte = "ZB",
    Yottabyte = "YB"
}

/**
 * 字节转换工具类
 * 提供了在不同字节单位之间转换和格式化字节大小的方法
 */
export default class ByteConverter {
    /** 默认基数，用于字节单位之间的转换 */
    private static readonly DEFAULT_BASE = 1024;

    /**
     * 获取指定单位和基数的乘数
     * @param unit 字节单位
     * @param base 基数（默认为 1024）
     * @returns 对应的乘数
     * @private
     */
    private static getMultiplier(unit: ByteUnit, base: number): number {
        const units = Object.values(ByteUnit);
        const power = units.indexOf(unit) - 1; // -1 because Bit is at index 0
        return unit === ByteUnit.Bit ? 1 / 8 : Math.pow(base, power);
    }

    /**
     * 在不同字节单位之间转换数值
     * @param value 要转换的数值
     * @param fromUnit 源单位
     * @param toUnit 目标单位
     * @param base 转换基数（默认为 1024）
     * @returns 转换后的数值
     */
    static convert(value: number, fromUnit: ByteUnit, toUnit: ByteUnit, base: number = this.DEFAULT_BASE): number {
        const fromMultiplier = this.getMultiplier(fromUnit, base);
        const toMultiplier = this.getMultiplier(toUnit, base);
        return (value * fromMultiplier) / toMultiplier;
    }

    /**
     * 将字节数格式化为人类可读的字符串
     * @param bytes 字节数
     * @param decimals 小数位数（默认为 2）
     * @param base 转换基数（默认为 1024）
     * @returns 格式化后的字符串
     */
    static formatBytes(bytes: number, decimals: number = 2, base: number = this.DEFAULT_BASE): string {
        if (bytes === 0) return "0 B";

        const dm = decimals < 0 ? 0 : decimals;
        const sizes = Object.values(ByteUnit);

        // 处理小于 1 字节的情况
        if (Math.abs(bytes) < 1) {
            const bits = bytes * 8;
            return bits.toFixed(dm) + " " + ByteUnit.Bit + (Math.abs(bits) === 1 ? "" : "s");
        }

        const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(base));

        const value = bytes / Math.pow(base, i);
        const formattedValue = value.toFixed(dm);

        return formattedValue + " " + sizes[Math.min(i + 1, sizes.length - 1)]; // +1 because we skip Bit
    }
}