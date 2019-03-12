# remarkable-callout

[![Travis (.com)](https://img.shields.io/travis/com/favoloso/remarkable-callout.svg)](https://travis-ci.com/favoloso/remarkable-callout)
[![Codecov](https://img.shields.io/codecov/c/github/favoloso/remarkable-callout.svg)](https://codecov.io/gh/favoloso/remarkable-callout)
[![npm](https://img.shields.io/npm/v/remarkable-callout.svg)](https://www.npmjs.com/package/remarkable-callout)

Adds callout parsing support to Remarkable

## Installation

With npm:

```sh
npm install --save remarkable-callout
```

or with Yarn:

```sh
yarn add remarkable-callout
```

## Usage

```js
import Remarkable from 'remarkable';
const md = new Remarkable();

import callout from 'remarkable-callout';
md.use(callout);
```
