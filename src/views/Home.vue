<template>
  <div id="home" class="container">

    <div class="card-sm shadow-l">

      <div class="joinGame">
        <input
          placeholder="Enter Code" 
          v-model="joinCode"
          type="text"
        >
        <div 
          @click="joinGame()" 
          class="btn-sm">
        </div>
      </div>
      
      <h1>OR</h1>
      <div class="createGame">
        <div class="searchBar">
          <input
            type="text"
            list="terms"
            id="input-search"
            v-model="searchText"
            placeholder="Enter Keywords"
            @keyup="getRecommended"
          />
        </div>
        <datalist id="terms">
          <option 
            v-for="term in autoComplete" 
            :key="term.text"> 
            {{term.text}} 
          </option>
        </datalist>
                
        <vue-google-autocomplete
          class="searchBar"
          v-on:placechanged="getAddressData"
          ref="address"
          id="map"
          classname="form-control"
          placeholder="Location"
          country="us"
          types= "(cities)">
        </vue-google-autocomplete>
          
        <div 
          @click="createGame()" 
          class="btn-lg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueGoogleAutocomplete from 'vue-google-autocomplete';
export default {
  name: "Home",
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
      axios({
        url: "https://cors-anywhere.herokuapp.com/https://picayune-responsible-jackfruit.glitch.me/autocomplete",
        method: "get",
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
        url: "https://cors-anywhere.herokuapp.com/https://picayune-responsible-jackfruit.glitch.me/newGame",
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
     // this.$router.push("/game/"+this.joinCode)
      this.$store.dispatch("gameStart", this.joinCode);
    }
  }
}
</script>

<style scoped>

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

h1 {
  text-align: center;
}

.joinGame {
    display: flex;
    justify-content: space-between;
    padding: 20px;
}
  
.createGame {
  display: flex;
  flex-flow: column nowrap;
  justify-content: stretch;
  align-items: stretch;
}

.searchBar {
  
    margin-bottom: 10px;
    padding:10px;
}




</style>
