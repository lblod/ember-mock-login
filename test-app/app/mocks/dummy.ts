import { setupWorker } from 'msw/browser';
import { delay, http, HttpResponse, type JsonBodyType } from 'msw';

// https://github.com/lblod/mock-login-service/tree/master#mock-login-microservice
export const mockLoginServiceHandlers = {
  login: http.post('/mock/sessions', async ({ request }) => {
    const requestBody = (await request.json()) as {
      data: {
        relationships: {
          account: { data: { id: string } };
          group: { data: { id: string } };
        };
      };
    };
    const sessionId = crypto.randomUUID();
    const accountId = requestBody.data.relationships.account.data.id;
    const groupId = requestBody.data.relationships.group.data.id;

    await delay();

    return HttpResponse.json(
      {
        links: {
          self: 'sessions/current',
        },
        data: {
          type: 'sessions',
          id: sessionId,
        },
        relationships: {
          account: {
            links: {
              related: `/accounts/${accountId}`,
            },
            data: {
              type: 'accounts',
              id: accountId,
            },
          },
          group: {
            links: {
              related: `/groups/${groupId}`,
            },
            data: {
              type: 'groups',
              id: groupId,
            },
          },
        },
      },
      { status: 201 },
    );
  }),
  restore: http.get('/mock/sessions/current', async () => {
    // This is a private implementation detail that could break when updating but we don't have a different option, other than always invalidating the session on restore
    const ESA_LOCAL_STORAGE_KEY = 'ember_simple_auth-session';
    const storedSessionData = localStorage.getItem(ESA_LOCAL_STORAGE_KEY);

    if (!storedSessionData) {
      return HttpResponse.json();
    }

    try {
      const sessionData = JSON.parse(
        storedSessionData,
      ) as unknown as JsonBodyType;
      await delay();

      return HttpResponse.json(sessionData);
    } catch {
      throw new Error('Invalid session');
    }
  }),
  logout: http.delete('/mock/sessions/current', async () => {
    await delay();
    return new HttpResponse(null, {
      status: 204,
    });
  }),
};

export const dummyAppWorker = setupWorker(
  mockLoginServiceHandlers.login,
  mockLoginServiceHandlers.restore,
  mockLoginServiceHandlers.logout,
);
