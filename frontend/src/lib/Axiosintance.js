import axios from "axios";

// Định nghĩa baseURL của API
const API_URL = "https://api.thuexetulai.online/api";
// const API_URL = "http://localhost:8000/api";

const API_URL_IMG = "https://api.thuexetulai.online/imgs/";
const API_URL_LOGO = "https://api.thuexetulai.online/brand_logo/";
const API_URL_IMG_THUMBS = "https://api.thuexetulai.online/Thumbs/";
const API_URL_IMG_LICENSE_DRIVER = "https://api.thuexetulai.online/";
export {
  API_URL_IMG,
  API_URL_IMG_THUMBS,
  API_URL_IMG_LICENSE_DRIVER,
  API_URL_LOGO,
};

//  note: new
export const getUserProfile = async () => {
  const apiToken = localStorage.getItem("remember_token");
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  try {
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${apiToken}`, // Gửi token trong header Authorization
      },
    });
    return response.data;
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi API
  }
};

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
      // Kiểm tra sự tồn tại của token và thông tin người dùng trong response.data
      if (response.data && response.data.token) {
        // Lưu token vào localStorage
        localStorage.setItem("authToken", response.data.token); // Token xác thực
        localStorage.setItem("userRole", response.data.user.role); // Lưu vai trò của người dùng
        localStorage.setItem("remember_token", response.data.token); // Token dùng cho các request sau
        localStorage.setItem("user_id", response.data.user_id); // Lưu user_id (nếu có trong response)

        return response;
      } else {
        throw new Error("Không có dữ liệu token hoặc user_id trong phản hồi.");
      }
    })
    .catch((error) => {
      console.error("Login error: ", error.response.data);
      throw error; // Ném lỗi để xử lý ở nơi gọi API
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
    console.error("Lỗi lấy xe theo xe:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

// Hàm sửa xe
export const updateCar = async (id, formData) => {
  const apiToken = localStorage.getItem("authToken");
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  try {
    const response = await axios.post(
      `${API_URL}/admin/carupdate/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating car:", error);
    throw error;
  }
};

