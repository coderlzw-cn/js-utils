import fs from "node:fs";
import path from "node:path";

interface DirectoryItem {
    name: string;
    dir: boolean;
    size?: number;       // 文件大小（如果是文件）
    count?: number;      // 文件夹下的文件数量（如果是文件夹）
    children?: DirectoryItem[]; // 子文件/文件夹（如果是文件夹）
}

/**
 * 检查当前路径是否需要排除
 * @param {string} currentPath - 当前文件或文件夹的完整路径
 * @param {string | RegExp} exclude - 要排除的文件或文件夹名，可以是字符串或正则表达式
 * @returns {boolean} - 是否需要排除
 */
function shouldExclude(currentPath: string, exclude: string | RegExp): boolean {
    const relativePath = path.relative(process.cwd(), currentPath); // 获取相对路径
    return (typeof exclude === "string" && relativePath.includes(exclude)) ||
        (exclude instanceof RegExp && exclude.test(relativePath));
}

/**
 * 递归读取文件夹结构并返回对象
 * @param {string} dir - 目标文件夹路径
 * @param {string | RegExp} exclude - 要排除的文件或文件夹名，可以是字符串或正则表达式
 * @returns {DirectoryItem[]} - 文件夹结构对象数组
 */
function readDirectory(dir: string, exclude?: string | RegExp): DirectoryItem[] {
    const items = fs.readdirSync(dir); // 读取文件夹内容
    const result: DirectoryItem[] = []; // 存储文件夹结构的数组

    items.forEach((item) => {
        const fullPath = path.join(dir, item); // 获取完整路径
        const isDirectory = fs.statSync(fullPath).isDirectory(); // 判断是否为文件夹

        // 检查是否需要排除当前项
        if (shouldExclude(fullPath, exclude)) {
            return; // 如果匹配排除条件，则跳过
        }

        // 构建当前文件/文件夹对象
        const currentItem: DirectoryItem = {
            name: item,
            dir: isDirectory,
            ...(isDirectory ? {} : {size: fs.statSync(fullPath).size}) // 如果是文件，添加大小
        };

        // 如果是文件夹，则递归读取并检查是否有有效的子项
        if (isDirectory) {
            const children = readDirectory(fullPath, exclude); // 递归读取子文件夹
            // 仅当有有效的子项时，才添加 count 和 children 属性
            if (children.length > 0) {
                currentItem.count = children.length; // 子项数量
                currentItem.children = children; // 添加有效子项
            }
        }

        result.push(currentItem); // 添加到结果数组中
    });

    return result; // 返回文件夹结构数组
}

// 使用示例
const targetDir = "./your-directory-path"; // 替换为您的目标文件夹路径
const excludePattern = /ccc\/bbb/; // 正则表达式示例，排除 ccc/bbb 文件夹
const directoryStructure = readDirectory(targetDir, excludePattern);
console.log(JSON.stringify(directoryStructure, null, 2)); // 打印结构

export default {
    readDirectory
};å