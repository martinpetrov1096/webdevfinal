<template>
  <div id="app">
    <app-bg :fill="bgColor" class="bg"></app-bg>
    <transition name="slide-fade" mode="out-in">
        <game-pre v-if="state==0" @clicked="joinGame"></game-pre>
        <game-play class="game" v-else v-bind:join-code="this.joinCode" @bg="bgColor=$event"></game-play>
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
      state: 1,
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



@media only screen and (max-width: 400px) {

  .game {
    flex-flow: row wrap;
    width:95%;
  }

}









.morph-enter {
  opacity: 0;
} 

.morph-enter-active {
  transition: opacity .4s linear .6s;
  position: absolute !important;
}

.morph-leave {
  opacity: 1;
} 

.morph-leave-active {
  position: absolute !important;
  animation:  scaleUp .4s;
  animation-delay: .2s;
  animation-fill-mode: forwards;

  transition: opacity .4s linear .6s;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.19), 0 2px 4px rgba(0, 0, 0, 0.23);

}

.morph-leave-active > * {
    opacity: 0;
    transition: all .2s linear;
    transform: translateY(-15px);
}


@keyframes scaleUp {
  0% {
    transform: scale();
  }

  100% {
    transform: scaleY(1.5);
  }
}



</style>
