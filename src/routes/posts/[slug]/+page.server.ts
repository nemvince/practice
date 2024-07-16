import { error, type HttpError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/db';
import { carta } from '$lib/components/editor/carta';

export const load: PageServerLoad = async ({ params }) => {
  const slug = params.slug as string;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: slug,
        published: true
      },
      include: {
        author: {
          select: {
            avatar_url: true,
            username: true,
            name: true,
            id: true
          }
        }
      }
    });
    if (!post) {
      return error(404, { message: 'Post not found' });
    }
    return {
      post: post,
      rendered: await carta.render(post.content || '')
    };
  } catch (e) {
    if ((e as HttpError).status == 404) {
      return error(404, { message: 'Post not found' });
    }
    return error(500, { message: 'Internal Server Error' });
  }
};
