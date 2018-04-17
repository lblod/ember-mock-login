import Component from '@ember/component';
import layout from '../../templates/components/login/each-account';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,
  session: service('session'),
  actions: {
    login(account) {
      this.set('loading', true);
      this.set('errorMessage', '');
      this.get('session').authenticate('authenticator:mock-login', account, account.group).then( () => {
        this.set('loading', false);
      }).catch((response) => {
        this.set('loading', false);
        if (response instanceof Response)
          this.set('errorMessage', `Something went wrong, please try again later (status: ${response.status} ${response.statusText})`);
        else
          this.set('errorMessage', response.message);
      });
    }
  }
});
