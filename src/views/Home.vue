<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col v-for="(city, cityName) in getCities" :key="cityName">
        <CityCard></CityCard>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CityCard from "@/components/CityCard";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: { CityCard },
  computed: {
    ...mapGetters(["getCities"])
  }
};
</script>

<style scoped></style>
