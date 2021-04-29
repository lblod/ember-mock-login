import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { Response } from 'fetch';

export default class MockLoginComponent extends Component {
  @service session;
  @tracked errorMessage;

  @task
  * loginTask(account) {
    this.errorMessage = '';

    try {
      const user = yield account.get('gebruiker');
      const group = yield user.get('group');
      yield this.session.authenticate('authenticator:mock-login', account, group);
    }
    catch(response) {
      if (response instanceof Response)
        this.errorMessage = `Something went wrong, please try again later (status: ${response.status} ${response.statusText})`;
      else
        this.errorMessage = response.message;
    }
  }
}
