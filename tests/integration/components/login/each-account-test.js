import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | login/each-account', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('accounts', [
      "test",
      "account"
    ])
    this.noop = () => {};

    await render(hbs`
      <Login::EachAccount @login={{this.noop}} @accounts={{this.accounts}} as |account|>
        {{account}}
      </Login::EachAccount>
    `);

    assert.dom(this.element).hasText('test account');
  });
});
