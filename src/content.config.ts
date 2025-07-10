// import { glob } from 'astro/loaders';
// import { defineCollection, z } from 'astro:content';

// const blog = defineCollection({
// 	// Load Markdown and MDX files in the `src/content/blog/` directory.
// 	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
// 	// Type-check frontmatter using a schema
// 	schema: ({ image }) => z.object({
// 		title: z.string(),
// 		description: z.string(),
// 		// Transform string to Date object
// 		pubDate: z.coerce.date(),
// 		updatedDate: z.coerce.date().optional(),
// 		heroImage: image().optional(),
// 	}),
// });

// export const collections = { blog };

// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  // Type-check a Zod schema for each post.
  schema: z.object({
    title: z.string(),
    author: z.string(),
    publishDate: z.date(),
    category: z.string(),
    isPublished: z.boolean(),
    // 您还可以添加其他字段，如果需要的话
    // image: z.string().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
};