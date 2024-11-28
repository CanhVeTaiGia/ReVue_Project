import axios from "axios";

const BASE_URL = "http://localhost:8080/orders";
export const getOrdersApi = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const createOrderApi = async (order) => {
  try {
    const res = await axios.post(BASE_URL, order);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteOrderApi = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateOrderApi = async (order) => {
  try {
    const res = await axios.patch(`${BASE_URL}/${order.id}`, order);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOrderApi = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
