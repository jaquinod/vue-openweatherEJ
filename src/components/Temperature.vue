<template>
  <div>
    <b-icon-thermometer :animation="animateOrNot()"></b-icon-thermometer>
    {{ tempdata }}
    <b-img src="@/assets/Degrees-Celcius.svg" style="height: 1em"></b-img>
  </div>
</template>

<script>
export default {
  name: "Temperature",
  props: ["tempdata", "coldTempFloor", "hotTempFloor"],
  methods: {
    animateOrNot: function() {
      if (this.tempdata < this.coldTempFloor) {
        return "shake";
      }
      if (this.tempdata > this.hotTempFloor) {
        return "throb";
      }
    }
  }
};
</script>

<style scoped>
.b-icon-animation-shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both infinite;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
