// init commander
import { downloadLocal } from "./utils/get"
import ora from "ora"
import inquirer from "inquirer"
import fs from "fs"
import chalk from "chalk"
import symbol from "log-symbols"

let init = async (templateName, projectName) => {
  // 项目不存在
  if (!fs.existsSync(projectName)) {
    //命令交互
    inquirer.prompt([
      {
        name: "description",
        message: "请输入这个项目的描述："
      },
      {
        name: "author",
        message: "请输入这个项目作者的名字："
      }
    ]).then(async answer => {
      // 下载模板 选择模板
      // 通过配置文件，获取模板信息
      let loading = ora("下载模板中...")
      loading.start()
      downloadLocal(templateName, projectName).then(() => {
        loading.succeed()
        const fileName = `${projectName}/package.json`
        if (fs.existsSync(fileName)) {
          const data = fs.readFileSync(fileName).toString()
          let json = JSON.parse(data)
          json.name = projectName
          json.author = answer.author
          json.description = answer.description
          // 修改项目文件夹中的 package.json 文件
          fs.writeFileSync(fileName, JSON.stringify(json, null, "\t"), "utf-8")
          console.log(symbol.success, chalk.green("项目初始化完成！"))
        }
      }, () => {
        loading.fail()
      })
    })
  } else {
    // 项目存在
    console.log(symbol.error, chalk.red("这个项目已经存在！"))
  }
}

module.exports = init
