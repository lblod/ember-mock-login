import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, render, settled, waitUntil } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { dummyAppWorker } from 'test-app/mocks/dummy';

import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';

module('Integration | Component | mock-login', function (hooks) {
  setupRenderingTest(hooks);

  test('it yields a login action and loading state', async function (assert) {
    const worker = dummyAppWorker;
    await worker.start();

    const session = this.owner.lookup('service:session');
    assert.false(session.isAuthenticated);

    const LOADING_STATE = '[data-test-loading]';

    await render(hbs`
      <MockLogin as |login|>
        <div data-test-loading>{{login.isLoading}}</div>

        <button type="button" {{on "click" (fn login.login "1" "1")}}>Login</button>
      </MockLogin>
    `);

    assert.dom(LOADING_STATE).hasText('false');
    click('button'); // We intentionally don't await the click so we can test the loading state

    await waitUntil(
      function () {
        return find(LOADING_STATE).textContent.includes('true');
      },
      { timeout: 2000 },
    );

    assert
      .dom(LOADING_STATE)
      .hasText(
        'true',
        'isLoading returns true while the request is still going',
      );

    await settled();

    assert
      .dom(LOADING_STATE)
      .hasText(
        'false',
        'isLoading switches back to false after the request is done',
      );

    assert.true(session.isAuthenticated);

    worker.stop();
  });

  test('it yields an error message if the login request fails', async function (assert) {
    const failedLoginHandler = http.post('/mock/sessions', async () => {
      return new HttpResponse('account not found.', { status: 400 });
    });

    const worker = setupWorker(failedLoginHandler);
    await worker.start();

    const session = this.owner.lookup('service:session');
    assert.false(session.isAuthenticated);

    const ERROR_MESSAGE = '[data-test-error]';

    await render(hbs`
      <MockLogin as |login|>
        <div data-test-error>{{login.errorMessage}}</div>
        <button type="button" {{on "click" (fn login.login "1" "1")}}>Login</button>
      </MockLogin>
    `);

    assert.dom(ERROR_MESSAGE).hasNoText('errorMessage is empty initially');
    await click('button');
    assert
      .dom(ERROR_MESSAGE)
      .includesText(
        'Something went wrong',
        'it returns a generic error message if the request fails',
      );
    assert.false(session.isAuthenticated);

    worker.stop();
  });
});
