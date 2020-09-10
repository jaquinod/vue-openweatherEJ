<template>
  <!-- post card -->
  <div class="flex bg-white shadow-lg rounded-lg md:mx-auto max-w-md md:max-w-2xl ">
    <div class="flex items-start px-4 py-6">
      <img class="w-12 h-12 rounded-full object-cover mr-4 shadow"
           :src="'http://openweathermap.org/img/wn/'+content.weather[0].icon+'@2x.png'"
           :alt="content.weather[0].description">
      <div class="">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900 -mt-1">{{ content.name }}, {{ content.sys.country }}</h2>
          <small class="text-sm text-gray-700">{{ content.dt | moment("from", "now") }}</small>
        </div>
        <p class="text-gray-700">{{ content.dt | moment("DD/MM/YYYY HH:mm:ss") }}</p>
        <p class="mt-3 text-gray-700 text-sm">
          {{ content.weather[0].description }}
        </p>
        <div class="mt-4 flex items-center">
          <div class="flex mr-2 text-gray-700 text-sm mr-3">
            <img class="w-6 h-6" src="@/assets/Thermometer.svg"/>
            <p class=".text-4xl mr-1">{{ content.main.temp }}</p>
            <img class="w-6 h-6" src="@/assets/Degrees-Celcius.svg"/>
          </div>
          <div class="flex mr-2 text-gray-700 text-sm mr-8">
            <img class="w-6 h-6" src="@/assets/Humidity.svg"/>
            <p class=".text-4xl">{{ content.main.humidity }} %</p>
          </div>
          <div class="flex mr-2 text-gray-700 text-sm mr-4">
            <svg fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-1" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
            </svg>
            <span>Détails</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CityCard",
  data() {
    return {
      content: {
        "coord": {
          "lon": 2.07,
          "lat": 49.03
        },
        "weather": [{
          "id": 500,
          "main": "Rain",
          "description": "légère pluie",
          "icon": "10d"
        }],
        "base": "stations",
        "main": {
          "temp": 24.55,
          "feels_like": 23.15,
          "temp_min": 23.89,
          "temp_max": 25,
          "pressure": 1018,
          "humidity": 47
        },
        "visibility": 10000,
        "wind": {
          "speed": 3.1,
          "deg": 350
        },
        "rain": {"1h": 0.16},
        "clouds": {"all": 14},
        "dt": 1599758101,
        "sys": {
          "type": 1,
          "id": 6547,
          "country": "FR",
          "sunrise": 1599715297,
          "sunset": 1599761755
        },
        "timezone": 7200,
        "id": 6454886,
        "name": "Cergy",
        "cod": 200
      }
    }
  }
}
</script>

<style scoped>

</style>