// 定义常量
import { version } from "../../package.json"

//当前 package.json 的版本号
export const VERSION = version

// 用户根目录
export const HOME = process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"]

// 配置文件目录
export const RC = `${HOME}/.mrduanrc`

// RC 配置下载模板的地方，给 github 的 api 使用
// https://api.github.com/users/Mrduanjq/repos
// https://api.github.com/${type}/${registry}/repos
// 需要在github上有这么一个路径的package.json,当使用自定义的命令初始化时的模板
// 模板下载地址可配置
export const DEFAULTS = {
    registry: 'Mrduanjq',
    type: 'users'
}
