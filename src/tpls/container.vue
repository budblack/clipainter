<template>
    <div :class="container">
        <TestLayout></TestLayout>
    </div>
</template>
<style lang="less" module>
    .container {
        background-color: aquamarine;
    }
</style>
<script>

    export default {
        data() {
        },
        components: {
            'test-laytout': require('./test/layout.vue')
        },
        eatch: {},
        methods: {},
        mounted: function () {

            this.emit('core/module/init', this)
        }
    }

</script>