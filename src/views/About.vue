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
                    {{ data.value | moment("DD/MM/YYYY HH:mm:ss") }}
                  </template>
                  <template v-slot:cell(weather[0])="data">
                    <b-avatar :title="data.value.description" variant="primary">
                      <b-card-img
                        :alt="data.value.description"
                        :src="
                          'http://openweathermap.org/img/wn/' +
                            data.value.icon +
                            '@4x.png'
                        "
                      ></b-card-img>
                    </b-avatar>
                  </template>
                  <template v-slot:cell(main.temp)="data">
                    <b-icon-thermometer></b-icon-thermometer>
                    {{ data.value }}
                    <b-img
                      src="@/assets/Degrees-Celcius.svg"
                      style="height: 1em"
                    ></b-img>
                  </template>
                  <template v-slot:cell(main.humidity)="data">
                    <b-icon-droplet-fill></b-icon-droplet-fill>
                    {{ data.value }} %
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

export default {
  name: "About",
  components: { CityMap },
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      fields: [
        { key: "dt", label: "Date", sortable: true },
        { key: "weather[0]", label: "Etat" },
        { key: "main.temp", label: "Température Moyenne", sortable: true },
        { key: "main.humidity", label: "Taux d'Humidité", sortable: true }
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
