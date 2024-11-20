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
      localStorage.setItem("remember_token", response.data.token);
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
    console.error("Lỗi lấy xe theo xe:", error);
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

// Lấy thông tin người dùng
export const getUserProfile = async () => {
  const apiToken = localStorage.getItem("remember_token"); // Lấy api_token từ localStorage
  if (!apiToken) {
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  try {
    const response = await axios.get(`${API_URL}/auth/profile/`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi không hiển thị thông tin người dùng:", error);
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

// Thêm booking admin
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
// Thêm booking user
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
    const response = await axios.post(`${API_URL}/booking/`, bookingData, {
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
// Lấy toàn bộ danh sách booking
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

// Lấy chi tiết booking theo ID
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

// Xóa 1 đơn đặt hàng
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

// Sửa 1 đơn hàng theo ID
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
    // Gửi yêu cầu PUT để cập nhật booking theo ID
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
    console.log("Booking đã được cập nhật thành công:", response.data);
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
    const response = await axios.delete(`${API_URL}/user/${userId}`, {
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
//  NOTE: getbooking
export const getBooking = async () => {
  const apiToken = localStorage.getItem("remember_token");
  if (!apiToken) {
    console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
  }
  try {
    const response = await axios.get(`${API_URL}/booking`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    return response.data;
  } catch (error) {
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
