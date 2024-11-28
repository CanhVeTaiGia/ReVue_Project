import axios from "axios";

const BASE_URL = 'http://localhost:8080/orders_detail';

export const getOrdersDetailApi = async () => {
    try {
        const res = await axios.get(BASE_URL);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const getOrdersDetailByIdApi = async (id) => {
    try {
        const res = await axios.get(`${BASE_URL}/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const createOrdersDetailApi = async (orderDetail) => {
    try {
        const res = await axios.post(BASE_URL, orderDetail);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateOrdersDetailApi = async (orderDetail) => {
    try {
        const res = await axios.patch(`${BASE_URL}/${orderDetail.id}`, orderDetail);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteOrdersDetailApi = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
        const res = await axios.get(BASE_URL);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}