//Lấy toàn bộ feddbackadmin
export const getAllFeedbacks = async () => {
  const apiToken = localStorage.getItem("authToken"); // Lấy api_token từ localStorage
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  try {
    const response = await axios.get(`${API_URL}/admin/feedback`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    // Kiểm tra dữ liệu trả về từ API
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data; // Trả về mảng dữ liệu từ data
    } else {
      console.error("Dữ liệu phản hồi không phải mảng:", response.data);
      return []; // Trả về mảng rỗng nếu không phải mảng hợp lệ
    }
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    throw error;
  }
};
// API tạo mới một feedback
export const addFeedback = async (feedbackData) => {
  const apiToken = localStorage.getItem("authToken");
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  try {
    const response = await axios.post(
      `${API_URL}/admin/feedback`,
      feedbackData,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding feedback:", error);
    throw error;
  }
};

// API lấy chi tiết feedback theo ID
export const getFeedbackById = async (id) => {
  const apiToken = localStorage.getItem("authToken"); // Lấy api_token từ localStorage
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  try {
    const response = await axios.get(`${API_URL}/admin/feedback/${id}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching feedback by ID:", error);
    throw error;
  }
};

// API cập nhật một feedback theo ID
export const updateFeedback = async (id, feedbackData) => {
  const apiToken = localStorage.getItem("authToken");
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  try {
    const response = await axios.put(
      `${API_URL}/admin/feedback/${id}`,
      feedbackData,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating feedback:", error);
    throw error;
  }
};

// API xóa một feedback theo ID
export const deleteFeedbackById = async (id) => {
  const apiToken = localStorage.getItem("authToken"); // Lấy api_token từ localStorage
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  try {
    const response = await axios.delete(`${API_URL}/admin/feedback/${id}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting feedback:", error);
    throw error;
  }
};

// Cập nhật thông tin người dùng
export const updateUserProfile = async (updatedData) => {
  const apiToken = localStorage.getItem("remember_token"); // Lấy api_token từ localStorage
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  try {
    const response = await axios.put(
      `${API_URL}/auth/update-profile`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // Dữ liệu trả về từ server
  } catch (error) {
    console.error(
      "Lỗi khi cập nhật thông tin người dùng:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Đăng xuất
export const logout = async () => {
  const authToken = localStorage.getItem("authToken"); // Lấy token phiên đăng nhập
  if (!authToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  try {
    const response = await axios.post(
      `${API_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Gửi token trong header Authorization
        },
      }
    );
    // Xử lý kết quả logout nếu cần
    localStorage.removeItem("authToken"); // Xóa token khỏi localStorage sau khi đăng xuất
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

//////////////////////////////    BOOKING ADMIN              //////////////////////////////

// Thêm booking bởi admin
export const addBooking = async (bookingData) => {
  // Lấy token từ localStorage
  const apiToken = localStorage.getItem("authToken");
  // Kiểm tra nếu không có token
  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  // Kiểm tra URL API (để chắc chắn rằng API_URL được cấu hình đúng)
  if (!API_URL) {
    console.error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
    throw new Error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
  }

  try {
    // Gửi yêu cầu POST đến API để thêm booking
    const response = await axios.post(
      `${API_URL}/admin/booking/`,
      bookingData,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`, // Gửi token trong header Authorization
        },
      }
    );

    // Nếu thành công, trả về dữ liệu phản hồi từ API
    return response.data;
  } catch (error) {
    // Kiểm tra lỗi từ API response
    if (error.response) {
      // Khi có phản hồi từ server (ví dụ: lỗi 401, 403)
      console.error("API Error:", error.response.data);
      console.error("API Error Status:", error.response.status);

      // Nếu là lỗi 401, có thể là do token không hợp lệ
      if (error.response.status === 401) {
        console.error(
          "Lỗi 401: Unauthorized - Token không hợp lệ hoặc hết hạn."
        );
      }

      // Có thể thêm các xử lý khác cho các lỗi khác (400, 404, v.v.)
    } else if (error.request) {
      // Khi không có phản hồi nào từ server (ví dụ: vấn đề với kết nối mạng)
      console.error("Không có phản hồi từ server:", error.request);
    } else {
      // Lỗi khác (ví dụ: cấu hình request sai)
      console.error("Lỗi khi thiết lập yêu cầu:", error.message);
    }

    // Ném lỗi ra ngoài để có thể xử lý ở nơi gọi hàm này
    throw error;
  }
};

// Lấy toàn bộ danh sách booking bởi admin
export const getAllBookings = async () => {
  const apiToken = localStorage.getItem("authToken"); // Lấy token từ localStorage

  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  if (!API_URL) {
    console.error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
    throw new Error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
  }

  try {
    const response = await axios.get(`${API_URL}/admin/booking`, {
      headers: {
        Authorization: `Bearer ${apiToken}`, // Gửi token trong header Authorization
      },
    });
    return response.data; // Trả về dữ liệu phản hồi từ API
  } catch (error) {
    console.error("Lỗi khi lấy danh sách booking:", error);
    throw error;
  }
};

// Lấy chi tiết booking theo ID bởi admin
export const getBookingById = async (id) => {
  const apiToken = localStorage.getItem("authToken"); // Lấy token từ localStorage

  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  if (!API_URL) {
    console.error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
    throw new Error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
  }

  try {
    const response = await axios.get(`${API_URL}/admin/booking/${id}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    console.log("API response:", response); // Log để xem toàn bộ response từ API
    return response.data; // Kiểm tra xem data có chứa chi tiết booking không
  } catch (error) {
    console.error(
      "Lỗi khi lấy chi tiết booking:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Xóa 1 đơn đặt hàng bởi admin
export const deleteBookingById = async (id) => {
  const apiToken = localStorage.getItem("authToken"); // Lấy token từ localStorage

  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  if (!API_URL) {
    console.error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
    throw new Error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
  }

  try {
    // Gửi yêu cầu DELETE để xóa booking theo ID
    const response = await axios.delete(`${API_URL}/admin/booking/${id}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`, // Gửi token trong header Authorization
      },
    });

    // Nếu thành công, trả về dữ liệu phản hồi từ API
    console.log("Booking đã được xóa thành công:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa booking:", error);

    // Kiểm tra lỗi từ API response
    if (error.response) {
      console.error("API Error:", error.response.data);
      console.error("API Error Status:", error.response.status);
    } else if (error.request) {
      console.error("Không có phản hồi từ server:", error.request);
    } else {
      console.error("Lỗi khi thiết lập yêu cầu:", error.message);
    }

    throw error; // Ném lỗi ra ngoài để có thể xử lý ở nơi gọi hàm này
  }
};

// Sửa trạng thái của 1 booking ID Admin
export const updateBooking = async (id, updatedBookingData) => {
  const apiToken = localStorage.getItem("authToken"); // Lấy token từ localStorage

  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  if (!API_URL) {
    console.error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
    throw new Error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
  }

  try {
    // Gửi yêu cầu PUT để cập nhật booking theo ID
    const response = await axios.put(
      `${API_URL}/admin/booking/${id}`,
      updatedBookingData,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`, // Gửi token trong header Authorization
        },
      }
    );

    // Nếu thành công, trả về dữ liệu phản hồi từ API
    console.log("Booking đã được cập nhật thành công:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật booking:", error);

    // Kiểm tra lỗi từ API response
    if (error.response) {
      console.error("API Error:", error.response.data);
      console.error("API Error Status:", error.response.status);
    } else if (error.request) {
      console.error("Không có phản hồi từ server:", error.request);
    } else {
      console.error("Lỗi khi thiết lập yêu cầu:", error.message);
    }

    throw error; // Ném lỗi ra ngoài để có thể xử lý ở nơi gọi hàm này
  }
};

// Hủy 1 booking bởi Admin
export const cancelBookingByAdmin = async (
  id,
  { cancel_reason, cancel_note }
) => {
  const apiToken = localStorage.getItem("authToken"); // Lấy token từ localStorage

  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  if (!API_URL) {
    console.error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
    throw new Error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
  }

  try {
    // Gửi yêu cầu PUT để hủy booking
    const response = await axios.put(
      `${API_URL}/admin/booking/${id}/cancel_by_admin`,
      { cancel_reason, cancel_note }, // Gửi lý do và ghi chú hủy
      {
        headers: {
          Authorization: `Bearer ${apiToken}`, // Gửi token trong header Authorization
        },
      }
    );

    // Trả về dữ liệu phản hồi từ API
    console.log("Booking đã bị hủy bởi Admin:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi hủy booking:", error);

    if (error.response) {
      console.error("API Error:", error.response.data);
      console.error("API Error Status:", error.response.status);
    } else if (error.request) {
      console.error("Không có phản hồi từ server:", error.request);
    } else {
      console.error("Lỗi khi thiết lập yêu cầu:", error.message);
    }

    throw error; // Ném lỗi ra ngoài để xử lý nơi khác
  }
};

// API lấy danh sách user
export const getAllUsers = async () => {
  const apiToken = localStorage.getItem("authToken"); // Lấy token từ localStorage

  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  if (!API_URL) {
    console.error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
    throw new Error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
  }

  try {
    const response = await axios.get(`${API_URL}/admin/user`, {
      headers: {
        Authorization: `Bearer ${apiToken}`, // Gửi token trong header Authorization
      },
    });
    return response.data; // Trả về dữ liệu phản hồi từ API
  } catch (error) {
    console.error("Lỗi khi lấy danh sách booking:", error);
    throw error;
  }
};

// API tạo mới một user
export const addUser = async (userData) => {
  // Lấy token từ localStorage
  const apiToken = localStorage.getItem("authToken");

  // Kiểm tra nếu không có token
  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  // Kiểm tra URL API (để chắc chắn rằng API_URL được cấu hình đúng)
  if (!API_URL) {
    console.error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
    throw new Error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
  }

  try {
    // Gửi yêu cầu POST đến API để thêm user
    const response = await axios.post(`${API_URL}/admin/user/`, userData, {
      headers: {
        Authorization: `Bearer ${apiToken}`, // Gửi token trong header Authorization
      },
    });

    // Nếu thành công, trả về dữ liệu phản hồi từ API
    return response.data;
  } catch (error) {
    // Kiểm tra lỗi từ API response
    if (error.response) {
      // Khi có phản hồi từ server (ví dụ: lỗi 401, 403)
      console.error("API Error:", error.response.data);
      console.error("API Error Status:", error.response.status);

      // Nếu là lỗi 401, có thể là do token không hợp lệ
      if (error.response.status === 401) {
        console.error(
          "Lỗi 401: Unauthorized - Token không hợp lệ hoặc hết hạn."
        );
      }

      // Có thể thêm các xử lý khác cho các lỗi khác (400, 404, v.v.)
    } else if (error.request) {
      // Khi không có phản hồi nào từ server (ví dụ: vấn đề với kết nối mạng)
      console.error("Không có phản hồi từ server:", error.request);
    } else {
      // Lỗi khác (ví dụ: cấu hình request sai)
      console.error("Lỗi khi thiết lập yêu cầu:", error.message);
    }

    // Ném lỗi ra ngoài để có thể xử lý ở nơi gọi hàm này
    throw error;
  }
};
// API lấy chi tiết một user
export const getUserById = async (id) => {
  const apiToken = localStorage.getItem("authToken"); // Lấy token từ localStorage

  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  if (!API_URL) {
    console.error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
    throw new Error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
  }

  try {
    const response = await axios.get(`${API_URL}/admin/user/${id}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    console.log("API response:", response); // Log để xem toàn bộ response từ API
    return response.data; // Kiểm tra xem data có chứa chi tiết booking không
  } catch (error) {
    console.error(
      "Lỗi khi lấy chi tiết user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// API cập nhật một user
export const updateUser = async (id, updatedUserData) => {
  const apiToken = localStorage.getItem("authToken"); // Lấy token từ localStorage

  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  if (!API_URL) {
    console.error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
    throw new Error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
  }

  try {
    // Gửi yêu cầu PUT để cập nhật người dùng theo ID
    const response = await axios.put(
      `${API_URL}/admin/user/${id}`,
      updatedUserData,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`, // Gửi token trong header Authorization
        },
      }
    );

    // Nếu thành công, trả về dữ liệu phản hồi từ API
    console.log("Người dùng đã được cập nhật thành công:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật user:", error);

    // Kiểm tra lỗi từ API response
    if (error.response) {
      console.error("API Error:", error.response.data);
      console.error("API Error Status:", error.response.status);
    } else if (error.request) {
      console.error("Không có phản hồi từ server:", error.request);
    } else {
      console.error("Lỗi khi thiết lập yêu cầu:", error.message);
    }

    throw error; // Ném lỗi ra ngoài để có thể xử lý ở nơi gọi hàm này
  }
};



// API xóa một user
export const deleteUser = async (userId) => {
  const apiToken = localStorage.getItem("authToken");
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  try {
    const response = await axios.delete(`${API_URL}/admin/${userId}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Lấy tất cả yêu thích
export const getAllFavorites = async () => {
  const apiToken = localStorage.getItem("authToken");

  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  try {
    const response = await axios.get(`${API_URL}/admin/favorite`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách yêu thích:", error);
    throw error;
  }
};

// Xóa yêu thích theo ID
export const deleteFavoriteById = async (favoriteId, apiToken) => {
  try {
    const response = await axios.delete(
      `${API_URL}/admin/favorite/${favoriteId}`,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa yêu thích với ID ${favoriteId}:`, error);
    throw error;
  }
};

// Tạo yêu thích mới
export const addFavorite = async (userId, carId) => {
  const apiToken = localStorage.getItem("authToken");

  try {
    const response = await axios.post(
      `${API_URL}/admin/favorite`,
      { user_id: userId, car_id: carId }, // Gửi thông tin userId và carId
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Lỗi khi thêm yêu thích cho userId ${userId} và carId ${carId}:`,
      error
    );
    throw error;
  }
};

// Cập nhật yêu thích
export const updateFavorite = async (userId, carId, favoriteData) => {
  const apiToken = localStorage.getItem("authToken");

  try {
    const response = await axios.put(
      `${API_URL}/admin/favorite/${userId}/${carId}`,
      favoriteData,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );
    return response.data.data.favorite;
  } catch (error) {
    console.error(
      `Lỗi khi cập nhật yêu thích cho userId ${userId} và carId ${carId}:`,
      error
    );
    throw error;
  }
};

// Lấy chi tiết favorite
export const getFavoriteDetails = async (userId, carId) => {
  const apiToken = localStorage.getItem("authToken");
  try {
    const response = await axios.get(
      `${API_URL}/admin/favorite/${userId}/${carId}`,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );
    return response.data.data.favorite; // Trả về dữ liệu favorite
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết favorite:", error);
    throw error;
  }
};

// user_favorite
export const getFavoriteUser = async () => {
  const apiToken = localStorage.getItem("remember_token");
  console.log(apiToken);
  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  try {
    const response = await axios.get(`${API_URL}/favorite`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách yêu thích:", error);
    throw error;
  }
};

// Hàm xóa một mục yêu thích
export const deleteFavorite = async (id) => {
  const apiToken = localStorage.getItem("remember_token");
  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  try {
    const response = await axios.delete(`${API_URL}/favorite/${id}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    console.log("Xóa yêu thích thành công:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Lỗi khi xóa yêu thích:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Hàm tạo 1 feedback người dùng
export const addFeedbackCarUser = async (carId, feedbackData) => {
  const apiToken = localStorage.getItem("remember_token");

  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  try {
    const response = await axios.post(
      `${API_URL}/feedback/${carId}`, // Giả sử API này là cho feedback
      { ...feedbackData }, // Dữ liệu feedback bao gồm content và rating
      {
        headers: {
          Authorization: `Bearer ${apiToken}`, // Thêm token vào header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gửi feedback:", error);
    throw error;
  }
};

export const addToFavorites = async (carId) => {
  const apiToken = localStorage.getItem("remember_token");
  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  try {
    // Gọi API với ID xe để thêm vào yêu thích
    const response = await axios.post(
      `${API_URL}/favorite/${carId}`, // Đảm bảo sử dụng đường dẫn đúng
      {}, // Dữ liệu trống vì chúng ta chỉ truyền ID xe qua URL
      {
        headers: {
          Authorization: `Bearer ${apiToken}`, // Thêm token vào header
        },
      }
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Lỗi khi thêm vào danh sách yêu thích:", error);
    throw error;
  }
};

export const getFeedbackByCarId = async (carId) => {
  const apiToken = localStorage.getItem("remember_token");

  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  try {
    // Gọi API để lấy danh sách feedback của xe với carId
    const response = await axios.get(
      `${API_URL}/feedback/car/${carId}`, // Đảm bảo đường dẫn API chính xác
      {
        headers: {
          Authorization: `Bearer ${apiToken}`, // Thêm token vào header
        },
      }
    );

    // Kiểm tra nếu dữ liệu trả về là một mảng hợp lệ
    if (Array.isArray(response.data)) {
      return response.data; // Trả về danh sách feedback
    } else {
      console.error("Dữ liệu trả về không phải là mảng.");
      return []; // Trả về mảng rỗng nếu dữ liệu không hợp lệ
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách feedback:", error);
    throw new Error("Không thể lấy feedback từ API.");
  }
};

////////////////////////////// BOOKING NGƯỜI DÙNG //////////////////////////

//Lấy toàn bộ booking bởi người dùng
export const getBooking = async () => {
  // Lấy token từ localStorage
  const apiToken = localStorage.getItem("remember_token");
  // Kiểm tra nếu không có token
  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  try {
    // Gửi yêu cầu POST đến API để thêm booking
    const response = await axios.get(`${API_URL}/booking`, {
      headers: {
        Authorization: `Bearer ${apiToken}`, // Gửi token trong header Authorization
      },
    });
    // Nếu thành công, trả về dữ liệu phản hồi từ API
    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

// Lấy 1 booking theo id bởi người dùng
export const getBookingId = async () => {
  const storedBookingId = localStorage.getItem("booking_id");
  if (!storedBookingId) {
    console.error("Không có booking_id hợp lệ");
    return;
  }
  // Lấy token từ localStorage
  const apiToken = localStorage.getItem("remember_token");
  // Kiểm tra nếu không có token
  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  try {
    // Gửi yêu cầu POST đến API để thêm booking
    const response = await axios.get(`${API_URL}/booking/${storedBookingId}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`, // Gửi token trong header Authorization
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

// Thêm booking bởi user
export const addBookingUser = async (bookingData) => {
  // Lấy token từ localStorage
  const apiToken = localStorage.getItem("remember_token");
  console.log(apiToken);
  // Kiểm tra nếu không có token
  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  // Kiểm tra URL API (để chắc chắn rằng API_URL được cấu hình đúng)
  if (!API_URL) {
    console.error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
    throw new Error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
  }

  try {
    // Gửi yêu cầu POST đến API để thêm booking
    const response = await axios.post(`${API_URL}/booking`, bookingData, {
      headers: {
        Authorization: `Bearer ${apiToken}`, // Gửi token trong header Authorization
      },
    });

    // Nếu thành công, trả về dữ liệu phản hồi từ API
    return response.data;
  } catch (error) {
    // Kiểm tra lỗi từ API response
    if (error) {
      // Khi có phản hồi từ server (ví dụ: lỗi 401, 403)
      console.error("API Error:", error.response.data);
      console.error("API Error Status:", error.response.status);
      // Nếu là lỗi 401, có thể là do token không hợp lệ
      if (error.response.status === 401) {
        console.error(
          "Lỗi 401: Unauthorized - Token không hợp lệ hoặc hết hạn."
        );
      }
      // Có thể thêm các xử lý khác cho các lỗi khác (400, 404, v.v.)
    } else if (error.request) {
      // Khi không có phản hồi nào từ server (ví dụ: vấn đề với kết nối mạng)
      console.error("Không có phản hồi từ server:", error.request);
    } else {
      // Lỗi khác (ví dụ: cấu hình request sai)
      console.error("Lỗi khi thiết lập yêu cầu:", error.message);
    }

    // Ném lỗi ra ngoài để có thể xử lý ở nơi gọi hàm này
    throw error;
  }
};

// Sửa 1 booking bởi user
export const updateBookingByUser = async (id, updatedData) => {
  // Lấy token từ localStorage
  const apiToken = localStorage.getItem("remember_token");

  // Kiểm tra nếu không có token
  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  try {
    // Gửi yêu cầu PUT đến API để cập nhật booking theo ID
    const response = await axios.put(`${API_URL}/booking/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${apiToken}`, // Gửi token trong header Authorization
      },
    });

    // Nếu thành công, trả về dữ liệu phản hồi từ API
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const cancelUserBooking = async (id, cancelReason = "") => {
  const apiToken = localStorage.getItem("remember_token");
  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  if (!id) {
    console.error("ID của booking không hợp lệ:", id);
    throw new Error("ID của booking không hợp lệ.");
  }

  console.log("ID của booking:", id); // Kiểm tra ID trước khi gọi API

  try {
    const response = await axios.put(
      `${API_URL}/booking/${id}/cancel_by_user`,
      { cancel_reason: cancelReason }, // Gửi lý do hủy nếu có
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );
    console.log("Booking đã được hủy thành công:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi hủy booking:", error);
    if (error.response) {
      console.error("API Error:", error.response.data);
    }
    throw error;
  }
};

// NOTE: HOÀN THÀNH THANH TOÁN
export const payment = async (booking_id) => {
  const apiToken = localStorage.getItem("authToken");
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  try {
    const response = await axios.post(
      `${API_URL}/vnpay/createpayment/${booking_id}`,
      {},
      { headers: { Authorization: `Bearer ${apiToken}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

// --------------------------------------- GIẤY PHÉP LÁI XE -----------------------------------------
// Lấy danh sách giấy phép lái xe
// Lấy danh sách giấy phép lái xe
export const getAllDriverLicenses = async (licenseStatus = "") => {
  const apiToken = localStorage.getItem("authToken");

  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  try {
    const response = await axios.get(`${API_URL}/admin/driverlicense`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      params: { license_status: licenseStatus }, // Truyền tham số lọc
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách giấy phép lái xe:", error);
    throw error;
  }
};

// Tạo mới giấy phép lái xe
export const createDriverLicense = async (data) => {
  const apiToken = localStorage.getItem("authToken");

  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  try {
    const response = await axios.post(`${API_URL}/admin/driverlicense`, data, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo giấy phép lái xe:", error);
    throw error;
  }
};

// Lấy thông tin giấy phép lái xe theo ID
export const getDriverLicenseById = async (id) => {
  const apiToken = localStorage.getItem("authToken");

  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  try {
    const response = await axios.get(`${API_URL}/admin/driverlicense/${id}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    console.log(response.data); // Kiểm tra dữ liệu trả về từ API
    return response.data; // Đảm bảo rằng bạn trả về dữ liệu chính xác
  } catch (error) {
    console.error("Lỗi khi lấy giấy phép lái xe:", error);
    throw error;
  }
};

// Cập nhật giấy phép lái xe theo ID
export const updateDriverLicense = async (id, payload) => {
  const apiToken = localStorage.getItem("authToken");

  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  try {
    const response = await axios.put(
      `${API_URL}/admin/driverlicense/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json", // Đảm bảo định dạng JSON
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
};

// Xóa giấy phép lái xe theo ID
export const deleteDriverLicenseById = async (id) => {
  const apiToken = localStorage.getItem("authToken");

  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  try {
    const response = await axios.delete(`${API_URL}/driverlicense/${id}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa giấy phép lái xe:", error);
    throw error;
  }
};

////////////////////// VOUCHER ADMIN /////////////////////////

// Hàm lấy tất cả voucher
export const getAllVouchers = async () => {
  const apiToken = localStorage.getItem("authToken"); // Lấy token từ localStorage

  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  if (!API_URL) {
    console.error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
    throw new Error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
  }

  try {
    const response = await axios.get(`${API_URL}/admin/voucher`, {
      headers: {
        Authorization: `Bearer ${apiToken}`, // Gửi token trong header Authorization
      },
    });
    return response.data; // Trả về dữ liệu phản hồi từ API
  } catch (error) {
    console.error("Lỗi khi lấy danh sách voucher:", error);
    throw error;
  }
};

// Hàm thêm 1 voucher
export const addVoucher = async (voucherData) => {
  const apiToken = localStorage.getItem("authToken"); // Lấy token từ localStorage

  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  if (!API_URL) {
    console.error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
    throw new Error("Không tìm thấy API_URL. Vui lòng kiểm tra lại cấu hình.");
  }

  try {
    const response = await axios.post(`${API_URL}/admin/voucher`, voucherData, {
      headers: {
        Authorization: `Bearer ${apiToken}`, // Gửi token trong header Authorization
      },
    });
    return response.data; // Trả về dữ liệu phản hồi từ API
  } catch (error) {
    console.error("Lỗi khi thêm voucher:", error);
    throw error;
  }
};

// Hàm xóa 1 voucher theo id
export const deleteVoucherById = async (voucherId, apiToken) => {
  try {
    await axios.delete(`${API_URL}/admin/voucher/${voucherId}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`, // Gửi token trong header Authorization
      },
    });
  } catch (error) {
    console.error("Lỗi khi xóa voucher:", error);
    throw error;
  }
};

// --------------------------- GIẤY PHÉP LÁI XE NGƯỜI DÙNG -----------------------
// LẤY GIẤY PHÉP LÁI XE THEO ID NGƯỜI DÙNG
export const getDriverLicenseByUserId = async (id) => {
  // Lấy remember_token từ localStorage
  const apiToken = localStorage.getItem("remember_token");

  // Kiểm tra xem token có tồn tại trong localStorage không
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  try {
    // Gửi request tới API với token trong headers
    const response = await axios.get(`${API_URL}/driverlicense/${id}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`, // Gửi token trong header
      },
    });

    // Kiểm tra dữ liệu trả về
    if (response.data && response.data.driver_licenses) {
      console.log(response.data.driver_licenses); // Log để kiểm tra dữ liệu
      return response.data; // Trả về dữ liệu giấy phép lái xe nếu có
    } else {
      throw new Error("Không tìm thấy giấy phép lái xe.");
    }
  } catch (error) {
    console.error("Lỗi khi lấy thông tin giấy phép theo user_id:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi API
  }
};

// NOTE: getgplx user
export const getDriverLicense = async () => {
  // Lấy remember_token từ localStorage
  const apiToken = localStorage.getItem("remember_token");
  // Kiểm tra xem token có tồn tại trong localStorage không
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  try {
    // Gửi request tới API với token trong headers
    const response = await axios.get(`${API_URL}/driverlicense`, {
      headers: {
        Authorization: `Bearer ${apiToken}`, // Gửi token trong header
      },
    });
    return response.data;
  } catch (error) {
    error("lỗi nè", error);
    throw error;
  }
};

// NOTE: add giấy phép lái xe user
export const addDriverLicense = async (licenseData) => {
  // Lấy remember_token từ localStorage
  const apiToken = localStorage.getItem("remember_token");
  // Kiểm tra xem token có tồn tại trong localStorage không
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  try {
    // Gửi request tới API với token trong headers
    const response = await axios.post(`${API_URL}/driverlicense`, licenseData, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data) {
      console.log("thêm thành công");
      return { message: "Thêm thành công", data: response.data };
    }
  } catch (error) {
    console.error(
      "Lỗi trong khi gửi yêu cầu:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// NOTE: editGPLX user
export const editDriverLicense = async (licenseId, data) => {
  // Lấy remember_token từ localStorage
  const apiToken = localStorage.getItem("remember_token");

  // Kiểm tra xem token có tồn tại trong localStorage không
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }

  try {
    // Thêm _method: "PUT" vào data (FormData)
    data.append("_method", "PUT");

    // Gửi request với POST và giả lập PUT
    const response = await axios.post(
      `${API_URL}/driverlicense/${licenseId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "multipart/form-data", // Bắt buộc khi gửi FormData
        },
      }
    );

    // Xử lý phản hồi
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    // Log lỗi chi tiết
    console.error("Lỗi nè", error.response?.data || error.message);
    throw error;
  }
};

// note: voucher
export const getvoucher = async () => {
  // Lấy remember_token từ localStorage
  const apiToken = localStorage.getItem("remember_token");

  // Kiểm tra xem token có tồn tại trong localStorage không
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  try {
    // Gửi request tới API với token trong headers
    const response = await axios.get(`${API_URL}/voucher/apply-voucher`, {
      headers: {
        Authorization: `Bearer ${apiToken}`, // Gửi token trong header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấ voucher:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi API
  }
};

// LẤY TOÀN BỘ THƯƠNG HIỆU XE
export const getAllCarBrands = async () => {
  const apiToken = localStorage.getItem("remember_token"); // Lấy api_token từ localStorage
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  try {
    const response = await axios.get(`${API_URL}/brand`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching car brands:", error);
    throw error;
  }
};

// note: get brand car

export const getBrandCar = async () => {
  const apiToken = localStorage.getItem("authToken"); // Lấy api_token từ localStorage
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  try {
    const response = await axios.get(`${API_URL}/admin/car-brands`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    console.log(response);

    return response;
  } catch (error) {
    console.error("Error fetching car brands:", error);
    throw error;
  }
};

// note: tìm kiếm
export const searchCars = async (
  startDate,
  endDate,
  seats,
  transmission_type
) => {
  try {
    const params = {
      start_date: startDate.format("YYYY-MM-DD"),
      end_date: endDate.format("YYYY-MM-DD"),
    };
    if (seats) {
      params.seats = seats;
    }
    if (transmission_type) {
      params.transmission_type = transmission_type;
    }

    const response = await axios.get(`${API_URL}/cars`, {
      params,
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data);

    return response.data; // Trả về dữ liệu kết quả từ API
  } catch (error) {
    console.error("Error while searching for cars:", error);
    throw error; // Ném lỗi ra để xử lý phía ngoài
  }
};

// note: postmail forgetpasswprd
export const resetPassword = async (email) => {
  const apiToken = localStorage.getItem("remember_token");
  // Kiểm tra xem token có tồn tại trong localStorage không
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  try {
    const data = {
      token: apiToken,
      email: email,
    };
    const response = await axios.post(`${API_URL}/forgot-password`, data, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Password reset successful:", response.data);
    return response.data; // Trả về kết quả từ API
  } catch (error) {
    console.error("Error while resetting password:", error);
    throw error; // Ném lỗi ra để xử lý phía ngoài
  }
};
// note: postmail forgetpasswprd
export const resetPassword2 = async (email, newPassword, confirmPassword) => {
  const apiToken = localStorage.getItem("remember_token");
  // Kiểm tra xem token có tồn tại trong localStorage không
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  try {
    const data = {
      token: apiToken,
      email: email,
      password: newPassword,
      password_confirmation: confirmPassword,
    };
    const response = await axios.post(`${API_URL}/reset-password`, data, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Password reset successful:", response.data);
    return response.data; // Trả về kết quả từ API
  } catch (error) {
    console.error("Error while resetting password:", error);
    throw error; // Ném lỗi ra để xử lý phía ngoài
  }
};

// --------------------------- GỬI MAIL LIÊN LẠC NGƯỜI DÙNG ----------------------

export const sendContactMail = (data) => {
  return axios
    .post(`${API_URL}/mail/contact`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response ? error.response.data : error.message;
    });
};
