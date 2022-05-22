<template>
  <div class="hero">
    <div class="hero__details">
      <h1 class="hero__title">Test assignment for front-end developer</h1>
      <p class="hero__desc">
        What defines a good front-end developer is one that has skilled
        knowledge of HTML, CSS, JS with a vast understanding of User design
        thinking as they'll be building web interfaces with accessibility in
        mind. They should also be excited to learn, as the world of Front-End
        Development keeps evolving.
      </p>
      <button type="button" class="default-btn">Sign up</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils/vars";
.hero {
  display: flex;
  max-width: 1170px;
  padding: 40px 15px;
  align-items: center;
  justify-content: center;
  min-height: 650px;
  background: url("~@/assets/imgs/hero_bg.webp") 50% 50% no-repeat;
  background-size: cover;
  position: relative;
  margin: 0 auto 140px;
  @media (max-width: 768px) {
    min-height: 500px;
  }
  @media (max-width: 587px) {
    align-items: baseline;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  &__details {
    max-width: 380px;
    text-align: center;
    position: relative;
    z-index: 1;
  }
  &__title {
    font-size: 40px;
    font-weight: 400;
    color: $baseWhite;
    line-height: 40px;
    margin-bottom: 20px;
  }
  &__desc {
    line-height: 26px;
    color: $baseWhite;
    margin-bottom: 32px;
  }
}
</style>
