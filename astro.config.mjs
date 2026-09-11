// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// GitHub Pages 项目站点：https://ssshi27.github.io/blog
// 仓库名不是 <用户名>.github.io，因此必须设置 base: '/blog'
// https://astro.build/config
export default defineConfig({
	site: 'https://ssshi27.github.io',
	base: '/blog',
	integrations: [mdx(), sitemap()],
	markdown: {
		syntaxHighlight: {
			type: 'shiki',
			// mermaid 代码块不做语法高亮，交由前端 mermaid.js 渲染为图形
			excludeLangs: ['mermaid'],
		},
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
