import { error, type HttpError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/db';
import { lucia } from '$lib/server/auth';
import { fail } from '@sveltejs/kit';
import { minio } from '$lib/server/minio';
import { MINIO_BUCKET } from '$env/static/private';
import type { S3Error } from 'minio';

export const load: PageServerLoad = async (event) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'asc'
      },
      where: {
        authorId: event.locals.user?.id
      }
    });

    return {
      posts: posts
    };
  } catch (e) {
    if ((e as HttpError).status == 404) {
      return error(404, { message: 'Post not found' });
    }
    return error(500, { message: 'Internal Server Error' });
  }
};

export const actions = {
  delete: async ({ request, cookies }) => {
    const sessionId = cookies.get(lucia.sessionCookieName);
    if (!sessionId) {
      return fail(401, { error: 'No session found' });
    }
    const { session, user } = await lucia.validateSession(sessionId);
    if (!session || !user || !user.isSiteAdmin) {
      return fail(401, { error: 'No permission' });
    }
    const data = await request.formData();

    if (!data.has('id')) {
      return fail(404, { error: 'No post ID' });
    }

    const postId = data.get('id') as string;
    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      return fail(404, { error: 'Post not found' });
    }

    const files = post?.fileIDs;
    if (files.length > 0) {
      try {
        minio.removeObjects(MINIO_BUCKET, files);
      } catch (e) {
        const error = e as S3Error;
        if (error.code == 'NoSuchBucket') {
          return fail(404, { error: 'Bucket not found' });
        }
        return fail(500, { error: 'Internal Server Error' });
      }
    }

    try {
      await prisma.post.delete({
        where: {
          id: postId
        }
      });
    } catch (e) {
      const error = e as HttpError;
      if (error.status == 404) {
        return fail(404, { error: 'Post not found' });
      }
      return fail(500, { error: 'Database error' });
    }

    return {
      status: 200
    };
  },
  changePublish: async ({ request, cookies }) => {
    const sessionId = cookies.get(lucia.sessionCookieName);
    if (!sessionId) {
      return fail(401, { error: 'No session found' });
    }
    const { session, user } = await lucia.validateSession(sessionId);
    if (!session || !user || !user.isSiteAdmin) {
      return fail(401, { error: 'No permission' });
    }
    const data = await request.formData();

    if (!data.has('id')) {
      return fail(404, { error: 'No post ID' });
    }

    const postId = data.get('id') as string;
    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      return fail(404, { error: 'Post not found' });
    }
    try {
      await prisma.post.update({
        where: {
          id: post.id
        },
        data: {
          published: !post.published
        }
      });
    } catch (e) {
      const error = e as HttpError;
      if (error.status == 404) {
        return fail(404, { error: 'Post not found' });
      }
      return fail(500, { error: 'Database error' });
    }

    return {
      status: 200,
      body: post
    };
  }
};
