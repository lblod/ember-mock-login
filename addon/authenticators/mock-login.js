import Base from 'ember-simple-auth/authenticators/base';
import { get } from '@ember/object';

const basePath='/sessions';
const contentType = 'application/vnd.api+json';
export default Base.extend({
  async restore() {
    const url = `${basePath}/current`;
    const result = await fetch(url,{
      type: 'GET',
      headers: new Headers({
        'Content-Type': contentType
      })
    });
    if (result.ok)
      return result;
    else
      throw result;
  },

  async authenticate(account, group) {
    const result = await fetch(basePath, {
      method: 'POST',
      body: JSON.stringify({
        data: {
          relationships: {
            account:{
              data: {
                id: get(account, 'id'),
                type: "accounts"
              }
            },
            group: {
              data: {
                id: get(group, 'id'),
                type: "groups"
              }
            }
          },
          type: "sessions"
        }
      }),
      headers: new Headers({
        'Content-Type': contentType
      })
    });
    if (result.ok)
      return result.json();
    else
      throw result;
  },

  async invalidate() {
    const url = `${basePath}/current`;
    const result = await fetch(url,{
      type: 'DELETE',
      headers: new Headers({
        'Content-Type': contentType
      })
    });
    if (result.ok)
      return result;
    else
      throw result;
  }
});
