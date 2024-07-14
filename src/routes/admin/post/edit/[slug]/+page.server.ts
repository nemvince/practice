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
  const slug = params.slug as string;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: slug
      }
    });
    if (!post) {
      return error(404, { message: 'Post not found' });
    }
    return {
      post: post
    };
  } catch (e) {
    if ((e as HttpError).status == 404) {
      return error(404, { message: 'Post not found' });
    }
    return error(500, { message: 'Internal Server Error' });
  }
};

export const actions = {
  default: async ({ request, cookies }) => {
    const sessionId = cookies.get(lucia.sessionCookieName);
    if (!sessionId) {
      return fail(401, { error: 'No session found' });
    }
    const { session, user } = await lucia.validateSession(sessionId);
    if (!session || !user || !user.isSiteAdmin) {
      return fail(401, { error: 'No permission' });
    }
    const data = await request.formData();

    if (!data.has('title') || !data.has('content') || !data.has('id')) {
      return fail(400, { error: 'Bad Request' });
    }
    console.log(data);

    const postData: PostData = {
      id: data.get('id') as string,
      published: data.get('publish') == "on" ? true : false,
      title: data.get('title'),
      content: data.get('content'),
      author: user.id,
      fileIDs: []
    };

    // TODO: implement file editing
    // try {
    //   const files = data.getAll('files');
    //   for (const file of files) {
    //     const fileObject = file as File;
    //     const arrayBuffer = await fileObject.arrayBuffer();
    //     const buffer = Buffer.from(new Uint8Array(arrayBuffer));
    //     const fileID = generateRandomString(16, alphabet('A-Z', 'a-z', '0-9'));
    //     await minio.putObject(
    //       MINIO_BUCKET,
    //       fileID,
    //       buffer,
    //       fileObject.size,
    //       function (err: S3Error | null) {
    //         if (err) {
    //           return fail(500, { error: 'Internal Server Error' });
    //         }
    //       }
    //     );
    //     postData.fileIDs.push(fileID);
    //   }
    // } catch (error) {
    //   console.error(error);
    //   return fail(500, { error: 'File Upload Error' });
    // }

    try {
      const post = await prisma.post.update({
        where: {
          id: postData.id
        },
        data: {
          id: postData.id,
          title: postData.title as string,
          content: postData.content as string,
          published: postData.published,
          author: { connect: { id: postData.author } },
          // fileIDs: { set: postData.fileIDs }
        }
      });

      console.log('Post updated: ', post);
      return {
        status: 200,
        body: post
      };
    } catch (error) {
      console.error(error);
      return fail(500, { error: 'Database Error' });
    }
  }
} satisfies Actions;

interface PostData {
  id: string;
  title: FormDataEntryValue | null;
  content: FormDataEntryValue | null;
  published: boolean;
  author: string;
  fileIDs: string[];
}
