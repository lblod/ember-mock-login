import type SessionService from 'ember-simple-auth/services/session';
export { default } from 'ember-simple-auth/services/session';

declare module '@ember/service' {
  interface Registry {
    session: SessionService;
  }
}
