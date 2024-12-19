import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFeedbackById, updateFeedback } from "../../../lib/Axiosintance";
import Side_bar from "../component/side_bar";
import Header from "../component/header";

function EditFeedback() {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();

  // Khởi tạo các state riêng cho từng trường dữ liệu
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [userId, setUserId] = useState("");
  const [carId, setCarId] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await getFeedbackById(id);
        console.log("Dữ liệu phản hồi: ", response); // Kiểm tra dữ liệu trả về
        const feedbackData = response.data; // Lấy dữ liệu từ response
        setContent(feedbackData.content || "");
        setRating(feedbackData.rating || "");
        setUserId(feedbackData.user_id || "");
        setCarId(feedbackData.car_id || "");
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu feedback:", error);
      }
    };
    fetchFeedback();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Cập nhật state dựa trên name của input
    if (name === "content") {
      setContent(value);
    } else if (name === "rating") {
      setRating(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      content,
      rating,
      user_id: userId,
      car_id: carId,
    };

    try {
      await updateFeedback(id, feedbackData);
      alert("Cập nhật phản hồi thành công!");
      navigate("/admin/feedbacks");
    } catch (error) {
      console.error("Lỗi khi cập nhật feedback:", error);
      alert("Cập nhật phản hồi thất bại!");
    }
  };

  return (
    <div>
      <Side_bar />
      <div className="main-wrapper section">
        <Header />
        <h1 className="title">Sửa Phản Hồi</h1>
        <div className="container-m">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Nội dung phản hồi
              </label>
              <textarea
                id="content"
                name="content"
                className="form-control"
                value={content}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">
                Đánh giá
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                className="form-control"
                value={rating}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="user_id" className="form-label">
                ID Người dùng
              </label>
              <input
                type="number"
                id="user_id"
                name="user_id"
                className="form-control"
                value={userId}
                readOnly // Không thể chỉnh sửa
              />
            </div>
            <div className="mb-3">
              <label htmlFor="car_id" className="form-label">
                ID Xe
              </label>
              <input
                type="number"
                id="car_id"
                name="car_id"
                className="form-control"
                value={carId}
                readOnly // Không thể chỉnh sửa
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Lưu thay đổi
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/admin/feedbacks")}
              style={{ marginLeft: "10px" }}
            >
              Quay lại
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditFeedback;
