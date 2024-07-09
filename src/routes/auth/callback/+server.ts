import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { githubAuth, lucia } from "$lib/server/auth";
import { prisma } from "$lib/server/db";

import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
  const code = event.url.searchParams.get("code");
  const state = event.url.searchParams.get("state");
  const storedState = event.cookies.get("github_oauth_state") ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400
    });
  }

  try {
    const tokens = await githubAuth.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    const githubUser: GitHubUser = await githubUserResponse.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        github_id: githubUser.id
      }
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      });

      prisma.user.update({
        where: {
          id: existingUser.id
        },
        select: {
          avatar_url: true,
          name: true
        },
        data: {
          avatar_url: githubUser.avatar_url,
          name: githubUser.name
        }
      });
    } else {
      const userId = generateIdFromEntropySize(10);

      await prisma.user.create({
        data: {
          id: userId,
          github_id: githubUser.id,
          username: githubUser.login,
          avatar_url: githubUser.avatar_url,
          name: githubUser.name
        }
      });

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      });
    }
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/"
      }
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400
      });
    }
    return new Response(null, {
      status: 500
    });
  }
}

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  name: string;
}
