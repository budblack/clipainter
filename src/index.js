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
let modulesIns = {};
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
            let _m = require(path + '');
            let modulePath = path.split('/');
            let pathStack = [];

            let obj = modulesIns;
            for (let i = 1, len = modulePath.length; i < len; i++) {
                if (obj[modulePath[i]] === undefined) {
                    obj[modulePath[i]] = (i === len - 1 ? _m : {})
                }
                obj = obj[modulePath[i]];
            }


            em.emit('core/module/load', {path, module: _m});
        } catch (e) {
            em.emit(`core/exceptions/${e}`, e);
        }
    });

module.exports = {
    _devTools: {
        ModulesIns:modulesIns,
        EventEmitter: em,
        InitTestLayout(id) {
            let app = new Vue(
                {
                    el: `#${id}`,
                    render: (h) => {
                        // ComMain.setLayoutTpl('layout/test_flex');
                        return h(ComMain);
                    }
                }
            );
        }
    },

};

if (window) {
    window.clptr = module.exports;
}


