<template>
  <div id="restaurantCard" class="card-lg shadow-l"
    :class="{ 
      'no': $store.getters.voteState==1,
      'yes': $store.getters.voteState==2,
      'flip': flipped==true
    }">
   
    <transition 
      name="slide-fade"
      mode="out-in">

      <div class="front"
        v-if="!flipped"
        :key="1">

        <div class="img-container">
            <restaurant-card-gallery
              :img_urls="restaurant.photos"
            ></restaurant-card-gallery>
        </div>

        <div class="name-price">
          <div class="name">{{this.restaurant.name}}</div>
          <div class="price">{{this.restaurant.price}}</div>
        </div>

        <div class="address"> {{address}} </div>
           
        <div class="rating">
          <span v-for="i in stars.numFullStars" :key="i" class="fa fa-star"></span>
          <span v-for="j in stars.numHalfStars" :key="j+10" class="fa fa-star-half-o"></span>
          <span v-for="k in (5- stars.numFullStars - stars.numHalfStars)" :key="k+20" class="fa fa-star-o checked"></span>  
        </div>

        <div class="reviewBtn"
          @click="flipped=true">
          Top Reviews
        </div>

      </div>

      <div class="back"
        v-else
        :key="2">
        <p> Waiting for others to vote</p>
                <div class="reviewBtn"
          @click="flipped=false">
          Top Reviews
        </div>
      </div>
     
    </transition>

  </div>
</template>

<script>

import RestaurantCardGallery from "@/components/RestaurantCardGallery.vue";

export default {
  name: "RestaurantCard",
  components: {
    RestaurantCardGallery
  },
  props: {
    restaurant : Object,
    submitted: Boolean
  },
  data() {
    return {
      flipped: false
    }
  },
  computed: {
    address: function() {
      return this.restaurant.location.display_address[0];
    },
    stars: function() {
      let numFullStars =  Math.floor(this.restaurant.rating);
      let numHalfStars = Math.ceil(this.restaurant.rating - numFullStars);
      return {
        'numFullStars': numFullStars,
        'numHalfStars': numHalfStars
      }
    },
  },
  asyncComputed: {
    reviews: async function () {
      return await this.$http({
        url: "https://cors-anywhere.herokuapp.com/https://picayune-responsible-jackfruit.glitch.me/reviews",
        methods: "get",
        params: {
          "id": this.restaurant.id
        }
      })
      .then(resp => resp.data);
    }
  },
  methods: {

  }
}

</script>

<style>



#restaurantCard {

}

.front, .back {
  width: 100%;
  height: 100%;
    display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
}



.img-container {
  height: 60%;
  flex-grow: 1;
  margin-bottom: 20px;

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

.reviewBtn {
  align-self: flex-end;
  border-radius: 10px;
  border: 1px solid black;
  height: 35px;
  width: 100px;
  
  
  display: flex;
  justify-content: center;
  align-items: center;

}

/* Submit Animation */
.yes {
  animation: yes 1s;
}
.no {
  animation: no 1s;
}

.flip {
  animation: flip 1s;
}

@keyframes yes {
  0% { 
  }
  50% {
    transform: translateX(400px) rotate(45deg) rotateY(180deg);
  }
  100% {
    transform: translateX(0) rotateY(180deg);
  }
}
@keyframes no {
  0% { 
  }
  50% {
    transform: translateX(-400px) rotate(-45deg) rotateY(180deg);
  }
  100% {
    transform: translateX(0) rotateY(180deg);
  }
}

@keyframes flip {
  0% { 
    tranform:
  }
  50% {
    transform: rotateY(180deg);
  }

  100% {
    transform: rotate(0deg) rotateY(180deg);
  }
}
</style>