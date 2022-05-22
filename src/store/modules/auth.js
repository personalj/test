import { http } from "@/services/http";

export default {
  state: {
    token: localStorage.getItem("access_token") || null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("access_token", token);
    },
  },
  actions: {
    async getToken({ commit }) {
      try {
        const info = await http.get("token");
        commit("setToken", info.data.token);
      } catch (e) {
        commit("setError", e.response.data.message, { root: true });
      }
    },
  },
  getters: {
    token(state) {
      return state.token;
    },
  },
  namespaced: true,
};
