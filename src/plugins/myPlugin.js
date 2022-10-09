// 自定义vue插件
let myPlugin = {}

myPlugin.install = function (vue, options) {
  // Vue.prototype.$bus :任何组件都可以使用
  // Vue.directive() 全局自定义指令
  // Vue.component  filter...
  console.log('自定义插件');
}

export default myPlugin