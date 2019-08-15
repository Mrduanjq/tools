"use strict";

var _get = require("./utils/get");

var _ora = require("ora");

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _logSymbols = require("log-symbols");

var _logSymbols2 = _interopRequireDefault(_logSymbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// init commander
let init = async (templateName, projectName) => {
  // 项目不存在
  if (!_fs2.default.existsSync(projectName)) {
    //命令交互
    _inquirer2.default.prompt([{
      name: "description",
      message: "请输入这个项目的描述："
    }, {
      name: "author",
      message: "请输入这个项目作者的名字："
    }]).then(async answer => {
      // 下载模板 选择模板
      // 通过配置文件，获取模板信息
      let loading = (0, _ora2.default)("下载模板中...");
      loading.start();
      (0, _get.downloadLocal)(templateName, projectName).then(() => {
        loading.succeed();
        const fileName = `${projectName}/package.json`;
        if (_fs2.default.existsSync(fileName)) {
          const data = _fs2.default.readFileSync(fileName).toString();
          let json = JSON.parse(data);
          json.name = projectName;
          json.author = answer.author;
          json.description = answer.description;
          // 修改项目文件夹中的 package.json 文件
          _fs2.default.writeFileSync(fileName, JSON.stringify(json, null, "\t"), "utf-8");
          console.log(_logSymbols2.default.success, _chalk2.default.green("项目初始化完成！"));
        }
      }, () => {
        loading.fail();
      });
    });
  } else {
    // 项目存在
    console.log(_logSymbols2.default.error, _chalk2.default.red("这个项目已经存在！"));
  }
};

module.exports = init;