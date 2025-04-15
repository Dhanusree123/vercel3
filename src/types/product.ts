import { z } from 'zod';

import { titleSchema } from './global';

const priceHistorySchema = z.object({
    date: z.string(),
    mrp: z.coerce.number().gt(0, { message: 'MRP must be greater than 0.' }),
    listPrice: z.coerce.number().gt(0, { message: 'List price must be greater than 0.' }),
    dealPrice: z.coerce.number().gt(0, { message: 'Deal price must be greater than 0.' }),
  });

export const ProductSchema = z.object({
  id: z.string(),
  title: titleSchema(3),
  slug: z.string().min(16, { message: 'URL Slug must be longer than 16 characters.' }),
  description: z.string().min(32, { message: 'Description must be longer than 32 characters.' }),
  brand: z.string().optional(),
  brandId: z.string().min(1, { message: 'Brand is required.' }),
  categoryId: z.string().min(1, { message: 'Category is required.' }),
  categoryPath: z.string().min(1, { message: 'Category path is required.' }),
  store: z.string().optional(),
  storeId: z.string().min(1, { message: 'Store is required.' }),
  mrp: z.coerce.number().gt(0, { message: 'MRP must be greater than 0.' }),
  listPrice: z.coerce.number().gt(0, { message: 'List price must be greater than 0.' }),
  dealPrice: z.coerce.number().gt(0, { message: 'Deal price must be greater than 0.' }),
  rating: z.coerce.number().min(0).max(5).optional(),
  reviews: z.coerce.number().int().min(0).optional(),
  code: z.string().min(1, { message: 'CODE is required.' }),
  images: z.array(z.string().url()).min(1, {
    message: 'Please add at least one image.',
  }),
  handPicked: z.boolean(),
  expired: z.boolean(),
  active: z.boolean(),
  priceHistory: z.array(priceHistorySchema),
  sales: z.array(z.string()).optional(),
});

export const NewProductSchema = ProductSchema.omit({
  id: true,
  brand: true,
  categoryPath: true,
  store: true,
  expired: true,
  active: true,
  priceHistory: true,
})
  .refine((data) => data.listPrice <= data.mrp, {
    path: ['listPrice'],
    message: 'List price must be less than or equal to MRP',
  })
  .refine((data) => data.dealPrice <= data.listPrice, {
    path: ['dealPrice'],
    message: 'Deal price must be less than or equal to List Price',
  });

export const UpdateProductSchema = ProductSchema.omit({
  id: true,
  brand: true,
  categoryPath: true,
  store: true,
  priceHistory: true,
})
  .refine((data) => data.listPrice <= data.mrp, {
    path: ['listPrice'],
    message: 'List price must be less than or equal to MRP',
  })
  .refine((data) => data.dealPrice <= data.listPrice, {
    path: ['dealPrice'],
    message: 'Deal price must be less than or equal to List Price',
  });

export type IProduct = z.infer<typeof ProductSchema>;
export type IPriceHistory = z.infer<typeof priceHistorySchema>;