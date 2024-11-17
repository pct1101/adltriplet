import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addFeedback } from "../../../lib/Axiosintance"; // Import API để thêm feedback
import Side_bar from "../component/side_bar";
import Header from "../component/header";

function AdminAddFeedback() {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5); // Giá trị mặc định cho rating là 5
  const [feedbackDate, setFeedbackDate] = useState("");
  const [userId, setUserId] = useState("");
  const [carId, setCarId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserRole();
  }, []);

  const checkUserRole = () => {
    const role = localStorage.getItem("userRole");
    const apiToken = localStorage.getItem("authToken");

    if (!role || role !== "admin") {
      setIsAdmin(false);
      alert("Bạn không có quyền truy cập trang này!");
      navigate("/"); // Điều hướng về trang chủ nếu không có quyền
    } else {
      setIsAdmin(true);
    }
  };

  const handleAddFeedback = async (e) => {
    e.preventDefault();

    const feedbackData = {
      content: content,
      rating: rating,
      feedback_date: feedbackDate,
      user_id: userId,
      car_id: carId,
    };

    try {
      await addFeedback(feedbackData); // Gọi API để thêm feedback
      alert("Đã thêm phản hồi mới thành công!"); // Thông báo thành công
      navigate("/admin/feedbacks"); // Điều hướng đến trang danh sách feedback sau khi thêm thành công
    } catch (error) {
      console.error("Error while adding feedback:", error.message);
    }
  };

  return (
    <div>
      {" "}
      <Side_bar></Side_bar>
      <div className="main-wrapper section ">
        <Header></Header>
        <h2 className="title">Thêm Phản Hồi Mới</h2>
        {isAdmin ? (
          <div className="container-m">
            {" "}
            <form onSubmit={handleAddFeedback}>
              <div className="mb-3">
                <label className="form-label">Nội Dung Phản Hồi:</label>
                <textarea
                  className="form-control"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Xếp Hạng:</label>
                <select
                  className="form-select"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                >
                  <option value="1">1 sao</option>
                  <option value="2">2 sao</option>
                  <option value="3">3 sao</option>
                  <option value="4">4 sao</option>
                  <option value="5">5 sao</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Ngày Phản Hồi:</label>
                <input
                  type="date"
                  className="form-control"
                  value={feedbackDate}
                  onChange={(e) => setFeedbackDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">ID Người Dùng:</label>
                <input
                  type="number"
                  className="form-control"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">ID Xe:</label>
                <input
                  type="number"
                  className="form-control"
                  value={carId}
                  onChange={(e) => setCarId(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Thêm Phản Hồi
              </button>
            </form>
          </div>
        ) : (
          <p>Bạn không có quyền truy cập vào trang này.</p>
        )}
      </div>
    </div>
  );
}

export default AdminAddFeedback;
