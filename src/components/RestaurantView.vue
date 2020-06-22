<template>
  <div id="restaurantView" class="card-lg shadow-l">
   
    <transition 
      name="slide-fade"
      mode="out-in">
      <div class="front"
        v-if="!flipped">
        <div class="img-container">
          <img class="rest-img"
            :src="restaurant.image_url">
        </div>

        <div class="name-price">
          <div class="name">{{this.restaurant.name}}</div>
          <div class="price">{{this.restaurant.price}}</div>
        </div>

        <div id="address"
          v-if="address!=null"> 
          {{this.address}}
        </div>    
        <div id="rating">
          <span v-for="i in stars.numFullStars" :key="i" class="fa fa-star"></span>
          <span v-for="j in stars.numHalfStars" :key="j+10" class="fa fa-star-half-o"></span>
          <span v-for="k in (5- stars.numFullStars - stars.numHalfStars)" :key="k+20" class="fa fa-star-o checked"></span>  
        </div>
      </div>
      <div class="back"
        v-else>
        <p> Waiting for others to vote</p>
      </div>
     
     </transition>
     

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
    
    };
  },
  computed: {
    address: function() {
      if (this.restaurant.location.display_address[0] != null) {
        return this.restaurant.location.display_address[0];
      } else {
        return "";
      }
    },

    stars: function() {
      let numFullStars =  Math.floor(this.restaurant.rating);
      let numHalfStars = Math.ceil(this.restaurant.rating - numFullStars);
      return {
        'numFullStars': numFullStars,
        'numHalfStars': numHalfStars
      }
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

.front {
  width: 100%;
  height: 100%;
}

.img-container {
  height: 50%;
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

  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.name {
  font-size: x-large;
  font-weight: 900;
}


</style>