import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addVoucher } from "../../../lib/Axiosintance"; // API đã tạo
import Side_bar from "../component/side_bar";
import Header from "../component/header";
import Footer from "../component/footer";

function AdminAddVoucher() {
  const [voucherCode, setVoucherCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [isAdmin, setIsAdmin] = useState(true); // Kiểm tra quyền admin
  const navigate = useNavigate();

  // Kiểm tra quyền truy cập của admin
//   const checkUserRole = () => {
//     const role = localStorage.getItem("userRole");
//     if (role !== "admin") {
//       setIsAdmin(false);
//       alert("Bạn không có quyền truy cập trang này!");
//       navigate("/"); // Điều hướng về trang chủ nếu không có quyền
//     }
//   };

  // Gọi API để thêm voucher
  const handleAddVoucher = async (e) => {
    e.preventDefault();
  
    const voucherData = {
      voucher_code: voucherCode, // Thông tin voucher code
      discount_percentage: discountPercentage, // Phần trăm giảm giá
      expiration_date: expirationDate, // Ngày hết hạn
      usage_limit: usageLimit, // Giới hạn sử dụng
    };
  
    try {
      // Gọi hàm addVoucher để gửi dữ liệu lên server
      const result = await addVoucher(voucherData);
      
      alert("Voucher đã được thêm thành công!");
      
      // Sau khi thêm thành công, điều hướng về trang danh sách voucher
      navigate("/admin/voucher"); // Điều hướng về trang danh sách voucher
  
    } catch (error) {
      console.error("Lỗi khi thêm voucher:", error.message);
    }
  };

  return (
    <div>
      <Side_bar></Side_bar>
      <div className="main-wrapper section">
        <Header></Header>
        <h2 className="title">Thêm Voucher Mới</h2>
        {isAdmin ? (
          <div className="container-m">
            <form onSubmit={handleAddVoucher}>
              <div className="mb-3">
                <label className="form-label">Mã Voucher:</label>
                <input
                  type="text"
                  className="form-control"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phần Trăm Giảm Giá:</label>
                <input
                  type="number"
                  className="form-control"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Ngày Hết Hạn:</label>
                <input
                  type="date"
                  className="form-control"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Giới Hạn Sử Dụng:</label>
                <input
                  type="number"
                  className="form-control"
                  value={usageLimit}
                  onChange={(e) => setUsageLimit(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Thêm Voucher
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
}

export default AdminAddVoucher;
