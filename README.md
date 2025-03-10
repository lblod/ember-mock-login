# @lblod/ember-mock-login

[Short description of the addon.]

## Compatibility

- Ember.js v4.8 or above
- Embroider or ember-auto-import v2

## Installation

```
ember install ember-mock-login
```

## Usage

[Longer description of how to use the addon in apps.]

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## Releasing a new version
We use [`release-it`](https://github.com/release-it/release-it) to handle our release flow and [`lerna-changelog`](https://github.com/lerna/lerna-changelog) to generate the changelog for that release.

### Prerequisites
- Both `release-it` and `lerna-changelog` require a Github [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) to work properly.
- All PRs that need to show up in the changelog need a descriptive title and [correct label](https://github.com/lerna/lerna-changelog).

### Previewing the changelog (optional)
If you want to preview the changelog that will be generated before starting the release flow you can run the following command:

`GITHUB_AUTH=your-access-token npx lerna-changelog`

### Creating a new release
Simply run `GITHUB_AUTH=your-access-token pnpm release` and follow the prompts.

After the new tag is created and pushed Woodpecker will take care of publishing the package to npm.

## License

This project is licensed under the [MIT License](LICENSE.md).
