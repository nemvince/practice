import { error, type HttpError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/db';
import { minio } from '$lib/server/minio';
import { lucia } from '$lib/server/auth';
import { alphabet, generateRandomString } from 'oslo/crypto';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { MINIO_BUCKET } from '$env/static/private';
import type { S3Error } from 'minio';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const posts = await prisma.post.findMany();
    
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