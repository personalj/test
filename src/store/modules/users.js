import { http } from "@/services/http";

export default {
  state: {
    users: [],
    usersTotalPages: 0,
    positions: [],
  },
  mutations: {
    setUsers(state, data) {
      if (data.page === 1) {
        state.users = [];
        state.users = data.users || [];
        return;
      }
      data.users && state.users.push(...data.users);
    },
    usersUsersTotalPages(state, usersTotalPages) {
      state.usersTotalPages = usersTotalPages;
    },
    setPositions(state, positions) {
      state.positions = positions;
    },
  },
  actions: {
    async getUsers({ commit }, { page, count }) {
      try {
        const users = await http.get(`users?page=${page}&count=${count}`);
        commit("setUsers", users.data);
        commit("usersUsersTotalPages", users.data.total_pages);
      } catch (e) {
        commit("setError", e.response.data.message, { root: true });
      }
    },
    async getPositions({ commit }) {
      try {
        const positions = await http.get("positions");
        commit("setPositions", positions.data.positions || []);
      } catch (e) {
        commit("setError", e.response.data.message, { root: true });
      }
    },
    async registerUser({ commit }, payload) {
      try {
        let isSuccess = false;
        await http.post("users", payload, {
          headers: {
            "Content-Type": "multipart/form-data;",
          },
        });
        isSuccess = true;
        return isSuccess;
      } catch (e) {
        commit("setError", e.response.data.message, { root: true });
      }
    },
  },
  getters: {
    users(state) {
      return state.users;
    },
    usersTotalPages(state) {
      return state.usersTotalPages;
    },
    positions(state) {
      return state.positions;
    },
  },
  namespaced: true,
};
