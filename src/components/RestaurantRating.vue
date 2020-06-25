<template>
   <div id="restRating" class="prim">
    <span v-for="i in stars.numFullStars" :key="i" class="fa fa-star"></span>
    <span v-for="j in stars.numHalfStars" :key="j+10" class="fa fa-star-half-o"></span>
    <span v-for="k in (5- stars.numFullStars - stars.numHalfStars)" :key="k+20" class="fa fa-star-o checked"></span>  
  </div>
</template>

<script>
export default {
  name: "RestaurantCardRating",
  props: {
    rating: Number
  },
  computed: {
    stars: function() {
      let numFullStars =  Math.floor(this.rating);
      let numHalfStars = Math.ceil(this.rating - numFullStars);
      return {
        'numFullStars': numFullStars,
        'numHalfStars': numHalfStars
      }
    }
  }
}
</script>
