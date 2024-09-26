import React from 'react'
import Header from './header'
import Footer from './footer'
import "../css/formsignupin.css"

function Dangky() {
  return (
    <div>
        <Header/>
        <div class="container mt-5" id="registerForm">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header text-center">
                            <h4>Đăng Ký</h4>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="mb-3">
                                    <label for="registerName" class="form-label">Họ và tên</label>
                                    <input type="text" class="form-control" id="registerName" placeholder="Nhập họ và tên"/>
                                </div>
                                <div class="mb-3">
                                    <label for="registerEmail" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="registerEmail" placeholder="Nhập email"/>
                                </div>
                                <div class="mb-3">
                                    <label for="registerPassword" class="form-label">Mật khẩu</label>
                                    <input type="password" class="form-control" id="registerPassword" placeholder="Nhập mật khẩu"/>
                                </div>
                                <div class="mb-3">
                                    <label for="confirmPassword" class="form-label">Xác nhận mật khẩu</label>
                                    <input type="password" class="form-control" id="confirmPassword" placeholder="Nhập lại mật khẩu"/>
                                </div>
                                <div class="d-grid">
                                    <button type="submit" class="btn btn-success">Đăng ký</button>
                                </div>
                            </form>
                        </div>
                        <div class="card-footer text-center">
                            <p>Bạn đã có tài khoản? <a href="/Dangky" class="text-primary">Đăng nhập ngay</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Dangky
