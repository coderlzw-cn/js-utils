/**
 * 随机数和 UUID 生成工具类
 * 提供了生成指定长度的随机数、随机字符串和不同版本 UUID 的方法
 */
export default class RandomGenerator {
    private static readonly CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    /**
     * 生成指定长度的随机数字字符串
     * @param length 要生成的随机数长度
     * @returns 指定长度的随机数字字符串
     * @throws 如果长度小于 1，将抛出错误
     */
    static generateRandomNumber(length: number): number {
        if (length < 1 || length > 15) {
            throw new Error("长度必须在 1 到 15 之间");
        }
        const min = Math.pow(10, length - 1);
        const max = Math.pow(10, length) - 1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * 生成指定范围内的随机数
     * @param min 范围的最小值（包含）
     * @param max 范围的最大值（包含）
     * @param options 可选配置项
     * @returns 生成的随机数
     *
     * @example
     * // 生成 1 到 10 之间的随机整数
     * NumberUtils.generateRandomNumber(1, 10, { integer: true });
     * // 可能输出：5
     *
     * // 生成 0 到 1 之间的随机小数
     * NumberUtils.generateRandomNumber(0, 1);
     * // 可能输出：0.7231242141
     *
     * // 生成 1 到 10 之间的随机小数，保留 2 位小数
     * NumberUtils.generateRandomNumber(1, 10, { decimalPlaces: 2 });
     * // 可能输出：7.42
     */
    static generateRandomNumberBetween(min: number, max: number, options?: { integer?: boolean; decimalPlaces?: number; }): number {
        if (min > max) {
            throw new Error("最小值不能大于最大值");
        }

        let random: number;
        if (options?.integer) {
            // 生成整数
            random = Math.floor(Math.random() * (max - min + 1)) + min;
        } else {
            // 生成小数
            random = Math.random() * (max - min) + min;
        }

        if (options?.decimalPlaces !== undefined) {
            // 如果指定了小数位数，进行四舍五入
            return Number(random.toFixed(options.decimalPlaces));
        }

        return random;
    }

    /**
     * 生成指定长度的随机字母数字字符串
     * @param length 要生成的随机字符串长度
     * @returns 指定长度的随机字母数字字符串
     * @throws 如果长度小于 1，将抛出错误
     */
    static generateRandomString(length: number): string {
        if (length < 1) {
            throw new Error("长度必须大于 0");
        }
        return Array.from(
            {length},
            () => this.CHARS[Math.floor(Math.random() * this.CHARS.length)]
        ).join("");
    }

    /**
     * 生成标准的 UUID (版本 4)
     * @returns 生成的 UUID 字符串
     */
    static generateUUID(): string {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * 生成版本 6 UUID (基于时间排序)
     * @returns 生成的版本 6 UUID 字符串
     */
    static generateUUIDv6(): string {
        const now = BigInt(Date.now());
        const timeHigh = Number((now >> BigInt(28)) & BigInt(0xfffff));
        const timeMid = Number((now >> BigInt(12)) & BigInt(0xffff));
        const timeLow = Number(now & BigInt(0xfff));
        const clockSeq = Math.floor(Math.random() * 16384);
        const node = Array.from({length: 6}, () => Math.floor(Math.random() * 256));

        const uuidBytes = new Uint8Array(16);
        const dataView = new DataView(uuidBytes.buffer);

        // time_high
        dataView.setUint32(0, timeHigh);
        // time_mid
        dataView.setUint16(4, timeMid);
        // time_low and version
        dataView.setUint16(6, timeLow | 0x6000);
        // clock_seq_hi_and_reserved
        dataView.setUint8(8, (clockSeq >> 8) | 0x80);
        // clock_seq_low
        dataView.setUint8(9, clockSeq & 0xff);
        // node
        node.forEach((b, i) => dataView.setUint8(10 + i, b));

        const hex = Array.from(uuidBytes, (b) => b.toString(16).padStart(2, "0")).join("");
        return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    }
}