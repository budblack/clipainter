<template>
    <div :class="$style.container">
        <div :class="$style.row">
            <div :class="$style.grd"><TpSceneContainer></TpSceneContainer></div>
        </div>
        <div :class="$style.row">
            <div :class="$style.grd"></div>
        </div>
    </div>
</template>
<style lang="less" module>
    .container {
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: aquamarine;
    }

    .row {
        width: 100%;
        height: 50%;
    }

    .grd {
        width: 50%;
        height: 100%;

        background-color: lavender;

        border-style: dashed;
        border-width: 1px;
        border-color: #da7600;;
    }


</style>
<script>
    import TpSceneContainer from '../../tpls/view/tp_scene_container.vue';

    const comm            = require('../../_comm'),
          { emitter: em } = comm;

    export default {
      data () {
        return {};
      },
      watch     : {},
      components: {
        TpSceneContainer
      },
      methods   : {},
      mounted   : function () {
        em.emit('core/module/init', this);
      }
    };
</script>