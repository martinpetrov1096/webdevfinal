<template>
  <div id="restCardGallery">
    <transition
      name="slide-fade"
      mode="out-in">

      <img class="cur-img"
        :src="curUrl"
        :key="index">

    </transition>
    <div class="nav-container">

      <div class="nav-circle prim-bg"
        v-for="(url, i) in img_urls"
        :key="i"
        @click="index=i"
        :class="{'sec-bg': index == i}">

      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "RestaurantCardGallery",
  props: {
    img_urls: Array
  },
  data() {
    return {
      index: 0
    }
  },
  computed: {
    curUrl: function() {
      return  this.img_urls[Math.abs(this.index % 3)];
    }
  }
}
</script>

<style scoped>
#restCardGallery {
  height: 100%;

}

.cur-img {
  width: 100%;
  height: calc(100% - 30px);
  object-fit: cover;
  border-radius: 30px;

}
.nav-container {
  position: relative;
  bottom: 0;
  display: flex;
  justify-content: center;

}

.nav-circle{
  width: 20px;
  height: 20px;
  border-radius: 100%;
  margin: 5px;
}

</style>