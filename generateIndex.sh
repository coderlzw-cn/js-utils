#!/bin/bash

echo 👌
## 指定源目录和目标 index.ts 文件的路径
#SRC_DIR="./src"
#INDEX_PATH="$SRC_DIR/index.ts"
#
## 清空 index.ts 文件
#echo "" > "$INDEX_PATH"
#
## 获取所有 TypeScript 文件并生成 export 语句
#find "$SRC_DIR" -type f -name "*.ts" ! -name "index.ts" | while read -r file; do
#    # 生成相对路径
#    relative_path="${file#./src/}" # 去掉前缀 ./src/
#    # 去掉文件扩展名
#    file_name=$(basename "$file" .ts)
#    # 写入 export 语句
#    echo "export { default as $file_name } from \"./${relative_path%.ts}\";" >> "$INDEX_PATH"
#done
#
#echo "Generated $INDEX_PATH"