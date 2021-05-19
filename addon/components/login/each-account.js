import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class EachAccountComponent extends Component {
  @action
  login(account) {
    this.args.login(account);
  }
}
