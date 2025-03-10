import '@glint/environment-ember-loose';
import type MockLoginRegistry from '@lblod/ember-mock-login/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- This is how it comes out of the blueprint, so we keep it like that for now
  export default interface Registry
    extends MockLoginRegistry /* other addon registries */ {
    // local entries
  }
}
