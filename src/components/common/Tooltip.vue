<template>
  <div class="tooltip-box">
    <slot />
    <div v-if="showTooltip" class="tooltip">
      <span class="text">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToolTip",
  props: {
    text: {
      type: String,
      default: "",
    },
    showTooltip: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils/vars";
.tooltip {
  color: $baseWhite;
  text-align: center;
  padding: 3px 15px;
  top: 100%;
  left: 50%;
  opacity: 0;
  display: none;
  position: absolute;
  z-index: 1;
  background: $baseBlack;
  border-radius: 4px;
  width: 100%;
  @media (max-width: 1920px) {
    word-break: break-all;
  }
  @media (max-width: 1200px) {
    left: 0;
  }
  &-box {
    display: inline;
    position: relative;
  }
  &-box:hover > .tooltip {
    opacity: 1;
    display: block;
  }
}
</style>
