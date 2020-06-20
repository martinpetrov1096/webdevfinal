<template>
  <div id="gamePlay" class="container">

      <btn-reject class="reject"
        :visible="playing" 
        @click.native="submitVote(0)">
      </btn-reject>

      <div class="game shadow-l in-out"
        :class="{ 

          'yes': getBgColor()=='green',
          'no': getBgColor()=='red',
          'card-lg': playing, 
          'card-sm': !playing 
        }">
        <h1 v-if="playing">Playing</h1>
        <!--<restaurant-view 
          v-if="playing" 
          :current="this.current" 
          :flipped="this.submitted" 
          class="front">
        </restaurant-view>
        -->
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
      ></btn-heart>
  </div>
</template>

<script>
import io from 'socket.io-client';
import BtnHeart from "@/components/BtnHeart.vue";
import BtnReject from "@/components/BtnReject.vue";
//import RestaurantView from "@/components/RestaurantView.vue";

export default {
  name: "Game",
  components : {
    BtnHeart, 
    BtnReject,
    //RestaurantView
  },
  data() {
    return {
      playing: false,
      socket : io("https://picayune-responsible-jackfruit.glitch.me/",  {query: `joinCode=${this.$route.params.joinCode}`}),
      current : "",
      bgColor: this.$bgColor
     
    };
  },
  computed: {
    submitted: function() {
      if (this.$bgColor == "")
        return false;
      else
        return true;
    }
  },

  methods: {
    getBgColor() {
      return this.$bgColor;
    },
    startGame(){
      this.socket.emit("startGame");
      this.$bgColor = "na";
      console.log("startGame:" + this.$bgColor);
    },
    
    submitVote(vote) {

      switch(vote) {
        case 0: 
          this.$bgColor = "red";
          break;
        case 1: 
          this.$bgColor = "green";
          break;
      }
      console.log(this.$bgColor);


      setTimeout(() => {
       // this.$emit("bg", this.$bgColor);
        
      },300);
      setTimeout(()=> {
        this.socket.emit("submitVote", vote);
      }, 1000);
    }
  },
  mounted() {
    console.log(this.$bgColor)
    this.socket.emit("joinGame");
    
    this.socket.on("joinedGame", () => {
    });
    
    this.socket.on("startedGame", () => {
    });
    
    this.socket.on("nextChoice", data => {
      this.playing=true;
      this.current = data["restaurant"];
      this.$bgColor = "";
    });
    
    this.socket.on("endedGame", data => {
      alert("Winner!");
      this.$emit('winner', data);
    });
  }
  
};
</script>

<style scoped>

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
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
  width: 100px;
}

  
.front {
  height: 100px;
}
  

.lobby {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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