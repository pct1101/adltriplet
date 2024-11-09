import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addFavorite } from "../../../lib/Axiosintance"; // Hàm thêm yêu thích

function AddFavorite() {
  const [userId, setUserId] = useState(""); // Lưu userId
  const [carId, setCarId] = useState(""); // Lưu carId
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const navigate = useNavigate();

  // Hàm xử lý khi thêm yêu thích
  const handleAddFavorite = async () => {
    if (!userId || !carId) {
      alert("Vui lòng chọn người dùng và xe.");
      return;
    }

    setLoading(true);

    try {
      const response = await addFavorite(userId, carId); // Gửi yêu cầu thêm yêu thích
      alert(response.message); // Thông báo thành công
      navigate("/admin/favorite"); // Quay lại danh sách yêu thích
    } catch (error) {
      alert("Thêm yêu thích thất bại!");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h1>Thêm Yêu Thích Mới</h1>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Chọn Người Dùng
        </label>
        <input
          type="text"
          id="userId"
          className="form-control"
          placeholder="Nhập ID người dùng"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="carId" className="form-label">
          Chọn Xe
        </label>
        <input
          type="text"
          id="carId"
          className="form-control"
          placeholder="Nhập ID xe"
          value={carId}
          onChange={(e) => setCarId(e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={handleAddFavorite}
        disabled={loading}
      >
        {loading ? "Đang thêm..." : "Thêm vào yêu thích"}
      </button>
      <button
        className="btn btn-secondary ms-2"
        onClick={() => navigate("/admin/favorite")}
      >
        Quay lại danh sách yêu thích
      </button>
    </div>
  );
}

export default AddFavorite;
