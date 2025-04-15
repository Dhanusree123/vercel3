import { z } from "zod";

export type CommonSlideProps = {
    uniqueId?:string,
    thumbnailUrl?:string
}

export const titleSchema = (minLength = 3, maxLength = 256) => z
  .string()
  .min(minLength, { message: `Title must be at least ${minLength} characters long.` })
  .max(maxLength, { message: `Title must be less than ${maxLength} characters.` })
  .regex(/(.*[A-Za-z0-9].*)/, {
   message: 'Title must contain at least one letter or number.',
   })
   .trim()
   .transform((value) => value.split(' ').filter(Boolean).join(' '));

export type ISort = {
  key:string;
  order:'asc'|'desc';
} | null      