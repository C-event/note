module.exports = {
  title: 'Vue Element Admin',

  /**
   * @type {boolean} true | false
   * @description 是否显示设置
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description 是否需要标签
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description 是否固定头部
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description 是否需要侧边栏logo
   */
  sidebarLogo: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * 错误提示只会出现那个模式下
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: ['production', 'development']
}
