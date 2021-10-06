<template>
  <b-card class="h-100" no-body>
    <b-row no-gutters>
      <b-col cols="6">
        <city-map
          :lat="cityData.city.coord.lat"
          :lng="cityData.city.coord.lon"
        ></city-map>
      </b-col>
      <b-col cols="6">
        <b-card-body :title="cityData.city.name + ', ' + cityData.city.country">
          <b-container>
            <b-row>
              <b-col>
                <b-button :to="{ name: 'Home' }" variant="primary">
                  <b-icon-arrow-left></b-icon-arrow-left>
                  Retour
                </b-button>
              </b-col>
              <b-col cols="6">
                <b-pagination
                  v-model="currentPage"
                  :per-page="perPage"
                  :total-rows="cityData.list.length"
                  aria-controls="my-table"
                ></b-pagination>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-table
                  id="my-table"
                  :current-page="currentPage"
                  :fields="fields"
                  :items="cityData.list"
                  :per-page="perPage"
                  hover
                  striped
                >
                  <template v-slot:cell(dt)="data">
                    <!--                    {{ data.value | moment("DD/MM/YYYY HH:mm:ss") }}-->
                    {{ data.value | moment("llll") }}
                    <!--                    {{ data.value | moment("from", "now") }}-->
                  </template>
                  <template v-slot:cell(weather[0])="data">
                    <WeatherAvatar
                        :description="data.value.description"
                        :icon="data.value.icon"
                    ></WeatherAvatar>
                  </template>
                  <template v-slot:cell(main.temp)="data">
                    <temperature
                        :tempdata="data.value"
                        cold-temp-floor="10"
                        hot-temp-floor="23"
                    ></temperature>
                  </template>
                  <template v-slot:cell(main.humidity)="data">
                    <Humidity
                        :humiditydata="data.value"
                        max="65"
                        min="40"
                    ></Humidity>
                  </template>
                </b-table>
              </b-col>
            </b-row>
            <b-row>
              <b-col></b-col>
              <b-col cols="6">
                <b-pagination
                  v-model="currentPage"
                  :per-page="perPage"
                  :total-rows="cityData.list.length"
                  aria-controls="my-table"
                ></b-pagination>
              </b-col>
            </b-row>
          </b-container>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import CityMap from "@/components/CityMap";
import instantForecastService from "@/services/instantForecastService";
import Temperature from "@/components/Temperature";
import Humidity from "@/components/Humidity";
import WeatherAvatar from "@/components/WeatherAvatar";

export default {
  name: "Details",
  components: {WeatherAvatar, Humidity, Temperature, CityMap},
  data() {
    return {
      coldTempFloor: 10,
      hotTempFloor: 23,
      perPage: 5,
      currentPage: 1,
      fields: [
        {key: "dt", label: "Date", sortable: true},
        {key: "weather[0]", label: "Etat"},
        {key: "main.temp", label: "Température Moyenne", sortable: true},
        {key: "main.humidity", label: "Taux d'Humidité", sortable: true}
      ]
    };
  },
  asyncComputed: {
    cityData: {
      get() {
        return instantForecastService
            .getInstantForecast(this.$route.params.cityName)
            .then(response => response.data);
      },
      default() {
        return {};
      }
    }
  }
};
</script>
