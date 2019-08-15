// 配置文件 .mrduanrc文件的增删改查
import { RC, DEFAULTS } from "./constants"
import { decode, encode } from "ini"
import { promisify } from "util"
import chalk from "chalk"
import fs from "fs"

const exits = promisify(fs.exists)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

// DEFAULTS是默认的配置

export const get = async (key) => {
  const exit = await exits(RC)
  let opts
  if (exit) {
    opts = await readFile(RC, "utf8")
    opts = decode(opts)
    return opts[key]
  }
  return ""
}

export const getAll = async () => {
  const exit = await exits(RC)
  let opts
  if (exit) {
    opts = await readFile(RC, "utf8")
    opts = decode(opts)
    return opts
  }
  return {}
}

export const set = async (key, value) => {
  const exit = await exits(RC)
  let opts
  if (exit) {
    opts = await readFile(RC, "utf8")
    opts = decode(opts)
    if (!key) {
      console.log(chalk.red(chalk.bold("错误：")), chalk.red("key值是必须的"))
      return
    }
    if (!value) {
      console.log(chalk.red(chalk.bold("错误：")), chalk.red("value值是必须的"))
      return
    }
    Object.assign(opts, {[key]: value})
  } else {
    opts = Object.assign(DEFAULTS, {[key]: value})
  }
  await writeFile(RC, encode(opts), 'utf8')
}

export const remove = async (key) => {
  const exit = await exits(RC)
  let opts
  if (exit) {
    opts = await readFile(RC, "utf8")
    opts = decode(opts)
    delete opts[key]
    await writeFile(RC, encode(opts), "utf8")
  }
}
