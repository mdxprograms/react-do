#! /usr/bin/env node

const fs = require("fs");
const path = require("path");

// make sure template and name of file are passed
checkArgLength();

if (!fs.existsSync(".react-do.json")) {
  return console.log(
    "Please create your .react-do.json config file in your projects root directory."
  );
}

// read config and generate file
fs.readFile(".react-do.json", "utf8", (err, data) => {
  if (err) throw err;

  const config = JSON.parse(data);

  // verify both templatesDir and templates exist in config
  verifyTemplatesDir(config);
  verifyTemplates(config);

  const templatesDir = config.templatesDir;
  const templates = config.templates;
  const found = templateExists(templates, process.argv[2]);
  const isScaffold =
    process.argv[2] === "scaffold" && config.hasOwnProperty("scaffold");
  let template = {};
  let templateContent = "";

  if (isScaffold) {
    const scaffoldName = process.argv[3];

    config.scaffold.map(templateType => {
      template = {
        name: templateType,
        options: config.templates[templateType]
      };

      templateContent = getTemplateContents(templatesDir, template);

      createDirIfNoExist(template.options.destination);

      createNewFile(template, templateContent);
    });
  } else if (found) {
    template = {
      name: process.argv[2],
      options: config.templates[process.argv[2]]
    };

    templateContent = getTemplateContents(templatesDir, template);

    createDirIfNoExist(template.options.destination);

    createNewFile(template, templateContent);
  } else {
    return console.log(
      "Template file does not exist in your templatesDir path specified in .react-do.json"
    );
  }
});

// verification checks
function verifyTemplatesDir(config) {
  if (!config.hasOwnProperty("templatesDir")) {
    return console.log(
      'Must include a "templatesDir" for react-do to gather your templates'
    );
  }
}

function verifyTemplates(config) {
  if (!config.hasOwnProperty("templates")) {
    return console.log(
      'Must supply a "templates" object with each nested object key being the template\'s filename and that object must contain a { destination: "your creation destionation" }'
    );
  }
}

function checkArgLength() {
  if (!process.argv.length === 4) {
    return console.log(
      "Please state the template name then the filename to create, ie: react-do component HelloWorld"
    );
  }
}

function templateExists(templates, templateName) {
  if (templates.hasOwnProperty(templateName)) {
    return true;
  }

  return false;
}

function getTemplateContents(templatesDir, template) {
  const templatePath =
    templatesDir + "/" + template.name + "." + template.options.ext;

  return fs.readFileSync(templatePath, "utf8");
}

function createDirIfNoExist(destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }
}

function createNewFile(template, templateContent) {
  const templateName = template.name;
  const newFileName = process.argv[3];
  const directory = template.options.destination;
  const ext = "." + template.options.ext;
  const writePath = directory + newFileName + ext;

  if (newFileName.includes("/")) {
    newFileName
      .split("/")
      .slice(0, -1)
      .map(newDir => createDirIfNoExist(directory + newDir));
  }

  fs.writeFile(writePath, templateContent, { flag: "a+" }, function(err) {
    if (err) throw err;

    console.log(templateName + " created in " + writePath);
  });
}
