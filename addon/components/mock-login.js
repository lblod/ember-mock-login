import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { Response } from 'fetch';

export default class MockLoginComponent extends Component {
  @service session;
  @tracked errorMessage;

  // This uses the "not so clean" alternative to support both ember-concurrency v1 and v2
  // without having to install ember-concurrency-decorators.
  // TODO: use "pretty" decorators once all projects are using ember-concurrency v2
  @(task(function*(accountId, groupId) {
    this.errorMessage = '';

    try {
      yield this.session.authenticate('authenticator:mock-login', accountId, groupId);
    }
    catch(response) {
      if (response instanceof Response)
        this.errorMessage = `Something went wrong, please try again later (status: ${response.status} ${response.statusText})`;
      else
        this.errorMessage = response.message;
    }
  }))
  loginTask;
}
