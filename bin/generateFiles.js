const LoremIpsum = require('lorem-ipsum').LoremIpsum
const fs = require('fs');
const { runInContext } = require('vm');

const NUM_PAGES = 5000;
const exposed = {};
const routeToPageMapping = {
  '/': {moduleName: 'app', page: 'Page0'}
}

const run = () => {
  console.log('Generating app files');
  generatePages(NUM_PAGES, exposed, routeToPageMapping);
  writeExposed(exposed);
  writeMappings(routeToPageMapping);
}

const generatePages = (num_pages, exposed, routeMapping) => {
  times(num_pages, (i) => {
    generatePage(i, exposed, routeMapping);
  });
};

const generatePage = (i, exposed, routeMapping) => {
  const app = "app";
  const dir = "pages";
  const name = `Page${i}`;
  const text = lorem.generateParagraphs(7);
  const contents = `
        import React from 'react'

        const Page${i} = (props) => {
            return <div>${text}</div>
        }

        export default Page${i};
  `;
  
  exposed[`pages/${name}`] = `./src/app/pages/${name}.js`
  routeMapping[`/pages/${i}`] = { moduleName: app, page: name };
  writeFile(app, dir, name, contents);
};

const writeExposed = (exposed) => {
  fs.writeFileSync('./exposed.js', `module.exports = {pages: ${JSON.stringify(exposed, null, 2)}}`);
}

const writeMappings = (routeMapping) => {
  fs.writeFileSync('./src/infra/routeToPageMapping.js', `module.exports = ${JSON.stringify(routeMapping, null, 2)}`);
}

// Helpers

const times = (n, callback) => {
  [...Array(n).keys()].forEach((i) => callback(i));
};

const writeFile = (app, dir, name, contents) => {
  fs.mkdirSync(`./src/${app}/${dir}/`, {recursive: true});
  fs.writeFileSync(`./src/${app}/${dir}/${name}.js`, contents);
}

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

run();

module.exports = {
  exposedPages: exposed
}