const EventEmitter = require('events').EventEmitter;
let emitter        = new EventEmitter();

emitter.emit = new Proxy(emitter.emit, {
  
  /***************************************
   * 注册一个Proxy, 横切后续所有的事件发射
   * @param target
   * @param ctx
   * @param args
   * @returns {*}
   */
  apply (target, ctx, args) {
    console.log({ target, ctx, args });
    
    let [event, data] = args;
    if (event.toLowerCase() !== 'core/events/trace') {
      emitter.emit('core/events/trace', { event, data });
    }
    
    return Reflect.apply(... arguments);
  }
});

emitter.on = new Proxy(emitter.on, {
  apply (target, ctx, args) {
    console.log({ target, ctx, args });
    return Reflect.apply(... arguments);
  }
});

module.exports = {
  app: null,
  emitter
};
