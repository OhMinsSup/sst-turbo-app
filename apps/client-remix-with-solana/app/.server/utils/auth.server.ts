import { redirect } from '@remix-run/node';
import { safeRedirect } from 'remix-utils/safe-redirect';

import { sessionStorage } from '~/.server/utils/session.server';
import { navigation } from '~/constants/navigation';
import { prisma } from './db.server';
import { combineResponseInits } from './request.server';

export const sessionKey = 'solana.sessionId';

export async function getUserId(request: Request) {
  const cookieSession = await sessionStorage.getSession(
    request.headers.get('cookie'),
  );
  const sessionId = cookieSession.get(sessionKey);
  if (!sessionId) {
    return null;
  }

  const session = await prisma.session.findUnique({
    select: { user: { select: { id: true } } },
    where: { id: sessionId, expirationDate: { gt: new Date() } },
  });

  if (!session) {
    throw await logout({ request });
  }

  if (!session.user) {
    throw await logout({ request });
  }

  return session.user.id;
}

export async function logout(
  {
    request,
    redirectTo = navigation.home,
  }: {
    request: Request;
    redirectTo?: string;
  },
  responseInit?: ResponseInit,
) {
  const cookieSession = await sessionStorage.getSession(
    request.headers.get('cookie'),
  );
  throw redirect(
    safeRedirect(redirectTo),
    combineResponseInits(responseInit, {
      headers: {
        'set-cookie': await sessionStorage.destroySession(cookieSession),
      },
    }),
  );
}

export async function requireUserId(
  request: Request,
  { redirectTo }: { redirectTo?: string | null } = {},
) {
  const userId = await getUserId(request);
  if (!userId) {
    const requestUrl = new URL(request.url);
    redirectTo =
      redirectTo === null
        ? null
        : redirectTo ?? `${requestUrl.pathname}${requestUrl.search}`;
    const loginParams = redirectTo ? new URLSearchParams({ redirectTo }) : null;
    const loginRedirect = ['/login', loginParams?.toString()]
      .filter(Boolean)
      .join('?');
    throw redirect(loginRedirect);
  }
  return userId;
}

export async function requireAnonymous(request: Request) {
  const userId = await getUserId(request);
  if (userId) {
    throw redirect(safeRedirect(navigation.home));
  }
}

export async function requireUser(request: Request) {
  const userId = await requireUserId(request);
  const user = await prisma.user.findUnique({
    select: { id: true, name: true },
    where: { id: userId },
  });
  if (!user) {
    throw await logout({ request });
  }
  return user;
}