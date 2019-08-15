"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// 主流程入口文件
let apply = (action, ...args) => {
  // babel-env
  require(`./${action}`)(...args);
};

exports.default = apply;