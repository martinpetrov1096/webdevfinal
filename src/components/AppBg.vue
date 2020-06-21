<template>
    <div id="app-bg">
        <div class="red bg" :class="{'fill-bg': bgColor=='red', 'nill-bg': bgColor=='green' }"></div>
        <div class="green bg"  :class="{'nill-bg': bgColor=='red', 'fill-bg': bgColor=='green' }"></div>
    </div>
</template>

<script>
export default {
    name: "AppBg",
    computed: {
      bgColor: function() {
        return this.$store.state.bgColor;
      }
    }
}
</script>

<style scoped>

#app-bg {
    position: absolute;
    width: 100%;
    height: 100%;
}
.bg {
  z-index: -2;
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  transition: all .5s ease-out;
  transition-delay: .2s;
}
.nill-bg {
  z-index: -2 !important;
  width: 0 !important;
}
.fill-bg {
  z-index: -1 !important;
  width: 100% !important;
}
.red {
  left: 0;
  background: #FF616F;
}
.green {
  right: 0;
  background: #37DB73;
}
</style>