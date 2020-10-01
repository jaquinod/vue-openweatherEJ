<template>
  <b-card class="overflow-hidden w-100" no-body>
    <b-row>
      <b-col>
        <b-card-header>
          <b-row>
            <b-col cols="1">
              <a style="cursor: pointer" @click="refresh">
                <b-icon-arrow-repeat></b-icon-arrow-repeat>
              </a>
            </b-col>
            <b-col cols="3">
              <b-card-img
                :alt="cityData.weather[0].description"
                :src="
                  'http://openweathermap.org/img/wn/' +
                    cityData.weather[0].icon +
                    '@4x.png'
                "
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col class="text-center align-middle"
              >{{ cityData.name + ", " + cityData.sys.country }}
            </b-col>
            <b-col cols="1">
              <a style="cursor: pointer" @click="deleteCity(cityIndex)">
                <b-icon-trash></b-icon-trash>
              </a>
            </b-col>
          </b-row>
        </b-card-header>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card-body>
          <b-card-text>
            <b-container>
              <b-row>
                <b-col>{{ cityData.weather[0].description }}</b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-icon-thermometer></b-icon-thermometer>
                  {{ cityData.main.temp }}
                  <b-img
                    src="@/assets/Degrees-Celcius.svg"
                    style="height: 1em"
                  ></b-img>
                </b-col>
                <b-col>
                  <b-icon-droplet-fill></b-icon-droplet-fill>
                  {{ cityData.main.humidity }} %
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-button href="#" variant="primary"
                    >Détails des prévisions sur 5 Jours
                  </b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card-footer>
          <span :title="cityData.dt | moment('DD/MM/YYYY HH:mm:ss')"
            >updated {{ cityData.dt | moment("from", "now") }}</span
          ></b-card-footer
        >
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import instantWeatherService from "@/services/instantWeatherService";
import { mapMutations } from "vuex";

export default {
  name: "CityCard",
  props: ["cityName", "cityIndex"],
  data() {
    return {
      refreshing: true
      /* content: {
        coord: {
          lon: 2.07,
          lat: 49.03
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "légère pluie",
            icon: "10d"
          }
        ],
        base: "stations",
        main: {
          temp: 24.55,
          feels_like: 23.15,
          temp_min: 23.89,
          temp_max: 25,
          pressure: 1018,
          humidity: 47
        },
        visibility: 10000,
        wind: {
          speed: 3.1,
          deg: 350
        },
        rain: { "1h": 0.16 },
        clouds: { all: 14 },
        dt: 1599758101,
        sys: {
          type: 1,
          id: 6547,
          country: "FR",
          sunrise: 1599715297,
          sunset: 1599761755
        },
        timezone: 7200,
        id: 6454886,
        name: "Cergy",
        cod: 200
      } */
    };
  },
  methods: {
    ...mapMutations(["deleteCity"]),
    refresh() {
      this.refreshing = !this.refreshing;
    }
    /*
    lastUpdate(){
      setInterval(this.$moment(this.cityData.dt).format("from", "now"));
    }*/
  },
  asyncComputed: {
    cityData: {
      get() {
        this.refreshing;
        console.log("refreshed");
        return instantWeatherService
          .getInstantWeather(this.cityName)
          .then(response => response.data);
      },
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped></style>
