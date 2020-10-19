# DefaultStatsFactoryPlugin high memory usage

This repo showcases issue https://github.com/webpack/webpack/issues/11659

To run, execute

```sh
npm run build
```

It will generate the files to be dynamically load through module federation, the generator script is in `./bin/generateFiles.js`.

Other available commands:

`npm run start:dev` - Runs the webpack dev server

`npm run debug` - Same as npm run build but will start with `--inspect-brk`