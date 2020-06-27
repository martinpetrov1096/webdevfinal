<template>
  <div id="gameLobby" class="card-sm shadow-l">

    <h2 class="join-code sec"> {{$store.getters.joinCode}} </h2>
    <h3>Share this url with friends </h3> 
    <h3>Click start when they have all joined</h3> 
    <h4> Players Joined: </h4>
    <h2 class="num-players sec"> {{$store.getters.numPlayers}}</h2>

    <h2 class="startBtn btn btn-rect-lg prim-bg"
      @click="$store.dispatch('gameStart')"> Start
    </h2>


  </div>  
</template>

<script>
export default {
  name: "GameLobby"
}
</script>

<style scoped>
#gameLobby {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.join-code {
  font-size: 28px;
  padding: 10px;
  border-radius: 10px;
}
.lobby h3 {
  color: white;
  font-size: 18px;
}

.num-players {
  font-size: 8vw;
}
</style>