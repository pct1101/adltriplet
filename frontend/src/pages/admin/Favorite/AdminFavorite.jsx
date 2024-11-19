import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllFavorites, deleteFavoriteById } from "../../../lib/Axiosintance";
import Side_bar from "../component/side_bar";
import Header from "../component/header";

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
        setFavorites(
          favorites.filter((favorite) => favorite.favorite_id !== favoriteId)
        );
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
    <div>
      <Side_bar></Side_bar>{" "}
      <div className="main-wrapper section">
        <Header></Header>
        <div className="d-flex">
          {" "}
          <h1 className="title">Quản lý Yêu thích</h1>
          <button className="btn ms-auto">
            <Link className="btn btn-primary" to="/admin/AddFavorite">
              Thêm Yêu thích
            </Link>
          </button>
        </div>
        <div className="card rounded-0 border-0 shadow-sm p-0 m-3">
          <div className="card-body p-0">
            {" "}
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ngày yêu thích</th>
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
                      <td>{favorite.date_favorite}</td>
                      <td>
                        {favorite && favorite.car && favorite.car.car_name
                          ? favorite.car.car_name
                          : "Không có tên xe"}
                      </td>
                      <td>
                        {new Date(favorite.date_favorite).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          onClick={() => handleViewDetail(favorite)}
                          className="btn btn-info me-2"
                        >
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
        </div>
      </div>
    </div>
  );
}

export default AdminFavorite;
