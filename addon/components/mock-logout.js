import Component from '@glimmer/component';
import { deprecate } from '@ember/debug';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MockLogoutComponent extends Component {
  @service session;

  constructor() {
    super(...arguments);

    deprecate(
      'The <MockLogout> component is deprecated. Use the `invalidate` method of the `session` service instead.',
      false,
      {
        id: '@lblod/ember-mock-login.mock-logout-component',
        for: '@lblod/ember-mock-login',
        since: {
          enabled: '0.8.0',
        },
        until: '0.9.0',
      }
    );
  }

  @action
  logout() {
    this.session.invalidate();
  }
}
