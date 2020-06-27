
<template>
  <div id="restaurantCard" class="card-lg shadow-l"
  v-if="restaurant!=null"
    :class="{ 
      'no': submitted==1 && submitClass==true,
      'yes': submitted==2 && submitClass==true,
      'flip': flipped==true && flipClass==true,
      'unflip': flipped==false && flipClass==true,
    }">
   
    <transition 
      name="flip-fade"
      mode="out-in">

      <div class="front"
        v-if="!flipped"
        :key="restaurant.alias">

        <div class="img-container">
            <restaurant-card-gallery
              :img_urls="restaurant.photos">
            </restaurant-card-gallery>
        </div>

        <div class="name-price">
          <div class="name">{{restaurant.name}}</div>
          <div class="price">{{restaurant.price}}</div>
        </div>

        <div class="address"> {{this.restaurant.location.address1}} </div>
           
        <restaurant-rating
          :rating="restaurant.rating">
        </restaurant-rating>

        <div class="reviewBtn btn btn-rect-sm sec-bg"
          @click="flipped=true;">
          Reviews
        </div>

      </div>

      <div class="back"
        v-else
        :key="2">

        <restaurant-card-reviews
          :reviews="reviews">
        </restaurant-card-reviews>

        <div class="reviewBtn btn btn-rect-sm sec-bg"
          @click="flipped=false">
          Back
        </div>

      </div>
     
    </transition>

  </div>
</template>

<script>
import RestaurantCardGallery from "@/components/RestaurantCardGallery.vue";
import RestaurantCardReviews from "@/components/RestaurantCardReviews.vue";
import RestaurantRating from "@/components/RestaurantRating.vue";
export default {
  name: "RestaurantCard",
  components: {
    RestaurantCardGallery,
    RestaurantCardReviews,
    RestaurantRating
  },
  props: {
    restaurant : {

      Object
    },
    submitted: Number
  },
  data() {
    return {
      flipped: false,
      submitClass: false,
      flipClass: false
    }
  },
  computed: {
  },
  asyncComputed: {
    reviews: async function () {
      return await this.$http({
        url: "http://localhost:3000/reviews",
        methods: "get",
        params: {
          "id": this.restaurant.id
        }
      })
      .then(resp => resp.data);
    }
  },
  watch: {
    submitted: function() {
      if(this.submitted) {
        
        if(this.flipped) 
          this.flipped = false;
        this.submitClass = true;
        setTimeout(() => {
          this.submitClass = false;
        }, 1000);
      
      }
    },
    flipped: function() {
      if (!this.submitted) {
        this.flipClass = true;
        setTimeout(() => {
          this.flipClass = false;
        }, 1200);
      }
    }
  }
}
</script>

<style>
.front, .back {
  transition: all .1s linear;
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
  
}
/* Submit Animation */
.yes {
  animation: yes 1s;
}
.no {
  animation: no 1s;
}
.yes > * {
  opacity: 0;
}
.no > * {
  opacity: 0;
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
@-webkit-keyframes yes {
  0% { 
  }
  50% {
    -webkit-transform: translateX(400px) rotate(45deg) rotateY(180deg);
  }
  100% {
    -webkit-transform: translateX(0) rotateY(180deg);
  }
}
@-webkit-keyframes no {
  0% { 
  }
  50% {
    -webkit-transform: translateX(-400px) rotate(-45deg) rotateY(180deg);
  }
  100% {
    -webkit-transform: translateX(0) rotateY(180deg);
  }
}
/* Flip animation */
.flip-fade-enter-active {
    transition: all .2s ease-out;
    transition-delay: .8s;
}
.flip-fade-leave-active {
    transition: all .2s ease-in;
}
.flip-fade-enter {
    transform: translateY(15px);
    opacity: 0;
} 
.flip-fade-leave-to {
    transform: translateY(-15px);
    opacity: 0;
}
.flip {
  animation: flip .8s;
  animation-delay: .2s;
}
.unflip {
  animation: flip .8s;
  animation-delay: .2s;
}
@keyframes flip {
  to {
    transform: rotateY(180deg);
  }
}
@-webkit-keyframes flip {
  to {
    -webkit-transform: rotateY(180deg);
  }
}
</style>