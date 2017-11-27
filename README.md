# { React Do }

## Install

`yarn add react-do --dev`

or

`npm i react-do --save-dev`

## Description

React Do helps save time by reading `.react-do.json` in your project root and creating
a new file based on the configuration parameters and the `templatesDir` template you provide.

```bash
yarn react-do component HelloWorld
```

You can also specify a nested filepath

```bash
yarn react-do component People/PersonList
```

This will then create this file based off the configuration example below

`./components/People/PersonList.js`


## Configuration

.react-do.json configuration example in project root

```json
{
  "templatesDir": "./templates",
  "templates": {
    "component": {
      "ext": "js",
      "destination": "./components/"
    },
    "container": {
      "ext": "js",
      "destination": "./components/"
    },
    "model": {
      "ext": "js",
      "destination": "./models/"
    },
    "actions": {
      "ext": "js",
      "destination": "./actions/"
    },
    "store": {
      "ext": "js",
      "destination": "./stores/"
    }
  },
  "scaffold": ["component", "model", "actions", "store"]
}
```

## Templates

You can then define a templates directory somewhere in your project that
coincides with the `templatesDir`.

The script works off of the `templates` keys for finding the correct template in `templatesDir`.

If the `destination` doesn't exist it will create it for you.

Both `ext` and `destination` are mandatory.

An example template created in `./example-templates/component.js`

```javascript
import React from 'react';

const YourComponent = () => (
  <div className="">
  • <div>I am render, bringer of fun</div>
  </div>
);

export default YourComponent;
```

This will then create a component with your supplied filename via `yarn react-do component YourComponent`
in `./components/YourComponent.js`

## Scaffold

You can also setup a scaffolding command by adding the templates you want to get auto generated based off the scaffold name.

example command using the config above:

```bash
yarn react-do scaffold People
```

This would then create `./components/People.js`, `./models/People.js`, `./actions/People.js`, `./stores/People.js`

## Coming Soon

- [ ] optional `filename` added to templates config will create a default filename to use for that template
- [ ] destroy command for templates created individually or through scaffold

