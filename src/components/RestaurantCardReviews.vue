<template>
  <div id="restCardReviews">
  
    <div class="review"
      v-for="review in reviews" 
      :key="review.id">

      <restaurant-rating
        :rating="review.rating"> 
      </restaurant-rating>

      <p class="review-text">
         {{review.text}}
      </p>
      
      <a class="username sec"
        :href="review.user.profile_url"> 
        {{review.user.name}} 
      </a>
    
    </div>

  </div>
</template>

<script>
import RestaurantRating from "@/components/RestaurantRating.vue";

export default {
  name: "RestaurantCardReviews",
  components: {
    RestaurantRating
  },
  props: {
    reviews: Array
  },

}
</script>

<style scoped>
#restCardReviews {
  height: 100%;
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
    scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE10+ */
}
/* Chrome */
#restCardReviews::-webkit-scrollbar { 
  width: 0px;
  background: transparent;
}

.review {
  flex-grow: 1;
  padding: 10px;
}

.username {
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
}
.username:hover {
  text-decoration: underline !important;
}
.username::before {
  content: "-";
}

</style>