import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { hash } from '@ember/helper';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { waitFor } from '@ember/test-waiters';
import type SessionService from 'ember-simple-auth/services/session';

export interface MockLoginSignature {
  Blocks: {
    default: [
      {
        errorMessage: string;
        loading: boolean;
        isLoading: boolean;
        login: (accountId: string, groupId: string) => Promise<void>;
      },
    ];
  };
}

export default class MockLogin extends Component<MockLoginSignature> {
  @service declare session: SessionService;
  @tracked errorMessage = '';
  @tracked isRunning = false;

  @action
  @waitFor
  async login(accountId: string, groupId: string) {
    this.errorMessage = '';
    this.isRunning = true;

    try {
      await this.session.authenticate(
        'authenticator:mock-login',
        accountId,
        groupId,
      );
    } catch (response: unknown) {
      if (response instanceof Response)
        this.errorMessage = `Something went wrong, please try again later (status: ${response.status} ${response.statusText})`;
      else if (response instanceof Error) this.errorMessage = response?.message;
    } finally {
      this.isRunning = false;
    }
  }

  <template>
    {{yield
      (hash
        errorMessage=this.errorMessage
        loading=this.isRunning
        isLoading=this.isRunning
        login=this.login
      )
    }}
  </template>
}
