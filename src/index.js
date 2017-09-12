/*eslint-disable linebreak-style*/
/*eslint-disable no-undef*/
/*eslint-disable global-require*/

/** ****************************************************************
 *          初始化一些核心模块，譬如消息组件
 *******************************************************************/
console.log(new Date());

/** ****************************************************************
 *                初始化项目
 *******************************************************************/
let Vue             = require('vue/dist/vue'),
    _comm           = require('./_comm'),
    { emitter: em } = _comm,
    Scripts         = require.context('./', true, /\.js$/);

/** ****************************************************************
 *                 auto load all scripts in project.
 *******************************************************************/
Scripts.keys().forEach((path) => {
  try {
    let _m = require(path);
    em.emit('core/module/load', { path, module: _m });
  } catch (e) {
    em.emit(`core/exceptions/${e}`, e);
  }
});

module.exports = {
  init (id) {
    let app        = new Vue(
        {
          el     : `#${id}`,
          data   : {},
          methods: {},
          mounted: function () {
            em.emit('core/module/init', this);
          }
        }
    );
    module.exports = {
      inst: app
      
    };
    
    if (window) {
      window.clptr = module.exports;
    }
  }
};

if (window) {
  window.clptr = module.exports;
}


