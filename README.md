# @coderlzw/utils

`@coderlzw/utils` 是一个轻量级的 JavaScript 实用工具库，提供了一系列常用的辅助函数，旨在简化日常开发中的常见任务。

## 特性

- 🚀 高性能：经过优化的函数实现，确保最佳性能
- 🧩 模块化：可以单独引入需要的函数，减少打包体积
- 📦 全面兼容：支持在 Node.js 和浏览器环境中使用
- 🔧 类型安全：使用 TypeScript 编写，提供完整的类型定义
- 📚 文档完善：详细的 API 文档和使用示例

## 安装

```bash
npm i @coderlzw/utils

# or yarn
yarn add @coderlzw/utils

# or pnpm
pnpm add @coderlzw/utils
```

## Base64Utils API 文档

Base64Utils 类提供了一系列用于处理 Base64 编码的实用方法。

### 方法

#### encode(val: string): string

将字符串或二进制值转换为 Base64 编码。

示例:

```ts
const value = "Hello，世界";
const encoded = Base64Utils.encode(value); // "SGVsbG/vvIzkuJbnlYw="*
```

### decode(val: string): string

将 Base64 编码的字符串解码为原始字符串。

示例:

```ts
const decoded = Base64Utils.decode("SGVsbG/vvIzkuJbnlYw="); // "Hello，世界"
```

### isBase64(v: string, opts?: IsBase64Options): boolean

判断给定的字符串是否为有效的 Base64 编码。

- 参数:
    - v: 要检查的字符串
    - opts: 可选的配置选项

返回值: 如果字符串是有效的 Base64 编码则返回 `true`，否则返回 `false`

示例:

```ts
console.log(Base64Utils.isBase64("uuLMhh==")); // true

console.log(Base64Utils.isBase64("uuLMhh")); // false

console.log(Base64Utils.isBase64("uuLMhh", {paddingRequired: false})); // true
```

### removeBase64Padding(base64Str: string): string

移除 Base64 字符串末尾的填充字符 =。

- 参数: base64Str: Base64 编码的字符串
- 返回值: 返回移除填充后的 Base64 字符串

### addBase64Padding(base64Str: string): string

为 Base64 字符串添加必要的填充字符 =。

- 参数: base64Str: Base64 编码的字符串
- 返回值: 返回添加填充后的 Base64 字符串

### urlSafeToBase64(urlSafeStr: string): string

将 URL 安全的 Base64 字符串转换为标准 Base64 字符串。

- 参数: urlSafeStr: URL 安全的 Base64 字符串
- 返回值:返回标准 Base64 字符串

### base64ToUrlSafe(base64Str: string): string

将标准 Base64 字符串转换为 URL 安全的 Base64 字符串。

- 参数: base64Str: 标准 Base64 字符串
- 返回值: 返回 URL 安全的 Base64 字符串

## 接口

### IsBase64Options

用于 isBase64 方法的配置选项。

属性:

allowEmpty?: boolean: 是否允许空字符串

mimeRequired?: boolean: 是否要求包含 MIME 类型

allowMime?: boolean: 是否允许包含 MIME 类型

paddingRequired?: boolean: 是否要求填充字符

 