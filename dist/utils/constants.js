"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULTS = exports.RC = exports.HOME = exports.VERSION = undefined;

var _package = require("../../package.json");

//当前 package.json 的版本号
const VERSION = exports.VERSION = _package.version;

// 用户根目录
// 定义常量
const HOME = exports.HOME = process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];

// 配置文件目录
const RC = exports.RC = `${HOME}/.mrduanrc`;

// RC 配置下载模板的地方，给 github 的 api 使用
// https://api.github.com/users/Mrduanjq/repos
// https://api.github.com/${type}/${registry}/repos
// 需要在github上有这么一个路径的package.json,当使用自定义的命令初始化时的模板
// 模板下载地址可配置
const DEFAULTS = exports.DEFAULTS = {
    registry: 'Mrduanjq',
    type: 'users'
};