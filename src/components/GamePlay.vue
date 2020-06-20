<template>
  <div id="gamePlay">
      <btn-reject :visible="playing" @click.native="submitVote(0)" class="reject"></btn-reject>
        <div :class="{ 'card-lg': playing, 'card-sm': !playing, 'yes': bgColor=='green', 'no': bgColor=='red'}" class="game shadow-l in-out">
         
            <restaurant-view v-if="playing" :current="this.current" :flipped="this.submitted" class="front"></restaurant-view>

          <div v-else class="lobby">

            <p>In Lobby for game {{this.joinCode}}</p>
            <div class="button">
             <div class="mif-chevron-right mif-4x" @click="startGame()"></div>
           </div>
          </div>
        </div>
      <btn-heart :visible="playing" @click.native="submitVote(1)" class="heart"></btn-heart>
  </div>
</template>

<script>
import "@/assets/css/reset.css";

import io from 'socket.io-client';
import BtnHeart from "@/components/BtnHeart.vue";
import BtnReject from "@/components/BtnReject.vue";
import RestaurantView from "@/components/RestaurantView.vue";

export default {
  name: "GamePlay",
  props: ['joinCode'],
  components : {
    BtnHeart, 
    BtnReject,
    RestaurantView
  },
  data() {
    return {
      playing: false,
      socket : io("https://picayune-responsible-jackfruit.glitch.me/",  {query: `joinCode=${this.joinCode}`}),
      current : "",

      bgColor: ""
    };
  },
  computed: {
    submitted: function() {
      if (this.bgColor == "")
        return false;
      else
        return true;
    }
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


      setTimeout(() => {
        this.$emit("bg", this.bgColor);
      },300);
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
      this.playing=true;
      this.current = data["restaurant"];
      console.log(this.current);
      this.bgColor = "";
      this.$emit('bg', this.bgColor);
    });
    
    this.socket.on("endedGame", data => {
      alert("Winner!");
      this.bgColor= "";
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
  width: 100px;
}

  
.front {
  height: 100px;
}
  
.button {
  width : auto;
  background-color:#455a64;
   display:flex;
    justify-content:center;
    align-items:center;
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