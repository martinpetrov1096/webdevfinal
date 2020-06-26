<template>
  <div class="container">
    <transition
      name="slide-roll"> 

      <div class="game"
        v-if="$store.getters.gameState==2 && $store.getters.current != undefined"
        key="game">

        <btn-reject class="btn-vote"
         :class="{'invisible':voteSubmitted}"
          @click.native="$store.dispatch('voteNo')">
        </btn-reject> 
        <restaurant-card class="rest-view"
          :restaurant="$store.getters.current"
          :submitted="$store.getters.voteState">
        </restaurant-card>
        <btn-heart class="btn-vote"
          :class="{'invisible':voteSubmitted}"
          @click.native="$store.dispatch('voteYes')">
        </btn-heart> 

      </div>

      <div class="lobby"
        v-else
        key="lobby">
        <h3>Share this url with friends </h3> 
        <div class="startBtn"
          @click="$store.dispatch('gameStart')">
        </div>
        <h3>Click start when they have all joined</h3> 
      </div>

    </transition>
  </div>
</template>

<script>
//import io from 'socket.io-client';
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
  computed: {
    voteSubmitted: function() {
      return this.$store.getters.voteState != 0;
    }
  },
  
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
  margin: 20px 10px;
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

/* Mobile Device Layout */
@media only screen and (max-width: 600px) {
  .game {
    flex-flow: row wrap;
    justify-content: space-around;
  }
  .rest-view {
    order: -1;
    height: calc(100% - 240px) !important;
    width: auto;
    margin: 0 20px;
    max-width: 300px !important;
    flex-basis: 100%;
  }
  .btn-vote {
    flex-basis: calc(50% - 20px);
  }
}

</style>