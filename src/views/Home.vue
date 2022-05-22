<template>
  <div class="content">
    <hero />
    <users
      :users="users"
      :users-total-pages="usersTotalPages"
      :is-loading="isLoading"
      :page="page"
      @load-more="getUsersList"
    />
    <form-info :positions="positions" @user-registered="getUsersList(true)" />
  </div>
</template>

<script>
import Hero from "@/components/Hero";
import Users from "@/components/Users";
import FormInfo from "@/components/Form";
export default {
  name: "Home",
  components: {
    Hero,
    Users,
    FormInfo,
  },
  data: function () {
    return {
      isLoading: true,
      page: 1,
      count: 6,
    };
  },
  computed: {
    users() {
      return this.$store.getters["users/users"];
    },
    usersTotalPages() {
      return this.$store.getters["users/usersTotalPages"];
    },
    token() {
      return this.$store.getters["auth/token"];
    },
    positions() {
      return this.$store.getters["users/positions"];
    },
  },
  methods: {
    async getUsersList(initialFetch = false) {
      this.isLoading = true;
      await this.$store.dispatch("users/getUsers", {
        page: initialFetch ? (this.page = 1) : (this.page += 1),
        count: this.count,
      });
      this.isLoading = false;
    },
  },
  async mounted() {
    if (!this.token) {
      await this.$store.dispatch("auth/getToken");
    }
    await this.getUsersList(true);
    await this.$store.dispatch("users/getPositions");
  },
};
</script>
