<template>
    <div :class="$style.container">
        <div :class="$style.block">
            <TpSceneContainer></TpSceneContainer>
        </div>
        <div :class="$style.block">
            <div>
                <button @click="debugInitScene()">初始化场景</button>
            </div>
        </div>
        <div :class="$style.block"></div>
        <div :class="$style.block"></div>
        <div :class="$style.block"></div>
        <div :class="$style.block">
            <div>

            </div>
        </div>
    </div>
</template>
<style lang="less" module>
    .container {
        display: flex;
        flex-flow: wrap;
        justify-content: center;

        background-color: aquamarine;
    }

    .block {
        margin: 2px;
        background-color: lavender;

        width: 400px;
        height: 300px;

        border-style: dashed;
        border-width: 1px;
        border-color: #da7600;;
    }


</style>
<script>
    import TpSceneContainer from '../../tpls/view/tp_scene_container.vue';

    const comm = require('../../_comm'),
        {emitter: em} = comm;

    export default {
        data() {
            return {};
        },
        watch: {},
        components: {
            TpSceneContainer
        },
        methods: {
            debugInitScene: function () {
                em.emit('dev/trace', {msg: '初始化场景'});

            }
        },
        mounted: function () {
            em.emit('core/module/init', this);
        }
    };
</script>