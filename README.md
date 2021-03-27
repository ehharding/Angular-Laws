<!--suppress HtmlDeprecatedAttribute -->
<div align="center">
  <h1>
    <a href="https://angular.io"><img alt="Angular.io" src="https://angular.io/assets/images/logos/angular/angular.svg" width="100" /></a>
    <br>
    Fan Fiction.com
  </h1>

  <h4>
    A Fan Fiction Website Built On Top Of <a href="https://material.angular.io" target="_blank">Angular Material</a>
  </h4>

  <p>
    <a href="https://github.com/ehharding/FanFiction.com/actions" target="_blank">
      <img alt="CI/CD Pipeline Status" src="https://github.com/ehharding/FanFiction.com/actions/workflows/main.yml/badge.svg"/>
    </a>
    <a href="https://opensource.org/licenses/Apache-2.0" target="_blank">
      <img alt="Apache 2.0 License" src="https://img.shields.io/badge/License-Apache%202.0-blue.svg"/>
    </a>
    <a href="https://www.paypal.me/ehharding" target="_blank" >
      <img alt="Donate Via PayPal" src="https://img.shields.io/badge/PayPal-donate-ff69b4.svg"/>
    </a>
  </p>

  <p>
    <a href="#executive-summary">Executive Summary</a> •
    <a href="#developer-environment-recommended-setup">Developer Environment Recommended Setup</a> •
    <a href="#credits">Credits</a> •
    <a href="#license">License</a>
  </p>

  <!-- This Is A Placeholder Image Until A Better One Is Found Or Created -->
  <img alt="Repository Image" src="https://repository-images.githubusercontent.com/302976042/b7524280-78b4-11eb-8eea-2c34fedcf9c1"/>
</div>

## Executive Summary
A Modern FanFiction Website For The Modern Web... at least that's my goal! I don't see any super nice-looking or user-friendly fan fiction websites
out there, and I honestly want one. So, I'm building one... starting with the front-end design and hopefully later on with the back-end. I'm doing
this to gain some architecture and general full-stack experience along with knowledge in various modern toolkits and programming paradigms (outside my
main job, of course, so time spent developing is limited).

## Developer Environment Recommended Setup
To build from source and to contribute to the project, you will need to do a couple of things to get going. It is my goal that every developer have
essentially the same development environment configuration. So, this section will go over both the tools required to work on the project and also the
recommended general setup.

### IDE And Project Setup
First, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/) (which comes with [NPM](http://npmjs.com)) installed on
your computer. From your command line:

```bash
# Go To The Top-Level Directory On Your Machine
cd /

# Create Working Directory And Go Into It
mkdir Scratch && cd Scratch

# Clone The Repository
git clone https://github.com/ehharding/FanFiction.com.git
```

Then, you should download JetBrains' [Webstorm IDE](https://www.jetbrains.com/webstorm/) for your platform (Windows, macOS, or Linux). WebStorm
includes a free 30-day trial, but you will most likely want to purchase a license to use all of its features.

Now, when WebStorm starts up, open the newly cloned repository. We will now pull down shared WebStorm settings from a private repository containing
said settings. To do this, go to <strong>File | Manage IDE Settings | Settings Repository...</strong>, enter
https://github.com/ehharding/webstorm-settings.git for the Upstream URL, and click <strong>Overwrite Local</strong>. You should be prompted to enter
a token to verify permissions. Contact me, and I will gladly provide the token. After this is done, you should have all the IDE settings required.

You may need to go through a setup routine for the [Material Theme UI](https://plugins.jetbrains.com/plugin/8006-material-theme-ui) plugin.
Personally, I use the Night Owl theme.

Finally, while Chrome, Edge, Firefox, and Opera are supported as browsers, I would highly recommend [Firefox](https://www.mozilla.org/en-US/new/) as
your core development browser. You will need it to properly run the project unit tests, anyways.

### Installing Project Dependencies
You must now install the necessary dependencies for the project via NPM. From WebStorm's Terminal command line:

```bash
# Go To Repository Directory If Terminal Does Not Automatically Put You Here
cd /Scratch/FanFiction.com

# Install Dependencies Via NPM
npm install
```

### Running The Project Locally
With dependencies installed, you should now be ready to actually run the project. Either double click the `start` npm script or run the following:

```bash
npm run start
```

Angular should have compiled the project and served it to http://localhost:4200/. Point your browser here to see the site. You will not be able to
push to the GitHub repository without first being added as a project contributor.

### Running The Project Unit Tests
You can run unit tests for the project via the `test` and `test:watch` npm scripts or run the following:

```bash
# Run Unit Tests Inside Firefox And Watch The Results
npm run test:watch

# Run Unit Tests Inside A Headless Firefox (You Can Still See The Results In The Terminal)
npm run test
```

### Linting The Project
To assist with code maintainability and quality, this project utilizes ESLint. To run the linter on the project, you can use the `lint` and
`lint:report` npm scripts or run the following:

```bash
# Run ESLint On The Project
npm run lint

# Run ESLint On The Project And Output An HTML Report Of The Results
npm run lint:report
```

## Credits
This software uses the following open source packages:

- [Angular](https://angular.io) - Google's modern web development framework
- [Angular Material](https://material.angular.io) - Google's Material Design components for Angular
- [Bootstrap](https://getbootstrap.com) - A popular front-end open source CSS toolkit
- [RxJS](https://rxjs-dev.firebaseapp.com/) - A library for composing asynchronous and event-based programs using observable sequences
- [ESLint](https://eslint.org) - A modern code linter for JavaScript/TypeScript
- [TypeScript](https://www.typescriptlang.org/) - Microsoft's open source programming language that extends JavaScript
- [Node.js](https://nodejs.org/en/) - A JavaScript runtime built on Chrome's V8 JavaScript engine
- [NPM](https://www.npmjs.com/) - The Node Package Manager (NPM)

## License
[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
