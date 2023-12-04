import Component from '@glimmer/component';
import { deprecate } from '@ember/debug';

export default class EachAccount extends Component {
  constructor() {
    super(...arguments);

    deprecate(
      `The <login.each-account> component is deprecated. Use the yielded login handler with your own HTML instead. For example:

<MockLogin as |login|>
  {{#if login.isLoading}}
    loading...
  {{else}}
    {{#if login.errorMessage}}
      {{login.errorMessage}}
    {{/if}}

    <ul>
      {{#each this.accounts as |account|}}
        <li>
          <button type="button" {{on "click" (fn login.login account.id account.gebruiker.group.id)}}>
            <strong>{{account.gebruiker.firstName}} {{account.gebruiker.lastName}}</strong> {{account.gebruiker.group.name}}
          </button>
        </li>
      {{/each}}
    </ul>
  {{/if}}
</MockLogin>

`,
      false,
      {
        id: '@lblod/ember-mock-login.each-account-component',
        for: '@lblod/ember-mock-login',
        since: {
          enabled: '0.8.0',
        },
        until: '0.9.0',
      }
    );
  }
}
