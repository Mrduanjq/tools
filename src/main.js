// 入口文件
import program from "commander"
import { VERSION } from "./utils/constants"
import apply from "./index"
import chalk from "chalk"

/**
* mrduan commands
*  -config
*  -init
*/

let actionMap = {
  init: {
    description: "从模板生成新项目",
    usages: [
      "mrduan来初始化模板名称项目名称"
    ]
  },
  config: {
    alias: "cfg",
    description: "config .mrduanrc",
    usages: [
      "mrduan config set <k> <v>",
      "mrduan config get <k>",
      "mrduan config remove <k>"
    ]
  },

  // other commands
}

Object.keys(actionMap).forEach(action => {
  program.command(action)
  .description(actionMap[action].description)
  .alias(actionMap[action].alias) // 别名
  .action(() => {
    switch (action) {
      case "config":
        // 配置
        apply(action, ...process.argv.slice(3))
        break;
      case "init":
        apply(action, ...process.argv.slice(3));
        break;
      default:
        break;
    }
  })
})

function help() {
  console.log("\r\nUsage:")
  Object.keys(actionMap).forEach(action => {
    actionMap[action].usages.forEach(usage => {
      console.log(" - " + usage)
    })
  })
  console.log("\r")
}

program.usage("<command> [options]")

program.on("-h", help);
program.on("--help", help);

// mrudan -V VERSION 为package.json中的版本号
program.version(VERSION, "-V --version").parse(process.argv)



//mrduan不带参数时
if (!process.argv.slice(2).length) {
  program.outputHellp(make_green)
}
function make_green(txt) {
  return chalk.green(txt)
}
