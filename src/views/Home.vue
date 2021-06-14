<template>
  <div
    class="home"
    :style="styleObject"
    :class="typeof weather.main != 'undefined' ? 'active' : 'inactive'"
  >
    <main>
      <div class="intro" v-if="typeof weather.main == 'undefined'">
        <h1>
          <span class="small">Welcome to</span><br />
          <span class="big">Klimaat.</span>
        </h1>
        <p>
          Search a city for live weather forecasts and predictions for the
          upcoming week
        </p>
      </div>

      <div class="search-box">
        <input
          type="text"
          name=""
          id=""
          class="search-bar"
          placeholder="Search any city"
          v-model="query"
          @keyup.enter="fetchWeather"
        />
        <button @click="fetchWeather" class="search-button">
          <span class="visually-hidden">Search</span>
        </button>
        <!-- {{query}} -->
      </div>

      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <Weather
          v-bind:title="weather.weather[0].main"
          v-bind:description="weather.weather[0].description"
          v-bind:temp="Math.round(weather.main.temp) + 'c'"
          v-bind:feelsLike="Math.round(weather.main.feels_like) + 'c'"
          v-bind:city="weather.name"
          v-bind:country="weather.sys.country"
          v-bind:windSpeed="weather.wind.speed"
          v-bind:windDirection="windDir"
          v-bind:humidity="weather.main.humidity"
          v-bind:sunset="sunset"
          v-bind:sunrise="sunrise"
          v-bind:date="dateBuilder()"
          v-bind:image="this.image"
          v-bind:sunsetHasHappened="sunriseHappened"
        />
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Weather from "@/components/weather.vue";
import defaultPattern from "../assets/graph-paper.svg";

export default {
  name: "Home",
  data() {
    return {
      api_key: "1698ad14266892027f713998c5613169",
      url_base: "https://api.openweathermap.org/data/2.5/",
      query: "",
      weather: {},
      weatherID: "default",
      places_api_key: "AIzaSyDejLbYOEsYMKshI1r8vqOREa9Ly_dEwKk",
      image: "",
      image_query: "london",
      windDir: "None",
      sunrise: "00:00",
      sunset: "00:00",
      sunriseHappened: false,
      styleObject: {
        backgroundImage: "url(" + defaultPattern + ")",
        backgroundColor: "#23324F",
      },
    };
  },
  methods: {
    fetchWeather() {
      fetch(
        this.url_base +
          "/weather?q=" +
          this.query +
          "&units=metric&APPID=" +
          this.api_key
      )
        .then((response) => {
          return response.json();
        })
        .then(this.setResults);
    },
    setResults(results) {
      this.weather = results;
      this.image_query =
        this.weather.name + " " + this.weather.weather[0].main + " day";
      let sunset = new Date(this.weather.sys.sunset * 1000);
      let sunrise = new Date(this.weather.sys.sunrise * 1000);
      let sunsetHours = sunset.getHours();
      let sunsetMinutes = +sunset.getMinutes();
      let sunriseHours = sunrise.getHours();
      let sunriseMinutes = +sunrise.getMinutes();
      this.sunset = `${sunsetHours}:${sunsetMinutes}`;
      this.sunrise = `${sunriseHours}:${sunriseMinutes}`;
      this.sunriseHappened = this.dateInPast(sunrise);

      this.degToCompass(this.weather.wind.deg);
      this.setStyle(this.weather.weather[0].main);
    },
    dateBuilder() {
      let d = new Date();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let date = d.getDate();
      let month = months[d.getMonth()];
      return `${month} ${date}`;
    },
    dateInPast(newDate) {
      if (newDate.setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0)) {
        return true;
      }

      return false;
    },
    degToCompass(num) {
      let val = Math.floor(num / 22.5 + 0.5);
      const arr = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
      ];
      this.windDir = String(arr[val % 16]);
      return this.windDir;
    },
    setStyle(weatherStyle) {
      if (typeof this.weather.main != "undefined") {
        this.styleObject = {
          backgroundImage:
            "url(" +
            this.$store.getters.getWeatherById(weatherStyle).pattern +
            ")",
          backgroundColor:
            this.$store.getters.getWeatherById(weatherStyle).colour,
        };

        this.image = this.$store.getters.getWeatherById(weatherStyle).image;
      }
    },
  },
  components: {
    Weather,
  },
  computed: {
    ...mapGetters(["getWeatherById"]),
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap");

.visually-hidden {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  left: -1000vw;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: sans-serif;
  text-align: left;
  font-family: "Rubik", sans-serif;
  //-webkit-font-smoothing: antialiased;
}

#nav {
  display: none;
}

.home {
  background-position: bottom;
  background-size: 48px;
  transition: all ease-in-out 0.4s;
  color: white;
  position: relative;

  &.inactive {
    main {
      max-width: 400px;
      margin: 0 auto;
    }
  }
}

main {
  min-height: calc(100vh);
  //background-image: linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.75));
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.intro {
  text-align: left;
  padding-bottom: 15px;
  max-width: 350px;
  font-size: 16px;
  padding: 0 25px 20px 25px;

  h1 {
    padding-bottom: 20px;
    font-size: 32px;
  }

  .small {
    font-size: 32px;
  }

  .big {
    font-size: 64px;
  }
}

.weather-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.search-box {
  width: 100%;
  margin-bottom: 5px;
  padding: 0 25px 0 25px;
  position: relative;
  max-width: calc(100% - 80px);

  @media screen and (min-width: 400px) {
    max-width: 360px;
  }

  input[type="text"] {
    height: 40px;
    font-size: 12px;
    border-radius: 20px;
    border: none;
    display: block;
    width: 100%;
    padding: 5px 15px;

    &:focus {
      outline: none;
    }

    &::placeholder {
      font-size: 12px;
    }
  }

  .search-button {
    background: transparent;
    border: none;
    background-repeat: no-repeat;
    background-position: center center;
    height: 20px;
    width: 20px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 35px;
    background-image: url("../assets/arrow.svg");
  }
}

.active .search-box {
  margin-top: 25px;
}

.inactive .search-box {
  max-width: none;
}
</style>
