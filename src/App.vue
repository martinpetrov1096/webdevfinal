<template>
  <div id="app">
    <app-bg v-bind:fill="bgColor" class="bg"></app-bg>

    <div v-if="state==0" class="flex" id="app">
      <div class="lobby card shadow-l">
        <button class="button primary"> New Game</button>
        <button class="button secondary"> Join Game</button>
      </div>
    </div>
    <div v-else class="flex">

      <play-game class="main" :class="{'lefts': bgColor=='green'}" ></play-game>
     
    </div>

  </div>
</template>

<script>
import "@/assets/css/global.css";
import "@/assets/css/reset.css";
import PlayGame from "@/components/PlayGame.vue";
import AppBg from "@/components/AppBg.vue";


export default {
  name: 'App',
  components: {
    PlayGame,
    AppBg,
  },
  data() {
    return {
      bgColor: "red",
      state: 0,
    }
  },
  methods: {

  }
}
</script>

<style>
body,
html,
.bg,
.flex,
#app
{
  width: 100%;
  height: 100%;
}

.flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.lobby {
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
}

</style>
