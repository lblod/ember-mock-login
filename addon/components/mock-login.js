import Component from '@ember/component';
import layout from '../templates/components/mock-login';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';
import { Response } from 'fetch';

export default Component.extend({
  layout,
  session: service('session'),
  login: task( function * (account){
    this.set('errorMessage', '');
    try {
      const user = yield get(account,'user');
      const group = yield get(user, 'group');
      yield this.get('session').authenticate('authenticator:mock-login', account, group );
      this.set('errorMessage', '');
    }
    catch(response) {
      if (response instanceof Response)
        this.set('errorMessage', `Something went wrong, please try again later (status: ${response.status} ${response.statusText})`);
      else
        this.set('errorMessage', response.message);
    }
  }),
  actions: {
    login(account) {
      this.get('login').perform(account);
    }
  }
});
