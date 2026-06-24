# 配置参考

> 本参考手册汇总了三个子项目的全部配置项，便于快速查阅。

---

## Part 1: deep_research 配置

### 环境变量（.env）

| 变量名 | 必填 | 默认值 | 说明 |
|--------|------|--------|------|
| `DASHSCOPE_API_KEY` | 是 | - | 阿里云 DashScope API 密钥 |
| `BOCHA_API_KEY` | 否 | - | 博查搜索 API 密钥 |
| `REDIS_URL` | 否 | `redis://localhost:6379` | Redis 连接地址 |
| `POSTGRES_DSN` | 否 | - | PostgreSQL 连接字符串 |
| `MILVUS_HOST` | 否 | `localhost` | Milvus 服务地址 |
| `MILVUS_PORT` | 否 | `19530` | Milvus 服务端口 |

**示例**：
```bash
DASHSCOPE_API_KEY=sk-xxxxxxxxxxxx
BOCHA_API_KEY=sk-xxxxxxxxxxxx
REDIS_URL=redis://:password@localhost:6379/0
POSTGRES_DSN=postgresql://user:password@localhost:5432/deepresearch
MILVUS_HOST=localhost
MILVUS_PORT=19530
```

### 运行配置（config.json）

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `model` | string | `qwen-plus` | LLM 模型名称 |
| `max_iterations` | int | `3` | 最大研究迭代次数 |
| `enable_memory` | bool | `true` | 是否启用记忆系统 |
| `memory_backend` | string | `redis` | 短期记忆后端（redis/postgres/sqlite） |
| `long_term_backend` | string | `postgres` | 长期记忆后端（postgres/sqlite） |
| `checkpointer_backend` | string | `memory` | 检查点后端（memory/redis/postgres） |
| `milvus_collection_memory` | string | `mult_agent_memory` | Milvus 记忆集合名 |
| `milvus_collection_knowledge` | string | `mult_agent_knowledge` | Milvus 知识库集合名 |
| `embedding_model` | string | `text-embedding-v1` | 嵌入模型名称 |
| `web_search_enabled` | bool | `true` | 是否启用 Web 搜索 |
| `local_rag_enabled` | bool | `true` | 是否启用本地 RAG |
| `memory_top_k` | int | `5` | 记忆检索返回数量 |

**示例**：
```json
{
  "model": "qwen-plus",
  "max_iterations": 3,
  "enable_memory": true,
  "memory_backend": "redis",
  "long_term_backend": "postgres",
  "checkpointer_backend": "memory",
  "milvus_collection_memory": "mult_agent_memory",
  "milvus_collection_knowledge": "mult_agent_knowledge",
  "embedding_model": "text-embedding-v1",
  "web_search_enabled": true,
  "local_rag_enabled": true,
  "memory_top_k": 5
}
```

### API 端点

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/health` | 健康检查 |
| `POST` | `/api/v1/research/run` | 同步研究执行 |
| `POST` | `/api/v1/research/stream` | SSE 流式研究执行 |

### ResearchRequest 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `query` | string | 是 | - | 研究查询（最少 1 字符） |
| `user_id` | string | 否 | `default_user` | 用户 ID |
| `thread_id` | string | 否 | `default_thread` | 会话线程 ID |
| `tenant_id` | string | 否 | `default_tenant` | 租户 ID |
| `max_iterations` | int | 否 | null | 最大迭代次数（1-6） |
| `enable_memory` | bool | 否 | null | 是否启用记忆 |

---

## Part 2: deep_research_scaffold 配置

### 环境变量（.env）

| 变量名 | 必填 | 默认值 | 说明 |
|--------|------|--------|------|
| `APP_ENV` | 否 | `development` | 运行环境 |
| `HOST` | 否 | `0.0.0.0` | 服务监听地址 |
| `PORT` | 否 | `8000` | 服务端口 |
| `CORS_ALLOW_ORIGINS` | 否 | `*` | CORS 允许来源 |
| `CONFIG_PATH` | 否 | `../config.example.json` | 配置文件路径 |

**示例**：
```bash
APP_ENV=production
HOST=0.0.0.0
PORT=8000
CORS_ALLOW_ORIGINS=http://localhost:5173
CONFIG_PATH=./config.json
```

### 运行配置（config.example.json）

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `model` | string | `stub` | LLM 模型标识 |
| `max_iterations` | int | `2` | 最大研究迭代次数 |
| `enable_memory` | bool | `false` | 是否启用记忆 |
| `memory_top_k` | int | `3` | 记忆检索返回数量 |
| `web_search_enabled` | bool | `true` | 是否启用 Web 搜索 |
| `local_rag_enabled` | bool | `true` | 是否启用本地 RAG |
| `app_name` | string | `deep-research-scaffold` | 应用名称 |

### LLMClient Protocol 接口

```python
class LLMClient(Protocol):
    def generate(self, prompt: str) -> str: ...
    def generate_with_context(self, system: str, user: str) -> str: ...
    def classify_intent(self, query: str) -> str: ...
    def extract_keywords(self, text: str) -> list[str]: ...
    def summarize(self, text: str, max_length: int) -> str: ...
    def analyze(self, query: str, context: str) -> str: ...
    def plan(self, query: str) -> list[str]: ...
