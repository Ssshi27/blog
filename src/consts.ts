// 站点全局配置

export const SITE_TITLE = '学习博客';
export const SITE_DESCRIPTION = '把高质量学习内容沉淀为结构化、可检索的个人知识库';

// GitHub 仓库地址（配置后文章页会显示“查看 Markdown 源文件”链接）
// 示例: 'https://github.com/yourname/learning-blog'
export const GITHUB_REPO = '';

// 固定分类字典：新增文章优先使用已有分类，避免创建过多相似分类
export const CATEGORIES: Record<string, string> = {
	'computer-basics': '计算机基础',
	programming: '编程语言',
	algorithms: '数据结构与算法',
	networking: '网络技术',
	os: '操作系统',
	embedded: '嵌入式开发',
	database: '数据库',
	ai: '人工智能',
	cloud: '云计算',
	devops: 'DevOps',
	'software-engineering': '软件工程',
	projects: '项目实战',
	troubleshooting: '问题排查',
	notes: '学习笔记',
	tools: '工具使用',
};

export const DIFFICULTY_LABELS: Record<string, string> = {
	beginner: '入门',
	intermediate: '进阶',
	advanced: '高级',
};

export const STATUS_LABELS: Record<string, string> = {
	inbox: '收集箱',
	draft: '草稿',
	'needs-review': '待审核',
	published: '已发布',
	archived: '已归档',
};
