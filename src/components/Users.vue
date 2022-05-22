<template>
  <section class="users">
    <div class="container">
      <h2 class="section-title">Working with GET request</h2>
      <div class="users__list">
        <div v-for="user in users" :key="user.id" class="user">
          <div class="user__inner">
            <div class="user__img">
              <img :src="user.photo" alt="user photo" />
            </div>
            <div>
              <Tooltip
                :text="user.name"
                :show-tooltip="checkLength(user.name, this.elLength)"
              >
                <span
                  class="user__name"
                  :class="{ cursor: checkLength(user.name, this.elLength) }"
                >
                  {{ truncate(user.name, this.elLength) }}
                </span>
              </Tooltip>
            </div>
            <Tooltip
              :text="user.position"
              :show-tooltip="checkLength(user.position, this.elLength)"
            >
              <div class="user__position">
                {{ user.position }}
              </div>
            </Tooltip>
            <Tooltip
              :text="user.email"
              :show-tooltip="checkLength(user.email, this.elLength)"
            >
              <span
                class="user__mail"
                :class="{ cursor: checkLength(user.email, this.elLength) }"
              >
                {{ truncate(user.email, this.elLength) }}
              </span>
            </Tooltip>
            <div class="user__phone">
              {{ user.phone }}
            </div>
          </div>
        </div>
      </div>
      <loader v-if="isLoading" />
      <div v-if="!isLoading" class="users__btn">
        <Transition name="el">
          <button
            v-if="users.length && page < usersTotalPages"
            type="button"
            class="default-btn"
            @click="loadMore"
          >
            Show more
          </button>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script>
import Tooltip from "@/components/common/Tooltip";
import Loader from "@/components/common/Loader";
import { truncate, checkLength } from "@/helpers";
export default {
  name: "Users",
  props: {
    users: {
      type: Array,
      default: () => [],
    },
    usersTotalPages: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 1,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Tooltip,
    Loader,
  },
  data() {
    return {
      elLength: 30,
    };
  },
  methods: {
    truncate,
    checkLength,
    loadMore() {
      this.$emit("loadMore");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils/vars";
.users {
  overflow: hidden;
  margin-bottom: 50px;
  &__list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px 20px;
  }
  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .user {
    width: 33.33%;
    padding-left: 15px;
    padding-right: 15px;
    line-height: 26px;
    margin-bottom: 29px;
    @media (max-width: 992px) {
      width: 50%;
    }
    @media (max-width: 576px) {
      width: 100%;
    }
    &__inner {
      background: $baseWhite;
      border-radius: 10px;
      padding: 20px;
      text-align: center;
    }
    &__img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      position: relative;
      margin: 0 auto 20px;
      overflow: hidden;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &__name {
      margin-bottom: 20px;
      display: inline-block;
    }
    &__mail {
      margin-bottom: 6px;
    }
  }
}
</style>
