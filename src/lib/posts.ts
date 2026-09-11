import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** 已发布文章（含归档），按日期倒序 */
export async function getPublishedPosts(): Promise<Post[]> {
	const posts = await getCollection('blog', ({ data }) => data.status === 'published');
	return sortByDate(posts);
}

/** 已归档文章 */
export async function getArchivedPosts(): Promise<Post[]> {
	const posts = await getCollection('blog', ({ data }) => data.status === 'archived');
	return sortByDate(posts);
}

/** 已发布 + 已归档（用于生成文章详情页路由） */
export async function getVisiblePosts(): Promise<Post[]> {
	const posts = await getCollection(
		'blog',
		({ data }) => data.status === 'published' || data.status === 'archived',
	);
	return sortByDate(posts);
}

export function sortByDate(posts: Post[]): Post[] {
	return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** 文章 URL 路径 */
export function postUrl(post: Post): string {
	return `/blog/${post.id}/`;
}

/** 相关文章：同分类优先，其次共享标签，最多 count 篇 */
export function getRelatedPosts(post: Post, all: Post[], count = 3): Post[] {
	return all
		.filter((p) => p.id !== post.id)
		.map((p) => {
			let score = 0;
			if (p.data.category === post.data.category) score += 2;
			score += p.data.tags.filter((t) => post.data.tags.includes(t)).length;
			return { p, score };
		})
		.filter(({ score }) => score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, count)
		.map(({ p }) => p);
}
