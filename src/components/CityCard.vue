<template>
  <b-overlay :show="$asyncComputed.cityData.updating">
    <b-card class="overflow-hidden w-100 text-center" no-body>
      <b-row>
        <b-col>
          <b-card-header style="background-color: #2c3e50; color: white">
            <b-row align-v="center">
              <b-col cols="3">
                <b-avatar variant="primary">
                  <b-card-img
                    :alt="cityData.weather[0].description"
                    :src="
                      'http://openweathermap.org/img/wn/' +
                        cityData.weather[0].icon +
                        '@4x.png'
                    "
                  ></b-card-img>
                </b-avatar>
              </b-col>
              <b-col class="p-0" cols="1">
                <a style="cursor: pointer" @click="refresh">
                  <b-icon-arrow-repeat></b-icon-arrow-repeat>
                </a>
              </b-col>
              <b-col class="text-center"
                >{{ cityData.name + ", " + cityData.sys.country }}
              </b-col>
              <b-col class="p-0" cols="1">
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
                <b-row class="mb-1 mt-1">
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
                    <b-button
                      :to="{ name: 'City', params: { cityName: cityName } }"
                      title="Détails des prévisions sur 5 jours"
                      variant="primary"
                    >
                      <b-icon-graph-up></b-icon-graph-up>
                      5 Jours
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
  </b-overlay>
</template>

<script>
import instantWeatherService from "@/services/instantWeatherService";
import { mapMutations } from "vuex";

export default {
  name: "CityCard",
  props: ["cityName", "cityIndex"],
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["deleteCity"]),
    refresh() {
      this.$asyncComputed.cityData.update();
    }
  },
  asyncComputed: {
    cityData: {
      get() {
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
