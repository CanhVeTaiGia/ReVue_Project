import axios from "axios";

const BASE_URL = "http://localhost:8080/products";
export const getProductsApi = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data
  } catch (error) {
    console.error(error);
  }
};

export const filteredProductApi = async (limit, page, type, search, sort) => {
  try {
    const params = {
      _limit: limit,
      _page: page,
    };
    if (type) {
      params._sort = type;
      params._order = sort || "asc";
    }
    if (search) {
      params.name_like = search;
    }
    const query = new URLSearchParams(params).toString();
    const res = await axios.get(`${baseUrl}?${query}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductApi = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const createProductApi = async (product) => {
  try {
    const res = await axios.post(BASE_URL, product);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProductApi = async (product) => {
  try {
    const res = await axios.patch(`${BASE_URL}/${product.id}`, product);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProductApi = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
