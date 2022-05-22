<template>
  <header-info />
  <router-view />
</template>

<script>
import HeaderInfo from "@/components/Header";
export default {
  components: {
    HeaderInfo,
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      this.$toast.open(
        {
          message: fbError,
          type: "error",
        },
        2000
      );
    },
  },
};
</script>

<style lang="scss" src="@/assets/styles/index.scss" />
