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

let Vue = require('vue/dist/vue'),
    ScriptsComms = require.context('./_comm/', true, /\.js$/),
    ScriptsEvents = require.context('./events/', true, /\.js$/),
    ScriptsControllers = require.context('./controller/', true, /\.js$/),
    _comm = require('./_comm'),
    {emitter: em} = _comm;

/** ****************************************************************
 *                 auto load all scripts in project.
 *******************************************************************/
[]
    .concat((ScriptsComms ? ScriptsComms.keys() : []).map((path) => {
        return path.replace('./', './_comm/');
    }))
    .concat((ScriptsControllers ? ScriptsControllers.keys() : []).map((path) => {
        return path.replace('./', './controller/');
    }))
    .concat((ScriptsEvents ? ScriptsEvents.keys() : []).map((path) => {
        return path.replace('./', './events/');
    }))
    .filter((path) => {
        return path.match(/\.js$/) !== null;
    })
    .forEach((path) => {
        try {
            console.log(path);
            // path 需要类型转换一下
            let _m = require(path + '');
            em.emit('core/module/load', {path, module: _m});
        } catch (e) {
            console.log(e)
            em.emit(`core/exceptions/${e}`, e);
        }
    });

module.exports = {
    initTestLayout(id) {
        let app = new Vue(
            {
                el: `#${id}`,
                render: (h) => {
                    // ComMain.setLayoutTpl('layout/test_flex');
                    return h(ComMain);
                }
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


