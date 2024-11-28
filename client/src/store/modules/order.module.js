import { createOrderApi, getOrderApi, getOrdersApi, updateOrderApi } from "@/api/orderApi";

export const orderModule = {
    state: {
        orders: [],
        order: null
    },
    mutations: {
        SET_ORDERS: (state, orders) => {
            state.orders = orders;
        },
        SET_ORDER: (state, order) => {
            state.order = order;
        },
        UPDATE_ORDER: (state, updatedOrder) => {
            const index = state.orders.findIndex(o => o.id === updatedOrder.id);
            if (index!== -1) {
                state.orders[index] = updatedOrder;
            }
            if (state.order && state.order.id === updatedOrder.id) {
                state.order = updatedOrder;
            }
        },
        CREATE_ORDER: (state, order) => {
            state.orders.push(order);
        }
    },
    actions: {
        async fetchOrders({ commit }) {
            try {
                const res = await getOrdersApi();
                commit('SET_ORDERS', res);
            } catch (error) {
                console.error(error);
            }
        },
        async fetchOrder({ commit }, id) {
            try {
                const res = await getOrderApi(id);
                commit('SET_ORDER', res);
            } catch (error) {
                console.error(error);
            }
        },
        async createOrder({ commit }, order) {
            try {
                const res = await createOrderApi(order);
                commit('CREATE_ORDER', res);
            } catch (error) {
                console.error(error);
            }
        },
        async updateOrder({ commit }, order) {
            try {
                const res = await updateOrderApi(order);
                commit('UPDATE_ORDER', res);
            } catch (error) {
                console.error(error);
            }
        }
    },
    getters: {
        getOrders: (state) => state.orders,
        getOrder: (state) => state.order
    }
}