// File: src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Definisikan koleksi untuk 'opini'
const opiniCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Zurnan'),
    // Anda bisa menambahkan field lain seperti 'tags', 'image', dll.
  }),
});

// Definisikan koleksi untuk 'misi'
const misiCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        course: z.string(),
        deadline: z.date(),
    })
});

export const collections = {
  'opini': opiniCollection,
  'misi': misiCollection,
};
