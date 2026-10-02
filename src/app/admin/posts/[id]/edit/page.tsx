'use client';

import React, { useState, useEffect } from 'react';
import { PostEditor } from '@/components/Admin/PostEditor';
import { useParams } from 'next/navigation';

export default function EditPostPage() {
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setPost(data.data);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-slate-400 text-xs">
        <span className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mr-2" />
        Loading article data...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-slate-400 text-xs">
        Article not found or failed to load.
      </div>
    );
  }

  return <PostEditor initialData={post} isEdit={true} />;
}
