//Auth API
import { AUTH_API } from "../api/api";

//Import axios
import axios from "axios";
//React router dom
import { json } from "react-router-dom";

//Login / Signup API
export const axiosAuthRequest = async (pathname, dataSend) => {
  try {
    //Gọi axios cho yêu cầu xác thực
    const response = await axios.post(`${AUTH_API}/${pathname}`, dataSend);
    //Không có phản hồi => thoát logic
    if (!response && response.status !== 422) {
      return;
    }

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    //Lấy dữ liệu lỗi validate
    if (error.response.status === 422) {
      return error.response.data;
    } else {
      //Các lỗi khác
      console.log(error);
    }
  }
};

//Lấy người dùng hiện tại
export const axiosGetCurrentUser = async (token) => {
  try {
    //Axios Fetch Request
    const response = await axios.get(`${AUTH_API}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response) {
      throw json(
        { message: "Đã xảy ra lỗi khi lấy thông tin người dùng hiện tại" },
        { status: 500 }
      );
    }

    return response.data;
  } catch (error) {
    throw json({ message: error.message }, { status: error.status });
  }
};
