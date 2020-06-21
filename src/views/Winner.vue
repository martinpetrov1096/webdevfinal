<template>
  <div>
      <restaurant-view
        :current="restaurant">
      </restaurant-view> 
      <h1>{{restaurant}}</h1>
      <h2
        @click="$store.dispatch('gameReset')"> 
        New Game 
      </h2>
  </div>

</template>

<script>
import RestaurantView from "@/components/RestaurantView.vue";
export default {
  name: "Winner",
  components: {
    RestaurantView
  },
  data() {
    return {
      restaurant: this.$store.getters.winner
    }
  }


}
</script>