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
import ComMain from './tpls/main.vue';

let Vue             = require('vue/dist/vue'),
    _comm           = require('./_comm'),
    { emitter: em } = _comm,
    Scripts         = require.context('./', true, /\.js$/);

/** ****************************************************************
 *                 auto load all scripts in project.
 *******************************************************************/
Scripts.keys()
       .filter((path) => {return path.match(/\.js$/) !== null;})
       .forEach((path) => {
         try {
           // path 需要类型转换一下
           let _m = require(path + '');
           em.emit('core/module/load', { path, module: _m });
         } catch (e) {
           em.emit(`core/exceptions/${e}`, e);
         }
       });

module.exports = {
  init (id) {
    let app        = new Vue(
        {
          el    : `#${id}`,
          render: (h) => {return h(ComMain);}
        }
    );
    module.exports = {
      inst: app,
      em
    };
    
    if (window) {
      window.clptr = module.exports;
    }
  }
};

if (window) {
  window.clptr = module.exports;
}


