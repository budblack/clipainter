<template>
    <div :class="$style.tp_scene_container">

    </div>
</template>
<style lang="less" module>
    .tp_scene_container {

        width: 100%;
        height: 100%;

        background-color: rgb(105, 212, 212);;
    }
</style>
<script>
    const comm = require('../../_comm'),
        {emitter: em} = comm;

    const THREE = require('three/build/three');
    export default {
        data() {
            return {};
        },
        eatch: {},
        methods: {},
        mounted: async function () {
        }
    };
</script>