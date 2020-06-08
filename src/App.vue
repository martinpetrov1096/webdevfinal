<template>
  <div id="app">
    <app-bg :fill="bgColor" class="bg"></app-bg>
    <transition name="slide-fade" mode="out-in">
        <game-pre v-if="state==0" @clicked="joinGame" class="gContainer"></game-pre>
        <game-play v-else v-bind:join-code="this.joinCode" @bg="bgColor=$event" class="gContainer"></game-play>
    </transition>
  </div>
</template>

<script>

import GamePlay from "@/components/GamePlay.vue";
import GamePre from "@/components/GamePre.vue";
import AppBg from "@/components/AppBg.vue";

export default {
  name: 'App',
  components: {
    GamePlay,
    GamePre,
    AppBg,
  },
  data() {
    return {
      bgColor: "red",
      state: 0,
      view: "",
      joinCode: ""
    }
  },
  methods: {
    joinGame(code) {
      console.log(code);
      this.joinCode = code;
      this.state = 1;
    }
  }
}
</script>

<style>


body,
html,
.bg,
#app
{
  width: 100%;
  height: 100%;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
}

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




</style>
