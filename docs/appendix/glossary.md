# 术语表

> 本术语表涵盖 Deep Research 多智能体平台教程中涉及的核心技术概念。

---

## A

### Agent（智能体）
能够自主感知环境、做出决策并执行行动的 AI 实体。在本项目中，Agent 特指基于 LLM 的任务执行单元，每个 Agent 有特定的职责和工具集。

### ASGI（Asynchronous Server Gateway Interface）
异步服务器网关接口，Python 异步 Web 应用的标准协议。FastAPI 基于 ASGI 运行，Uvicorn 是常用的 ASGI 服务器。

---

## B

### Bocha API
博查搜索 API，提供互联网搜索能力。本项目中 `web_search_node` 通过调用 `https://api.bocha.cn/v1/web-search` 获取实时网络信息。

---

## C

### Checkpointer（检查点）
LangGraph 提供的状态持久化机制，允许工作流在中断后从上一个检查点恢复。支持 Redis、PostgreSQL 和内存三种后端。

### Composition API
Vue 3 引入的组件编写方式，使用 `setup()` 函数或 `<script setup>` 语法组织逻辑，相比 Options API 提供更好的逻辑聚合和 TypeScript 支持。

### Cypher
Neo4j 图数据库的查询语言，类似于 SQL 但专为图结构设计。本项目中通过 `GraphCypherQAChain` 将自然语言自动转换为 Cypher 查询。

---

## D

### DashScope
阿里云提供的大模型服务平台，本项目使用其通义千问（Qwen）系列模型（qwen-turbo、qwen-plus）和文本嵌入模型（text-embedding-v1）。

---

## E

### Evidence Scoring（证据评分）
对检索到的信息源进行可信度评估的机制。本项目按来源类型分级：本地知识库 0.92、官方域名 0.88、主流媒体 0.72、通用网络 0.58。

### Embedding（嵌入/向量化）
将文本转换为高维数值向量的技术，使得语义相似的文本在向量空间中距离更近。本项目使用 DashScope text-embedding-v1 模型生成 1536 维向量。

---

## F

### FastAPI
现代 Python Web 框架，基于 Pydantic 和 Starlette，支持自动 OpenAPI 文档生成、类型验证和异步处理。

### FinOps（云成本优化）
Cloud Financial Operations 的缩写，指通过技术手段优化云计算资源使用和成本。本项目的 `finops_agent` 负责分析实例监控数据并提供降配建议。

---

## G

### GraphCypherQAChain
LangChain 提供的链式组件，能够将自然语言问题转换为 Cypher 查询语句并在 Neo4j 图数据库上执行，返回结构化结果。

---

## I

### Intent Classification（意图分类）
识别用户输入目的的过程。本项目采用双重机制：规则关键词匹配（30+ 关键词）+ LLM 确认，将查询分为"直接回答"和"多智能体研究"两类。

---

## L

### LangChain
大语言模型应用开发框架，提供统一的 LLM 调用接口、工具管理和 Agent 编排能力。

### LangGraph
LangChain 生态的状态图编排框架，使用 `StateGraph` 定义节点（Node）和边（Edge），支持条件路由、并行执行和循环迭代。

---

## M

### MCP（Model Context Protocol）
模型上下文协议，标准化 LLM 与外部工具/数据源的交互方式。本项目的 `cloud_agent` 通过 MCP Server 暴露 7 个云平台工具。

### Memory Manager（记忆管理器）
统一管理多种记忆后端的门面类。`deep_research` 项目的 `MemoryManager`（1492 行）协调 Redis 短期记忆、PostgreSQL 结构化记忆和 Milvus 语义记忆。

### Mermaid
基于文本的图表绘制工具，支持流程图、时序图、类图、ER 图等，可直接在 Markdown 中渲染。

### Milvus
开源向量数据库，专为大规模向量相似度搜索设计。本项目用于 RAG 知识库检索和语义记忆存储。

---

## N

### Neo4j
开源图数据库，使用节点-关系模型存储数据。本项目的 `cloud_agent` 用它构建云产品知识图谱，支持产品、实例类型、区域、存储类型等实体及其关系。

### Node（节点）
LangGraph 工作流中的执行单元，每个节点是一个 Python 函数，接收当前状态并返回更新后的状态。

---

## P

### PostgreSQL
开源关系数据库，本项目用于存储结构化记忆（用户画像、对话历史、记忆条目）和 LangGraph 检查点。

### Protocol（协议）
Python 的结构化子类型化机制（`typing.Protocol`），定义对象必须实现的方法签名。`deep_research_scaffold` 使用 Protocol 定义 `LLMClient`、`MemoryStore` 等扩展接口。

### Pydantic
Python 数据验证库，使用类型注解定义数据模型。FastAPI 原生集成 Pydantic 进行请求/响应验证。

---

## R

### RAG（Retrieval-Augmented Generation，检索增强生成）
结合外部知识检索与 LLM 生成的技术模式。先从知识库中检索相关文档，再将其作为上下文提供给 LLM 生成回答，有效减少幻觉。

### Redis
内存键值存储，本项目用于短期会话记忆（带 TTL 过期）和 LangGraph 检查点存储。

### ResearchState（研究状态）
LangGraph 工作流中流转的共享状态对象，包含 36+ 个字段（查询、子查询、检索结果、分析、报告等），所有节点通过读写状态进行通信。

---

## S

### Semantic Cache（语义缓存）
基于语义相似度的缓存机制。`cloud_agent` 的 L1 缓存支持三级查找：精确用户匹配 → 精确公共匹配 → 向量相似度匹配（阈值 0.08），避免重复 LLM 调用。

### SSE（Server-Sent Events）
服务端向客户端的单向流式推送协议，基于 HTTP 长连接。本项目用 SSE 实现实时研究进度和聊天回复的流式传输。

### StateGraph
LangGraph 的核心概念，定义了工作流的节点集合、边连接和条件路由逻辑，编译后可执行。

---

## T

### TypedDict
Python 类型注解工具，定义字典的键和值类型。LangGraph 的状态通常使用 TypedDict 定义，确保类型安全。

---

## U

### Uvicorn
轻量级 ASGI 服务器，支持 HTTP/1.1 和 WebSocket，是 FastAPI 的默认运行服务器。

---

## V

### Vite
下一代前端构建工具，使用 ESBuild 进行依赖预构建，支持热模块替换（HMR）和快速冷启动。

### Vue 3
渐进式 JavaScript 框架，本项目使用 Composition API + `<script setup>` 语法，配合 TypeScript 开发前端界面。

---

## W

### WorkflowService（工作流服务）
桥接 FastAPI HTTP 层与 LangGraph 工作流的服务类，支持同步调用（`invoke`）和异步流式（`stream`）两种模式。

---

> 📖 **返回**：[教程首页](/) | [配置参考](./configuration-reference.md)
