<template>
  <div id="home">
    
    <div class="title">
      <h1>Restaurant Tinder</h1>
      <div class="about">
      <h3>Created By 
        <a class="author-name" href="https://www.linkedin.com/in/martin-petrov-5062aa160/">
            Martin Petrov
        </a> 
        and 
        <a class="author-name" href="https://github.com/rzahmed">
          Raza Ahmed
        </a>
      </h3>
    </div>
    </div>
    <div class="container card-sm shadow-l">

      <div class="joinGame">
        <input
          placeholder="Enter Join Code" 
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
          <input type="text" placeholder="Enter Food Categories"
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
          placeholder="Enter Location"
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
        url: this.$serverUrl + "/autocomplete",
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
        url: this.$serverUrl + "/newGame",
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
      this.$router.push("/game/" + this.joinCode);
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
.about {
  flex-basis: 0;
  flex-grow: 0;
  align-self: stretch;
  padding: 10px;

  font-size: 14px;
  color: white;
  text-align: center;
  
}
.author-name {
  font-weight: bold;
  font-size: 18px;
  text-decoration: none;
  color: white;
}
.author-name:hover {
  text-decoration: underline;
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
</style>
