import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// 加载 src/content/blog/ 下的 Markdown / MDX 文件，可按分类建子目录
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// 文章 Front Matter 统一模板（详见 scripts/new-post.mjs）
	schema: z.object({
		title: z.string(),
		slug: z.string().optional(),
		date: z.coerce.date(),
		updated: z.coerce.date().optional(),
		category: z.string(),
		subcategory: z.string().optional(),
		tags: z.array(z.string()).default([]),
		difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
		status: z
			.enum(['inbox', 'draft', 'needs-review', 'published', 'archived'])
			.default('draft'),
		quality_score: z.number().min(0).max(25).optional(),
		source: z.string().optional(),
		author: z.string().default('User'),
		summary: z.string(),
		cover_image: z.string().optional(),
	}),
});

export const collections = { blog };
