import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';
import { terser } from 'rollup-plugin-terser';

export default [{
    input: "src/index.ts", // 入口文件
    output: [{
        file: "dist/index.umd.js", format: "umd", name: "utils", sourcemap: true
    }, {
        dir: "dist/cjs", format: "cjs", sourcemap: true, entryFileNames: "[name].cjs"
    }, {
        dir: "dist/esm", format: "esm", sourcemap: true, entryFileNames: "[name].mjs"
    }],
    plugins: [
        del({ targets: "dist/*" }),
        typescript({
            tsconfigOverride: {
                compilerOptions: {
                    declaration: true,   // 生成类型声明文件
                    declarationMap: true // 生成类型声明文件的 sourcemap
                },
                exclude: ["**/*.test.ts", "**/*.spec.ts"], // 排除测试文件
            },
            useTsconfigDeclarationDir: true // 仅在一个地方生成 .d.ts 文件
        }),
        terser()
    ]
}, {
    input: "src/index.ts", // 入口文件
    output: [{
        dir: "dist/esm", format: "esm", sourcemap: true, entryFileNames: "[name].mjs"
    }],
    plugins: [
        typescript({
            tsconfigOverride: {
                compilerOptions: {
                    declaration: false, // 不生成类型声明文件
                    declarationMap: false
                }
            }
        })
    ]
}];