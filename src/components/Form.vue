<template>
  <section class="form-wrap">
    <div class="container">
      <div v-if="isLoading">
        <loader />
      </div>
      <template v-else>
        <div v-if="!isUserRegistered" class="form-wrap__inner">
          <h2 class="section-title">Working with POST request</h2>
          <form class="form" @submit.prevent="handleSubmit">
            <div class="form__item input-wrap">
              <input
                v-model.trim="name"
                id="name"
                type="text"
                class="input-text"
                :class="{ invalid: v$.name.$dirty && v$.name.$error }"
                placeholder="Your name"
              />
              <label for="name" class="input-label">Your name</label>
              <small
                v-if="v$.name.$dirty && v$.name.required.$invalid"
                class="input-invalid-msg"
              >
                Field required
              </small>
              <small
                v-else-if="v$.name.$dirty && v$.name.minLength.$invalid"
                class="input-invalid-msg"
              >
                Name should be min 2
              </small>
              <small
                v-else-if="v$.name.$dirty && v$.name.maxLength.$invalid"
                class="input-invalid-msg"
              >
                Name should be max 60
              </small>
            </div>
            <div class="form__item input-wrap">
              <input
                v-model.trim="email"
                id="email"
                type="email"
                class="input-text"
                :class="{ invalid: v$.email.$dirty && v$.email.$error }"
                placeholder="Your name"
              />
              <label for="email" class="input-label">Email</label>
              <small
                v-if="v$.email.$dirty && v$.email.required.$invalid"
                class="input-invalid-msg"
              >
                Field required
              </small>
              <small
                v-if="v$.email.$dirty && v$.email.email.$invalid"
                class="input-invalid-msg"
              >
                Enter correct email
              </small>
              <small
                v-else-if="v$.email.$dirty && v$.email.minLength.$invalid"
                class="input-invalid-msg"
              >
                Email should be min 2
              </small>
              <small
                v-else-if="v$.email.$dirty && v$.email.maxLength.$invalid"
                class="input-invalid-msg"
              >
                Email should be max 100
              </small>
            </div>
            <div class="form__item form__item_hint input-wrap">
              <input
                v-model.trim="phone"
                id="phone"
                type="text"
                class="input-text"
                :class="{
                  invalid:
                    (v$.phone.$dirty && v$.phone.$error) ||
                    (v$.phone.$dirty && !checkPhone(phone)),
                }"
                placeholder="Your name"
              />
              <label for="phone" class="input-label">Phone</label>
              <div class="input-hint">+38 (XXX) XXX - XX - XX</div>
              <small
                v-if="v$.phone.$dirty && v$.phone.required.$invalid"
                class="input-invalid-msg"
              >
                Field required
              </small>
              <small
                v-else-if="v$.phone.$dirty && !checkPhone(phone)"
                class="input-invalid-msg"
              >
                Phone should start with +380 and be valid
              </small>
            </div>
            <div class="form__item form__item_options">
              <p class="form__item-label">Select your position</p>
              <div
                v-for="position in positions"
                :key="position.id"
                class="form__item-row"
              >
                <label class="input-radio-label">
                  <input
                    type="radio"
                    name="position"
                    class="input-radio"
                    :checked="position_id === position.id"
                    @change="position_id = position.id"
                  />
                  <span class="input-radio-btn" />
                  <span class="input-radio-text">
                    {{ position.name }}
                  </span>
                </label>
              </div>
              <small
                v-if="v$.position_id.$dirty && v$.position_id.required.$invalid"
                class="input-invalid-msg"
              >
                Field required
              </small>
            </div>
            <div class="form__item">
              <label
                class="input-file-label"
                :class="{
                  invalid:
                    (v$.image.photo.$dirty && v$.image.photo.$error) ||
                    isImageError,
                }"
              >
                <input
                  type="file"
                  accept=".jpg, .jpeg"
                  class="input-file"
                  @change="uploadFile($event)"
                />
                <span class="input-file-upload"> Upload </span>
                <span class="input-file-name">
                  {{ image.photo ? image.name : "Upload your photo" }}
                </span>
              </label>
              <small
                v-if="v$.image.photo.$dirty && v$.image.photo.required.$invalid"
                class="input-invalid-msg"
              >
                Field required
              </small>
              <small v-if="isImageError" class="input-invalid-msg">
                Photo size must not be greater than 5 Mb or smaller than 70X70
              </small>
            </div>
            <div class="form__item-btn">
              <button
                type="submit"
                class="default-btn"
                :disabled="v$.$invalid || isImageError"
                :class="{ disabled: v$.$invalid || isImageError }"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
        <Transition name="el" v-else>
          <form-success />
        </Transition>
      </template>
    </div>
  </section>
