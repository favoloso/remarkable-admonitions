# remarkable-admonitions

[![Travis (.com)](https://img.shields.io/travis/com/favoloso/remarkable-admonitions.svg)](https://travis-ci.com/favoloso/remarkable-admonitions)
[![Codecov](https://img.shields.io/codecov/c/github/favoloso/remarkable-admonitions.svg)](https://codecov.io/gh/favoloso/remarkable-admonitions)
[![npm](https://img.shields.io/npm/v/remarkable-admonitions.svg)](https://www.npmjs.com/package/remarkable-admonitions)

Adds admonitions parsing support to Remarkable

## Installation

With npm:

```sh
npm install --save remarkable-admonitions
```

or with Yarn:

```sh
yarn add remarkable-admonitions
```

## Usage

```js
import Remarkable from 'remarkable';
const md = new Remarkable();

import admonitions from 'remarkable-admonitions';
md.use(admonitions);
```
