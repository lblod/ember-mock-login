import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service('session'),
  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
  accounts: [
    {
      id: 'e842a393-1252-4e06-bab4-18df36c53808',
      provider: 'mock',
      user: {
        id: '1',
        firstName: 'Jane',
        lastName: 'Doe',
        group: {
          id: '5ac63f89ea27dc000101cf74'
        }
      }
    },
    {
      id: "7ed41362-e636-4bf2-826c-7ee476346890",
      provider: 'mock',
      user: {
        id: '2',
        firstName: 'Jimmy',
        lastName: 'Janssens',
        group: {
          id: '5ac63f89ea27dc000101cf7c'
        }
      }
    }
  ]
});
