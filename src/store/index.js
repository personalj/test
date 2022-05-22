import { createStore } from "vuex";
import users from "@/store/modules/users";
import auth from "@/store/modules/auth";

export default createStore({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {},
  getters: {
    error: (state) => state.error,
  },
  modules: {
    users,
    auth,
  },
});
