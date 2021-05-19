import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | login/each-account', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('accounts', [
      "test",
      "account"
    ])
    await render(hbs`
      <Login::EachAccount @accounts={{this.accounts}} as |account|>
        {{account}}
      </Login::EachAccount>
    `);

    assert.dom(this.element).hasText('test account');
  });
});
