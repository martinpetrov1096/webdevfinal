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
        v-model="searchText"
        type="text"
        id="input-search"
        placeholder="Terms"
      />
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
      <label for="input-range">Distance: {{this.searchRange}} miles</label>
      <input
        v-model="searchRange"
        type="range"
        max="1000"
        min="100"
        step="50"
        id="input-range"
        placeholder="Radius"
      />
    <button variant="primary" @click="grabInfo()">Go!</button>
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
      searchRange: 1000,
      address: null,
      joinCode: "",
      isJoining: false,
    };
  },
  methods: {
    grabInfo() {
      if (this.searchText != "") {
        axios.get(
          "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?" +
          "term=" + //TODO: why not add to previous line
          this.searchText +
          "&latitude=" +
          this.address.latitude +
          "&longitude=" +
          this.address.longitude +
          "&radius=" +
          this.searchRange +
          "&limit=10",
          {
            headers: {
              Authorization: "Bearer bAkiVlxtBVivppxkygEvcx_ZkdkDIhrtLFfkJWRv7HWG45Yn_gnwcvtuMgaCDHjvnXLq2tYyuKpwyogcYg4pV-0HBvvf-41JJignaUhc9GhyKMzx3v8kA5FhHM_OXnYx"
            }
          })
          .then(resp => { //TODO: won't res always be true if u have .then?
            if (resp) {
              this.createGame(resp.data.businesses);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert("Search is empty");
      }
    },
    getAddressData: function (addressData) { //TODO: can we remove this?
      this.address = addressData;
    },
    createGame(list) {
      axios({
        url: "https://cors-anywhere.herokuapp.com/https://tested-quilled-regnosaurus.glitch.me/newGame",
        method: "post",
        data: list
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