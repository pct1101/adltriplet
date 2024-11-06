import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from "react-router-dom";
import { getAllCars, deleteCarById } from '../../../lib/Axiosintance';

const AdminProducts = () => {
    const [cars, setCars] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    useEffect(() => {
        fetchCars();
        checkUserRole();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await getAllCars(); 
            setCars(response.data);
        } catch (error) {
            console.error('Failed to fetch cars', error);
        }
    };

    const checkUserRole = () => {
        const role = localStorage.getItem('userRole');
        console.log(role);
        if (role === 'admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    };
    const editCar = (carId) => {
        navigate(`/admin/EditCar/${carId}`); // Điều hướng đến trang sửa và truyền carId
    };

    const deleteCar = async (carId) => {
        const apiToken = localStorage.getItem('api_token'); // Lấy api_token từ localStorage
        console.log(`Deleting car with ID: ${carId}`); // Kiểm tra ID trước khi xóa
    
        // Hiển thị thông báo xác nhận trước khi xóa
        if (window.confirm("Bạn có muốn xóa sản phẩm này chứ?")) {
            try {
                await deleteCarById(carId, apiToken); // Gọi API xóa xe
                setCars(cars.filter(car => car.car_id !== carId)); // Cập nhật danh sách xe
                alert('Sản phẩm đã được xóa thành công!'); // Thông báo thành công
            } catch (error) {
                console.error('Error deleting car:', error);
                alert('Thất bại trong việc xóa sản phẩm: ' + error.message); // Thông báo thất bại
            }
        } else {
            // Nếu người dùng nhấn "Hủy", không làm gì cả
            console.log("Xóa sản phẩm đã bị hủy");
        }
    };
    

    return (
        <div className="container mt-5">
            <h1>Quản lý sản phẩm (Xe)</h1>
            <button ><Link className="btn btn-primary" to="/admin/AddCar">Thêm sản phẩm</Link></button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ảnh xe</th>
                        <th>Tên xe</th>
                        <th>Giá thuê</th>
                        <th>Chỗ</th>
                        <th>Biển số</th>
                        <th>Đời xe</th>
                        <th>Số KM đã chạy</th>
                        <th>Hành động</th> 
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => (
                        <tr key={car.car_id}>
                            <td>{car.car_id}</td>
                            <td>
                                <img src={`/img/${car.car_image}`} alt={car.car_name} width="100" height="100" />
                            </td>
                            <td>{car.car_name}</td>
                            <td>{car.rental_price}</td>
                            <td>{car.seats}</td>  
                            <td>{car.license_plate}</td>   
                            <td>{car.model}</td>   
                            <td>{car.mileage}</td>                     
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => editCar(car.car_id)}>Sửa</button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteCar(car.car_id)} // Gọi hàm xóa
                                    disabled={!isAdmin} // Vô hiệu hóa nút xóa nếu không phải admin
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProducts;
