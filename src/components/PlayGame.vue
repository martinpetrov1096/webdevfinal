<template>
    <div id="playGame">
        <btn-reject @click.native="bgColor='red'"></btn-reject>
        <div id="card" class="card shadow-l"></div>
        <btn-heart @click.native="bgColor='green'"></btn-heart>   
    </div>
</template>

<script>
import "@/assets/css/global.css";
import BtnHeart from "@/components/BtnHeart.vue";
import BtnReject from "@/components/BtnReject.vue";

export default {
    name: "PlayGame",
    components: {
        BtnHeart,
        BtnReject,
  },
}
</script>

<style scoped>

#playGame {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}


.card {
    height: 80%;
    min-width: 400px;
    max-width: 800px;
    max-height: 800px;
    
}

</style>