import React from 'react'
import Header from './header'
import Footer from './footer'
import "../css/formsignupin.css"

function Dangnhap() {
  return (
    <div>
        <Header/>
      <div class="container mt-5">
        <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header text-center">
                            <h4>Đăng Nhập</h4>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="mb-3">
                                    <label for="loginEmail" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="loginEmail" placeholder="Nhập email"/>
                                </div>
                                <div class="mb-3">
                                    <label for="loginPassword" class="form-label">Mật khẩu</label>
                                    <input type="password" class="form-control" id="loginPassword" placeholder="Nhập mật khẩu"/>
                                </div>
                                <div class="d-grid">
                                    <button type="submit" class="btn btn-primary">Đăng nhập</button>
                                </div>
                            </form>
                        </div>
                        <div class="card-footer text-center">
                            <p>Bạn chưa có tài khoản? <a href="#registerForm" class="text-primary">Đăng ký ngay</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Dangnhap
