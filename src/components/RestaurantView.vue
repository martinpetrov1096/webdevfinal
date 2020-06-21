<template>
  <div id="restaurantView" class="card-lg shadow-l">
    <!--<transition 
      name="flip-fade"
      mode="out-in">

      <div
        v-if="!flipped" 
        key="normal" >

        <div></div>

        <div id="name-price">
          <div id="name">{{this.restaurant.name}}</div>
          <div id="price">{{this.restaurant.price}}</div>
        </div>

        <div v-if="rating !== null" id="rating">
          <span v-for="n in rating" :key="n" class="fa fa-star"></span>
          <span v-for="m in (5-rating)" :key="m" class="fa fa-star-o checked"></span>  
        </div>

        <div id="address"> {{this.address}} </div>        
     
      </div>
      <div
        v-else key="flipped">
        <h2> Waiting for others to vote </h2>
      </div>
    </transition> -->
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

  }
}

</script>

<style>
  #restaurantView{
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;

  }
  #pic {
    height: 100%;
    width: 100%;
    border-radius: 30px;
    background-size: 100%;
  }
 
  
  #name-price{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  
  #name{
    font-size: x-large;
    font-weight: 900;
  }


</style>