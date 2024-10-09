import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import fs from "node:fs";
import path from "node:path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
// 递归获取 src 目录下的所有 TypeScript 文件
function getEntries(dir) {
    let entries = [];
    const files = fs.readdirSync(dir, {withFileTypes: true});

    for (const file of files) {
        const filePath = path.join(dir, file.name);
        if (file.isDirectory()) {
            entries = entries.concat(getEntries(filePath));
        } else if (file.name.endsWith(".ts")) {
            entries.push(filePath);
        }
    }

    return entries;
}

export default [
    {
        input: "src/index.ts",
        output: {
            file: "dist/index.umd.js",
            format: "umd",
            name: "utils",
            sourcemap: true
        },
        plugins: [
            del({targets: "dist/*"}),
            nodeResolve(),
            typescript()
        ]
    },
    {
        input: getEntries("src"),
        output: {
            dir: "dist/esm",
            format: "esm",
            sourcemap: true,
            entryFileNames: "[name].mjs", // 将入口文件后缀改为 .mjs
            chunkFileNames: "[name]-[hash].mjs", // 将代码分割后的文件后缀也改为 .mjs
            preserveModules: true,
            preserveModulesRoot: "src"
        },
        external: ["tslib"],
        plugins: [
            nodeResolve(),
            typescript({
                tsconfig: "./tsconfig.json",
                declaration: false,
                declarationDir: null,
                outDir: "dist/esm"
            })
        ]
    },
    {
        input: getEntries("src"),
        output: {
            dir: "dist/cjs",
            format: "cjs",
            sourcemap: true,
            entryFileNames: "[name].cjs",
            chunkFileNames: "[name]-[hash].cjs",
            preserveModules: true,
            preserveModulesRoot: "src",
            exports: "named"
        },
        external: ["tslib"],
        plugins: [
            nodeResolve(),
            typescript({
                tsconfig: "./tsconfig.json",
                declaration: false,
                declarationDir: null,
                outDir: "dist/cjs"
            })
        ]
    }
];