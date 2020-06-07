<template>
  <div id="gamePre" class="card-sm shadow-l">
    <div class="joinGame">
      <h2> Enter Join Code</h2>
      <input
          placeholder="Enter Code" 
          v-model="joinCode"
      >
      <button @click="joinGame(joinCode)">Join Game</button>
    </div>
    <h1>OR</h1>

    <div class="searchBar">
      <h2>Create New Game </h2>
      <input
        type="text"
        list="terms"
        id="input-search"
        v-model="searchText"
        placeholder="Enter Keywords"
        @keyup="getRecommended"
      />
      
      <datalist id="terms">
        <option v-for="term in autoComplete" :key="term.text">{{term.text}}</option>
      </datalist>
            
      <vue-google-autocomplete
        v-on:placechanged="getAddressData"
        ref="address"
        id="map"
        classname="form-control"
        placeholder="Location"
        country="us"
        types= "(cities)"
      >
      </vue-google-autocomplete>
    <button variant="primary" @click="createGame()">Go!</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueGoogleAutocomplete from 'vue-google-autocomplete';
export default {
  name: 'GamePre',
  components: {
    VueGoogleAutocomplete
  },
  data() {
    return {
      searchText: "",
      address: null,
      joinCode: "",
      autoComplete: []
    };
  },
  methods: {
    getAddressData: function (addressData) { //TODO: can we remove this?
      this.address = addressData;
    },
    getRecommended: function() {
      const url = `https://cors-anywhere.herokuapp.com/https://functional-opaque-kosmoceratops.glitch.me/autocomplete`;
      axios.get(url,
        {
          params: {
            "keyword": this.searchText
            }
        })
        .then(resp => {
          this.autoComplete = resp.data;
        });
    },
    createGame() {
      let payload = {
        "searchText": this.searchText,
        "latitude": this.address.latitude,
        "longitude": this.address.longitude
      }
      axios({
        url: "https://cors-anywhere.herokuapp.com/https://functional-opaque-kosmoceratops.glitch.me/newGame",
        method: "post",
        data: payload
      })
      .then(resp => {
        this.joinCode = resp.data;
        this.joinGame();
      })
      .catch((error) => {
        console.log(error);
      });
    },
    joinGame() {
     
      this.$emit('clicked', this.joinCode);
    }
  }
}
</script>

<style scoped>

#gamePre {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.searchBar {
    display: flex;
    flex-flow: column;
    align-items: center;
}

.gameJoin {
    display: flex;
    justify-content: center;
    padding: 20px;

}

</style>