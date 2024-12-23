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
      type: 'GET',
      credentials: supportedCredentials,
      headers: new Headers({
        'Content-Type': contentType,
      }),
    });
    if (result.ok) return result.json();
    else throw result;
  }

  @waitFor
  async authenticate(accountId, groupId) {
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
    if (result.ok) return result.json();
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
    else throw result;
  }
}
