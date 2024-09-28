import React from 'react'
import Header from './header'
import Footer from './footer'
import "../css/blog.css"

function Blog() {
  return (
    <div>
        <Header/>
        <section class="container py-5">
        <div class="row">
            <div class="col-12 text-center">
                <h1 class="section-title">Chào mừng bạn đến với ADL TripleT</h1>
                <p class="mt-4">Nơi hiện thực hóa những chuyến đi an toàn và thoải mái, tạo nên những trải nghiệm di chuyển đẳng cấp. Chúng tôi tự hào là địa chỉ đáng tin cậy cho những ai đang tìm kiếm dịch vụ cho thuê xe chuyên nghiệp và tiện lợi, đáp ứng nhu cầu di chuyển cá nhân, gia đình hay doanh nghiệp.</p>
            </div>
        </div>
    </section>

    {/* <!-- Image Section --> */}
    <section class="container py-5">
        <div class="row">
            <div class="col-12 image-container text-center">
                <img src="https://media-cdn-v2.laodong.vn/storage/newsportal/2022/8/3/1076377/Z3615343853384_A50b9.jpg" alt="ADL TripleT - Image 1"/>
            </div>
        </div>
    </section>

    {/* <!-- Services Section --> */}
    <section class="container py-5">
        <div class="row">
            <div class="col-md-6">
                <h2 class="section-title">ADL TRIPLE T - Trải nghiệm tốt nhất trên những cung đường</h2>
                <p class="mt-4">Ngoài ra, ADL TripleT còn tự hào về việc cung cấp các gói dịch vụ thuê xe dài hạn cho doanh nghiệp, du lịch hoặc sự kiện. Chúng tôi luôn ưu tiên chất lượng và sự tiện lợi để đảm bảo rằng mọi khách hàng đều có thể tận hưởng sự phục vụ tốt nhất ngay từ khi bắt đầu chuyến đi.</p>
            </div>
            <div class="col-md-6 image-container">
                <img src="https://images.pexels.com/photos/2526128/pexels-photo-2526128.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="ADL TripleT - Image 2"/>
            </div>
        </div>
    </section>

    {/* <!-- Advantages Section --> */}
    <section class="container custom-section">
        <div class="row text-center">
            <div class="col-md-4">
                <div class="advantage-card">
                    <img src="https://xemiennam.vn/wp-content/uploads/2021/06/logo-xe-ho%CC%9Bi.jpeg" alt="Dòng xe đa dạng" class="advantage-icon" style={{ width: '150px', height:'100px' }}/>
                    <h4 class="mt-3">Dòng xe đa dạng</h4>
                    <p>Hơn 100 dòng xe cho bạn tùy ý lựa chọn: Mini, Sedan, CUV, SUV, MPV, Bán tải.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="advantage-card">
                    <img src="https://www.bonboncar.vn/blog/content/images/2024/07/nhung-dieu-can-biet-ve-thu-tuc-thue-xe-tu-lai-202106222123564032.jpg" alt="Thủ tục đơn giản" class="advantage-icon" style={{ width: '150px', height:'100px' }}/>
                    <h4 class="mt-3">Thủ tục đơn giản</h4>
                    <p>Thủ tục thuê xe đơn giản, nhanh chóng, giúp bạn tiết kiệm thời gian.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="advantage-card">
                    <img src="https://cf.shopee.vn/file/sg-11134201-22090-suci0ffpdqhv39" alt="An toàn lái xe" class="advantage-icon" style={{ width: '150px', height:'100px' }}/>
                    <h4 class="mt-3">An toàn lái xe</h4>
                    <p>Chúng tôi đảm bảo mọi dòng xe đều được kiểm tra kỹ lưỡng trước khi bàn giao.</p>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Call to Action Section --> */}
    <section class="container py-5 text-center">
        <h2 class="section-title">BẠN ĐÃ SẴN SÀNG ĐỂ BẮT ĐẦU CUỘC HÀNH TRÌNH!</h2>
        <p class="mt-3">Tự tay cầm lái chiếc xe bạn yêu thích cho hành trình thêm hứng khởi.</p>
        <a href="#" class="btn btn-custom btn-lg mt-3">THUÊ XE NGAY</a>
    </section>
    <Footer/>
    </div>
  )
}

export default Blog
