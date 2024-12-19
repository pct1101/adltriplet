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
      setCarId(car.data.car_id);
      setCarName(car.data.car_name);
      setSeats(car.data.seats);
      setModel(car.data.model);
      setLicensePlate(car.data.license_plate);
      setRentalPrice(car.data.rental_price);
      setCarStatus(car.data.car_status);
      setMileage(car.data.mileage);
      setCarImage(car.data.car_image);
      setCarDescription(car.data.car_description);
      setBrandId(car.data.brandid);
    } catch (error) {
      console.error("Error fetching car data:", error.message);
    }
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (e) => {
    setCarImage(e.target.files[0]); // Cập nhật carImage thành file ảnh
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const carData = new FormData();
    carData.append("car_name", carName);
    carData.append("seats", Number(seats));
    carData.append("model", model);
    carData.append("license_plate", licensePlate);
    carData.append("rental_price", Number(rentalPrice));
    carData.append("car_status", Number(carStatus));
    carData.append("mileage", Number(mileage));
    carData.append("car_image", carImage);
    carData.append("car_description", carDescription);
    carData.append("brandid", Number(brandId));

    try {
      if (carId) {
        // Nếu có carId thì thực hiện cập nhật

        await addCar(carData);
      } else {
        // Nếu không có carId thì thực hiện thêm mới
        await addCar(carData);
      }
      navigate("/admin/products");
    } catch (error) {
      console.error("Error while adding/updating car:", error.message);
    }
  };

  return (
    <div>
      <Side_bar></Side_bar>
      <div className="main-wrapper section">
        <Header></Header>
        <h2 className="title">{carId ? "Cập Nhật Xe" : "Thêm Sản Phẩm Mới"}</h2>
        {isAdmin ? (
          <div className="container-m">
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
                  <option value={1}>Baic</option>
                  <option value={2}>Chevrolet</option>
                  <option value={3}>Ford</option>
                  <option value={4}>Hyundai</option>
                  <option value={5}>Kia</option>
                  <option value={6}>Lexus</option>
                  <option value={7}>Mercedes</option>
                  <option value={8}>Morris Garages</option>
                  <option value={9}>Peugeot</option>
                  <option value={10}>Subaru</option>
                  <option value={11}>Toyota</option>
                  <option value={12}>Volkswagen</option>
                  <option value={13}>Audi</option>
                  <option value={14}>BMW</option>
                  <option value={15}>Daewoo</option>
                  <option value={16}>Honda</option>
                  <option value={17}>Isuzu</option>
                  <option value={18}>Land Rover</option>
                  <option value={19}>Mazda</option>
                  <option value={20}>Mitsubishi</option>
                  <option value={21}>Nissan</option>
                  <option value={22}>Renault</option>
                  <option value={23}>Suzuki</option>
                  <option value={24}>Vinfast</option>
                  <option value={25}>Zotye</option>
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
                  {/* <option value={0}>Hết Hàng</option> */}
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
          </div>
        ) : (
          <p>Bạn không có quyền truy cập vào trang này.</p>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AddCar;
