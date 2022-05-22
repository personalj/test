<template>
  <div class="header">
    <div class="container">
      <div class="header__inner">
        <div class="header__logo">
          <router-link to="/">
            <img src="@/assets/imgs/Logo.svg" alt="logo" class="logo" />
          </router-link>
        </div>
        <div class="header__btns">
          <button type="button" class="default-btn">Users</button>
          <button type="button" class="default-btn">Sign up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderInfo",
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils/vars";
.header {
  background: $baseWhite;
  padding: 13px 0 0 0;
  &__inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }
  .default-btn {
    margin-left: 10px;
    margin-bottom: 12px;
    &:first-child {
      margin-left: 0;
    }
  }
  .logo {
    width: 104px;
    height: 26px;
    object-fit: contain;
    margin-bottom: 12px;
  }
}
</style>
