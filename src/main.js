import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import Vuex from "vuex";
import Axios from 'axios';
import AsyncComputed from 'vue-async-computed';
import io from 'socket.io-client';
import Toasted from "vue-toasted";

import "@/assets/css/reset.css";
import "@/assets/css/global.css";

////////////////////////////////
////// CONFIGURE SERVICES //////
////////////////////////////////
Vue.config.productionTip = false


Vue.prototype.$http = Axios;

Vue.use(AsyncComputed);
Vue.use(Toasted, {
 
});


let socket = Object;
////////////////////////////////
////// VUEX STORE CONFIG ///////
////////////////////////////////
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    bgColor: "red",
    voteState: 0, // 0 = not voted, 1 = voted no, 2 = voted yes
    gameState: 1, // 0 = not started, 1 = lobby, 2 = playing, 3 = ended
    socket: Object,
    numPlayers: 0,
    joinCode: "",
    current: { // Give default so no errors on gameStart
      alias: "",
      id: 0,
      location: {
        address1: ""
      },
      name: "",
      photos: [],
      price: ""
    },

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
    current: state => {
      return state.current;
    },
    numPlayers: state => {
      return state.numPlayers;
    },
    joinCode: state=> {
      return state.joinCode;
    }
  },
  mutations: {
    setGameState(state, gState) {
      state.gameState = gState;
    },
    setVoteState(state, vote) {
      if (state.gameState == 2) {
        state.voteState = vote;
      }
    },  
    setBg(state, color) {
      setTimeout(() => {
      switch(color) {
        case "red":
          state.bgColor = "red";
          break;
        case "green":
          state.bgColor = "green";
          break;
        default: 
          state.bgColor = "";
          break;
      }
    },300);
    },
    setCur(state, restaurant) {
      state.current = restaurant;
    },
    setNumPlayers(state, num) {
      state.numPlayers = num;
    },
    setJoinCode(state, code) {
      state.joinCode = code;
    }

  },
  actions: {
    gameReset(context) {
      context.commit("setGameState", 0);
      context.commit("setVoteState", 0);
      context.commit("setBg", "red");
    },
    /* This one gets manually called somewhere */
    gameJoin(context, joinCode) {
      context.commit("setGameState", 1);
      context.commit("setJoinCode", joinCode);
      socket = io("http://localhost:3000",  {query: `joinCode=${joinCode}`});
      socket.emit("joinGame");
      
      socket.on("joinedGame", data => {
        console.log("player joined");
        context.commit("setNumPlayers", data["numPlayers"]);
      });
      socket.on("startedGame", data => {
        context.commit("setCur", data["restaurant"]);
        context.commit("setGameState", 2);
        context.commit("setVoteState", 0);
        context.commit("setBg", "");
      });
      socket.on("nextChoice", data => {
        context.commit("setCur", data["restaurant"]);
        context.commit("setVoteState", 0);
        context.commit("setBg", "");
      });
      socket.on("endedGame", () => {
        context.commit("setGameState", 3);
        context.commit("setBg", "green");
        router.push("/winner");
        socket.disconnect();
      });
      socket.on("myerror", (data) => {
        Vue.toasted.show(data, {
          onComplete: function() {
            router.push("/");
          },
          theme: "bubble",
          position: "bottom-right",
          className: "toast-err sec",
          duration: 2000
        });
      });
    },
    gameStart(context) {
      context.commit("setGameState", 2);
      socket.emit("startGame");
    },
    voteNo(context) {
      setTimeout(() => {

        socket.emit("submitVote", 0);
      },1000);
      context.commit("setVoteState", 1);
      context.commit("setBg", "red");
    },
    voteYes(context) {
      setTimeout(() => {

        socket.emit("submitVote", 1);
      },1000);
      context.commit("setVoteState", 2);
      context.commit("setBg", "green");
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
