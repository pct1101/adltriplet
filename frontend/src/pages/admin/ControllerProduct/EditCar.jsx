import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateCar, getCarById } from "../../../lib/Axiosintance";
import Side_bar from "../component/side_bar";
import Header from "../component/header";
import Footer from "../component/footer";

const EditCar = () => {
  const [carName, setCarName] = useState("");
  const [seats, setSeats] = useState("");
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [carStatus, setCarStatus] = useState(1);
  const [mileage, setMileage] = useState("");
  const [carImage, setCarImage] = useState("");
  const [carDescription, setCarDescription] = useState("");
  const [brandId, setBrandId] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id từ URL

  useEffect(() => {
    checkUserRole();
    if (id) {
      fetchCarData(id); // Gọi hàm fetch dữ liệu xe theo id khi component được render
    }
  }, [id]);

  // Kiểm tra quyền admin
  const checkUserRole = () => {
    const role = localStorage.getItem("userRole");
    if (!role || role !== "admin") {
      setIsAdmin(false);
      alert("Bạn không có quyền truy cập trang này!");
      navigate("/"); // Điều hướng về trang chủ nếu không có quyền
    } else {
      setIsAdmin(true);
    }
  };

  // Lấy dữ liệu xe theo carId từ API và điền vào form
  const fetchCarData = async (carId) => {
    try {
      const car = await getCarById(carId); // Gọi API lấy thông tin xe
      console.log("Dữ liệu xe từ API:", car);
      setCarName(car.data.car_name);
      // console.log(car.data.car_name);
      setSeats(car.data.seats);
      setModel(car.data.model);
      setLicensePlate(car.data.license_plate);
      setRentalPrice(car.data.rental_price);
      setCarStatus(car.data.car_status);
      setMileage(car.data.mileage);
      setCarImage(car.data.car_image);
      setCarDescription(car.data.car_description);
      setBrandId(car.data.brandid); // Giả sử API trả về brandid
    } catch (error) {
      
      console.error("Error fetching car data:", error.message);
    }
    
  };

  // Cập nhật xe sau khi chỉnh sửa
  const handleUpdateCar = async (e) => {
    e.preventDefault();

    const carData = {
      car_name: carName,
      seats: Number(seats),
      model: model,
      license_plate: licensePlate,
      rental_price: Number(rentalPrice),
      car_status: Number(carStatus),
      mileage: Number(mileage),
      car_image: carImage,
      car_description: carDescription,
      brandid: Number(brandId),
    };

    try {
      if (id) {
        await updateCar(id, carData); // Gọi hàm updateCar với carId và dữ liệu xe
        alert(`Cập nhật thành công: ${carName}, Giá thuê: ${rentalPrice}`); // Hiển thị alert thông báo thành công
        // navigate("/admin"); // Điều hướng về trang admin sau khi cập nhật thành công
      } else {
        console.error("Không tìm thấy id xe.");
      }
    } catch (error) {
      console.error("Error while updating car:", error.message);
    }
  };

  return (
    <div>
      <Side_bar></Side_bar>{" "}
      <div className="main-wrapper section">
        <Header></Header>

        <h2 className="title">Cập Nhật Xe</h2>
        {isAdmin ? ( // Kiểm tra quyền admin
          <div className="container-m">
            {" "}
            <form onSubmit={handleUpdateCar}>
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
                  <option value={2}>Hãng Xe 2</option>
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
                  type="text"
                  className="form-control"
                  value={carImage}
                  onChange={(e) => setCarImage(e.target.value)}
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
                Cập Nhật Xe
              </button>
            </form>
          </div>
        ) : (
          <p>Bạn không có quyền truy cập vào trang này.</p>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default EditCar;