import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllVouchers, deleteVoucherById } from "../../../lib/Axiosintance";
import Side_bar from "../component/side_bar";
import Header from "../component/header";


function AdminVoucher() {
  const [vouchers, setVouchers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVouchers();
    checkUserRole();
  }, []);

  const fetchVouchers = async () => {
    try {
      const response = await getAllVouchers();
      if (Array.isArray(response)) {
        setVouchers(response);
        console.log(response);
      } else if (response && response.data && Array.isArray(response.data)) {
        setVouchers(response.data);
      } else {
        console.error("Dữ liệu trả về không đúng định dạng:", response);
        setVouchers([]);
      }
    } catch (error) {
      console.error("Không thể lấy danh sách voucher:", error);
      setVouchers([]);
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

  const deleteVoucher = async (voucherId) => {
    const apiToken = localStorage.getItem("authToken");
    if (window.confirm("Bạn có chắc chắn muốn xóa voucher này?")) {
      try {
        await deleteVoucherById(voucherId, apiToken);
        setVouchers(vouchers.filter((voucher) => voucher.voucher_id !== voucherId));
        alert("Voucher đã được xóa thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa voucher:", error);
        alert("Thất bại trong việc xóa voucher: " + error.message);
      }
    }
  };

  const handleViewDetail = (voucherId) => {
    navigate(`/admin/DetailVoucher/${voucherId}`);
  };

  return (
    <div>
      <Side_bar />
      <div className="main-wrapper section">
        <Header />
        <div className="d-flex">
          <h1 className="title">Quản lý Voucher</h1>
          <button className="btn ms-auto">
            <Link className="btn btn-primary" to="/admin/AddVoucher">
              Thêm Voucher
            </Link>
          </button>
        </div>
        <div className="card rounded-0 border-0 shadow-sm p-0 m-3">
          <div className="card-body p-0">
            <table className="table">
              <thead>
                <tr>
                  <th>ID Voucher</th>
                  <th>Mã Voucher</th>
                  <th>Giảm giá (%)</th>
                  <th>Số lượng</th>
                  <th>Ngày kết thúc</th>
                  <th className="text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(vouchers) && vouchers.length > 0 ? (
                  vouchers.map((voucher) => (
                    <tr key={voucher.voucher_id}>
                      <td>{voucher.voucher_id}</td>
                      <td>{voucher.voucher_code}</td>
                      <td>{voucher.discount_percentage} %</td>
                      <td>{voucher.usage_limit}</td>
                      <td>{voucher.expiration_date}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-danger me-2"
                          onClick={() => deleteVoucher(voucher.voucher_id)}
                          disabled={!isAdmin}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Không có voucher nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminVoucher;
