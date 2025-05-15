#!/usr/bin/env node

import { Command } from 'commander';
import app from '../src/index.js'

const program = new Command();

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .action((file1, file2, options) => {
    console.log(app(file1, file2, options))
  })

program.parse();
