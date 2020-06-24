<template>
  <div class="container">
    <transition
      name="slide-roll"> 
      <div class="game"
        v-if="playing"
        key="game">

        <btn-reject class="btn-vote"
          v-if="!voteSubmitted"
          @click.native="submitVote(0)">
        </btn-reject> 

        <restaurant-card class="rest-view"
          :restaurant="current"
          :submitted="voteSubmitted">
          
        </restaurant-card>

        <btn-heart class="btn-vote"
        v-if="!voteSubmitted"
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
import RestaurantCard from "@/components/RestaurantCard.vue";

export default {
  name: "Game",
  components : {
    BtnHeart, 
    BtnReject,
    RestaurantCard
  },
  data() {
    return {
      playing: true,
      socket : io("https://picayune-responsible-jackfruit.glitch.me/",  {query: `joinCode=${this.$route.params.joinCode}`}),
      current : {"id":"K5FVrRw9HLMLrUarxZOrLA","alias":"rajas-tandoor-davis-2","name":"Raja's Tandoor","image_url":"https://s3-media4.fl.yelpcdn.com/bphoto/MNwZGfDYNh1DVxv4YEeLnA/o.jpg","is_claimed":true,"is_closed":false,"url":"https://www.yelp.com/biz/rajas-tandoor-davis-2?adjust_creative=rli8547ivA_z5fyGAqu2ug&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=rli8547ivA_z5fyGAqu2ug","phone":"+15307539664","display_phone":"(530) 753-9664","review_count":617,"categories":[{"alias":"indpak","title":"Indian"}],"rating":4,"location":{"address1":"207 3rd St","address2":"Ste 230","address3":"","city":"Davis","zip_code":"95616","country":"US","state":"CA","display_address":["207 3rd St","Ste 230","Davis, CA 95616"],"cross_streets":""},"coordinates":{"latitude":38.543752,"longitude":-121.746706},"photos":["https://s3-media4.fl.yelpcdn.com/bphoto/MNwZGfDYNh1DVxv4YEeLnA/o.jpg","https://s3-media2.fl.yelpcdn.com/bphoto/TYMPYgZnFU23LLhacClIcQ/o.jpg","https://s3-media1.fl.yelpcdn.com/bphoto/FcbzaA-iX7Jacgud6MqAbg/o.jpg"],"price":"$","hours":[{"open":[{"is_overnight":false,"start":"1100","end":"2030","day":0},{"is_overnight":false,"start":"1100","end":"2030","day":1},{"is_overnight":false,"start":"1100","end":"2030","day":2},{"is_overnight":false,"start":"1100","end":"2030","day":3},{"is_overnight":false,"start":"1100","end":"2030","day":4},{"is_overnight":false,"start":"1100","end":"2030","day":5},{"is_overnight":false,"start":"1100","end":"2030","day":6}],"hours_type":"REGULAR","is_open_now":true}],"transactions":["pickup","delivery"]}
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
    
    this.socket.on("startedGame", data => {
      this.current = data["restaurant"];
      this.$store.commit("voteReset");
      this.playing = true;
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