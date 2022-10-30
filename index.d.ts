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
  function requiredAndNotEmpty(value: string, options?: Options): boolean;

  /**
   * @description 字符串必填 & 可以为空
   */
  function requiredAndCouldEmpty(value: string, options?: Options): boolean;
}