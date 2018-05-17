'use strict';

// from publish-please

const path = require('path');
const writeFile = require('fs').writeFileSync;
const chalk = require('chalk');

const pathJoin = path.join;

function reportNoConfig() {
    console.log(chalk.bgRed(" Unable to setup yoyi-tools: project's package.json either missing   "));
    console.log(chalk.bgRed(' or malformed. Run `npm init` and then reinstall yoyi-tools.         '));
}

function reportCompletion() {
    console.log(chalk.bgRed('  yoyi-tools was successfully installed for the project. '));
    console.log(chalk.bgRed('  Use `npm run pub` command for publishing.              '));
    console.log(chalk.bgRed('  publishing configuration.                              '));
}

function addConfigHooks(cfg, projectDir) {
    if (!cfg.scripts) {
        cfg.scripts = {};
    }

    if (cfg.scripts.pub) {
        return false;
    }

    cfg.scripts = Object.assign(cfg.scripts, {
        build: 'yoyi-tools run build',
        start: 'yoyi-tools run server',
        // lint: 'yoyi-tools run lint',
    });

    if (cfg.scripts.prepublish) {
        cfg.scripts['pre-publish'] = cfg.scripts.prepublish;
    }

    writeFile(pathJoin(projectDir, 'package.json'), JSON.stringify(cfg, null, 2));

    return true;
}

function init() {
   
    const projectDir = pathJoin(__dirname, '../../../');
    const cfg = require(path.join(projectDir, 'package.json'));

    if (!cfg) {
        reportNoConfig();
        process.exit(1);
    } else if (addConfigHooks(cfg, projectDir)) {
        reportCompletion();
    }
}

init();