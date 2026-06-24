# VitePress 文档部署教程 — 从零到上线

> 本教程手把手教你用 `vitepress-docs-deploy` 技能，将 markdown 教程发布为在线文档网站。

---

## 准备工作

在开始之前，确保你已经拥有：

| 条件 | 说明 |
|------|------|
| GitHub 仓库 | 已创建好的仓库，教程 markdown 文件在仓库内 |
| Node.js | 本地安装了 Node.js（用于验证构建） |
| Git | 已配置好 git，能正常 push |

---

## Step 1: 了解你的 markdown 文件结构

假设你的教程目录 `tutorial/` 结构如下：

```
tutorial/
├── README.md
├── part1-foundation/
│   ├── 01-intro.md
│   ├── 02-setup.md
│   └── 03-advanced.md
├── part2-advanced/
│   ├── 01-architecture.md
│   └── 02-deployment.md
└── appendix/
    └── glossary.md
```

**你要做的**：弄清楚有几个部分、每部分有多少章节、章节顺序是什么。

---

## Step 2: 迁移文件到 `docs/`

在项目根目录创建 `docs/` 文件夹，把所有教程内容移进去。

```bash
# 创建目录
mkdir docs

# 移动章节目录（改为简洁英文名）
move tutorial\part1-foundation docs\foundation
move tutorial\part2-advanced docs\advanced
move tutorial\appendix docs\appendix

# 复制资源目录（图片、代码示例等）
xcopy /E /I tutorial\images docs\images
```

迁移后的结构：

```
docs/
├── foundation/    # 原 part1-foundation
├── advanced/      # 原 part2-advanced
└── appendix/
```

---

## Step 3: 创建 `docs/package.json`

在 `docs/` 目录下创建 Node 项目配置文件：

```json
{
  "name": "my-project-docs",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vitepress dev",
    "build": "vitepress build",
    "preview": "vitepress preview"
  },
  "devDependencies": {
    "vitepress": "^1.6.0",
    "mermaid": "^11.0.0",
    "vitepress-plugin-mermaid": "^2.0.0"
  }
}
```

> **说明**：`mermaid` 和 `vitepress-plugin-mermaid` 用于渲染架构图（如果教程里有 mermaid 代码块）。

---

## Step 4: 创建 `.vitepress/config.mts`

这是整个网站的核心配置。在 `docs/.vitepress/` 下创建 `config.mts`：

```ts
import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: '我的项目文档',
    description: '项目描述',
    lang: 'zh-CN',

    // ⚠️ 仓库名必须完全一致！
    base: '/my-repo-name/',

    themeConfig: {
      nav: [
        { text: '首页', link: '/' },
        { text: '教程', link: '/foundation/01-intro' },
      ],

      sidebar: {
        '/foundation/': [
          {
            text: '第一部分',
            items: [
              { text: '1. 概述', link: '/foundation/01-intro' },
              { text: '2. 环境搭建', link: '/foundation/02-setup' },
              { text: '3. 进阶', link: '/foundation/03-advanced' },
            ]
          }
        ],
        '/advanced/': [
          {
            text: '第二部分',
            items: [
              { text: '1. 架构', link: '/advanced/01-architecture' },
              { text: '2. 部署', link: '/advanced/02-deployment' },
            ]
          }
        ],
        '/appendix/': [
          {
            text: '附录',
            items: [
              { text: '术语表', link: '/appendix/glossary' },
            ]
          }
        ],
      },

      search: {
        provider: 'local',
        options: {
          translations: {
            button: { buttonText: '搜索文档' },
            modal: { noResultsText: '无结果', footer: { closeText: '关闭' } }
          }
        }
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/your-name/my-repo' }
      ],

      footer: {
        message: '基于 VitePress 构建',
        copyright: 'Copyright © 2026'
      },

      docFooter: { prev: '上一章', next: '下一章' },
      outline: { label: '本页目录', level: [2, 3] },
      editLink: {
        pattern: 'https://github.com/your-name/my-repo/edit/master/docs/:path',
        text: '在 GitHub 上编辑此页'
      },
      lastUpdated: { text: '最后更新', formatOptions: { dateStyle: 'short' } }
    },

    markdown: { lineNumbers: true }
  })
)
```

### 关键参数说明

