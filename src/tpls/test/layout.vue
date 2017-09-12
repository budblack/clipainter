<template>
    <div :class="$style.container">
        Container
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
        eatch: {},
        methods: {},
        mounted: function () {
            this.emit('core/module/init', this)
        }
    }
</script>