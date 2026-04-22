import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9999/api",
});

export const loginUser = async (data) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

export const signupUser = async (data) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};