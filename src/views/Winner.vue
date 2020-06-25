<template>
  <div class="container">

      <restaurant-card
        :restaurant="$store.getters.winner">
      </restaurant-card> 
      <h2 class="btn btn-rect-lg prim-bg"
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

<style scoped>
.container {
  display: flex;
    flex-flow: column;
  justify-content: space-between;
  align-items: center;

}

h2 {
  margin-top: 25px;
}

</style>