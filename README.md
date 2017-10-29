# { React Do }

React Do helps save time by reading `.react-do.json` in your project root and creating
new a new file based on the configuration parameters and the `templatesDir` template you provide.

## .react-do.json configuration example in project root

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

Both `ext` and `destination` are mandatory, but you may also pass in a default `filename` as well.


## Scaffold

You can also setup a scaffolding command by adding the templates you want to get auto generated based off the scaffold name.

example command using the config above:

```bash
react-do scaffold People
```

This would then create `./components/People.js`, `./models/People.js`, `./actions/People.js`, `./stores/People.js`

## Coming Soon

- [ ] optional `filename` added to templates config will create a default filename to use for that template
- [ ] destroy command for templates created individually or through scaffold

