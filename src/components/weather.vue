<template>
  <div
    class="weather"
    :class="title"
    :style="{ backgroundImage: 'url(' + image + ')' }"
  >
    <div class="weather-data__top">
      <div class="temp">{{ temp }}</div>
      <div v-if="temp != feelsLike" class="feels-like">
        <h3>Feels like</h3>
        {{ feelsLike }}
      </div>
      <div class="description">{{ description }}</div>
      <div class="title">
        <span>{{ title }}</span>
      </div>
    </div>

    <div class="weather-data__bottom">
      <div class="weather-data__location">
        <div class="date">{{ date }},</div>
        <h2 class="location">{{ city }}, {{ country }}</h2>
      </div>

      <div class="weather-data__additional">
        <div class="weather-stat wind-speed">
          <h3>Wind</h3>
          <span class="weather-stat__value"
            >{{ Math.round(windSpeed * 2.24)
            }}<span class="extra-small">MPH</span>
          </span>
        </div>

        <div class="weather-stat wind-direction">
          <h3>Wind Direction</h3>
          <span class="weather-stat__value">{{ windDirection }}</span>
        </div>

        <div class="weather-stat sunrise" v-if="sunsetHasHappened != true">
          <h3>Sunrise</h3>
          <span class="weather-stat__value">{{ sunrise }}</span>
        </div>

        <div class="weather-stat sunset" v-if="sunsetHasHappened == true">
          <h3>Sunset</h3>
          <span class="weather-stat__value">{{ sunset }}</span>
        </div>

        <div class="weather-stat humidity">
          <h3>Humidity</h3>
          <span class="weather-stat__value"
            >{{ humidity }}<span class="extra-small">%</span></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Weather",
  props: {
    title: String,
    description: String,
    temp: String,
    feelsLike: String,
    city: String,
    country: String,
    windSpeed: Number,
    windDirection: String,
    humidity: Number,
    sunset: String,
    sunrise: String,
    date: String,
    image: String,
    sunsetHasHappened: Boolean,
  },
};
</script>

<style scoped lang="scss">
h3 {
  margin: 10px 0 0;
}

.weather {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-repeat: no-repeat;
  background-position: center 35%;
  padding: 0 25px 25px 25px;
  transition: all ease-in-out 0.1s;

  &.Clouds {
    background-size: 100vw;
    background-position: center 39%;
  }

  &.Rain {
    background-position: center 28%;
  }

  @media screen and (min-width: 450px) {
    background-size: 400px !important;
    background-position: calc(100% - 25px) calc(100% - 25px) !important;
  }
}

.temp {
  font-size: 112px;
  line-height: 0.8;
  padding-top: 20px;
}

.weather-data__top {
  display: flex;
  flex-flow: column nowrap;
  text-align: left;

  > *:not(.title):not(.feels-like):not(.description) {
    width: 50%;
  }

  .feels-like {
    padding-top: 5px;
    padding-left: 5px;

    h3 {
      display: inline;
      font-size: 16px;
      font-weight: 400;
    }

    + .description {
      padding-top: 0;
    }
  }

  .description {
    text-transform: capitalize;
    padding-left: 5px;
    padding-top: 5px;
  }

  .title {
    position: absolute;
    left: calc(100% - 25px);
    font-size: 48px;
    top: 25px;
    transform: rotate(90deg);
    transform-origin: left top;
    font-weight: 600;

    span {
      display: block;
    }
  }
}

.weather-data__bottom {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  text-align: left;
  max-width: 300px;
}

.weather-stat {
  h3 {
    font-size: 16px;
    font-weight: 400;
  }

  .weather-stat__value {
    font-size: 36px;

    .extra-small {
      font-size: 16px;
    }
  }
}

.weather-data__location {
  border-bottom: 3px solid white;
  padding-bottom: 15px;
  margin-bottom: 5px;
  width: 100%;

  .location {
    font-size: 32px;
    font-weight: 400;
  }
}

.weather-data__additional {
  display: flex;
  flex-flow: row wrap;

  > * {
    flex-basis: 50%;
    padding-bottom: 5px;
  }
}
</style>
