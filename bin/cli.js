#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk'); // 格式化字符颜色，不输出
const shell = require('shelljs');
const userHome = require('user-home'); // 指向用户目录
const ora = require('ora');
const packageJson = require('../package');
// program.version(packageJson.version,'-v, --version, -version'); // 版本
const Printer = require('@darkobits/lolcatjs');
// 安装酷炫颜色的包打印字符，@darkobits/lolcatjs

// 获取欢迎图标，手动，bootschool.net/ascii，自动使用包生成figlet具体找npm文档 ~ figlet -f 'Ghost' 'lemon' | lolcatjs
const input = [ ' ___                                            ',
'/\\_ \\                                           ',
'\\//\\ \\       __     ___ ___      ___     ___    ',
'  \\ \\ \\    /\'__`\\ /\' __` __`\\   / __`\\ /\' _ `\\  ',
'   \\_\\ \\_ /\\  __/ /\\ \\/\\ \\/\\ \\ /\\ \\L\\ \\/\\ \\/\\ \\ ',
'   /\\____\\\\ \\____\\\\ \\_\\ \\_\\ \\_\\\\ \\____/\\ \\_\\ \\_\\',
'   \\/____/ \\/____/ \\/_/\\/_/\\/_/ \\/___/  \\/_/\\/_/',
'                                                ',
'                                                ' ].join('\n');
const bindHandler = {
    init () {
        inquirer
            .prompt([
                {
                    type: "text",
                    "message": "请输入文件夹名称",
                    "name": "dirname"
                }
            ])
            .then(answer => {
                console.log(answer.dirname);
                shell.cd(`${userHome}/Desktop/`);
                const spinner = ora("downloading...").start();
                // spinner.stop();    
                shell.mkdir(answer.dirname);
            });
    }
}

program
    .version(Printer.default.fromString(input + packageJson.version), '-v, --version')
    .option("-p", "add p")
    .option('-c, --cheese [type]', 'Add the specified type of cheese [default]', 'default') // lemon -c hi, 可以获取变量cheese
    .usage("<cmd> [options]").arguments("<cmd> [env]").action((cmd, otherParams) => { // lemon init 123， cmd为变量命令，【options】为入参
        const handler = bindHandler[cmd];
        if (!handler) {
            console.log(chalk.red(`非常遗憾【${cmd}】暂未提供`));
            // chalk.red(`非常遗憾【${cmd}】暂未提供`);
        } else {
            handler(otherParams);
        }
    })
    
program.parse(process.argv);


console.log(program.cheese); // 可以输出命令行中的变量
// lemon -h列出所有options


