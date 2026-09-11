# Claude Code 完全使用指南（小白向）

> 本文档面向零基础用户，用通俗易懂的语言介绍 Claude Code 的方方面面。读完你会知道它是什么、能做什么、怎么用。

---

## 目录

1. [什么是 Claude Code](#1-什么是-claude-code)
2. [安装与登录](#2-安装与登录)
3. [基础使用](#3-基础使用)
4. [所有斜杠命令详解](#4-所有斜杠命令详解)
5. [IDE 集成（VS Code / JetBrains）](#5-ide-集成)
6. [记忆系统（让 Claude 记住你的偏好）](#6-记忆系统)
7. [Hooks 钩子系统](#7-hooks-钩子系统)
8. [MCP 服务器（连接外部工具）](#8-mcp-服务器)
9. [设置与配置](#9-设置与配置)
10. [权限系统](#10-权限系统)
11. [键盘快捷键](#11-键盘快捷键)
12. [Worktrees 工作树](#12-worktrees-工作树)
13. [Git 集成](#13-git-集成)
14. [终端与 Shell 用法](#14-终端与-shell-用法)
15. [IDE 特色功能](#15-ide-特色功能)
16. [Plan 计划模式](#16-plan-计划模式)
17. [子代理与工作流](#17-子代理与工作流)
18. [后台任务](#18-后台任务)
19. [会话管理](#19-会话管理)
20. [新手最佳实践](#20-新手最佳实践)

---

## 1. 什么是 Claude Code

**Claude Code** 是 Anthropic 公司开发的一个 **AI 编程助手**，它运行在你的终端里，能：

- 📖 **读懂你的代码**：理解整个项目的结构和逻辑
- ✏️ **帮你写代码**：新增功能、修复 Bug、重构代码
- 🔧 **执行命令**：运行测试、安装依赖、操作 Git
- 🔗 **连接外部工具**：Jira、数据库、Slack、Figma 等
- 🤖 **自主完成任务**：你描述需求，它自动执行多步骤操作

**通俗理解**：就像有一个经验丰富的程序员坐在你旁边，你告诉他"帮我加个登录功能"，他就会自己读代码、写代码、跑测试、提交 commit。

**运行环境**：终端 CLI（功能最全）、VS Code 扩展、JetBrains 插件、桌面应用、网页版。所有平台的配置通用。

---

## 2. 安装与登录

### 前提条件

- 一个终端（命令提示符 / PowerShell / Git Bash）
- 一个代码项目
- Claude 账号（Pro / Max / Team / Enterprise 订阅，或通过云平台接入）

### 安装方法

**推荐方式（自动更新）：**

macOS / Linux / WSL：
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Windows PowerShell：
```powershell
irm https://claude.ai/install.ps1 | iex
```

**其他方式**：Homebrew (`brew install --cask claude-code`)、WinGet (`winget install Anthropic.ClaudeCode`)、npm。

**Windows 特别说明**：建议安装 Git for Windows，这样 Claude Code 可以使用 Git Bash。不装的话会用 PowerShell。

### 登录

在终端输入 `claude`，首次使用会弹出浏览器让你登录。支持 Claude 订阅账号、API 控制台账号或云平台凭证。

如果要切换账号，在会话中输入 `/login`。

---

## 3. 基础使用

### 启动方式

| 命令 | 作用 |
|------|------|
| `claude` | 进入交互模式（可以持续对话） |
| `claude "任务描述"` | 执行一次任务，然后留在交互模式 |
| `claude -p "问题"` | 一次性提问，输出结果后退出（适合脚本） |
| `claude -c` | 继续最近一次对话 |
| `claude -r` | 打开历史会话列表，选择恢复 |
| `claude --resume 会话名` | 按名称恢复指定会话 |

### 会话中的基本操作

| 操作 | 作用 |
|------|------|
| `/help` | 查看所有可用命令 |
| `/clear` | 清空对话历史（之前的会话仍然保存） |
| `/exit` 或 `Ctrl+D` | 退出 Claude Code |
| `Esc` | 中断 Claude 正在做的操作 |
| `Shift+Tab` | 切换权限模式 |

### 典型的对话方式

```text
"帮我分析一下这个项目是做什么的"
"给主文件添加一个 hello world 函数"
"提交我的修改，写一个清晰的 commit message"
"登录页有个 bug，用户输错密码后页面空白，帮我修一下"
"给计算器函数写单元测试"
"把 auth 模块从回调改成 async/await"
```

---

## 4. 所有斜杠命令详解

在会话中输入 `/` 就能看到所有命令。以下是完整清单：

### 设置与配置类

| 命令 | 作用 |
|------|------|
| `/init` | 自动生成项目的 CLAUDE.md 文件（告诉 Claude 你的项目规范） |
| `/config [key=value]` | 打开/修改设置 |
| `/memory` | 管理记忆文件（CLAUDE.md、自动记忆等） |
| `/agents` | 管理自定义子代理 |
| `/mcp` | 管理 MCP 服务器连接 |
| `/hooks` | 查看钩子配置 |
| `/permissions` | 管理工具的允许/询问/拒绝规则 |
| `/keybindings` | 打开快捷键配置文件 |
| `/theme` | 更换配色主题 |
| `/statusline` | 自定义状态栏显示 |
| `/terminal-setup` | 配置终端快捷键 |
| `/ide` | 管理 IDE 集成 |
| `/sandbox` | 切换沙盒模式（隔离文件系统和网络） |
| `/login` / `/logout` | 登录 / 登出 |
| `/plugin` | 管理插件和市场 |

### 模型与性能类

| 命令 | 作用 |
|------|------|
| `/model [模型名]` | 切换 AI 模型（不写名字会弹出选择器） |
| `/effort [级别]` | 设置努力级别：low / medium / high / xhigh / max |
| `/fast [on\|off]` | 切换快速模式（用 Opus 模型，输出更快） |
| `/advisor [model\|off]` | 启用/关闭顾问工具（第二个模型给建议） |
| `/thinking` | 切换深度思考模式 |

### 上下文管理类

| 命令 | 作用 |
|------|------|
| `/clear [名称]` | 开始新对话，旧会话保存在 `/resume` 中 |
| `/compact [说明]` | 压缩对话历史，释放上下文空间 |
| `/context [all]` | 可视化显示上下文窗口的使用情况 |
| `/rewind` | 回退到之前的检查点（代码和对话都回退） |
| `/resume [会话]` | 恢复之前的对话 |
| `/branch [名称]` | 从当前对话分出一个分支（保留原路，尝试新方向） |
| `/rename [名称]` | 重命名当前会话 |
| `/export [文件名]` | 导出对话为纯文本 |
| `/recap` | 生成当前会话的一句话总结 |

### 代码审查类

| 命令 | 作用 |
|------|------|
| `/code-review [级别] [--fix] [--comment]` | 审查代码差异，找 Bug 和改进机会 |
| `/simplify` | 只做代码简化/清理，不找 Bug |
| `/review [PR]` | 审查 GitHub Pull Request |
| `/security-review` | 安全审查 |

### 并行工作类

| 命令 | 作用 |
|------|------|
| `/background [任务]` | 把当前会话转为后台运行 |
| `/batch <指令>` | 把大任务拆成 5-30 个并行子任务 |
| `/fork <指令>` | 分叉一个子代理，继承当前对话去干活 |
| `/tasks` | 查看所有后台运行的任务 |
| `/workflows` | 查看、暂停、恢复工作流 |

### 导航与输出类

| 命令 | 作用 |
|------|------|
| `/add-dir <路径>` | 添加工作目录，让 Claude 能访问更多文件 |
| `/cd <路径>` | 切换工作目录 |
| `/diff` | 打开交互式差异查看器 |
| `/copy [N]` | 复制上一条 Claude 回复到剪贴板 |
| `/btw <问题>` | 问一个临时问题，不会塞进对话历史 |
| `/focus` | 切换聚焦视图（只显示最终回复） |

### 账户与用量类

| 命令 | 作用 |
|------|------|
| `/usage` | 查看会话花费、用量限制和活动统计 |
| `/feedback [报告]` | 提交反馈或 Bug 报告 |
| `/doctor` | 诊断安装和设置是否正确 |
| `/debug [描述]` | 开启调试日志 |
| `/release-notes` | 查看更新日志 |
| `/status` | 显示版本、模型、账户、连接状态 |

### 远程与云端类

| 命令 | 作用 |
|------|------|
| `/remote-control` | 让当前会话可以在 claude.ai 网页上操作 |
| `/teleport` | 把网页会话拉到终端里 |
| `/desktop` | 把会话转到桌面应用继续 |
| `/autofix-pr` | 生成一个云端会话，自动盯着 PR 修问题 |
| `/schedule` | 在云端创建定时任务 |

### 其他

| 命令 | 作用 |
|------|------|
| `/plan [描述]` | 直接进入计划模式 |
| `/goal [条件\|clear]` | 设置一个目标条件，Claude 会一直做到满足为止 |
| `/color [颜色\|default]` | 设置输入栏颜色 |
| `/tui` | 设置终端界面渲染模式 |
| `/voice` | 切换语音输入 |

---

## 5. IDE 集成

### VS Code 扩展（推荐方式）

**安装**：在 VS Code 扩展商店搜索 "Claude Code"（或直接安装 `anthropic.claude-code`）。

**核心功能**：
- 编辑器右上角的 ✨ **火花图标**点击即可打开 Claude Code
- **@ 提及**：输入 `@` 后跟文件名快速引用文件（`Alt+K` = 插入带行号的引用）
- **原生差异视图**：Claude 的修改以对比形式展示，你可以逐条接受或拒绝
- **多标签页**：同时进行多个独立对话
- **会话历史**：浏览和恢复过去的对话

**常用快捷键**：

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+Esc` | 在编辑器和 Claude 之间切换焦点 |
| `Ctrl+Shift+Esc` | 打开新对话标签页 |
| `Alt+K` / `Option+K` | 插入 @提及引用 |
| `Ctrl+Shift+T` | 重新打开刚关闭的会话 |

### JetBrains 插件

支持 IntelliJ IDEA、PyCharm、WebStorm、Android Studio、GoLand 等。

**安装**：先装 Claude Code CLI，再装 [JetBrains 插件](https://plugins.jetbrains.com/plugin/27310-claude-code-beta-)，重启 IDE。

**功能**：`Ctrl+Esc` 调起、IDE 原生差异查看、当前选择自动共享给 Claude、Lint 错误自动共享、`Alt+Ctrl+K` 插入文件引用。

---

## 6. 记忆系统

Claude Code 有两套记忆机制，让它在不同会话间"记住"你的偏好。

### CLAUDE.md 文件

这是你**手动编写**的 Markdown 文件，Claude 每次启动会话都会读取。类似于给 Claude 的"项目说明书"。

**文件位置（从宽到窄依次加载）**：

| 层级 | 位置 | 用途 |
|------|------|------|
| 用户全局 | `~/.claude/CLAUDE.md` | 你个人的偏好，所有项目通用 |
| 项目共享 | `./CLAUDE.md` 或 `./.claude/CLAUDE.md` | 团队共享的项目规范 |
| 个人本地 | `./CLAUDE.local.md` | 你个人对项目的偏好（应加入 .gitignore） |

**怎么写**：
- 保持在 200 行以内（越长越容易被忽略）
- 用标题和列表组织
- 要具体："使用 2 空格缩进" 而不是 "格式写对"
- 包含：构建命令、编码规范、架构决策、测试要求、常见坑
- 不要写：Claude 读代码就能知道的东西、标准约定、详细 API 文档
- 运行 `/init` 自动生成一个初始版本

**如果你已有 AGENTS.md**：在 CLAUDE.md 里加一行 `@AGENTS.md` 导入即可。

### 自动记忆

这是 **Claude 自动写给自己** 的笔记。它在工作过程中自动记录构建命令、调试心得、架构认知、代码风格等信息。

- **存储位置**：`~/.claude/projects/<项目>/memory/MEMORY.md`
- **行为**：每次会话开始时加载 MEMORY.md 的前 200 行
- **开关**：通过 `/memory` 切换，或在设置中设 `autoMemoryEnabled: false`
- **审计**：所有文件都是可读可编辑的 Markdown

### `.claude/rules/` 规则目录

大型项目可以把规范拆成分类文件：

```
project/
  .claude/
    CLAUDE.md          # 主项目说明
    rules/
      code-style.md    # 代码风格指南
      testing.md       # 测试规范
      security.md      # 安全要求
```

还可以用 YAML 前置元数据限定规则生效范围：

```markdown
---
paths:
  - "src/api/**/*.ts"
---
# API 开发规范
- 所有端点必须包含输入验证
```

---

## 7. Hooks 钩子系统

**钩子是什么**？钩子是在 Claude Code 执行特定操作时**自动触发**的自定义脚本。比如：
- 每次执行 Bash 命令前做安全检查
- 每次 Claude 回复完后跑一遍测试
- 每次收到通知时弹桌面提醒

### 钩子触发时机

**会话级**：`SessionStart`（会话开始）、`SessionEnd`（会话结束）

**每轮对话**：`UserPromptSubmit`（用户提交问题前）、`Stop`（Claude 回复完后）

**工具调用**：
- `PreToolUse`（工具执行前）——最重要，可以拦截、修改、阻止
- `PostToolUse`（工具执行后）
- `PostToolUseFailure`（工具执行失败后）

**子代理**：`SubagentStart`、`SubagentStop`

**其他**：`Notification`（通知发送时）、`PreCompact`（压缩前）、`ConfigChange`（配置变更时）

### 钩子类型

| 类型 | 说明 |
|------|------|
| **command** | 执行一个 Shell 脚本 |
| **http** | 发送 HTTP 请求 |
| **mcp_tool** | 调用 MCP 服务器上的工具 |
| **prompt** | 让 LLM 评估一下 |
| **agent** | 生成子代理处理（实验性） |

### 配置示例

在 `.claude/settings.json` 中：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "if": "Bash(rm *)",
            "command": "/path/to/safety-check.sh",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

**退出码**：0 = 成功继续；2 = 阻止操作；其他 = 警告但不阻止。

---

## 8. MCP 服务器

**MCP（Model Context Protocol，模型上下文协议）** 是一个开放标准，用于连接 AI 工具和外部数据源。

### 用 MCP 能做什么

- 读取 Google Drive 中的设计文档
- 更新 Jira 工单状态
- 查询 PostgreSQL / MySQL 数据库
- 集成 Figma 设计稿
- 发送 Slack 消息
- 对接 Sentry、Datadog 等监控工具

### MCP 服务器类型

| 类型 | 说明 |
|------|------|
| **HTTP** | 通过 HTTP 连接远程服务器 |
| **SSE** | 通过 Server-Sent Events 连接 |
| **stdio** | 本地启动一个子进程作为服务器 |
| **WebSocket** | 通过 WebSocket 连接 |

### 安装范围

| 范围 | 配置文件 | 可见性 |
|------|----------|--------|
| **本地** | `.mcp.json`（项目根目录） | 当前项目，本机 |
| **项目** | `.mcp.json`（提交到 git） | 团队成员共享 |
| **用户** | `~/.claude.json` | 你所有项目通用 |

### 添加 MCP 服务器

```bash
# 命令行添加
claude mcp add --transport http github https://api.githubcopilot.com/mcp/ \
  --header "Authorization: Bearer YOUR_TOKEN"

# 或在会话中输入 /mcp 打开管理界面
# 或直接编辑 .mcp.json
```

---

## 9. 设置与配置

Claude Code 采用**层级覆盖**机制，不同位置的配置文件有不同的优先级。

### 配置层级（从低到高）

| 层级 | 位置 | 影响范围 |
|------|------|----------|
| **用户** | `~/.claude/` | 你的所有项目 |
| **项目** | `.claude/`（可提交 git） | 所有项目成员 |
| **本地** | `.claude/settings.local.json`（gitignore） | 只有你、这个项目 |
| **命令行** | `claude --xxx` 参数 | 当前会话 |
| **管理策略** | 系统级部署 | 所有人，不可覆盖 |

### 配置文件对照表

| 配置内容 | 用户位置 | 项目位置 | 本地位置 |
|----------|----------|----------|----------|
| 设置 | `~/.claude/settings.json` | `.claude/settings.json` | `.claude/settings.local.json` |
| 子代理 | `~/.claude/agents/` | `.claude/agents/` | 无 |
| MCP 服务器 | `~/.claude.json` | `.mcp.json` | `~/.claude.json` |
| CLAUDE.md | `~/.claude/CLAUDE.md` | `CLAUDE.md` | `CLAUDE.local.md` |
| 快捷键 | `~/.claude/keybindings.json` | 无 | 无 |

### 常用设置项

**模型配置**：`model`（默认模型）、`fallbackModel`（备用模型）、`effortLevel`（努力级别）

**行为**：`autoCompactEnabled`（自动压缩）、`editorMode`（normal/vim）、`outputStyle`（输出风格）、`autoMemoryEnabled`（自动记忆开关）

**权限**：`permissions.allow`（允许列表）、`permissions.deny`（拒绝列表）、`permissions.defaultMode`（默认模式）

使用 `/config` 在会话中直接修改设置。

---

## 10. 权限系统

Claude Code 对不同操作有不同的**安全级别**：

| 工具类型 | 例子 | 默认行为 |
|----------|------|----------|
| **只读** | 读文件、搜索代码 | 不需要批准 |
| **Shell 命令** | 执行终端命令 | 需要批准 |
| **文件修改** | 编辑、写入文件 | 需要批准 |

### 权限规则

三种基本规则：
- **Allow（允许）**：自动批准，不弹窗问
- **Ask（询问）**：每次都弹窗让你确认
- **Deny（拒绝）**：直接阻止

规则格式：`工具名(匹配模式)`，支持 `*` 通配符。

**配置示例**：

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run test *)",
      "Read(~/.zshrc)"
    ],
    "deny": [
      "Bash(curl *)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ]
  }
}
```

### 权限模式

| 模式 | 不需要问的操作 | 适合场景 |
|------|---------------|----------|
| `default` | 只读 | 上手阶段、敏感项目 |
| `acceptEdits` | 只读 + 文件编辑 + 常用命令 | 正常写代码 |
| `plan` | 只读，**不可编辑** | 先探索再动手 |
| `auto` | 几乎所有（有安全检查） | 长时间自主任务 |
| `dontAsk` | 只有预设允许的 | CI/脚本场景 |
| `bypassPermissions` | 全部 | 隔离容器/虚拟机 |

按 `Shift+Tab` 循环切换模式。启动时也可以指定：`claude --permission-mode acceptEdits`。

### 受保护路径

以下路径永远不能自动写入（除非用 `bypassPermissions` 模式）：
`.git`、`.claude`、`.vscode`、`.idea`、`.gitconfig`、`.bashrc`、`.envrc`、`.npmrc` 等敏感文件。

---

## 11. 键盘快捷键

配置文件位于 `~/.claude/keybindings.json`，修改后自动生效。

### 默认常用快捷键

**通用**：

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+C` | 中断（按一下清输入，再按一下退出） |
| `Ctrl+D` | 退出（输入为空时） |
| `Ctrl+O` | 打开对话记录查看器 |
| `Ctrl+R` | 反向搜索命令历史 |
| `Ctrl+L` | 刷新屏幕 |
| `Ctrl+G` | 在外部编辑器打开当前输入 |
| `Ctrl+B` | 后台化正在运行的任务（tmux 用户按两下） |
| `Ctrl+T` | 切换任务列表 |
| `Ctrl+V` | 粘贴剪贴板图片 |

**聊天输入**：

| 快捷键 | 功能 |
|--------|------|
| `Enter` | 发送消息 |
| `Ctrl+J` | 插入换行 |
| `Shift+Tab` | 切换权限模式 |
| `Meta+P` | 打开模型选择器 |
| `Meta+T` | 切换深度思考 |

### 自定义快捷键示例

```json
{
  "bindings": [
    {
      "context": "Chat",
      "bindings": {
        "ctrl+e": "chat:externalEditor",
        "ctrl+u": null
      }
    }
  ]
}
```

设为 `null` 表示取消该默认快捷键。

---

## 12. Worktrees 工作树

**什么是工作树**？Git 工作树让你在同一仓库同时拥有多个独立的工作目录，互不干扰。Claude Code 利用这个特性实现**多会话物理隔离**。

### 使用场景

- 同时处理多个功能分支
- 让子代理在隔离环境中工作，不弄乱你的代码
- 批量并行修改（`/batch` 命令背后就用这个）

### 用法

```bash
# 创建并进入一个工作树（自动命名分支）
claude --worktree feature-auth

# 再开一个终端，创建另一个独立工作树
claude --worktree bugfix-123

# 让系统自动随机命名
claude --worktree
```

### 指定基础分支

默认从仓库默认分支（`origin/HEAD`）创建。要从你当前的 HEAD 创建（保留未提交的更改）：

```json
{
  "worktree": {
    "baseRef": "head"
  }
}
```

### 清理

- 没有未提交更改的工作树在退出时**自动删除**
- 有更改的工作树会提示你保留还是删除
- 子代理工作树默认 30 天后自动清理

---

## 13. Git 集成

Claude Code 深度集成 Git，你可以直接用自然语言操作：

```text
"帮我提交修改，写一个清晰的 commit message"
"创建一个新分支 feature/quickstart"
"显示最近 5 条 commit"
"帮我解决合并冲突"
"创建一个 PR"
```

创建 PR 后，会话自动关联该 PR。回到这个会话时可以：`claude --from-pr <编号>` 或在 `/resume` 选择器中粘贴 PR URL。

PR 审查状态在状态栏显示（绿色=已批准、黄色=待处理、红色=要求修改、灰色=草稿）。

---

## 14. 终端与 Shell 用法

### Shell 模式（`!` 前缀）

在对话中直接执行命令，Claude 不解释：

```text
! npm test
! git status
! ls -la
```

命令输出会自动加入对话上下文。

### 后台运行命令

让耗时命令（构建、测试、开发服务器）在后台运行：
- 告诉 Claude "在后台运行"
- 或按 `Ctrl+B` 把正在运行的命令转到后台
- 输出写入文件，Claude 稍后读取

### 管道用法

```bash
# 分析日志
tail -200 app.log | claude -p "找一下有没有异常"

# 总结提交
git log --oneline -20 | claude -p "总结这些提交都做了什么"

# 结构化输出
claude -p "列出所有 API 接口" --output-format json
```

### 非交互模式（适合脚本/CI）

```bash
claude -p "解释这个函数"
claude -p "修复 lint 错误" --allowedTools "Edit,Bash"
```

---

## 15. IDE 特色功能

### 选择上下文

在 IDE 中选中代码时，Claude 自动看到你的选择。VS Code 扩展的状态栏显示选中行数。按 `Alt+K` / `Option+K` 插入带文件路径和行号的引用。

### @ 文件引用

```text
解释 @src/utils/auth.js 里面的逻辑
@src/components 这个目录的结构是什么样的？
```

输入 `@` 触发文件路径自动补全（支持模糊匹配）。

### 诊断共享

IDE 的语法错误和警告（Problems 面板）会自动共享给 Claude。

### 图片支持

- 拖拽图片到 Claude Code 窗口
- `Ctrl+V` 粘贴剪贴板图片
- 提供图片文件路径
- Claude 能分析截图、设计稿、图表

### 对话记录查看器

按 `Ctrl+O` 切换查看详细的工具调用记录。

---

## 16. Plan 计划模式

**计划模式**让 Claude **只调研、写计划、不动代码**。适合你不确定怎么改、需要先想清楚的场景。

### 进入计划模式

- 按 `Shift+Tab` 直到状态栏显示 "plan mode"
- 启动命令：`claude --permission-mode plan`
- 单次：`/plan 我想加一个 OAuth 登录`

### 审核与执行计划

计划写好后，Claude 会问你怎么做：
- **批准并用 auto 模式执行**（全自动）
- **批准并用 acceptEdits 模式**（文件编辑自动批准）
- **批准但每条修改手动审核**
- **继续打磨计划**
- **用 Ultraplan 在浏览器中精炼**

按 `Ctrl+G` 可以在文本编辑器中直接编辑计划。

### 什么时候用计划模式

- 涉及多个文件的大改动
- 对要改的代码不熟悉
- 不确定最佳方案
- 想先看方案再动手

**不需要计划模式**：改个错别字、加一行日志这种小事情。

---

## 17. 子代理与工作流

### 子代理是什么

子代理是**专门的 AI 助手**，在**自己的上下文窗口**中运行，不会塞爆你的主对话。

**为什么需要子代理**：
- 🔒 **隔离上下文**：把读大量文件的探索工作交给它，不影响你主对话
- 🎯 **专注特定任务**：可以限定工具，给专门的行为指令
- 💰 **控制成本**：简单任务可以路由到便宜的模型

**内置子代理**：
- **Explore**——搜索代码库，回答代码问题
- **Plan**——创建详细实现计划

**自定义子代理**（在 `.claude/agents/` 目录创建）：

```markdown
---
name: security-reviewer
description: 审查代码安全漏洞
tools: Read, Grep, Glob, Bash
model: opus
---
你是一个资深安全工程师。请审查代码中的：
- 注入漏洞
- 认证和授权缺陷
- 代码中的密钥泄露
```

**使用**：
```text
"用一个子代理去研究我们的认证系统怎么处理 token 刷新的"
"用子代理审查这段代码有没有边界情况"
```

### Fork 分叉

`/fork <指令>` 生成一个继承当前对话的子代理去干活，你可以继续做别的事。完成后结果返回给你。

### Batch 批量处理

`/batch <指令>` 把大改动拆成 5-30 个独立单元，每个在一个隔离工作树中并行实现。

---

## 18. 后台任务

后台任务让你**不挂着终端也能让 Claude 干活**。

### Agent View（代理视图）

运行 `claude agents` 打开代理视图，可以看到：
- 哪些任务在跑
- 哪些需要你输入
- 哪些已完成

可以偷看会话内容、回复需要输入的任务、接入某个会话接手操作、或用一句话派发新代理。

### 分离会话

`/background [任务]` 把当前会话放到后台继续跑，释放当前终端。

### 后台 Bash

长期运行的命令（构建、测试、开发服务器）可以转到后台。按 `Ctrl+B` 或直接说"在后台运行"。

### 后台托管

一个监管进程管理所有后台会话。状态存在 `~/.claude/projects/<项目>/` 下。文件编辑用工作树隔离。

---

## 19. 会话管理

会话是绑定到项目目录的**已保存对话**。Claude Code 自动保存，随时可以恢复。

### 恢复会话

| 命令 | 作用 |
|------|------|
| `claude --continue` | 恢复当前目录最近一次会话 |
| `claude --resume` | 打开会话选择器 |
| `claude --resume 会话名` | 按名称恢复 |
| `claude --from-pr 编号` | 恢复关联到某个 PR 的会话 |
| `/resume` | 在会话内部切换到另一个会话 |

### 会话选择器快捷键

| 按键 | 功能 |
|------|------|
| `上下` | 在会话间导航 |
| `Enter` | 恢复高亮的会话 |
| `空格` | 预览会话内容 |
| `Ctrl+R` | 重命名高亮会话 |
| `Ctrl+W` | 显示本仓库所有工作树的会话 |
| `Ctrl+A` | 显示本机所有项目的会话 |
| `Ctrl+B` | 只显示当前分支的会话 |
| `/` | 进入搜索模式 |

### 命名会话

好名字让你以后能找到它：
- 启动时：`claude -n auth-refactor`
- 会话中：`/rename auth-refactor`
- 选择器中：高亮后按 `Ctrl+R`

### 分支会话

`/branch 试试别的方案` 复制当前会话并切换到副本。原会话保持不变。适合"试一条新路但不想丢了原来的进度"。

### 上下文管理

- `/clear`——开新对话，旧会话保留可恢复
- `/compact`——压缩历史释放空间
- `/context`——看什么东西占用了上下文
- `/rewind`——回退代码和对话到之前的检查点

### 数据位置

- 对话记录：`~/.claude/projects/<项目>/<会话ID>.jsonl`
- 默认 30 天清理（可用 `cleanupPeriodDays` 配置）

---

## 20. 新手最佳实践

### 1. 始终给 Claude 一个验证方法 🎯

**这是最重要的建议。** 始终提供可运行的检查手段：测试、构建命令、截图对比。这决定了你是在"盯着看"还是"放手让它做"。

```text
"写一个 validateEmail 函数。测试用例：user@example.com 返回 true，
invalid 返回 false。写完跑一下测试"
```

### 2. 先探索，再做计划，最后写代码 📋

1. **探索**："先读一下 /src/auth 目录，理解我们的会话处理逻辑"
2. **计划**（计划模式下）："我想加 Google OAuth，要改哪些文件？写个计划"
3. **实现**（退出计划模式）："按你的计划实现 OAuth 流程"
4. **提交**："写个清晰的 commit message 并开 PR"

小任务（改错字、加日志）跳过计划直接干。

### 3. 需求要具体 ✍️

- ❌ "修一下 bug"
- ✅ "修复登录页的 bug：用户输错密码后页面变空白，应该显示错误提示"

引用具体文件、说明限制条件、指出代码库中的参考模式。

### 4. 善用 @ 引用 📎

输入 `@` 加文件名，比手打路径快得多，而且能给 Claude 精准的上下文。

### 5. 积极管理上下文 🧹

- 不相关的任务之间 `/clear` 一下
- 同一个错误出现两次，`/clear` 后写更清楚的提示
- 临时小问题用 `/btw`，不污染主对话
- 大型探索用子代理，别占主对话空间

### 6. 写好 CLAUDE.md 📝

运行 `/init` 自动生成，然后逐步打磨。保持在 200 行内。只写 Claude 读代码看不出来的东西。

### 7. 建立权限白名单 ✅

第十次批准 `npm run lint` 时你应该已经烦了。加到白名单：

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run test *)"
    ]
  }
}
```

### 8. 从粗到细提问 🔍

接触新代码库时：
1. "给我一个这个项目的整体概览"
2. "讲解一下主要的架构模式"
3. "认证是怎么处理的？"
4. "找到处理用户认证的文件"

### 9. 及时纠偏 🛑

发现 Claude 跑偏了，立刻按 `Esc` 中断。**最好的结果是靠紧密的反馈循环，而不是完美的首次尝试。**

### 10. 避免常见错误 ⚠️

| 错误 | 症状 | 解决方法 |
|------|------|----------|
| **大杂烩会话** | 一个会话里做一堆不相关的事 | `/clear` 隔开 |
| **反复纠正** | 同样问题纠正 3 次以上 | `/clear` + 重写更清楚的提示 |
| **CLAUDE.md 太啰嗦** | Claude 好像不听话 | 砍到 200 行以内，只写关键信息 |
| **信了就过** | 代码看着对但边界情况漏了 | 始终提供验证方式（测试、脚本、截图） |
| **无限探索** | "研究一下 X" 读了上百个文件 | 限定范围或交给子代理 |
| **不设白名单** | 每次都要点批准点到手酸 | 把安全的常用操作用 allow 预设 |

### 11. 装有用的插件 🔌

用强类型语言的话，装个代码智能插件（`/plugin` 进入插件市场），给 Claude 精确的符号导航和自动错误检测。

### 12. 用好状态栏 📊

运行 `/statusline` 配置自定义状态栏，一眼看到上下文用量、Git 状态、花费、模型信息。

---

## 总结

Claude Code 是一个功能强大的 AI 编程助手，核心思想是**用自然语言指挥 AI 帮你写代码**。对于新手：

1. **先装好** → `claude` 启动
2. **先读代码** → 让 Claude 帮你理解项目
3. **小改起手** → 从修 typo、加日志开始建立信任
4. **逐步放手** → 熟悉后让它自己写功能、跑测试、提 PR
5. **及时中断** → 发现不对按 `Esc`，纠正后继续

记住：**Claude 是你的副驾驶，方向盘始终在你手里。**

---

> 官方文档：https://code.claude.com/docs
>
> 快速入门：https://code.claude.com/docs/en/quickstart
>
> 最后更新：2026-06-24
