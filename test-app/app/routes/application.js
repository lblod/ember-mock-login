import Route from '@ember/routing/route';
import { dummyAppWorker } from '../mocks/dummy';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service session;

  async beforeModel() {
    await dummyAppWorker.start();
    await this.session.setup();
  }

  willDestroy() {
    super.willDestroy(...arguments);
    dummyAppWorker.stop();
  }
}
