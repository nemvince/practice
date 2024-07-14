import { prisma } from '$lib/server/db';

import type { PageServerLoad } from './$types';
export const load = (async () => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true }
  });

  return { feed: posts };
}) satisfies PageServerLoad;
