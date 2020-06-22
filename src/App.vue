<template>
  <div id="app">
    <app-bg class="bg"></app-bg>
    <transition name="slide-fade" mode="out-in">
      <router-view id="view"></router-view >
    </transition>
  </div>
</template>

<script>

import AppBg from "@/components/AppBg.vue";

export default {
  name: 'App',
  components: {
    AppBg
  }
}

</script>

<style>
/* 
  Every router-view will be wrapped
  in a container (#view) with some
  padding
*/
body,
html,
.bg,
#app
{
  overflow: hidden;
  width: 100%;
  height: 100%;
}

#view {
  height: calc(100% - 60px);
  width: calc(100% - 60px);
  padding: 30px;
}

@media only screen and (max-width: 600px) {
  #view {
    height: calc(100% - 12px);
    width: calc(100% - 12px);
    padding: 5px;
  }
}
</style>
