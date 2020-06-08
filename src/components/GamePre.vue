<template>
  <div id="gamePre" class="card-sm shadow-l">
    <div class="joinGame">
      <input
          placeholder="Enter Code" 
          v-model="joinCode"
          type="text"
      >
      <div class="button button-2">
        <div class="mif-chevron-right mif-1x" @click="joinGame()"></div>
      </div>
    </div>
    
    <h1>OR</h1>

    <div class="searchBar">
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
        class="searchBar"
        v-on:placechanged="getAddressData"
        ref="address"
        id="map"
        classname="form-control"
        placeholder="Location"
        country="us"
        types= "(cities)"
      >
      </vue-google-autocomplete>
      
      <div class="button button-1">
        <div class="mif-chevron-right mif-4x" @click="createGame()"></div>
      </div>
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
  height: auto;
  width: auto;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.searchBar {
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-bottom: 10px;
    padding:10px;
}

.button-1 {
    background-color:#455a64;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:20px;
  
    width: 60px;
  }
  
.button-2 {
    background-color:#455a64;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-left:10px;
    
    width:25px;
    height:25px;  }
  

.joinGame {
    display: flex;
    justify-content: space-between;
    padding: 20px;
}
  

</style>
