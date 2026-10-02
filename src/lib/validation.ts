import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const postSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(2, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  excerpt: z.string().optional(),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  featuredImage: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  tagNames: z.array(z.string()).optional(),
  status: z.enum(['DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  visibility: z.enum(['PUBLIC', 'MEMBERS', 'PRIVATE']).default('PUBLIC'),
  scheduledAt: z.string().optional().nullable(),
  isFeatured: z.boolean().optional().default(false),
  isTrending: z.boolean().optional().default(false),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  canonicalUrl: z.string().optional().nullable(),
});

export const categorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
});

export const tagSchema = z.object({
  name: z.string().min(1, 'Tag name is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
});

export const commentSchema = z.object({
  postId: z.string().min(1, 'Post ID is required'),
  parentId: z.string().optional().nullable(),
  authorName: z.string().min(2, 'Name must be at least 2 characters'),
  authorEmail: z.string().email().optional().nullable(),
  content: z.string().min(3, 'Comment must be at least 3 characters').max(2000, 'Comment is too long'),
});

export const newsletterSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
});

export const authorProfileSchema = z.object({
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug is required'),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  socialLinks: z.record(z.string(), z.string()).optional().nullable(),
  website: z.string().optional().nullable(),
  isActive: z.boolean().optional().default(true),
});

export const siteSettingSchema = z.object({
  key: z.string().min(1, 'Key is required'),
  value: z.any(),
});
