import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addCar, getCarById } from "../../../lib/Axiosintance";
import Side_bar from "../component/side_bar";
import Header from "../component/header";
import Footer from "../component/footer";

const AddCar = () => {
  const [carName, setCarName] = useState("");
  const [seats, setSeats] = useState("");
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [carStatus, setCarStatus] = useState(1);
  const [mileage, setMileage] = useState("");
  const [carImage, setCarImage] = useState(null); // Thay đổi carImage thành null
  const [carDescription, setCarDescription] = useState("");
  const [carId, setCarId] = useState(null);
  const [brandId, setBrandId] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    checkUserRole();
    if (id) {
      fetchCarData(id);
    }
  }, [id]);

  const checkUserRole = () => {
    const role = localStorage.getItem("userRole");
    const apiToken = localStorage.getItem("authToken");

    console.log("User Role from localStorage:", role);
    console.log("API Token from localStorage:", apiToken);

    if (!role || role !== "admin") {
      setIsAdmin(false);
      alert("Bạn không có quyền truy cập trang này!");
      navigate("/");
    } else {
      setIsAdmin(true);
    }
  };

  const fetchCarData = async (carId) => {
    try {
      const response = await getCarById(carId);
      const car = response.data;
      setCarId(car.car_id);
      setCarName(car.car_name);
      setSeats(car.seats);
      setModel(car.model);
      setLicensePlate(car.license_plate);
      setRentalPrice(car.rental_price);
      setCarStatus(car.car_status);
      setMileage(car.mileage);
      setCarImage(car.car_image);
      setCarDescription(car.car_description);
      setBrandId(car.brandid);
    } catch (error) {
      console.error("Error fetching car data:", error.message);
    }
  };

  const handleFileChange = (e) => {
    setCarImage(e.target.files[0]); // Cập nhật carImage thành file ảnh
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    const files = e.target.files;

    if (files && files.length > 0) {
      // Kiểm tra nếu có file nào được chọn
      const file = files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        console.log(base64String); // Dùng base64 này để lưu hoặc gửi lên server
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Không có file nào được chọn");
    }

    const carData = new FormData(); // Sử dụng FormData để gửi file và dữ liệu khác
    carData.append("car_name", carName);
    carData.append("seats", Number(seats));
    carData.append("model", model);
    carData.append("license_plate", licensePlate);
    carData.append("rental_price", Number(rentalPrice));
    carData.append("car_status", Number(carStatus));
    carData.append("mileage", Number(mileage));
    carData.append("car_image", carImage); // Thêm file ảnh vào FormData
    carData.append("car_description", carDescription);
    carData.append("brandid", Number(brandId));

    try {
      if (carId) {
        await addCar(carId, carData);
      } else {
        await addCar(carData);
      }
      navigate("/admin");
    } catch (error) {
      console.error("Error while adding/updating car:", error.response.data);
    }
  };

  return (
    <div>
      <Side_bar></Side_bar>
      <div className="container mb-4">
        <Header></Header>
        <h2>{carId ? "Cập Nhật Xe" : "Thêm Sản Phẩm Mới"}</h2>
        {isAdmin ? (
          <form onSubmit={handleAddCar} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Tên Xe:</label>
              <input
                type="text"
                className="form-control"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Số Ghế:</label>
              <input
                type="number"
                className="form-control"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mẫu Xe:</label>
              <input
                type="text"
                className="form-control"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Hãng Xe:</label>
              <select
                className="form-select"
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
                required
              >
                <option value={1}>Hãng Xe 1</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Biển Số:</label>
              <input
                type="text"
                className="form-control"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Giá Thuê:</label>
              <input
                type="number"
                className="form-control"
                value={rentalPrice}
                onChange={(e) => setRentalPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Trạng Thái:</label>
              <select
                className="form-select"
                value={carStatus}
                onChange={(e) => setCarStatus(e.target.value)}
              >
                <option value={1}>Còn Hàng</option>
                <option value={0}>Hết Hàng</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Số Km đã đi:</label>
              <input
                type="number"
                className="form-control"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Hình Ảnh:</label>
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange} // Xử lý sự kiện chọn file
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mô Tả:</label>
              <textarea
                className="form-control"
                value={carDescription}
                onChange={(e) => setCarDescription(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {carId ? "Cập Nhật Xe" : "Thêm Xe"}
            </button>
          </form>
        ) : (
          <p>Bạn không có quyền truy cập vào trang này.</p>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AddCar;
