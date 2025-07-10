// import-script.mjs
import fs from 'fs';
import path from 'path';

// 定义JSON文件路径和输出目录
const jsonFilePath = path.resolve('my_blog_data.json');
const outputDir = path.resolve('src/content/blog');

// --- 主函数 ---
function runImport() {
    // 确保输出目录存在
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`创建目录: ${outputDir}`);
    }

    // 读取JSON文件
    let data;
    try {
        const fileContent = fs.readFileSync(jsonFilePath, 'utf-8');
        data = JSON.parse(fileContent);
    } catch (error) {
        console.error('无法读取或解析JSON文件:', error);
        return;
    }

    // 检查数据结构
    if (!data || !data.root || !Array.isArray(data.root.blog)) {
        console.error('JSON数据格式不正确，期望的结构是 { root: { blog: [...] } }');
        return;
    }

    const posts = data.root.blog;
    console.log(`找到 ${posts.length} 篇文章，开始转换...`);

    // 遍历每一篇文章并生成Markdown文件
    posts.forEach(post => {
        // 1. 数据提取和格式化
        const id = post.id;
        const title = post.title;
        const author = post.userNickname;
        // 将毫秒级时间戳转换为 ISO 8601 日期字符串 (YYYY-MM-DD)
        const publishDate = new Date(parseInt(post.publishTime, 10)).toISOString();
        const category = post.className;
        const isPublished = post.ispublished === '1';
        const content = post.content; // 内容已经是HTML格式

        // 2. 构建Markdown文件的 "frontmatter" (元数据)
        // 这是Astro识别和处理文章信息的关键部分
        const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
author: "${author}"
publishDate: ${publishDate}
category: "${category}"
isPublished: ${isPublished}
---
`;

        // 3. 组合 frontmatter 和文章内容
        // 由于您的内容已经是HTML，可以直接附加在后面
        const fileContent = frontmatter + '\n' + content;

        // 4. 定义输出文件名
        // 使用文章的ID作为文件名，保证唯一性
        const outputFilePath = path.join(outputDir, `${id}.md`);

        // 5. 写入文件
        fs.writeFileSync(outputFilePath, fileContent, 'utf-8');
        console.log(`成功创建文件: ${outputFilePath}`);
    });

    console.log('\n所有文章导入完成！');
}

// --- 执行脚本 ---
runImport();