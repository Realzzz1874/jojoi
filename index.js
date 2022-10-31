"use strict";
const joiSchema = require("./schema.js");
const { getType } = require("./util.js");

/**
 * @description 获取提示信息
 */
function formatMsg(param) {
  return `The type of the argument passed in is [${getType(
    param
  )}], Please check the value in the "_original" field.`;
}

/**
 * 将 joi 中的 stack 改成 true, 默认输出错误堆栈
 */
function validate(schema, param, options) {
  const { error } = schema.validate(param, {
    errors: { stack: true },
    convert: false,
  });
  if (error) {
    let message = `${error.message}, ${formatMsg(param)}`;
    error.details[0].message = message;
    error.message = message;
    if (options && options["error"]) {
      if (!options.hasOwnProperty("clear") || options["clear"]) {
        console.error(error);
      }
      throw options["error"];
    }
    throw error;
  } else {
    return true;
  }
}

// -------------------------------------------

/**
 * @description [约定]
 * - required: 必填
 * - notEmpty: 非空
 * - couldEmpty: 可以空
 */

// -------------------------------------------

/**
 * @method requiredAndNotEmpty
 * @param {string} param -- 要检验的参数值
 * @description 字符串必填 & 非空
 */
exports.requiredAndNotEmpty = function requiredAndNotEmpty(...args) {
  let [param, options] = args;
  checkCommon(options);
  return validate(joiSchema.requiredAndNotEmpty(param), param, options);
};

/**
 * @method requiredAndCouldEmpty
 * @param {string} param -- 要检验的参数值
 * @description 字符串必填 & 可以为空
 */
exports.requiredAndCouldEmpty = function requiredAndCouldEmpty(...args) {
  let [param, options] = args;
  checkCommon(options);
  return validate(joiSchema.requiredAndCouldEmpty(), param, options);
};

/**
 * @method requiredPhone
 * @param {string} param -- 要检验的参数值
 * @description 必填 & 合法电话号码
 */
exports.requiredPhone = function requiredPhone(...args) {
  let [param, options] = args;
  checkCommon(options);
  return validate(joiSchema.requiredPhone(options), param, options);
};
