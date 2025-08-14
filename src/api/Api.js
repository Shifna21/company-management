import axios from "axios";

const BASE_URL = "http://localhost:5000/";

export const registerUser = async (email, password) => {
  try {
    const res = await axios.post(`${BASE_URL}auth/register`, { email, password });
    return { status: res.status, data: res.data };
  } catch (error) {
    if (error.response) {
      return { status: error.response.status, data: error.response.data };
    }
    return { status: 500, data: { message: "Network error" } };
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${BASE_URL}auth/login`, { email, password });
    return { status: res.status, data: res.data };
  } catch (error) {
    if (error.response) {
      return { status: error.response.status, data: error.response.data };
    }
    return { status: 500, data: { message: "Network error" } };
  }
};


export const createCompany= async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}company/create`, data,
      {
         headers: {
                'Content-Type': 'multipart/form-data'
          }
      }
    );
    return { status: res.status, data: res.data };
  } catch (error) {
    if (error.response) {
      return { status: error.response.status, data: error.response.data };
    }
    return { status: 500, data: { message: "Network error" } };
  }
};

export const getAllcompany = async () => {
    try {
        const res = await axios.get(`${URL}company/`)
        return res
    } catch (error) {
        return error
    }
}
