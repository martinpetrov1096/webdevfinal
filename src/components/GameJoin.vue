<template>
    <div id="gameJoin">
        <input
            placeholder="Enter Code" 
            v-model="joinCode">
        <button @click="joinGame()">Join Game</button>
    </div>
</template>

<script>

export default {
  name: "GameJoin",
  data() {
    return {
      joinCode: ""
    };
  },

  methods: {
    joinGame() {
      if (this.joinCode != "") {
        this.$emit('code', this.joinCode);
      } else {
        alert("pls provide a code");
      }
    }
  }
};
</script>

<style scoped>

#gameJoin {
    display: flex;
    justify-content: center;
    padding: 20px;

}


</style>