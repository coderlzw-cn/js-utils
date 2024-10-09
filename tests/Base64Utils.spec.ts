import Base64Utils from "../src/Base64Utils";

describe("Base64Utils", () => {

    test("encode 应该正确编码字符串为 Base64（Node 和浏览器）", () => {
        const value = "Hello，世界";
        const expectedBase64 = "SGVsbG/vvIzkuJbnlYw=";
        expect(Base64Utils.encode(value)).toBe(expectedBase64);
    });

    test("decode 应该正确解码 Base64 字符串（Node 和浏览器）", () => {
        const base64Str = "SGVsbG/vvIzkuJbnlYw=";
        const expectedValue = "Hello，世界";
        expect(Base64Utils.decode(base64Str)).toBe(expectedValue);
    });

    test("isBase64 应该返回 true 对于有效的 Base64 字符串", () => {
        const validBase64 = "iVBORw0KGgoAAAANSUhEUgAABQAAAALQAQMAAAD1s08VAAAAA1BMVEX/AAAZ4gk3AAAAh0lEQVR42u3BMQEAAADCoPVPbQlPoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4GsTfAAGc95RKAAAAAElFTkSuQmCC";
        const validBase64WithMime = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAAAALQAQMAAAD1s08VAAAAA1BMVEX/AAAZ4gk3AAAAh0lEQVR42u3BMQEAAADCoPVPbQlPoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4GsTfAAGc95RKAAAAAElFTkSuQmCC";

        expect(Base64Utils.isBase64(validBase64)).toBe(true);
        expect(Base64Utils.isBase64(validBase64WithMime)).toBe(false);
        expect(Base64Utils.isBase64(validBase64WithMime, {allowMime: true})).toBe(true);
        expect(Base64Utils.isBase64(validBase64, {mimeRequired: true})).toBe(false);
        expect(Base64Utils.isBase64(validBase64WithMime, {mimeRequired: true})).toBe(true);
    });

    test("isBase64 应该返回 false 对于无效的 Base64 字符串", () => {
        expect(Base64Utils.isBase64("1342234")).toBe(false);
        expect(Base64Utils.isBase64("afQ$%rfew")).toBe(false);
        expect(Base64Utils.isBase64("dfasdfr342")).toBe(false);
    });

    test("isBase64 应该正确处理 Base64 填充符", () => {
        expect(Base64Utils.isBase64("uuLMhh==")).toBe(true);
        expect(Base64Utils.isBase64("uuLMhh")).toBe(false);
        expect(Base64Utils.isBase64("uuLMhh", {paddingRequired: false})).toBe(true);
    });

    test("isBase64 应该根据选项处理空字符串", () => {
        expect(Base64Utils.isBase64("")).toBe(true); // 默认允许空字符串
        expect(Base64Utils.isBase64("", {allowEmpty: false})).toBe(false);
    });

    test("removeBase64Padding 应该移除 Base64 字符串的填充符", () => {
        const base64WithPadding = "SGVsbG8=";
        const base64WithoutPadding = "SGVsbG8";
        expect(Base64Utils.removeBase64Padding(base64WithPadding)).toBe(base64WithoutPadding);
    });

    test("addBase64Padding 应该为 Base64 字符串添加填充符", () => {
        const base64WithoutPadding = "SGVsbG8";
        const base64WithPadding = "SGVsbG8=";
        expect(Base64Utils.addBase64Padding(base64WithoutPadding)).toBe(base64WithPadding);
    });

    test("urlSafeToBase64 应该将 URL 安全的 Base64 转换为标准 Base64", () => {
        const urlSafeBase64 = "SGVsbG8-";
        const standardBase64 = "SGVsbG8+";
        expect(Base64Utils.urlSafeToBase64(urlSafeBase64)).toBe(standardBase64);
    });

    test("base64ToUrlSafe 应该将标准 Base64 转换为 URL 安全的 Base64", () => {
        const standardBase64 = "SGVsbG8+";
        const urlSafeBase64 = "SGVsbG8-";
        expect(Base64Utils.base64ToUrlSafe(standardBase64)).toBe(urlSafeBase64);
    });
});