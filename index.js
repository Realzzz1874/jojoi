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

function checkOptions(options) {
  if (isEmpty(options)) return;
  if (!isObject(options)) throw new TypeError("options must be an object!");
  if (Object.keys(options).length == 0) return;
  if (options.hasOwnProperty("error")) {
    if (!(options.error instanceof Error))
      throw new TypeError("options.error must be an Error!");
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
 * @method requiredNotEmpty
 * @param {string}
 * @description 字符串必填 & 非空
 */
exports.requiredNotEmpty = function requiredNotEmpty(...args) {
  let [param, options] = args;
  checkOptions(options);
  return validate(joiSchema.requiredNotEmpty(param), param, options);
};

/**
 * @method requiredCouldEmpty
 * @param {string}
 * @description 字符串必填 & 可以空
 */
exports.requiredCouldEmpty = function requiredCouldEmpty(...args) {
  let [param, options] = args;
  checkOptions(options);
  return validate(joiSchema.requiredCouldEmpty(), param, options);
};

/**
 * @method requiredPhone
 * @param {string}
 * @description 必填 & 合法电话号码
 */
exports.requiredPhone = function requiredPhone(...args) {
  let [param, options] = args;
  checkOptions(options);
  return validate(joiSchema.requiredPhone(options), param, options);
};

/**
 * @method requiredNumber
 * @param {number}
 * @description 必填 & 数字
 */
exports.requiredNumber = function requiredNumber(...args) {
  let [param, options] = args;
  checkOptions(options);
  return validate(joiSchema.requiredNumber(param, options), param, options);
};

/**
 * @method requiredEmail
 * @param {string}
 * @description 必填 & 邮箱
 */
exports.requiredEmail = function requiredEmail(...args) {
  let [param, options] = args;
  checkOptions(options);
  return validate(joiSchema.requiredEmail(options), param, options);
};

/**
 * @method requiredID
 * @param {string}
 * @description 必填 & 身份证
 */
exports.requiredID = function requiredID(...args) {
  let [param, options] = args;
  checkOptions(options);
  return validate(joiSchema.requiredID(options), param, options);
};

/**
 * @method requiredIP
 * @param {string}
 * @description 必填 & IP
 */
exports.requiredIP = function requiredIP(...args) {
  let [param, options] = args;
  checkOptions(options);
  return validate(joiSchema.requiredIP(options), param, options);
};

/**
 * @method requiredUrl
 * @param {string}
 * @description 必填 & Url
 */
exports.requiredUrl = function requiredUrl(...args) {
  let [param, options] = args;
  checkCommon(options);
  return validate(joiSchema.requiredUrl(options), param, options);
};

/**
 * @method max
 * @param {string}
 * @param {integer[]} limit -- 长度
 * @description 必填 & 字符串最大长度
 */
exports.max = function max(...args) {
  let [param, limit, options] = args;
  checkCommon(options);
  return validate(joiSchema.max(param, limit, options), param, options);
};

/**
 * @method min
 * @param {string}
 * @param {integer[]} limit -- 长度
 * @description 必填 & 字符串最小长度
 */
exports.min = function min(...args) {
  let [param, limit, options] = args;
  checkCommon(options);
  return validate(joiSchema.min(param, limit, options), param, options);
};

/**
 * @method requiredNotEmptyObj
 * @param {object} param
 * @description 必填 & 非空 & 对象
 */
exports.requiredNotEmptyObj = function requiredNotEmptyObj(...args) {
  let [param, options] = args;
  checkCommon(options);
  return validate(
    joiSchema.requiredNotEmptyObj(param, options),
    param,
    options
  );
};

/**
 * @method requiredCouldEmptyObj
 * @param {object} param
 * @description 必填 & 可以空 & 对象
 */
exports.requiredCouldEmptyObj = function requiredCouldEmptyObj(...args) {
  let [param, options] = args;
  checkCommon(options);
  return validate(
    joiSchema.requiredCouldEmptyObj(param, options),
    param,
    options
  );
};

/**
 * @method requiredInt
 * @param {int} param
 * @description 必填 & 整数
 */
exports.requiredInt = function requiredInt(...args) {
  let [param, options] = args;
  checkCommon(options);
  return validate(joiSchema.requiredInt(options), param, options);
};

/**
 * @method requiredBool
 * @param {boolean}
 * @description 必填 & 布尔
 */
exports.requiredBool = function requiredBool(...args) {
  let [param, options] = args;
  checkCommon(options);
  return validate(joiSchema.requiredBool(options), param, options);
};
