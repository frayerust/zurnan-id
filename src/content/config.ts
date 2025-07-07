import { defineCollection, z } from 'astro:content';

// Definisikan koleksi untuk 'opini'
const opiniCollection = defineCollection({
  type: 'content', // atau 'data'
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Zurnan'),
  }),
});

export const collections = {
  'opini': opiniCollection,
};