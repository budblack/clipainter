<template>
    <div :class="$style.main">
        <TestLaytout></TestLaytout>
    </div>
</template>
<style lang="less" module>
    .main {
        background-color: aquamarine;
    }
</style>
<script lang="js">
    import 'normalize.css';
    import TestLaytout from './test/layout.vue';
    const comm            = require('../_comm'),
          { emitter: em } = comm;

    em.emit('dev/trace', { msg: '初始化ComMain模块' });

    export default {
      data () {
        return {};
      },
      components: {
        TestLaytout
      },
      watch     : {},
      methods   : {},
      mounted   : function () {
        em.emit('dev/trace', '成功载入主视图');
      }
    };
</script>