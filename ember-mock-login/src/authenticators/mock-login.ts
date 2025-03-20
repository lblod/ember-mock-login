import { waitFor } from '@ember/test-waiters';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

const basePath = '/mock/sessions';
const contentType = 'application/vnd.api+json';
const supportedCredentials = 'same-origin';

export default class MockLoginAuthenticator extends BaseAuthenticator {
  @waitFor
  async restore() {
    const url = `${basePath}/current`;
    const result = await fetch(url, {
      credentials: supportedCredentials,
      headers: new Headers({
        'Content-Type': contentType,
      }),
    });
    if (result.ok) return (await result.json()) as unknown;
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    else throw result;
  }

  @waitFor
  async authenticate(accountId: string, groupId: string) {
    const result = await fetch(basePath, {
      method: 'POST',
      body: JSON.stringify({
        data: {
          relationships: {
            account: {
              data: {
                id: accountId,
                type: 'accounts',
              },
            },
            group: {
              data: {
                id: groupId,
                type: 'groups',
              },
            },
          },
          type: 'sessions',
        },
      }),
      credentials: supportedCredentials,
      headers: new Headers({
        'Content-Type': contentType,
      }),
    });
    if (result.ok) return (await result.json()) as unknown;
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    else throw result;
  }

  @waitFor
  async invalidate() {
    const url = `${basePath}/current`;
    const result = await fetch(url, {
      method: 'DELETE',
      credentials: supportedCredentials,
      headers: new Headers({
        'Content-Type': contentType,
      }),
    });
    if (result.ok) return result;
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    else throw result;
  }
}
