import typescript from '@rollup/plugin-typescript';
import {
  terser
} from "rollup-plugin-terser";
import chalk from 'chalk';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import glob from 'tiny-glob';
import path from 'path';
import {
  rollup, watch
} from 'rollup';

const outputOptions = {
  dir: 'assets',
  format: 'esm',
  entryFileNames: 'component-[name].js',
  chunkFileNames: 'lib-[name].js',
}


const outputOptionsList = [outputOptions];

const input = await getInputs();

const inputOptions = {
  input,
  external: ['lit', 'lit/decorators.js'],
  perf: true,
  plugins: [
    minifyHTML.default(),
    terser({
      ecma: 2020,
      module: true,
    }), 
    typescript()
  ],
  preserveEntrySignatures: 'strict',
}

async function getInputs() {
  const PATHS = [ './src/components/**/index.{ts,js}', './src/utils/*.{ts,js}' ];
  let maps = [];
  await Promise.all(
    PATHS.map(async (pattern) => {
      const files = await glob(pattern);
      const map = files.reduce((acc, file) => {
        const extension = path.extname(file);
        const name = path.basename(file, extension);
        const catalog = path.basename(path.dirname(file));

        if (catalog !== 'utils') {
          acc[catalog] = file;
        } else {
          acc[name] = file;
        }

        return acc;
      }, {});

      maps.push(map);
    })
  );

  return Object.assign({}, ...maps);
}

async function build(config) {
  let bundle;
  let buildFailed = false;
  try {
    bundle = await rollup(config);
    await generateOutputs(bundle);
  } catch (error) {
    buildFailed = true;
    console.error(error);
  }
  if (bundle) {
    await bundle.close();
  }
  process.exit(buildFailed ? 1 : 0);
}

async function generateOutputs(bundle) {
  for (const outputOptions of outputOptionsList) {
    await bundle.write(outputOptions);
  }
}

const watchOptions = {
  ...inputOptions,
  output: [outputOptions],
  watch: {}
}

const watcher = watch(watchOptions);
const log = console.log;

const argument = process.argv[2];

if (argument === 'watch') {
  watcher.on('event', ({result}) => {
    if (result) {
      const time = result.getTimings();
      log(
        chalk.blue('Build time: ') + chalk.yellow(Math.round(time['# BUILD'][0]) + 'ms')
      );
      result.close();
    }
  });
}

if (argument === 'build') {
  build(inputOptions);
}