```

### MemoryStore Protocol 接口

```python
class MemoryStore(Protocol):
    def get(self, key: tuple[str, str, str]) -> list[dict]: ...
    def put(self, key: tuple[str, str, str], messages: list[dict]) -> None: ...
    def clear(self, key: tuple[str, str, str]) -> None: ...
```

---

## Part 3: cloud_agent 配置

### 环境变量（agent/.env）

| 变量名 | 必填 | 默认值 | 说明 |
|--------|------|--------|------|
| `DASHSCOPE_API_KEY` | 是 | - | DashScope API 密钥 |
| `NEO4J_URI` | 否 | `bolt://localhost:7687` | Neo4j 连接地址 |
| `NEO4J_USER` | 否 | `neo4j` | Neo4j 用户名 |
| `NEO4J_PASSWORD` | 否 | - | Neo4j 密码 |
| `REDIS_URL` | 否 | `redis://localhost:6379` | Redis 连接地址 |
| `MILVUS_HOST` | 否 | `localhost` | Milvus 服务地址 |
| `MILVUS_PORT` | 否 | `19530` | Milvus 服务端口 |
| `MYSQL_HOST` | 否 | `localhost` | MySQL 服务地址 |
| `MYSQL_PORT` | 否 | `3306` | MySQL 服务端口 |
| `MYSQL_USER` | 否 | `root` | MySQL 用户名 |
| `MYSQL_PASSWORD` | 否 | - | MySQL 密码 |
| `MYSQL_DATABASE` | 否 | `cloud_agent` | MySQL 数据库名 |
| `LOG_LEVEL` | 否 | `INFO` | 日志级别 |

**示例**：
```bash
DASHSCOPE_API_KEY=sk-xxxxxxxxxxxx
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password
REDIS_URL=redis://localhost:6379/0
MILVUS_HOST=localhost
MILVUS_PORT=19530
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=cloud_agent
LOG_LEVEL=INFO
```

### MCP 服务器配置（config/mcp_servers.json）

```json
{
  "servers": [
    {
      "name": "cloud_billing",
      "command": "python",
      "args": ["-m", "mcp_servers.cloud_platform_server"],
      "transport": "stdio"
    }
  ]
}
```

### API 端点

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/chat` | SSE 流式聊天 |

### ChatRequest 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `query` | string | 是 | - | 用户查询 |
| `user_id` | string | 否 | `default_user` | 用户 ID |
| `session_id` | string | 否 | `default_session` | 会话 ID |

### 语义缓存配置

| 参数 | 值 | 说明 |
|------|-----|------|
| 向量维度 | 1536 | DashScope text-embedding-v2 |
| 相似度阈值 | 0.08 | 余弦距离阈值 |
| Milvus 集合 | `qa_semantic_cache` | 缓存向量集合 |
| 缓存层级 | 3 级 | 精确用户 → 精确公共 → 向量相似 |

### MySQL 数据库表

| 表名 | 说明 | 关键字段 |
|------|------|---------|
| `cloud_orders` | 用户订单 | order_id, user_id, product_name, billing_mode, amount, status |
| `cloud_instances` | 云实例 | instance_id, user_id, instance_type, region_id, zone_id, status |
| `instance_metrics_daily` | 日监控指标 | instance_id, metric_date, avg_cpu_usage_percent, avg_memory_usage_percent |

### Neo4j 知识图谱节点类型

| 节点类型 | 说明 | 关键属性 |
|---------|------|---------|
| `Product` | 云产品 | name, category, description |
| `InstanceType` | 实例规格 | name, vcpu, memory_gb, gpu |
| `Region` | 地域 | name, code |
| `Zone` | 可用区 | name, code |
| `Storage` | 存储类型 | name, type, max_iops |
| `BillingRule` | 计费规则 | mode, price, unit |

### Milvus 向量集合

| 集合名 | 维度 | 索引 | 用途 |
|--------|------|------|------|
| `cloud_product_docs` | 1536 | IVF_FLAT/COSINE | 产品文档 RAG |
| `long_term_memory` | 1536 | IVF_FLAT/COSINE | 用户长期记忆 |
| `qa_semantic_cache` | 1536 | IVF_FLAT/COSINE | 语义缓存 |

---

## 通用工具命令

### 启动服务

```bash
# Part 1: deep_research
cd deep_research
python main.py                                    # CLI 模式
uvicorn app.app_main:app --port 8000              # API 模式
cd front/agent_front && npm run dev               # 前端

# Part 2: scaffold
cd deep_research_scaffold
uvicorn app.app_main:app --port 8000              # API 模式
cd front && npm run dev                           # 前端

# Part 3: cloud_agent
cd cloud_agent
python agent/main.py                              # CLI 模式
python app/app_main.py                            # API 模式 (port 5000)
cd front/cloud_agent && npm run dev               # 前端
```

### 数据初始化

```bash
# Part 3: cloud_agent 数据初始化
cd cloud_agent/agent
python -m database.init_mock_data                 # MySQL Mock 数据
python test/build_kg.py mock_data/ecs_product_info.md   # Neo4j 知识图谱
python test/milvus_rag.py                         # Milvus RAG 数据
python app/preload_cache.py                       # 语义缓存预热
```

### 健康检查

```bash
# Part 1
curl http://localhost:8000/health

# Part 3
curl http://localhost:5000/api/chat -X POST -H "Content-Type: application/json" -d '{"query":"hello"}'
```

---

> 📖 **返回**：[教程首页](/) | [术语表](./glossary.md)
