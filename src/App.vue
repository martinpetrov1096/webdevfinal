<template>

  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

    <app-bg class="bg"></app-bg>
    <transition name="slide-fade" mode="out-in">
      <router-view class="view"></router-view >
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
#app,
.view
{
  overflow: hidden;
  width: 100%;
  height: 100%;
  font-family: 'Lato', sans-serif;
}




</style>
