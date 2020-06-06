<template>
  <div id="app">
    <app-bg v-bind:fill="bgColor" class="bg"></app-bg>
    
    <div class="card pre-game shadow-l">
      <transition name="slide-fade" mode="out-in">
          <div v-if="state==0">
            <game-join @code="initGame"></game-join>
            <search-bar @results="createGame"></search-bar>
          </div>
          <game-play v-else v-bind:join-code="this.joinCode" @bg="bgColor=$event"></game-play>
      </transition>
    </div>

  </div>
</template>

<script>
import "@/assets/css/reset.css";
import "@/assets/css/global.css";

import GamePlay from "@/components/GamePlay.vue";
import GameJoin from "@/components/GameJoin.vue";
import SearchBar from "@/components/SearchBar.vue";
import AppBg from "@/components/AppBg.vue";
import axios from "axios";

export default {
  name: 'App',
  components: {
    GamePlay,
    GameJoin,
    SearchBar,
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
    createGame(list) {
      var payload = list;
      axios({
        url: 'https://cors-anywhere.herokuapp.com/https://tested-quilled-regnosaurus.glitch.me/newGame',
        method: 'post',
        data: payload
      })
      .then(response => {
        this.joinCode = response.data;
        this.initGame(this.joinCode);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    initGame (code) {
      this.joinCode = code;
      this.state = 1;


    },
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

#app {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.pre-game {
  

  padding: 30px;
}

.slide-fade-enter-active {
    transition: all .2s ease-out;
}
.slide-fade-leave-active {
    transition: all .2s ease-in;
  }
  .slide-fade-enter {
    transform: translateY(15px);
    opacity: 0;
  } 
  .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateY(-15px);
    opacity: 0;
  }













</style>
