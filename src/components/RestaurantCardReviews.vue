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
      
      <a class="username"
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
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
}

.review {
  flex-grow: 1;
}

.profile {
  display: flex;
  align-items: flex-end;

}

.username {
  font-weight: bold;
  color: #FF616F;
  text-decoration: none;
}

.username::before {
  content: "-";
}

</style>