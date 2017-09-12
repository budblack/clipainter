const comm            = require('../../_comm'),
      { emitter: em } = comm;
em.on('dev/trace', (data) => {console.log('[开发][跟踪]', JSON.stringify(data));});
