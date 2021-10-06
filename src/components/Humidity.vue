<template>
  <div>
    <b-icon-droplet v-if="humiditydata <= min"></b-icon-droplet>
    <b-icon-droplet-half
      v-if="humiditydata > min && humiditydata <= max"
    ></b-icon-droplet-half>
    <b-icon-droplet-fill v-if="humiditydata > max"></b-icon-droplet-fill>
    {{ humiditydata }} %
  </div>
</template>

<script>
export default {
  name: "Humidity",
  props: ["humiditydata", "min", "max"]
};
</script>

<style scoped></style>
