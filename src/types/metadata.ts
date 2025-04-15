import { z } from 'zod';

export const MetadataSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
    keywords: z.array(z.string()).optional(),
  })
  .superRefine((values, ctx) => {
    const { title, description, content } = values;
    if (!title && (description || content)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['title'],
        message: 'Title is required.',
      });
    }
    if (title && title.length < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['title'],
        message: 'Title must be at least 3 characters long.',
      });
    }
    if (!description && (title || content)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['description'],
        message: 'Description is required.',
      });
    }
    if (description && description.length < 32) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['description'],
        message: 'Description must be at least 32 characters long.',
      });
    }
    if (!content && (title || description)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['content'],
        message: 'Content is required.',
      });
    }
    if (content && content.length < 32) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['content'],
        message: 'Content must be at least 32 characters long.',
      });
    }
  })
  .optional();

export type IMetadata = z.infer<typeof MetadataSchema>;
