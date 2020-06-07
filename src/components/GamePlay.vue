<template>
  <div id="gamePlay">
    <btn-reject :visible="playing" @click.native="submitVote(0)"></btn-reject>
    <transition name="morph">  
      <div v-if="playing" key="play" :class="{'yes': submitted==2, 'no': submitted==1}" class="game card-lg shadow-l">

        <div v-if="submitted==0" class ="front">
          <img v-bind:src="this.current.image_url" class="rest-img">
          <p>{{this.current.name}}  {{this.current.price}}</p>
          <p>Rating {{this.current.rating}}</p>
          <p>Address {{this.current.location.display_address}}</p>
          <p>Review Count {{this.current.review_count}}</p>
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
      current : "",
      submitted: 0
    };
  },

  methods: {
    startGame(){
      this.socket.emit("startGame");
    },
    
    submitVote(vote){
      switch(vote) {
        case 0: 
          this.submitted=1;
          setTimeout(()=> {
            this.$emit("bg", "red");
          },300);
          break;
        case 1: 
          this.submitted=2;
          setTimeout(()=> {
            this.$emit("bg", "green");
          },300);
          break;
      }

      setTimeout(()=> {
        this.socket.emit("submitVote", vote);
        this.submitted = 0;
             // this.$emit('bg', ""); //TODO: added temp
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
    display: flex;
    justify-content: space-around;
    align-items: center;
   
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
    transform: rotateY(180deg);
  }
}
@keyframes no {
  0% { 
  }
  50% {
    transform: translateX(-400px) rotate(-45deg) rotateY(180deg);
  }
  100% {
    transform: rotateY(180deg);
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