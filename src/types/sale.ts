import { z } from 'zod';

import { titleSchema } from './global';
import { MetadataSchema } from './metadata';

export const SaleSchema = z.object({
  id: z.string(),
  title: titleSchema(8),
  slug: z.string().min(8, { message: 'Slug must be atleast 8 characters.' }),
  active: z.boolean(),
  metadata: MetadataSchema.optional(),
});

export const NewSaleSchema = SaleSchema.omit({
  id: true,
  active: true,
});

export const UpdateSaleSchema = SaleSchema.omit({
  id: true,
});

export type ISale = z.infer<typeof SaleSchema>;
