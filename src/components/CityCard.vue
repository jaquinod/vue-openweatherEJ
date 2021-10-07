<template>
  <b-overlay :show="$asyncComputed.cityData.updating">
    <b-card class="overflow-hidden w-100 text-center" no-body>
      <b-row>
        <b-col>
          <b-card-header style="background-color: #2c3e50; color: white">
            <b-row align-v="center">
              <b-col cols="3">
                <WeatherAvatar
                  :description="cityData.weather[0].description"
                  :icon="cityData.weather[0].icon"
                ></WeatherAvatar>
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
                    <temperature
                      :tempdata="cityData.main.temp"
                      :cold-temp-floor="coldTempFloor"
                      :hot-temp-floor="hotTempFloor"
                    ></temperature>
                  </b-col>
                  <b-col>
                    <Humidity
                      :humiditydata="cityData.main.humidity"
                      :max="maxHumidity"
                      :min="minHumidity"
                    ></Humidity>
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
              >Mise à jour {{ cityData.dt | moment("from", "now") }}</span
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
import Temperature from "@/components/Temperature";
import Humidity from "@/components/Humidity";
import WeatherAvatar from "@/components/WeatherAvatar";

export default {
  name: "CityCard",
  components: { WeatherAvatar, Temperature, Humidity },
  props: ["cityName", "cityIndex"],
  data() {
    return {
      minHumidity: 40,
      maxHumidity: 65,
      coldTempFloor: 10,
      hotTempFloor: 23
    };
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
