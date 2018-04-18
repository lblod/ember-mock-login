import Component from '@ember/component';
import layout from '../templates/components/mock-logout';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,
  tagName: 'button',
  session: service('session'),
  click() {
    this.get('session').invalidate('authenticator:mock-login');
  }
});
