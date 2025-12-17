// // ===== FILE: src/pages/ProfilePage.jsx =====

// import React from "react";
// import { Form, useLoaderData, useNavigation, useActionData } from "react-router-dom";
// import classes from "./ProfilePage.module.css";
// import { getAuthToken } from "../utils/auth";

// const BACKEND_URL = "http://localhost:5000";

// const ProfilePage = () => {
//   const data = useLoaderData();
//   const user = data?.user;
//   const actionData = useActionData();
//   const navigation = useNavigation();
//   const isSubmitting = navigation.state === "submitting";

//   if (!user) {
//     return <p>Không thể tải thông tin người dùng.</p>;
//   }

//   return (
//     <div className={classes.profileContainer}>
//       <h2>Chỉnh sửa thông tin</h2>
//       <p>Cập nhật họ tên, số điện thoại hoặc mật khẩu của bạn.</p>

//       {actionData?.message && <p className={classes.success}>{actionData.message}</p>}
//       {actionData?.errors && (
//         <ul className={classes.errorList}>
//           {actionData.errors.map((err) => (
//             <li key={err.path}>{err.msg}</li>
//           ))}
//         </ul>
//       )}

//       <Form method="patch" className={classes.form}>
//         <div className={classes.formControl}>
//           <label htmlFor="fullName">Họ và tên</label>
//           <input id="fullName" name="fullName" type="text" defaultValue={user.fullName} required />
//         </div>

//         <div className={classes.formControl}>
//           <label htmlFor="email">Email</label>
//           <input id="email" name="email" type="email" defaultValue={user.email} readOnly disabled />
//         </div>

//         <div className={classes.formControl}>
//           <label htmlFor="phoneNumber">Số điện thoại</label>
//           <input
//             id="phoneNumber"
//             name="phoneNumber"
//             type="tel"
//             defaultValue={user.phoneNumber}
//             required
//           />
//         </div>

//         <hr className={classes.divider} />
//         <p className={classes.hint}>Để trống nếu không muốn đổi mật khẩu.</p>

//         <div className={classes.formControl}>
//           <label htmlFor="currentPassword">Mật khẩu hiện tại</label>
//           <input id="currentPassword" name="currentPassword" type="password" />
//         </div>

//         <div className={classes.formControl}>
//           <label htmlFor="newPassword">Mật khẩu mới</label>
//           <input id="newPassword" name="newPassword" type="password" placeholder="Tối thiểu 6 ký tự" />
//         </div>

//         <button type="submit" disabled={isSubmitting} className={classes.submitButton}>
//           {isSubmitting ? "Đang cập nhật..." : "Cập nhật thông tin"}
//         </button>
//       </Form>
//     </div>
//   );
// };

// export default ProfilePage;

// // ===== Loader =====
// export const loader = async () => {
//   const token = getAuthToken();
//   if (!token || token === "TOKEN EXPIRED") {
//     return null;
//   }

//   const response = await fetch(`${BACKEND_URL}/api/auth/user`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   if (!response.ok) {
//     throw new Error("Could not fetch user profile.");
//   }

//   const data = await response.json();
//   return data; // => { user: {...} }
// };

// // ===== Action =====
// export const action = async ({ request }) => {
//   const token = getAuthToken();
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);

//   const updateData = {
//     fullName: data.fullName,
//     phoneNumber: data.phoneNumber,
//     currentPassword: data.currentPassword,
//     newPassword: data.newPassword,
//   };

//   const response = await fetch(`${BACKEND_URL}/api/auth/profile`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(updateData),
//   });

//   if (response.status === 422 || response.status === 401) {
//     return await response.json();
//   }
//   if (!response.ok) {
//     throw new Error("Could not update profile.");
//   }

//   return { message: "Cập nhật thông tin thành công!" };
// };

// ===== FILE: src/pages/ProfilePage.jsx =====
import React from "react";
import { Form, useLoaderData, useNavigation, useActionData } from "react-router-dom";
import classes from "./ProfilePage.module.css";
import { getAuthToken } from "../utils/auth";

