<template>
  <div class="container">
    <transition
      name="slide-fade"
      mode="out-in"> 

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
      <game-lobby
        v-else
        key="lobby">
      </game-lobby>


    </transition>
  </div>
</template>

<script>
//import io from 'socket.io-client';
import BtnHeart from "@/components/BtnHeart.vue";
import BtnReject from "@/components/BtnReject.vue";
import RestaurantCard from "@/components/RestaurantCard.vue";
import GameLobby from "@/components/GameLobby.vue";

export default {
  name: "Game",
  components : {
    BtnHeart, 
    BtnReject,
    RestaurantCard,
    GameLobby
  },
  computed: {
    voteSubmitted: function() {
      return this.$store.getters.voteState != 0;
    }
  }, 
  mounted: function() {
     this.$store.dispatch("gameJoin", this.$route.params.joinCode);
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