import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser, hasPermission } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse, forbiddenResponse, serverErrorResponse } from '@/lib/api-response';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorizedResponse();
    if (!hasPermission(user.role, 'AUTHOR')) return forbiddenResponse();

    const contentType = req.headers.get('content-type') || '';

    // Check if JSON (e.g. adding image via URL)
    if (contentType.includes('application/json')) {
      const body = await req.json();
      const { url, filename, altText } = body;
      if (!url) return errorResponse('Image URL is required', 'MISSING_URL', 400);

      const media = await prisma.media.create({
        data: {
          filename: filename || 'remote-image-' + Date.now() + '.jpg',
          url,
          type: 'image/jpeg',
          size: 102400,
          altText: altText || '',
          uploadedById: user.id,
        },
      });

      return successResponse(media, undefined, 201);
    }

    // Handle Multipart Form Data
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const altText = (formData.get('altText') as string) || '';

    if (!file) {
      return errorResponse('No file provided', 'MISSING_FILE', 400);
    }

    // Validate MIME type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return errorResponse('Only JPG, PNG, WebP, GIF, and SVG images are allowed', 'INVALID_FILE_TYPE', 400);
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return errorResponse('File size exceeds 10MB limit', 'FILE_TOO_LARGE', 400);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/uploads directory
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.name) || '.jpg';
    const cleanBaseName = path.basename(file.name, extension).replace(/[^a-zA-Z0-9_-]/g, '');
    const filename = `${cleanBaseName}-${uniqueSuffix}${extension}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    const media = await prisma.media.create({
      data: {
        filename: file.name,
        url: publicUrl,
        type: file.type,
        size: file.size,
        altText,
        uploadedById: user.id,
      },
    });

    return successResponse(media, undefined, 201);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to upload media');
  }
}
