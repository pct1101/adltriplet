import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllCars, deleteCarById } from "../../../lib/Axiosintance";
import Side_bar from "../component/side_bar";
import Header from "../component/header";

const AdminProducts = () => {
  const [cars, setCars] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  useEffect(() => {
    fetchCars();
    checkUserRole();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await getAllCars();
      setCars(response.data);
    } catch (error) {
      console.error("Failed to fetch cars", error);
    }
  };  

  const checkUserRole = () => {
    const role = localStorage.getItem("userRole");
    console.log(role);
    if (role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };
  const editCar = (carId) => {
    navigate(`/admin/EditCar/${carId}`); // Điều hướng đến trang sửa và truyền carId
  };

  const deleteCar = async (carId) => {
    const apiToken = localStorage.getItem("api_token"); // Lấy api_token từ localStorage
    console.log(`Deleting car with ID: ${carId}`); // Kiểm tra ID trước khi xóa

    // Hiển thị thông báo xác nhận trước khi xóa
    if (window.confirm("Bạn có muốn xóa sản phẩm này chứ?")) {
      try {
        await deleteCarById(carId, apiToken); // Gọi API xóa xe
        setCars(cars.filter((car) => car.car_id !== carId)); // Cập nhật danh sách xe
        alert("Sản phẩm đã được xóa thành công!"); // Thông báo thành công
      } catch (error) {
        console.error("Error deleting car:", error);
        alert("Thất bại trong việc xóa sản phẩm: " + error.message); // Thông báo thất bại
      }
    } else {
      // Nếu người dùng nhấn "Hủy", không làm gì cả
      console.log("Xóa sản phẩm đã bị hủy");
    }
  };

  return (
    <div>
      <Side_bar></Side_bar>
      <section className="main-wrapper section">
        <Header></Header>
        <div className="d-flex">
          <h1 className="ms-4">Danh sách sản phẩm</h1>
          <button className=" btn ms-auto">
            <Link className="btn btn-primary" to="/admin/AddCar">
              Thêm sản phẩm
            </Link>
          </button>
        </div>
        <div className="card rounded-0 border-0 shadow-sm p-0 m-3">
          <div className="card-body p-0">
            <table className="table">
              <thead>
                <tr>
                  <th className="" colspan="">
                    Sản phẩm
                  </th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Rating</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody className="">
                {cars.map((car) => (
                  <tr key={car.car_id}>
                    <td className="short-info-column">
                      <div className="row">
                        <div className="col-md-3">
                          <img
                            src="../img/anh1-x1.jpg"
                            className="w-100"
                            alt=""
                          />
                        </div>
                        <div className="col-md-9">
                          <h5>{car.car_name}</h5>
                          <div className="">
                            Mã: {car.car_id} | Danh Mục:{" "}
                            <span className="text-primary">{car.brand_id}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{car.rental_price}</td>
                    <td>{car.seats}</td>
                    <td>{car.rating}</td>
                    <td>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => editCar(car.car_id)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteCar(car.car_id)} // Gọi hàm xóa
                        disabled={!isAdmin} // Vô hiệu hóa nút xóa nếu không phải admin
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="pt-3 d-flex justify-content-center "></div>
      </section>
    </div>
  );
};

export default AdminProducts;
