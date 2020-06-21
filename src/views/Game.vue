<template>

    <div class="game"
      v-if="playing">
      <btn-reject></btn-reject>
      <restaurant-view class="rest-view"
        :restaurant="current"
        :flipped="voteSubmitted">
      </restaurant-view>
      <btn-heart></btn-heart>
    
    
    </div>
    <div class="lobby"
      v-else>
      <p>In Lobby for game {{this.$route.params.joinCode}}</p>
      <div class="btn-lg"
        @click="startGame()">
      </div>
    


     <!-- <btn-reject class="reject"
        :visible="playing" 
        @click.native="submitVote(0)">
      </btn-reject>

      <div class="game shadow-l in-out"
        :class="{ 
          'no': $store.getters.voteState==1,
          'yes': $store.getters.voteState==2,
          'card-lg': playing, 
          'card-sm': !playing 
        }">

        <h1 v-if="playing">Playing</h1>
        <restaurant-view class="front"
          v-if="playing" 
          :current="this.current" 
          :flipped="this.voteSubmitted">
        </restaurant-view>
  
        <div class="lobby"
          v-else>

          <p>In Lobby for game {{this.$route.params.joinCode}}</p>
          <div class="btn-lg"
            @click="startGame()">
          </div>

        </div>

      </div>

      <btn-heart class="heart" 
        :visible="playing" 
        @click.native="submitVote(1)" 
      ></btn-heart> -->
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
      playing: true,
      socket : io("https://picayune-responsible-jackfruit.glitch.me/",  {query: `joinCode=${this.$route.params.joinCode}`}),
      current : "",
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
      this.socket.emit("startGame");
      this.$store.commit("voteReset")
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
      //this.$router.push("/winner/"+this.current.id);
     this.$store.dispatch("gameEnd", this.current);
     console.log(data);
    });
  }
  
};
</script>

<style scoped>

.game {
  height: 100%;

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

}

.rest-view {

}



@media only screen and (max-width: 600px) {
  .game {
    flex-flow: row wrap;
    justify-content: space-around;
  }
  .rest-view {
    height: calc(100% - 240px);
    flex-basis: 100%;
    order: -1;
  }

}


.lobby {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
 
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



</style>