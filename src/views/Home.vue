<template>
  <b-container>
    <b-row align-h="center">
      <b-col class="text-center" cols="4">
        <b-form inline>
          <b-input
            v-model="cityToAdd"
            type="text"
            @keydown.enter.prevent="addNewCity(cityToAdd)"
          />
          <b-button @click="addNewCity(cityToAdd)">
            <b-icon-search></b-icon-search>
          </b-button>
        </b-form>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-for="(city, index) in getCities" :key="index" sm="4">
        <CityCard :city-name="city" :city-index="index"></CityCard>
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
