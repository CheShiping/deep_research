import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
  title: 'Deep Research',
  description: '多智能体深度研究平台 — 企业级技术教程',
  lang: 'zh-CN',
  base: '/deep_research/',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    logo: { light: '/logo.svg', dark: '/logo.svg' },
    
    nav: [
      { text: '首页', link: '/' },
      { text: '教程', link: '/deep-research/01-项目概述与架构设计' },
      { text: '部署指南', link: '/deploy-tutorial' },
      { 
        text: '项目源码',
        items: [
          { text: 'deep_research 核心', link: 'https://github.com/CheShiping/deep_research/tree/master/deep_research' },
          { text: 'scaffold 脚手架', link: 'https://github.com/CheShiping/deep_research/tree/master/deep_research_scaffold' },
          { text: 'cloud_agent 云客服', link: 'https://github.com/CheShiping/deep_research/tree/master/cloud_agent' },
        ]
      },
    ],

    sidebar: {
      '/deep-research/': [
        {
          text: 'Part 1 — 多智能体深度研究平台',
          items: [
            { text: '1. 项目概述与架构设计', link: '/deep-research/01-项目概述与架构设计' },
            { text: '2. 环境搭建与依赖管理', link: '/deep-research/02-环境搭建与依赖管理' },
            { text: '3. 多智能体工作流引擎', link: '/deep-research/03-多智能体工作流引擎' },
            { text: '4. 记忆系统设计与实现', link: '/deep-research/04-记忆系统设计与实现' },
            { text: '5. RAG 检索增强生成', link: '/deep-research/05-RAG检索增强生成' },
            { text: '6. FastAPI 后端服务', link: '/deep-research/06-FastAPI后端服务' },
            { text: '7. Vue 3 前端开发', link: '/deep-research/07-Vue3前端开发' },
            { text: '8. 部署与运维指南', link: '/deep-research/08-部署与运维指南' },
            { text: '9. 最佳实践与常见问题', link: '/deep-research/09-最佳实践与常见问题' },
          ]
        }
      ],
      '/scaffold/': [
        {
          text: 'Part 2 — 可复用脚手架模板',
          items: [
            { text: '1. 脚手架概述与设计哲学', link: '/scaffold/01-脚手架概述与设计哲学' },
            { text: '2. 核心架构与扩展点', link: '/scaffold/02-核心架构与扩展点' },
            { text: '3. 从脚手架到生产级项目', link: '/scaffold/03-从脚手架到生产级项目' },
            { text: '4. 自定义 LLM 适配器', link: '/scaffold/04-自定义LLM适配器' },
          ]
        }
      ],
      '/cloud-agent/': [
        {
          text: 'Part 3 — 云平台智能客服系统',
          items: [
            { text: '1. 项目概述与系统架构', link: '/cloud-agent/01-项目概述与系统架构' },
            { text: '2. 多智能体路由与编排', link: '/cloud-agent/02-多智能体路由与编排' },
            { text: '3. 知识图谱与 RAG 系统', link: '/cloud-agent/03-知识图谱与RAG系统' },
            { text: '4. MCP 工具服务器', link: '/cloud-agent/04-MCP工具服务器' },
            { text: '5. 记忆与语义缓存', link: '/cloud-agent/05-记忆与语义缓存' },
            { text: '6. FastAPI 后端与前端', link: '/cloud-agent/06-FastAPI后端与前端' },
            { text: '7. 部署与运维', link: '/cloud-agent/07-部署与运维' },
          ]
        }
      ],
      '/appendix/': [
        {
          text: '附录',
          items: [
            { text: '术语表', link: '/appendix/glossary' },
            { text: '配置参考', link: '/appendix/configuration-reference' },
            { text: 'VitePress 部署教程', link: '/deploy-tutorial' },
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CheShiping/deep_research' }
    ],

    footer: {
      message: '基于 LangGraph · FastAPI · Vue 3 · Milvus · Neo4j 构建',
      copyright: 'Copyright © 2026 Deep Research'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档' },
          modal: {
            noResultsText: '无结果',
            footer: { closeText: '关闭' }
          }
        }
      }
    },

    docFooter: {
      prev: '上一章',
      next: '下一章'
    },

    outline: {
      label: '本页目录',
      level: [2, 3]
    },

    editLink: {
      pattern: 'https://github.com/CheShiping/deep_research/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    lastUpdated: {
      text: '最后更新',
      formatOptions: { dateStyle: 'short' }
    }
  },

  markdown: {
    lineNumbers: true,
  }
}))

