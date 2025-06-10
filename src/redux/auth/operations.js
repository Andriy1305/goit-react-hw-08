import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.goit.global/";

// Функція для встановлення або видалення заголовка авторизації
const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

// Реєстрація користувача
export const register = createAsyncThunk(
  "auth/register",
  async (values, thunkAPI) => {
    try {
      const res = await axios.post("/users/signup", values);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

// Логін користувача
export const logIn = createAsyncThunk(
  "auth/login",
  async (values, thunkAPI) => {
    try {
      const res = await axios.post("/users/login", values);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

// Лог-аут користувача
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    setAuthHeader(null);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
  }
});

// Оновлення даних поточного користувача
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      // Якщо токена немає — скасовуємо запит
      return thunkAPI.rejectWithValue("No token available");
    }

    try {
      setAuthHeader(token);
      const res = await axios.get("/users/current");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      return Boolean(state.auth.token);
    },
  }
);
