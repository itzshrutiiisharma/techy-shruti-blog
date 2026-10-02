import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
    [key: string]: any;
  };
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export function successResponse<T>(data: T, meta?: ApiResponse['meta'], status = 200) {
  const body: ApiResponse<T> = {
    success: true,
    data,
    ...(meta && { meta }),
  };
  return NextResponse.json(body, { status });
}

export function errorResponse(message: string, code = 'BAD_REQUEST', status = 400, details?: any) {
  const body: ApiResponse = {
    success: false,
    error: {
      code,
      message,
      ...(details && { details }),
    },
  };
  return NextResponse.json(body, { status });
}

export function unauthorizedResponse(message = 'Unauthorized access') {
  return errorResponse(message, 'UNAUTHORIZED', 401);
}

export function forbiddenResponse(message = 'Forbidden: insufficient permissions') {
  return errorResponse(message, 'FORBIDDEN', 403);
}

export function notFoundResponse(message = 'Resource not found') {
  return errorResponse(message, 'NOT_FOUND', 404);
}

export function serverErrorResponse(error: any, message = 'An unexpected server error occurred') {
  console.error('[API Server Error]:', error);
  return errorResponse(
    process.env.NODE_ENV === 'development' && error?.message ? error.message : message,
    'INTERNAL_SERVER_ERROR',
    500
  );
}
