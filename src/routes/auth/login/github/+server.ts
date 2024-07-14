import { redirect } from '@sveltejs/kit';
import { generateState } from 'arctic';
import { githubAuth } from '$lib/server/auth';

import type { RequestEvent } from '@sveltejs/kit';

export const GET = async (event: RequestEvent): Promise<Response> => {
  const state = generateState();
  const url = await githubAuth.createAuthorizationURL(state);
  const redirectTo = event.url.searchParams.get('redirectTo');

  event.cookies.set('github_oauth_redirect', redirectTo || '', {
    path: '/',
    maxAge: 60 * 10
  });

  event.cookies.set('github_oauth_state', state, {
    path: '/',
    secure: import.meta.env.PROD,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax'
  });

  redirect(302, url.toString());
};
