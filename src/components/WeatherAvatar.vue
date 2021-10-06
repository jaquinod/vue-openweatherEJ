<template>
  <b-avatar :title="description" variant="primary">
    <b-card-img
        :alt="description"
        :src="'http://openweathermap.org/img/wn/' + icon + '@4x.png'"
    ></b-card-img>
  </b-avatar>
</template>

<script>
export default {
  name: "WeatherAvatar",
  props: ["description", "icon"]
};
</script>
