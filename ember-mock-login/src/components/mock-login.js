import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { waitFor } from '@ember/test-waiters';

export default class MockLoginComponent extends Component {
  @service session;
  @tracked errorMessage;
  @tracked isRunning = false;

  @action
  @waitFor
  async login(accountId, groupId) {
    this.errorMessage = '';
    this.isRunning = true;

    try {
      await this.session.authenticate(
        'authenticator:mock-login',
        accountId,
        groupId,
      );
    } catch (response) {
      if (response instanceof Response)
        this.errorMessage = `Something went wrong, please try again later (status: ${response.status} ${response.statusText})`;
      else this.errorMessage = response.message;
    } finally {
      this.isRunning = false;
    }
  }
}
