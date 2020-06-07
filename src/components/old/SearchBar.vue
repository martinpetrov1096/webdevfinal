<template>
    <div id="searchBar">
            <input
              type="text"
              id="input-search"
              v-model="searchText"
              placeholder="Terms"
            />
            <vue-google-autocomplete
              ref="address"
              id="map"
              classname="form-control"
              placeholder="Location"
              v-on:placechanged="getAddressData"
              country="us"
              types= "(cities)"
            >
            </vue-google-autocomplete>
            <label for="input-range">Distance: {{this.searchRange}} miles</label>
            <input
              type="range"
              max="1000"
              min="100"
              step="50"
              id="input-range"
              v-model="searchRange"
              placeholder="Radius"
            />
          <button variant="primary" @click="grabInfo()">Go!</button>

    </div>
 
</template>

<script>
import axios from "axios"
import VueGoogleAutocomplete from 'vue-google-autocomplete'
//import Autocomplete from 'vuejs-auto-complete'


export default {
  name: "SearchBar",
  components: { VueGoogleAutocomplete },
  data() {
    return {
      searchText: "",
      searchRange: 1000,
      address: null
    };
  },
  methods: {
    
    grabInfo() {
      if (this.searchText != "") {
        axios
          .get(
            "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?" +
              "term=" +
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
            }
          )
          .then(res => {
            if (res) {
              this.$emit('results', res.data.businesses);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert("Search is empty");
      }
    },
    
    getAddressData: function (addressData) {
      this.address = addressData;
    }
  },
  
};
</script>

<style scoped>

#searchBar {
    display: flex;
    flex-flow: column;
    align-items: center;
}
</style>