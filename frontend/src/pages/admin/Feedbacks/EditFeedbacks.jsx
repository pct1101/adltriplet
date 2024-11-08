import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFeedbackById, updateFeedback } from '../../../lib/Axiosintance';

function EditFeedback()  {
    const [feedback, setFeedback] = useState({
        content: '',
        rating: '',
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const data = await getFeedbackById(id);
                setFeedback(data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu feedback:', error);
            }
        };
        fetchFeedback();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const feedbackData = {
            content: feedback.content,
            rating: feedback.rating,
        };

        try {
            await updateFeedback(id, feedbackData);
            alert('Cập nhật phản hồi thành công!');
            navigate('/admin/feedbacks');
        } catch (error) {
            console.error('Lỗi khi cập nhật feedback:', error);
            alert('Cập nhật phản hồi thất bại!');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Sửa Phản Hồi</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Nội dung phản hồi</label>
                    <textarea
                        id="content"
                        name="content"
                        className="form-control"
                        value={feedback.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Đánh giá</label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        className="form-control"
                        value={feedback.rating}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
            </form>
        </div>
    );
};

export default EditFeedback;
