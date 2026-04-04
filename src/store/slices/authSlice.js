import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const safeParse = (data) => {
  if (!data || data === "undefined" || data === "null") {
    return null;
  }

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("JSON parse error:", error);
    return null;
  }
};

const initialState = {
  user: safeParse(localStorage.getItem("user")),
  token: localStorage.getItem("token") || null,
  status: "idle",
  error: null,
};

// 🔹 Async thunk: login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/login", { phone, password });

      // 👉 backenddan kelayotgan data struktura tekshiruvi
      if (!res.data?.data) {
        throw new Error("Invalid response structure");
      }

      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Login failed",
      );
    }
  },
);

// 🔹 Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;

      // 🔥 Tozalash (muhim)
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // ⏳ Pending
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      // ✅ Success
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.user = action.payload.admin;
        state.token = action.payload.token;

        // 💾 Save to localStorage
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.admin));
      })

      // ❌ Error
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
