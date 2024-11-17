import axios from "axios";

const baseUrl = "http://localhost:8080/category";

export const filteredCategoriesApi = async (limit, page, sort, search, sortByStatus) => {
  try {
    const params = {
      _limit: limit,
      _page: page,
      _sort: "name",
      _order: sort || 'asc',
    };

    if (search) {
      params.name_like = `${search}`;
    }
    if(sortByStatus) {
      params.status_like = sortByStatus;
    }
    else if(sortByStatus === null){
      delete params.status_like;
    }
    else{
      params.status_like = false;
    }
    
    const query = new URLSearchParams(params).toString();
    const res = await axios.get(`${baseUrl}?${query}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCategoriesApi = async () => {
  try {
    const res = await axios.get(`${baseUrl}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCategoryApi = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const createCategoryApi = async (category) => {
  try {
    const res = await axios.post(baseUrl, category);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updatedCategoryApi = async (category) => {
  try {
    const res = await axios.patch(`${baseUrl}/${category.id}`, category);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const searchUserByNameApi = async (search) => {
  try {
    const res = await axios.get(`${baseUrl}?name_like=${search}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategoryApi = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
    const res = await axios.get(`${baseUrl}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
