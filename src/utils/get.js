// 获取模板
import { getAll } from "./rc"
import downloadGit from "download-git-repo"
import chalk from "chalk"
import symbol from "log-symbols"
export const downloadLocal = async (templateName, projectName) => {
  let config = await getAll();
  let api = `${config.registry}/${templateName}`;
  return new Promise((resolve, reject) => {
    console.log(symbol.success, chalk.green(api))
    console.log(symbol.success, chalk.green(projectName))
    // projectName 为下载到的本地目录
    downloadGit(api, projectName, err => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}
