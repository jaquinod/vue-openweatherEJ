<template>
  <div style="height: 400px; width: 100%;">
    <l-map
      v-if="showMap"
      :center="center"
      :options="mapOptions"
      :zoom="zoom"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :attribution="attribution" :url="url" />
      <l-marker :lat-lng="center"></l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LMarker, LTileLayer } from "vue2-leaflet";

export default {
  name: "CityMap",
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  props: {
    lat: { default: 47.41322 },
    lng: { default: -1.219482 }
  },
  data() {
    return {
      zoom: 13,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      currentZoom: 11.5,
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    }
  },
  computed: {
    center() {
      return latLng(this.lat, this.lng);
    }
  }
};
</script>

<style scoped></style>
