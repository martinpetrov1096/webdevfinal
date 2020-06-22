<template>
  <div class="container">
    <transition
      name="slide-roll"> 
      <div class="game"
        v-if="playing"
        key="game">

        <btn-reject class="btn-vote"
          @click.native="submitVote(0)">
        </btn-reject> 

        <restaurant-view class="rest-view"
          :restaurant="current"
          :flipped="voteSubmitted"
          :class="{ 
            'no': $store.getters.voteState==1,
            'yes': $store.getters.voteState==2
            }">
        </restaurant-view>

        <btn-heart class="btn-vote"
          @click.native="submitVote(1)">
        </btn-heart> 

      </div>

      <div class="lobby"
        v-else
        key="lobby">
        <h3>Share this url with friends </h3> 
        <div class="startBtn"
          @click="startGame()">
        </div>
        <h3>Click start when they have all joined</h3> 
      </div>

    </transition>
  </div>
</template>

<script>
import io from 'socket.io-client';
import BtnHeart from "@/components/BtnHeart.vue";
import BtnReject from "@/components/BtnReject.vue";
import RestaurantView from "@/components/RestaurantView.vue";

export default {
  name: "Game",
  components : {
    BtnHeart, 
    BtnReject,
    RestaurantView
  },
  data() {
    return {
      playing: false,
      socket : io("https://picayune-responsible-jackfruit.glitch.me/",  {query: `joinCode=${this.$route.params.joinCode}`}),
      current : ""
    };
  },
  computed: {
    voteSubmitted: function() {
      if (this.$store.getters.voteState == 0)
        return false;
      else
        return true;
    }
  },

  methods: {
    startGame(){
      this.playing = true;
      this.socket.emit("startGame");
      this.$store.commit("voteReset");
    },
    submitVote(vote) {
      switch(vote) {
        case 0: 
          this.$store.commit("voteNo");
          break;
        case 1: 
          this.$store.commit("voteYes");
          break;
      }
      // Wait 1 second just to show the animation
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
    });
    
    this.socket.on("nextChoice", data => {
      this.current = data["restaurant"];
      this.$store.commit("voteReset");
      this.playing=true;
    });
    
    this.socket.on("endedGame", data => {
     this.$store.dispatch("gameEnd", this.current);
     console.log(data);
    });
  }
  
};
</script>

<style scoped>
.container {
  width: inherit;
  height: inherit;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.lobby {
  width: 300px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.lobby h3 {
  color: white;
  font-size: 18px;
}

.startBtn {
  color: white;
  font-size: 120px;
  transition: all .1s ease-in;
  text-shadow: 0 10px 20px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.startBtn:hover {
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.19), 0 2px 4px rgba(0, 0, 0, 0.23);
}
.startBtn::before {
  text-align: center;
  font-family: "FontAwesome";
  content: '\f144';
}

.game {
  height: inherit;

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.rest-view {
    transition: box-shadow .3s ease-in-out;
}

.btn-vote {
  margin:20px 10px;
}



/* Mobile Device Layout */
@media only screen and (max-width: 600px) {
  .game {
    flex-flow: row wrap;
    justify-content: space-around;
  }
  .rest-view {
    height: calc(100% - 240px) !important;
    width: auto;
    margin: 0 20px;
    max-width: 300px !important;
    flex-basis: 100%;
    order: -1;
  }
  .btn-vote {
    flex-basis: calc(50% - 20px);
  }

}

/* Submit Animation */
.yes {
  animation: yes 1s;
}
.no {
  animation: no 1s;
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

/* Start Game Animation */
.slide-roll-leave-active {
  position: absolute;
  text-shadow: none;
  transition: text-shadow .3s ease-in-out;
  animation: slide-roll-exit 1s ease-in-out;
}

.slide-roll-enter-active {
  position: relative;
  left: calc(50% + 300px);
  animation: slide-roll-enter 1s ease-in-out;
  
} 
.slide-roll-enter-active .rest-view {
  box-shadow: none;
}
@keyframes slide-roll-exit {
  0% {
    left: calc(50% - 150px);
  }
  100% {
    left: calc(0% - 300px);
  }
}
@keyframes slide-roll-enter {
  0% {
    left: calc(50% + 300px);
  }
  100% {
    left: 0;
  }
}

</style>