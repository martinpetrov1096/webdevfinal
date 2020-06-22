<template>
  <div id="restaurantView" class="card-lg shadow-l">
   
     
        <div class="img-container">
          <img class="rest-img"
            :src="restaurant.image_url">
        </div>

        <div class="name-price">
          <div class="name">{{this.restaurant.name}}</div>
          <div class="price">{{this.restaurant.price}}</div>
        </div>

        <!--<div v-if="rating !== null" id="rating">
          <span v-for="n in rating" :key="n" class="fa fa-star"></span>
          <span v-for="m in (5-rating)" :key="m" class="fa fa-star-o checked"></span>  
        </div> -->

        <div id="address"> {{this.address}} </div>        
     
  
     

  </div>
</template>

<script>

export default {
  name: "RestaurantView",
  props: {
    restaurant : Object,
    flipped: Boolean
  },
  data() {
    return {
      address: this.restaurant.location.display_address.toString(),
      rating: Math.floor(this.restaurant.rating)
    };
  },
  computed: {
    bg: function() {
      return "background-image: url('" + this.restaurant.image_url + "');"
    }
  }
}

</script>

<style>

#restaurantView {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
}

.img-container {
  height: 70%;
  flex-grow: 1;
  margin-bottom: 20px;

}
.rest-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px;
}


 
 
  
.name-price {
    flex-basis: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.name {
  font-size: x-large;
  font-weight: 900;
}


</style>