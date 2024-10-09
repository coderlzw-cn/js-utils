import ByteConverter, { ByteUnit } from "../src/ByteConverter";

describe("ByteConverter", () => {
    describe("convert", () => {
        it("应该正确转换字节单位", () => {
            expect(ByteConverter.convert(1, ByteUnit.Gigabyte, ByteUnit.Megabyte)).toBe(1024);
            expect(ByteConverter.convert(1024, ByteUnit.Kilobyte, ByteUnit.Megabyte)).toBe(1);
            expect(ByteConverter.convert(1, ByteUnit.Terabyte, ByteUnit.Gigabyte)).toBe(1024);
        });

        it("应该正确处理比特单位", () => {
            expect(ByteConverter.convert(8, ByteUnit.Bit, ByteUnit.Byte)).toBe(1);
            expect(ByteConverter.convert(1, ByteUnit.Byte, ByteUnit.Bit)).toBe(8);
        });

        it("应该使用自定义基数进行转换", () => {
            expect(ByteConverter.convert(1, ByteUnit.Gigabyte, ByteUnit.Megabyte, 1000)).toBe(1000);
            expect(ByteConverter.convert(1000, ByteUnit.Kilobyte, ByteUnit.Megabyte, 1000)).toBe(1);
        });
    });

    describe("formatBytes", () => {
        it("应该正确格式化字节大小", () => {
            expect(ByteConverter.formatBytes(0)).toBe("0 B");
            expect(ByteConverter.formatBytes(1023)).toBe("1023.00 B");
            expect(ByteConverter.formatBytes(1024)).toBe("1.00 KB");
            expect(ByteConverter.formatBytes(1234567890)).toBe("1.15 GB");
        });

        it("应该正确处理小于 1 字节的值", () => {
            expect(ByteConverter.formatBytes(0.5)).toBe("4.00 bits");
            expect(ByteConverter.formatBytes(0.125)).toBe("1.00 bit");
            expect(ByteConverter.formatBytes(0.1, 3)).toBe("0.800 bits");
        });

        it("应该使用指定的小数位数", () => {
            expect(ByteConverter.formatBytes(1234567890, 3)).toBe("1.150 GB");
            expect(ByteConverter.formatBytes(1234567890, 0)).toBe("1 GB");
        });

        it("应该使用自定义基数进行格式化", () => {
            expect(ByteConverter.formatBytes(1000000, 2, 1000)).toBe("1.00 MB");
            expect(ByteConverter.formatBytes(1234567890, 2, 1000)).toBe("1.23 GB");
        });

        it("应该处理负数", () => {
            expect(ByteConverter.formatBytes(-0.5)).toBe("-4.00 bits");
            expect(ByteConverter.formatBytes(-1024)).toBe("-1.00 KB");
        });
    });
});