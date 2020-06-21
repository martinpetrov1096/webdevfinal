import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import Vuex from "vuex";

import "@/assets/css/reset.css";
import "@/assets/css/global.css";
////////////////////////////////
////// CONFIGURE SERVICES //////
////////////////////////////////
Vue.config.productionTip = false

// Vuex Store
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    bgColor: "red",
    voteState: 0, // 0 = not voted, 1 = voted no, 2 = voted yes
    gameState: 0,
    winner: ""
  },
  getters: {
    gameState: state => {
      return state.gameState
    },
    voteState: state => {
      return state.voteState;
    },
    bgColor: state => {
      return state.bgColor;
    },
    winner: state => {
      return state.winner;
    }
  },
  mutations: {
    gameReset(state) {
      state.gameState = 0;
      state.voteState = 0;
      state.winner = "";
      state.bgColor = "red";
    },
    gameStart(state) {
      state.gameState = 1;
    }, 
    gameEnd (state, restaurant) {
      state.gameState = 2;
      state.bgColor = "green";
      state.winner = restaurant;
    },

    
    voteReset(state) {
      if (state.gameState == 1) {
        state.voteState = 0;
        state.bgColor = "";
      }
    },  
    voteNo(state) {
      if (state.gameState == 1) {
        state.voteState = 1;
        setTimeout(() => {
          state.bgColor = "red";
         }, 300);
      }
    },
    voteYes(state) {
      if (state.gameState == 1) {
        state.voteState = 2;
        setTimeout(() => {
          state.bgColor = "green";
         }, 300);
      }
    }
  },
  actions: {
    gameReset(context) {
      context.commit("gameReset");
      router.push("/");
    },
    gameStart(context, joinCode) {
      context.commit("gameStart", joinCode);
      router.push("/game/"+joinCode);
    },
    gameEnd(context, restaurant) {
      context.commit("gameEnd", restaurant);
      router.push("/winner");
    }
  }
});
////////////////////////////////
////// START VUE INSTANCE //////
////////////////////////////////
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
