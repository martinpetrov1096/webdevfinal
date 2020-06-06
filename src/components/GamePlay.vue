<template>
      <transition name="morph" mode="out-in">
        <div v-if="lobby" class="card shadow-1">
          <p>
            In Lobby for game {{this.joinCode}}
          </p>
          
          <button type="button" @click="startGame()">Start Game</button>
        </div>
        
        <div v-else id="playGame">
          
          <btn-reject @click.native="submitVote('no')"></btn-reject>
          <div class="card shadow-l">
            <img v-bind:src="this.current.image_url" alt="" width="400px">
            <p>{{this.current.name}}  {{this.current.price}}</p>
            <p>Rating {{this.current.rating}}</p>
            <p>Address {{this.current.location.display_address}}</p>
            <p>REview Count {{this.current.review_count}}</p>
          </div>
          <btn-heart  @click.native="submitVote('yes')"></btn-heart>
    
        </div>
      

      </transition>
</template>
<script>
  
import io from 'socket.io-client';
import BtnHeart from "@/components/BtnHeart.vue";
import BtnReject from "@/components/BtnReject.vue";

export default {
  name: "PlayGame",
  props: ['joinCode'],
  components : {BtnHeart, BtnReject},
  data() {
    return {
      lobby: true,
      socket : io("https://tested-quilled-regnosaurus.glitch.me/",  {query: `joinCode=${this.joinCode}`}),
      current : ""
    };
  },

  methods: {
    startGame(){
      this.socket.emit("startGame");
    },
    
    submitVote(vote){
      if (vote == 'yes'){
        this.socket.emit("submitVote", 1);
        this.$emit('bg', "green");
      } else {
        this.socket.emit("submitVote", 0);
        this.$emit('bg', "red");
      }
    }
  },
  mounted() {
    this.socket.emit("joinGame");
    
    this.socket.on("joinedGame", () => {
      this.lobby=true;
    });
    
    this.socket.on("startedGame", () => {
      this.lobby=false;
    });
    
    this.socket.on("nextChoice", data => {
      this.current = data["restaurant"];
      this.$emit('bg', "neither");
    });
    
    this.socket.on("endedGame", data => {
      this.$emit('winner', data);
    });
  }
  
};
</script>

<style scoped>

#playGame {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
   
}

.card {

    width: 400px;
    height: 400px;
    
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