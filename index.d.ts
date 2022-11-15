export = jojoi;
declare namespace jojoi {
  interface Options {
    clear?: boolean;
    error?: Error;
    pattern?: RegExp;
    mode?: 'strict' | 'loose';
    version?: 'ipv4' | 'ipv6';
    generation?: 'first' | 'second';
  }

  type OpTypes =
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'left-close-right-close'
    | 'left-close-right-open'
    | 'left-open-right-open'
    | 'left-open-right-close'
    | 'l-c-r-c'
    | 'l-c-r-o'
    | 'l-o-r-o'
    | 'l-o-r-c';

  /**
   * @description 字符串必填 & 非空
   */
  function requiredNotEmpty(value: string, options?: Options): boolean;

  /**
   * @description 字符串必填 & 可以为空
   */
  function requiredCouldEmpty(value: string, options?: Options): boolean;

  /**
   * @description 必填 & 合法电话号码
   */
  function requiredPhone(value: string, options?: Options): boolean;

  /**
   * @description 必填 & 数字
   */
  function requiredNumber(value: number, options?: Options): boolean;

  /**
   * @description 必填 & 邮箱
   */
  function requiredEmail(value: string, options?: Options): boolean;

  /**
   * @description 必填 & 身份证
   */
  function requiredID(value: string, options?: Options): boolean;

  /**
   * @description 必填 & IP
   */
  function requiredIP(value: string, options?: Options): boolean;

  /**
   * @description 必填 & Url
   */
  function requiredUrl(value: string, options?: Options): boolean;

  /**
   * @description 必填 & 字符串最大长度
   */
  function max(value: string, options?: Options): boolean;

  /**
   * @description 必填 & 字符串最小长度
   */
  function min(value: string, options?: Options): boolean;

  /**
   * @description 必填 & 非空 & 对象
   */
  function requiredNotEmptyObj(value: object, options?: Options): boolean;

  /**
   * @description 必填 & 可以空 & 对象
   */
  function requiredCouldEmptyObj(value: object, options?: Options): boolean;

  /**
   * @description 必填 & 整数
   */
  function requiredInt(value: number, options?: Options): boolean;

  /**
   * @description 必填 & 布尔
   */
  function requiredBool(value: boolean, options?: Options): boolean;
}