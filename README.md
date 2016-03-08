# React + Redux + React Redux Router + Relay + GraphQL example

Based on [relay-starter-kit](https://github.com/relayjs/relay-starter-kit) repo

### [Demo](http://relay-articles.herokuapp.com/)


## Installation

```
npm install
```

## Running

Start a local server:

```
npm start
```

then go to <http://localhost:3000/>

## Developing

Any changes you make to files in the `js/` directory will cause the server to
automatically rebuild the app and refresh your browser.

If at any time you make changes to `data/schema.js`, stop the server,
regenerate `data/schema.json`, and restart the server:

```
npm run update-schema
npm start
```

##Tests

Tests're executing in Chrome

```
npm install karma-cli -g
karma start
```
