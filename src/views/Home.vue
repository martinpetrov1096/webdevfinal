<template>
  <div id="home">

    <h1 class="title">Restaurant Tinder</h1>
    <div class="container card-sm shadow-l">

      <div class="joinGame">
        <input
          placeholder="Enter Code" 
          v-model="joinCode"
          type="text">
        <h2 class="btn btn-rect-sm prim-bg"
          @click="joinGame()">
          Join
        </h2>
      </div>
      
      <h1>OR</h1>

      <div class="createGame">

        <div class="searchBar">
          <input type="text" placeholder="Enter Keywords"
            v-model="searchText"
            list="terms"
            @keyup="getRecommended"/>
        </div>

        <datalist id="terms">
          <option 
            v-for="term in autoComplete" 
            :key="term.text"> 
            {{term.text}} 
          </option>
        </datalist>
                
        <vue-google-autocomplete id="map" class="searchBar"
         
          v-on:placechanged="getAddressData"
          ref="address"

          classname="form-control"
          placeholder="Location"
          country="us"
          types= "(cities)"
          >
        </vue-google-autocomplete>
          
        <h2 class="start btn btn-rect-lg prim-bg"
          @click="createGame()">
          Create Game
        </h2>

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
      this.$store.dispatch("gameJoin", this.joinCode);
    }
  }
}
</script>

<style scoped>
#home {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.title {
  flex-basis: 20%;
  flex-shrink: 2;
  font-size: 10vw;
  color: white;
}

.container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
}

.joinGame {
  flex-shrink: 1;
  flex-grow: 2;
  width: inherit;
  display: flex;
  justify-content: space-around;
  align-items: center;

}
  
.createGame {
  flex-shrink: 1;
  flex-grow: 3;
  display: flex;
  flex-flow: column nowrap;
  justify-content: stretch;
  align-items: stretch;
}

.start {
  align-self: center;
}

input {
  font-size: 14px;
  padding: 5px !important;
  margin: 10px 0;
}
input > * {
  margin: 0;
  padding: 0;
}

.about {
  align-self: flex-start;
}
</style>