</template>

<script>
const MIN_WIDTH = 70;
const MIN_HEIGHT = 70;
import useValidate from "@vuelidate/core";
import {
  email,
  required,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import { checkPhone, checkImageSize } from "@/helpers";
import FormSuccess from "@/components/FormSuccess";
import Loader from "@/components/common/Loader";
export default {
  name: "FormInfo",
  props: {
    positions: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    FormSuccess,
    Loader,
  },
  data() {
    return {
      v$: useValidate(),
      name: "",
      email: "",
      phone: "",
      position_id: 1,
      image: {
        name: "",
        height: "",
        width: "",
        photo: null,
      },
      isImageError: false,
      isUserRegistered: false,
      isLoading: false,
    };
  },
  methods: {
    checkPhone,
    checkImageSize,
    uploadFile(event) {
      const file = event.target.files[0];
      this.image.name = file && file.name;
      const fileSize = this.checkImageSize(file, 2024 * 2024);

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (evt) => {
        let img = new Image();
        img.onload = () => {
          this.image.width = img.width;
          this.image.height = img.height;
          if (this.image.width < MIN_WIDTH) {
            this.isImageError = true;
            return;
          }
          if (this.image.height < MIN_HEIGHT) {
            this.isImageError = true;
          }
        };
        img.src = evt.target.result;
      };

      reader.onerror = (evt) => {
        console.error(evt);
      };

      if (!fileSize) {
        this.isImageError = true;
        return;
      }
      this.image.photo = file;
      this.isImageError = false;
    },
    async handleSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      const data = new FormData();
      data.append("name", this.name);
      data.append("email", this.email);
      data.append("phone", this.phone);
      data.append("position_id", this.position_id);
      data.append("photo", this.image.photo);

      try {
        this.isLoading = true;
        const response = await this.$store.dispatch("users/registerUser", data);
        if (response) {
          this.isUserRegistered = true;
          this.$emit("userRegistered");
          this.clearForm();
        }
        this.isLoading = false;
        if (this.isUserRegistered) {
          setTimeout(() => {
            this.isUserRegistered = false;
          }, 2000);
        }
      } catch (e) {
        console.log(e);
      }
    },
    clearForm() {
      this.name = "";
      this.email = "";
      this.phone = "";
      this.position_id = 1;
      this.image = {
        name: "",
        height: "",
        width: "",
        photo: null,
      };
    },
  },
  validations() {
    return {
      name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(60),
      },
      email: {
        required,
        email,
        minLength: minLength(2),
        maxLength: maxLength(100),
      },
      phone: {
        required,
        checkPhone,
      },
      position_id: {
        required,
      },
      image: {
        photo: {
          required,
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  max-width: 380px;
  margin: 0 auto;
  &-wrap {
    margin-bottom: 100px;
  }
  &__item {
    margin-bottom: 50px;
    &_hint {
      margin-bottom: 29px;
    }
    &_options {
      margin-bottom: 42px;
    }
    &-label {
      margin-bottom: 12px;
    }
    &-row {
      margin-bottom: 7px;
    }
    &-btn {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
