<template>
  <div id="gamePlay">
    <btn-reject :visible="playing" @click.native="submitVote(0)"></btn-reject>
    <transition name="morph">  
      <div v-if="playing" key="play" class="game card-lg shadow-l">
         <img v-bind:src="this.current.image_url" class="rest-img">
          <p>{{this.current.name}}  {{this.current.price}}</p>
          <p>Rating {{this.current.rating}}</p>
          <p>Address {{this.current.location.display_address}}</p>
          <p>REview Count {{this.current.review_count}}</p>
      </div>
      <div v-else key="lobby" class="lobby card-sm shadow-l">
        <p>In Lobby for game {{this.joinCode}}</p>
        <button type="button" @click="startGame('yes')">Start Game</button>
      </div>
    </transition>
    <btn-heart :visible="playing" @click.native="submitVote(1)"></btn-heart>
  </div>
</template>

<script>
import "@/assets/css/reset.css";

import io from 'socket.io-client';
import BtnHeart from "@/components/BtnHeart.vue";
import BtnReject from "@/components/BtnReject.vue";

export default {
  name: "GamePlay",
  props: ['joinCode'],
  components : {BtnHeart, BtnReject},
  data() {
    return {
      playing: false,
      socket : io("https://tested-quilled-regnosaurus.glitch.me/",  {query: `joinCode=${this.joinCode}`}),
      current : ""
    };
  },

  methods: {
    startGame(){
      this.socket.emit("startGame");
    },
    
    submitVote(vote){
      switch(vote) {
        case 0: 
          this.$emit('bg', "red");
          break;
        case 1: 
          this.$emit('bg', "green");
          break;
      }
      setTimeout(()=> {
        this.socket.emit("submitVote", vote);
      }, 1000);
    }
  },
  mounted() {
    this.socket.emit("joinGame");
    
    this.socket.on("joinedGame", () => {
    });
    
    this.socket.on("startedGame", () => {
      this.playing=true;
    });
    
    this.socket.on("nextChoice", data => {
      this.current = data["restaurant"];
      this.$emit('bg', "");
    });
    
    this.socket.on("endedGame", data => {
      this.$emit('winner', data);
    });
  }
  
};
</script>

<style scoped>

#gamePlay {
    display: flex;
    justify-content: space-around;
    align-items: center;
   
}

.rest-img {
  height: 200px;
}



@keyframes scaleUp {
  0% {
    transform: scale();
  }

  100% {
    transform: scaleY(1.5);
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




</style>