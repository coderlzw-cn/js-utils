import crypto, {BinaryLike} from "crypto";

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
     * @Deprecated 使用 generateUUIDv4()
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
     * 对于v1和v2，使用了crypto.randomBytes()来模拟节点ID，因为在JavaScript中无法直接获取MAC地址。在实际应用中，你可能需要一个固定的节点ID。
     */

    // 辅助函数：生成指定位数的随机字节
    private static randomBytes(size: number) {
        return crypto.randomBytes(size);
    }

    // 辅助函数：获取当前时间戳（从1582-10-15 00:00:00开始的100纳秒间隔数）
    private static getTimestamp() {
        const EPOCH = 122192928000000000n; // 1582-10-15 00:00:00 到 1970-01-01 00:00:00 的100纳秒数
        const HUNDREDS_OF_NANOSECONDS = 10000n;
        return BigInt(Date.now()) * HUNDREDS_OF_NANOSECONDS + EPOCH;
    }

    // UUID v1: 基于时间戳和节点ID
    static generateUUIDv1() {
        const timestamp = this.getTimestamp();
        const clockSeq = this.randomBytes(2).readUInt16BE(0) & 0x3fff;
        const node = this.randomBytes(6);

        const timeHigh = Number((timestamp >> 32n) & 0xfffffffn);
        const timeMid = Number((timestamp >> 16n) & 0xffffn);
        const timeLow = Number(timestamp & 0xffffn);

        const buf = Buffer.alloc(16);
        buf.writeUInt32BE(timeLow, 0);
        buf.writeUInt16BE(timeMid, 4);
        buf.writeUInt16BE(timeHigh, 6);
        buf.writeUInt16BE(clockSeq, 8);
        node.copy(buf, 10);

        buf[6] = (buf[6] & 0x0f) | 0x10; // 版本 1
        buf[8] = (buf[8] & 0x3f) | 0x80; // 变体

        return buf.toString("hex", 0, 4) + "-" +
            buf.toString("hex", 4, 6) + "-" +
            buf.toString("hex", 6, 8) + "-" +
            buf.toString("hex", 8, 10) + "-" +
            buf.toString("hex", 10, 16);
    }

    // UUID v2: DCE Security
    static generateUUIDv2(localDomain = 0) {
        // v2 实现类似于 v1，但将时间戳低位替换为本地域
        const timestamp = this.getTimestamp();
        const clockSeq = this.randomBytes(2).readUInt16BE(0) & 0x3fff;
        const node = this.randomBytes(6);

        const timeHigh = Number((timestamp >> 32n) & 0xfffffffn);
        const timeMid = Number((timestamp >> 16n) & 0xffffn);

        const buf = Buffer.alloc(16);
        buf.writeUInt32BE(localDomain, 0);
        buf.writeUInt16BE(timeMid, 4);
        buf.writeUInt16BE(timeHigh, 6);
        buf.writeUInt16BE(clockSeq, 8);
        node.copy(buf, 10);

        buf[6] = (buf[6] & 0x0f) | 0x20; // 版本 2
        buf[8] = (buf[8] & 0x3f) | 0x80; // 变体

        return buf.toString("hex", 0, 4) + "-" +
            buf.toString("hex", 4, 6) + "-" +
            buf.toString("hex", 6, 8) + "-" +
            buf.toString("hex", 8, 10) + "-" +
            buf.toString("hex", 10, 16);
    }

    // UUID v3: 基于名字的MD5哈希
    static generateUUIDv3(namespace: BinaryLike, name: BinaryLike) {
        const hash = crypto.createHash("md5").update(namespace).update(name).digest();

        hash[6] = (hash[6] & 0x0f) | 0x30; // 版本 3
        hash[8] = (hash[8] & 0x3f) | 0x80; // 变体

        return hash.toString("hex", 0, 4) + "-" +
            hash.toString("hex", 4, 6) + "-" +
            hash.toString("hex", 6, 8) + "-" +
            hash.toString("hex", 8, 10) + "-" +
            hash.toString("hex", 10, 16);
    }

    // UUID v4: 完全随机
    static generateUUIDv4() {
        const bytes = this.randomBytes(16);

        bytes[6] = (bytes[6] & 0x0f) | 0x40; // 版本 4
        bytes[8] = (bytes[8] & 0x3f) | 0x80; // 变体

        return bytes.toString("hex", 0, 4) + "-" +
            bytes.toString("hex", 4, 6) + "-" +
            bytes.toString("hex", 6, 8) + "-" +
            bytes.toString("hex", 8, 10) + "-" +
            bytes.toString("hex", 10, 16);
    }

    // UUID v5: 基于名字的SHA-1哈希
    static generateUUIDv5(namespace: BinaryLike, name: BinaryLike) {
        const hash = crypto.createHash("sha1").update(namespace).update(name).digest();

        hash[6] = (hash[6] & 0x0f) | 0x50; // 版本 5
        hash[8] = (hash[8] & 0x3f) | 0x80; // 变体

        return hash.toString("hex", 0, 4) + "-" +
            hash.toString("hex", 4, 6) + "-" +
            hash.toString("hex", 6, 8) + "-" +
            hash.toString("hex", 8, 10) + "-" +
            hash.toString("hex", 10, 16);
    }

    // UUID v6: 可排序的时间戳
    static generateUUIDv6() {
        const timestamp = this.getTimestamp();
        const clockSeq = this.randomBytes(2).readUInt16BE(0) & 0x3fff;
        const node = this.randomBytes(6);

        const timeHigh = Number((timestamp >> 28n) & 0xfffffffn);
        const timeMid = Number((timestamp >> 12n) & 0xffffn);
        const timeLow = Number(timestamp & 0xfffn);

        const buf = Buffer.alloc(16);
        buf.writeUInt32BE(timeHigh, 0);
        buf.writeUInt16BE(timeMid, 4);
        buf.writeUInt16BE((timeLow << 4) | 0x6, 6); // 版本 6
        buf.writeUInt16BE(clockSeq, 8);
        node.copy(buf, 10);

        buf[8] = (buf[8] & 0x3f) | 0x80; // 变体

        return buf.toString("hex", 0, 4) + "-" +
            buf.toString("hex", 4, 6) + "-" +
            buf.toString("hex", 6, 8) + "-" +
            buf.toString("hex", 8, 10) + "-" +
            buf.toString("hex", 10, 16);
    }

}