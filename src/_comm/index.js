/*eslint-disable linebreak-style*/
const EventEmitter    = require('events').EventEmitter;
let emitter           = new EventEmitter(),
      { emit: _emit } = emitter;
emitter.emit          = new Proxy(emitter.emit, {
  
  /** *************************************
   * 注册两个Proxy, 横切后续所有的事件发射
   *                横切后续所有的事件注册
   ****************************************/
  
  apply (target, ctx, args) {
    let [event, data] = args;
    
    /** ******************
     *  空消息自动替换
     *********************/
    event = event || 'dev/trace';
    arguments[2][0] = event;
    if (event.toLowerCase() !== 'core/events/trace') {
      _emit('core/events/trace', { event, data });
    }
    
    return Reflect.apply(... arguments);
  }
});
//
// emitter.on = new Proxy(emitter.on, {
//   apply (target, ctx, args) {
//     let [event, handler] = args;
//     arguments[1]         = new Proxy(
//         handler,
//         {
//           apply (_target, _ctx, _args) {
//             _emit('core/events/handle', _args);
//             return Reflect.apply(... arguments);
//           }
//         }
//     );
//     _emit('core/events/subscrib', { event, handler });
//     return Reflect.apply(... arguments);
//   }
// });

module.exports = {
  app: null,
  emitter
};
