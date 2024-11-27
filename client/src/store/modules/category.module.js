import {
  getCategoriesApi,
  createCategoryApi,
  updatedCategoryApi,
  filteredCategoriesApi,
  deleteCategoryApi,
  getCategoryApi,
} from "@/api/categoryApi";

export const categoryModule = {
  state: {
    categories: [],
    category: null,
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_CATEGORY(state, category) {
      state.category = category;
    },
    UPDATE_CATEGORY(state, updatedCategory) {
      const index = state.categories.findIndex(
        (item) => item.id === updatedCategory.id
      );
      if (index !== -1) {
        state.categories[index] = updatedCategory;
      }
      if (state.category && state.category.id === updatedCategory.id) {
        state.category = updatedCategory;
        console.log(state.category);
      }
    },
    CREATE_CATEGORY(state, category) {
      state.categories.push(category);
    },
  },
  actions: {
    async filteredCategories({ commit }, { limit, page, sort, search, sortByStatus }) {
      try {   
        const res = await filteredCategoriesApi(limit, page, sort, search, sortByStatus);
        commit("SET_CATEGORIES", res);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchCategories({ commit }) {
      try {
        const res = await getCategoriesApi();
        commit("SET_CATEGORIES", res);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchCategory({ commit }, id) {
      try {
        const res = await getCategoryApi(id);
        commit("SET_CATEGORY", res);
      } catch (error) {
        console.error(error);
      }
    },
    async createCategory({ commit }, category) {
      try {
        const res = await createCategoryApi(category);
        commit("UPDATE_CATEGORY", res);
      } catch (error) {
        console.error(error);
      }
    },
    async updateCategory({ commit }, updatedCategory) {
      try {
        const res = await updatedCategoryApi(updatedCategory);
        commit("UPDATE_CATEGORY", res);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteCategory({ commit }, id) {
      try {
        const res = await deleteCategoryApi(id);
        commit("SET_CATEGORIES", res);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    getCategories: (state) => state.categories,
    getCategory: (state) => state.category,
  },
};
