<template>
  <div class="grid grid-cols-3 gap-4">
    <CityCard></CityCard>
    <CityCard></CityCard>
    <CityCard></CityCard>
    <CityCard></CityCard>
  </div>
</template>

<script>
import CityCard from "@/components/CityCard";
export default {
name: "Home",
  components: {CityCard}
}
</script>

<style scoped>

</style>