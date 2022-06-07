<!--suppress HtmlDeprecatedAttribute -->
<div align="center">
  <h1>
    <a href="https://angular.io" target="_blank"><img alt="Angular.io" src="https://angular.io/assets/images/logos/angular/angular.svg" width="100"/></a>
    <br>
    <span>Pocket Fic</span>
  </h1>

  <h4>
    <span>A Fan Fiction</span>
    <a href="https://ehharding.github.io/Pocket-Fic/" target="_blank">Website</a>
    <span>Built With</span>
    <a href="https://material.angular.io" target="_blank">Angular Material</a>
  </h4>

  <p>
    <a href="https://github.com/ehharding/Pocket-Fic/actions" target="_blank">
      <img alt="CI/CD Pipeline Status" src="https://github.com/ehharding/Pocket-Fic/actions/workflows/main.yml/badge.svg"/>
    </a>
    <a href="https://opensource.org/licenses/Apache-2.0" target="_blank">
      <img alt="Apache 2.0 License" src="https://img.shields.io/badge/License-Apache%202.0-blue.svg"/>
    </a>
  </p>
</div>

## Executive Summary
A modern fan fiction website for the modern web... at least that's my goal! I don't see any super nice-looking or user-friendly fan fiction websites out there, and I honestly
want one. So, I'm building one! starting with the frontend design and hopefully later with the backend. I'm doing this to gain some architecture and general full-stack
experience along with knowledge in various modern toolkits and programming paradigms (outside my main job, of course, so time spent developing is limited).

## Developer Environment Recommended Setup
To build from source and to contribute to the project, you will need to do a couple of things to get going. It is my goal that every developer have the same development
environment configuration. So, this section will go over both the tools required to work on the project and the recommended general setup.

