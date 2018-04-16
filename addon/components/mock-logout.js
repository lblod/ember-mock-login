import Component from '@ember/component';
import layout from '../templates/components/mock-logout';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,
  session: service('session'),
  actions: {
    logout(user) {
      this.get('session').invalidate('authenticator:mock-login');
    }
  }
});
