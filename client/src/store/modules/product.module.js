import {
  getProductsApi,
  filteredProductApi,
  getProductApi,
  updateProductApi,
  deleteProductApi,
  createProductApi,
} from "@/api/productApi";

export const productModule = {
  state: {
    products: [],
    product: null,
  },
  mutations: {
    SET_PRODUCTS: (state, products) => {
      state.products = products;
    },
    SET_PRODUCT: (state, product) => {
      state.product = product;
    },
    CREATE_PRODUCT: (state, product) => {
      state.products.push(product);
    },
    UPDATE_PRODUCT: (state, product) => {
      const index = state.products.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        state.products[index] = product;
      }
      if (state.product && state.product.id === product.id) {
        state.product = product;
      }
    },
  },
  actions: {
    async getProducts({ commit }) {
      try {
        const res = await getProductsApi();
        commit("SET_PRODUCTS", res);
      } catch (error) {
        console.error(error);
      }
    },
    async filteredProducts({ commit }, { limit, page, search, type, sort }) {
      try {
        const res = await filteredProductApi(limit, page, search, type, sort);
        commit("SET_PRODUCTS", res);
      } catch (error) {
        console.error(error);
      }
    },
    async getProduct({ commit }, id) {
      try {
        const res = await getProductApi(id);
        commit("SET_PRODUCT", res);
      } catch (error) {
        console.error(error);
      }
    },
    async createProduct({ commit }, product) {
      try {
        const res = await createProductApi(product);
        commit("CREATE_PRODUCT", [...state.products, res]);
      } catch (error) {
        console.error(error);
      }
    },
    async updateProduct({ commit }, product) {
      try {
        const res = await updateProductApi(product);
        commit("UPDATE_PRODUCT", res);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteProduct({ commit }, id) {
      try {
        const res = await deleteProductApi(id);
        commit("SET_PRODUCTS", res);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    getProducts: (state) => state.products,
    getProduct: (state) => state.product,
  },
};
