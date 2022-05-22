<template>
  <div class="form-success">
    <div class="form-success__title">User successfully registered</div>
    <img src="@/assets/imgs/success-image-form.svg" alt="form-success-ime" />
  </div>
</template>

<script>
export default {
  name: "FormSuccess",
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils/vars";
.form {
  &-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__title {
      font-size: 40px;
      line-height: 40px;
      margin-bottom: 50px;
      text-align: center;
    }
  }
}
</style>
