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
                    <b-icon-thermometer
                        :animation="animateOrNot(data.value)"
                    ></b-icon-thermometer>
                    {{ data.value }}
                    <b-img
                        src="@/assets/Degrees-Celcius.svg"
                        style="height: 1em"
                    ></b-img>
                  </template>
                  <template v-slot:cell(main.humidity)="data">
                    <b-icon-droplet v-if="data.value <= 40"></b-icon-droplet>
                    <b-icon-droplet-half
                        v-if="data.value > 40 && data.value <= 65"
                    ></b-icon-droplet-half>
                    <b-icon-droplet-fill
                        v-if="data.value > 65"
                    ></b-icon-droplet-fill>
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
  name: "Details",
  components: {CityMap},
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
  methods: {
    animateOrNot: function (temp) {
      if (temp < this.$data.coldTempFloor) {
        return "shake";
      }
      if (temp > this.$data.hotTempFloor) {
        return "throb";
      }
    }
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

<style scoped>
.b-icon-animation-shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both infinite;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