// 👇 SỬA ĐOẠN NÀY: Logic tự động chọn URL 👇
const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const BACKEND_URL = isLocal 
  ? "http://localhost:5000" 
  : "https://my-ecommerce-server-domr.onrender.com"; 
// 👆 KẾT THÚC SỬA 👆

const ProfilePage = () => {
  const data = useLoaderData();
  const user = data?.user;
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  if (!user) {
    return <p>Không thể tải thông tin người dùng.</p>;
  }

  return (
    <div className={classes.profileContainer}>
      <h2>Chỉnh sửa thông tin</h2>
      <p>Cập nhật họ tên, email, số điện thoại hoặc mật khẩu của bạn.</p>

      {actionData?.message && <p className={classes.success}>{actionData.message}</p>}
      {actionData?.errors && (
        <ul className={classes.errorList}>
          {actionData.errors.map((err, index) => (
            <li key={`${err.path}-${index}`}>{err.msg}</li>
          ))}
        </ul>
      )}

      <Form method="patch" className={classes.form}>
        <div className={classes.formControl}>
          <label htmlFor="fullName">Họ và tên</label>
          <input id="fullName" name="fullName" type="text" defaultValue={user.fullName} required />
        </div>

        <div className={classes.formControl}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" defaultValue={user.email} required />
        </div>

        <div className={classes.formControl}>
          <label htmlFor="phoneNumber">Số điện thoại</label>
          <input id="phoneNumber" name="phoneNumber" type="tel" defaultValue={user.phoneNumber} required />
        </div>

        <hr className={classes.divider} />
        <p className={classes.hint}>Để trống nếu không muốn đổi mật khẩu.</p>

        <div className={classes.formControl}>
          <label htmlFor="currentPassword">Mật khẩu hiện tại</label>
          <input id="currentPassword" name="currentPassword" type="password" />
        </div>

        <div className={classes.formControl}>
          <label htmlFor="newPassword">Mật khẩu mới</label>
          <input id="newPassword" name="newPassword" type="password" placeholder="Tối thiểu 6 ký tự" />
        </div>

        <button type="submit" disabled={isSubmitting} className={classes.submitButton}>
          {isSubmitting ? "Đang cập nhật..." : "Cập nhật thông tin"}
        </button>
      </Form>
    </div>
  );
};

export default ProfilePage;

export const loader = async () => {
  const token = getAuthToken();
  if (!token || token === "TOKEN EXPIRED") {
    return null;
  }
  const response = await fetch(`${BACKEND_URL}/api/auth/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Could not fetch user profile.");
  }
  const data = await response.json();
  return data;
};

// export const action = async ({ request }) => {
//   const token = getAuthToken();
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);

//   const updateData = {
//     fullName: data.fullName,
//     email: data.email,
//     phoneNumber: data.phoneNumber,
//     currentPassword: data.currentPassword,
//     newPassword: data.newPassword,
//   };

//   const response = await fetch(`${BACKEND_URL}/api/auth/profile`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(updateData),
//   });

//   if (response.status === 422 || response.status === 401 || response.status === 409) {
//     return await response.json();
//   }
//   if (!response.ok) {
//     throw new Error("Could not update profile.");
//   }

//   const resData = await response.json();
//   if (resData.userName) {
//     localStorage.setItem("userName", resData.userName);
//   }

//   return { message: resData.message };
// };

// ===== Action =====
export const action = async ({ request }) => {
  const token = getAuthToken();
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const updateData = {
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    currentPassword: data.currentPassword,
    newPassword: data.newPassword,
  };

  const response = await fetch(`${BACKEND_URL}/api/auth/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });

  if (response.status === 422 || response.status === 401 || response.status === 409) {
    return await response.json();
  }
  if (!response.ok) {
    throw new Error("Could not update profile.");
  }

  const resData = await response.json();

  if (resData.userName) {
    localStorage.setItem("userName", resData.userName);
  }

  return { message: resData.message };
};
