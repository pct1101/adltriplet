import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllFeedbacks, deleteFeedbackById } from "../../../lib/Axiosintance"; // Import API liên quan đến feedbacks
import Side_bar from "../component/side_bar";
import Header from "../component/header";
import "../../../css/admin/css/feedback.css";
import ReactPaginate from "react-paginate";


function AdminFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]); // Đảm bảo feedbacks là một mảng trống ban đầu
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const [filterFeedback, setFilterFeedback] = useState("all");
  const [feedbacksPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
        const response = await getAllFeedbacks();
        if (Array.isArray(response)) {
          setFeedbacks(response);
        } else {
          console.error("Dữ liệu trả về không phải mảng:", response);
          setFeedbacks([]);
        }
      } catch (error) {
        console.log("Thất bại khi lấy danh sách feedback", error);
        setFeedbacks([]);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserRole();
    fetchFeedbacks();
  }, []);

  const checkUserRole = () => {
    const role = localStorage.getItem("userRole");
    if (role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleFilterChange = (e) => {
    setFilterFeedback(e.target.value);
    setCurrentPage(0); // Reset về trang đầu tiên khi thay đổi bộ lọc
  };

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    if (filterFeedback === "all") return true;
    return feedback.rating === filterFeedback;
  });

  const offset = currentPage * feedbacksPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(offset, offset + feedbacksPerPage);

  if (isLoading) return <div>Đang tải dữ liệu...</div>;
  // if (error) return <div>{error}</div>;



  const deleteFeedback = async (feedbackId) => {
    const apiToken = localStorage.getItem("api_token"); // Lấy api_token từ localStorage

    if (window.confirm("Bạn có muốn xóa feedback này chứ?")) {
      try {
        await deleteFeedbackById(feedbackId, apiToken); // Gọi API xóa feedback
        setFeedbacks(
          feedbacks.filter((feedback) => feedback.id !== feedbackId)
        ); // Cập nhật danh sách feedbacks
        alert("Feedback đã được xóa thành công!"); // Thông báo thành công
      } catch (error) {
        console.error("Error deleting feedback:", error);
        alert("Thất bại trong việc xóa feedback: " + error.message); // Thông báo thất bại
      }
    } else {
      console.log("Xóa feedback đã bị hủy");
    }
  };

  const editFeedback = (FeedbackId) => {
    navigate(`/admin/edit_feedback/${FeedbackId}`); // Điều hướng đến trang sửa và truyền carId
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Lấy phần nguyên của rating
    const emptyStars = 5 - fullStars; // Tính số sao còn lại (max là 5 sao)

    return (
      <span>
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <span key={`full-${index}`} className="star full-star">★</span>
          ))}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <span key={`empty-${index}`} className="star empty-star">☆</span>
          ))}
      </span>
    );
  };

  return (
    <div>
      <Side_bar></Side_bar>
      <div className="main-wrapper section p-2">
        <Header></Header>
        <div className="">
          <div className="d-flex">
            <h1 className="title">Phản hồi khách hàng</h1>
            <button className="btn ms-auto">
              <Link className="btn btn-primary" to="/admin/add_feedback">
                Thêm Feedback
              </Link>
            </button>
          </div>

          <div className="d-flex ms-3 mb-4"> 
          <select
            className="form-select w-auto"
            value={filterFeedback}
                onChange={handleFilterChange}
          > 
            <option value="all">Tất cả</option>
                <option value="5">5 ★</option>
                <option value="4">4 ★</option>
                <option value="3">3 ★</option>
                <option value="2">2 ★</option>
                <option value="1">1 ★</option>
          </select>
        </div>
        </div>
        <div className="card rounded-0 border-0 shadow-sm p-0 m-3">
          <div className="card-body p-0">
            <div className="filter-section">
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th className="text-center">Tên xe</th>
                  <th className="text-center" >Tên người dùng</th>
                  <th>Nội dung phản hồi</th>
                  <th className="text-start">Đánh giá</th>
                  <th>Ngày phản hồi</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentFeedbacks.length === 0 ? (
                  <tr>
                    <td colSpan="7">
                      Chưa có phản hồi nào hoặc có lỗi khi lấy dữ liệu.
                    </td>
                  </tr>
                ) : (
                  currentFeedbacks.map((feedback) => (
                    <tr key={feedback.id}>
                      <td>{feedback.id}</td>
                      <td className="text-center">
                        {feedback && feedback.car && feedback.car.car_name
                          ? feedback.car.car_name
                          : "Không có tên xe"}
                      </td>
                      <td className="text-center">
                        {feedback && feedback.user && feedback.user.name
                          ? feedback.user.name
                          : "Không có tên người dùng"}
                      </td>
                      <td>{feedback.content}</td>
                      <td className="text-start">{renderStars(feedback.rating)}</td>
                      <td>{feedback.feedback_date}</td>
                      <td>
                        <button
                          className="btn btn-warning me-2"
                          onClick={() => editFeedback(feedback.id)}
                        >
                          <i className="fas fa-wrench"></i>
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteFeedback(feedback.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              breakLabel={"..."}
              pageCount={Math.ceil(filteredFeedbacks.length / feedbacksPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
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

export default AdminFeedbacks;
