import axios from "axios";

// Định nghĩa baseURL của API
const API_URL = "http://localhost:8000/api";

// Lấy tất cả sản phẩm (sp)
export const getAllCars = () => {
  return axios.get(`${API_URL}/cars`);
};

// Lấy chi tiết sản phẩm theo ID (sp/{id})
export const getCarDetails = (id) => {
  return axios.get(`${API_URL}/cars/${id}`);
};

// // Lấy ảnh con theo car_id
export const getCarImagesByCarId = (carId) => {
  return axios.get(`${API_URL}/car-images/car/${carId}`);
};

// Đăng nhập
export const login = (email, password) => {
  return axios
    .post(`${API_URL}/auth/login`, { login: email, password })
    .then((response) => {
      console.log("Login response from API:", response);
      // Lưu token vào localStorage
      localStorage.setItem("authToken", response.data.token); // Đảm bảo tên key là 'authToken'
      localStorage.setItem("userRole", response.data.user.role); // Lưu vai trò của người dùng
      return response;
    })
    .catch((error) => {
      console.error("Login error: ", error);
      throw error;
    });
};

// Đăng ký
export const register = (userData) => {
  return axios
    .post(`${API_URL}/auth/register`, userData)
    .then((response) => {
      console.log("Register response from API:", response);
      return response;
    })
    .catch((error) => {
      console.error("Register error: ", error.response.data);
      throw error.response.data;
    });
};

// Xóa xe dùng theo id
export const deleteCarById = async (id) => {
  const apiToken = localStorage.getItem("authToken"); // Lấy api_token từ localStorage
  try {
    const response = await axios.delete(`${API_URL}/admin/car/${id}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`, // Thêm api_token vào header
      },
    });
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    console.error("Error deleting car:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

// Hàm thêm sản phẩm xe
export const addCar = async (carData) => {
  const apiToken = localStorage.getItem("authToken");
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  try {
    const response = await axios.post(`${API_URL}/admin/car/`, carData, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding car:", error);
    throw error;
  }
};

export const getCarById = async (id) => {
  const apiToken = localStorage.getItem("authToken"); // Lấy api_token từ localStorage
  try {
    const response = await axios.get(`${API_URL}/admin/car/${id}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`, // Thêm api_token vào header
      },
    });
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    console.error("Error deleting car:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

// Hàm sửa xe
export const updateCar = async (id, carData) => {
  const apiToken = localStorage.getItem("authToken");
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  try {
    const response = await axios.put(`${API_URL}/admin/car/${id}`, carData, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating car:", error);
    throw error;
  }
};

// Lấy loại xe theo ID (loai/{id})
// export const getKindOfCar = (id) => {
//   return axios.get(`${API_URL}/loai/${id}`);
// };

// // Lấy danh sách xe yêu thích (carfavorite)
// export const getFavoriteCars = () => {
//   return axios.get(`${API_URL}/carfavorite`);
// };

// // Thêm xe vào danh sách yêu thích (carfavorite - POST)
// export const addCarToFavorites = (carData) => {
//   return axios.post(`${API_URL}/carfavorite`, carData);
// };

// // Lấy feedback của xe (carfeedback/{car_id})
// export const getCarFeedback = (car_id) => {
//   return axios.get(`${API_URL}/carfeedback/${car_id}`);
// };
