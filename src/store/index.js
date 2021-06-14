import Vue from "vue";
import Vuex from "vuex";

// Weather background patterns
import defaultPattern from "../assets/graph-paper.svg";
import sunnyPattern from "../assets/pie-factory.svg";
import cloudyPattern from "../assets/heavy-rain.svg";
import rainyPattern from "../assets/bank-note.svg";
import windyPattern from "../assets/line-in-motion.svg";

// Weather images
import sunnyImage from "../assets/Sun.svg";
import rainyImage from "../assets/Rain.svg";
import cloudyImage from "../assets/Cloud.svg";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    weatherModes: [
      {
        id: 0,
        title: "default",
        colour: "#23324F",
        image: "",
        pattern: defaultPattern,
      },
      {
        id: "Sun",
        title: "Sunny",
        colour: "#FF7171",
        image: sunnyImage,
        pattern: sunnyPattern,
      },
      {
        id: "Clear",
        title: "Clear",
        colour: "#FF7171",
        image: sunnyImage,
        pattern: sunnyPattern,
      },
      {
        id: "Clouds",
        title: "Cloudy",
        colour: "#345086",
        image: cloudyImage,
        pattern: cloudyPattern,
      },
      {
        id: "Wind",
        title: "Windy",
        colour: "#6293F2",
        image: "",
        pattern: windyPattern,
      },
      {
        id: "Rain",
        title: "Rainy",
        colour: "#0057FF",
        image: rainyImage,
        pattern: rainyPattern,
      },
      {
        id: "Fog",
        title: "Foggy",
        colour: "#0057FF",
        image: "",
        pattern: sunnyPattern,
      },
    ],
  },
  getters: {
    getWeatherById: (state) => (id) => {
      return state.weatherModes.find((weatherModes) => weatherModes.id === id);
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
