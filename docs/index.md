---
layout: home

hero:
  name: "Deep Research"
  text: "多智能体深度研究平台"
  tagline: 从零构建企业级 AI Agent 系统 — LangGraph · FastAPI · Vue 3 · Milvus · Neo4j
  image:
    src: /logo.svg
    alt: Deep Research
  actions:
    - theme: brand
      text: 开始学习
      link: /deep-research/01-项目概述与架构设计
    - theme: alt
      text: 查看源码
      link: https://github.com/CheShiping/deep_research

features:
  - icon: 🧠
    title: 多智能体工作流
    details: 基于 LangGraph 的 9 节点工作流引擎，支持条件路由、并行执行、状态管理，打造生产级 AI Agent 系统。
    link: /deep-research/03-多智能体工作流引擎
  - icon: 💾
    title: 四层记忆系统
    details: 短期/长期/语义/情景记忆，集成 Milvus + Redis + PostgreSQL，实现跨会话上下文保持与用户偏好学习。
    link: /deep-research/04-记忆系统设计与实现
  - icon: 🔍
    title: RAG 检索增强
    details: Milvus 向量数据库 + DashScope Embedding，文档分块、相似度检索、重排序，精准知识问答。
    link: /deep-research/05-RAG检索增强生成
  - icon: 🕸️
    title: 知识图谱
    details: Neo4j 图数据库 + GraphCypherQAChain，构建云产品关系图谱，支持复杂关联查询与推理。
    link: /cloud-agent/03-知识图谱与RAG系统
  - icon: 🔧
    title: MCP 工具生态
    details: 基于 FastMCP 的工具服务器，7 个云平台工具，标准化 JSON-RPC stdio 传输协议。
    link: /cloud-agent/04-MCP工具服务器
  - icon: 🏗️
    title: 脚手架模板
    details: 零外部依赖的 Agent 系统脚手架，Protocol 抽象接口 + 5 大扩展点，快速启动新项目。
    link: /scaffold/01-脚手架概述与设计哲学

---

## 教程概览

本教程覆盖 Deep Research 多智能体平台的三个子项目，从**生产级应用**到**可复用脚手架**，提供完整的学习路径。

### Part 1 · deep_research（9 章）

核心生产级多智能体深度研究系统。涵盖 LangGraph 工作流引擎、四层记忆系统、RAG 检索增强、FastAPI 后端服务、Vue 3 前端开发、Docker 部署运维。

[开始学习 →](/deep-research/01-项目概述与架构设计)

### Part 2 · scaffold（4 章）

从核心项目抽象而来的零依赖脚手架模板。深入 Protocol 抽象接口设计、5 大扩展点机制、LLM 适配器自定义实现。

[开始学习 →](/scaffold/01-脚手架概述与设计哲学)

### Part 3 · cloud_agent（7 章）

基于多 Agent 架构的云平台智能客服系统。集成 Neo4j 知识图谱、MCP 工具服务器、Redis 语义缓存等进阶技术。

[开始学习 →](/cloud-agent/01-项目概述与系统架构)

---

## 技术栈

| 层级 | 技术 | 用途 |
|------|------|------|
| **AI 框架** | LangGraph ≥ 1.0 | 多智能体工作流编排 |
| **LLM** | DashScope (Qwen) | 大语言模型推理 |
| **后端** | FastAPI + Uvicorn | REST API + SSE 流式 |
| **前端** | Vue 3 + Vite | 单页应用 |
| **向量库** | Milvus 2.6+ | 语义检索 + 记忆存储 |
| **关系库** | PostgreSQL 14+ | 结构化记忆 + 检查点 |
| **图库** | Neo4j 5+ | 知识图谱 |
| **缓存** | Redis 7+ | 短期记忆 + 语义缓存 |

---

## 学习路径

| 路径 | 时长 | 适合人群 |
|------|------|----------|
| **快速上手** | 1-2 天 | 有 AI Agent 经验，想快速了解架构 |
| **深度学习** | 1-2 周 | 想系统掌握多智能体系统全链路开发 |
| **特定主题** | 按需 | 关注记忆系统、RAG、MCP 等具体模块 |
