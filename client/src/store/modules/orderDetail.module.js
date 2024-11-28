import { createOrdersDetailApi, getOrdersDetailApi, getOrdersDetailByIdApi, updateOrdersDetailApi } from "@/api/orderDetailApi";

export const orderDetailModule = {
  state: {
    orderDetails: [],
    orderDetail: null,
  },
  mutations: {
    SET_ORDER_DETAILS(state, orderDetails) {
      state.orderDetails = orderDetails;
    },
    SET_ORDER_DETAIL(state, orderDetail) {
      state.orderDetail = orderDetail;
    },
    ADD_ORDER_DETAIL(state, orderDetail) {
      state.orderDetails.push(orderDetail);
    },
    UPDATE_ORDER_DETAIL(state, updatedOrderDetail) {
      const index = state.orderDetails.findIndex(
        (item) => item.id === updatedOrderDetail.id
      );
      if (index !== -1) {
        state.orderDetails[index] = updatedOrderDetail;
      }
      if (state.orderDetail && state.orderDetail.id === updatedOrderDetail.id) {
        state.orderDetail = updatedOrderDetail;
      }
    },
  },
  actions: {
    async fetchOrderDetails({ commit }, orderId) {
      try {
        const res = await getOrdersDetailApi(orderId);
        commit("SET_ORDER_DETAILS", res);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchOrderDetail({ commit }, orderId) {
      try {
        const res = await getOrdersDetailByIdApi(orderId);
        commit("SET_ORDER_DETAIL", res);
      } catch (error) {
        console.error(error);
      }
    },
    async addOrderDetail({ commit }, orderDetail) {
      try {
        const res = await createOrdersDetailApi(orderDetail);
        commit("ADD_ORDER_DETAIL", res);
      } catch (error) {
        console.error(error);
      }
    },
    async updateOrderDetail({ commit }, updatedOrderDetail) {
      try {
        const res = await updateOrdersDetailApi(updatedOrderDetail);
        commit("UPDATE_ORDER_DETAIL", res);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    getOrderDetails: (state) => state.orderDetails,
    getOrderDetail: (state) => state.orderDetail,
  },
};
