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
``


## 使用

```ts
import { Base64Utils } from '@coderlzw/utils';
Base64Utils.encode("Hello，世界"); // "SGVsbG/vvIzkuJbnlYw="
Base64Utils.decode("SGVsbG/vvIzkuJbnlYw="); // "Hello，世界"
```