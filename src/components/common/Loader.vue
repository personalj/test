<template>
  <div class="loader-wrap">
    <span class="loader"></span>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils/vars";
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid $baseCian;
  border-bottom-color: transparent;
  box-sizing: border-box;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
  &-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
