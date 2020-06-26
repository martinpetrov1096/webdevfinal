import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import Vuex from "vuex";
import Axios from 'axios';
import AsyncComputed from 'vue-async-computed';
import io from 'socket.io-client';
import "@/assets/css/reset.css";
import "@/assets/css/global.css";

////////////////////////////////
////// CONFIGURE SERVICES //////
////////////////////////////////
Vue.config.productionTip = false
Vue.prototype.$http = Axios;
let socket = Object;

Vue.use(AsyncComputed);

// Vuex Store
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    bgColor: "red",
    voteState: 0, // 0 = not voted, 1 = voted no, 2 = voted yes
    gameState: 0, // 0 = not started, 1 = lobby, 2 = playing, 3 = ended
    current: {},
    socket: Object,
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
    }
  },
  mutations: {
    setGameState(state, gState) {
      state.gameState = gState;
    },
    setVote(state, vote) {
      if (state.gameState == 2) {
        state.voteState = vote;
      }
    },  
    setBg(state, color) {
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
    },
    setCur(state, restaurant) {
      console.log(restaurant);
      state.current = restaurant;
    }

  },
  actions: {
    gameReset(context) {
      context.commit("setGameState", 0);
      context.commit("setBg", "red");
      router.push("/");
    },

    /* This one gets manually called somewhere */
    gameJoin(context, joinCode) {
      socket = io("https://picayune-responsible-jackfruit.glitch.me/",  {query: `joinCode=${joinCode}`});
      socket.emit("joinGame");
      
      socket.on("joinedGame", () => {
        context.commit("setGameState", 1);
        router.push("/game/" + joinCode);
      });
      socket.on("startedGame", data => {
        context.commit("setCur", data["restaurant"]);
        context.commit("setGameState", 2);
        context.commit("setVote", 0);
        context.commit("setBg", "");
      });
      socket.on("nextChoice", data => {
        console.log("hereinnextchoice");
        context.commit("setCur", data["restaurant"]);
        context.commit("setVote", 0);
        context.commit("setBg", "");
      });
      socket.on("endedGame", () => {
        console.log("herefds");
        context.commit("setGameState", 3);
        context.commit("setBg", "green");
        router.push("/winner");
        socket.disconnect();
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
      context.commit("setVote", 1);
    },
    voteYes(context) {
      console.log("herreer");
      setTimeout(() => {
        socket.emit("submitVote", 1);
      },1000);
      context.commit("setVote", 2);
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
