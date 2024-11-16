import axios from "axios";

const baseUrl = "http://localhost:8080/users";

export const getCategoriesApi = async (limit, page, sort, search) => {
  try {
    const params = {
      _limit: limit,
      _page: page,
      _sort: "firstname,lastname",
      _order: sort === "asc" || sort === "desc" ? `${sort},${sort}` : "asc,asc",
    };
    

    if (search) {
      const searchTerms = search.trim().split(" ");
      if (searchTerms.length > 1) {
        params.firstname_like = searchTerms[0];
        params.lastname_like = searchTerms.slice(1).join(" ");
      } else {
        params.firstname_like = searchTerms[0];
      }
    }
    const query = new URLSearchParams(params).toString();
    const res = await axios.get(`${baseUrl}?${query}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};


export const getCategoryApi = async (userId) => {
  try {
    const res = await axios.get(`${baseUrl}/${userId}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const createUserApi = async (user) => {
  try {
    const res = await axios.post(baseUrl, user);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateUserApi = async (user) => {
  try {
    const res = await axios.patch(`${baseUrl}/${user.id}`, user);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const searchUserByUsernameApi = async (search) => {
  try {
    const res = await axios.get(`${baseUrl}?username_like=${search}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
