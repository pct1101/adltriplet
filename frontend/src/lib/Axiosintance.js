import axios from "axios";


// Định nghĩa baseURL của API
const API_URL = 'http://localhost:8000/api';

// Lấy tất cả sản phẩm (sp)
export const getAllCars = () => {
  return axios.get(`${API_URL}/sp`);
};

// Lấy chi tiết sản phẩm theo ID (sp/{id})
export const getCarDetails = (id) => {
  return axios.get(`${API_URL}/sp/${id}`);
};

// Lấy loại xe theo ID (loai/{id})
export const getKindOfCar = (id) => {
  return axios.get(`${API_URL}/loai/${id}`);
};

// Lấy danh sách xe yêu thích (carfavorite)
export const getFavoriteCars = () => {
  return axios.get(`${API_URL}/carfavorite`);
};

// Thêm xe vào danh sách yêu thích (carfavorite - POST)
export const addCarToFavorites = (carData) => {
  return axios.post(`${API_URL}/carfavorite`, carData);
};

// Lấy feedback của xe (carfeedback/{car_id})
export const getCarFeedback = (car_id) => {
  return axios.get(`${API_URL}/carfeedback/${car_id}`);
};
