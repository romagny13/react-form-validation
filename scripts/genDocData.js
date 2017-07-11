var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var parse = require('react-docgen').parse;

function genData() {
    var sections = [];

    var paths = {
        examples: path.join(__dirname, '../docs', 'examples'),
        components: path.join(__dirname, '../src', 'components'),
        output: path.join(__dirname, '../docs', 'componentData.js')
    };

    // components
    var componentSectionItems = getSectionItems(paths.components, paths.examples);

    // 
    writeFile(paths.output, "module.exports = " + JSON.stringify(componentSectionItems));
}

genData();

function getExamples(sectionItemName, examplesPath) {
    var exampleFiles = getExampleFiles(examplesPath, sectionItemName);
    return exampleFiles.map(function (file) {
        // ... examples + MyComponent directory + Example1.js => .../examples/MyComponent/Example1.js
        var filePath = path.join(examplesPath, sectionItemName, file);
        var exampleName = getFileNameWithoutExtension(file);
        var exampleContent = readFile(filePath);
        var exampleInfos = getCodeInfos(exampleContent);
        return createExample(exampleName, filePath, exampleContent, exampleInfos.description);
    });
}

function getSectionItems(sectionPath, examplesPath) {
    var files = getFiles(sectionPath);
    return files.map(function (filename) {
        //
        var sectionItemName = getFileNameWithoutExtension(filename);
        var content = readFile(path.join(sectionPath, filename));
        var infos = getCodeInfos(content);

        // examples
        if (examplesPath) {
            var examples = getExamples(sectionItemName, examplesPath);
            return createSectionItem(sectionItemName, infos.description, infos.props, examples);
        }
        else {
            return createSectionItem(sectionItemName, infos.description, infos.props, []);
        }
    });
}


function getFileNameWithoutExtension(filename) {
    return filename.split('.')[0];
}

function getFiles(filepath) {
    return fs.readdirSync(filepath).filter(function (file) {
        return fs.statSync(path.join(filepath, file)).isFile();
    });
}

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}

function writeFile(filepath, content) {
    fs.writeFile(filepath, content, function (err) {
        err ? console.log(chalk.red(err)) : console.log(chalk.green("Component data saved."));
    });
}

function getExampleFiles(examplesPath, componentName) {
    // ... examples / component name directory ... example1.js, example2.js
    var exampleFiles = [];
    try {
        exampleFiles = getFiles(path.join(examplesPath, componentName));
    } catch (error) {
        console.log(chalk.red(`No examples found for ${componentName}.`));
    }
    return exampleFiles;
}

function getCodeInfos(code) {
    return parse(code);
}

function addSection(sections, section) {
    sections.push(section);
}

function createSection(name) {
    return { name: name };
}

function addSectionItem(section, sectionItem) {
    section.sectionItems.push(sectionItem);
}

function createSectionItem(name, description, props, examples) {
    return {
        name: name,
        description: description,
        props: props,
        examples: examples
    };
}

function addExample(sectionItem, example) {
    sectionItem.examples.push(example);
}

function createExample(name, path, code, description) {
    return {
        name: name,
        path: path,
        code: code,
        description: description
    };
}