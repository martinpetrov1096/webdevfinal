<template>
  <div id="restaurantView">
    <div id="pic">
      <img :src="this.current.image_url">
    </div>
    
    <div id="name-price">
      <div id="name">
        {{this.current.name}}
      </div>
      <div id="price">
        {{this.current.price}}
      </div>
    </div>
    
   <!--  <div id="rating">
      <span v-for="n in this.current.rating" :key="n" class="fa fa-star"></span>
     <span v-for="m in (5-this.current.rating)" :key="m" class="fa fa-star-o checked"></span> 
    </div> -->
    
    <div id="address">
      {{this.address}}
    </div>        
  </div>

</template>

<script>

export default {
  name: "RestaurantView",
  props: ['current'],

  data() {
    return {
      address: this.current.location.display_address.toString(),
    };
  }
}

</script>

<style>
  #restaurantView{
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    height:100%;
  }
  
  #pic{
    flex:50%;
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
  
  img {
    max-width:100%;
    border-radius:30px;
  }

</style>