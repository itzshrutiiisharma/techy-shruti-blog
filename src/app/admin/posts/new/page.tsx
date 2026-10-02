'use client';

import React from 'react';
import { PostEditor } from '@/components/Admin/PostEditor';

export default function NewPostPage() {
  return <PostEditor isEdit={false} />;
}
