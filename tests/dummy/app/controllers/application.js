import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

export default class ApplicationController extends Controller {
  @service session;

  accounts = [
    EmberObject.create({
      id: 'e842a393-1252-4e06-bab4-18df36c53808',
      provider: 'mock',
      gebruiker: EmberObject.create({
        id: '1',
        firstName: 'Jane',
        lastName: 'Doe',
        group: EmberObject.create({
          id: '5ac63f89ea27dc000101cf74'
        })
      })
    }),
    EmberObject.create({
      id: "7ed41362-e636-4bf2-826c-7ee476346890",
      provider: 'mock',
      gebruiker: EmberObject.create({
        id: '2',
        firstName: 'Jimmy',
        lastName: 'Janssens',
        group: EmberObject.create({
          id: '5ac63f89ea27dc000101cf7c'
        })
      })
    })
  ]
}
