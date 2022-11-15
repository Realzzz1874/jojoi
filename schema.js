"use strict";

const Joi = require("Joi");
const safe = require("safe-regex");

const { object, string, array, boolean, date, number } = Joi.types();
const { isEmpty, isArray, isComparableNumber } = require("./util.js");

/**
 * @description strictPhoneReg  手机号(mobile phone)中国(严谨), 根据工信部2019年最新公布的手机号段
 * 例如: 008618311006933, +8617888829981, 19119255642
 */
const strictPhoneReg =
  /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;

/**
 * @description loosePhoneReg  手机号(mobile phone)中国(宽松), 只要是13,14,15,16,17,18,19开头即可
 * 例如: 008618311006933, +8617888829981, 19119255642
 */
const loosePhoneReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
/**
 * @description phoneReg  手机号(mobile phone)
 * 例如: 19119255642
 */
const phoneReg = /^1[3456789]\d{9}$/;

/**
 * @description firstIdReg  身份证号(1代,15位数字) 例如: 123456991010193
 */
const firstIdReg =
  /^[1-9]\d{7}(?:0\d|10|11|12)(?:0[1-9]|[1-2][\d]|30|31)\d{3}$/;

/**
 * @description secondIdReg  身份证号(2代,18位数字),最后一位是校验位,可能为数字或字符X 例如: 12345619991205131x
 */
const secondIdReg =
  /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/;

/**
 * @description idReg  身份证号, 支持1/2代(15位/18位数字) 例如: 12345619991205131x
 */
const idReg =
  /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/;

/**
 * @method requiredNotEmpty
 * @description 字符串必填 & 非空
 * @returns {object}
 */
exports.requiredNotEmpty = function requiredNotEmpty(...args) {
  return string.trim().required();
};

/**
 * @method requiredCouldEmpty
 * @description 字符串必填 & 可以为空
 * @returns {object}
 */
exports.requiredCouldEmpty = function requiredCouldEmpty(...args) {
  return string.trim().required().allow("");
};

/**
 * @method requireAndEnumForStrSchema
 * @description 必填字符串枚举
 * @returns {object}
 */
exports.requireAndEnumForStrSchema = function requireAndEnumForStrSchema(
  ...args
) {
  let [enumArr, options] = args;
  return string
    .trim()
    .required()
    .valid(...enumArr);
};

/**
 * @method max
 * @description max length
 * @returns {object}
 */
exports.max = function max(...args) {
  let [param, limit, options] = args;
  if (limit !== 0 && !limit) throw Error(`limit is not passed!`);
  return string.trim().required().max(limit);
};

/**
 * @method min
 * @description min length
 * @returns {object}
 */
exports.min = function min(...args) {
  let [param, limit, options] = args;
  if (limit !== 0 && !limit) throw Error(`limit is not passed!`);
  return string.trim().required().min(limit);
};

/**
 * @method requiredNumber
 * @description 必填 & 数字
 * @returns {object}
 */
exports.requiredNumber = function requiredNumber(...args) {
  let [param, options] = args;
  return number.required();
};

/**
 * @method requiredInt
 * @description
 * @returns {object}
 */
exports.requiredInt = function requiredInt(...args) {
  let [options] = args;
  return number.required().integer();
};

/**
 * @method requiredBool
 * @description 必填 & 布尔
 * @returns {object}
 */
exports.requiredBool = function requiredBool(...args) {
  let [options] = args;
  return boolean.required();
};

/**
 * @method requiredNotEmptyObj
 * @description 必填 & 非空 & 对象
 * @returns {object}
 */
exports.requiredNotEmptyObj = function requiredNotEmptyObj(...args) {
  let [options] = args;
  return object.required().min(1);
};

/**
 * @method requiredCouldEmptyObj
 * @param {object} param
 * @description 必填 & 可以空 & 对象
 */
exports.requiredCouldEmptyObj = function requiredCouldEmptyObj(...args) {
  let [options] = args;
  return object.required();
};

/**
 * @returns {object}
 * @description 校验正则
 */
function checkPattern(options) {
  let { pattern } = options;
  if (!(pattern instanceof RegExp))
    throw new TypeError("options.pattern must be a RegExp!");
  if (!safe(pattern))
    console.warn(
      `From minijoi hint: ${pattern} is an unsafe regular expression , please check carefully?`
    );
  return string.trim().required().regex(pattern);
}

/**
 * @method requiredPhone
 * @description 必填 & 合法电话号码
 * requirePhone(param , {'pattern' : xxxx})
 * requirePhone(param , {'mode' : 'strict' })
 * requirePhone(param )
 * @returns {object}
 */
exports.requiredPhone = function requiredPhone(...args) {
  let [options] = args;
  let reg = phoneReg;
  if (!options) return string.trim().required().regex(reg);
  let { pattern, mode } = options;
  if (options.hasOwnProperty("pattern")) {
    return checkPattern(options);
  }
  if (options.hasOwnProperty("mode")) {
    // if( !mode ) throw new Error("options.mode cannot be empty!");
    if (!["loose", "strict"].includes(mode))
      throw new Error("Options.mode is one of 'loose' and 'strict'!");
    if (mode == "loose") reg = loosePhoneReg;
    if (mode == "strict") reg = strictPhoneReg;
  }
  return string.trim().required().regex(reg);
};

/**
 * @method requiredEmail
 * @description 必填 & 邮箱
 * @returns {object}
 */
exports.requiredEmail = function requiredEmail(...args) {
  let [options] = args;
  if (!options) return string.trim().required().email();
  if (options.hasOwnProperty("pattern")) {
    return checkPattern(options);
  } else {
    return string.trim().required().email();
  }
};

/**
 * @method requiredID
 * @description 必填 & 身份证
 * default 1/2代
 * @returns {object}
 */
exports.requiredID = function requiredID(...args) {
  let [options] = args;
  let reg = idReg;
  if (!options) return string.trim().required().regex(reg);
  let { pattern, generation } = options;
  if (options.hasOwnProperty("pattern")) {
    return checkPattern(options);
  }
  if (options.hasOwnProperty("generation")) {
    if (!["first", "second"].includes(generation))
      throw new Error("Options.generation is one of 'first' and 'second'!");
    if (generation == "first") reg = firstIdReg;
    if (generation == "second") reg = secondIdReg;
  }
  return string.trim().required().regex(reg);
};

/**
 * @method requiredIP
 * @description 必填 & IP
 * default ipv4/ipv6
 * @returns {object}
 */
exports.requiredIP = function requiredIP(...args) {
  let [options] = args;
  let joiVersion = ["ipv4", "ipv6"];
  if (!options) return string.trim().required().ip({ version: joiVersion });
  let { version } = options;
  if (options.hasOwnProperty("version")) {
    if (!joiVersion.includes(version))
      throw new Error("Options.version is one of 'ipv4' and 'ipv6'!");
    joiVersion = [version];
  }
  return string.trim().required().ip({ version: joiVersion });
};

/**
 * @method requiredUrl
 * @description 必填 & Url
 * @returns {object}
 */
exports.requiredUrl = function requiredUrl(...args) {
  let [options] = args;
  if (!options) return string.trim().required().uri();
  if (options.hasOwnProperty("pattern")) {
    return checkPattern(options);
  } else {
    return string.trim().required().uri();
  }
};
