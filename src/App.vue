<template>
  <div id="app">
    <app-bg class="bg"></app-bg>
    <transition name="slide-fade" mode="out-in">
      <router-view id="view"></router-view >
    </transition>

    <!--<transition name="slide-fade" mode="out-in">
        <game-pre v-if="state==0" @clicked="joinGame" class="gContainer"></game-pre>
        <game-play v-else v-bind:join-code="this.joinCode" @bg="bgColor=$event" class="gContainer"></game-play>
    </transition> -->
  </div>
</template>

<script>
import AppBg from "@/components/AppBg.vue";

export default {
  name: 'App',
  components: {
    AppBg,
  }
}
</script>

<style>


body,
html,
.bg,
#app,
#view
{
  width: 100%;
  height: 100%;
}

#view {
  
}




/*
.gContainer {
  height: 100%;
  width: 100%;

  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 600px) {
  .gContainer {
    flex-wrap: wrap;
  }
}


*/

</style>
