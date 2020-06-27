<template>
  <div id="winner">

      <div class="win" 
        :class="{'invisible':!showWin,
                'win-slide':showWin}">
        Winner
      </div>

      <restaurant-card class="rest-card"
        :restaurant="$store.getters.current">
      </restaurant-card> 
      
      <h2 class="new-game btn btn-rect-lg prim-bg"
        @click="reset"> 
        New Game 
      </h2>

  </div>
</template>

<script>
import RestaurantCard from "@/components/RestaurantCard.vue";
export default {
  name: "Winner",
  components: {
    RestaurantCard
  },
  data() {
    return {
      showWin: false
    }
  },
  methods: {
    reset: function() {
      this.$store.dispatch('gameReset');
      this.$router.push("/");
    }
  },
  mounted() {
    setTimeout(()=> {
      this.showWin = true;
    }, 700);
  }
}
</script>

<style scoped>
#winner {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.win {
  flex-shrink: 1;
  color: white;
  font-size: 8vw;
}

.new-game {
  margin-top: 25px;
}


/* Winning Animation */
.win-slide {
  animation: win .7s;
} 
@keyframes win {
  0% {
    transform: translateY(-300px) rotate(-30deg);
  }
  40% {
    transform: translateY(50px) rotate(10deg);
  }
  70% {
    transform: translateY(-30px) rotate(-5deg);
  }
  100% {
    transform: translateY(0) rotate(0);
  }
}

</style>