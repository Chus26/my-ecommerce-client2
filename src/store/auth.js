//Import từ @redux toolkit
import { createSlice } from "@reduxjs/toolkit";

//Khởi tạo state xác thực
const initialAuthState = {
  isAuthenticated: false,
  userName: "",
  token: null,
};

//Tạo slice cho xác thực
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    //Đặt trạng thái đăng nhập
    setAuth(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userName = action.payload.userName;
    },
    //Đặt trạng thái khi đăng xuất
    onLogout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.userName = "";
    },
  },
});

//xuất các action của auth
export const authActions = authSlice.actions;

//xuất mặc định reducer của auth slice
export default authSlice.reducer;
