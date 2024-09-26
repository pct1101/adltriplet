import React from 'react'
import Header from './header'
import Footer from './footer'
import "../css/chitietsanpham.css";

function Chitietsanpham() {
  return (
    <div>
        <Header/>
        <div class="container py-5">
        <div class="row">
            {/* <!-- Left Column --> */}
            <div class="col-md-7">
                {/* <!-- Main Product Image --> */}
                <img src="https://cdn.oto360.net/images/car/toyota/cross_2404.webp" alt="Main Image" class="img-fluid mb-3"/>

                {/* <!-- Thumbnails --> */}
                <div className="mainproduct">
                <div class="d-flex">
                        <img src="https://cdn.oto360.net/images/car/toyota/cross_2404.webp" alt="Thumbnail 1" class="img-fluid me-2" style={{ marginRight: '100px' }}/>
                        <img src="https://cdn.oto360.net/images/car/toyota/cross_2404.webp" alt="Thumbnail 2" class="img-fluid me-2" style={{ marginRight: '100px' }}/>
                        <img src="https://cdn.oto360.net/images/car/toyota/cross_2404.webp" alt="Thumbnail 3" class="img-fluid" style={{ marginRight: '100px' }}/>
                </div>
                </div>

                {/* <!-- Product Information --> */}
                <h2 class="mt-4">KIA SELTOS PREMIUM 2024</h2>
                <p><i class="bi bi-star-fill rating-star"></i> 5.0 | 20 chuyến | Quận 12, Thành phố Hồ Chí Minh</p>

                <div class="d-flex justify-content-between">
                    <div class="d-flex align-items-center">
                        <i class="bi bi-car-front-fill"></i>
                        <span>Số tự động</span>
                    </div>
                </div>

                {/* <!-- Specifications --> */}
                <div class="row mt-4">
                    <div class="col-md-3 text-center">
                        <p><strong>Số ghế</strong></p>
                        <p>5 chỗ</p>
                    </div>
                    <div class="col-md-3 text-center">
                        <p><strong>Nhiên liệu</strong></p>
                        <p>Xăng</p>
                    </div>
                    <div class="col-md-3 text-center">
                        <p><strong>Hệ số</strong></p>
                        <p>Số tự động</p>
                    </div>
                    <div class="col-md-3 text-center">
                        <p><strong>Tiêu hao</strong></p>
                        <p>10lít/100km</p>
                    </div>
                </div>

                {/* <!-- Description --> */}
                <h4 class="mt-4">Mô tả</h4>
                <p>KIA SELTOS PREMIUM 2024 sở hữu diện mạo có chút khác biệt so với thế hệ trước với thiết kế hiện đại, thể thao và thời thượng. Xe được trang bị nhiều tính năng hiện đại và tiện nghi, phù hợp với những khách hàng yêu thích sự cá tính và khác biệt.</p>

                {/* <!-- Rental Documents --> */}
                <h4>Giấy tờ thuê xe</h4>
                <div class="border-green">
                    <p>Chọn 1 trong 2 hình thức</p>
                    <ul>
                        <li>GPLX (Đối chiếu), CCCD (Đối chiếu VNeID)</li>
                        <li>GPLX (Đối chiếu), Passport (Giữ lại)</li>
                    </ul>
                </div>

                {/* <!-- Deposit Information --> */}
                <h4>Tài sản thế chấp</h4>
                <div class="border-green">
                    <p>15 triệu (tiền mặt/ hoặc chuyển khoản cho chủ xe khi nhận xe)</p>
                </div>
            </div>

            {/* <!-- Right Column (Pricing and Booking Information) --> */}
            <div class="col-md-5">
                <div class="product-info">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="discount">1,126k</span>
                        <span class="badge bg-warning text-dark">15% OFF</span>
                    </div>
                    <div class="total-price mb-4">1,126k/ngày</div>

                    <form>
                        <div class="mb-3">
                            <label for="startDate" class="form-label">Ngày nhận</label>
                            <input type="date" class="form-control" id="startDate" value="2024-06-20"/>
                        </div>
                        <div class="mb-3">
                            <label for="endDate" class="form-label">Ngày trả</label>
                            <input type="date" class="form-control" id="endDate" value="2024-06-21"/>
                        </div>
                        <div class="mb-3">
                            <label for="location" class="form-label">Địa điểm nhận xe</label>
                            <input type="text" class="form-control" id="location" value="Quận 12, Thành phố Hồ Chí Minh"/>
                        </div>
                        <div class="mb-3">
                            <p>Đơn giá thuê: 1,126,000/ngày</p>
                            <p>Bảo hiểm thuê: 100,000/ngày</p>
                        </div>
                        <div class="mb-3">
                            <label for="discountCode" class="form-label">Mã giảm giá</label>
                            <input type="text" class="form-control" id="discountCode" placeholder="Nhập mã giảm giá"/>
                        </div>

                        <div class="d-flex justify-content-between">
                            <p class="mb-0">Tổng cộng</p>
                            <p class="total-price">1,226,000/ngày</p>
                        </div>

                        <button class="btn btn-success w-100">Thanh toán</button>
                    </form>
                </div>
            </div>
        </div>

        {/* <!-- Similar Cars Section --> */}
        <div class="mt-5">
            <h4>Xe tương tự</h4>
            <div class="d-flex">
                <div class="card me-2 custom-card" style={{ marginRight: '150px' }}>
                    <img src="https://cdn.oto360.net/images/car/toyota/cross_2404.webp" class="card-img-top" alt="Car"/>
                    <div class="card-body text-center">
                        <p class="card-text">KIA SELTOS PREMIUM 2024</p>
                        <p class="text-success">1,126k/ngày</p>
                    </div>
                </div>
                <div class="card me-2 custom-card" style={{ marginRight: '150px' }}>
                    <img src="https://cdn.oto360.net/images/car/toyota/cross_2404.webp" class="card-img-top" alt="Car"/>
                    <div class="card-body text-center">
                        <p class="card-text">KIA SELTOS PREMIUM 2024</p>
                        <p class="text-success">1,126k/ngày</p>
                    </div>
                </div>
                <div class="card me-2 custom-card" style={{ marginRight: '150px' }}>
                    <img src="https://cdn.oto360.net/images/car/toyota/cross_2404.webp" class="card-img-top" alt="Car"/>
                    <div class="card-body text-center">
                        <p class="card-text">KIA SELTOS PREMIUM 2024</p>
                        <p class="text-success">1,126k/ngày</p>
                    </div>
                </div>
                <div class="card me-2 custom-card" style={{ marginRight: '150px' }}>
                    <img src="https://cdn.oto360.net/images/car/toyota/cross_2404.webp" class="card-img-top" alt="Car"/>
                    <div class="card-body text-center">
                        <p class="card-text">KIA SELTOS PREMIUM 2024</p>
                        <p class="text-success">1,126k/ngày</p>
                    </div>
                </div>
                <div class="card me-2 custom-card" style={{ marginRight: '150px' }}>
                    <img src="https://cdn.oto360.net/images/car/toyota/cross_2404.webp" class="card-img-top" alt="Car"/>
                    <div class="card-body text-center">
                        <p class="card-text">KIA SELTOS PREMIUM 2024</p>
                        <p class="text-success">1,126k/ngày</p>
                    </div>
                </div>
                <div class="card me-2 custom-card" style={{ marginRight: '150px' }}>
                    <img src="https://cdn.oto360.net/images/car/toyota/cross_2404.webp" class="card-img-top" alt="Car"/>
                    <div class="card-body text-center">
                        <p class="card-text">KIA SELTOS PREMIUM 2024</p>
                        <p class="text-success">1,126k/ngày</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Chitietsanpham
