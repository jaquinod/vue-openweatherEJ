<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="6">
        <city-map></city-map>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CityMap from "@/components/CityMap";
export default {
  name: "About",
  components: { CityMap }
};
</script>
