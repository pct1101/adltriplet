import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllFavorites, deleteFavoriteById } from "../../../lib/Axiosintance";

function AdminFavorite() {
    const [favorites, setFavorites] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFavorites();
        checkUserRole();
    }, []);

    const fetchFavorites = async () => {
        try {
            const response = await getAllFavorites();
            console.log("Toàn bộ response: ", response);

            if (Array.isArray(response) && response.length > 0) {
                setFavorites(response);
            } else if (response && response.data && Array.isArray(response.data)) {
                setFavorites(response.data);
            } else {
                console.error("Dữ liệu trả về không đúng định dạng:", response);
                setFavorites([]);
            }
        } catch (error) {
            console.error("Không thể lấy danh sách yêu thích:", error);
            setFavorites([]);
        }
    };

    const checkUserRole = () => {
        const role = localStorage.getItem("userRole");
        setIsAdmin(role === "admin");
    };

    const deleteFavorite = async (favoriteId) => {
        const apiToken = localStorage.getItem("authToken");
        if (window.confirm("Bạn có chắc chắn muốn xóa yêu thích này?")) {
            try {
                await deleteFavoriteById(favoriteId, apiToken);
                setFavorites(favorites.filter((favorite) => favorite.favorite_id !== favoriteId));
                alert("Yêu thích đã được xóa thành công!");
            } catch (error) {
                console.error("Lỗi khi xóa yêu thích:", error);
                alert("Thất bại trong việc xóa yêu thích: " + error.message);
            }
        }
    };

    const handleViewDetail = (favorite) => {
        navigate(`/admin/favorite/${favorite.user_id}/${favorite.car_id}`);
    };

    return (
        <div className="container mt-5">
            <h1>Quản lý Yêu thích</h1>
            <button>
                <Link className="btn btn-primary" to="/admin/AddFavorite">
                    Thêm Yêu thích
                </Link>
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID Yêu thích</th>
                        <th>ID người dùng</th>
                        <th>Tên xe</th>
                        <th>Ngày yêu thích</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(favorites) && favorites.length > 0 ? (
                        favorites.map((favorite) => (
                            <tr key={favorite.favorite_id}>
                                <td>{favorite.favorite_id}</td>
                                <td>{favorite.user_id}</td>
                                <td>{favorite.car_id}</td>
                                <td>{new Date(favorite.date_favorite).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleViewDetail(favorite)} className="btn btn-info">
                                        Chi tiết
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteFavorite(favorite.favorite_id)}
                                        disabled={!isAdmin}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                Không có yêu thích nào
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AdminFavorite;