| 参数 | 必须？ | 说明 |
|------|--------|------|
| `base` | ✅ 必须 | GitHub 仓库名，如 `/deep_research/`，格式 `/<repo>/` |
| `sidebar` | ✅ 必须 | 侧边栏结构，路径与 markdown 文件一一对应 |
| `search` | 推荐 | 本地全文搜索，中文需翻译 UI 文本 |
| `withMermaid()` | 按需 | 如果教程有 mermaid 图表，必须包裹 |

---

## Step 5: 创建首页 `docs/index.md`

VitePress 首页使用 `layout: home`：

```md
---
layout: home

hero:
  name: "我的项目"
  text: "项目标语"
  tagline: 一句话介绍
  actions:
    - theme: brand
      text: 开始学习
      link: /foundation/01-intro
    - theme: alt
      text: 查看源码
      link: https://github.com/your-name/my-repo

features:
  - icon: 🧠
    title: 特性一
    details: 描述
    link: /foundation/01-intro
  - icon: 💾
    title: 特性二
    details: 描述
    link: /advanced/01-architecture
  - icon: 🔍
    title: 特性三
    details: 描述
    link: /appendix/glossary

---

## 教程概览

简要介绍你的教程内容...
```

---

## Step 6: 修复死链接

源 markdown 文件里的相对路径可能不兼容，需要先构建检查：

```bash
cd docs
npm install
npm run build
```

如果报死链接错误（如 `Found dead link ./../README`），用 `replace_in_file` 逐一修复：
- `../README.md` → `/`
- `../../some-file.md` → `/some-path/file`

---

## Step 7: GitHub Actions 自动部署

创建 `.github/workflows/deploy-docs.yml`：

```yaml
name: Deploy Docs to GitHub Pages

on:
  push:
    branches: [master]
    paths:
      - 'docs/**'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - uses: actions/configure-pages@v5
        with:
          enablement: true
      - run: npm ci
        working-directory: docs
      - run: npm run build
        working-directory: docs
      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

---

## Step 8: 更新 `.gitignore`

在项目根目录 `.gitignore` 追加：

```
# VitePress
docs/.vitepress/dist/
docs/.vitepress/cache/
```

---

## Step 9: 清理并提交

```bash
# 删除构建产物（不应提交）
rmdir /S /Q docs\node_modules
rmdir /S /Q docs\.vitepress\dist

# 提交
git add .
git commit -m "docs: add VitePress documentation site"
git push
```

---

## Step 10: 启用 GitHub Pages

1. 打开仓库 → **Settings** → **Pages**
2. **Build and deployment** → Source 选择 **GitHub Actions**
3. 保存

GitHub Actions 会自动触发构建部署。

---

## 最终效果

部署成功后，访问：

```
https://<你的用户名>.github.io/<仓库名>/
```

你将得到一个带有：
- ✅ 侧边栏导航
- ✅ 全文搜索（中文支持）
- ✅ 暗色模式
- ✅ Mermaid 图表渲染
- ✅ 移动端响应式

的专业文档网站。

---

## 常见问题

### 样式丢失（纯文字无 CSS）

**原因**：`config.mts` 中未配置 `base` 或配置错误。

**解决**：确保 `base: '/<你的仓库名>/'` 与仓库名完全一致。

### 页面 404

**原因**：链接与 sidebar 配置不匹配。

**解决**：检查 sidebar 中的 `link` 路径是否与 markdown 文件名一致。

### Mermaid 图表不显示

**原因**：未安装 mermaid 插件。

**解决**：安装依赖并确保用 `withMermaid()` 包裹 `defineConfig()`。

```bash
npm install mermaid vitepress-plugin-mermaid
```

### HttpError: Not Found（部署失败）

**原因**：GitHub Pages 未启用。

**解决**：Settings → Pages → 选择 GitHub Actions 作为 Source。

---

## 完整流程总览

```mermaid
graph LR
    A[md 教程文件] --> B[迁移到 docs/]
    B --> C[创建 package.json]
    C --> D[配置 config.mts]
    D --> E[创建首页 index.md]
    E --> F[修复死链接]
    F --> G[GitHub Actions]
    G --> H[提交推送]
    H --> I[启用 Pages]
    I --> J[🌐 网站上线!]
```
