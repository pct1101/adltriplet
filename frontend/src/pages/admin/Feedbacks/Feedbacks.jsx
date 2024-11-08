import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getAllFeedbacks, deleteFeedbackById } from '../../../lib/Axiosintance'; // Import API liên quan đến feedbacks

function AdminFeedbacks () {
    const [feedbacks, setFeedbacks] = useState([]); // Đảm bảo feedbacks là một mảng trống ban đầu
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await getAllFeedbacks();
                if (Array.isArray(response)) {
                    setFeedbacks(response);  // Nếu là mảng, cập nhật state
                } else {
                    console.error('Dữ liệu trả về không phải mảng:', response);
                    setFeedbacks([]); // Nếu không phải mảng, đặt state là mảng rỗng
                }
            } catch (error) {
                console.log('Thất bại khi lấy danh sách feedback', error);
                setFeedbacks([]); // Đảm bảo state luôn là mảng rỗng nếu có lỗi
            }
        };

        checkUserRole();
        fetchFeedbacks();
    }, []);

    const checkUserRole = () => {
        const role = localStorage.getItem('userRole');
        if (role === 'admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    };

    const deleteFeedback = async (feedbackId) => {
        const apiToken = localStorage.getItem('api_token'); // Lấy api_token từ localStorage
    
        if (window.confirm("Bạn có muốn xóa feedback này chứ?")) {
            try {
                await deleteFeedbackById(feedbackId, apiToken); // Gọi API xóa feedback
                setFeedbacks(feedbacks.filter(feedback => feedback.id !== feedbackId)); // Cập nhật danh sách feedbacks
                alert('Feedback đã được xóa thành công!'); // Thông báo thành công
            } catch (error) {
                console.error('Error deleting feedback:', error);
                alert('Thất bại trong việc xóa feedback: ' + error.message); // Thông báo thất bại
            }
        } else {
            console.log("Xóa feedback đã bị hủy");
        }
    };

    const editFeedback = (FeedbackId) => {
        navigate(`/admin/EditFeedback/${FeedbackId}`); // Điều hướng đến trang sửa và truyền carId
    };


    return (
        <div className="container mt-5">
            <h1>Phản hồi khách hàng</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nội dung phản hồi</th>
                        <th>Đánh giá</th>
                        <th>Ngày phản hồi</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.length === 0 ? (
                        <tr><td colSpan="5">Chưa có phản hồi nào hoặc có lỗi khi lấy dữ liệu.</td></tr>
                    ) : (
                        feedbacks.map(feedback => (
                            <tr key={feedback.id}>
                                <td>{feedback.id}</td>
                                <td>{feedback.content}</td>
                                <td>{feedback.rating}</td>
                                <td>{feedback.feedback_date}</td>
                                <td>
                                <button className="btn btn-warning me-2" onClick={() => editFeedback(feedback.id)}>Sửa</button>
                                    <button className="btn btn-danger" onClick={() => deleteFeedback(feedback.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminFeedbacks;
