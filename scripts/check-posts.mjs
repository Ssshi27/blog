#!/usr/bin/env node
/**
 * 内容质量与安全检查
 * - 校验 Front Matter 必填字段与 status 取值
 * - 敏感信息扫描（API Key / Token / 密码 / 私钥等）
 * - 图片引用路径检查
 * 用法: node scripts/check-posts.mjs
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const blogDir = join(root, "src", "content", "blog");

const VALID_STATUS = ["inbox", "draft", "needs-review", "published", "archived"];
const VALID_DIFFICULTY = ["beginner", "intermediate", "advanced"];
const REQUIRED_FIELDS = [
  "title", "slug", "date", "category", "tags",
  "difficulty", "status", "summary",
];

const SECRET_PATTERNS = [
  { name: "私钥", re: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { name: "GitHub Token", re: /gh[pousr]_[A-Za-z0-9]{36,}/ },
  { name: "AWS Access Key", re: /AKIA[0-9A-Z]{16}/ },
  { name: "通用 API Key 赋值", re: /(api[_-]?key|apikey)\s*[:=]\s*["'][A-Za-z0-9_\-]{16,}["']/i },
  { name: "通用 Token 赋值", re: /(token|secret)\s*[:=]\s*["'][A-Za-z0-9_\-\.]{20,}["']/i },
  { name: "密码赋值", re: /(password|passwd)\s*[:=]\s*["'][^"']{6,}["']/i },
];

let errors = 0;
let warnings = 0;

function fail(file, msg) { errors++; console.error(`  [错误] ${file}: ${msg}`); }
function warn(file, msg) { warnings++; console.warn(`  [警告] ${file}: ${msg}`); }

function parseFrontMatter(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const data = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
  }
  return data;
}

if (!existsSync(blogDir)) {
  console.log("尚未创建 src/content/blog 目录，跳过检查。");
  process.exit(0);
}

const files = readdirSync(blogDir).filter((f) => f.endsWith(".md"));
console.log(`检查 ${files.length} 篇文章...`);

for (const file of files) {
  const path = join(blogDir, file);
  const content = readFileSync(path, "utf8");

  const fm = parseFrontMatter(content);
  if (!fm) { fail(file, "缺少 Front Matter"); continue; }

  for (const field of REQUIRED_FIELDS) {
    if (!(field in fm)) fail(file, `Front Matter 缺少字段: ${field}`);
    else if (field !== "tags" && !fm[field]) warn(file, `字段为空: ${field}`);
  }

  if (fm.status && !VALID_STATUS.includes(fm.status))
    fail(file, `status 非法: ${fm.status}（可选: ${VALID_STATUS.join("/")}）`);
  if (fm.difficulty && !VALID_DIFFICULTY.includes(fm.difficulty))
    fail(file, `difficulty 非法: ${fm.difficulty}`);
  if (fm.slug && !/^[a-z0-9-]+$/.test(fm.slug))
    fail(file, `slug 含非法字符: ${fm.slug}`);
  if (fm.quality_score && fm.status === "published" && Number(fm.quality_score) < 20)
    warn(file, `published 文章质量评分低于 20: ${fm.quality_score}`);
  if (fm.title && fm.summary && fm.title.replace(/"/g, "") === fm.summary.replace(/"/g, ""))
    warn(file, "摘要与标题相同");

  // 敏感信息扫描
  for (const { name, re } of SECRET_PATTERNS) {
    if (re.test(content)) fail(file, `检测到疑似敏感信息: ${name}`);
  }

  // 图片路径检查
  for (const img of content.matchAll(/!\[[^\]]*\]\((\/images\/[^)]+)\)/g)) {
    if (!existsSync(join(root, "public", img[1])))
      warn(file, `图片不存在: public${img[1]}`);
  }
}

console.log(`\n检查完成: ${errors} 个错误, ${warnings} 个警告`);
process.exit(errors > 0 ? 1 : 0);
