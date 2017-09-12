const comm            = require('../../../_comm'),
      { emitter: em } = comm;
em.on('core/events/trace', (data) => {console.log(JSON.stringify(data));});
