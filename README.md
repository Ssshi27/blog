# 学习博客

Markdown 优先的个人学习博客：内容只维护 Markdown，菜单、分类、标签、目录、搜索索引、RSS、Sitemap 全部自动生成。

技术栈：**Astro + Markdown (YAML Front Matter) + Mermaid + Pagefind + GitHub Actions + GitHub Pages**

## 目录结构

```text
src/
├── content/blog/        # 全部文章（Markdown，唯一数据源）
├── pages/               # 首页/全部文章/分类/标签/学习路径/项目实战/搜索/关于/404
├── layouts/BlogPost.astro  # 文章详情页（目录、上下篇、相关文章、面包屑、Mermaid）
├── components/          # 头部、底部、文章卡片等
├── lib/posts.ts         # 文章查询/排序/相关文章逻辑
└── consts.ts            # 站点信息 + 固定分类字典
scripts/
├── new-post.mjs         # 新文章脚手架
└── check-posts.mjs      # Front Matter 校验 + 敏感信息扫描 + 图片路径检查
.github/workflows/deploy.yml  # 推送 main 后自动构建并部署到 GitHub Pages
```

## 常用命令

```bash
npm run dev          # 本地开发预览（localhost:4321）
npm run new:post -- <category> <slug> "标题"   # 新建文章（自带统一模板）
npm run check:posts  # 内容质量与安全检查
npm run build        # 构建 dist/ + 生成 Pagefind 搜索索引
npm run preview      # 预览构建产物
```

## 发布流程

1. `npm run new:post` 创建草稿（status: draft）。
2. 编辑 Markdown，Front Matter 填写分类、标签、摘要、质量评分。
3. `npm run check:posts` 通过后将 `status` 改为 `published`（质量评分 ≥20）。
4. `git commit && git push`，GitHub Actions 自动部署。

只有 `published` 状态的文章出现在首页和列表页；`archived` 保留访问但不在列表展示。

## 部署前需要配置

1. 在 GitHub 仓库 **Settings → Pages** 中将 Source 设为 **GitHub Actions**。
2. 修改 `astro.config.mjs` 的 `site` 为你的 Pages 地址；若仓库名不是 `<用户名>.github.io`，还需设置 `base: '/仓库名'`。
3. 在 `src/consts.ts` 填写 `GITHUB_REPO`，文章页会出现"查看 Markdown 源文件"链接。
