import {
  createUserApi,
  getUserApi,
  getUsersApi,
  searchUserByUsernameApi,
  updateUserApi,
} from "@/api/userApi";

export const userModule = {
  state: {
    user: null,
    users: [],
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    UPDATE_USER(state, updatedUser) {
      const index = state.users.findIndex((item) => item.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
      if (state.user.id === updatedUser.id) {
        state.user = updatedUser;
      }
    },
  },
  actions: {
    async fetchUsers(
      { commit },
      { limit, page, sort, search}
    ) {
      try {
        const res = await getUsersApi(limit, page, sort, search); 
        commit("SET_USERS", res);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchUser({ commit }, id) {
      try {
        const res = await getUserApi(id);
        commit("SET_USER", res);
      } catch (error) {
        console.error(error);
      }
    },
    async updateUser({ commit }, updatedUser) {
      try {
        const res = await updateUserApi(updatedUser);
        commit("SET_USER", res);
      } catch (error) {
        console.error(error);
      }
    },
    async createUser({ commit }, newUser) {
      try {
        const res = await createUserApi(newUser);
      } catch (error) {
        console.error(error);
      }
    },
    async searchUserByUserName({ commit }, search) {
      try {
        const res = await searchUserByUsernameApi(search);
        commit("SET_USERS", res);
      } catch (error) {
        console.error(error);
      }
    },
   
  },
  getters: {
    getUser: (state) => state.user,
    getUsers: (state) => state.users,
  },
};
