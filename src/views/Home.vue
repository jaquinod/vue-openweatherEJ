<template>
  <b-container :fluid="true" class="h-100">
    <b-row class="h-100">
      <b-col
        cols="3"
        class="text-center pt-3 pb-3"
        style="background-color: #2c3e50"
      >
        <b-form inline class="d-flex">
          <b-input
            v-model="cityToAdd"
            class="flex-grow-1"
            type="text"
            @keydown.enter.prevent="addNewCity(cityToAdd)"
          />
          <b-button @click="addNewCity(cityToAdd)" variant="primary" class="">
            <b-icon-search></b-icon-search>
          </b-button>
        </b-form>
      </b-col>
      <b-col>
        <b-container>
          <b-row>
            <b-col
              v-for="(city, index) in getCities"
              :key="index"
              sm="4"
              class="pt-3 pb-3"
            >
              <CityCard :city-name="city" :city-index="index"></CityCard>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
    <b-alert
      v-model="showTooMuch"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      variant="danger"
      :dismissible="true"
    >
      Maximum 6 villes sur le dashboard.
    </b-alert>
    <b-alert
      v-model="showNotFound"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      variant="danger"
      :dismissible="true"
    >
      Ville Non Trouvée.
    </b-alert>
  </b-container>
</template>

<script>
import CityCard from "@/components/CityCard";
import { mapGetters, mapMutations } from "vuex";
import instantWeatherService from "@/services/instantWeatherService";

export default {
  name: "Home",
  components: { CityCard },
  data() {
    return {
      cityToAdd: "",
      showTooMuch: false,
      showNotFound: false
    };
  },
  methods: {
    ...mapMutations(["addCity"]),
    addNewCity(city) {
      if (this.getCities.length < 6) {
        instantWeatherService.getInstantWeather(city).then(
          () => {
            this.addCity(city);
          },
          reason => {
            if (reason.response.status === 404) {
              // Do nothing
              this.showNotFound = !this.showNotFound;
            }
          }
        );
      } else {
        this.showTooMuch = !this.showTooMuch;
      }
      this.cityToAdd = "";
    }
  },
  computed: {
    ...mapGetters(["getCities"])
  }
};
</script>

<style scoped></style>
