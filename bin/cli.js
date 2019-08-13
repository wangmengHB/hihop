#!/usr/bin/env node

const chalk = require('chalk');
const semver = require('semver');
const program = require('commander')
const didYouMean = require('didyoumean');
const minimist = require('minimist');

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs (cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}


// Setting edit distance to 60% of the input string's length
didYouMean.threshold = 0.6;

console.log('hello');

var input = 'insargrm'
var list = ['facebook', 'twitter', 'instagram', 'linkedin'];
console.log(didYouMean(input, list));


input = 'google plus';
console.log(didYouMean(input, list));


program
  .version(require('../package').version)
  .usage('<command> [options]');

program
  .command('create <project-name>')
  .description('create a new project powered by mengd-cli')
  .option('-p, --preset <presetName>', 'Skip prompts and use saved or remote preset')
  .option('-d, --default', 'Skip prompts and use default preset')
  .option('-i, --inlinePreset <json>', 'Skip prompts and use inline JSON string as preset')
  .option('-m, --packageManager <command>', 'Use specified npm client when installing dependencies')
  .option('-r, --registry <url>', 'Use specified npm registry when installing dependencies (only for npm)')
  .option('-g, --git [message]', 'Force git initialization with initial commit message')
  .option('-n, --no-git', 'Skip git initialization')
  .option('-f, --force', 'Overwrite target directory if it exists')
  .option('-c, --clone', 'Use git clone when fetching remote preset')
  .option('-x, --proxy', 'Use specified proxy when creating project')
  .option('-b, --bare', 'Scaffold project without beginner instructions')
  .option('--skipGetStarted', 'Skip displaying "Get started" instructions')
  .action((name, cmd) => {
    const options = cleanArgs(cmd)

    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(chalk.yellow('\n Info: You provided more than one argument. The first one will be used as the app\'s name, the rest are ignored.'))
    }
    // --git makes commander to default git to true
    if (process.argv.includes('-g') || process.argv.includes('--git')) {
      options.forceGit = true
    }
    console.log('name', name);
    console.log('options', options);
    // require('../lib/create')(name, options)
  })


// add some useful info on help
program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`mengd <command> --help`)} for detailed usage of given command.`)
  console.log()
});

program
  .option('--no-sauce', 'Remove sauce')
  .parse(process.argv);
 
console.log('you ordered a pizza');
if (program.sauce) {
  console.log('  with sauce');
} else {
  console.log(' without sauce');
} 