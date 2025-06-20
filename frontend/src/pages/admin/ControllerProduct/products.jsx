import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllCars, deleteCarById } from "../../../lib/Axiosintance";
import Side_bar from "../component/side_bar";
import Header from "../component/header";
import ReactPaginate from "react-paginate";
import { API_URL_IMG } from "../../../lib/Axiosintance";
import "../../../css/admin/css/car.css";


const AdminProducts = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filterBrand, setFilterBrand] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // Style objects for CSS-in-JS
  const styles = {
    filterContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      margin: "20px 0",
      padding: "10px 15px",
      background: "#f8f9fa",
      borderRadius: "8px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    label: {
      fontWeight: "bold",
      color: "#495057",
    },
    select: {
      border: "1px solid #ced4da",
      borderRadius: "5px",
      padding: "5px 10px",
      fontSize: "14px",
      color: "#495057",
    },
    table: {
      marginTop: "20px",
    },
    btn: {
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      padding: "5px 15px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    btnHover: {
      backgroundColor: "#0056b3",
    },
  };

  const displayedCars = filteredCars.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    fetchCars();
    // checkUserRole();
  }, []);

  useEffect(() => {
    applyBrandFilter();
  }, [filterBrand, cars]); // Gọi hàm lọc mỗi khi filterBrand hoặc danh sách xe thay đổi

  const fetchCars = async () => {
    try {
      const response = await getAllCars();
      setCars(response.data.cars);
      setFilteredCars(response.data.cars); // Cập nhật danh sách ban đầu
    } catch (error) {
      console.error("Failed to fetch cars", error);
    }
  };

  const applyBrandFilter = () => {
    if (filterBrand === "All") {
      setFilteredCars(cars);
    } else {
      setFilteredCars(
        cars.filter((car) => getBrandName(car.brandid) === filterBrand)
      );
    }
  };

  const handleBrandChange = (event) => {
    setFilterBrand(event.target.value); // Cập nhật thương hiệu cần lọc
  };

  const editCar = (carId) => {
    navigate(`/admin/EditCar/${carId}`);
  };

  const deleteCar = async (carId) => {
    const apiToken = localStorage.getItem("api_token");
    if (window.confirm("Bạn có muốn xóa sản phẩm này chứ?")) {
      try {
        await deleteCarById(carId, apiToken);
        setCars(cars.filter((car) => car.car_id !== carId));
        alert("Sản phẩm đã được xóa thành công!");
      } catch (error) {
        console.error("Error deleting car:", error);
        alert("Thất bại trong việc xóa sản phẩm: " + error.message);
      }
    }
  };

  const brands = [
    { id: 1, name: "Baic" },
    { id: 2, name: "Chevrolet" },
    { id: 3, name: "Ford" },
    { id: 4, name: "Hyundai" },
    { id: 5, name: "Kia" },
    { id: 6, name: "Lexus" },
    { id: 7, name: "Mercedes" },
    { id: 8, name: "Morris Garages" },
    { id: 9, name: "Peugeot" },
    { id: 10, name: "Subaru" },
    { id: 11, name: "Toyota" },
    { id: 12, name: "Volkswagen" },
    { id: 13, name: "Audi" },
    { id: 14, name: "BMW" },
    { id: 15, name: "Daewoo" },
    { id: 16, name: "Honda" },
    { id: 17, name: "Isuzu" },
    { id: 18, name: "Land Rover" },
    { id: 19, name: "Mazda" },
    { id: 20, name: "Mitsubishi" },
    { id: 21, name: "Nissan" },
    { id: 22, name: "Renault" },
    { id: 23, name: "Suzuki" },
    { id: 24, name: "Vinfast" },
    { id: 25, name: "Zotye" },
  ];
  // Hàm lấy tên thương hiệu dựa trên brandid
  const getBrandName = (brandid) => {
    const brand = brands.find((b) => b.id === brandid); // Tìm kiếm thương hiệu theo ID
    return brand ? brand.name : "Không xác định"; // Nếu không tìm thấy, trả về "Không xác định"
  };

  const formatPrice = (price) => {
    // Chuyển đổi số thành định dạng "xxxK" nếu số > 1000
    if (price >= 1000) {
      return `${(price / 1000).toLocaleString("vi-VN")}K`;
    }
    return `${price.toLocaleString("vi-VN")} VND/ngày`; // Format cho số dưới 1000
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

        {/* Dropdown chọn thương hiệu */}
        <div style={styles.filterContainer}>
          <label htmlFor="brandFilter" style={styles.label}>
            Lọc theo thương hiệu:
          </label>
          <select
            id="brandFilter"
            style={styles.select}
            value={filterBrand}
            onChange={handleBrandChange}
          >
            <option value="All">Tất cả</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        <div className="card rounded-0 border-0 shadow-sm p-0 m-3">
          <div className="card-body p-0">
            <table className="table" style={styles.table}>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số ghế</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {displayedCars.map((car) => (
                  <tr key={car.car_id}>
                    <td className="short-info-column">
                      <div className="row">
                        <div className="col-md-3">
                          <img
                            // src={`../img/${car.car_image}`}
                            src={`${API_URL_IMG}/${car.car_image}`}
                            className="w-100 img-thumbnail"
                            alt={car.car_name}
                          />
                        </div>
                        <div className="col-md-9">
                          <h5>{car.car_name}</h5>
                          <div>
                            Mã: {car.car_id} | Danh Mục:{" "}
                            <span className="text-primary">
                              {getBrandName(car.brandid)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="rental-price"><b>{formatPrice(car.rental_price)}</b></span> / ngày
                    </td>
                    <td>{car.seats}</td>
                    <td>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => editCar(car.car_id)}
                      >
                        <i className="fas fa-wrench"></i>
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteCar(car.car_id)}
                      // disabled={!isAdmin}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Phân trang */}
            <ReactPaginate
              previousLabel={"Trước"}
              nextLabel={"Sau"}
              breakLabel={"..."}
              pageCount={Math.ceil(filteredCars.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminProducts;

