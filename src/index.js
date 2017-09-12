/** ****************************************************************
 *          初始化一些核心模块，譬如消息组件
 *******************************************************************/
console.log(new Date());
/** ****************************************************************
 *                 auto load all scripts in project.
 *******************************************************************/
let Scripts = require.context('./', true, /\.js$/);
console.log(Scripts.keys());
Scripts.keys().forEach((path) => {
  try {
    console.log(path);
    require(path);
  } catch (e) {
  }
});

/** ****************************************************************
 *                初始化项目
 *******************************************************************/
const Vue   = require('vue/dist/vue');
const _comm = require('./_comm');

module.exports = {
  init (id) {
    let app = new Vue(
        {
          el     : `#${id}`,
          data   : {},
          methods: {},
          mounted: function () {
            _comm.emitter.emit('core/module/init', this);
          }
        });
  }
};

if (window) {
  window.clptr = module.exports;
}


