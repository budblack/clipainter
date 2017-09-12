<template>
    <div>
        Container
    </div>
</template>
<style>

</style>
<script>
    export default {
      data () {
      },
      eatch  : {},
      methods: {},
      mounted: function () {
        this.emit('core/module/init', this)
      }
    }
</script>