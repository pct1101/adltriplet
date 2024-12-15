import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateCar, getCarById, getAllCarBrands } from "../../../lib/Axiosintance";
import Side_bar from "../component/side_bar";
import Header from "../component/header";
import Footer from "../component/footer";
// const API_URL_IMG = "https://api.thuexetulai.online/imgs/";


const EditCar = () => {
  const [carName, setCarName] = useState("");
  const [brands, setBrands] = useState([]); // State để lưu danh sách thương hiệu
  const [seats, setSeats] = useState("");
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [carStatus, setCarStatus] = useState(1);
  const [mileage, setMileage] = useState("");
  const [carImage, setCarImage] = useState("");
  const [carImageFile, setCarImageFile] = useState(null); // Lưu trữ file ảnh mới
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
    fetchCarBrands(); // Lấy danh sách thương hiệu xe
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

  const fetchCarBrands = async () => {
    try {
      const carBrands = await getAllCarBrands();
      setBrands(carBrands); // Lưu vào state
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thương hiệu xe:", error.message);
    }
  };

  // Lấy dữ liệu xe theo carId từ API và điền vào form
  const fetchCarData = async (carId) => {
    try {
      const car = await getCarById(carId); // Gọi API lấy thông tin xe
      console.log("Dữ liệu xe từ API:", car);
      setCarName(car.data.car_name);
      console.log(car.data.car_name);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCarImageFile(file); // Cập nhật file ảnh
    setCarImage(URL.createObjectURL(file)); // Hiển thị ảnh preview
  };

  // Cập nhật xe sau khi chỉnh sửa
  const handleUpdateCar = async (e) => {
    e.preventDefault();

    console.log("Tên xe hiện tại:", carName);

    if (!carName || !seats || !model || !licensePlate || !rentalPrice || !mileage || !carDescription) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append("car_name", carName);
    formData.append("seats", Number(seats));
    formData.append("model", model);
    formData.append("license_plate", licensePlate);
    formData.append("rental_price", Number(rentalPrice));
    formData.append("car_status", Number(carStatus));
    formData.append("mileage", Number(mileage));

    // Nếu có file mới, thêm vào formData
    if (carImageFile) {
      formData.append("car_image", carImageFile);
    }

    formData.append("car_description", carDescription);
    formData.append("brandid", Number(brandId));

    // Hiển thị dữ liệu trước khi gửi
    console.log("Dữ liệu gửi lên API:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await updateCar(id, formData); // Gọi API update
      console.log("Cập nhật thành công:", response.data);
      alert("Cập nhật xe thành công!");
      navigate("/admin");
    } catch (error) {
      console.error("Lỗi khi cập nhật xe:", error.response?.data?.message || error.message);
      alert(`Cập nhật thất bại: ${error.response?.data?.message || error.message}`);
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
                  {brands.map((brand) => (
                    <option key={brand.car_id} value={brand.brandid}>
                      {brand.brand_name} - {brand.car_id}
                    </option>
                  ))}
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
                <label className="form-label">Số KM đã đi:</label>
                <input
                  type="text"
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
                  onChange={handleFileChange} // Gọi hàm xử lý file
                />
                <div className="mt-3">
                  <p>Ảnh hiện tại:</p>
                  {carImageFile ? (
                    <img
                      src={carImage} // Hiển thị ảnh preview nếu có file mới
                      alt="Car Preview"
                      style={{ width: "100px", height: "auto" }}
                    />
                  ) : carImage ? (
                    <img
                    src={`http://localhost:8000/imgs/${carImage}`} // Hiển thị ảnh từ API
                      // alt="Current Car"
                      style={{ width: "100px", height: "auto" }}
                    />
                  ) : (
                    <p>Chưa có hình ảnh</p>
                  )}
                </div>
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