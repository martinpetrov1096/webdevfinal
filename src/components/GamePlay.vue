<template>
  <div id="gamePlay">
      <btn-reject :visible="playing" @click.native="submitVote(0)" class="reject"></btn-reject>
      <transition name="morph">  
        <div v-if="playing" key="play" :class="{'yes': bgColor=='green', 'no': bgColor=='red'}" class="game card-lg shadow-l">

          <div v-if="!submitted" class ="front">
            <img v-bind:src="this.current.image_url" class="rest-img">
          </div>
          <div v-else class="back">
            <h2> Waiting for other players to vote </h2>
          </div>

        </div>
        <div v-else key="lobby" class="lobby card-sm shadow-l">
          <p>In Lobby for game {{this.joinCode}}</p>
          <button type="button" @click="startGame('yes')">Start Game</button>
        </div>
      </transition>
      <btn-heart :visible="playing" @click.native="submitVote(1)" class="heart"></btn-heart>
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
      socket : io("https://functional-opaque-kosmoceratops.glitch.me/",  {query: `joinCode=${this.joinCode}`}),
      current : "",
      submitted: false,
      bgColor: ""
    };
  },

  methods: {
    startGame(){
      this.socket.emit("startGame");
    },
    
    submitVote(vote) {

      switch(vote) {
        case 0: 
            this.bgColor = "red";
          break;
        case 1: 
            this.bgColor = "green";
          break;
      }
      this.submitted= true;

      setTimeout(() => {
        this.$emit("bg", this.bgColor);
      },300);
     
      setTimeout(()=> {
        this.socket.emit("submitVote", vote);
        this.submitted = false;
      }, 2000);
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
  flex-flow: row wrap
}


@media only screen and (max-width: 600px) {
  .game {
    flex-basis: 100%;
    margin: 0 40px;
    order: -1;
  }

}


.rest-img {
  height: 200px;
}




  

/* Submit Animation */
.yes {
  animation: yes 1s;
}
.no {
  animation: no 1s;
}

.yes > * {
  visibility: hidden;
}

.no > * {
  visibility: hidden;
}



@keyframes yes {
  0% { 
  }
  50% {
    transform: translateX(400px) rotate(45deg) rotateY(180deg);
  }
  100% {
    transform: translateX(0) rotateY(180deg);
  }
}
@keyframes no {
  0% { 
  }
  50% {
    transform: translateX(-400px) rotate(-45deg) rotateY(180deg);
  }
  100% {
    transform: translateX(0) rotateY(180deg);
  }
}


/* Morph Animation */
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