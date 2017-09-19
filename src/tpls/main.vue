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
    import TestLaytout from './layout/test_flex.vue';

    const comm = require('../_comm'),
        {emitter: em} = comm;

    em.emit('dev/trace', {msg: '初始化ComMain模块'});

    export default {
        data() {
            return {
                layoutTpl: 'layout/test_flex'
            };
        },
        components: {
            TestLaytout
        },
        watch: {},
        methods: {
            setLayoutTpl: function (tplName) {
                switch (tplName) {
                    default:
                        break;
                }
                this.layoutTpl = tplName;
                console.log(tplName)
            }
        },
        mounted: function () {
            em.emit('dev/trace', '成功载入主视图');
        }
    };
</script>