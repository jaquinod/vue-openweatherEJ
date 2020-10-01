<template>
  <b-container :fluid="true" class="h-100">
    <b-row class="h-100">
      <b-col
        cols="3"
        class="text-center pt-3 pb-3"
        style="background-color: #2c3e50"
      >
        <b-form inline>
          <b-input
            v-model="cityToAdd"
            type="text"
            @keydown.enter.prevent="addNewCity(cityToAdd)"
          />
          <b-button @click="addNewCity(cityToAdd)" variant="primary">
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
      v-model="showBottom"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      variant="danger"
      :dismissible="true"
    >
      Maximum 6 villes sur le dashboard.
    </b-alert>
  </b-container>
</template>

<script>
import CityCard from "@/components/CityCard";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Home",
  components: { CityCard },
  data() {
    return {
      cityToAdd: "",
      showBottom: false
    };
  },
  methods: {
    ...mapMutations(["addCity"]),
    addNewCity(city) {
      if (this.getCities.length < 6) {
        this.addCity(city);
      } else {
        this.showBottom = !this.showBottom;
      }
    }
  },
  computed: {
    ...mapGetters(["getCities"])
  }
};
</script>

<style scoped></style>
