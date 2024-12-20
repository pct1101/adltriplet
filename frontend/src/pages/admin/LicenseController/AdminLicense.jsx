import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllDriverLicenses,
  deleteDriverLicenseById,
} from "../../../lib/Axiosintance";
import Side_bar from "../component/side_bar";
import Header from "../component/header";
import ReactPaginate from "react-paginate"; // Import ReactPaginate

function AdminDriverLicense() {
  const [driverLicenses, setDriverLicenses] = useState([]);
  const [licenseStatus, setLicenseStatus] = useState(""); // Trạng thái lọc
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [itemsPerPage] = useState(5); // Số lượng giấy phép trên mỗi trang
  const navigate = useNavigate();

  useEffect(() => {
    fetchDriverLicenses();
    checkUserRole();
  }, [licenseStatus]); // Khi licenseStatus thay đổi, tải lại danh sách giấy phép

  const fetchDriverLicenses = async () => {
    try {
      const response = await getAllDriverLicenses(licenseStatus); // Truyền licenseStatus vào đây
      if (Array.isArray(response.driver_licenses)) {
        setDriverLicenses(response.driver_licenses);
      } else {
        console.error("Dữ liệu trả về không đúng định dạng:", response);
        setDriverLicenses([]);
      }
    } catch (error) {
      console.error("Không thể lấy danh sách giấy phép lái xe:", error);
      setDriverLicenses([]);
    }
  };

  const checkUserRole = () => {
    const role = localStorage.getItem("userRole");
    if (role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const editDriverLicense = (licenseId) => {
    navigate(`/admin/EditDriverLicense/${licenseId}`);
  };

  const handleViewDetail = (driverLicenseId) => {
    navigate(`/admin/DetailDriverLicense/${driverLicenseId}`);
  };

  // Lọc giấy phép theo trạng thái
  const handleFilterChange = (e) => {
    const newStatus = e.target.value;
    setLicenseStatus(newStatus); // Cập nhật trạng thái lọc

    // Cập nhật URL với giá trị mới của licenseStatus
    navigate(`?status=${newStatus}`);
  };

  // Lấy giấy phép cho trang hiện tại
  const indexOfLastLicense = (currentPage + 1) * itemsPerPage;
  const indexOfFirstLicense = indexOfLastLicense - itemsPerPage;
  const currentLicenses = driverLicenses.slice(
    indexOfFirstLicense,
    indexOfLastLicense
  );

  // Hàm phân trang
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div>
      <Side_bar></Side_bar>
      <div className="main-wrapper section">
        <Header></Header>
        <div className="d-flex">
          <h1 className="title">Quản lý giấy phép lái xe</h1>
          <button className="btn ms-auto">
            <Link className="btn btn-primary" to="/admin/AddDriverLicense">
              Thêm giấy phép
            </Link>
          </button>
        </div>
        <div className="d-flex align-items-center mb-3">
          <label className="me-2">Trạng thái :</label>
          <select
            className="form-select w-auto"
            value={licenseStatus}
            onChange={handleFilterChange}
          >
            <option value="">Tất cả</option>
            <option value="active">Đã xác nhận</option>
            <option value="inactive">Chưa xác nhận</option>
            <option value="invalid">Không hợp lệ</option>
          </select>
        </div>
        <div className="card rounded-0 border-0 shadow-sm p-0 m-3">
          <div className="card-body p-0">
            <table className="table">
              <thead>
                <tr>
                  <th>ID giấy phép</th>
                  <th>Hình ảnh</th>
                  <th>Số giấy phép</th>
                  <th>Tên chủ giấy phép</th>
                  <th>Trạng thái</th>
                  <th>Ngày hết hạn</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(currentLicenses) &&
                currentLicenses.length > 0 ? (
                  currentLicenses.map((license) => (
                    <tr key={license.driver_license_id}>
                      <td className="text-start">
                        {license.driver_license_id}
                      </td>
                      <td>
                        {" "}
                        <img
                          src={`https://api.thuexetulai.online/${license.license_image}`}
                          alt="License"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </td>
                      <td>{license.license_number}</td>
                      <td>{license.license_holder}</td>
                      <td>
                        <span
                          className={`badge ${
                            license.license_status === "active"
                              ? "bg-success" // Màu xanh cho active
                              : license.license_status === "inactive"
                              ? "bg-warning" // Màu vàng cho inactive
                              : license.license_status === "invalid"
                              ? "bg-danger" // Màu đỏ cho invalid
                              : "bg-secondary" // Màu xám dự phòng cho trạng thái không xác định
                          }`}
                          value={license.license_status} // Thêm value trạng thái
                        >
                          {license.license_status === "active"
                            ? "Đã xác nhận"
                            : license.license_status === "inactive"
                            ? "Chưa xác nhận"
                            : license.license_status === "invalid"
                            ? "Không hợp lệ"
                            : "Không xác định"}{" "}
                          {/* Nội dung fallback cho trạng thái khác */}
                        </span>
                      </td>
                      <td>
                        {license.expiry_date
                          ? new Date(license.expiry_date).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>
                        <button
                          className="btn btn-warning me-2"
                          onClick={() =>
                            editDriverLicense(license.driver_license_id)
                          }
                        >
                          <i className="fas fa-wrench"></i>
                        </button>
                        <button
                          className="btn btn-info me-2"
                          onClick={() =>
                            handleViewDetail(license.driver_license_id)
                          }
                          disabled={!isAdmin}
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      Không có giấy phép lái xe nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Phân trang */}
            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              pageCount={Math.ceil(driverLicenses.length / itemsPerPage)} // Dùng driverLicenses thay vì filteredBookings
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDriverLicense;
