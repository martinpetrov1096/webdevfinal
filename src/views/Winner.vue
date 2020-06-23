<template>
  <div>
      <restaurant-card
        :restaurant="$store.getters.winner">
      </restaurant-card> 
      <h2
        @click="$store.dispatch('gameReset')"> 
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
  

  }


}
</script>