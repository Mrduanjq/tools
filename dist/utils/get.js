"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadLocal = undefined;

var _rc = require("./rc");

var _downloadGitRepo = require("download-git-repo");

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _logSymbols = require("log-symbols");

var _logSymbols2 = _interopRequireDefault(_logSymbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 获取模板
const downloadLocal = exports.downloadLocal = async (templateName, projectName) => {
  let config = await (0, _rc.getAll)();
  let api = `${config.registry}/${templateName}`;
  return new Promise((resolve, reject) => {
    console.log(_logSymbols2.default.success, _chalk2.default.green(api));
    console.log(_logSymbols2.default.success, _chalk2.default.green(projectName));
    // projectName 为下载到的本地目录
    (0, _downloadGitRepo2.default)(api, projectName, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};