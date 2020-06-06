<template>
  <div id="app">
    <app-bg v-bind:fill="bgColor" class="bg"></app-bg>

    <div v-if="state==0" class="flex" id="app">
    </div>
    <div v-else class="flex">
      <reject-btn @click.native="bgColor='red'"></reject-btn>
      <card class="main" :class="{'lefts': bgColor=='green'}" ></card>
      <heart-btn  @click.native="bgColor='green'"></heart-btn>
    </div>

  </div>
</template>

<script>
import "@/assets/css/reset.css"
import Card from "@/components/Card.vue";
import HeartBtn from "@/components/HeartBtn.vue";
import RejectBtn from "@/components/RejectBtn.vue";
import AppBg from "@/components/AppBg.vue";
export default {
  name: 'App',
  components: {
    Card,
    HeartBtn,
    RejectBtn,
    AppBg,
  },
  data() {
    return {
      bgColor: "red",
      state: 1,
    }
  },
  methods: {

  }
}
</script>

<style>
body,
html,
.bg,
.flex,
#app
{
  width: 100%;
  height: 100%;
}

.flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

/*
.main {
  flex-grow: 1;
  margin: 50px;

  transition: all .4s ease-in-out ;

    left: 0;
    right: 0;

}






.lefts {


  animation: left 1s;
  position: relative;
}

@keyframes left {
  25% {
    left: 600px;
  }
  50% {
    transform: rotate(35deg);
  }
  75% {
    transform: rotate(0deg);
  }

  100% {
      transform: rotate(0deg);
      left: 0;
  }
}
*/
</style>
