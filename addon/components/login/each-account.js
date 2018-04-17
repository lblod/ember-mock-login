import Component from '@ember/component';
import layout from '../../templates/components/login/each-account';

export default Component.extend({
  layout,
  actions: {
    login(account) {
      this.get('login')(account);
    }
  }
});