### IDE And Project Setup
First, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/) (which comes with [npm](https://npmjs.com)) installed on your computer. You must download
an Active LTS or Maintenance LTS release of Node.js. You can find out which versions these are by visiting the Node.js [release site](https://nodejs.org/en/about/releases/).
After you have installed Node.js, enter the following from your command line of choice:

```bash
# Go To The Top-Level Directory On Your Machine
cd /

# Create Working Directory And Go Into It
mkdir Scratch && cd Scratch

# Clone The Repository
git clone https://github.com/ehharding/Pocket-Fic.git
```

Then, you should download JetBrains' [Webstorm IDE](https://www.jetbrains.com/webstorm/) for your platform (Windows, macOS, or Linux). WebStorm includes a free 30-day trial,
but you will most likely want to purchase a license to use all of its features.

You will need to go through a setup routine for the [Material Theme UI](https://plugins.jetbrains.com/plugin/8006-material-theme-ui) plugin. Personally, I use the Night Owl
theme.

Finally, while Chrome, Edge, Firefox, Opera, and Safari are supported as browsers, I would highly recommend [Firefox](https://www.mozilla.org/en-US/new/) as your core 
development browser. You will need it to properly run the project unit tests.

### Installing Project Dependencies
You must now install the necessary dependencies for the project via npm. From WebStorm's Terminal command line:

```bash
# Go To Repository Directory If Terminal Does Not Automatically Put You Here
cd /Scratch/Pocket-Fic

# Install Dependencies Via npm
npm install
```

### Running The Project Locally
With dependencies installed, you should now be ready to actually run the project. Either double click the `start` npm script or run the following npm command:

```bash
npm run start
```

Angular should have compiled the project and served it to http://localhost:4200/. Point your browser here to see the site. You will not be able to push to the GitHub
repository without first being added as a project contributor.

### Running The Project Unit Tests
You can run unit tests for the project via the `test` and `test:watch` npm scripts or run the following npm commands:

```bash
# Run Unit Tests Inside Firefox And Watch The Results
npm run test:watch

# Run Unit Tests Inside A Headless Firefox (You Can Still See The Results In The Terminal)
npm run test
```

### Linting The Project
To help with code maintainability and quality, this project utilizes [ESLint](https://eslint.org) along with the
[@typescript-eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) and [eslint-plugin-tsdoc](https://www.npmjs.com/package/eslint-plugin-tsdoc) plugins. To
run the linter on the project, you can use the `lint` and `lint:report` npm scripts or run the following npm commands:

```bash
# Run ESLint On The Project
npm run lint

# Run ESLint On The Project And Output An HTML Report Of The Results
npm run lint:report
```

## Getting Your Changes Integrated Into The Project
For now, all contributors are simply pushing their changes to the [main](https://github.com/ehharding/Pocket-Fic/tree/main) GitHub branch. Of course, in the future, this could
conceivably be more of a pull-commits-into-main situation.

To be allowed to push to the `main` branch, you must first have the "Direct Access" permission in the Pocket Fic repository. After this is given, you will then need to
configure your local Git client to use a GPG key to communicate securely with the GitHub server. The first step in this process (after being given access) is to generate a
4,096 bit RSA key. To do this, from a CLI:

```bash

# Tells Git What The GPG Program To Use Is And To Always Sign Commits
git config --global gpg.program gpg
git config --global commit.gpgsign true

# Generate A Key (Stepper Process - USE YOUR GITHUB ACCOUNT EMAIL/USERNAME, Select 4,096 bit RSA, No Expiration)
gpg --full-generate-key
```

Now, Git should have created a public/private key on your system. Keep the private key, logically, private and secure. The public key will be used to authenticate with GitHub.
To see your newly generated key, run the following:

```bash
# List The Long Form Of The GPG Keys For Which You Have Both A Public And Private Key
gpg --list-secret-keys --keyid-format=long
```

If successful, something like the following will be shown:

```markdown
/Users/hubot/.gnupg/secring.gpg
------------------------------------
sec 4096R/3AA5C34371567BD2 2016-03-10 [expires: 2017-03-10]
uid Hubot
ssb 4096R/42B317FD4BA89E7A 2016-03-10
```

Take the GPG key ID (the "3AA5C34371567BD2" part shown in the above example) and feed it to the following command to see your public key block, which will be associated with
your GitHub user account:

```bash
# Substitute Your GPG Key ID As The Last Argument
gpg --armor --export xxxxxxxxxxxxxxxx
```

The GitHub Pocket Fic repository will then need to be modified to include a contributor with the public GPG key block output above. Finally, configure your Git client to use
your newly generated public key:

```bash
# Substitute Your GPG Key ID As The Last Argument
git config --global user.signingkey xxxxxxxxxxxxxxxx
```

After doing this, when you commit, Git should prompt you for your password that encrypts/decrypts your public/private GPG key pair. If successful, the repository shows the
commit as a verified commit.

## Credits
This software uses the following open source packages:

- [Angular](https://angular.io) — Google's modern web development framework
- [Angular Material](https://material.angular.io) — Google's Material Design components for Angular
- [Bootstrap](https://getbootstrap.com) — A popular front-end open source CSS toolkit
- [RxJS](https://rxjs-dev.firebaseapp.com/) — A library for composing asynchronous and event-based programs using observable sequences
- [TypeScript](https://www.typescriptlang.org/) — Microsoft's open source programming language that extends JavaScript
- [ESLint](https://eslint.org) — A modern code linter for JavaScript/TypeScript
- [ESLint Plugin TypeScript](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) — An ESLint TypeScript plugin that extends ESLint's tools for TypeScript-targeted
                                                                                               code style enforcement
- [ESLint Plugin TSDoc](https://www.npmjs.com/package/eslint-plugin-tsdoc) — An ESLint TSDoc plugin that extends ESLint's tools for TypeScript-targeted documentation style
                                                                             enforcement
- [Jasmine](https://jasmine.github.io/) — A behavior-driven JavaScript unit testing framework 
- [Karma](https://karma-runner.github.io/latest/index.html) — A JavaScript unit test runner
- [Node.js](https://nodejs.org/en/) — A JavaScript runtime built on Chrome's V8 JavaScript engine
- [npm](https://www.npmjs.com/) — The Node Package Manager (npm)

## License
[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
