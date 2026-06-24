---
name: vitepress-docs-deploy
description: >
  This skill converts markdown tutorial/documentation files into a beautiful,
  searchable VitePress documentation site and deploys it to GitHub Pages.
  It should be used when the user wants to publish markdown-based tutorials,
  guides, or documentation as an online site integrated with a GitHub repository.
  Triggers include phrases like "make my tutorial online", "publish my docs",
  "create a documentation site from markdown", "deploy to GitHub Pages with VitePress",
  or "I want my notes accessible as a website".
---

# VitePress GitHub Pages 文档部署

## 概述

将一组 markdown 教程/文档文件转换为一
个功能完备的 VitePress 文档网站，并通过 GitHub Actions 自动化部署到 GitHub Pages。最终提供一个带侧边栏导航、全文搜索、暗色模式、Mermaid 图表支持的在线文档站点。

## 工作流程

### Step 1: 理解源文件结构

首先，列出教程 markdown 目录的内容，确定：
- 有哪些章节目录（part1, part2, ...）
- 每个目录下的 markdown 文件名称和顺序
- 是否有附录、图片、代码示例等附加资源

使用 `list_files` 获取完整结构。

### Step 2: 迁移文件到 `docs/` 目录

将所有教程 markdown 文件移动到项目根目录下的 `docs/` 文件夹内。

1. 创建 `docs/` 目录
2. 将章节目录移动到 `docs/` 下，使用简洁的英文命名：
   - `part1-xxx/` → `docs/xxx/`
   - `part2-xxx/` → `docs/yyy/`
   - `part3-xxx/` → `docs/zzz/`
   - `appendix/` → `docs/appendix/`
3. 同步复制 `images/`、`code-examples/` 等资源目录到 `docs/`
4. 保留原 `deep_research-tutorial/` 中的 `README.md`（作为 GitHub 仓库主页），但根据实际情况可移除或以 `docs/README.md` 引用

使用 `move` 命令移动章节目录，使用 `xcopy` 复制资源目录。

### Step 3: 创建 `docs/package.json`

在 `docs/` 目录下创建 VitePress Node 项目配置。

参考资产文件 `assets/package.json.template`，替换其中的 `name` 字段为项目名称。

关键依赖：
- `vitepress` - 核心框架
- `mermaid` + `vitepress-plugin-mermaid` - 图表渲染支持（如果源文件中使用了 mermaid 代码块）

### Step 4: 创建 `.vitepress/config.mts`

这是 VitePress 的核心配置文件。参考 `assets/config.mts.template`，根据项目实际情况修改以下内容：

1. **项目元数据**：`title`、`description`、`lang`
2. **base 路径**：`base: '/<repo-name>/'`（GitHub Pages 子路径部署必需）
3. **侧边栏导航**：为每个章节目录配置 sidebar，结构与 Step 1 中分析的一致
4. **导航栏**：首页链接、章节入口、源码链接
5. **搜索**：`provider: 'local'` - 中文文档需翻译搜索界面文本
6. **页脚、编辑链接、最后更新**等辅助功能
7. **社交链接**：指向 GitHub 仓库

**重要**：`base` 必须与 GitHub 仓库名完全一致（区分大小写），格式为 `/<repo-name>/`。

### Step 5: 创建首页 `docs/index.md`

创建 VitePress 首页，使用 `layout: home` 布局。

参考 `assets/index.md.template`，包含：
- **hero** 区域：项目名称、标语、行动按钮
- **features** 区域：特性卡片（图标 + 标题 + 描述 + 链接）
- **章节概览**：3个 Part 的简要介绍
- **技术栈表** 和 **学习路径**

所有内部链接需要与 `config.mts` 中的 sidebar 配置对齐。

### Step 6: 修复 Markdown 死链接

源 markdown 文件中可能存在指向旧路径的链接（如 `../README.md`），需要修复为 VitePress 路由路径。

1. 使用 `vitepress build` 构建检查死链接
2. 根据报错信息逐一修复
3. 将路径改为 VitePress 兼容格式（如 `/` 代替 `../README.md`）

### Step 7: 创建 GitHub Actions 部署工作流

在 `.github/workflows/deploy-docs.yml` 创建自动部署配置。

参考 `assets/deploy-docs.yml.template`，工作流包含：
1. **触发条件**：push 到主分支且 `docs/**` 路径变更，支持手动触发
2. **构建任务**：checkout → 设置 Node.js 22 → 配置 Pages → 安装依赖 → 构建
3. **部署任务**：将 `docs/.vitepress/dist` 产出部署到 GitHub Pages

注意：
- Node.js 版本设置为 `22`（GitHub Actions 已弃用 Node 20）
- `configure-pages@v5` 使用 `enablement: true` 自动启用 Pages
- 使用 `upload-pages-artifact@v3` 上传构建产物

### Step 8: 更新 `.gitignore`

在项目根目录 `.gitignore` 中追加 VitePress 相关忽略项：

```
# VitePress
docs/.vitepress/dist/
docs/.vitepress/cache/
```

### Step 9: 构建验证

在 `docs/` 目录下执行：
```bash
npm install && npm run build
```

确认构建成功无报错后，删除 `node_modules/` 和 `.vitepress/dist/`（它们不应提交到仓库）。

### Step 10: 提交并推送

```bash
git add .
git commit -m "docs: add VitePress documentation site with GitHub Pages deployment"
git push
```

### Step 11: 部署后指引

推送完成后，告知用户：

1. GitHub Actions 将自动构建部署
2. 如果 `configure-pages@v5` 的 `enablement: true` 未生效，用户需手动进入 `Settings → Pages`，将 Source 设为 `GitHub Actions`
3. 网站地址格式：`https://<username>.github.io/<repo-name>/`
4. 后续每次推送 `docs/` 目录变更即自动更新

### Step 12: 问题排查

常见问题及解决方案：

| 问题 | 原因 | 解决 |
|------|------|------|
| CSS/样式丢失 | 未配置 `base` | 在 `config.mts` 添加 `base: '/<repo>/'` |
| 死链接报错 | 旧路径不兼容 | 改为 VitePress 路由路径 |
| Mermaid 图表不渲染 | 缺少插件 | 安装 `mermaid` + `vitepress-plugin-mermaid` |
| HttpError: Not Found | Pages 未启用 | Settings → Pages → GitHub Actions |
| Node 20 deprecated | 旧版本 Node | 升级到 Node 22 |

## 资产文件

- `assets/package.json.template` - VitePress 项目配置模板
- `assets/config.mts.template` - VitePress 配置模板
- `assets/deploy-docs.yml.template` - GitHub Actions 工作流模板
- `assets/index.md.template` - 首页模板
