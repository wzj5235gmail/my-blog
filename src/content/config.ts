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