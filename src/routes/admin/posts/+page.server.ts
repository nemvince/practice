import { error, type HttpError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/db';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'asc'
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
