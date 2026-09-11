#!/usr/bin/env node
/**
 * 新文章脚手架生成脚本
 * 用法: node scripts/new-post.mjs <category> <slug> [标题]
 * 示例: node scripts/new-post.mjs networking arp-icmp-basics "ARP 与 ICMP 学习笔记"
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const [category, slug, titleArg] = process.argv.slice(2);
if (!category || !slug) {
  console.error("用法: node scripts/new-post.mjs <category> <slug> [标题]");
  process.exit(1);
}

if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error("slug 只能包含小写字母、数字和连字符");
  process.exit(1);
}

const title = titleArg ?? slug;
const today = new Date().toISOString().slice(0, 10);

const template = `---
title: "${title}"
slug: "${slug}"
date: "${today}"
updated: "${today}"
category: "${category}"
subcategory: ""
tags: []
difficulty: "beginner"
status: "draft"
quality_score: 0
source: ""
author: "User"
summary: ""
cover_image: ""
---

> 一句话说明本文解决的问题或学习目标。

## 学习目标

阅读本文后，你应该能够：

- 理解……
- 掌握……
- 完成……

## 问题背景

说明为什么需要学习这个主题，以及实际应用场景。

## 核心概念

用简单、准确的语言解释核心知识。

## 工作流程

\`\`\`mermaid
flowchart TD
    A[开始] --> B[分析问题]
    B --> C[执行操作]
    C --> D[验证结果]
    D --> E[完成]
\`\`\`

## 详细过程

分步骤解释技术原理、操作流程和注意事项。

## 示例代码

\`\`\`text
在这里放置经过验证的代码或命令
\`\`\`

## 实验或实践

### 实验环境

| 项目 | 内容 |
|---|---|
| 操作系统 | xxx |
| 软件版本 | xxx |
| 硬件环境 | xxx |

### 实验步骤

1. 第一步
2. 第二步
3. 第三步

### 实验结果

说明实际观察到的现象和结果。

## 常见问题

### 问题一：为什么会出现这种现象？

解释原因并给出解决方法。

## 易错点

- 易错点一
- 易错点二
- 易错点三

## 总结

总结本文最重要的知识点。

## 延伸阅读

- [相关文章一](链接)

## 内容审核信息

- 内容质量评分：0/25
- 事实检查状态：未检查
- 是否需要人工审核：是
- 自动生成时间：${today}
`;

const dir = join(root, "src", "content", "blog");
mkdirSync(dir, { recursive: true });
const file = join(dir, `${slug}.md`);

if (existsSync(file)) {
  console.error(`文件已存在，不会覆盖: ${file}`);
  process.exit(1);
}

writeFileSync(file, template, "utf8");
console.log(`已创建: src/content/blog/${slug}.md`);
console.log(`分类: ${category}  状态: draft（发布后请改为 published）`);
