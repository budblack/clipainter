const comm = require('../../_comm'),
    {emitter: em} = comm;
em.on('dev/trace', (data) => {
    let ctx = {
        msg: '',
        _t: new Date()
    };
    if (typeof data === "string" || data instanceof Array) {
        ctx.msg = data;
    } else {
        Object.assign(ctx, data);
    }
    console.log('[开发][跟踪]', JSON.stringify(ctx));
});
console.log('被初始化')
module.exports = {}