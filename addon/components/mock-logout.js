import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MockLogoutComponent extends Component {
  @service session;

  @action
  logout() {
    this.session.invalidate();
  }
}
